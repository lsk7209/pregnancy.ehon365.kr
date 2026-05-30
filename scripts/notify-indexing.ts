import { createSign } from "node:crypto";
import { readFile } from "node:fs/promises";
import { loadEnvLocal } from "../src/lib/load-env";

loadEnvLocal();

interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
  token_uri?: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pregnancy.ehon365.kr";
const host = new URL(siteUrl).host;
const sitemapUrl = `${siteUrl.replace(/\/$/, "")}/sitemap.xml`;
const indexNowKey =
  process.env.INDEXNOW_KEY ?? "pregnancy-ehon365-indexnow-20260530";
const keyLocation = `${siteUrl.replace(/\/$/, "")}/${indexNowKey}.txt`;
const gscProperty = process.env.GSC_SITE_URL ?? `sc-domain:${host}`;
const credentialsPath =
  process.env.GSC_CREDENTIALS_PATH ?? "D:/env/gsc_credentials.json";

function base64Url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getGoogleAccessToken(): Promise<string | null> {
  let credentials: ServiceAccountCredentials;
  try {
    credentials = JSON.parse(
      await readFile(credentialsPath, "utf8"),
    ) as ServiceAccountCredentials;
  } catch {
    return null;
  }

  if (!credentials.client_email || !credentials.private_key) return null;

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/webmasters",
    aud: credentials.token_uri ?? "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };
  const signingInput = `${base64Url(JSON.stringify(header))}.${base64Url(
    JSON.stringify(claim),
  )}`;
  const signature = createSign("RSA-SHA256")
    .update(signingInput)
    .sign(credentials.private_key);
  const assertion = `${signingInput}.${base64Url(signature)}`;

  const response = await fetch(credentials.token_uri ?? "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GSC token request failed: ${response.status} ${text}`);
  }

  const json = (await response.json()) as { access_token?: string };
  return json.access_token ?? null;
}

async function submitGscSitemap(): Promise<void> {
  const token = await getGoogleAccessToken();
  if (!token) {
    console.log("GSC skipped: service account credentials not found.");
    return;
  }

  const endpoint = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    gscProperty,
  )}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
  const response = await fetch(endpoint, {
    method: "PUT",
    headers: { authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GSC sitemap submit failed: ${response.status} ${text}`);
  }

  console.log(`GSC sitemap submitted: ${sitemapUrl}`);
}

async function submitIndexNow(urls: string[]): Promise<void> {
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      host,
      key: indexNowKey,
      keyLocation,
      urlList: urls,
    }),
  });

  if (!response.ok && response.status !== 202) {
    const text = await response.text();
    throw new Error(`IndexNow submit failed: ${response.status} ${text}`);
  }

  console.log(`IndexNow submitted ${urls.length} URL(s).`);
}

async function main() {
  const urls = process.argv.slice(2);
  const urlList = urls.length > 0 ? urls : [siteUrl, sitemapUrl];

  try {
    await submitGscSitemap();
  } catch (error) {
    console.warn(error);
    console.warn("GSC sitemap submission skipped; continuing with IndexNow.");
  }

  await submitIndexNow(urlList);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
