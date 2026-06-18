import Link from "next/link";
import type { Metadata } from "next";
import { getBlogSchedule, getPublishedBlogPosts } from "@/lib/blog-posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "블로그",
  description:
    "임신·출산 준비 과정에서 자주 확인하는 검사, 생활관리, 정부지원, 태아보험 일반 정보를 카드형 목록으로 정리했습니다.",
};

function tint(hex: string, opacity = "1a") {
  return `${hex}${opacity}`;
}

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

      <section className="rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-xl font-bold text-ink">읽기 전 확인해야 할 기준</h2>
        <p className="mt-2 leading-7 text-neutral-700">
          임신·출산 정보는 개인의 건강 상태, 진료 기록, 지역 지원 제도에 따라 달라집니다.
          이 블로그는 일반 정보와 체크리스트를 제공하며, 진단·투약·검사 일정·지원금 신청의 최종 판단은
          담당 의료진과 공식 기관 안내를 우선해야 합니다.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-neutral-200 p-4 text-sm hover:border-brand">
            <strong className="block text-ink">보건복지부</strong>
            임신·출산 지원 정책의 공식 안내를 확인합니다.
          </a>
          <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-neutral-200 p-4 text-sm hover:border-brand">
            <strong className="block text-ink">국민건강보험</strong>
            건강보험 적용과 임신·출산 진료비 지원을 확인합니다.
          </a>
          <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-neutral-200 p-4 text-sm hover:border-brand">
            <strong className="block text-ink">복지로</strong>
            지역별 복지 서비스와 신청 조건을 확인합니다.
          </a>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex min-h-64 flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition hover:border-brand/50 hover:shadow-sm"
            style={{ borderTopColor: post.accentColor, borderTopWidth: 4 }}
          >
            <img
              src={post.thumbnail}
              alt={`${post.title} 대표 이미지`}
              className="aspect-video w-full object-cover"
              loading="lazy"
            />
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between gap-3 text-xs text-neutral-500">
                <span
                  className="rounded-full px-2 py-1 font-medium"
                  style={{ backgroundColor: tint(post.accentColor), color: post.accentColor }}
                >
                  {post.category}
                </span>
                <span>{post.readMinutes}분 읽기</span>
              </div>
              <h2 className="mt-4 text-lg font-bold leading-snug text-ink">
                {post.title}
              </h2>
              <p className="mt-2 text-sm font-medium" style={{ color: post.secondaryColor }}>
                {post.subtitle}
              </p>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-700">
                {post.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {[post.mainKeyword, ...post.relatedKeywords.slice(0, 2)].map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full px-2 py-1 text-xs text-neutral-700"
                    style={{ backgroundColor: tint(post.secondaryColor, "14") }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <span className="mt-auto pt-5 text-sm font-semibold" style={{ color: post.accentColor }}>
                글 보기
              </span>
            </div>
          </Link>
        ))}
      </section>
    </article>
  );
}
