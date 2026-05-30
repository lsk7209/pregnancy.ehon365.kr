import { db } from "../client";
import {
  cpaOffers,
  screeningSchedules,
  sourceExtracts,
  sources,
  supportPrograms,
} from "../schema";
import { offerSeed } from "./offers";
import { screeningSeed } from "./screenings";
import { extractSeed, sourceSeed } from "./sources";
import { supportSeed } from "./supports";

async function seed() {
  console.log("시드 시작...");

  // 검진 일정
  await db.delete(screeningSchedules);
  await db.insert(screeningSchedules).values(screeningSeed);
  console.log(`검진 일정 ${screeningSeed.length}건 삽입`);

  // 정부지원
  await db.delete(supportPrograms);
  await db.insert(supportPrograms).values(supportSeed);
  console.log(`정부지원 ${supportSeed.length}건 삽입`);

  // 출처 + 발췌 (sourceIndex → 실제 id 매핑)
  await db.delete(sourceExtracts);
  await db.delete(sources);
  const insertedSources = await db
    .insert(sources)
    .values(sourceSeed)
    .returning({ id: sources.id });
  const extracts = extractSeed.map(({ sourceIndex, ...rest }) => ({
    ...rest,
    sourceId: insertedSources[sourceIndex].id,
  }));
  await db.insert(sourceExtracts).values(extracts);
  console.log(
    `출처 ${insertedSources.length}건, 발췌 ${extracts.length}건 삽입`,
  );

  // CPA 오퍼
  await db.delete(cpaOffers);
  await db.insert(cpaOffers).values(offerSeed);
  console.log(`CPA 오퍼 ${offerSeed.length}건 삽입`);

  console.log("시드 완료");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("시드 실패:", err);
    process.exit(1);
  });
