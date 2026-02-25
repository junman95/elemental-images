import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import CollapsableSection from "./CollapsableSection";
import ElementTag from "./ElementTag";

const meta: Meta<typeof CollapsableSection> = {
  title: "Design System/CollapsableSection",
  component: CollapsableSection,
  argTypes: {
    size:        { control: "select", options: ["sm", "md", "lg", "xl"] },
    variant:     { control: "select", options: ["default", "glass", "surface", "primary"] },
    defaultOpen: { control: "boolean" },
    divider:     { control: "boolean" },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof CollapsableSection>;

const AnalysisContent = () => (
  <div className="space-y-3 pt-1">
    <div className="flex gap-2 flex-wrap">
      <ElementTag element="wood" />
      <ElementTag element="fire" />
      <ElementTag element="water" />
    </div>
    <p className="text-sm text-[#4a664a] leading-relaxed">
      목(木) 기운이 강하게 나타나는 얼굴형으로, 창의력과 추진력이 뛰어납니다.
      이마가 넓고 눈빛이 뚜렷하여 리더십과 실행력이 돋보입니다.
    </p>
    <div className="grid grid-cols-5 gap-2">
      {(["wood","fire","earth","metal","water"] as const).map((el, i) => (
        <div key={el} className="flex flex-col items-center gap-1">
          <div
            className="w-full rounded-full"
            style={{
              height: `${[72, 48, 60, 36, 55][i]}px`,
              background: ["#22c55e","#ef4444","#eab308","#a1a1aa","#3b82f6"][i],
              opacity: 0.7,
            }}
          />
          <ElementTag element={el} size="xs" showHanja={false} />
        </div>
      ))}
    </div>
  </div>
);

export const Playground: Story = {
  args: {
    size:        "md",
    variant:     "glass",
    defaultOpen: true,
    divider:     true,
    eyebrow:     "오행 분석",
    title:       "상세 분석 결과",
    description: "AI가 판단한 오행 에너지",
    children:    <AnalysisContent />,
  },
};

export const DefaultClosed: Story = {
  name: "Default Closed",
  args: {
    size:        "md",
    variant:     "glass",
    defaultOpen: false,
    divider:     true,
    title:       "접힌 상태로 시작",
    description: "클릭해서 펼쳐보세요",
    children:    <AnalysisContent />,
  },
};

export const MultipleAccordion: Story = {
  name: "Multiple — Accordion Style",
  render: () => {
    const sections = [
      { title: "목(木) — 창의력", desc: "이마와 눈의 기운 분석" },
      { title: "화(火) — 열정",   desc: "코와 입술의 기운 분석" },
      { title: "수(水) — 지혜",   desc: "눈썹과 귀의 기운 분석" },
    ];
    return (
      <div className="space-y-3 w-full max-w-lg">
        {sections.map((s, i) => (
          <CollapsableSection
            key={i}
            variant="glass"
            size="md"
            title={s.title}
            description={s.desc}
            defaultOpen={i === 0}
            divider
          >
            <AnalysisContent />
          </CollapsableSection>
        ))}
      </div>
    );
  },
};

export const Controlled: Story = {
  name: "Controlled Open State",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <div className="space-y-3">
        <div className="flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1 text-xs bg-[#13ec5b]/20 text-[#0db849] rounded-full"
          >
            열기
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-1 text-xs bg-[rgba(26,46,26,0.07)] text-[#4a664a] rounded-full"
          >
            닫기
          </button>
        </div>
        <CollapsableSection
          variant="glass"
          size="md"
          title="외부 제어 모드"
          open={open}
          onOpenChange={setOpen}
          divider
        >
          <AnalysisContent />
        </CollapsableSection>
      </div>
    );
  },
};
