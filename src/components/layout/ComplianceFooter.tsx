import Link from "next/link";

export function ComplianceFooter() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-neutral-500">
        <nav className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/" className="hover:text-brand">
            홈
          </Link>
          <Link href="/about" className="hover:text-brand">
            사이트 소개
          </Link>
          <Link href="/privacy" className="hover:text-brand">
            개인정보처리방침
          </Link>
          <Link href="/terms" className="hover:text-brand">
            이용약관
          </Link>
        </nav>
        <div className="space-y-1 leading-relaxed">
          <p>
            본 사이트는 보험을 모집·중개하지 않으며, 상담과 등록은 광고주 또는
            보험대리점에서 진행됩니다.
          </p>
          <p>
            일부 링크에는 광고/제휴 수익이 발생할 수 있습니다. (표시광고법
            고지)
          </p>
          <p className="pt-2">
            본 페이지는 일반 정보 제공 목적이며 의학적 판단·진단·치료를
            대체하지 않습니다. 의료 결정은 반드시 의료기관과 상담해 주세요.
          </p>
          <p className="pt-3 text-neutral-400">
            © {new Date().getFullYear()} 임신·출산 준비 가이드
          </p>
        </div>
      </div>
    </footer>
  );
}
