import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  blogPosts,
  generatedBlogPosts,
  getBlogSchedule,
  type BlogPost,
} from "../src/lib/blog-posts";

interface AuditIssue {
  slug: string;
  field: string;
  message: string;
}

const outputDir = join(process.cwd(), "content");
const schedule = getBlogSchedule();
const issues: AuditIssue[] = [];

function addIssue(post: BlogPost, field: string, message: string) {
  issues.push({ slug: post.slug, field, message });
}

function assertUnique(posts: BlogPost[], field: keyof BlogPost) {
  const seen = new Map<string, string>();
  for (const post of posts) {
    const value = String(post[field]);
    const previous = seen.get(value);
    if (previous) {
      addIssue(post, String(field), `duplicate with ${previous}`);
    }
    seen.set(value, post.slug);
  }
}

function includesKeyword(text: string, keyword: string) {
  return text.toLowerCase().includes(keyword.toLowerCase());
}

assertUnique(blogPosts, "slug");
assertUnique(blogPosts, "title");
assertUnique(generatedBlogPosts, "mainKeyword");

for (const post of generatedBlogPosts) {
  if (post.qualityScore < 90) {
    addIssue(post, "qualityScore", "quality score must be at least 90");
  }
  if (!post.thumbnail) {
    addIssue(post, "thumbnail", "article must have a thumbnail");
  } else {
    const thumbnailPath = join(process.cwd(), "public", post.thumbnail.replace(/^\//, ""));
    if (!existsSync(thumbnailPath)) {
      addIssue(post, "thumbnail", `thumbnail file missing: ${post.thumbnail}`);
    }
  }
  if (!includesKeyword(post.title, post.mainKeyword)) {
    addIssue(post, "title", "title must include main keyword");
  }
  if (!post.expandedKeywords.some((keyword) => includesKeyword(post.title, keyword))) {
    addIssue(post, "title", "title must include at least one expanded keyword");
  }
  if (!includesKeyword(post.subtitle, post.mainKeyword)) {
    addIssue(post, "subtitle", "subtitle must include main keyword");
  }
  if (!post.relatedKeywords.some((keyword) => includesKeyword(post.subtitle, keyword))) {
    addIssue(post, "subtitle", "subtitle must include at least one related keyword");
  }
  if (!post.expandedKeywords.some((keyword) => includesKeyword(post.subtitle, keyword))) {
    addIssue(post, "subtitle", "subtitle must include at least one expanded keyword");
  }
  if (!post.accentColor || !post.secondaryColor) {
    addIssue(post, "colors", "article must have accent and secondary colors");
  }
  if (post.sections.length < 5) {
    addIssue(post, "sections", "article must have at least five sections");
  }
  const sectionKinds = new Set(post.sections.map((section) => section.kind));
  if (sectionKinds.size < 4) {
    addIssue(post, "sections", "article must use at least four section types");
  }
  if (post.faq.length < 3) {
    addIssue(post, "faq", "article must have at least three FAQ items");
  }
  if (post.sources.length < 2) {
    addIssue(post, "sources", "article must have at least two source hints");
  }
  if (post.aeoQuestions.length < 2) {
    addIssue(post, "aeoQuestions", "article must have at least two AEO questions");
  }
  if (post.expandedKeywords.length < 5) {
    addIssue(post, "expandedKeywords", "article must have at least five expanded keywords");
  }
}

for (let index = 1; index < generatedBlogPosts.length; index += 1) {
  const previous = new Date(generatedBlogPosts[index - 1].publishedAt).getTime();
  const current = new Date(generatedBlogPosts[index].publishedAt).getTime();
  const diffHours = (current - previous) / (60 * 60 * 1000);
  if (diffHours !== schedule.scheduleIntervalHours) {
    addIssue(
      generatedBlogPosts[index],
      "publishedAt",
      `expected ${schedule.scheduleIntervalHours}h interval, got ${diffHours}h`,
    );
  }
}

const titleMap = {
  persona_source: "site-config/site-persona.yaml",
  published_title_source: "src/lib/blog-posts.ts",
  topic: "임신·출산 준비 가이드",
  target_count: 100,
  generated_count: generatedBlogPosts.length,
  review_count: 0,
  failed_count: issues.length,
  target_met: generatedBlogPosts.length === 100,
  handoff_ready: generatedBlogPosts.length === 100 && issues.length === 0,
  schedule,
  titles: generatedBlogPosts.map((post, index) => ({
    order: index + 1,
    title: post.title,
    subtitle: post.subtitle,
    slug: post.slug,
    main_keyword: post.mainKeyword,
    related_keywords: post.relatedKeywords,
    expanded_keywords: post.expandedKeywords,
    search_intent: post.aeoQuestions[0],
    persona_fit: "임신·출산 정보를 불안 조장 없이 체크리스트와 공식 확인 경로로 정리",
    duplicate_status: "new",
    cannibalization_status: "clear",
    next_content_angle: post.sections[0]?.heading ?? post.subtitle,
    recommended_format: post.category,
    supporting_elements: [
      "toc",
      ...Array.from(new Set(post.sections.map((section) => section.kind ?? "body"))),
      "faq",
      "source_box",
      "color_accent",
    ],
    content_type_reason: `${post.category} 검색 의도에 맞춰 목차, 직접답변, 확인 질문 중심으로 구성`,
    research_seed: `${post.mainKeyword} ${post.relatedKeywords.join(" ")} 공식 안내`,
    source_hint: post.sources.map((source) => source.name),
    thumbnail: post.thumbnail,
    published_at: post.publishedAt,
    quality_score: post.qualityScore,
  })),
};

const auditReport = {
  checked_at: new Date().toISOString(),
  generated_count: generatedBlogPosts.length,
  total_posts: blogPosts.length,
  schedule,
  min_quality_score: Math.min(...generatedBlogPosts.map((post) => post.qualityScore)),
  issues,
};

mkdirSync(outputDir, { recursive: true });
writeJson(join(outputDir, "title-map.json"), titleMap);
writeJson(join(outputDir, "content-audit-report.json"), auditReport);

if (issues.length > 0 || generatedBlogPosts.length !== 100) {
  console.error(JSON.stringify(auditReport, null, 2));
  process.exit(1);
}

console.log(
  `Blog content audit passed: ${generatedBlogPosts.length} generated posts, min quality ${auditReport.min_quality_score}, interval ${schedule.scheduleIntervalHours}h.`,
);

function writeJson(path: string, data: unknown) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}
