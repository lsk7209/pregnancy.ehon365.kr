import { GET as getRss } from "@/app/rss.xml/route";

export const dynamic = "force-dynamic";

export function GET() {
  return getRss();
}
