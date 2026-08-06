import Link from "next/link";
import type { Metadata } from "next";
import { and, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { cpaOffers, type CpaOffer } from "@/db/schema";
import { fallbackFetalInsuranceOffer } from "@/lib/db-fallbacks";

export const metadata: Metadata = {
  title: "태아보험 일반 가이드",
  description:
    "태아보험의 기본 개념, 확인할 항목, 상담 전 준비할 내용을 정리한 일반 정보 페이지입니다.",
};

async function getActiveOffer(): Promise<CpaOffer | null> {
  try {
    const offers = await db
      .select()
      .from(cpaOffers)
      .where(
        and(
          eq(cpaOffers.vertical, "fetal_insurance"),
          eq(cpaOffers.status, "active"),
        ),
      )
      .orderBy(cpaOffers.priority)
      .limit(1);

    return offers[0] ?? fallbackFetalInsuranceOffer;
  } catch (error) {
    console.warn("getActiveOffer fallback:", error);
    return fallbackFetalInsuranceOffer;
  }
}

export default async function FetalInsurancePage() {
  const offer = await getActiveOffer();

  return (
    <article className="space-y-8">
      <section>
        <p className="text-sm font-semibold text-brand">광고 고지 포함</p>
        <h1 className="mt-1 text-3xl font-bold text-ink">
          태아보험 일반 가이드
        </h1>
        <p className="mt-3 text-neutral-700">
          태아보험은 임신 중 태아와 출생 이후 아이에게 생길 수 있는 보장
          항목을 검토하는 보험 영역입니다. 이 페이지는 특정 상품 추천이나
          비교가 아니라, 상담 전에 알아두면 좋은 일반 기준을 정리합니다.
        </p>
      </section>

      <section className="rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-xl font-bold text-ink">먼저 확인할 항목</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-neutral-700">
          <li>가입 가능 시기와 심사에 필요한 임신 주수</li>
          <li>태아 특약, 출생 후 전환, 실손·진단비 등 보장 범위</li>
          <li>보험료 납입 기간, 만기, 해지 환급 구조</li>
          <li>산전검사 결과나 진료 이력이 심사에 미치는 영향</li>
        </ul>
      </section>

      <section className="rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-xl font-bold text-ink">상담 전 준비</h2>
        <p className="mt-2 text-neutral-700">
          임신 주수, 예정일, 기존 진료 이력, 최근 산전검사 안내 내용을 정리해
          두면 상담 시간을 줄일 수 있습니다. 보장 필요성과 보험료 수준은
          가정마다 다르므로 여러 조건을 확인하고 결정하는 것이 좋습니다.
        </p>
      </section>

      <section className="rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-xl font-bold text-ink">설명서와 약관을 확인하는 순서</h2>
        <p className="mt-2 text-neutral-700">
          가입 가능 여부와 보장 범위는 보험사, 상품, 고지 내용과 계약 조건에
          따라 달라질 수 있습니다. 상담 전에 상품설명서와 약관에서 확인할
          항목을 같은 순서로 적어 두면 광고 문구와 실제 계약 내용을 구분하기
          쉽습니다.
        </p>
        <ol className="mt-3 list-inside list-decimal space-y-2 text-neutral-700">
          <li>보장 대상과 보장하지 않는 경우를 각각 확인합니다.</li>
          <li>갱신 여부, 납입 기간, 만기, 해지 환급 관련 설명을 기록합니다.</li>
          <li>출생 전후에 계약이나 특약이 어떻게 달라지는지 질문합니다.</li>
          <li>설명받은 내용과 약관 문구가 다르면 가입 전에 다시 확인합니다.</li>
        </ol>
      </section>

      <section className="rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-xl font-bold text-ink">공식 확인 경로</h2>
        <p className="mt-2 text-neutral-700">
          아래 기관은 보험 소비자가 상품과 계약 내용을 확인할 때 참고할 수
          있는 공식 안내 경로입니다. 링크는 특정 보험사나 상품을 추천하기
          위한 것이 아니며, 실제 계약 전에는 제공받은 설명서와 약관을
          우선 확인하세요.
        </p>
        <ul className="mt-3 list-inside list-disc space-y-2 text-neutral-700">
          <li>
            <a
              href="https://www.fss.or.kr/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand underline"
            >
              금융감독원
            </a>
            에서 금융소비자 안내를 확인합니다.
          </li>
          <li>
            <a
              href="https://www.e-insmarket.or.kr/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand underline"
            >
              온라인 보험슈퍼마켓 보험다모아
            </a>
            에서 비교·공시 정보를 확인합니다.
          </li>
          <li>
            <a
              href="https://www.knia.or.kr/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand underline"
            >
              손해보험협회
            </a>
            의 소비자 안내도 함께 확인할 수 있습니다.
          </li>
        </ul>
      </section>

      {offer && (
        <section className="rounded-xl border border-brand/40 bg-brand-soft/60 p-5">
          <h2 className="text-xl font-bold text-ink">무료 상담 연결</h2>
          <p className="mt-2 text-neutral-700">
            아래 링크는 광고/제휴 링크이며 상담 신청 시 사이트에 수익이 발생할
            수 있습니다. 상담과 가입 절차는 등록된 보험대리점 또는 광고주
            랜딩에서 진행됩니다.
          </p>
          <Link
            href={`/go/${offer.id}?sub_id=fetal-insurance`}
            className="mt-4 inline-block rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            광고주 상담 페이지로 이동
          </Link>
        </section>
      )}

      <p className="text-sm text-neutral-500">
        본 사이트는 보험을 모집·중개하지 않으며, 특정 보험사나 상품 가입을
        권유하지 않습니다.
      </p>
    </article>
  );
}
