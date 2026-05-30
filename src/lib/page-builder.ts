import { activeBoxes, isCpaWindow, type BoxId } from "./conditional-boxes";
import { matchScreenings, matchSupports } from "./matching";
import { generateSection, getSourceContext } from "./ai/rag-converter";
import { trimesterOf, dDayOf, weekSize } from "./week-data";
import type { ScreeningSchedule, SupportProgram } from "@/db/schema";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface WeekPageData {
  week: number;
  trimester: 1 | 2 | 3;
  dDay: number;
  size: { fruit: string; lengthCm: string; weightG: string };
  development: string;
  motherChanges: string;
  screeningGuide: string;
  checklist: string[];
  faqs: FaqItem[];
  screenings: ScreeningSchedule[];
  supports: SupportProgram[];
  boxes: BoxId[];
  isCpaWindow: boolean;
}

function fallbackParagraph(context: string[], week: number): string {
  if (context.length > 0) return context.join("\n\n");

  return `임신 ${week}주에는 태아 발달과 엄마 몸의 변화가 개인마다 다르게 나타날 수 있습니다. 이 페이지는 일반적인 준비 항목을 정리한 것이며, 출혈·심한 통증·태동 변화처럼 평소와 다른 증상이 있으면 의료기관과 상담해 주세요.`;
}

const FALLBACK_CHECKLIST = [
  "다음 산전 진료 일정 확인하기",
  "복용 중인 영양제와 약을 의료진에게 다시 확인하기",
  "수분 섭취와 휴식 시간을 충분히 확보하기",
  "궁금한 증상이나 검사 질문을 메모해 진료 때 상담하기",
  "임신·출산 진료비 지원 사용 가능 항목 확인하기",
  "무리한 운동이나 장거리 이동 전 의료진과 상담하기",
];

function fallbackFaqs(week: number): FaqItem[] {
  return [
    {
      question: `임신 ${week}주에 가장 먼저 확인할 것은 무엇인가요?`,
      answer:
        "정기 진료 일정, 최근 증상 변화, 이 시기에 안내받은 검사 여부를 확인하는 것이 좋습니다. 개인별 상태가 다르므로 구체적인 판단은 의료기관에서 상담해 주세요.",
    },
    {
      question: "검사 일정은 꼭 주차에 맞춰야 하나요?",
      answer:
        "일부 검사는 권장 시기가 있지만 실제 일정은 병원 예약, 산모 상태, 이전 검사 결과에 따라 달라질 수 있습니다. 진료기관의 안내를 기준으로 결정해 주세요.",
    },
    {
      question: "정부 지원은 어디에서 확인하나요?",
      answer:
        "국민행복카드, 보건소 지원, 복지로 안내 등을 확인할 수 있습니다. 거주지별로 조건이 다를 수 있으므로 관할 보건소나 복지로에서 최신 정보를 확인하는 것이 좋습니다.",
    },
  ];
}

function parseFaqMarkdown(md: string): FaqItem[] {
  const blocks = md.split(/^###\s+/m).filter((b) => b.trim());
  return blocks
    .map((b) => {
      const [q, ...rest] = b.split("\n");
      return { question: q.trim(), answer: rest.join("\n").trim() };
    })
    .filter((f) => f.question && f.answer);
}

export async function buildWeekPage(week: number): Promise<WeekPageData> {
  const [devCtx, motherCtx, screenCtx, screenings, supports] =
    await Promise.all([
      getSourceContext(week, "development"),
      getSourceContext(week, "mother"),
      getSourceContext(week, "screening"),
      matchScreenings(week),
      matchSupports(week),
    ]);

  const [devAi, motherAi, screenAi, checklistAi, faqAi] = await Promise.all([
    generateSection("development", week, devCtx),
    generateSection("mother", week, motherCtx),
    generateSection("screening", week, screenCtx),
    generateSection("checklist", week, []),
    generateSection("faq", week, []),
  ]);

  const faqs = faqAi ? parseFaqMarkdown(faqAi) : [];
  const checklist =
    checklistAi
      ?.split("\n")
      .map((line) => line.replace(/^[-*]\s*/, "").trim())
      .filter(Boolean) ?? [];

  return {
    week,
    trimester: trimesterOf(week),
    dDay: dDayOf(week),
    size: weekSize(week),
    development: devAi ?? fallbackParagraph(devCtx, week),
    motherChanges: motherAi ?? fallbackParagraph(motherCtx, week),
    screeningGuide: screenAi ?? fallbackParagraph(screenCtx, week),
    checklist: checklist.length >= 3 ? checklist : FALLBACK_CHECKLIST,
    faqs: faqs.length >= 3 ? faqs : fallbackFaqs(week),
    screenings,
    supports,
    boxes: activeBoxes(week),
    isCpaWindow: isCpaWindow(week),
  };
}
