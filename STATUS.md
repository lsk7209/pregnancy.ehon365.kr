# Status | 마지막 업데이트 2026-05-30

## 현재 작업
Phase 1 기본 앱 라우트와 로컬 DB 시드까지 연결 완료.

## 완료
- Next.js 15 + Drizzle + 로컬 SQLite 구조 확인
- 홈페이지 구현: `/`
- 주차별 가이드 구현: `/pregnancy/[week]`
- 태아보험 일반 가이드 구현: `/fetal-insurance`
- CPA 리다이렉트 구현: `/go/[offerId]`
- 필수 안내 페이지 구현: `/about`, `/privacy`, `/terms`
- SEO 파일 구현: `/sitemap.xml`, `/robots.txt`, `/llms.txt`
- 화면 노출용 한국어 텍스트와 주요 시드 데이터 정리
- 정적 빌드 중 Gemini 호출 비활성화 기본값 적용
- `npm run db:seed` 완료
- `npm run build` 통과
- 블로그 메뉴 추가
- `/blog` 카드형 목록과 `/blog/[slug]` 글 상세/목차 구현
- 사이트 페르소나 설정: `site-config/site-persona.yaml`
- GA4/AdSense/JSON-LD/ads.txt/IndexNow/GSC sitemap 제출 기반 추가
- Turso 원격 DB 스키마 확인 및 시드 주입 완료

## 남은 TODO
- 디자인 디테일/모바일 QA 보강
- 더 많은 주차별 RAG 발췌 데이터 추가
- 지역별 지원금 Layer 1 페이지 확장
- 실제 CPA 네트워크 랜딩 URL 교체
- Gemini 키 갱신 후 `ENABLE_AI_BUILD=true` 기반 콘텐츠 생성 검증
- GSC 서비스 계정에 `sc-domain:pregnancy.ehon365.kr` 권한 추가 필요
- 실제 GA4 측정 ID 확인 후 `NEXT_PUBLIC_GA4_ID` 교체 필요

## 주의
- 현재 폴더는 Git 저장소가 아니므로 diff/commit 추적은 사용할 수 없음.
- 프로덕션 빌드에서는 `ENABLE_AI_BUILD=true`가 없으면 외부 AI 호출을 하지 않음.
- 의료/보험 관련 문구는 일반 정보와 광고 고지를 유지해야 함.
