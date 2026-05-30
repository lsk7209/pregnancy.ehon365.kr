import { NextResponse } from "next/server";
import {
  getPublishedBlogPosts,
  isPublished,
} from "@/lib/blog-posts";
import { notifyIndexing, sitemapUrl } from "@/lib/indexing";
import { SITE_URL } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const recentWindowHours = 6;

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const windowStart = now.getTime() - recentWindowHours * 60 * 60 * 1000;
  const recentPosts = getPublishedBlogPosts(now).filter((post) => {
    const publishedAt = new Date(post.publishedAt).getTime();
    return isPublished(post, now) && publishedAt >= windowStart;
  });

  const urls = [
    sitemapUrl,
    ...recentPosts.map((post) => `${SITE_URL}/blog/${post.slug}`),
  ];
  const result = await notifyIndexing(urls);

  return NextResponse.json({
    ok: result.indexNow === "submitted",
    recentWindowHours,
    recentPostCount: recentPosts.length,
    result,
  });
}
