import type { BoxId } from "@/lib/conditional-boxes";
import { BOX_CONTENT } from "./box-content";
import { ScreeningGuideBox } from "./ScreeningGuideBox";
import { FetalInsuranceBox } from "./FetalInsuranceBox";

interface Props {
  boxes: BoxId[];
}

// 활성화된 조건부 박스들 렌더링
export function ConditionalBoxRenderer({ boxes }: Props) {
  return (
    <>
      {boxes.map((id) => {
        if (id === "fetal_insurance_guide") {
          return <FetalInsuranceBox key={id} />;
        }
        const content = BOX_CONTENT[id];
        return (
          <ScreeningGuideBox
            key={id}
            title={content.title}
            body={content.body}
            citation={content.citation}
          />
        );
      })}
    </>
  );
}
