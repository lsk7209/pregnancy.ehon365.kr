import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getBlogPost,
  getPublishedBlogPost,
  getRelatedBlogPosts,
  type BlogSection,
} from "@/lib/blog-posts";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

function tint(hex: string, opacity = "1a") {
  return `${hex}${opacity}`;
}

function sectionLabel(kind: BlogSection["kind"]) {
  const labels: Record<NonNullable<BlogSection["kind"]>, string> = {
    summary: "핵심",
    checklist: "체크",
    steps: "순서",
    warning: "주의",
    compare: "비교",
    source: "확인",
  };
  return kind ? labels[kind] : "본문";
}

function SectionSupport({
  section,
  accentColor,
  secondaryColor,
}: {
  section: BlogSection;
  accentColor: string;
  secondaryColor: string;
}) {
  if (!section.checklist?.length) return null;

  if (section.kind === "steps") {
    return (
      <ol className="mt-4 space-y-3 rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-700">
        {section.checklist.map((item, index) => (
          <li key={item} className="flex gap-3">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: accentColor }}
            >
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    );
  }

  if (section.kind === "compare") {
    return (
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {section.checklist.map((item, index) => (
          <div
            key={item}
            className="rounded-lg border p-3 text-sm leading-relaxed text-neutral-700"
            style={{
              borderColor: index % 2 === 0 ? tint(accentColor, "55") : tint(secondaryColor, "55"),
              backgroundColor: index % 2 === 0 ? tint(accentColor, "0f") : tint(secondaryColor, "0f"),
            }}
          >
            {item}
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul
      className="mt-4 space-y-2 rounded-lg border bg-white p-4 text-sm text-neutral-700"
      style={{ borderColor: tint(accentColor, "55") }}
    >
      {section.checklist.map((item) => (
        <li key={item} className="flex gap-2">
          <span
            className="mt-1 h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: section.kind === "warning" ? secondaryColor : accentColor }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: [post.mainKeyword, ...post.relatedKeywords, ...post.expandedKeywords],
    robots:
      new Date(post.publishedAt).getTime() <= Date.now()
        ? undefined
        : { index: false, follow: false },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      images: [
        {
          url: post.thumbnail,
          width: 1200,
          height: 675,
          alt: `${post.title} 대표 이미지`,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPublishedBlogPost(slug);
  if (!post) notFound();
  const relatedPosts = getRelatedBlogPosts(post, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    dateModified: post.updatedAt,
    datePublished: post.publishedAt,
    image: `${SITE_URL}${post.thumbnail}`,
    inLanguage: "ko-KR",
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: [post.mainKeyword, ...post.relatedKeywords, ...post.expandedKeywords],
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header className="border-b border-neutral-200 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-500">
          <span
            className="rounded-full px-2 py-1 font-medium"
            style={{ backgroundColor: tint(post.accentColor), color: post.accentColor }}
          >
            {post.category}
          </span>
          <span>{post.updatedAt}</span>
          <span>{post.readMinutes}분 읽기</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-xl font-semibold leading-relaxed" style={{ color: post.secondaryColor }}>
          {post.subtitle}
        </p>
        <p className="mt-3 text-lg leading-relaxed text-neutral-700">
          {post.description}
        </p>
        <img
          src={post.thumbnail}
          alt={`${post.title} 대표 이미지`}
          className="mt-6 aspect-video w-full rounded-lg border object-cover"
          style={{ borderColor: tint(post.accentColor, "66") }}
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {[post.mainKeyword, ...post.relatedKeywords, ...post.expandedKeywords.slice(0, 3)].map(
            (keyword, index) => (
              <span
                key={keyword}
                className="rounded-full px-2.5 py-1 text-xs font-medium text-neutral-700"
                style={{ backgroundColor: tint(index % 2 === 0 ? post.accentColor : post.secondaryColor, "14") }}
              >
                {keyword}
              </span>
            ),
          )}
        </div>
      </header>

      <nav
        className="my-6 rounded-lg border bg-white p-4"
        style={{ borderColor: tint(post.accentColor, "55") }}
      >
        <h2 className="text-sm font-bold text-ink">목차</h2>
        <ol className="mt-3 space-y-2 text-sm text-neutral-700">
          {post.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="flex items-center gap-2 hover:text-brand">
                <span
                  className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                  style={{ backgroundColor: tint(post.secondaryColor, "16"), color: post.secondaryColor }}
                >
                  {sectionLabel(section.kind)}
                </span>
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="space-y-8">
        {post.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 rounded-lg border p-5"
            style={{
              borderColor:
                section.kind === "warning" ? tint(post.secondaryColor, "66") : tint(post.accentColor, "55"),
              backgroundColor:
                section.kind === "summary" || section.kind === "warning"
                  ? tint(section.kind === "warning" ? post.secondaryColor : post.accentColor, "0f")
                  : "#ffffff",
            }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-2 py-1 text-xs font-bold"
                style={{
                  backgroundColor: tint(section.kind === "warning" ? post.secondaryColor : post.accentColor),
                  color: section.kind === "warning" ? post.secondaryColor : post.accentColor,
                }}
              >
                {sectionLabel(section.kind)}
              </span>
            </div>
            <h2 className="mt-3 text-2xl font-bold leading-snug text-ink">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3 text-neutral-700">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <SectionSupport
              section={section}
              accentColor={post.accentColor}
              secondaryColor={post.secondaryColor}
            />
          </section>
        ))}
      </div>

      <section className="mt-10 rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-lg font-bold text-ink">자주 묻는 질문</h2>
        <div className="mt-4 space-y-4">
          {post.faq.map((item) => (
            <div key={item.question}>
              <h3 className="font-semibold text-ink">{item.question}</h3>
              <p className="mt-1 text-sm leading-relaxed text-neutral-700">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-lg font-bold text-ink">확인한 공식 경로</h2>
        <ul className="mt-3 space-y-2 text-sm text-neutral-700">
          {post.sources.map((source) => (
            <li key={source.url}>
              <a className="font-medium text-brand hover:underline" href={source.url}>
                {source.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <aside
        className="mt-10 rounded-lg border p-5"
        style={{
          borderColor: tint(post.accentColor, "66"),
          backgroundColor: tint(post.accentColor, "12"),
        }}
      >
        <h2 className="text-lg font-bold text-ink">관련 가이드</h2>
        <p className="mt-2 text-sm text-neutral-700">
          이 주제와 연결된 주차별 가이드에서 검사 일정과 준비 항목을 함께 확인할 수 있습니다.
        </p>
        <Link
          href={post.relatedHref}
          className="mt-4 inline-block rounded-lg px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          style={{ backgroundColor: post.accentColor }}
        >
          관련 가이드 보기
        </Link>
      </aside>

      {relatedPosts.length > 0 ? (
        <section className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-lg font-bold text-ink">함께 읽으면 좋은 글</h2>
            <Link href="/blog" className="text-sm font-semibold text-brand hover:underline">
              전체 글 보기
            </Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group rounded-lg border border-neutral-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-sm"
              >
                <span
                  className="rounded-full px-2 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: tint(relatedPost.accentColor, "14"),
                    color: relatedPost.accentColor,
                  }}
                >
                  {relatedPost.category}
                </span>
                <h3 className="mt-3 line-clamp-2 text-sm font-bold leading-snug text-ink group-hover:text-brand">
                  {relatedPost.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-600">
                  {relatedPost.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
