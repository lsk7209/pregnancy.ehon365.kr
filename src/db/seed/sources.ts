export const sourceSeed = [
  {
    sourceName: "임신육아종합포털 아이사랑",
    sourceUrl: "https://www.childcare.go.kr",
    sourceType: "gov" as const,
    license: "공공자료 출처 표시 후 인용",
    trustScore: 10,
  },
  {
    sourceName: "대한산부인과학회",
    sourceUrl: "https://www.ksog.org",
    sourceType: "academic" as const,
    license: "학회 자료 출처 표시 인용",
    trustScore: 9,
  },
  {
    sourceName: "국민건강보험공단 건강iN",
    sourceUrl: "https://www.nhis.or.kr",
    sourceType: "gov" as const,
    license: "공공자료 출처 표시 후 인용",
    trustScore: 10,
  },
];

export const extractSeed = [
  {
    sourceIndex: 0,
    weekNumber: 18,
    category: "development" as const,
    rawText:
      "임신 18주에는 태아의 크기가 약 14cm, 무게가 약 190g 내외로 자랍니다. 신경계가 발달하면서 움직임이 활발해지고 일부 산모는 첫 태동을 느끼기 시작합니다.",
    summary:
      "18주 태아는 약 14cm, 190g 내외로 자라며 신경계 발달과 함께 움직임이 활발해질 수 있습니다.",
    citationFormat: "(출처: 임신육아종합포털 아이사랑)",
    status: "verified" as const,
    verifiedBy: "seed",
  },
  {
    sourceIndex: 1,
    weekNumber: 18,
    category: "mother" as const,
    rawText:
      "임신 중기에는 자궁이 커지며 배가 앞으로 나오고, 입덧이 줄어 식욕이 돌아오는 경우가 있습니다. 일부 산모는 허리 통증이나 다리 부종을 경험할 수 있습니다.",
    summary:
      "임신 중기에는 복부가 드러나고 식욕이 회복될 수 있으며, 허리 통증이나 부종이 나타날 수 있습니다.",
    citationFormat: "(출처: 대한산부인과학회)",
    status: "verified" as const,
    verifiedBy: "seed",
  },
  {
    sourceIndex: 2,
    weekNumber: null,
    category: "screening" as const,
    rawText:
      "임신 중기에는 정밀초음파와 2차 기형아 선별 검사를 안내받는 시기입니다. 검사 시기와 항목은 산모 상태에 따라 의료진이 결정합니다.",
    summary:
      "임신 중기에는 정밀초음파와 2차 선별 검사를 상담할 수 있으며, 구체적인 시기와 항목은 의료진이 결정합니다.",
    citationFormat: "(출처: 국민건강보험공단 건강iN)",
    status: "verified" as const,
    verifiedBy: "seed",
  },
];
