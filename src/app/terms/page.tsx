import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
};

export default function TermsPage() {
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold text-ink">이용약관</h1>
      <p className="text-neutral-700">
        본 사이트의 콘텐츠는 일반 정보 제공을 목적으로 하며, 의료적 판단이나
        법률·보험 자문을 대신하지 않습니다.
      </p>
      <p className="text-neutral-700">
        일부 링크에는 광고 또는 제휴 수익이 포함될 수 있습니다. 외부 사이트의
        상담, 계약, 결제, 개인정보 처리에 관한 책임은 해당 외부 사이트의
        정책을 따릅니다.
      </p>
    </article>
  );
}
