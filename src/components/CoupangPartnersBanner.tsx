const DASHBOARD_BASE = "https://multi-dashboard-one.vercel.app";
const SITE_URL = "https://pregnancy.ehon365.kr/";
const SITE_KEY = "pregnancy-ehon365";
const SLOT_KEY = "coupang-inline";
const DISCLOSURE =
  "\uc774 \uac8c\uc2dc\ubb3c\uc740 \ucfe0\ud321 \ud30c\ud2b8\ub108\uc2a4 \ud65c\ub3d9\uc758 \uc77c\ud658\uc73c\ub85c, \uc774\uc5d0 \ub530\ub978 \uc77c\uc815\uc561\uc758 \uc218\uc218\ub8cc\ub97c \uc81c\uacf5\ubc1b\uc2b5\ub2c8\ub2e4.";

export function CoupangPartnersBanner() {
  const params = new URLSearchParams({
    siteKey: SITE_KEY,
    slotKey: SLOT_KEY,
    purpose: "public",
    pageUrl: SITE_URL,
  });
  const query = params.toString();

  return (
    <div data-banner-measurement data-banner-measurement-base={DASHBOARD_BASE} data-banner-site-key={SITE_KEY} data-banner-slot-key={SLOT_KEY}>
    <aside
      className="mx-auto my-6 max-w-3xl px-4"
      data-codex-coupang-banner="1"
      aria-label="Coupang Partners"
    >
      <a
        className="flex min-h-[92px] items-center justify-center gap-3 rounded-lg border border-pink-200 bg-pink-50 p-3 text-ink no-underline"
        href={`${DASHBOARD_BASE}/api/banner-management/click?${query}`}
        rel="sponsored nofollow noopener noreferrer"
        target="_blank"
      >
        <span className="text-xs font-bold text-pink-700">광고</span>
        <img
          alt="쿠팡에서 임산부 용품 추천 상품 보기"
          className="block h-auto max-w-full rounded-md"
          height="90"
          loading="lazy"
          src={`${DASHBOARD_BASE}/api/banner-management/image?${query}`}
          width="728"
        />
      </a>
      <p className="mt-2 text-xs leading-5 text-neutral-500">{DISCLOSURE}</p>
    </aside>
      <script src={`${DASHBOARD_BASE}/banner-measurement.js`} defer />
    </div>
  );
}
