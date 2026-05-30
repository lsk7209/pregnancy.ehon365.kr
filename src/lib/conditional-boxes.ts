// 조건부 박스 활성화 룰 (핸드오프 §5.3)
export type BoxId =
  | "first_trimester_screening"
  | "second_trimester_screening"
  | "fetal_insurance_guide"
  | "detailed_ultrasound"
  | "gestational_diabetes"
  | "free_screening_round"
  | "birth_preparation_extended"
  | "newborn_supplies"
  | "postpartum_care_booking";

export interface ConditionalBox {
  id: BoxId;
  when: (week: number) => boolean;
}

export const conditionalBoxes: ConditionalBox[] = [
  { id: "first_trimester_screening", when: (w) => w >= 11 && w <= 13 },
  { id: "second_trimester_screening", when: (w) => w >= 15 && w <= 20 },
  { id: "fetal_insurance_guide", when: (w) => w >= 16 && w <= 22 }, // CPA 진입
  { id: "detailed_ultrasound", when: (w) => w >= 20 && w <= 24 },
  { id: "gestational_diabetes", when: (w) => w >= 24 && w <= 28 },
  { id: "free_screening_round", when: (w) => [12, 24, 36].includes(w) },
  { id: "birth_preparation_extended", when: (w) => w >= 28 },
  { id: "newborn_supplies", when: (w) => w >= 32 },
  { id: "postpartum_care_booking", when: (w) => w >= 36 },
];

export function activeBoxes(week: number): BoxId[] {
  return conditionalBoxes.filter((b) => b.when(week)).map((b) => b.id);
}

export function isCpaWindow(week: number): boolean {
  return week >= 16 && week <= 22;
}
