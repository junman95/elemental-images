import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "./IconButton";
import {
  X, Check, Search, Share2, Camera, RotateCcw,
  ChevronLeft, ChevronRight, Plus, Star, Heart,
} from "lucide-react";

const meta: Meta<typeof IconButton> = {
  title: "Design System/IconButton",
  component: IconButton,
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost", "outline", "gold"] },
    size:    { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {
  args: {
    variant: "primary",
    size: "md",
    "aria-label": "공유",
    children: <Share2 />,
  },
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton variant="primary"   size="md" aria-label="primary">   <Star />       </IconButton>
      <IconButton variant="secondary" size="md" aria-label="secondary"> <Heart />      </IconButton>
      <IconButton variant="ghost"     size="md" aria-label="ghost">     <Search />     </IconButton>
      <IconButton variant="outline"   size="md" aria-label="outline">   <Share2 />     </IconButton>
      <IconButton variant="gold"      size="md" aria-label="gold">      <Star />       </IconButton>
    </div>
  ),
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex items-end gap-4">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <IconButton size={size} variant="ghost" aria-label={size}>
            <Camera />
          </IconButton>
          <span className="text-xs text-[#8aaa8a]">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const InContext: Story = {
  name: "In Context — Navigation Bar",
  render: () => (
    <div className="flex items-center justify-between w-full max-w-md px-4 py-2 bg-white rounded-xl border border-[rgba(26,46,26,0.08)] shadow-sm">
      <IconButton variant="ghost" size="md" aria-label="뒤로">
        <ChevronLeft />
      </IconButton>
      <span className="text-sm font-bold text-[#1a2e1a]">분석 결과</span>
      <div className="flex gap-1">
        <IconButton variant="ghost"   size="md" aria-label="공유"><Share2 /></IconButton>
        <IconButton variant="ghost"   size="md" aria-label="닫기"><X /></IconButton>
      </div>
    </div>
  ),
};

export const ActionRow: Story = {
  name: "Action Row",
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton variant="primary"   size="lg" aria-label="카메라"><Camera /></IconButton>
      <IconButton variant="secondary" size="lg" aria-label="반복"><RotateCcw /></IconButton>
      <IconButton variant="gold"      size="lg" aria-label="별표"><Star /></IconButton>
      <IconButton variant="outline"   size="lg" aria-label="추가"><Plus /></IconButton>
      <IconButton variant="ghost"     size="lg" aria-label="확인"><Check /></IconButton>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton variant="primary" size="md" aria-label="비활성" disabled><Star /></IconButton>
      <IconButton variant="ghost"   size="md" aria-label="비활성" disabled><ChevronRight /></IconButton>
    </div>
  ),
};
