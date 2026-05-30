// 경량 마크다운 렌더러 — 단락(빈 줄 구분)과 H3만 처리
// AI 섹션 출력은 단락 + (출처:) 형식이므로 충분
interface Props {
  text: string;
}

export function Markdown({ text }: Props) {
  const blocks = text.split(/\n{2,}/).filter((b) => b.trim());
  return (
    <div className="prose-week">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("### ")) {
          return <h3 key={i}>{trimmed.replace(/^###\s+/, "")}</h3>;
        }
        return <p key={i}>{trimmed}</p>;
      })}
    </div>
  );
}
