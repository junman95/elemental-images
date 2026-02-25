import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Thumbnail from "./Thumbnail";

const meta: Meta<typeof Thumbnail> = {
  title: "Design System/Thumbnail",
  component: Thumbnail,
  argTypes: {
    size:    { control: "select", options: ["sm", "md", "lg", "xl"] },
    type:    { control: "select", options: ["circle", "square"] },
    frame:   { control: "select", options: ["none", "gold", "primary", "element"] },
    element: { control: "select", options: ["wood", "fire", "earth", "metal", "water"] },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Thumbnail>;

export const Playground: Story = {
  args: {
    size:    "md",
    type:    "circle",
    frame:   "gold",
    fallback: "김",
  },
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex items-end gap-6">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Thumbnail size={size} fallback="김" frame="gold" />
          <span className="text-xs text-[#8aaa8a]">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllFrames: Story = {
  name: "All Frames",
  render: () => (
    <div className="flex items-center gap-6">
      {(["none", "gold", "primary", "element"] as const).map((frame) => (
        <div key={frame} className="flex flex-col items-center gap-2">
          <Thumbnail
            size="md"
            frame={frame}
            element="wood"
            fallback="木"
          />
          <span className="text-xs text-[#8aaa8a]">{frame}</span>
        </div>
      ))}
    </div>
  ),
};

export const ElementFrames: Story = {
  name: "Element Frames",
  render: () => (
    <div className="flex items-center gap-6">
      {(["wood", "fire", "earth", "metal", "water"] as const).map((el) => (
        <div key={el} className="flex flex-col items-center gap-2">
          <Thumbnail size="md" frame="element" element={el} fallback="相" />
          <span className="text-xs text-[#8aaa8a]">{el}</span>
        </div>
      ))}
    </div>
  ),
};

export const CircleVsSquare: Story = {
  name: "Circle vs Square",
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Thumbnail size="lg" type="circle" frame="gold" fallback="김" />
        <span className="text-xs text-[#8aaa8a]">circle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Thumbnail size="lg" type="square" frame="gold" fallback="김" />
        <span className="text-xs text-[#8aaa8a]">square</span>
      </div>
    </div>
  ),
};

export const WithImage: Story = {
  name: "With Image",
  render: () => (
    <div className="flex items-center gap-6">
      <Thumbnail
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200"
        alt="프로필"
        size="lg"
        frame="gold"
        type="circle"
      />
      <Thumbnail
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
        alt="프로필"
        size="lg"
        frame="primary"
        type="square"
      />
    </div>
  ),
};
