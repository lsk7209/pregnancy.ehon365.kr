export function trimesterOf(week: number): 1 | 2 | 3 {
  if (week <= 13) return 1;
  if (week <= 27) return 2;
  return 3;
}

export function dDayOf(week: number): number {
  return Math.max(0, (40 - week) * 7);
}

export const CORE_WEEKS = [4, 8, 12, 16, 18, 20, 24, 28, 32, 36, 40];

export const MIN_WEEK = 4;
export const MAX_WEEK = 40;

export function isValidWeek(week: number): boolean {
  return Number.isInteger(week) && week >= MIN_WEEK && week <= MAX_WEEK;
}

interface WeekSize {
  fruit: string;
  lengthCm: string;
  weightG: string;
}

const WEEK_SIZE: Record<number, WeekSize> = {
  4: { fruit: "양귀비씨", lengthCm: "0.1", weightG: "1 미만" },
  8: { fruit: "강낭콩", lengthCm: "1.6", weightG: "1" },
  12: { fruit: "라임", lengthCm: "5.4", weightG: "14" },
  16: { fruit: "아보카도", lengthCm: "11.6", weightG: "100" },
  18: { fruit: "고구마", lengthCm: "14.2", weightG: "190" },
  20: { fruit: "바나나", lengthCm: "16.4", weightG: "300" },
  24: { fruit: "옥수수", lengthCm: "30", weightG: "600" },
  28: { fruit: "가지", lengthCm: "37", weightG: "1000" },
  32: { fruit: "호박", lengthCm: "42", weightG: "1700" },
  36: { fruit: "파파야", lengthCm: "47", weightG: "2600" },
  40: { fruit: "작은 수박", lengthCm: "51", weightG: "3400" },
};

export function weekSize(week: number): WeekSize {
  if (WEEK_SIZE[week]) return WEEK_SIZE[week];
  const nearest = CORE_WEEKS.reduce((prev, cur) =>
    Math.abs(cur - week) < Math.abs(prev - week) ? cur : prev,
  );
  return WEEK_SIZE[nearest];
}
