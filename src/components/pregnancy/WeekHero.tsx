interface Props {
  week: number;
  trimester: 1 | 2 | 3;
}

export function WeekHero({ week, trimester }: Props) {
  return (
    <section className="mb-6">
      <p className="text-sm font-medium text-brand">
        임신 {trimester}기 · {week}주차
      </p>
      <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
        임신 {week}주 가이드
      </h1>
      <p className="mt-2 text-neutral-600">
        임신 {week}주 태아 발달, 엄마 몸의 변화, 이 시기에 챙겨볼 검사와
        정부 지원 정보를 한눈에 정리했습니다.
      </p>
    </section>
  );
}
