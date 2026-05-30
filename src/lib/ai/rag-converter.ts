import { and, eq, isNull, or } from "drizzle-orm";
import { GoogleGenAI } from "@google/genai";
import { db } from "@/db/client";
import { sourceExtracts } from "@/db/schema";
import {
  COMMON_SYSTEM_PROMPT,
  SECTION_MODEL,
  sectionInstruction,
  type SectionKey,
} from "./prompts";

type Category = "development" | "mother" | "screening" | "support" | "general";

// 출처 컨텍스트 추출 — 카테고리별 최대 3개 (토큰 절약, §7)
export async function getSourceContext(
  week: number,
  category: Category,
): Promise<string[]> {
  const rows = await db
    .select()
    .from(sourceExtracts)
    .where(
      and(
        eq(sourceExtracts.status, "verified"),
        eq(sourceExtracts.category, category),
        or(
          eq(sourceExtracts.weekNumber, week),
          isNull(sourceExtracts.weekNumber),
        ),
      ),
    )
    .limit(3);

  return rows.map((r) => `${r.summary} ${r.citationFormat}`);
}

let cachedClient: GoogleGenAI | null = null;

function getClient(): GoogleGenAI | null {
  if (
    process.env.NEXT_PHASE === "phase-production-build" &&
    process.env.ENABLE_AI_BUILD !== "true"
  ) {
    return null;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!cachedClient) cachedClient = new GoogleGenAI({ apiKey });
  return cachedClient;
}

// 섹션 생성 — API 키 없으면 null 반환 (호출부에서 폴백 처리)
export async function generateSection(
  section: SectionKey,
  week: number,
  context: string[],
): Promise<string | null> {
  const client = getClient();
  if (!client) return null;

  const contextBlock =
    context.length > 0
      ? `[출처 컨텍스트]\n${context.join("\n")}`
      : "[출처 컨텍스트] 제공된 출처 없음 — 의학정보 창작 금지, 일반 안내만";

  const prompt = `${sectionInstruction(section, week)}\n\n${contextBlock}`;

  try {
    const res = await client.models.generateContent({
      model: SECTION_MODEL[section],
      contents: prompt,
      config: { systemInstruction: COMMON_SYSTEM_PROMPT },
    });
    return res.text ?? null;
  } catch (err) {
    console.error(`generateSection 실패 (${section}, ${week}주):`, err);
    return null;
  }
}
