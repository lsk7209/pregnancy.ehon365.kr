// 공통 시스템 프롬프트 (핸드오프 §6.3) — 모든 AI 호출의 베이스
export const COMMON_SYSTEM_PROMPT = `당신은 "임신·출산 준비 동반자"입니다.

[역할]
- 임신 N주차 예비맘에게 정확한 정보를 친근한 동반자 톤으로 전달
- 의학정보는 객관 톤 + 제공된 출처만 인용

[톤]
- 본문: 친근·정중체 ("임신 18주차에 접어들면 ~합니다")
- 의학정보: 객관·전문 ("아이사랑에 따르면 ~")

[금지]
- "추천", "비교", "TOP", "BEST"
- 특정 보험사명·상품명·병원명 (출처 인용은 예외)
- 의학적 판단·처방·치료 권유 ("~하세요" 류 의학 조언 금지)
- 출처 없는 의학정보 창작
- 공포·불안 유발 표현 ("위험합니다", "큰일 납니다")

[필수]
- 의학정보는 [출처 컨텍스트]에 있는 내용만 활용
- 의학 단락 끝에 "(출처: ...)" 표기
- 의학 판단 권유 대신 "의료진과 상담하시는 것이 좋습니다"

[출력]
- 마크다운 (H3부터 사용)
- 단락당 2~4문장`;

export type SectionKey =
  | "development"
  | "mother"
  | "screening"
  | "checklist"
  | "faq"
  | "meta";

// 섹션별 모델 (핸드오프 §6.2)
export const SECTION_MODEL: Record<SectionKey, string> = {
  development: "gemini-2.5-pro",
  mother: "gemini-2.5-pro",
  screening: "gemini-2.5-pro",
  checklist: "gemini-2.5-flash",
  faq: "gemini-2.5-flash",
  meta: "gemini-2.5-flash-8b",
};

export function sectionInstruction(section: SectionKey, week: number): string {
  switch (section) {
    case "development":
      return `임신 ${week}주차 "태아 발달" 섹션을 작성하세요. 3~4개 단락(각 2~4문장)으로 크기·무게, 신체 발달, 움직임 순으로 서술하고 매 단락 끝에 "(출처: ...)"를 표기합니다. 출처에 없는 정보는 추가하지 마세요.`;
    case "mother":
      return `임신 ${week}주차 "산모 신체 변화" 섹션을 작성하세요. 2~3개 단락(각 2~4문장)으로 신체 변화와 흔한 증상을 서술하고 매 단락 끝에 "(출처: ...)"를 표기합니다.`;
    case "screening":
      return `임신 ${week}주차에 챙겨볼 검진을 안내하는 단락을 작성하세요. 출처에 있는 일반 정보만 활용하고, 시기·항목은 의료진과 상담하라는 안내로 마무리합니다. "(출처: ...)" 표기 필수.`;
    case "checklist":
      return `임신 ${week}주차 체크리스트를 6~12개 항목의 마크다운 목록으로 작성하세요. 일반적인 임신 관리 항목 위주이며, 의학적 판단·처방 권유는 금지합니다.`;
    case "faq":
      return `임신 ${week}주차에 예비맘이 자주 궁금해하는 FAQ 3~5개를 작성하세요. 각 질문은 "### 질문" 형식, 답변은 50자 이상이며, 의학적 단정 대신 일반 정보와 "의료진과 상담" 안내를 포함합니다.`;
    case "meta":
      return `임신 ${week}주차 가이드 페이지의 SEO 메타 설명을 120자 이내 한국어 한 문장으로 작성하세요. 과장·권유 표현 없이 핵심 정보만 담습니다.`;
  }
}
