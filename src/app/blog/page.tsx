import Link from "next/link";
import type { Metadata } from "next";
import { getBlogSchedule, getPublishedBlogPosts } from "@/lib/blog-posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "블로그",
  description:
    "임신·출산 준비 과정에서 자주 확인하는 검사, 생활관리, 정부지원, 태아보험 일반 정보를 카드형 목록으로 정리했습니다.",
};

export default function BlogPage() {
  const posts = getPublishedBlogPosts();
  const schedule = getBlogSchedule();

  return (
    <article className="space-y-8">
      <section>
        <p className="text-sm font-semibold text-brand">임신·출산 블로그</p>
        <h1 className="mt-1 text-3xl font-bold text-ink">블로그</h1>
        <p className="mt-3 text-neutral-700">
          임신 주차별 변화, 산전검사, 정부지원, 생활관리, 태아보험 일반 정보를
          카드형 목록으로 정리했습니다. 새 글은 첫 배포 후 5시간 간격으로 공개됩니다.
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          예약 글 {schedule.totalGenerated}개 · 공개 간격 {schedule.scheduleIntervalHours}시간
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex min-h-64 flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition hover:border-brand/50 hover:shadow-sm"
          >
            <img
              src={post.thumbnail}
              alt={`${post.title} 대표 이미지`}
              className="aspect-video w-full object-cover"
              loading="lazy"
            />
            <div className="flex flex-1 flex-col p-5">
            <div className="flex items-center justify-between gap-3 text-xs text-neutral-500">
              <span className="rounded-full bg-brand-soft px-2 py-1 font-medium text-brand">
                {post.category}
              </span>
              <span>{post.readMinutes}분 읽기</span>
            </div>
            <h2 className="mt-4 text-lg font-bold leading-snug text-ink">
              {post.title}
            </h2>
            <p className="mt-2 text-sm font-medium text-brand">
              {post.subtitle}
            </p>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-700">
              {post.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {[post.mainKeyword, ...post.relatedKeywords.slice(0, 2)].map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-600"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <span className="mt-auto pt-5 text-sm font-semibold text-brand">
              글 보기
            </span>
            </div>
          </Link>
        ))}
      </section>
    </article>
  );
}
