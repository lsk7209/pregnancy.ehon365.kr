interface Props {
  size: { fruit: string; lengthCm: string; weightG: string };
  dDay: number;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-brand-soft/50 px-4 py-3 text-center">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="mt-1 text-base font-bold text-ink">{value}</p>
    </div>
  );
}

export function WeekOverview({ size, dDay }: Props) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-bold text-ink">이번 주 한눈에 보기</h2>
      <div className="grid grid-cols-3 gap-3">
        <Stat label="크기 비유" value={size.fruit} />
        <Stat
          label="키·무게"
          value={`약 ${size.lengthCm}cm · ${size.weightG}g`}
        />
        <Stat label="출산까지" value={`D-${dDay}`} />
      </div>
    </section>
  );
}
