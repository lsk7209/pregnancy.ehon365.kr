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

      <section className="rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-xl font-bold text-ink">정보를 읽을 때 지켜야 할 기준</h2>
        <div className="mt-3 space-y-3 leading-7 text-neutral-700">
          <p>
            임신과 출산 준비 정보는 개인의 건강 상태, 임신 주수, 병력, 검사 결과, 의료기관 안내에 따라
            달라질 수 있습니다. 이 사이트는 주차별 변화와 준비 항목을 정리하지만 진단이나 치료 결정을
            대신하지 않습니다.
          </p>
          <p>
            지원금, 바우처, 건강보험 적용 항목은 신청 시점과 거주 지역, 소득 기준, 가족 구성에 따라 달라질
            수 있습니다. 글을 읽은 뒤에는 보건복지부, 국민건강보험, 정부24, 거주지 보건소의 최신 안내를
            다시 확인하는 것이 안전합니다.
          </p>
          <p>
            태아보험이나 산모 용품 안내는 일반적인 비교 기준을 설명하기 위한 자료입니다. 실제 가입 전에는
            약관, 보장 제외, 면책 기간, 갱신 조건, 보험료 변동 가능성을 직접 확인해야 하며 광고와 본문
            정보는 구분해서 읽어야 합니다.
          </p>
          <p>
            복통, 출혈, 고열, 태동 감소, 심한 두통처럼 즉시 판단이 필요한 증상은 인터넷 검색으로 해결하려
            하지 말고 의료기관이나 응급 상담 경로를 우선해야 합니다. 본문은 준비를 돕는 참고 자료입니다.
          </p>
          <p>
            임신 주차별 글은 검진 일정과 질문 목록을 준비하는 데 초점을 둡니다. 병원 방문 전에는 복용 중인
            약, 알레르기, 이전 검사 결과, 가족력, 생활 습관 변화를 정리해 두면 상담이 더 정확해집니다.
            사이트의 요약은 이런 준비 과정을 돕는 것이며, 개인별 위험도를 대신 판정하지 않습니다.
          </p>
          <p>
            정부 지원과 보험 안내는 신청 시점, 거주지, 소득 기준, 의료기관 종류, 상품 약관에 따라 결과가
            달라질 수 있습니다. 사용자는 글을 읽은 뒤 공식 기관 공지와 실제 상담 내용을 기준으로 다시
            확인해야 하며, 광고 또는 제휴 가능성은 본문 판단과 구분해서 읽어야 합니다.
          </p>
        </div>
      </section>
    </div>
  );
}
