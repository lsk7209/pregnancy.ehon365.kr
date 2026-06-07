import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의하기",
  description:
    "임신 출산 준비 가이드의 정보 오류 제보, 광고 및 제휴 문의, 개인정보 관련 요청을 안내합니다.",
};

export default function ContactPage() {
  return (
    <article className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-ink">문의하기</h1>
        <p className="text-neutral-700">
          임신 출산 준비 가이드는 일반 정보 제공을 목적으로 운영됩니다. 정보 오류 제보, 출처 정정,
          광고 및 제휴 문의, 개인정보 관련 요청은 아래 안내에 따라 보내 주세요.
        </p>
      </header>

      <section className="space-y-3 text-neutral-700">
        <h2 className="text-xl font-semibold text-ink">문의 가능 항목</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>임신 주차별 정보, 출산 준비, 정부 지원 정보의 오류 제보</li>
          <li>출처 보강, 최신 고시나 제도 변경 반영 요청</li>
          <li>광고 게재, 제휴, 사이트 운영 관련 문의</li>
          <li>개인정보 열람, 정정, 삭제 요청</li>
        </ul>
      </section>

      <section className="space-y-3 text-neutral-700">
        <h2 className="text-xl font-semibold text-ink">연락처</h2>
        <p>
          이메일:{" "}
          <a className="font-medium text-brand underline" href="mailto:contact@ehon365.kr">
            contact@ehon365.kr
          </a>
        </p>
        <p>
          빠른 확인을 위해 문의 제목에 사이트명과 요청 유형을 함께 적어 주세요. 예: 임신 출산 준비
          가이드 - 정보 정정 요청.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-600">
        <h2 className="text-base font-semibold text-ink">의료 정보 관련 안내</h2>
        <p>
          본 사이트는 진단, 치료, 처방을 대신하지 않습니다. 임신 중 증상, 검사 결과, 약물 복용,
          응급 상황과 관련된 판단은 산부인과 전문의나 의료기관에 직접 상담해 주세요.
        </p>
      </section>
    </article>
  );
}
