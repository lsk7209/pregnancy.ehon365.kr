import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// 출처 메타 — 수기 큐레이션 핵심
export const sources = sqliteTable("sources", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sourceName: text("source_name").notNull(),
  sourceUrl: text("source_url").notNull(),
  sourceType: text("source_type", {
    enum: ["gov", "academic", "medical_institution", "insurance"],
  }).notNull(),
  license: text("license").notNull().default(""),
  trustScore: integer("trust_score").notNull().default(10),
  lastUpdated: integer("last_updated", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});

// 발췌 — RAG 컨텍스트 소스
export const sourceExtracts = sqliteTable("source_extracts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sourceId: integer("source_id")
    .notNull()
    .references(() => sources.id),
  weekNumber: integer("week_number"), // NULL이면 전체/일반 자료
  category: text("category", {
    enum: ["development", "mother", "screening", "support", "general"],
  }).notNull(),
  rawText: text("raw_text").notNull(),
  summary: text("summary").notNull().default(""),
  citationFormat: text("citation_format").notNull().default(""),
  status: text("status", { enum: ["draft", "verified"] })
    .notNull()
    .default("draft"),
  verifiedBy: text("verified_by"),
  verifiedAt: integer("verified_at", { mode: "timestamp" }),
});

// 지원 프로그램 — 정부지원 가공 테이블
export const supportPrograms = sqliteTable("support_programs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  programName: text("program_name").notNull(),
  programCategory: text("program_category", {
    enum: ["national", "regional", "boards"],
  }).notNull(),
  regionType: text("region_type", { enum: ["all", "sido", "sigungu"] })
    .notNull()
    .default("all"),
  regionCode: text("region_code"), // 행정구역 코드 (지역형만)
  eligibilityWeekStart: integer("eligibility_week_start").notNull().default(0),
  eligibilityWeekEnd: integer("eligibility_week_end").notNull().default(45),
  description: text("description").notNull(),
  applicationMethod: text("application_method").notNull().default(""),
  sourceApiId: text("source_api_id").notNull().default(""),
  sourceUrl: text("source_url").notNull().default(""),
  lastSynced: integer("last_synced", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  status: text("status", { enum: ["active", "paused", "expired"] })
    .notNull()
    .default("active"),
});

// 검진 일정 마스터 (정적 데이터)
export const screeningSchedules = sqliteTable("screening_schedules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  screeningName: text("screening_name").notNull(),
  shortName: text("short_name").notNull(),
  weekRangeStart: integer("week_range_start").notNull(),
  weekRangeEnd: integer("week_range_end").notNull(),
  description: text("description").notNull(),
  sourceCitation: text("source_citation").notNull().default(""),
  displayPriority: integer("display_priority").notNull().default(100),
});

// CPA 오퍼 관리
export const cpaOffers = sqliteTable("cpa_offers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  vertical: text("vertical", {
    enum: [
      "fetal_insurance",
      "postpartum_care",
      "prenatal_supplement",
      "baby_fair",
      "experience_box",
    ],
  }).notNull(),
  advertiser: text("advertiser").notNull(),
  region: text("region"),
  payout: integer("payout").notNull().default(0),
  landingUrl: text("landing_url").notNull(),
  subIdParam: text("sub_id_param").notNull().default("sub_id"),
  status: text("status", { enum: ["active", "paused", "expired"] })
    .notNull()
    .default("active"),
  startDate: text("start_date").notNull().default(""),
  endDate: text("end_date"),
  priority: integer("priority").notNull().default(100),
});

export type Source = typeof sources.$inferSelect;
export type SourceExtract = typeof sourceExtracts.$inferSelect;
export type SupportProgram = typeof supportPrograms.$inferSelect;
export type ScreeningSchedule = typeof screeningSchedules.$inferSelect;
export type CpaOffer = typeof cpaOffers.$inferSelect;
