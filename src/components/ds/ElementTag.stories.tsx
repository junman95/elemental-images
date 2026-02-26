import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ElementTag, { ElementTagRow } from "./ElementTag";
import type { ElementType } from "@/types/elements";

const meta: Meta<typeof ElementTag> = {
  title: "Design System/ElementTag",
  component: ElementTag,
  argTypes: {
    element: {
      control: "select",
      options: ["wood", "fire", "earth", "metal", "water"] satisfies ElementType[],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    showHanja: { control: "boolean" },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ElementTag>;

export const Playground: Story = {
  args: {
    element: "wood",
    size: "md",
    showHanja: true,
  },
};

/** 5개 오행 전체 */
export const AllElements: Story = {
  name: "All Elements",
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      {(["wood", "fire", "earth", "metal", "water"] as ElementType[]).map((el) => (
        <ElementTag key={el} element={el} size="md" />
      ))}
    </div>
  ),
};

/** 크기별 */
export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-[#8aaa8a] font-mono">{size}</span>
          <ElementTag element="fire" size={size} />
        </div>
      ))}
    </div>
  ),
};

/** 한자 없는 버전 */
export const WithoutHanja: Story = {
  name: "Without Hanja",
  render: () => (
    <div className="flex gap-3 flex-wrap">
      {(["wood", "fire", "earth", "metal", "water"] as ElementType[]).map((el) => (
        <ElementTag key={el} element={el} showHanja={false} />
      ))}
    </div>
  ),
};

/** 한 줄 Row 컴포넌트 */
export const Row: StoryObj<typeof ElementTagRow> = {
  name: "ElementTagRow",
  render: () => <ElementTagRow />,
};
