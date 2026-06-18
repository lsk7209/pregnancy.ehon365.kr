import Link from "next/link";
import type { Metadata } from "next";
import { CORE_WEEKS } from "@/lib/week-data";
import { SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: "임신·출산 준비 종합 가이드",
  description:
    "임신 주차별 변화, 검사 일정, 정부 지원 정보를 한곳에서 확인하는 임신·출산 준비 가이드입니다.",
};

const priorityWeeks = [16, 18, 20, 24];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-brand-soft/60 px-5 py-8 sm:px-7">
        <p className="text-sm font-semibold text-brand">{SITE_NAME}</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-ink sm:text-4xl">
          임신 주차별 변화와 받을 수 있는 지원을 한 번에 정리합니다
        </h1>
        <p className="mt-4 text-neutral-700">
          태아 발달, 엄마 몸의 변화, 주요 산전검사, 정부 지원 제도를
          주차별로 확인할 수 있습니다. 모든 안내는 일반 정보이며 의료 결정은
          진료기관과 상담해 주세요.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {priorityWeeks.map((week) => (
            <Link
              key={week}
              href={`/pregnancy/${week}`}
              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              {week}주 가이드
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-ink">주차별 가이드</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CORE_WEEKS.map((week) => (
            <Link
              key={week}
              href={`/pregnancy/${week}`}
              className="rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-brand/50 hover:shadow-sm"
            >
              <p className="font-semibold text-ink">임신 {week}주</p>
              <p className="mt-1 text-sm text-neutral-600">
                발달 변화, 산전검사, 지원 정보를 확인합니다.
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-xl font-bold text-ink">태아보험 일반 가이드</h2>
        <p className="mt-2 text-neutral-700">
          임신 중기에는 보장 종류와 가입 시기 같은 기본 개념을 미리 확인하는
          분들이 많습니다. 본 사이트는 보험 모집·중개를 하지 않으며, 일반
          정보와 광고 고지를 분리해 제공합니다.
        </p>
        <Link
          href="/fetal-insurance"
          className="mt-4 inline-block rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand-soft"
        >
          태아보험 일반 가이드 보기
        </Link>
      </section>
      <section className="rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-xl font-bold text-ink">공식 정보와 함께 확인하세요</h2>
        <p className="mt-2 leading-7 text-neutral-700">
          주차별 변화와 지원 제도는 참고용으로 정리했습니다. 출혈, 통증, 발열, 태동 변화처럼 즉시 판단이 필요한
          증상은 검색 정보로 해결하지 말고 의료기관에 문의해야 합니다. 지원금과 건강보험 항목은 신청 시점의
          공식 안내가 우선입니다.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand-soft">
            보건복지부 확인
          </a>
          <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand-soft">
            국민건강보험 확인
          </a>
          <Link href="/blog" className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
            블로그 가이드 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
