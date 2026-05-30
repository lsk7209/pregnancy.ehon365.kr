import type { BoxId } from "@/lib/conditional-boxes";

interface BoxContent {
  title: string;
  body: string;
  citation?: string;
}

export const BOX_CONTENT: Record<
  Exclude<BoxId, "fetal_insurance_guide">,
  BoxContent
> = {
  first_trimester_screening: {
    title: "1차 기형아 검사 안내",
    body: "임신 11~13주에는 초음파와 혈액검사를 함께 확인하는 1차 선별 검사를 안내받는 경우가 많습니다. 검사 시기와 항목은 진료기관에서 개인 상태에 맞춰 결정합니다.",
    citation: "(출처: 국민건강보험공단 건강iN)",
  },
  second_trimester_screening: {
    title: "2차 기형아 검사 안내",
    body: "임신 15~20주에는 쿼드 검사나 통합 선별 검사 등 2차 선별 검사를 상담하는 시기입니다. 어떤 검사를 받을지는 진료기관과 상담해 결정하는 것이 좋습니다.",
    citation: "(출처: 국민건강보험공단 건강iN)",
  },
  detailed_ultrasound: {
    title: "정밀초음파 안내",
    body: "임신 20~24주 전후에는 태아의 주요 장기와 구조를 자세히 살펴보는 정밀초음파를 안내받을 수 있습니다.",
    citation: "(출처: 대한산부인과학회)",
  },
  gestational_diabetes: {
    title: "임신성 당뇨 검사 안내",
    body: "임신 24~28주에는 임신성 당뇨 선별 검사를 안내받는 경우가 많습니다. 검사 방법과 결과 해석은 의료진과 상담해 주세요.",
    citation: "(출처: 국민건강보험공단 건강iN)",
  },
  free_screening_round: {
    title: "정부 산전 진료비 지원 사용 점검",
    body: "이 시기에는 국민행복카드 등 임신·출산 진료비 지원 잔액과 사용 가능 항목을 확인해 두면 좋습니다. 세부 지원은 거주지와 제도 변경에 따라 달라질 수 있습니다.",
  },
  birth_preparation_extended: {
    title: "출산 준비 체크리스트 확장",
    body: "임신 28주 이후에는 출산 가방, 분만 계획, 산후조리 계획을 차근차근 점검해 두면 도움이 됩니다.",
  },
  newborn_supplies: {
    title: "출산용품·신생아용품 점검",
    body: "임신 32주 이후에는 신생아용품과 출산용품을 미리 정리하는 분들이 많습니다. 꼭 필요한 항목부터 체크리스트로 확인해 보세요.",
  },
  postpartum_care_booking: {
    title: "산후조리 준비 안내",
    body: "임신 36주 이후에는 산후조리와 회복 계획을 다시 확인할 시기입니다. 예약, 이동, 보호자 일정도 함께 점검해 두면 좋습니다.",
  },
};
