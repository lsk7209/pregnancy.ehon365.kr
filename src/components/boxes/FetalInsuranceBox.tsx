import Link from "next/link";

export function FetalInsuranceBox() {
  return (
    <aside className="my-6 rounded-xl border border-brand/40 bg-brand-soft/60 p-5">
      <h3 className="mb-2 text-base font-bold text-ink">
        임신 중기, 미리 알아두면 좋은 태아보험 일반 가이드
      </h3>
      <p className="text-sm leading-relaxed text-neutral-700">
        임신 16~22주는 일반적으로 태아보험 가입 가능 여부와 보장 항목을
        살펴보는 시기로 알려져 있습니다. 보장 종류, 가입 시기, 심사에 필요한
        기본 정보를 먼저 정리해 두면 상담 때 확인할 질문이 명확해집니다.
      </p>
      <Link
        href="/fetal-insurance"
        className="mt-4 inline-block rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
      >
        태아보험 일반 가이드 보기
      </Link>
      <p className="mt-3 text-xs text-neutral-500">
        본 사이트는 보험을 모집·중개하지 않으며, 상담과 등록은 보험대리점 또는
        광고주 랜딩에서 진행됩니다.
      </p>
    </aside>
  );
}
