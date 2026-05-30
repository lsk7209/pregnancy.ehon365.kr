import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="shrink-0 text-lg font-bold text-brand">
          임신·출산 준비 가이드
        </Link>
        <nav className="flex flex-wrap justify-end gap-x-4 gap-y-2 text-sm text-neutral-600">
          <Link href="/pregnancy/18" className="hover:text-brand">
            주차별 가이드
          </Link>
          <Link href="/blog" className="hover:text-brand">
            블로그
          </Link>
          <Link href="/fetal-insurance" className="hover:text-brand">
            태아보험 가이드
          </Link>
        </nav>
      </div>
    </header>
  );
}
