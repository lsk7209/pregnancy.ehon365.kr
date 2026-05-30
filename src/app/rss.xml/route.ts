import { getPublishedBlogPosts } from "@/lib/blog-posts";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

export const dynamic = "force-dynamic";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function GET() {
  const now = new Date();
  const posts = getPublishedBlogPosts(now).slice(0, 50);
  const lastBuildDate = posts[0]?.updatedAt
    ? new Date(posts[0].updatedAt).toUTCString()
    : now.toUTCString();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      const description = [
        post.description,
        `주요 키워드: ${[post.mainKeyword, ...post.relatedKeywords, ...post.expandedKeywords.slice(0, 3)].join(", ")}`,
      ].join(" ");

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <description>${escapeXml(description)}</description>
          <category>${escapeXml(post.category)}</category>
          <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
          <source url="${SITE_URL}/rss.xml">${escapeXml(SITE_NAME)}</source>
          <enclosure url="${absoluteUrl(post.thumbnail)}" type="image/webp" />
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml("임신·출산 준비, 산전검사, 정부지원, 생활관리, 태아보험 정보를 공개 일정에 맞춰 제공하는 블로그 RSS입니다.")}</description>
    <language>ko-KR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>300</ttl>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}
