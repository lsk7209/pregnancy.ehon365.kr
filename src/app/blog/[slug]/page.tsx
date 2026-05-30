import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
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
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    dateModified: post.updatedAt,
    datePublished: post.updatedAt,
    inLanguage: "ko-KR",
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  return (
    <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        <p className="mt-3 text-lg leading-relaxed text-neutral-700">
          {post.description}
        </p>
      </header>

      <nav className="my-6 rounded-xl border border-neutral-200 bg-white p-4">
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
          </section>
        ))}
      </div>

      <aside className="mt-10 rounded-xl border border-brand/30 bg-brand-soft/50 p-5">
        <h2 className="text-lg font-bold text-ink">관련 가이드</h2>
        <p className="mt-2 text-sm text-neutral-700">
          이 주제와 연결된 주차별 가이드에서 검사 일정과 지원 정보를 함께
          확인할 수 있습니다.
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
