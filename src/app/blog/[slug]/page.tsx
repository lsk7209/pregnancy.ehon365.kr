import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPost, getPublishedBlogPost } from "@/lib/blog-posts";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

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
          <span className="rounded-full bg-brand-soft px-2 py-1 font-medium text-brand">
            {post.category}
          </span>
          <span>{post.updatedAt}</span>
          <span>{post.readMinutes}분 읽기</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-xl font-semibold leading-relaxed text-brand">
          {post.subtitle}
        </p>
        <p className="mt-3 text-lg leading-relaxed text-neutral-700">
          {post.description}
        </p>
        <img
          src={post.thumbnail}
          alt={`${post.title} 대표 이미지`}
          className="mt-6 aspect-video w-full rounded-lg border border-neutral-200 object-cover"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {[post.mainKeyword, ...post.relatedKeywords, ...post.expandedKeywords.slice(0, 3)].map(
            (keyword) => (
              <span
                key={keyword}
                className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600"
              >
                {keyword}
              </span>
            ),
          )}
        </div>
      </header>

      <nav className="my-6 rounded-lg border border-neutral-200 bg-white p-4">
        <h2 className="text-sm font-bold text-ink">목차</h2>
        <ol className="mt-3 space-y-2 text-sm text-neutral-700">
          {post.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="hover:text-brand">
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="space-y-8">
        {post.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-2xl font-bold leading-snug text-ink">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3 text-neutral-700">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.checklist && (
              <ul className="mt-4 space-y-2 rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-700">
                {section.checklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
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

      <aside className="mt-10 rounded-lg border border-brand/30 bg-brand-soft/50 p-5">
        <h2 className="text-lg font-bold text-ink">관련 가이드</h2>
        <p className="mt-2 text-sm text-neutral-700">
          이 주제와 연결된 주차별 가이드에서 검사 일정과 준비 항목을 함께 확인할 수 있습니다.
        </p>
        <Link
          href={post.relatedHref}
          className="mt-4 inline-block rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          관련 가이드 보기
        </Link>
      </aside>
    </article>
  );
}
