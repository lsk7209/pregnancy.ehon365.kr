import { Markdown } from "./Markdown";

interface Props {
  title: string;
  content: string;
}

// 마크다운 본문 섹션 공통 래퍼
export function Section({ title, content }: Props) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-bold text-ink">{title}</h2>
      <Markdown text={content} />
    </section>
  );
}
