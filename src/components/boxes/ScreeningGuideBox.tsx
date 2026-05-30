interface Props {
  title: string;
  body: string;
  citation?: string;
}

export function ScreeningGuideBox({ title, body, citation }: Props) {
  return (
    <aside className="my-4 rounded-xl border border-brand-soft bg-brand-soft/40 p-4">
      <h3 className="mb-1 text-base font-bold text-ink">{title}</h3>
      <p className="text-sm text-neutral-700">{body}</p>
      {citation && <p className="mt-2 text-xs text-neutral-500">{citation}</p>}
    </aside>
  );
}
