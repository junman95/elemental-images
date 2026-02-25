import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DsSection from "./DsSection";
import DsButton from "./DsButton";
import ElementTag from "./ElementTag";

const meta: Meta<typeof DsSection> = {
  title: "Design System/Section",
  component: DsSection,
  argTypes: {
    size:    { control: "select", options: ["sm", "md", "lg", "xl"] },
    variant: { control: "select", options: ["default", "glass", "surface", "primary"] },
    divider: { control: "boolean" },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof DsSection>;

const SampleContent = () => (
  <div className="space-y-3">
    <div className="flex gap-2">
      <ElementTag element="wood" />
      <ElementTag element="fire" />
      <ElementTag element="water" />
    </div>
    <p className="text-sm text-[#4a664a]">
      목(木) 기운이 강하게 나타나는 얼굴형으로, 창의력과 추진력이 뛰어납니다.
    </p>
  </div>
);

export const Playground: Story = {
  args: {
    size:        "md",
    variant:     "glass",
    divider:     true,
    eyebrow:     "오행 분석",
    title:       "분석 결과",
    description: "AI가 판단한 오행 에너지 분포",
    headerAction: <DsButton variant="ghost" size="sm">상세보기</DsButton>,
    children:    <SampleContent />,
  },
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(["default", "glass", "surface", "primary"] as const).map((variant) => (
        <DsSection
          key={variant}
          variant={variant}
          size="md"
          eyebrow="오행"
          title={`${variant} 섹션`}
          description="분석 내용이 이곳에 표시됩니다."
          divider
        >
          <SampleContent />
        </DsSection>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="space-y-4">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <DsSection
          key={size}
          variant="glass"
          size={size}
          eyebrow="오행 분석"
          title={`${size.toUpperCase()} 섹션`}
          description="오행 분석 결과를 보여주는 섹션입니다."
          divider
        >
          <p className="text-[#4a664a] text-sm">섹션 컨텐츠 영역</p>
        </DsSection>
      ))}
    </div>
  ),
};

export const WithAction: Story = {
  name: "With Header Action",
  render: () => (
    <DsSection
      variant="glass"
      size="md"
      title="오행 에너지 분포"
      description="얼굴의 각 부위별 에너지 강도"
      divider
      headerAction={
        <div className="flex gap-2">
          <DsButton variant="ghost" size="sm">자세히</DsButton>
          <DsButton variant="primary" size="sm">저장</DsButton>
        </div>
      }
    >
      <SampleContent />
    </DsSection>
  ),
};
