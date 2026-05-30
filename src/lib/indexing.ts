import { createSign } from "node:crypto";
import { readFile } from "node:fs/promises";
import { SITE_URL } from "@/lib/utils";

interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
  token_uri?: string;
}

export interface IndexingResult {
  gsc: "submitted" | "skipped" | "failed";
  gscMessage?: string;
  indexNow: "submitted" | "failed";
  indexNowMessage?: string;
  urls: string[];
}

export const sitemapUrl = `${SITE_URL.replace(/\/$/, "")}/sitemap.xml`;

function getIndexingConfig() {
  const host = new URL(SITE_URL).host;
  const indexNowKey =
    process.env.INDEXNOW_KEY ?? "pregnancy-ehon365-indexnow-20260530";

  return {
    host,
    indexNowKey,
    keyLocation: `${SITE_URL.replace(/\/$/, "")}/${indexNowKey}.txt`,
    gscProperty: process.env.GSC_SITE_URL?.trim() ?? `sc-domain:${host}`,
    credentialsPath:
      process.env.GSC_CREDENTIALS_PATH ?? "D:/env/gsc_credentials.json",
  };
}

function base64Url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getServiceAccountCredentials(): Promise<ServiceAccountCredentials | null> {
  const { credentialsPath } = getIndexingConfig();

  if (process.env.GSC_CREDENTIALS_JSON) {
    return JSON.parse(process.env.GSC_CREDENTIALS_JSON) as ServiceAccountCredentials;
  }

  try {
    return JSON.parse(
      await readFile(credentialsPath, "utf8"),
    ) as ServiceAccountCredentials;
  } catch {
    return null;
  }
}

async function getGoogleAccessToken(): Promise<string | null> {
  const credentials = await getServiceAccountCredentials();
  if (!credentials?.client_email || !credentials.private_key) return null;

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

export async function submitGscSitemap(): Promise<string> {
  const { gscProperty } = getIndexingConfig();
  const token = await getGoogleAccessToken();
  if (!token) return "GSC skipped: service account credentials not found.";

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

  return `GSC sitemap submitted: ${sitemapUrl}`;
}

export async function submitIndexNow(urls: string[]): Promise<string> {
  const { host, indexNowKey, keyLocation } = getIndexingConfig();
  const uniqueUrls = Array.from(new Set(urls));
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      host,
      key: indexNowKey,
      keyLocation,
      urlList: uniqueUrls,
    }),
  });

  if (!response.ok && response.status !== 202) {
    const text = await response.text();
    throw new Error(`IndexNow submit failed: ${response.status} ${text}`);
  }

  return `IndexNow submitted ${uniqueUrls.length} URL(s).`;
}

export async function notifyIndexing(urls: string[]): Promise<IndexingResult> {
  const urlList = Array.from(new Set(urls.length > 0 ? urls : [SITE_URL, sitemapUrl]));
  const result: IndexingResult = {
    gsc: "skipped",
    indexNow: "failed",
    urls: urlList,
  };

  try {
    result.gscMessage = await submitGscSitemap();
    result.gsc = result.gscMessage.includes("skipped") ? "skipped" : "submitted";
  } catch (error) {
    result.gsc = "failed";
    result.gscMessage = error instanceof Error ? error.message : String(error);
  }

  try {
    result.indexNowMessage = await submitIndexNow(urlList);
    result.indexNow = "submitted";
  } catch (error) {
    result.indexNow = "failed";
    result.indexNowMessage = error instanceof Error ? error.message : String(error);
    throw Object.assign(new Error(result.indexNowMessage), { result });
  }

  return result;
}
