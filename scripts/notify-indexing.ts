import { loadEnvLocal } from "../src/lib/load-env";
import { notifyIndexing } from "../src/lib/indexing";

loadEnvLocal();

async function main() {
  const result = await notifyIndexing(process.argv.slice(2));

  if (result.gsc === "failed") {
    console.warn(result.gscMessage);
    console.warn("GSC sitemap submission skipped; continuing with IndexNow.");
  } else if (result.gscMessage) {
    console.log(result.gscMessage);
  }

  console.log(result.indexNowMessage);
}

main().catch((error) => {
  console.error(error.result ?? error);
  process.exit(1);
});
