import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DsCard, { DsCardSection } from "./DsCard";
import { CardTitle, Body, Muted, Eyebrow } from "./Typography";
import DsButton from "./DsButton";
import ElementTag from "./ElementTag";

const meta: Meta<typeof DsCard> = {
  title: "Design System/Card",
  component: DsCard,
  argTypes: {
    variant: {
      control: "select",
      options: ["glass", "glass-subtle", "glass-primary", "surface", "featured"],
    },
    hover: { control: "boolean" },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof DsCard>;

const SampleContent = () => (
  <>
    <Eyebrow>목(木) 유형</Eyebrow>
    <CardTitle className="mt-2">Master Haneul</CardTitle>
    <Body className="mt-2 text-[#4a664a]">
      나무처럼 곧고 길게 뻗는 형상을 지니며, 진취적이고 창의적인 기운을 품고 있습니다.
    </Body>
    <DsCardSection>
      <div className="flex items-center justify-between">
        <ElementTag element="wood" size="sm" />
        <DsButton variant="secondary" size="sm">자세히 보기</DsButton>
      </div>
    </DsCardSection>
  </>
);

export const Playground: Story = {
  args: {
    variant: "glass",
    hover: true,
    className: "w-72",
  },
  render: (args) => (
    <DsCard {...args}>
      <SampleContent />
    </DsCard>
  ),
};

/** 5종 variant 비교 */
export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="grid grid-cols-2 gap-6 w-[720px]">
      {(["glass", "glass-subtle", "glass-primary", "surface", "featured"] as const).map(
        (variant) => (
          <DsCard key={variant} variant={variant} hover>
            <Muted className="text-xs mb-2 font-mono">{variant}</Muted>
            <SampleContent />
          </DsCard>
        )
      )}
    </div>
  ),
};

export const GlassCard: Story = {
  name: "Glass (기본)",
  render: () => (
    <DsCard variant="glass" hover className="w-72">
      <SampleContent />
    </DsCard>
  ),
};

export const FeaturedCard: Story = {
  name: "Featured",
  render: () => (
    <DsCard variant="featured" className="w-full max-w-lg">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full ds-glass-primary flex items-center justify-center shrink-0 text-lg">
          🌳
        </div>
        <div>
          <Eyebrow>신년 운세 상담</Eyebrow>
          <CardTitle className="mt-1">새해 오행 분석</CardTitle>
          <Muted className="mt-1">12궁을 통한 새해 오행 운세 풀이</Muted>
        </div>
        <DsButton variant="secondary" size="sm" className="ml-auto shrink-0">
          자세히
        </DsButton>
      </div>
    </DsCard>
  ),
};
