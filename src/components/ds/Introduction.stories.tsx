import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Introduction from "./Introduction";
import DsButton from "./DsButton";

const meta: Meta<typeof Introduction> = {
  title: "Design System/Introduction",
  component: Introduction,
  argTypes: {
    size:  { control: "select", options: ["sm", "md", "lg", "xl"] },
    align: { control: "select", options: ["left", "center"] },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Introduction>;

export const Playground: Story = {
  args: {
    size:        "md",
    align:       "center",
    eyebrow:     "오행 관상 분석",
    title:       "당신의 얼굴에 담긴\n오행의 기운",
    description:
      "AI가 얼굴의 이목구비를 분석하여 목·화·토·금·수 오행의 균형을 진단합니다.",
    actions: (
      <div className="flex gap-3">
        <DsButton variant="primary" size="lg">분석 시작하기</DsButton>
        <DsButton variant="outline" size="lg">더 알아보기</DsButton>
      </div>
    ),
  },
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex flex-col gap-2 divide-y divide-[rgba(26,46,26,0.06)]">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="relative">
          <span className="absolute top-2 right-0 text-xs text-[#8aaa8a] font-mono">{size}</span>
          <Introduction
            size={size}
            eyebrow="오행 관상"
            title="얼굴에 담긴 오행의 기운"
            description="AI가 얼굴을 분석하여 오행의 균형을 진단합니다."
            actions={
              <div className="flex gap-2">
                <DsButton variant="primary" size={size === "xl" ? "lg" : size}>시작하기</DsButton>
              </div>
            }
          />
        </div>
      ))}
    </div>
  ),
};

export const LeftAligned: Story = {
  name: "Left Aligned",
  args: {
    size:        "lg",
    align:       "left",
    eyebrow:     "Five Elements",
    title:       "내 얼굴이 말하는\n운명의 오행",
    description:
      "목(木)·화(火)·토(土)·금(金)·수(水) — 동양 철학이 담긴 깊은 인상 분석.",
    actions: (
      <div className="flex gap-3">
        <DsButton variant="primary" size="lg">지금 분석하기</DsButton>
        <DsButton variant="gold"    size="lg">프리미엄 보기</DsButton>
      </div>
    ),
  },
};

export const Minimal: Story = {
  name: "Minimal (Title Only)",
  args: {
    size:  "md",
    align: "center",
    title: "오행 관상 분석",
  },
};
