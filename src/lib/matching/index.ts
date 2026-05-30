import { and, eq, lte, gte, or, isNull } from "drizzle-orm";
import { db } from "@/db/client";
import {
  screeningSchedules,
  supportPrograms,
  type ScreeningSchedule,
  type SupportProgram,
} from "@/db/schema";
import { fallbackSupports, filterFallbackScreenings } from "@/lib/db-fallbacks";

// 지역 코드 매칭: 시도 코드(앞 2자리)까지 일치하면 매칭으로 간주
export function isRegionMatch(
  programRegionCode: string | null,
  userRegionCode: string,
): boolean {
  if (!programRegionCode) return false;
  if (programRegionCode === userRegionCode) return true;
  return userRegionCode.startsWith(programRegionCode.slice(0, 2));
}

// 검진 일정 매칭 (주차 입력)
export async function matchScreenings(
  week: number,
): Promise<ScreeningSchedule[]> {
  try {
    return await db
      .select()
      .from(screeningSchedules)
      .where(
        and(
          lte(screeningSchedules.weekRangeStart, week),
          gte(screeningSchedules.weekRangeEnd, week),
        ),
      )
      .orderBy(screeningSchedules.displayPriority);
  } catch (error) {
    console.warn("matchScreenings fallback:", error);
    return filterFallbackScreenings(week);
  }
}

// 정부지원 매칭 (주차 + 지역 옵션)
export async function matchSupports(
  week: number,
  regionCode?: string,
): Promise<SupportProgram[]> {
  let rows: SupportProgram[];

  try {
    rows = await db
      .select()
      .from(supportPrograms)
      .where(
        and(
          eq(supportPrograms.status, "active"),
          lte(supportPrograms.eligibilityWeekStart, week),
          gte(supportPrograms.eligibilityWeekEnd, week),
          regionCode
            ? or(
                eq(supportPrograms.regionType, "all"),
                isNull(supportPrograms.regionCode),
              )
            : eq(supportPrograms.regionType, "all"),
        ),
      );
  } catch (error) {
    console.warn("matchSupports fallback:", error);
    rows = fallbackSupports.filter(
      (support) =>
        support.eligibilityWeekStart <= week && support.eligibilityWeekEnd >= week,
    );
  }

  if (!regionCode) return rows;
  return rows.filter(
    (p) => p.regionType === "all" || isRegionMatch(p.regionCode, regionCode),
  );
}
