export interface BlogSection {
  id: string;
  heading: string;
  body: string[];
  checklist?: string[];
  kind?: "summary" | "checklist" | "steps" | "warning" | "compare" | "source";
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogSource {
  name: string;
  url: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  category: string;
  mainKeyword: string;
  relatedKeywords: string[];
  expandedKeywords: string[];
  publishedAt: string;
  updatedAt: string;
  readMinutes: number;
  qualityScore: number;
  relatedHref: string;
  geoTargets: string[];
  aeoQuestions: string[];
  sections: BlogSection[];
  faq: BlogFaq[];
  sources: BlogSource[];
  accentColor: string;
  secondaryColor: string;
}

interface ContentPlan {
  slug: string;
  title: string;
  subtitle: string;
  mainKeyword: string;
  relatedKeywords: string[];
  expandedKeywords: string[];
  category: string;
  intent: string;
  reader: string;
  angle: string;
  decisionCriterion: string;
  relatedHref: string;
  structure: "checklist" | "faq" | "howto" | "comparison" | "warning";
}

type BlogPostSeed = Omit<BlogPost, "accentColor" | "secondaryColor">;
type PlanTuple = readonly [string, string, string, string, string, string];

const publicationStart =
  process.env.BLOG_PUBLICATION_START ?? "2026-05-30T14:00:00+09:00";
const scheduleIntervalHours = 5;

const commonSources: BlogSource[] = [
  {
    name: "보건복지부 임신·출산진료비지원사업",
    url: "https://www.mohw.go.kr/menu.es?mid=a10705020100",
  },
  {
    name: "국민건강보험공단 임신·출산 진료비 지원 안내",
    url: "https://www.nhis.or.kr/",
  },
  {
    name: "임신육아종합포털 아이사랑",
    url: "https://www.childcare.go.kr/",
  },
  {
    name: "복지로 임신·출산 지원 서비스",
    url: "https://www.bokjiro.go.kr/",
  },
  {
    name: "질병관리청 예방접종도우미",
    url: "https://nip.kdca.go.kr/",
  },
];

const existingPosts: BlogPostSeed[] = [
  {
    slug: "second-trimester-screening-checklist",
    title: "임신 중기 산전검사 체크리스트",
    subtitle: "임신 중기 산전검사와 정밀초음파 준비를 한 번에 확인하기",
    description:
      "2차 선별검사, 정밀초음파, 임신성 당뇨검사처럼 중기에 자주 안내받는 검사를 주차별로 정리했습니다.",
    thumbnail: "/blog-thumbnails/second-trimester-screening-checklist.webp",
    category: "산전검사",
    mainKeyword: "임신 중기 산전검사",
    relatedKeywords: ["정밀초음파", "임신성 당뇨검사"],
    expandedKeywords: ["임신 20주 검사", "임신 24주 검사", "산전검사 준비"],
    publishedAt: "2026-05-30T09:00:00+09:00",
    updatedAt: "2026-05-30",
    readMinutes: 4,
    qualityScore: 92,
    relatedHref: "/pregnancy/18",
    geoTargets: ["대한민국", "보건소", "산부인과"],
    aeoQuestions: [
      "임신 중기에는 어떤 검사를 확인해야 하나요?",
      "정밀초음파 전 무엇을 준비해야 하나요?",
    ],
    sections: [
      {
        id: "when",
        heading: "임신 중기에 확인하는 주요 검사 시기",
        body: [
          "임신 중기에는 2차 선별검사, 정밀초음파, 임신성 당뇨검사처럼 시기가 정해진 검사를 안내받는 경우가 많습니다.",
          "검사 일정은 병원 예약, 이전 검사 결과, 산모 상태에 따라 달라질 수 있으므로 실제 일정은 진료기관 안내를 우선하세요.",
        ],
      },
      {
        id: "prepare",
        heading: "진료 전 준비하면 좋은 질문",
        body: [
          "검사 목적, 가능한 시기, 결과 확인 방법, 추가 검사가 필요한 조건을 미리 적어가면 상담 시간이 짧아도 핵심을 놓치지 않습니다.",
          "최근 증상 변화나 복용 중인 영양제와 약이 있다면 함께 확인하는 것이 좋습니다.",
        ],
      },
      {
        id: "support",
        heading: "지원 제도와 함께 확인하기",
        body: [
          "검사비와 진료비는 국민행복카드, 보건소 지원, 지자체 사업과 연결될 수 있습니다.",
          "지원 범위는 거주지와 시기에 따라 바뀔 수 있으므로 보건소와 복지로에서 최신 내용을 확인하세요.",
        ],
      },
    ],
    faq: [
      {
        question: "임신 중기 검사는 모두 같은 병원에서 해야 하나요?",
        answer:
          "대부분 다니는 산부인과에서 안내받지만, 정밀초음파나 추가 검사는 연계 기관에서 진행될 수 있습니다.",
      },
    ],
    sources: commonSources.slice(0, 3),
  },
  {
    slug: "pregnancy-support-benefits",
    title: "임신·출산 진료비 지원 확인하기",
    subtitle: "국민행복카드와 보건소 지원을 임신 주차별로 점검하기",
    description:
      "국민행복카드, 보건소 지원, 산모·신생아 건강관리 지원처럼 놓치기 쉬운 제도를 정리했습니다.",
    thumbnail: "/blog-thumbnails/pregnancy-support-benefits.webp",
    category: "정부지원",
    mainKeyword: "임신 출산 진료비 지원",
    relatedKeywords: ["국민행복카드", "보건소 임산부 지원"],
    expandedKeywords: ["복지로 임신 지원", "산모 신생아 건강관리", "임신 바우처"],
    publishedAt: "2026-05-30T09:00:00+09:00",
    updatedAt: "2026-05-30",
    readMinutes: 3,
    qualityScore: 92,
    relatedHref: "/pregnancy/24",
    geoTargets: ["대한민국", "복지로", "국민건강보험공단"],
    aeoQuestions: [
      "임신 출산 진료비 지원은 어디서 확인하나요?",
      "국민행복카드는 언제 신청하나요?",
    ],
    sections: [
      {
        id: "basics",
        heading: "가장 먼저 확인할 기본 지원",
        body: [
          "임신 확인 후에는 임신·출산 진료비 지원과 보건소 임산부 등록 가능 여부를 먼저 확인하는 것이 좋습니다.",
          "쌍태아, 분만취약지, 지자체 추가 지원은 운영 방식이 다를 수 있습니다.",
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
        heading: "공식 확인 경로",
        body: [
          "복지로, 정부24, 국민건강보험공단, 거주지 보건소가 대표적인 확인 경로입니다.",
          "제도명이 같아도 지자체별 추가 지원이 있을 수 있어 주소지 기준 확인이 필요합니다.",
        ],
      },
    ],
    faq: [
      {
        question: "지원금 정보는 블로그 글만 보고 신청해도 되나요?",
        answer:
          "아닙니다. 지원 기준과 신청 기간은 변경될 수 있으므로 최종 신청 전 공식 기관 안내를 확인해야 합니다.",
      },
    ],
    sources: commonSources.slice(0, 4),
  },
  {
    slug: "fetal-insurance-before-consulting",
    title: "태아보험 상담 전 알아둘 기본 항목",
    subtitle: "태아보험 가입시기와 보장 확인 질문을 상담 전 정리하기",
    description:
      "가입 가능 시기, 보장 항목, 상담 전 질문을 특정 상품 추천 없이 일반 정보 기준으로 정리했습니다.",
    thumbnail: "/blog-thumbnails/fetal-insurance-before-consulting.webp",
    category: "태아보험",
    mainKeyword: "태아보험 상담",
    relatedKeywords: ["태아보험 가입시기", "태아보험 보장"],
    expandedKeywords: ["태아보험 질문", "태아보험 체크리스트", "보험 상담 준비"],
    publishedAt: "2026-05-30T09:00:00+09:00",
    updatedAt: "2026-05-30",
    readMinutes: 4,
    qualityScore: 91,
    relatedHref: "/fetal-insurance",
    geoTargets: ["대한민국", "보험 상담"],
    aeoQuestions: [
      "태아보험 상담 전 무엇을 물어봐야 하나요?",
      "태아보험은 어떤 기준으로 비교해야 하나요?",
    ],
    sections: [
      {
        id: "scope",
        heading: "이 글에서 다루는 범위",
        body: [
          "태아보험은 특정 상품을 고르는 문제가 아니라 보장 범위, 가입 시기, 심사 조건을 확인하는 과정입니다.",
          "이 글은 상품 추천이나 비교가 아닌 상담 전에 알아두면 좋은 일반 기준을 정리합니다.",
        ],
      },
      {
        id: "questions",
        heading: "상담 전에 적어둘 질문",
        body: [
          "가입 가능 주수, 태아 특약, 출생 후 보장 전환, 납입 기간, 만기, 해지 환급 구조를 확인해 보세요.",
          "최근 산전검사 결과와 진료 이력이 심사에 영향을 주는지도 상담에서 확인할 수 있습니다.",
        ],
      },
      {
        id: "notice",
        heading: "광고 링크를 볼 때 주의할 점",
        body: [
          "광고 링크는 상담 연결을 위한 경로이며 실제 상담과 계약은 등록된 보험대리점 또는 광고주 페이지에서 진행됩니다.",
          "가입 권유 문구보다 약관, 보장 범위, 보험료 지속 가능성을 기준으로 판단하는 것이 좋습니다.",
        ],
      },
    ],
    faq: [
      {
        question: "태아보험 글에서 특정 상품을 추천하나요?",
        answer:
          "아닙니다. 이 사이트는 특정 보험 상품을 순위화하거나 추천하지 않고, 상담 전 확인할 질문을 정리합니다.",
      },
    ],
    sources: commonSources.slice(0, 2),
  },
];

function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function scheduledAt(index: number) {
  return addHours(new Date(publicationStart), index * scheduleIntervalHours).toISOString();
}

function plan(
  slug: string,
  title: string,
  subtitle: string,
  mainKeyword: string,
  relatedKeywords: string[],
  expandedKeywords: string[],
  category: string,
  intent: string,
  reader: string,
  angle: string,
  decisionCriterion: string,
  relatedHref: string,
  structure: ContentPlan["structure"],
): ContentPlan {
  const expanded = Array.from(
    new Set([
      ...expandedKeywords,
      mainKeyword,
      ...relatedKeywords,
      `${mainKeyword} 체크리스트`,
      `${mainKeyword} 질문`,
    ]),
  );

  return {
    slug,
    title,
    subtitle,
    mainKeyword,
    relatedKeywords,
    expandedKeywords: expanded,
    category,
    intent,
    reader,
    angle,
    decisionCriterion,
    relatedHref,
    structure,
  };
}

function textIncludesKeyword(text: string, keyword: string) {
  return text.toLowerCase().includes(keyword.toLowerCase());
}

function ensureTitleKeyword(title: string, mainKeyword: string, expandedKeywords: string[]) {
  const expanded = expandedKeywords.find((keyword) => keyword !== mainKeyword) ?? expandedKeywords[0];
  const withMain = textIncludesKeyword(title, mainKeyword) ? title : `${mainKeyword} ${title}`;
  return expanded && !textIncludesKeyword(withMain, expanded)
    ? `${withMain}: ${expanded}`
    : withMain;
}

function ensureSubtitleKeywords(
  subtitle: string,
  mainKeyword: string,
  relatedKeywords: string[],
  expandedKeywords: string[],
) {
  const withMain = textIncludesKeyword(subtitle, mainKeyword)
    ? subtitle
    : `${mainKeyword}와 ${subtitle}`;
  const hasRelated = relatedKeywords.some((keyword) => textIncludesKeyword(withMain, keyword));
  const withRelated = hasRelated ? withMain : `${withMain}: ${relatedKeywords[0]} 함께 확인`;
  const expanded = expandedKeywords.find((keyword) => keyword !== mainKeyword) ?? expandedKeywords[0];
  return expanded && !textIncludesKeyword(withRelated, expanded)
    ? `${withRelated}, ${expanded}까지`
    : withRelated;
}

const pregnancyWeekPlans = [
  plan("pregnancy-5-weeks-symptoms-check", "임신 5주 증상 체크리스트", "임신 5주 증상과 초기검사 준비를 함께 확인하기", "임신 5주 증상", ["초기검사", "아기집 확인"], ["임신초기 피로", "임신 5주 초음파", "산부인과 첫 방문"], "주차별 임신", "초기 증상이 정상 범위인지 알고 싶다", "첫 임신으로 몸의 변화가 낯선 독자", "증상 기록과 진료 질문을 분리해 불안을 줄인다", "갑작스러운 통증이나 출혈 여부", "/pregnancy/4", "checklist"),
  plan("pregnancy-6-weeks-ultrasound-guide", "임신 6주 초음파 확인 포인트", "임신 6주 초음파와 심장박동 확인 전 알아둘 점", "임신 6주 초음파", ["심장박동", "아기집"], ["난황", "초기 초음파", "예정일 계산"], "주차별 임신", "초음파에서 무엇을 확인하는지 알고 싶다", "첫 초음파 예약을 앞둔 독자", "초음파 용어를 쉬운 질문 목록으로 바꾼다", "의료진 설명을 기록했는지", "/pregnancy/4", "faq"),
  plan("pregnancy-7-weeks-morning-sickness", "임신 7주 입덧 관리 기준", "임신 7주 입덧과 수분섭취 연관키워드로 정리", "임신 7주 입덧", ["수분섭취", "식사 조절"], ["입덧 완화", "임신초기 구토", "입덧 병원 상담"], "주차별 임신", "입덧이 심할 때 대응 기준을 알고 싶다", "출근과 식사를 병행하는 독자", "생활 기록과 진료 상담 기준을 구분한다", "소변 감소나 체중 감소가 있는지", "/pregnancy/8", "warning"),
  plan("pregnancy-8-weeks-fatigue-sleep", "임신 8주 피로와 수면 관리", "임신 8주 피로감과 수면패턴을 현실적으로 조정하기", "임신 8주 피로", ["수면패턴", "초기 증상"], ["임신 피로", "임신초기 졸림", "생활관리"], "주차별 임신", "계속 피곤한 이유와 조정법을 알고 싶다", "직장생활을 이어가는 임산부", "하루 에너지 배분표로 무리 여부를 판단한다", "휴식 후 회복되는 피로인지", "/pregnancy/8", "howto"),
  plan("pregnancy-9-weeks-nutrition", "임신 9주 영양제 점검표", "임신 9주 영양제와 엽산 복용 질문 정리", "임신 9주 영양제", ["엽산", "비타민D"], ["임산부 영양제", "철분 시작", "복용 시간"], "주차별 임신", "영양제를 어떻게 점검할지 알고 싶다", "복용 제품이 늘어나 헷갈리는 독자", "제품 추천 대신 성분과 진료 확인 질문을 정리한다", "중복 성분과 복용량 확인 여부", "/pregnancy/8", "checklist"),
  plan("pregnancy-10-weeks-first-trimester-screening", "임신 10주 1차검사 준비", "임신 10주 1차검사와 목투명대 검사 흐름", "임신 10주 1차검사", ["목투명대", "혈액검사"], ["임신 11주 검사", "기형아 검사", "초기 선별검사"], "산전검사", "1차검사 예약 전 준비를 알고 싶다", "검사 안내문을 받은 독자", "검사 이름보다 목적과 확인 질문을 먼저 잡는다", "검사 시기와 결과 확인일", "/pregnancy/12", "checklist"),
  plan("pregnancy-11-weeks-nt-scan", "임신 11주 목투명대 검사 이해", "임신 11주 목투명대와 1차 선별검사 결과 읽기", "목투명대 검사", ["1차 선별검사", "초음파"], ["NT 검사", "임신 11주 초음파", "산전검사 결과"], "산전검사", "목투명대 검사 의미를 알고 싶다", "검사 결과 대기 중인 독자", "수치 해석은 의료진에게 맡기고 질문을 정리한다", "추가 상담 필요 여부", "/pregnancy/12", "faq"),
  plan("pregnancy-12-weeks-stable-period", "임신 12주 안정기 준비", "임신 12주 안정기와 직장생활 조정 체크", "임신 12주 안정기", ["직장생활", "초기검사"], ["임신 안정기", "임신초기 종료", "업무 조정"], "주차별 임신", "안정기에 무엇을 바꿔야 할지 알고 싶다", "초기검사를 마친 직장인", "생활 리듬과 다음 검사 일정을 같이 정리한다", "무리한 일정이 줄었는지", "/pregnancy/12", "howto"),
  plan("pregnancy-13-weeks-exercise-start", "임신 13주 운동 시작 전 확인", "임신 13주 운동과 복부불편감 주의사항", "임신 13주 운동", ["복부불편감", "걷기"], ["임산부 운동", "임신중 운동 주의", "가벼운 스트레칭"], "생활관리", "운동을 시작해도 되는지 알고 싶다", "컨디션이 회복되는 독자", "운동 종류보다 중단 기준을 먼저 정한다", "통증과 출혈 동반 여부", "/pregnancy/12", "warning"),
  plan("pregnancy-14-weeks-weight-management", "임신 14주 체중관리 기준", "임신 14주 체중관리와 식단 기록 방법", "임신 14주 체중관리", ["식단 기록", "간식"], ["임신 체중 증가", "임산부 식단", "중기 관리"], "생활관리", "체중 증가를 어떻게 봐야 하는지 알고 싶다", "입덧 이후 식욕이 돌아온 독자", "숫자보다 추세와 식사 패턴을 본다", "급격한 변화 여부", "/pregnancy/16", "checklist"),
  plan("pregnancy-15-weeks-second-trimester-symptoms", "임신 15주 증상 변화 정리", "임신 15주 증상과 중기검사 준비를 연결하기", "임신 15주 증상", ["중기검사", "복부 변화"], ["임신중기 증상", "태동 전 변화", "산전검사 일정"], "주차별 임신", "중기로 넘어가며 달라지는 점을 알고 싶다", "초기 증상이 줄어든 독자", "몸 변화와 다음 검사 준비를 한 페이지로 묶는다", "새 증상의 지속 시간", "/pregnancy/16", "faq"),
  plan("pregnancy-16-weeks-quad-test", "임신 16주 쿼드검사 안내", "임신 16주 쿼드검사와 결과 상담 질문", "임신 16주 쿼드검사", ["2차 선별검사", "혈액검사"], ["쿼드검사 시기", "기형아검사", "산전 선별검사"], "산전검사", "쿼드검사 목적과 준비를 알고 싶다", "중기 검사를 앞둔 독자", "검사 결과를 단정하지 않고 상담 질문으로 정리한다", "결과 설명을 들을 예약이 있는지", "/pregnancy/16", "checklist"),
  plan("pregnancy-17-weeks-back-pain", "임신 17주 허리통증 관리", "임신 17주 허리통증과 자세 교정 체크", "임신 17주 허리통증", ["자세 교정", "골반통"], ["임산부 허리통증", "중기 통증", "수면 자세"], "생활관리", "허리통증을 어떻게 관리할지 알고 싶다", "앉아 있는 시간이 긴 독자", "통증 위치와 악화 행동을 기록한다", "휴식으로 완화되는지", "/pregnancy/16", "howto"),
  plan("pregnancy-18-weeks-quickening", "임신 18주 태동 기다릴 때", "임신 18주 태동과 정밀초음파 전 확인사항", "임신 18주 태동", ["정밀초음파", "복부 변화"], ["첫 태동", "태동 시기", "임신중기 초음파"], "주차별 임신", "태동이 아직 없어도 괜찮은지 궁금하다", "첫 태동을 기다리는 독자", "태동 비교보다 개인차와 진료 확인 기준을 설명한다", "정기진료에서 확인했는지", "/pregnancy/18", "faq"),
  plan("pregnancy-19-weeks-anatomy-scan", "임신 19주 정밀초음파 준비", "임신 19주 정밀초음파와 확인 질문 목록", "임신 19주 정밀초음파", ["태아 구조", "초음파 질문"], ["중기 정밀초음파", "태아 성장", "양수"], "산전검사", "정밀초음파 전에 질문을 준비하고 싶다", "검사 시간이 긴 초음파를 앞둔 독자", "확인 항목을 질문형 목차로 바꾼다", "결과 설명을 기록했는지", "/pregnancy/20", "checklist"),
  plan("pregnancy-20-weeks-anatomy-result", "임신 20주 정밀초음파 결과", "임신 20주 정밀초음파 결과와 추가검사 질문", "임신 20주 정밀초음파", ["추가검사", "태아 성장"], ["임신 20주 초음파", "태아 장기 확인", "정밀초음파 결과"], "산전검사", "결과 설명을 어떻게 이해할지 알고 싶다", "초음파 결과지를 받은 독자", "정상/비정상 단정보다 후속 질문을 정리한다", "재검 일정 안내 여부", "/pregnancy/20", "faq"),
  plan("pregnancy-21-weeks-belly-tightening", "임신 21주 배뭉침 확인", "임신 21주 배뭉침과 휴식 기준을 구분하기", "임신 21주 배뭉침", ["휴식 기준", "자궁수축"], ["임신중기 배뭉침", "복부 당김", "병원 상담"], "생활관리", "배뭉침이 걱정되는 상황을 구분하고 싶다", "활동량이 늘어난 독자", "빈도·지속시간·동반 증상을 기록한다", "규칙적이거나 통증이 있는지", "/pregnancy/20", "warning"),
  plan("pregnancy-22-weeks-sleep-position", "임신 22주 수면자세 점검", "임신 22주 수면자세와 옆으로 눕기 팁", "임신 22주 수면자세", ["옆으로 눕기", "허리통증"], ["임산부 베개", "중기 수면", "다리 저림"], "생활관리", "잠자리가 불편할 때 조정법을 알고 싶다", "밤에 자주 깨는 독자", "도구보다 불편 지점별 조정 순서를 제시한다", "아침 피로와 통증 변화", "/pregnancy/20", "howto"),
  plan("pregnancy-23-weeks-glucose-screening-prepare", "임신 23주 당뇨검사 준비", "임신 23주 임신성 당뇨검사와 식사 질문", "임신성 당뇨검사", ["식사 질문", "혈당검사"], ["임신 24주 당뇨검사", "당부하검사", "검사 전 준비"], "산전검사", "당뇨검사 전 주의사항을 알고 싶다", "검사 예약을 받은 독자", "병원 안내를 우선하고 확인 질문을 정리한다", "금식 여부를 병원에 확인했는지", "/pregnancy/24", "checklist"),
  plan("pregnancy-24-weeks-glucose-test", "임신 24주 임신성 당뇨검사", "임신 24주 임신성 당뇨검사 결과 상담 준비", "임신 24주 임신성 당뇨검사", ["당부하검사", "식단 상담"], ["임신 혈당", "당뇨 재검", "중기 검사"], "산전검사", "검사 결과 이후 흐름을 알고 싶다", "재검 가능성을 들은 독자", "결과 숫자보다 후속 관리 질문을 정리한다", "재검 또는 상담 일정 여부", "/pregnancy/24", "faq"),
];

const symptomPlans = [
  ["pregnancy-heartburn-food", "임신 속쓰림 식사 조절", "임신 속쓰림과 식사 간격을 함께 조정하기", "임신 속쓰림", "식사 간격", "위산 역류"],
  ["pregnancy-constipation-routine", "임신 변비 생활 루틴", "임신 변비와 수분섭취 연관키워드로 해결 순서 잡기", "임신 변비", "수분섭취", "식이섬유"],
  ["pregnancy-leg-cramps-night", "임신 다리쥐 밤에 생길 때", "임신 다리쥐와 수면자세를 함께 점검하기", "임신 다리쥐", "수면자세", "종아리 스트레칭"],
  ["pregnancy-swelling-check", "임신 부종 확인 체크리스트", "임신 부종과 혈압 확인을 같이 보는 기준", "임신 부종", "혈압 확인", "손발 붓기"],
  ["pregnancy-headache-warning", "임신 두통 주의 신호", "임신 두통과 혈압 증상을 구분해 상담하기", "임신 두통", "혈압 증상", "진료 상담"],
  ["pregnancy-anemia-iron", "임신 빈혈과 철분 복용", "임신 빈혈과 철분제 복용 질문 정리", "임신 빈혈", "철분제", "혈액검사"],
  ["pregnancy-skin-itching", "임신 가려움증 확인 기준", "임신 가려움증과 보습 관리 연관키워드 정리", "임신 가려움증", "보습 관리", "피부 변화"],
  ["pregnancy-breathlessness", "임신 숨참 증상 기록법", "임신 숨참과 활동량 조절을 함께 확인하기", "임신 숨참", "활동량 조절", "호흡 불편"],
  ["pregnancy-round-ligament-pain", "임신 아랫배 당김 구분", "임신 아랫배 당김과 원형인대 통증 이해", "임신 아랫배 당김", "원형인대 통증", "복부 통증"],
  ["pregnancy-urination-sleep", "임신 잦은소변 수면 관리", "임신 잦은소변과 밤중 수면패턴 조정", "임신 잦은소변", "수면패턴", "방광 압박"],
  ["pregnancy-discharge-check", "임신 분비물 변화 확인", "임신 분비물과 감염 의심 신호 구분", "임신 분비물", "감염 의심", "냄새 변화"],
  ["pregnancy-dizziness-record", "임신 어지러움 기록 방법", "임신 어지러움과 식사 간격을 함께 점검", "임신 어지러움", "식사 간격", "저혈압"],
  ["pregnancy-rib-pain", "임신 갈비뼈 통증 대처", "임신 갈비뼈 통증과 자세 조절 체크", "임신 갈비뼈 통증", "자세 조절", "후기 통증"],
  ["pregnancy-pelvic-pain", "임신 골반통 관리 기준", "임신 골반통과 보행 불편을 구분하기", "임신 골반통", "보행 불편", "골반 지지"],
  ["pregnancy-insomnia", "임신 불면증 수면 루틴", "임신 불면증과 낮잠 조절을 함께 보기", "임신 불면증", "낮잠 조절", "수면 위생"],
  ["pregnancy-palpitations", "임신 가슴두근거림 상담 기준", "임신 가슴두근거림과 빈혈 증상 함께 확인", "임신 가슴두근거림", "빈혈 증상", "심박 변화"],
  ["pregnancy-backache-work", "임신 허리통증 직장생활 팁", "임신 허리통증과 업무 자세를 현실적으로 조정", "임신 허리통증", "업무 자세", "장시간 앉기"],
  ["pregnancy-appetite-change", "임신 식욕 변화 관리", "임신 식욕 변화와 간식 선택 기준 정리", "임신 식욕 변화", "간식 선택", "체중 추세"],
  ["pregnancy-dental-care", "임신 잇몸출혈 치과 진료", "임신 잇몸출혈과 치과 진료 질문 정리", "임신 잇몸출혈", "치과 진료", "구강관리"],
  ["pregnancy-braxton-hicks", "임신 가진통과 진진통 차이", "임신 가진통과 진진통 구분 질문 정리", "임신 가진통", "진진통", "규칙적 수축"],
] as const;

const screeningPlans = [
  ["prenatal-blood-test-first", "임신 초기 혈액검사 항목", "임신 초기 혈액검사와 감염검사 질문 정리", "임신 초기 혈액검사", "감염검사", "혈액형"],
  ["prenatal-urine-test", "임신 소변검사 결과 확인", "임신 소변검사와 단백뇨 확인 포인트", "임신 소변검사", "단백뇨", "요당"],
  ["prenatal-nipt-question", "NIPT 검사 전 질문 목록", "NIPT 검사와 고위험 결과 상담 준비", "NIPT 검사", "고위험 결과", "비침습 산전검사"],
  ["prenatal-amniocentesis-counsel", "양수검사 상담 전 확인", "양수검사와 추가검사 결정 기준 정리", "양수검사", "추가검사", "검사 위험"],
  ["prenatal-cervix-length", "자궁경부길이 검사 이해", "자궁경부길이 검사와 조산 위험 상담 질문", "자궁경부길이 검사", "조산 위험", "중기 초음파"],
  ["prenatal-growth-scan", "태아 성장초음파 보는 법", "태아 성장초음파와 주수별 성장 확인", "태아 성장초음파", "주수별 성장", "양수량"],
  ["prenatal-placenta-position", "태반 위치 확인 질문", "태반 위치와 전치태반 상담 준비", "태반 위치", "전치태반", "초음파 결과"],
  ["prenatal-anomaly-scan-questions", "정밀초음파 질문 리스트", "정밀초음파와 태아 장기 확인 질문", "정밀초음파 질문", "태아 장기", "검사 결과"],
  ["prenatal-gbs-test", "GBS 검사 시기와 의미", "GBS 검사와 분만 전 항생제 상담", "GBS 검사", "분만 전 검사", "항생제 상담"],
  ["prenatal-nonstress-test", "태동검사 NST 준비", "태동검사 NST와 후기 진료 흐름", "태동검사 NST", "후기 진료", "태아 안녕"],
  ["prenatal-blood-pressure", "임신 혈압 측정 기록", "임신 혈압과 단백뇨를 함께 확인하기", "임신 혈압", "단백뇨", "전자간증"],
  ["prenatal-rh-factor", "Rh 혈액형 확인", "Rh 혈액형과 산전검사 질문 정리", "Rh 혈액형", "항체검사", "혈액형 검사"],
  ["prenatal-thyroid-test", "임신 갑상선 검사 질문", "임신 갑상선 검사와 피로 증상 구분", "임신 갑상선 검사", "피로 증상", "호르몬 검사"],
  ["prenatal-vaccination-check", "임신 예방접종 확인표", "임신 예방접종과 독감 백일해 질문", "임신 예방접종", "독감", "백일해"],
  ["prenatal-dental-check", "임신 중 치과검진 준비", "임신 치과검진과 잇몸관리 질문 정리", "임신 치과검진", "잇몸관리", "스케일링"],
] as const;

const supportPlans = [
  ["support-happiness-card-apply", "국민행복카드 신청 순서", "국민행복카드와 임신출산 진료비 지원 같이 보기", "국민행복카드 신청", "임신출산 진료비", "바우처"],
  ["support-health-center-register", "보건소 임산부 등록 준비", "보건소 임산부 등록과 산전검사 지원 확인", "보건소 임산부 등록", "산전검사 지원", "엽산 지원"],
  ["support-bokjiro-pregnancy", "복지로 임신 지원 찾는 법", "복지로 임신 지원과 지자체 혜택 비교", "복지로 임신 지원", "지자체 혜택", "정부지원"],
  ["support-gov24-pregnancy", "정부24 임신 서비스 확인", "정부24 임신 서비스와 온라인 신청 준비", "정부24 임신", "온라인 신청", "민원서류"],
  ["support-mom-care-service", "산모신생아 건강관리 신청", "산모신생아 건강관리와 출산 전 신청 시기", "산모신생아 건강관리", "출산 전 신청", "바우처"],
  ["support-high-risk-pregnancy", "고위험 임산부 의료비 지원", "고위험 임산부 의료비와 신청서류 확인", "고위험 임산부 의료비", "신청서류", "진단서"],
  ["support-local-childbirth-grant", "지자체 출산지원금 확인", "지자체 출산지원금과 거주요건 체크", "지자체 출산지원금", "거주요건", "출생신고"],
  ["support-maternity-leave", "출산전후휴가 준비 체크", "출산전후휴가와 고용보험 신청 흐름", "출산전후휴가", "고용보험", "휴가 급여"],
  ["support-spouse-leave", "배우자 출산휴가 확인", "배우자 출산휴가와 회사 제출서류 정리", "배우자 출산휴가", "제출서류", "휴가 신청"],
  ["support-childbirth-package", "첫만남이용권 확인", "첫만남이용권과 출생 후 바우처 사용처", "첫만남이용권", "바우처 사용처", "출생 후 지원"],
  ["support-child-allowance", "아동수당 신청 시기", "아동수당과 부모급여 신청 순서 정리", "아동수당 신청", "부모급여", "출생신고"],
  ["support-parent-benefit", "부모급여 신청 준비", "부모급여와 어린이집 이용 전환 확인", "부모급여", "어린이집", "양육지원"],
  ["support-medical-aid-pregnancy", "의료급여 임신지원 확인", "의료급여 임신지원과 보건소 상담 경로", "의료급여 임신지원", "보건소 상담", "진료비 지원"],
  ["support-multiple-birth", "다태아 임신 지원 점검", "다태아 임신지원과 추가 바우처 확인", "다태아 임신지원", "추가 바우처", "쌍둥이"],
  ["support-vulnerable-area", "분만취약지 지원 확인", "분만취약지 지원과 진료비 사용 기준", "분만취약지 지원", "진료비 사용", "지역 기준"],
] as const;

const birthPlans = [
  ["birth-bag-checklist", "출산가방 준비물 체크", "출산가방 준비물과 병원 입원 안내 비교", "출산가방 준비물", "병원 입원", "분만 준비"],
  ["birth-hospital-admission", "분만 병원 입원 기준", "분만 병원 입원과 진통 간격 기록법", "분만 병원 입원", "진통 간격", "출산 신호"],
  ["birth-labor-signs", "출산 신호 구분 체크", "출산 신호와 양수 파수 대처 질문", "출산 신호", "양수 파수", "진통"],
  ["birth-postpartum-care", "산후조리 준비 순서", "산후조리 준비와 퇴원 후 생활동선 정리", "산후조리 준비", "퇴원 후 생활", "신생아 돌봄"],
  ["birth-breastfeeding-first", "모유수유 준비 질문", "모유수유 준비와 수유 상담 받을 항목", "모유수유 준비", "수유 상담", "초유"],
  ["birth-newborn-items", "신생아 준비물 우선순위", "신생아 준비물과 실제 사용 시기 구분", "신생아 준비물", "사용 시기", "육아용품"],
  ["birth-car-seat", "신생아 카시트 준비", "신생아 카시트와 퇴원 이동 동선 체크", "신생아 카시트", "퇴원 이동", "안전용품"],
  ["birth-cesarean-questions", "제왕절개 상담 질문", "제왕절개 상담과 입원 준비물 확인", "제왕절개 상담", "입원 준비물", "회복관리"],
  ["birth-natural-delivery-prepare", "자연분만 준비 체크", "자연분만 준비와 호흡 연습 현실 팁", "자연분만 준비", "호흡 연습", "분만 과정"],
  ["birth-postpartum-warning", "산후 위험 신호 확인", "산후 위험 신호와 병원 상담 기준 정리", "산후 위험 신호", "병원 상담", "회복 상태"],
] as const;

const insurancePlans = [
  ["fetal-insurance-join-time", "태아보험 가입시기 확인", "태아보험 가입시기와 산전검사 결과 영향 정리", "태아보험 가입시기", "산전검사 결과", "보험 상담"],
  ["fetal-insurance-special-terms", "태아보험 특약 질문표", "태아보험 특약과 보장 범위 확인 질문", "태아보험 특약", "보장 범위", "상담 질문"],
  ["fetal-insurance-premium-budget", "태아보험 보험료 예산 잡기", "태아보험 보험료와 납입기간 현실 점검", "태아보험 보험료", "납입기간", "예산"],
  ["fetal-insurance-after-birth", "태아보험 출생 후 전환", "태아보험 출생 후 전환과 계약 확인사항", "태아보험 출생 후 전환", "계약 확인", "어린이보험"],
  ["fetal-insurance-underwriting", "태아보험 심사 질문 정리", "태아보험 심사와 진료이력 고지 확인", "태아보험 심사", "진료이력", "고지의무"],
  ["fetal-insurance-consulting-script", "태아보험 상담 질문 스크립트", "태아보험 상담과 비교표 작성 기준", "태아보험 상담 질문", "비교표", "보장 확인"],
  ["fetal-insurance-ad-disclosure", "태아보험 광고 링크 확인", "태아보험 광고 링크와 상담 연결 주의사항", "태아보험 광고", "상담 연결", "광고 고지"],
  ["fetal-insurance-terms-check", "태아보험 약관 보는 순서", "태아보험 약관과 면책기간 확인 질문", "태아보험 약관", "면책기간", "보장 제외"],
  ["fetal-insurance-twins", "쌍둥이 태아보험 상담", "쌍둥이 태아보험과 가입 가능 조건 확인", "쌍둥이 태아보험", "가입 조건", "다태아"],
  ["fetal-insurance-renewal", "태아보험 갱신형 비갱신형", "태아보험 갱신형과 비갱신형 차이 질문", "태아보험 갱신형", "비갱신형", "보험료 변화"],
] as const;

const faqPlans = [
  ["pregnancy-app-reliability", "임신 앱 정보 신뢰도 확인", "임신 앱 정보와 병원 안내를 함께 보는 기준", "임신 앱 정보", "병원 안내", "정보 신뢰도"],
  ["pregnancy-safe-food-faq", "임신 중 음식 FAQ", "임신 중 음식과 피해야 할 식품 질문 정리", "임신 중 음식", "피해야 할 식품", "식품 안전"],
  ["pregnancy-travel-faq", "임신 중 여행 전 확인", "임신 중 여행과 이동시간 주의사항", "임신 중 여행", "이동시간", "진료 확인"],
  ["pregnancy-workplace-faq", "임신 직장생활 질문 모음", "임신 직장생활과 근로시간 조정 확인", "임신 직장생활", "근로시간 조정", "휴식"],
  ["pregnancy-medicine-faq", "임신 중 약 복용 질문", "임신 중 약 복용과 의사 상담 기준", "임신 중 약", "의사 상담", "복용 기록"],
  ["pregnancy-caffeine-faq", "임신 카페인 섭취 기준", "임신 카페인과 음료 선택 체크리스트", "임신 카페인", "음료 선택", "섭취량"],
  ["pregnancy-pet-faq", "임신 중 반려동물 생활", "임신 중 반려동물과 위생관리 질문 정리", "임신 반려동물", "위생관리", "생활환경"],
  ["pregnancy-housework-faq", "임신 집안일 조정 기준", "임신 집안일과 무거운 물건 주의사항", "임신 집안일", "무거운 물건", "생활동선"],
  ["pregnancy-mental-health-faq", "임신 불안감 상담 기준", "임신 불안감과 수면 변화 함께 확인", "임신 불안감", "수면 변화", "상담"],
  ["pregnancy-photo-record", "임신 기록 남기는 방법", "임신 기록과 주차별 사진 정리 팁", "임신 기록", "주차별 사진", "태동 기록"],
] as const;

const latePregnancyExtraPlans: readonly PlanTuple[] = [
  ["late-pregnancy-25-weeks-leg-swelling", "임신 25주 다리부종 기록", "임신 25주 다리부종과 혈압 확인을 함께 보는 기준", "임신 25주 다리부종", "혈압 확인", "부종 기록"],
  ["late-pregnancy-26-weeks-fetal-movement", "임신 26주 태동 기록법", "임신 26주 태동 기록과 진료 질문 정리", "임신 26주 태동 기록", "진료 질문", "태동 패턴"],
  ["late-pregnancy-27-weeks-glucose-result", "임신 27주 당검사 결과 질문", "임신 27주 당검사 결과와 식단 상담 준비", "임신 27주 당검사 결과", "식단 상담", "재검 기준"],
  ["late-pregnancy-28-weeks-rh-injection", "임신 28주 Rh 주사 확인", "임신 28주 Rh 주사와 혈액형 검사 질문", "임신 28주 Rh 주사", "혈액형 검사", "면역글로불린"],
  ["late-pregnancy-29-weeks-braxton-hicks", "임신 29주 배뭉침 구분", "임신 29주 배뭉침과 조기진통 신호 비교", "임신 29주 배뭉침", "조기진통 신호", "수축 간격"],
  ["late-pregnancy-30-weeks-growth-scan", "임신 30주 성장초음파 질문", "임신 30주 성장초음파와 태아 체중 확인", "임신 30주 성장초음파", "태아 체중", "양수량"],
  ["late-pregnancy-31-weeks-sleep-breathing", "임신 31주 수면 숨참 관리", "임신 31주 수면 숨참과 옆으로 눕기 기준", "임신 31주 수면 숨참", "옆으로 눕기", "호흡 불편"],
  ["late-pregnancy-32-weeks-hospital-bag-start", "임신 32주 출산가방 시작", "임신 32주 출산가방과 병원 안내문 비교", "임신 32주 출산가방", "병원 안내문", "입원 준비"],
  ["late-pregnancy-33-weeks-pelvic-pressure", "임신 33주 골반압박 체크", "임신 33주 골반압박과 태아 위치 확인", "임신 33주 골반압박", "태아 위치", "골반 통증"],
  ["late-pregnancy-34-weeks-nst-prepare", "임신 34주 태동검사 준비", "임신 34주 태동검사와 NST 결과 질문", "임신 34주 태동검사", "NST 결과", "태아 안녕"],
  ["late-pregnancy-35-weeks-gbs-culture", "임신 35주 GBS 검사 준비", "임신 35주 GBS 검사와 분만 항생제 질문", "임신 35주 GBS 검사", "분만 항생제", "질 분비물 검사"],
  ["late-pregnancy-36-weeks-delivery-plan", "임신 36주 분만계획 점검", "임신 36주 분만계획과 병원 연락 기준", "임신 36주 분만계획", "병원 연락", "출산 예정일"],
  ["late-pregnancy-37-weeks-labor-count", "임신 37주 진통 간격 재기", "임신 37주 진통 간격과 양수 파수 대처", "임신 37주 진통 간격", "양수 파수", "분만 신호"],
  ["late-pregnancy-38-weeks-cervix-check", "임신 38주 내진 질문", "임신 38주 내진과 자궁경부 변화 확인", "임신 38주 내진", "자궁경부 변화", "분만 진행"],
  ["late-pregnancy-39-weeks-induction-question", "임신 39주 유도분만 질문", "임신 39주 유도분만과 예정일 초과 상담", "임신 39주 유도분만", "예정일 초과", "분만 상담"],
  ["late-pregnancy-40-weeks-overdue-check", "임신 40주 예정일 이후 점검", "임신 40주 예정일 이후와 태동 확인 기준", "임신 40주 예정일 이후", "태동 확인", "추가 검사"],
  ["late-pregnancy-edema-red-flags", "임신 후기 부종 위험신호", "임신 후기 부종과 두통 혈압 동반 증상", "임신 후기 부종 위험신호", "두통 혈압", "진료 문의"],
  ["late-pregnancy-fetal-position-question", "태아 자세 확인 질문", "태아 자세 확인과 역아 상담 준비", "태아 자세 확인", "역아 상담", "분만 방법"],
  ["late-pregnancy-birth-plan-template", "출산계획서 작성 기준", "출산계획서와 의료진 상담 질문 정리", "출산계획서 작성", "의료진 상담", "분만 선택"],
  ["late-pregnancy-night-contractions", "밤에 배뭉침 대처 기준", "밤에 배뭉침과 진통 간격 기록 방법", "밤 배뭉침 대처", "진통 간격 기록", "휴식 후 변화"],
];

const postpartumExtraPlans: readonly PlanTuple[] = [
  ["postpartum-day1-bleeding", "출산 1일차 오로 확인", "출산 1일차 오로와 출혈량 기록 기준", "출산 1일차 오로", "출혈량 기록", "산후 회복"],
  ["postpartum-uterus-pain", "산후 훗배앓이 구분", "산후 훗배앓이와 자궁수축 통증 확인", "산후 훗배앓이", "자궁수축 통증", "통증 기록"],
  ["postpartum-fever-warning", "산후 발열 위험신호", "산후 발열과 유방통 동반 증상 체크", "산후 발열 위험신호", "유방통", "감염 의심"],
  ["postpartum-perineal-care", "회음부 상처 관리 질문", "회음부 상처 관리와 좌욕 시기 확인", "회음부 상처 관리", "좌욕 시기", "통증 완화"],
  ["postpartum-cesarean-incision", "제왕절개 상처 확인", "제왕절개 상처와 진물 붓기 상담 기준", "제왕절개 상처 확인", "진물 붓기", "상처 관리"],
  ["postpartum-breast-engorgement", "젖몸살 초기 대처", "젖몸살 초기 대처와 수유 상담 연결", "젖몸살 초기 대처", "수유 상담", "유방 울혈"],
  ["postpartum-milk-supply-record", "모유량 기록 방법", "모유량 기록과 아기 소변 횟수 함께 보기", "모유량 기록", "아기 소변 횟수", "수유 패턴"],
  ["postpartum-formula-mix-question", "혼합수유 질문 정리", "혼합수유 질문과 분유 보충량 기록", "혼합수유 질문", "분유 보충량", "수유 간격"],
  ["postpartum-sleep-deprivation", "산후 수면부족 관리", "산후 수면부족과 보호자 교대표 만들기", "산후 수면부족", "보호자 교대표", "회복 시간"],
  ["postpartum-meal-recovery", "산후 식사 회복 체크", "산후 식사 회복과 철분 수분 섭취 기준", "산후 식사 회복", "철분 수분", "영양 보충"],
  ["postpartum-constipation", "산후 변비 대처 질문", "산후 변비와 배변 통증 상담 기준", "산후 변비 대처", "배변 통증", "수분 섭취"],
  ["postpartum-urinary-leakage", "산후 요실금 상담 기준", "산후 요실금과 골반저 운동 시작 질문", "산후 요실금 상담", "골반저 운동", "회복 기록"],
  ["postpartum-mood-check", "산후 우울감 체크", "산후 우울감과 도움 요청 신호 정리", "산후 우울감 체크", "도움 요청", "기분 기록"],
  ["postpartum-two-week-checkup", "산후 2주 진료 질문", "산후 2주 진료와 회복 상태 메모", "산후 2주 진료", "회복 상태", "오로 변화"],
  ["postpartum-six-week-checkup", "산후 6주 검진 준비", "산후 6주 검진과 피임 상담 질문", "산후 6주 검진", "피임 상담", "운동 재개"],
  ["postpartum-exercise-return", "산후 운동 재개 기준", "산후 운동 재개와 복직 전 체력 점검", "산후 운동 재개", "복직 전 체력", "무리 신호"],
  ["postpartum-hair-loss", "산후 탈모 시기 확인", "산후 탈모 시기와 영양 상담 질문", "산후 탈모 시기", "영양 상담", "모발 변화"],
  ["postpartum-scar-massage", "제왕절개 흉터 관리", "제왕절개 흉터 관리와 마사지 시작 시점", "제왕절개 흉터 관리", "마사지 시작", "피부 회복"],
  ["postpartum-support-visit", "산후도우미 방문 전 준비", "산후도우미 방문과 집안 동선 정리", "산후도우미 방문 준비", "집안 동선", "돌봄 요청"],
  ["postpartum-emergency-bag", "산후 응급 방문 준비", "산후 응급 방문과 증상 기록 가져가기", "산후 응급 방문", "증상 기록", "병원 연락"],
];

const newbornExtraPlans: readonly PlanTuple[] = [
  ["newborn-first-week-pee-poop", "신생아 소변 대변 기록", "신생아 소변 대변과 수유량 함께 확인", "신생아 소변 대변 기록", "수유량", "탈수 신호"],
  ["newborn-jaundice-check", "신생아 황달 확인 기준", "신생아 황달과 병원 재방문 질문", "신생아 황달 확인", "병원 재방문", "피부색 변화"],
  ["newborn-weight-loss", "신생아 체중감소 질문", "신생아 체중감소와 수유 상담 기준", "신생아 체중감소", "수유 상담", "체중 회복"],
  ["newborn-umbilical-cord-care", "신생아 배꼽 관리", "신생아 배꼽 관리와 진물 냄새 확인", "신생아 배꼽 관리", "진물 냄새", "소독 방법"],
  ["newborn-sleep-position", "신생아 수면 자세 확인", "신생아 수면 자세와 침구 안전 점검", "신생아 수면 자세", "침구 안전", "수면 환경"],
  ["newborn-temperature-check", "신생아 체온 재는 법", "신생아 체온 재는 법과 발열 상담 기준", "신생아 체온 재는 법", "발열 상담", "실내 온도"],
  ["newborn-bath-first", "신생아 첫 목욕 준비", "신생아 첫 목욕과 배꼽 관리 주의사항", "신생아 첫 목욕", "배꼽 관리", "목욕 시간"],
  ["newborn-car-seat-home", "신생아 퇴원 카시트 점검", "신생아 퇴원 카시트와 이동 동선 확인", "신생아 퇴원 카시트", "이동 동선", "안전벨트"],
  ["newborn-vaccine-bcg", "신생아 BCG 접종 확인", "신생아 BCG 접종과 예방접종도우미 기록", "신생아 BCG 접종", "예방접종도우미", "접종 일정"],
  ["newborn-hearing-test", "신생아 청각검사 질문", "신생아 청각검사와 재검 안내 확인", "신생아 청각검사", "재검 안내", "선별검사"],
  ["newborn-heel-prick-test", "신생아 선천성대사검사", "신생아 선천성대사검사와 결과 확인일", "신생아 선천성대사검사", "결과 확인일", "채혈 검사"],
  ["newborn-colic-evening", "신생아 저녁 울음 대처", "신생아 저녁 울음과 수유 트림 기록", "신생아 저녁 울음", "수유 트림", "복부 불편"],
  ["newborn-spit-up", "신생아 게워냄 구분", "신생아 게워냄과 분수토 상담 기준", "신생아 게워냄", "분수토 상담", "수유 자세"],
  ["newborn-diaper-rash", "신생아 기저귀발진 관리", "신생아 기저귀발진과 피부 진료 질문", "신생아 기저귀발진", "피부 진료", "기저귀 교체"],
  ["newborn-one-month-checkup", "신생아 1개월 검진 준비", "신생아 1개월 검진과 성장 질문 정리", "신생아 1개월 검진", "성장 질문", "예방접종"],
];

const adminExtraPlans: readonly PlanTuple[] = [
  ["admin-birth-registration-order", "출생신고 순서 정리", "출생신고 순서와 주민센터 제출서류 확인", "출생신고 순서", "주민센터 제출서류", "가족관계등록"],
  ["admin-birth-certificate-check", "출생증명서 확인 항목", "출생증명서 확인과 출생신고 오류 예방", "출생증명서 확인", "출생신고 오류", "병원 서류"],
  ["admin-baby-health-insurance", "신생아 건강보험 등록", "신생아 건강보험 등록과 피부양자 확인", "신생아 건강보험 등록", "피부양자 확인", "보험 자격"],
  ["admin-childcare-portal-setup", "아이사랑 포털 가입 준비", "아이사랑 포털 가입과 예방접종 기록 연결", "아이사랑 포털 가입", "예방접종 기록", "육아 서비스"],
  ["admin-postpartum-care-application", "산모신생아 서비스 신청서류", "산모신생아 서비스 신청서류와 판정 기준", "산모신생아 서비스 신청서류", "판정 기준", "바우처 신청"],
  ["admin-first-meeting-voucher-use", "첫만남이용권 사용 전 확인", "첫만남이용권 사용 전 확인과 사용처 질문", "첫만남이용권 사용 전 확인", "사용처 질문", "바우처 잔액"],
  ["admin-parent-benefit-bankbook", "부모급여 계좌 준비", "부모급여 계좌와 아동수당 신청 순서", "부모급여 계좌 준비", "아동수당 신청", "급여 지급일"],
  ["admin-child-allowance-missed", "아동수당 늦게 신청할 때", "아동수당 늦게 신청할 때와 소급 지급 확인", "아동수당 늦게 신청", "소급 지급", "신청 기한"],
  ["admin-local-postpartum-grant", "지자체 산후지원금 확인", "지자체 산후지원금과 거주기간 기준 정리", "지자체 산후지원금", "거주기간 기준", "출산지원"],
  ["admin-birth-tax-deduction", "출산 의료비 연말정산 준비", "출산 의료비 연말정산과 영수증 보관 기준", "출산 의료비 연말정산", "영수증 보관", "공제 자료"],
  ["admin-maternity-pay-documents", "출산전후휴가 급여 서류", "출산전후휴가 급여 서류와 회사 확인사항", "출산전후휴가 급여 서류", "회사 확인사항", "고용보험"],
  ["admin-spouse-leave-documents", "배우자 출산휴가 서류", "배우자 출산휴가 서류와 회사 제출 일정", "배우자 출산휴가 서류", "회사 제출 일정", "휴가 급여"],
  ["admin-childcare-leave-start", "육아휴직 시작 전 체크", "육아휴직 시작 전 체크와 급여 신청 흐름", "육아휴직 시작 전 체크", "급여 신청", "회사 통보"],
  ["admin-daycare-waitlist", "어린이집 대기신청 준비", "어린이집 대기신청과 입소 우선순위 확인", "어린이집 대기신청", "입소 우선순위", "아이사랑"],
  ["admin-family-document-folder", "출산 후 서류 보관법", "출산 후 서류 보관법과 지원금 신청 증빙", "출산 후 서류 보관법", "지원금 신청 증빙", "문서 폴더"],
];

const familyExtraPlans: readonly PlanTuple[] = [
  ["family-partner-night-shift", "배우자 야간 돌봄표", "배우자 야간 돌봄표와 수유 교대 기준", "배우자 야간 돌봄표", "수유 교대", "수면 확보"],
  ["family-grandparents-boundary", "조부모 도움 요청 기준", "조부모 도움 요청과 산모 회복 우선순위", "조부모 도움 요청", "산모 회복", "방문 시간"],
  ["family-visitor-rule", "신생아 방문객 규칙", "신생아 방문객 규칙과 예방접종 확인 질문", "신생아 방문객 규칙", "예방접종 확인", "면회 기준"],
  ["family-sibling-preparation", "첫째 아이 출산 준비", "첫째 아이 출산 준비와 동생 맞이 설명", "첫째 아이 출산 준비", "동생 맞이", "가족 대화"],
  ["family-house-cleaning-zone", "산후 집안 동선 정리", "산후 집안 동선 정리와 신생아 공간 분리", "산후 집안 동선 정리", "신생아 공간", "청소 구역"],
  ["family-meal-support-plan", "산후 식사 지원표", "산후 식사 지원표와 장보기 역할 나누기", "산후 식사 지원표", "장보기 역할", "회복 식단"],
  ["family-budget-after-birth", "출산 후 생활비 점검", "출산 후 생활비와 바우처 사용 계획", "출산 후 생활비 점검", "바우처 사용", "월 예산"],
  ["family-emergency-contact", "출산 후 비상연락망", "출산 후 비상연락망과 병원 연락 기준", "출산 후 비상연락망", "병원 연락", "보호자 역할"],
  ["family-return-home-check", "퇴원 후 첫날 체크", "퇴원 후 첫날 체크와 가족 역할 분담", "퇴원 후 첫날 체크", "가족 역할 분담", "신생아 돌봄"],
  ["family-postpartum-conflict", "산후 가족 갈등 줄이기", "산후 가족 갈등과 도움 요청 문장 정리", "산후 가족 갈등", "도움 요청 문장", "역할 조정"],
];

const supportExtraPlans: readonly PlanTuple[] = [
  ["support-nutrient-health-center", "보건소 임산부 영양제 확인", "보건소 임산부 영양제와 수령 조건 점검", "보건소 임산부 영양제", "수령 조건", "엽산 철분"],
  ["support-taxi-pregnancy-card", "임산부 교통비 지원 확인", "임산부 교통비 지원과 지역별 신청 경로", "임산부 교통비 지원", "지역별 신청", "교통카드"],
  ["support-high-risk-bedrest", "고위험 임신 안정 지원", "고위험 임신 안정 지원과 진단서 확인", "고위험 임신 안정 지원", "진단서 확인", "의료비 신청"],
  ["support-multiple-pregnancy-extra", "다태아 추가 지원 질문", "다태아 추가 지원과 바우처 금액 확인", "다태아 추가 지원", "바우처 금액", "쌍둥이 임신"],
  ["support-low-income-birth", "저소득층 출산지원 확인", "저소득층 출산지원과 복지로 신청 기준", "저소득층 출산지원", "복지로 신청", "소득 기준"],
  ["support-single-parent-birth", "한부모 출산지원 경로", "한부모 출산지원과 주민센터 상담 준비", "한부모 출산지원", "주민센터 상담", "양육지원"],
  ["support-premature-baby", "미숙아 의료비 지원", "미숙아 의료비 지원과 신청서류 확인", "미숙아 의료비 지원", "신청서류", "퇴원 영수증"],
  ["support-congenital-test-cost", "선천성검사비 지원 확인", "선천성검사비 지원과 검사 결과 제출", "선천성검사비 지원", "검사 결과 제출", "의료비 지원"],
  ["support-breast-pump-rental", "유축기 대여 지원 확인", "유축기 대여 지원과 보건소 문의 기준", "유축기 대여 지원", "보건소 문의", "수유 지원"],
  ["support-postpartum-depression-help", "산후우울 상담 지원", "산후우울 상담 지원과 정신건강복지센터 연결", "산후우울 상담 지원", "정신건강복지센터", "상담 예약"],
];

const insuranceExtraPlans: readonly PlanTuple[] = [
  ["insurance-after-consulting-notes", "태아보험 상담 후 메모 정리", "태아보험 상담 후 메모와 비교 질문 다시 보기", "태아보험 상담 후 메모", "비교 질문", "보장 요약"],
  ["insurance-premium-change-scenario", "태아보험 보험료 변동 질문", "태아보험 보험료 변동과 갱신 조건 확인", "태아보험 보험료 변동", "갱신 조건", "납입 계획"],
  ["insurance-hospitalization-coverage", "태아보험 입원비 보장 질문", "태아보험 입원비 보장과 면책 조건 확인", "태아보험 입원비 보장", "면책 조건", "보장 한도"],
  ["insurance-surgery-coverage", "태아보험 수술비 보장 확인", "태아보험 수술비 보장과 특약 중복 질문", "태아보험 수술비 보장", "특약 중복", "보장 범위"],
  ["insurance-birth-defect-rider", "태아보험 선천이상 특약 질문", "태아보험 선천이상 특약과 보장 제외 확인", "태아보험 선천이상 특약", "보장 제외", "약관 확인"],
  ["insurance-nicu-coverage", "태아보험 신생아중환자실 보장", "태아보험 신생아중환자실 보장과 입원 기준", "태아보험 신생아중환자실 보장", "입원 기준", "NICU"],
  ["insurance-claim-documents", "태아보험 청구서류 미리보기", "태아보험 청구서류와 출생 후 병원서류 확인", "태아보험 청구서류", "병원서류", "보험금 청구"],
  ["insurance-cooling-off", "태아보험 청약철회 확인", "태아보험 청약철회와 계약 확인서 검토", "태아보험 청약철회", "계약 확인서", "소비자 권리"],
  ["insurance-agent-disclosure", "태아보험 설계사 고지 확인", "태아보험 설계사 고지와 광고 상담 구분", "태아보험 설계사 고지", "광고 상담", "모집 경로"],
  ["insurance-family-budget-balance", "태아보험 가족예산 균형", "태아보험 가족예산과 출산 후 고정비 비교", "태아보험 가족예산", "출산 후 고정비", "보험료 한도"],
];

const recoveryRoutinePlans: readonly PlanTuple[] = [
  ["recovery-week2-bleeding-pattern", "산후 2주 오로 변화 기록", "산후 2주 오로 변화와 회복 진료 질문", "산후 2주 오로 변화", "회복 진료", "출혈 패턴"],
  ["recovery-week3-walk-start", "산후 3주 걷기 시작 기준", "산후 3주 걷기와 골반 통증 확인", "산후 3주 걷기", "골반 통증", "운동 재개"],
  ["recovery-week4-sleep-debt", "산후 4주 수면부채 관리", "산후 4주 수면부채와 야간 수유 분담", "산후 4주 수면부채", "야간 수유 분담", "회복 루틴"],
  ["recovery-week5-breast-pain", "산후 5주 유방통 확인", "산후 5주 유방통과 수유 자세 점검", "산후 5주 유방통", "수유 자세", "젖몸살 예방"],
  ["recovery-week6-checkup-questions", "산후 6주 검진 질문표", "산후 6주 검진 질문표와 피임 상담 준비", "산후 6주 검진 질문표", "피임 상담", "운동 허가"],
  ["recovery-week7-mood-log", "산후 7주 기분 기록", "산후 7주 기분 기록과 상담 필요 신호", "산후 7주 기분 기록", "상담 필요 신호", "산후우울"],
  ["recovery-week8-core-exercise", "산후 8주 복부운동 기준", "산후 8주 복부운동과 복직 전 체력 점검", "산후 8주 복부운동", "복직 전 체력", "복직 준비"],
  ["recovery-week9-hair-skin", "산후 9주 피부 모발 변화", "산후 9주 피부 모발 변화와 영양 상담", "산후 9주 피부 모발 변화", "영양 상담", "호르몬 변화"],
  ["recovery-week10-back-pain", "산후 10주 허리통증 관리", "산후 10주 허리통증과 아기 안는 자세", "산후 10주 허리통증", "아기 안는 자세", "근골격 회복"],
  ["recovery-week11-return-work", "산후 11주 복직 루틴", "산후 11주 복직 루틴과 수유 계획 정리", "산후 11주 복직 루틴", "수유 계획", "업무 복귀"],
  ["recovery-week12-health-baseline", "산후 12주 건강 기준선", "산후 12주 건강 기준선과 다음 검진 메모", "산후 12주 건강 기준선", "다음 검진", "회복 평가"],
  ["recovery-pelvic-floor-symptom", "산후 골반저 증상 구분", "산후 골반저 증상과 요실금 상담 기준", "산후 골반저 증상", "요실금 상담", "골반저 운동"],
  ["recovery-c-section-numbness", "제왕절개 감각저하 확인", "제왕절개 감각저하와 흉터 회복 질문", "제왕절개 감각저하", "흉터 회복", "상처 감각"],
  ["recovery-postpartum-anemia", "산후 빈혈 증상 체크", "산후 빈혈 증상과 철분 복용 상담", "산후 빈혈 증상", "철분 복용", "어지럼 기록"],
  ["recovery-breastfeeding-posture", "수유 자세 통증 줄이기", "수유 자세 통증과 손목 어깨 보호", "수유 자세 통증", "손목 어깨", "수유 쿠션"],
  ["recovery-night-sweats", "산후 식은땀 기록 기준", "산후 식은땀과 발열 구분 질문", "산후 식은땀", "발열 구분", "체온 기록"],
  ["recovery-postpartum-sexual-health", "산후 부부관계 상담 기준", "산후 부부관계 상담과 회복 상태 확인", "산후 부부관계 상담", "회복 상태", "통증 확인"],
  ["recovery-babywearing-back", "아기띠 허리통증 예방", "아기띠 허리통증과 착용 시간 조절", "아기띠 허리통증", "착용 시간", "육아 자세"],
  ["recovery-postpartum-dental", "산후 치과 진료 준비", "산후 치과 진료와 수유 중 약 상담", "산후 치과 진료", "수유 중 약", "치아 통증"],
  ["recovery-mom-health-record", "산모 건강기록표 만들기", "산모 건강기록표와 병원 상담 메모", "산모 건강기록표", "병원 상담 메모", "회복 체크"],
];

const infantGrowthPlans: readonly PlanTuple[] = [
  ["infant-week2-growth-check", "생후 2주 성장 확인", "생후 2주 성장과 수유 횟수 기록", "생후 2주 성장", "수유 횟수", "체중 증가"],
  ["infant-week3-sleep-cycle", "생후 3주 수면주기 기록", "생후 3주 수면주기와 낮밤 구분 시작", "생후 3주 수면주기", "낮밤 구분", "수면 환경"],
  ["infant-week4-one-month-check", "생후 4주 1개월 검진", "생후 4주 1개월 검진과 예방접종 질문", "생후 4주 1개월 검진", "예방접종 질문", "성장 평가"],
  ["infant-week5-colic-record", "생후 5주 영아산통 기록", "생후 5주 영아산통과 수유 트림 확인", "생후 5주 영아산통", "수유 트림", "울음 패턴"],
  ["infant-week6-bath-routine", "생후 6주 목욕 루틴", "생후 6주 목욕 루틴과 피부 보습 기준", "생후 6주 목욕 루틴", "피부 보습", "목욕 시간"],
  ["infant-week7-tummy-time", "생후 7주 터미타임 시작", "생후 7주 터미타임과 안전한 바닥 환경", "생후 7주 터미타임", "바닥 환경", "목 가누기"],
  ["infant-week8-vaccine-reaction", "생후 8주 예방접종 반응", "생후 8주 예방접종 반응과 체온 기록", "생후 8주 예방접종 반응", "체온 기록", "병원 문의"],
  ["infant-week9-feeding-gap", "생후 9주 수유간격 조정", "생후 9주 수유간격과 수면 패턴 비교", "생후 9주 수유간격", "수면 패턴", "수유량"],
  ["infant-week10-skin-rash", "생후 10주 피부발진 확인", "생후 10주 피부발진과 진료 사진 기록", "생후 10주 피부발진", "진료 사진", "피부 관리"],
  ["infant-week11-development-note", "생후 11주 발달 메모", "생후 11주 발달 메모와 시선 반응 확인", "생후 11주 발달 메모", "시선 반응", "놀이 시간"],
  ["infant-week12-hundred-days", "생후 12주 백일 준비", "생후 12주 백일 준비와 아기 컨디션 우선순위", "생후 12주 백일 준비", "아기 컨디션", "외출 계획"],
  ["infant-reflux-position", "아기 역류 자세 관리", "아기 역류 자세와 게워냄 상담 기준", "아기 역류 자세", "게워냄 상담", "수유 후 자세"],
  ["infant-diaper-output-chart", "아기 기저귀 기록표", "아기 기저귀 기록표와 탈수 신호 확인", "아기 기저귀 기록표", "탈수 신호", "소변 횟수"],
  ["infant-room-temperature", "아기 방 온습도 기준", "아기 방 온습도와 수면복 선택 체크", "아기 방 온습도", "수면복 선택", "실내 환경"],
  ["infant-car-seat-crying", "카시트에서 우는 아기 대처", "카시트에서 우는 아기와 이동 시간 조절", "카시트 아기 울음", "이동 시간", "안전 이동"],
  ["infant-stroller-first-outing", "유모차 첫 외출 준비", "유모차 첫 외출과 예방접종 전후 일정", "유모차 첫 외출", "예방접종 전후", "외출 준비"],
  ["infant-baby-acne", "신생아 여드름 구분", "신생아 여드름과 피부 진료 질문", "신생아 여드름", "피부 진료", "얼굴 발진"],
  ["infant-head-shape", "아기 머리모양 관찰", "아기 머리모양과 수면 자세 조정", "아기 머리모양", "수면 자세 조정", "두상 관찰"],
  ["infant-crying-language", "아기 울음 종류 기록", "아기 울음 종류와 배고픔 졸림 구분", "아기 울음 종류", "배고픔 졸림", "육아 기록"],
  ["infant-growth-photo", "아기 성장사진 기록법", "아기 성장사진과 월령별 발달 메모", "아기 성장사진", "월령별 발달", "사진 정리"],
];

const feedingSleepPlans: readonly PlanTuple[] = [
  ["feeding-breast-pain-latch", "젖 물림 통증 확인", "젖 물림 통증과 수유 상담 질문 정리", "젖 물림 통증", "수유 상담", "올바른 래치"],
  ["feeding-formula-amount-log", "분유량 기록 기준", "분유량 기록과 수유 간격 조정", "분유량 기록", "수유 간격", "분유 보충"],
  ["feeding-mixed-feeding-ratio", "혼합수유 비율 조정", "혼합수유 비율과 아기 체중 변화 확인", "혼합수유 비율", "아기 체중", "수유 계획"],
  ["feeding-pumped-milk-storage", "유축 모유 보관 기준", "유축 모유 보관과 해동 시간 체크", "유축 모유 보관", "해동 시간", "수유 위생"],
  ["feeding-bottle-nipple-size", "젖병 젖꼭지 단계 확인", "젖병 젖꼭지 단계와 사레 들림 구분", "젖병 젖꼭지 단계", "사레 들림", "수유 속도"],
  ["feeding-burping-trouble", "트림이 어려운 아기 대처", "트림이 어려운 아기와 게워냄 기록", "트림 어려운 아기", "게워냄 기록", "수유 자세"],
  ["feeding-night-feeding-plan", "밤수유 줄이는 준비", "밤수유 줄이는 준비와 체중 증가 확인", "밤수유 줄이는 준비", "체중 증가", "수면 루틴"],
  ["feeding-growth-spurt", "급성장기 수유 증가", "급성장기 수유 증가와 울음 패턴 구분", "급성장기 수유 증가", "울음 패턴", "수유 요구"],
  ["sleep-bedtime-routine-start", "아기 잠자리 루틴 시작", "아기 잠자리 루틴과 낮잠 시간 기록", "아기 잠자리 루틴", "낮잠 시간", "수면 신호"],
  ["sleep-contact-nap", "안아 재우기 줄이기", "안아 재우기 줄이기와 등센서 대처", "안아 재우기 줄이기", "등센서 대처", "수면 습관"],
  ["sleep-day-night-confusion", "낮밤 바뀐 아기 조정", "낮밤 바뀐 아기와 빛 소리 환경 조절", "낮밤 바뀐 아기", "빛 소리 환경", "수면 교육"],
  ["sleep-swaddle-transition", "속싸개 졸업 시기", "속싸개 졸업 시기와 뒤집기 전 안전", "속싸개 졸업 시기", "뒤집기 전 안전", "수면 안전"],
  ["sleep-safe-crib-check", "아기 침대 안전 점검", "아기 침대 안전 점검과 질식 위험 줄이기", "아기 침대 안전 점검", "질식 위험", "수면 공간"],
  ["sleep-wake-window", "아기 깨어있는 시간표", "아기 깨어있는 시간표와 과피로 신호 확인", "아기 깨어있는 시간표", "과피로 신호", "낮잠 루틴"],
  ["sleep-white-noise-use", "백색소음 사용 기준", "백색소음 사용 기준과 볼륨 거리 확인", "백색소음 사용 기준", "볼륨 거리", "수면 환경"],
];

const workCarePlans: readonly PlanTuple[] = [
  ["work-return-breastfeeding-plan", "복직 후 모유수유 계획", "복직 후 모유수유 계획과 유축 시간 확보", "복직 후 모유수유 계획", "유축 시간", "직장 복귀"],
  ["work-childcare-leave-pay-check", "육아휴직 급여 확인표", "육아휴직 급여 확인표와 신청 일정 정리", "육아휴직 급여 확인표", "신청 일정", "고용보험"],
  ["work-shortened-hours-parenting", "육아기 근로시간 단축 준비", "육아기 근로시간 단축과 회사 제출서류", "육아기 근로시간 단축", "회사 제출서류", "근무 조정"],
  ["work-daycare-before-return", "복직 전 어린이집 적응", "복직 전 어린이집 적응과 등하원 동선 점검", "복직 전 어린이집 적응", "등하원 동선", "입소 준비"],
  ["work-caregiver-backup-plan", "대체 돌봄 계획 세우기", "대체 돌봄 계획과 아기 아플 때 연락망", "대체 돌봄 계획", "아기 아플 때", "비상 연락망"],
  ["work-pumping-room-check", "직장 유축 공간 확인", "직장 유축 공간과 모유 보관 준비", "직장 유축 공간", "모유 보관", "근무 중 수유"],
  ["work-maternity-return-docs", "출산휴가 복귀 서류", "출산휴가 복귀 서류와 급여 정산 확인", "출산휴가 복귀 서류", "급여 정산", "회사 인사"],
  ["work-partner-leave-schedule", "배우자 육아휴직 일정", "배우자 육아휴직 일정과 가족 돌봄 분담", "배우자 육아휴직 일정", "가족 돌봄 분담", "휴직 계획"],
  ["work-grandparent-care-contract", "조부모 돌봄 약속표", "조부모 돌봄 약속표와 생활 규칙 공유", "조부모 돌봄 약속표", "생활 규칙", "가족 돌봄"],
  ["work-nanny-interview-questions", "아이돌보미 면접 질문", "아이돌보미 면접 질문과 돌봄 기록 공유", "아이돌보미 면접 질문", "돌봄 기록", "신뢰 확인"],
  ["work-first-sick-day", "복직 후 아기 아픈 날", "복직 후 아기 아픈 날과 병가 돌봄 분담", "복직 후 아기 아픈 날", "병가 돌봄", "응급 계획"],
  ["work-commute-feeding-bag", "출근 수유가방 준비", "출근 수유가방과 유축 소모품 체크", "출근 수유가방", "유축 소모품", "복직 준비"],
  ["work-postpartum-fatigue-office", "복직 후 산후피로 관리", "복직 후 산후피로와 업무량 조정 질문", "복직 후 산후피로", "업무량 조정", "건강 관리"],
  ["work-daycare-waitlist-strategy", "어린이집 대기 순번 관리", "어린이집 대기 순번과 입소 상담 질문", "어린이집 대기 순번", "입소 상담", "보육 계획"],
  ["work-family-calendar", "육아 가족 일정표 만들기", "육아 가족 일정표와 예방접종 검진 공유", "육아 가족 일정표", "예방접종 검진", "공동 캘린더"],
];

const supportAdminFollowupPlans: readonly PlanTuple[] = [
  ["support-childcare-subsidy-start", "보육료 지원 전환 확인", "보육료 지원 전환과 어린이집 입소 전 신청", "보육료 지원 전환", "어린이집 입소", "아이사랑 신청"],
  ["support-homecare-allowance-change", "양육수당 전환 기준", "양육수당 전환 기준과 부모급여 차이 확인", "양육수당 전환 기준", "부모급여 차이", "가정양육"],
  ["support-vaccine-record-check", "예방접종 기록 확인", "예방접종 기록 확인과 누락 접종 상담", "예방접종 기록 확인", "누락 접종 상담", "예방접종도우미"],
  ["support-health-checkup-infant", "영유아검진 예약 준비", "영유아검진 예약과 문진표 작성 기준", "영유아검진 예약", "문진표 작성", "건강검진"],
  ["support-postpartum-care-extend", "산후도우미 연장 문의", "산후도우미 연장 문의와 본인부담금 확인", "산후도우미 연장 문의", "본인부담금", "서비스 기간"],
  ["support-emergency-childcare", "긴급돌봄 지원 확인", "긴급돌봄 지원과 신청 사유 정리", "긴급돌봄 지원", "신청 사유", "돌봄 공백"],
  ["support-medical-bill-folder", "아기 병원비 영수증 정리", "아기 병원비 영수증과 보험 청구 자료", "아기 병원비 영수증", "보험 청구 자료", "의료비 기록"],
  ["support-local-birth-gift", "지자체 출산축하용품 확인", "지자체 출산축하용품과 신청 기한 점검", "지자체 출산축하용품", "신청 기한", "주소지 기준"],
  ["support-public-postpartum-center", "공공산후조리원 신청", "공공산후조리원 신청과 우선순위 확인", "공공산후조리원 신청", "우선순위", "이용료"],
  ["support-mom-health-program", "보건소 산모 건강교실", "보건소 산모 건강교실과 수유 교육 신청", "보건소 산모 건강교실", "수유 교육", "지역 프로그램"],
];

const insuranceClaimPlans: readonly PlanTuple[] = [
  ["insurance-newborn-claim-first", "태아보험 첫 보험금 청구", "태아보험 첫 보험금 청구와 병원서류 준비", "태아보험 첫 보험금 청구", "병원서류", "청구 절차"],
  ["insurance-policy-review-after-birth", "출생 후 보험증권 점검", "출생 후 보험증권 점검과 피보험자 정보 확인", "출생 후 보험증권 점검", "피보험자 정보", "계약 변경"],
  ["insurance-rider-delete-check", "태아특약 삭제 시점 확인", "태아특약 삭제 시점과 출생 후 보장 조정", "태아특약 삭제 시점", "출생 후 보장", "보험료 조정"],
  ["insurance-child-policy-switch", "어린이보험 전환 질문", "어린이보험 전환 질문과 보장 공백 확인", "어린이보험 전환 질문", "보장 공백", "계약 전환"],
  ["insurance-claim-app-upload", "보험 청구 앱 업로드 준비", "보험 청구 앱 업로드와 진료비 세부내역서 확인", "보험 청구 앱 업로드", "진료비 세부내역서", "모바일 청구"],
  ["insurance-hospital-record-copy", "보험청구 진료기록 사본", "보험청구 진료기록 사본과 발급 비용 확인", "보험청구 진료기록 사본", "발급 비용", "청구 서류"],
  ["insurance-denial-question", "보험금 부지급 질문", "보험금 부지급 질문과 약관 근거 확인", "보험금 부지급 질문", "약관 근거", "이의 신청"],
  ["insurance-premium-after-birth-budget", "출생 후 보험료 예산", "출생 후 보험료 예산과 양육비 고정지출 비교", "출생 후 보험료 예산", "양육비 고정지출", "가계 점검"],
  ["insurance-agent-followup-record", "보험 상담 사후기록", "보험 상담 사후기록과 설명의무 확인", "보험 상담 사후기록", "설명의무 확인", "상담 메모"],
  ["insurance-medical-history-update", "아기 진료이력 고지 질문", "아기 진료이력 고지와 추가 가입 상담", "아기 진료이력 고지", "추가 가입 상담", "고지의무"],
];

const familyHomePlans: readonly PlanTuple[] = [
  ["home-baby-laundry-routine", "아기 빨래 루틴 만들기", "아기 빨래 루틴과 세제 보관 기준", "아기 빨래 루틴", "세제 보관", "위생 관리"],
  ["home-humidity-mold-check", "아기방 곰팡이 예방", "아기방 곰팡이 예방과 습도 기록", "아기방 곰팡이 예방", "습도 기록", "실내 공기"],
  ["home-pet-baby-zone", "반려동물 아기 공간 분리", "반려동물 아기 공간 분리와 위생 규칙", "반려동물 아기 공간", "위생 규칙", "생활 동선"],
  ["home-visitor-gift-boundary", "출산 선물 요청 리스트", "출산 선물 요청 리스트와 중복 물품 줄이기", "출산 선물 요청 리스트", "중복 물품", "가족 공유"],
  ["home-freezer-meal-plan", "산후 냉동식 준비", "산후 냉동식 준비와 보호자 식사 분담", "산후 냉동식 준비", "보호자 식사", "집밥 루틴"],
  ["home-baby-medicine-box", "아기 상비약 보관함", "아기 상비약 보관함과 체온계 사용 기준", "아기 상비약 보관함", "체온계 사용", "응급 준비"],
  ["home-night-light-safety", "수유등 안전 위치", "수유등 안전 위치와 야간 동선 점검", "수유등 안전 위치", "야간 동선", "낙상 예방"],
  ["home-diaper-station", "기저귀 교환대 구성", "기저귀 교환대 구성과 손 닿는 물품 정리", "기저귀 교환대 구성", "손 닿는 물품", "육아 동선"],
  ["home-budget-consumables", "육아 소모품 예산표", "육아 소모품 예산표와 월별 구매 주기", "육아 소모품 예산표", "월별 구매", "가계 관리"],
  ["home-family-meeting", "육아 가족회의 안건", "육아 가족회의 안건과 역할 조정 문장", "육아 가족회의 안건", "역할 조정", "가족 소통"],
];

function tuplePlans(
  rows: readonly PlanTuple[],
  category: string,
  relatedHref: string,
  structure: ContentPlan["structure"],
) {
  return rows.map(([slug, title, subtitle, mainKeyword, related, expanded]) =>
    plan(
      slug,
      title,
      subtitle,
      mainKeyword,
      [related, expanded],
      [mainKeyword, related, expanded, `${mainKeyword} 체크리스트`, `${mainKeyword} 질문`],
      category,
      `${mainKeyword}의 기준과 다음 행동을 알고 싶다`,
      "검색으로 정보를 확인하지만 최종 판단은 진료와 공식 안내로 검증하려는 독자",
      `${mainKeyword}를 불안 조장 없이 확인 질문과 행동 순서로 바꾼다`,
      `${related}를 함께 확인했는지`,
      relatedHref,
      structure,
    ),
  );
}

const contentPlans: ContentPlan[] = [
  ...pregnancyWeekPlans,
  ...tuplePlans(symptomPlans, "생활관리", "/pregnancy/24", "warning"),
  ...tuplePlans(screeningPlans, "산전검사", "/pregnancy/20", "checklist"),
  ...tuplePlans(supportPlans, "정부지원", "/pregnancy/28", "howto"),
  ...tuplePlans(birthPlans, "출산준비", "/pregnancy/36", "checklist"),
  ...tuplePlans(insurancePlans, "태아보험", "/fetal-insurance", "comparison"),
  ...tuplePlans(faqPlans, "FAQ", "/pregnancy/32", "faq"),
  ...tuplePlans(latePregnancyExtraPlans, "주차별 임신", "/pregnancy/32", "warning"),
  ...tuplePlans(postpartumExtraPlans, "생활관리", "/pregnancy/36", "howto"),
  ...tuplePlans(newbornExtraPlans, "출산준비", "/pregnancy/36", "checklist"),
  ...tuplePlans(adminExtraPlans, "정부지원", "/pregnancy/36", "howto"),
  ...tuplePlans(familyExtraPlans, "생활관리", "/pregnancy/36", "faq"),
  ...tuplePlans(supportExtraPlans, "정부지원", "/pregnancy/28", "checklist"),
  ...tuplePlans(insuranceExtraPlans, "태아보험", "/fetal-insurance", "comparison"),
  ...tuplePlans(recoveryRoutinePlans, "생활관리", "/pregnancy/36", "howto"),
  ...tuplePlans(infantGrowthPlans, "출산준비", "/pregnancy/36", "checklist"),
  ...tuplePlans(feedingSleepPlans, "생활관리", "/pregnancy/36", "faq"),
  ...tuplePlans(workCarePlans, "정부지원", "/pregnancy/36", "howto"),
  ...tuplePlans(supportAdminFollowupPlans, "정부지원", "/pregnancy/28", "checklist"),
  ...tuplePlans(insuranceClaimPlans, "태아보험", "/fetal-insurance", "comparison"),
  ...tuplePlans(familyHomePlans, "생활관리", "/pregnancy/36", "faq"),
];

function buildSections(plan: ContentPlan): BlogSection[] {
  const coreChecklist = [
    `${plan.mainKeyword}와 관련해 최근에 달라진 몸 상태나 행정 상황을 날짜별로 적습니다.`,
    `${plan.relatedKeywords[0]} 확인이 필요한지 진료기관 또는 공식 안내 페이지에서 다시 확인합니다.`,
    `${plan.decisionCriterion}를 기준으로 지금 할 일과 다음 진료 때 물어볼 일을 나눕니다.`,
  ];

  const warning =
    plan.category === "태아보험"
      ? "보험 상품명이나 가격보다 약관, 보장 범위, 고지의무, 납입 지속 가능성을 먼저 확인해야 합니다."
      : plan.category === "정부지원"
        ? "지원 대상, 금액, 신청 기간은 매년 또는 지자체별로 달라질 수 있어 신청 직전 공식 안내 확인이 필요합니다."
        : "통증, 출혈, 규칙적인 수축, 고열, 심한 두통처럼 갑작스럽거나 반복되는 증상은 블로그 정보로 판단하지 말고 진료기관에 문의하세요.";

  return [
    {
      id: "answer",
      heading: `${plan.mainKeyword} 한눈에 보는 결론`,
      body: [
        `${plan.mainKeyword}는 ${plan.reader}가 ${plan.intent}는 상황에서 자주 검색하는 주제입니다.`,
        `핵심은 ${plan.angle}는 것입니다. 글을 읽은 뒤에는 ${plan.decisionCriterion}를 기준으로 지금 할 일과 확인할 질문을 나누면 됩니다.`,
      ],
      checklist: coreChecklist,
    },
    {
      id: "timing",
      heading: `${plan.mainKeyword} 확인 시기와 우선순위`,
      body: [
        `${plan.relatedKeywords.join(", ")}는 함께 확인하면 검색 의도를 더 정확히 해결할 수 있는 항목입니다.`,
        "임신 주차, 검사 결과, 기존 질환, 거주지 지원 기준에 따라 같은 키워드라도 실제 대응은 달라질 수 있습니다.",
        "따라서 이 글은 최종 판단문이 아니라 진료 전 메모와 공식 신청 전 점검표로 사용하는 것이 적절합니다.",
      ],
    },
    {
      id: "checklist",
      heading: `${plan.relatedKeywords[0]}까지 놓치지 않는 체크리스트`,
      body: [
        "첫째, 현재 주차와 예정일을 기준으로 적용되는 항목인지 확인합니다.",
        "둘째, 증상이나 제도 이름만 보지 말고 필요한 서류, 검사 시기, 상담 예약 여부를 함께 확인합니다.",
        "셋째, 배우자나 보호자와 공유할 내용은 한 문장으로 정리해 두면 병원이나 보건소 문의가 쉬워집니다.",
      ],
      checklist: [
        "현재 임신 주차와 예정일을 적었다.",
        "공식 기관 또는 진료기관 확인이 필요한 항목을 표시했다.",
        "다음 행동을 오늘 할 일, 이번 주 할 일, 다음 진료 때 질문으로 나눴다.",
      ],
    },
    {
      id: "caution",
      heading: `${plan.mainKeyword}에서 과장 정보 피하는 법`,
      body: [
        warning,
        "검색 결과의 제목이 강하게 보이더라도 본문에서 근거, 날짜, 대상 조건, 예외 조건이 제시되는지 확인해야 합니다.",
        "의료 정보는 개인 상태에 따라 달라지고, 지원 제도는 거주지와 신청 시점에 따라 달라집니다.",
      ],
    },
    {
      id: "next",
      heading: `${plan.expandedKeywords[0]} 다음 행동 정리`,
      body: [
        `${plan.expandedKeywords.slice(0, 3).join(", ")}까지 확인했다면 다음 단계는 기록을 남기는 것입니다.`,
        "증상 글은 날짜와 지속 시간을, 검사 글은 예약일과 결과 확인일을, 지원 글은 신청 기한과 제출서류를 적어두세요.",
        "태아보험 관련 글은 특정 상품을 고르기보다 상담에서 같은 질문을 반복해 비교 가능한 답변을 받는 데 초점을 맞추는 것이 좋습니다.",
      ],
    },
  ];
}

function buildFaq(plan: ContentPlan): BlogFaq[] {
  return [
    {
      question: `${plan.mainKeyword}는 언제 병원이나 기관에 확인해야 하나요?`,
      answer:
        "증상이 갑자기 심해지거나, 검사·지원 신청 기한이 걸려 있거나, 본인 상태에 따라 판단이 달라지는 경우에는 바로 확인하는 것이 좋습니다.",
    },
    {
      question: `${plan.relatedKeywords[0]} 정보는 어디서 다시 확인하면 좋나요?`,
      answer:
        "의료 내용은 다니는 산부인과와 보건소, 지원 제도는 복지로·정부24·국민건강보험공단·거주지 보건소 안내를 우선 확인하세요.",
    },
    {
      question: "이 글만 보고 최종 결정을 해도 되나요?",
      answer:
        "아닙니다. 이 글은 상담과 신청 전 체크리스트이며, 개인 상태와 최신 기준은 담당 의료진 또는 공식 기관에서 최종 확인해야 합니다.",
    },
  ];
}

function sourceSlice(plan: ContentPlan) {
  if (plan.category === "정부지원") return commonSources.slice(0, 4);
  if (plan.category === "산전검사") return [commonSources[2], commonSources[4], commonSources[0]];
  if (plan.category === "태아보험") return [commonSources[0], commonSources[1]];
  return [commonSources[2], commonSources[4], commonSources[0]];
}

function colorPair(category: string) {
  const pairs: Record<string, { accentColor: string; secondaryColor: string }> = {
    "주차별 임신": { accentColor: "#d6608a", secondaryColor: "#5577c8" },
    생활관리: { accentColor: "#4f9f78", secondaryColor: "#d6608a" },
    산전검사: { accentColor: "#5577c8", secondaryColor: "#4f9f78" },
    정부지원: { accentColor: "#d08a32", secondaryColor: "#5577c8" },
    출산준비: { accentColor: "#8167c9", secondaryColor: "#d08a32" },
    태아보험: { accentColor: "#3d8bb5", secondaryColor: "#8167c9" },
    FAQ: { accentColor: "#c66a4a", secondaryColor: "#4f9f78" },
  };
  return pairs[category] ?? { accentColor: "#d6608a", secondaryColor: "#5577c8" };
}

function diversifySections(plan: ContentPlan, sections: BlogSection[]): BlogSection[] {
  const variants: Record<ContentPlan["structure"], Array<BlogSection["kind"]>> = {
    checklist: ["summary", "checklist", "steps", "warning", "source"],
    faq: ["summary", "compare", "checklist", "source", "warning"],
    howto: ["summary", "steps", "checklist", "compare", "source"],
    comparison: ["summary", "compare", "checklist", "warning", "source"],
    warning: ["summary", "warning", "checklist", "steps", "source"],
  };
  const headingSets: Record<ContentPlan["structure"], string[]> = {
    checklist: [
      `${plan.mainKeyword} 핵심 판단 기준`,
      `${plan.relatedKeywords[0]} 확인 체크리스트`,
      `${plan.expandedKeywords[0]} 준비 순서`,
      `${plan.mainKeyword}에서 놓치기 쉬운 부분`,
      `${plan.expandedKeywords[1] ?? plan.relatedKeywords[1]} 다음 행동`,
    ],
    faq: [
      `${plan.mainKeyword} 바로 답변`,
      `${plan.relatedKeywords[0]}와 함께 보는 차이`,
      `${plan.expandedKeywords[0]} 확인 질문`,
      `${plan.mainKeyword} 공식 확인 경로`,
      `${plan.relatedKeywords[1]} 주의할 점`,
    ],
    howto: [
      `${plan.mainKeyword} 실행 순서`,
      `${plan.relatedKeywords[0]} 먼저 확인하기`,
      `${plan.expandedKeywords[0]} 단계별 메모`,
      `${plan.relatedKeywords[1]} 비교 기준`,
      `${plan.mainKeyword} 신청 전 마무리`,
    ],
    comparison: [
      `${plan.mainKeyword} 상담 전 기준`,
      `${plan.relatedKeywords[0]} 비교 질문`,
      `${plan.expandedKeywords[0]} 확인표`,
      `${plan.relatedKeywords[1]}에서 피할 표현`,
      `${plan.mainKeyword} 다음 상담 메모`,
    ],
    warning: [
      `${plan.mainKeyword} 먼저 볼 위험 신호`,
      `${plan.relatedKeywords[0]}와 함께 확인할 증상`,
      `${plan.expandedKeywords[0]} 기록 체크`,
      `${plan.mainKeyword}에서 바로 문의할 상황`,
      `${plan.relatedKeywords[1]} 이후 행동`,
    ],
  };
  const kinds = variants[plan.structure];
  const headings = headingSets[plan.structure];

  return sections.map((section, index) => ({
    ...section,
    kind: kinds[index % kinds.length],
    heading: headings[index] ?? section.heading,
  }));
}

function buildPost(plan: ContentPlan, index: number): BlogPost {
  const publishedAt = scheduledAt(index);
  const title = ensureTitleKeyword(plan.title, plan.mainKeyword, plan.expandedKeywords);
  const subtitle = ensureSubtitleKeywords(
    plan.subtitle,
    plan.mainKeyword,
    plan.relatedKeywords,
    plan.expandedKeywords,
  );
  const description = `${subtitle}. ${plan.mainKeyword}, ${plan.relatedKeywords.join(", ")}를 기준으로 지금 확인할 항목을 정리했습니다.`;

  return {
    slug: plan.slug,
    title,
    subtitle,
    description,
    thumbnail: `/blog-thumbnails/${plan.slug}.webp`,
    category: plan.category,
    mainKeyword: plan.mainKeyword,
    relatedKeywords: plan.relatedKeywords,
    expandedKeywords: plan.expandedKeywords,
    publishedAt,
    updatedAt: formatDate(new Date(publishedAt)),
    readMinutes: plan.structure === "faq" ? 5 : 6,
    qualityScore: 92,
    relatedHref: plan.relatedHref,
    geoTargets: ["대한민국", "보건소", "산부인과", "복지로"],
    aeoQuestions: [
      `${plan.mainKeyword}에서 먼저 확인할 것은 무엇인가요?`,
      `${plan.relatedKeywords[0]}는 어떤 기준으로 판단하나요?`,
    ],
    sections: diversifySections(plan, buildSections(plan)),
    faq: buildFaq(plan),
    sources: sourceSlice(plan),
    ...colorPair(plan.category),
  };
}

export const generatedBlogPosts: BlogPost[] = contentPlans.map(buildPost);

export const blogPosts: BlogPost[] = [
  ...existingPosts.map((post) => ({ ...post, ...colorPair(post.category) })),
  ...generatedBlogPosts,
];

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function isPublished(post: BlogPost, now = new Date()): boolean {
  return new Date(post.publishedAt).getTime() <= now.getTime();
}

export function getPublishedBlogPosts(now = new Date()): BlogPost[] {
  return getAllBlogPosts().filter((post) => isPublished(post, now));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPublishedBlogPost(slug: string, now = new Date()): BlogPost | undefined {
  const post = getBlogPost(slug);
  if (!post || !isPublished(post, now)) return undefined;
  return post;
}

export function getBlogSchedule() {
  return {
    publicationStart,
    scheduleIntervalHours,
    totalGenerated: generatedBlogPosts.length,
  };
}
