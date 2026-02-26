import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DsButton from "./DsButton";
import { Search, Share2, RotateCcw, Camera } from "lucide-react";

const meta: Meta<typeof DsButton> = {
  title: "Design System/Button",
  component: DsButton,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outline", "gold"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof DsButton>;

/** Controls로 props 조작 가능 */
export const Playground: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "분석 시작하기",
  },
};

/** 5종 variant 비교 */
export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <DsButton variant="primary">Primary</DsButton>
      <DsButton variant="secondary">Secondary</DsButton>
      <DsButton variant="ghost">Ghost</DsButton>
      <DsButton variant="outline">Outline</DsButton>
      <DsButton variant="gold">Gold</DsButton>
    </div>
  ),
};

/** 3종 size 비교 */
export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <DsButton size="sm">Small</DsButton>
      <DsButton size="md">Medium</DsButton>
      <DsButton size="lg">Large</DsButton>
    </div>
  ),
};

/** 아이콘 조합 */
export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <DsButton variant="primary" size="md">
        <Camera className="w-4 h-4" />
        사진 분석하기
      </DsButton>
      <DsButton variant="secondary" size="md">
        <Share2 className="w-4 h-4" />
        공유하기
      </DsButton>
      <DsButton variant="ghost" size="md">
        <RotateCcw className="w-4 h-4" />
        다시 분석
      </DsButton>
      <DsButton variant="gold" size="sm">
        <Search className="w-4 h-4" />
        검색
      </DsButton>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <DsButton variant="primary" disabled>비활성화</DsButton>
      <DsButton variant="secondary" disabled>비활성화</DsButton>
    </div>
  ),
};
