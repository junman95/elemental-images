import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LoadingSpinner from "./LoadingSpinner";

const meta: Meta<typeof LoadingSpinner> = {
  title: "Design System/LoadingSpinner",
  component: LoadingSpinner,
  argTypes: {
    size:  { control: "select", options: ["sm", "md", "lg", "xl"] },
    color: { control: "select", options: ["primary", "gold", "muted", "white"] },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Playground: Story = {
  args: { size: "md", color: "primary" },
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex items-end gap-8">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-3">
          <LoadingSpinner size={size} color="primary" />
          <span className="text-xs text-[#8aaa8a]">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllColors: Story = {
  name: "All Colors",
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="lg" color="primary" />
        <span className="text-xs text-[#8aaa8a]">primary</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="lg" color="gold" />
        <span className="text-xs text-[#8aaa8a]">gold</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="lg" color="muted" />
        <span className="text-xs text-[#8aaa8a]">muted</span>
      </div>
      <div className="flex flex-col items-center gap-3 bg-[#1a2e1a] rounded-xl p-4">
        <LoadingSpinner size="lg" color="white" />
        <span className="text-xs text-white/60">white</span>
      </div>
    </div>
  ),
};

export const InContext: Story = {
  name: "In Context — Loading Screen",
  render: () => (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <LoadingSpinner size="xl" color="primary" />
      <p className="text-sm text-[#4a664a] font-medium animate-pulse">
        오행 분석 중...
      </p>
    </div>
  ),
};

export const InButton: Story = {
  name: "In Context — Loading Button",
  render: () => (
    <button
      className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#13ec5b] text-[#102216] font-bold rounded-full text-sm"
      disabled
    >
      <LoadingSpinner size="sm" color="muted" />
      분석 중...
    </button>
  ),
};
