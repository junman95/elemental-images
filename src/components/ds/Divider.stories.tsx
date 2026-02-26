import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Divider from "./Divider";
import { SectionTitle, Muted } from "./Typography";

const meta: Meta<typeof Divider> = {
  title: "Design System/Divider",
  component: Divider,
  argTypes: {
    ornament: {
      control: "select",
      options: ["diamond", "star", "dot", "none"],
    },
    color: {
      control: "select",
      options: ["gold", "primary", "subtle"],
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Playground: Story = {
  args: { ornament: "diamond", color: "gold" },
  render: (args) => (
    <div className="w-96">
      <Divider {...args} />
    </div>
  ),
};

/** 3종 색상 비교 */
export const AllColors: Story = {
  name: "All Colors",
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      {(["gold", "primary", "subtle"] as const).map((color) => (
        <div key={color} className="flex flex-col gap-2">
          <Muted className="text-xs font-mono">{color}</Muted>
          <Divider color={color} />
        </div>
      ))}
    </div>
  ),
};

/** 4종 장식 기호 */
export const AllOrnaments: Story = {
  name: "All Ornaments",
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      {(["diamond", "star", "dot", "none"] as const).map((ornament) => (
        <div key={ornament} className="flex flex-col gap-2">
          <Muted className="text-xs font-mono">{ornament}</Muted>
          <Divider ornament={ornament} color="gold" />
        </div>
      ))}
    </div>
  ),
};

/** 실제 사용 예시 — 섹션 구분 */
export const InContext: Story = {
  name: "In Context",
  render: () => (
    <div className="flex flex-col gap-6 w-96 ds-glass rounded-xl p-8">
      <SectionTitle>오행 분석 결과</SectionTitle>
      <Divider color="gold" ornament="diamond" />
      <Muted>
        당신의 오행 유형은 <strong className="text-[#1a2e1a]">목(木)형</strong>입니다.
        나무처럼 곧고 진취적인 기운을 지니고 있습니다.
      </Muted>
      <Divider color="subtle" ornament="dot" />
      <Muted>※ 본 결과는 엔터테인먼트 목적입니다.</Muted>
    </div>
  ),
};
