import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ConditionalBoxRenderer } from "@/components/boxes/ConditionalBoxRenderer";
import { FetalDevelopment } from "@/components/pregnancy/FetalDevelopment";
import { MotherChanges } from "@/components/pregnancy/MotherChanges";
import { ScreeningGuide } from "@/components/pregnancy/ScreeningGuide";
import { WeekHero } from "@/components/pregnancy/WeekHero";
import { WeekOverview } from "@/components/pregnancy/WeekOverview";
import { buildWeekPage } from "@/lib/page-builder";
import { CORE_WEEKS, isValidWeek } from "@/lib/week-data";
import { SITE_NAME } from "@/lib/utils";

interface PageProps {
  params: Promise<{ week: string }>;
}

function parseWeek(value: string): number {
  return Number.parseInt(value, 10);
}

export function generateStaticParams() {
  return CORE_WEEKS.map((week) => ({ week: String(week) }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { week: weekParam } = await params;
  const week = parseWeek(weekParam);
  if (!isValidWeek(week)) return {};

  return {
    title: `임신 ${week}주 가이드`,
    description: `임신 ${week}주 태아 발달, 엄마 몸의 변화, 산전검사와 정부 지원 정보를 정리한 ${SITE_NAME} 주차별 가이드입니다.`,
  };
}

export default async function PregnancyWeekPage({ params }: PageProps) {
  const { week: weekParam } = await params;
  const week = parseWeek(weekParam);
  if (!isValidWeek(week)) notFound();

  const data = await buildWeekPage(week);

  return (
    <article>
      <WeekHero week={data.week} trimester={data.trimester} />
      <WeekOverview size={data.size} dDay={data.dDay} />

      <FetalDevelopment content={data.development} />
      <MotherChanges content={data.motherChanges} />
      <ConditionalBoxRenderer boxes={data.boxes} />
      <ScreeningGuide content={data.screeningGuide} />

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold text-ink">이번 주 검사 일정</h2>
        {data.screenings.length > 0 ? (
          <div className="space-y-3">
            {data.screenings.map((screening) => (
              <div
                key={screening.id}
                className="rounded-xl border border-neutral-200 bg-white p-4"
              >
                <p className="font-semibold text-ink">
                  {screening.screeningName}
                </p>
                <p className="mt-1 text-sm text-neutral-700">
                  {screening.description}
                </p>
                {screening.sourceCitation && (
                  <p className="mt-2 text-xs text-neutral-500">
                    {screening.sourceCitation}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-700">
            이 주차에 고정으로 표시할 검사 일정은 없습니다. 진료 일정은
            산부인과에서 개인 상태에 맞춰 안내받는 것이 좋습니다.
          </p>
        )}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold text-ink">
          받을 수 있는 정부 지원
        </h2>
        <div className="space-y-3">
          {data.supports.map((support) => (
            <div
              key={support.id}
              className="rounded-xl border border-neutral-200 bg-white p-4"
            >
              <p className="font-semibold text-ink">{support.programName}</p>
              <p className="mt-1 text-sm text-neutral-700">
                {support.description}
              </p>
              <p className="mt-2 text-xs text-neutral-500">
                신청: {support.applicationMethod}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold text-ink">체크리스트</h2>
        <ul className="list-inside list-disc space-y-2 text-neutral-700">
          {data.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold text-ink">자주 묻는 질문</h2>
        <div className="space-y-3">
          {data.faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-xl border border-neutral-200 bg-white p-4"
            >
              <summary className="cursor-pointer font-semibold text-ink">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm text-neutral-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <nav className="flex flex-wrap gap-3 border-t border-neutral-200 pt-6 text-sm">
        {week > 4 && (
          <Link href={`/pregnancy/${week - 1}`} className="text-brand">
            이전 주차
          </Link>
        )}
        {week < 40 && (
          <Link href={`/pregnancy/${week + 1}`} className="text-brand">
            다음 주차
          </Link>
        )}
        <Link href="/" className="text-brand">
          전체 주차 보기
        </Link>
      </nav>
    </article>
  );
}
