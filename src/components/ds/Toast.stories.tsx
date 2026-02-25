import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Toaster, { toast, type ToastPosition, type ToastVariant } from "./Toast";
import DsButton from "./DsButton";

const meta: Meta<typeof Toaster> = {
  title: "Design System/Toast",
  component: Toaster,
  decorators: [
    (Story) => (
      <div id="toast-root" className="relative min-h-[300px] flex flex-col items-center justify-center gap-4">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Toaster>;

export const Playground: Story = {
  args: { to: "#toast-root" },
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className="flex flex-wrap gap-3 justify-center">
        <DsButton
          variant="primary"
          size="md"
          onClick={() => toast("오행 분석이 완료되었습니다.", { variant: "success" })}
        >
          Success Toast
        </DsButton>
        <DsButton
          variant="outline"
          size="md"
          onClick={() => toast("잠시 후 다시 시도해주세요.", { variant: "error" })}
        >
          Error Toast
        </DsButton>
        <DsButton
          variant="ghost"
          size="md"
          onClick={() => toast("이미지 품질을 확인해주세요.", { variant: "warning" })}
        >
          Warning Toast
        </DsButton>
      </div>
    </>
  ),
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => {
    const variants: ToastVariant[] = ["default", "success", "error", "warning", "info"];
    return (
      <>
        <Toaster to="#toast-root" />
        <div className="flex flex-wrap gap-2 justify-center">
          {variants.map((v) => (
            <DsButton
              key={v}
              variant="outline"
              size="sm"
              onClick={() =>
                toast(`${v} 토스트 메시지입니다.`, {
                  variant: v,
                  description: "부가 설명이 여기 표시됩니다.",
                  position: "top-center",
                })
              }
            >
              {v}
            </DsButton>
          ))}
        </div>
      </>
    );
  },
};

export const AllPositions: Story = {
  name: "All Positions",
  render: () => {
    const positions: ToastPosition[] = [
      "top-left", "top-center", "top-right",
      "bottom-left", "bottom-center", "bottom-right",
    ];
    return (
      <>
        <Toaster />
        <div className="grid grid-cols-3 gap-2">
          {positions.map((pos) => (
            <DsButton
              key={pos}
              variant="ghost"
              size="sm"
              onClick={() =>
                toast(pos, { position: pos, variant: "info", duration: 2000 })
              }
            >
              {pos}
            </DsButton>
          ))}
        </div>
      </>
    );
  },
};

export const WithAction: Story = {
  name: "With Action Button",
  render: () => (
    <>
      <Toaster to="#toast-root" />
      <DsButton
        variant="primary"
        size="md"
        onClick={() =>
          toast("분석 결과가 저장되었습니다.", {
            variant: "success",
            description: "링크를 공유할 수 있습니다.",
            position: "top-center",
            duration: 6000,
            action: {
              label: "공유하기",
              onClick: () => alert("공유!"),
            },
          })
        }
      >
        저장 완료 토스트
      </DsButton>
    </>
  ),
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <>
      <Toaster to="#toast-root" />
      <div className="flex flex-wrap gap-2 justify-center">
        {(["sm", "md", "lg", "xl"] as const).map((size) => (
          <DsButton
            key={size}
            variant="outline"
            size="sm"
            onClick={() =>
              toast(`${size.toUpperCase()} 사이즈 토스트`, {
                size,
                variant: "success",
                position: "top-center",
              })
            }
          >
            {size}
          </DsButton>
        ))}
      </div>
    </>
  ),
};

export const Persistent: Story = {
  name: "Persistent (no auto-dismiss)",
  render: () => (
    <>
      <Toaster to="#toast-root" />
      <DsButton
        variant="gold"
        size="md"
        onClick={() =>
          toast("직접 닫기 버튼을 누르세요.", {
            variant: "info",
            duration: 0,
            position: "top-center",
            description: "이 토스트는 자동으로 닫히지 않습니다.",
          })
        }
      >
        영구 토스트
      </DsButton>
    </>
  ),
};
