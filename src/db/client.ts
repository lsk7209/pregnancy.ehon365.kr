import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { loadEnvLocal } from "@/lib/load-env";
import * as schema from "./schema";

loadEnvLocal();

const client = createClient({
  url: process.env.TURSO_URL ?? "file:./dev.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
