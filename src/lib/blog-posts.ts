export interface BlogSection {
  id: string;
  heading: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  updatedAt: string;
  readMinutes: number;
  relatedHref: string;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "second-trimester-screening-checklist",
    title: "임신 중기 산전검사 체크포인트",
    description:
      "2차 선별 검사, 정밀초음파, 임신성 당뇨 검사처럼 중기에 자주 안내받는 검사를 주차별로 정리합니다.",
    category: "산전검사",
    updatedAt: "2026-05-30",
    readMinutes: 4,
    relatedHref: "/pregnancy/18",
    sections: [
      {
        id: "when",
        heading: "중기에 확인하는 주요 검사 시기",
        body: [
          "임신 중기에는 2차 선별 검사, 정밀초음파, 임신성 당뇨 검사처럼 시기가 정해진 검사를 안내받는 경우가 많습니다.",
          "검사 일정은 병원 예약, 이전 검사 결과, 산모 상태에 따라 달라질 수 있으므로 실제 일정은 진료기관 안내를 우선하세요.",
        ],
      },
      {
        id: "prepare",
        heading: "진료 전 준비할 질문",
        body: [
          "검사 목적, 가능한 시기, 결과 확인 방법, 추가 검사가 필요한 조건을 미리 적어가면 상담 시간이 짧아집니다.",
          "최근 증상 변화나 복용 중인 약·영양제가 있다면 함께 확인하는 것이 좋습니다.",
        ],
      },
      {
        id: "support",
        heading: "지원 제도와 함께 확인하기",
        body: [
          "검사비와 진료비는 국민행복카드, 보건소 지원, 지역별 사업과 연결될 수 있습니다.",
          "지원 범위는 지역과 시기에 따라 바뀔 수 있으므로 관할 보건소 또는 복지로에서 최신 내용을 확인하세요.",
        ],
      },
    ],
  },
  {
    slug: "pregnancy-support-benefits",
    title: "임신·출산 진료비 지원 확인하기",
    description:
      "국민행복카드, 보건소 지원, 산모·신생아 건강관리 지원처럼 놓치기 쉬운 제도를 정리합니다.",
    category: "정부지원",
    updatedAt: "2026-05-30",
    readMinutes: 3,
    relatedHref: "/pregnancy/24",
    sections: [
      {
        id: "basics",
        heading: "가장 먼저 확인할 기본 지원",
        body: [
          "임신 확인 후에는 임신·출산 진료비 지원과 보건소 임산부 등록 가능 여부를 먼저 확인하는 것이 좋습니다.",
          "엽산제·철분제 지원, 산전검사 지원은 지역별 운영 방식이 다를 수 있습니다.",
        ],
      },
      {
        id: "timing",
        heading: "주차별로 다시 점검할 항목",
        body: [
          "임신 중기에는 산전검사 지원과 진료비 잔액을, 임신 후기에는 산모·신생아 건강관리 지원 신청 시기를 확인하세요.",
          "출산 예정일 기준 신청 기간이 있는 제도는 미리 준비해야 놓치지 않습니다.",
        ],
      },
      {
        id: "where",
        heading: "확인 경로",
        body: [
          "복지로, 정부24, 국민건강보험공단, 거주지 보건소가 대표적인 확인 경로입니다.",
          "제도명은 같아도 지자체별 추가 지원이 있을 수 있어 주소지 기준 확인이 필요합니다.",
        ],
      },
    ],
  },
  {
    slug: "fetal-insurance-before-consulting",
    title: "태아보험 상담 전 알아둘 기본 항목",
    description:
      "가입 시기, 보장 항목, 상담 전 질문을 일반 정보 기준으로 정리합니다.",
    category: "태아보험",
    updatedAt: "2026-05-30",
    readMinutes: 4,
    relatedHref: "/fetal-insurance",
    sections: [
      {
        id: "scope",
        heading: "이 글의 범위",
        body: [
          "태아보험은 특정 상품을 고르는 문제가 아니라 보장 범위, 가입 시기, 심사 조건을 확인하는 과정입니다.",
          "이 글은 상품 추천이나 비교가 아니라 상담 전에 알아두면 좋은 일반 기준을 정리합니다.",
        ],
      },
      {
        id: "questions",
        heading: "상담 전에 적어둘 질문",
        body: [
          "가입 가능 주수, 태아 특약, 출생 후 보장 전환, 납입 기간, 만기, 해지 환급 구조를 확인해 보세요.",
          "최근 산전검사 결과나 진료 이력이 심사에 영향을 주는지도 상담에서 확인할 수 있습니다.",
        ],
      },
      {
        id: "notice",
        heading: "광고 링크를 볼 때 주의할 점",
        body: [
          "광고 링크는 상담 연결을 위한 경로이며, 실제 상담과 계약은 등록된 보험대리점 또는 광고주 페이지에서 진행됩니다.",
          "가입 권유 문구보다 약관, 보장 범위, 보험료 지속 가능성을 기준으로 판단하는 것이 좋습니다.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
