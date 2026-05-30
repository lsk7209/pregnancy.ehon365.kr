import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "블로그",
  description:
    "임신·출산 준비 과정에서 자주 확인하는 주제와 체크리스트를 모아보는 블로그입니다.",
};

export default function BlogPage() {
  return (
    <article className="space-y-8">
      <section>
        <p className="text-sm font-semibold text-brand">임신·출산 블로그</p>
        <h1 className="mt-1 text-3xl font-bold text-ink">블로그</h1>
        <p className="mt-3 text-neutral-700">
          임신 주차별 변화, 산전검사, 정부지원, 태아보험 일반 정보를
          카드형 목록으로 정리했습니다. 각 글은 모바일에서도 목차와 본문을
          빠르게 훑을 수 있도록 구성했습니다.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex min-h-56 flex-col rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-brand/50 hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-3 text-xs text-neutral-500">
              <span className="rounded-full bg-brand-soft px-2 py-1 font-medium text-brand">
                {post.category}
              </span>
              <span>{post.readMinutes}분 읽기</span>
            </div>
            <h2 className="mt-4 text-lg font-bold leading-snug text-ink">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-3 text-sm text-neutral-700">
              {post.description}
            </p>
            <span className="mt-auto pt-5 text-sm font-semibold text-brand">
              글 보기
            </span>
          </Link>
        ))}
      </section>
    </article>
  );
}
