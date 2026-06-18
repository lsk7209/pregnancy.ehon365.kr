import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { ComplianceFooter } from "@/components/layout/ComplianceFooter";
import {
  ADSENSE_PUB_ID,
  GA4_ID,
  NAVER_VERIFICATION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | 주차별 가이드·검사·정부지원`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "임신 주차별 태아 발달, 산모 몸의 변화, 산전검사 일정, 정부지원 정보를 한눈에 안내하는 임신·출산 준비 가이드입니다.",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    url: SITE_URL,
  },
  verification: {
    other: { "naver-site-verification": NAVER_VERIFICATION },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  return (
    <html lang="ko">
      <head>
        <script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
        <ComplianceFooter />
        {GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-config" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
        {ADSENSE_PUB_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
