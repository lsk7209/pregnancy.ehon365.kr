import { Section } from "./Section";

export function ScreeningGuide({ content }: { content: string }) {
  return <Section title="이번 주 챙겨볼 검사" content={content} />;
}
