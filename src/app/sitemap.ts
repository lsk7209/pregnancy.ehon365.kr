import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/blog-posts";
import { CORE_WEEKS } from "@/lib/week-data";
import { SITE_URL } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/blog",
    "/fetal-insurance",
    "/about",
    "/privacy",
    "/terms",
  ];
  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
    })),
    ...CORE_WEEKS.map((week) => ({
      url: `${SITE_URL}/pregnancy/${week}`,
      lastModified: now,
    })),
    ...getPublishedBlogPosts(now).map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
    })),
  ];
}
