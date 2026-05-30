import type { CpaOffer, ScreeningSchedule, SupportProgram } from "@/db/schema";

export const fallbackScreenings: ScreeningSchedule[] = [
  {
    id: 1,
    screeningName: "2차 기형아 선별 검사",
    shortName: "2차 선별",
    weekRangeStart: 15,
    weekRangeEnd: 20,
    description:
      "임신 중기에 안내받을 수 있는 선별 검사입니다. 검사 여부와 시기는 의료진과 상담해 결정합니다.",
    sourceCitation: "(출처: 국민건강보험공단 건강iN)",
    displayPriority: 20,
  },
  {
    id: 2,
    screeningName: "정밀초음파",
    shortName: "정밀초음파",
    weekRangeStart: 18,
    weekRangeEnd: 22,
    description:
      "태아의 주요 장기와 구조를 자세히 살펴보는 초음파 검사입니다.",
    sourceCitation: "(출처: 대한산부인과학회)",
    displayPriority: 40,
  },
  {
    id: 3,
    screeningName: "임신성 당뇨 검사",
    shortName: "당부하검사",
    weekRangeStart: 24,
    weekRangeEnd: 28,
    description:
      "임신 중 혈당 상태를 확인하기 위해 안내받는 검사입니다.",
    sourceCitation: "(출처: 국민건강보험공단 건강iN)",
    displayPriority: 50,
  },
];

export const fallbackSupports: SupportProgram[] = [
  {
    id: 1,
    programName: "임신·출산 진료비 지원",
    programCategory: "national",
    regionType: "all",
    regionCode: null,
    eligibilityWeekStart: 0,
    eligibilityWeekEnd: 45,
    description:
      "임신과 출산 관련 진료비를 국민행복카드 바우처로 지원하는 제도입니다.",
    applicationMethod: "카드사, 은행, 정부24 또는 복지로에서 신청",
    sourceApiId: "nhis-happy-card",
    sourceUrl: "https://www.bokjiro.go.kr",
    lastSynced: null,
    status: "active",
  },
  {
    id: 2,
    programName: "임산부 엽산·철분제 지원",
    programCategory: "national",
    regionType: "all",
    regionCode: null,
    eligibilityWeekStart: 0,
    eligibilityWeekEnd: 45,
    description:
      "보건소를 통해 임신 시기에 맞춰 엽산제와 철분제를 지원받을 수 있습니다.",
    applicationMethod: "거주지 관할 보건소 문의 또는 방문 신청",
    sourceApiId: "mohw-prenatal-supplement",
    sourceUrl: "https://www.bokjiro.go.kr",
    lastSynced: null,
    status: "active",
  },
];

export const fallbackFetalInsuranceOffer: CpaOffer = {
  id: 1,
  vertical: "fetal_insurance",
  advertiser: "제휴 보험대리점",
  region: null,
  payout: 0,
  landingUrl: "https://example-advertiser-landing.kr/fetal",
  subIdParam: "sub_id",
  status: "active",
  startDate: "2026-01-01",
  endDate: null,
  priority: 10,
};

export function filterFallbackScreenings(week: number): ScreeningSchedule[] {
  return fallbackScreenings.filter(
    (screening) =>
      screening.weekRangeStart <= week && screening.weekRangeEnd >= week,
  );
}
