import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사이트 소개",
};

export default function AboutPage() {
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold text-ink">사이트 소개</h1>
      <p className="text-neutral-700">
        임신·출산 준비 종합 가이드는 임신 주차별 변화, 검사 일정, 정부 지원
        정보를 쉽게 확인할 수 있도록 정리하는 정보 사이트입니다.
      </p>
      <p className="text-neutral-700">
        모든 의학 정보는 일반 안내 목적이며 진단, 치료, 처방을 대신하지
        않습니다. 개인 상태에 관한 결정은 반드시 의료기관과 상담해 주세요.
      </p>
    </article>
  );
}
