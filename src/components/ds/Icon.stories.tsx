import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Icon, { ICON_NAMES, type IconName } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Design System/Icon",
  component: Icon,
  argTypes: {
    name:        { control: "select", options: ICON_NAMES },
    size:        { control: "select", options: ["sm", "md", "lg", "xl"] },
    mode:        { control: "select", options: ["stroke", "fill"] },
    strokeWidth: { control: { type: "range", min: 1, max: 3, step: 0.5 } },
    color:       { control: "color" },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  args: {
    name: "sparkles",
    size: "xl",
    mode: "stroke",
    strokeWidth: 2,
    color: "#13ec5b",
  },
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex items-end gap-6">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon name="sparkles" size={size} color="#13ec5b" />
          <span className="text-xs text-[#8aaa8a]">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllIcons: Story = {
  name: "All Icons",
  render: () => (
    <div className="grid grid-cols-8 gap-4">
      {ICON_NAMES.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-[rgba(19,236,91,0.06)] transition-colors"
        >
          <Icon name={name} size="md" color="#1a2e1a" strokeWidth={1.5} />
          <span className="text-[10px] text-[#8aaa8a] text-center leading-tight">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const ElementIcons: Story = {
  name: "Five Elements",
  render: () => {
    const elements: { name: IconName; label: string; color: string }[] = [
      { name: "wood",  label: "목 (木) 나무", color: "#22c55e" },
      { name: "fire",  label: "화 (火) 불",   color: "#ef4444" },
      { name: "earth", label: "토 (土) 땅",   color: "#eab308" },
      { name: "metal", label: "금 (金) 쇠",   color: "#a1a1aa" },
      { name: "water", label: "수 (水) 물",   color: "#3b82f6" },
    ];
    return (
      <div className="flex gap-8">
        {elements.map(({ name, label, color }) => (
          <div key={name} className="flex flex-col items-center gap-3">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: `${color}18`, border: `1px solid ${color}40` }}
            >
              <Icon name={name} size="lg" color={color} strokeWidth={1.5} />
            </div>
            <span className="text-xs text-[#4a664a] font-medium">{label}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const StrokeVsFill: Story = {
  name: "Stroke vs Fill",
  render: () => {
    const icons: IconName[] = ["star", "heart", "sparkles", "fire", "water"];
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="text-xs font-bold text-[#8aaa8a] w-12">stroke</span>
          {icons.map((name) => (
            <Icon key={name} name={name} size="lg" mode="stroke" color="#13ec5b" />
          ))}
        </div>
        <div className="flex items-center gap-6">
          <span className="text-xs font-bold text-[#8aaa8a] w-12">fill</span>
          {icons.map((name) => (
            <Icon key={name} name={name} size="lg" mode="fill" color="#13ec5b" />
          ))}
        </div>
      </div>
    );
  },
};

export const InContext: Story = {
  name: "In Context — Status Icons",
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      {[
        { name: "success" as const, color: "#22c55e", bg: "rgba(34,197,94,0.08)", text: "분석이 완료되었습니다." },
        { name: "info"    as const, color: "#3b82f6", bg: "rgba(59,130,246,0.08)", text: "잠시 후 다시 시도해주세요." },
        { name: "warning" as const, color: "#eab308", bg: "rgba(234,179,8,0.08)",  text: "이미지 품질을 확인해주세요." },
        { name: "error"   as const, color: "#ef4444", bg: "rgba(239,68,68,0.08)",  text: "분석에 실패했습니다." },
      ].map(({ name, color, bg, text }) => (
        <div
          key={name}
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: bg, border: `1px solid ${color}30` }}
        >
          <Icon name={name} size="md" color={color} />
          <span className="text-sm text-[#1a2e1a]">{text}</span>
        </div>
      ))}
    </div>
  ),
};
