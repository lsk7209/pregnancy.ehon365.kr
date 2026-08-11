import { spawn } from "node:child_process";
import path from "node:path";

const port = Number(process.env.CANONICAL_VERIFY_PORT ?? 3210);
const localOrigin = `http://127.0.0.1:${port}`;
const publicOrigin = "https://pregnancy.ehon365.kr";
const routes = [
  "/",
  "/blog",
  "/pregnancy/18",
  "/fetal-insurance",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];
const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const server = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
  stdio: ["ignore", "pipe", "pipe"],
});
let serverOutput = "";
server.stdout.on("data", (chunk) => {
  serverOutput += chunk;
});
server.stderr.on("data", (chunk) => {
  serverOutput += chunk;
});

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`next start exited early: ${serverOutput}`);
    }

    try {
      const response = await fetch(`${localOrigin}/`);
      if (response.ok) return;
    } catch {}

    await delay(1000);
  }

  throw new Error(`next start did not become ready: ${serverOutput}`);
}

function extractCanonical(html) {
  return html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/i)?.[1];
}

try {
  await waitForServer();

  for (const route of routes) {
    const response = await fetch(`${localOrigin}${route}`);
    const html = await response.text();
    const actual = extractCanonical(html);
    const expected = `${publicOrigin}${route === "/" ? "" : route}`;

    if (!response.ok || actual !== expected) {
      throw new Error(
        `${route}: expected ${expected}, received status ${response.status} canonical ${actual ?? "(missing)"}`,
      );
    }

    console.log(`${route} -> ${actual}`);
  }
} finally {
  if (server.exitCode === null) server.kill();
}
