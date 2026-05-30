# pregnancy.ehon365.kr

Next.js 기반 임신·출산 준비 가이드 사이트입니다.

## 주요 기능

- 임신 주차별 가이드
- 블로그 카드형 목록과 글별 목차
- 태아보험 일반 정보 허브
- Turso/libSQL 기반 산전검사·정부지원 데이터
- sitemap, robots, llms.txt, JSON-LD, GA4, AdSense 연동 기반
- 새 콘텐츠 발행 후 GSC sitemap 제출 및 IndexNow 알림 스크립트

## 명령어

```bash
npm run dev
npm run build
npm run db:push
npm run db:seed
npm run notify:indexing -- https://pregnancy.ehon365.kr/blog
```

환경 변수는 `.env.local.example`을 기준으로 설정합니다.
