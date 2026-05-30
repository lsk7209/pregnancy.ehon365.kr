// 품질 게이트 v2 (핸드오프 §8) — 정규식·규칙 기반 1차 검증
export interface PageMeta {
  type: "layer1" | "layer2";
  week?: number;
  faqCount: number;
  activeBoxCount: number;
  isCpaWindow: boolean;
  internalLinkCount: number;
}

export interface GateItem {
  id: string;
  result: "PASS" | "FAIL" | "WARN";
  evidence: string;
}

export interface GateResult {
  gates: GateItem[];
  overall: "PASS" | "FAIL";
  failReasons: string[];
}

// 금지 표현 패턴
const PROMOTION_PATTERN = /추천|비교|TOP|BEST|순위|가성비/i;
const FEAR_PATTERN = /위험합니다|큰일\s?납니다|위험해|심각합니다/;
const MEDICAL_ORDER_PATTERN = /하세요(?![^.]*상담)/; // 단순 휴리스틱
const SOLICIT_PATTERN = /많은\s?예비맘들이\s?가입|가입하세요|꼭\s?가입/;

function gate(
  id: string,
  pass: boolean,
  evidence: string,
  warn = false,
): GateItem {
  return { id, result: pass ? "PASS" : warn ? "WARN" : "FAIL", evidence };
}

// 의학 단락(출처 표기 대상) 추정: "(출처:" 가 등장하는 단락 수
function citationCount(text: string): number {
  return (text.match(/\(출처:/g) ?? []).length;
}

function aiCommentaryLength(text: string): number {
  // 마크다운 기호·공백 제거 후 본문 길이 근사
  return text.replace(/[#*_>\-\s]/g, "").length;
}

export function runQualityGate(
  pageContent: string,
  meta: PageMeta,
): GateResult {
  const gates: GateItem[] = [];

  // 공통 게이트 C1~C7
  const bodyLen = aiCommentaryLength(pageContent);
  gates.push(gate("C1", bodyLen >= 200, `본문 길이 ${bodyLen}자`));
  gates.push(gate("C2", meta.faqCount >= 3, `FAQ ${meta.faqCount}개`));
  gates.push(
    gate(
      "C3",
      meta.activeBoxCount >= 1,
      `조건부 섹션 ${meta.activeBoxCount}개 활성화`,
    ),
  );
  gates.push(
    gate(
      "C4",
      citationCount(pageContent) >= 1,
      `출처 표기 ${citationCount(pageContent)}건`,
    ),
  );
  gates.push(
    gate(
      "C5",
      !MEDICAL_ORDER_PATTERN.test(pageContent),
      "의학적 처방 권유 미검출",
    ),
  );
  gates.push(
    gate("C6", citationCount(pageContent) >= 1, "의학 단락 출처 표기 존재"),
  );
  gates.push(
    gate("C7", !FEAR_PATTERN.test(pageContent), "공포·불안 표현 미검출"),
  );

  // 권유·추천 어휘 (C4 보강)
  gates.push(
    gate("C4b", !PROMOTION_PATTERN.test(pageContent), "추천·비교 어휘 미검출"),
  );

  // Layer 2 전용 게이트
  if (meta.type === "layer2") {
    gates.push(
      gate("L2-1", meta.activeBoxCount >= 1, "DB 매칭 결과 페이지별 차이 존재"),
    );
    gates.push(
      gate("L2-2", citationCount(pageContent) >= 1, "출처 활용 정확도 확인"),
    );
    if (meta.isCpaWindow) {
      gates.push(
        gate(
          "L2-3",
          !SOLICIT_PATTERN.test(pageContent),
          "CPA 박스 권유 인상 표현 미검출",
        ),
      );
    }
    gates.push(
      gate(
        "L2-4",
        meta.internalLinkCount >= 2,
        `내부 링크 ${meta.internalLinkCount}개`,
      ),
    );
  }

  const failReasons = gates
    .filter((g) => g.result === "FAIL")
    .map((g) => `${g.id}: ${g.evidence}`);

  return {
    gates,
    overall: failReasons.length === 0 ? "PASS" : "FAIL",
    failReasons,
  };
}
