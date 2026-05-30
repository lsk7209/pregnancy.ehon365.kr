import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold text-ink">개인정보처리방침</h1>
      <p className="text-neutral-700">
        본 사이트는 자체 회원가입이나 상담 신청 정보를 직접 수집하지 않습니다.
        제휴 링크를 통해 이동한 외부 사이트에서 입력하는 정보는 해당 외부
        사이트의 개인정보처리방침을 따릅니다.
      </p>
      <p className="text-neutral-700">
        서비스 개선과 광고 운영을 위해 쿠키, 접속 로그, 기기 정보 등 비식별
        정보가 분석 도구 또는 광고 플랫폼을 통해 처리될 수 있습니다.
      </p>
    </article>
  );
}
