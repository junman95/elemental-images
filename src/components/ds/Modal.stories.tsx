import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import Modal from "./Modal";
import DsButton from "./DsButton";
import ElementTag from "./ElementTag";
import Thumbnail from "./Thumbnail";

const meta: Meta<typeof Modal> = {
  title: "Design System/Modal",
  component: Modal,
  argTypes: {
    size:            { control: "select", options: ["sm", "md", "lg", "xl"] },
    closeOnBackdrop: { control: "boolean" },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Modal>;

// ─── Playground ───────────────────────────────────────────────────────────────
export const Playground: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <>
        <DsButton variant="primary" onClick={() => setOpen(true)}>
          모달 열기
        </DsButton>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          title="오행 분석 완료"
          description="AI가 얼굴을 분석하여 오행 에너지를 진단했습니다."
          footer={
            <>
              <DsButton variant="outline" size="md" onClick={() => setOpen(false)}>닫기</DsButton>
              <DsButton variant="primary" size="md">결과 저장</DsButton>
            </>
          }
        >
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <ElementTag element="wood" size="md" />
              <ElementTag element="fire" size="md" />
              <ElementTag element="water" size="md" />
            </div>
            <p className="text-sm text-[#4a664a] leading-relaxed">
              목(木) 기운이 강하게 나타나는 얼굴형입니다. 창의력과 추진력이 뛰어나며
              리더십과 실행력이 돋보입니다.
            </p>
          </div>
        </Modal>
      </>
    );
  },
  args: { size: "md", closeOnBackdrop: true },
};

// ─── All Sizes ────────────────────────────────────────────────────────────────
export const AllSizes: Story = {
  name: "All Sizes",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [openSize, setOpenSize] = useState<string | null>(null);
    const sizes = ["sm", "md", "lg", "xl"] as const;

    return (
      <>
        <div className="flex gap-3 flex-wrap">
          {sizes.map((s) => (
            <DsButton key={s} variant="outline" size="md" onClick={() => setOpenSize(s)}>
              {s.toUpperCase()} 모달
            </DsButton>
          ))}
        </div>
        {sizes.map((s) => (
          <Modal
            key={s}
            open={openSize === s}
            onClose={() => setOpenSize(null)}
            size={s}
            title={`${s.toUpperCase()} 크기 모달`}
            description="각 사이즈별 모달 너비를 비교해보세요."
            footer={
              <DsButton variant="primary" size="md" onClick={() => setOpenSize(null)}>
                확인
              </DsButton>
            }
          >
            <p className="text-sm text-[#4a664a]">
              이 모달은 <strong>{s}</strong> 사이즈입니다.
            </p>
          </Modal>
        ))}
      </>
    );
  },
};

// ─── With Rich Content ────────────────────────────────────────────────────────
export const WithRichContent: Story = {
  name: "With Rich Content",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <>
        <DsButton variant="primary" onClick={() => setOpen(true)}>
          상세 분석 보기
        </DsButton>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="lg"
          title="나의 오행 분석 결과"
          description="2024년 2월 25일 분석 • AI 신뢰도 94%"
          footer={
            <>
              <DsButton variant="ghost"   size="md" onClick={() => setOpen(false)}>닫기</DsButton>
              <DsButton variant="secondary" size="md">링크 복사</DsButton>
              <DsButton variant="primary"  size="md">저장하기</DsButton>
            </>
          }
        >
          <div className="space-y-5">
            {/* Profile */}
            <div className="flex items-center gap-4">
              <Thumbnail size="lg" frame="gold" fallback="김" />
              <div>
                <p className="font-bold text-[#1a2e1a]">목(木)형 얼굴</p>
                <p className="text-sm text-[#4a664a]">창의적 리더 유형</p>
                <div className="flex gap-1.5 mt-2">
                  <ElementTag element="wood" size="sm" />
                  <ElementTag element="water" size="sm" />
                </div>
              </div>
            </div>

            <div className="border-t border-[rgba(26,46,26,0.07)]" />

            {/* Energy bar */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-[#8aaa8a] uppercase tracking-wider">오행 에너지 분포</p>
              {[
                { el: "목", pct: 72, color: "#22c55e" },
                { el: "화", pct: 48, color: "#ef4444" },
                { el: "토", pct: 60, color: "#eab308" },
                { el: "금", pct: 35, color: "#a1a1aa" },
                { el: "수", pct: 55, color: "#3b82f6" },
              ].map(({ el, pct, color }) => (
                <div key={el} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#4a664a] w-4">{el}</span>
                  <div className="flex-1 h-2 bg-[rgba(26,46,26,0.06)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                  <span className="text-xs text-[#8aaa8a] w-8 text-right">{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

// ─── Confirmation ─────────────────────────────────────────────────────────────
export const Confirmation: Story = {
  name: "Confirmation Dialog",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <>
        <DsButton variant="outline" onClick={() => setOpen(true)}>
          삭제하기
        </DsButton>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="sm"
          title="분석 결과 삭제"
          description="이 작업은 되돌릴 수 없습니다."
          footer={
            <>
              <DsButton variant="ghost" size="md" onClick={() => setOpen(false)}>취소</DsButton>
              <DsButton
                variant="outline"
                size="md"
                className="border-red-300 text-red-600 hover:border-red-500"
                onClick={() => setOpen(false)}
              >
                삭제
              </DsButton>
            </>
          }
        >
          <p className="text-sm text-[#4a664a]">
            저장된 오행 분석 결과가 영구적으로 삭제됩니다.
            계속하시겠습니까?
          </p>
        </Modal>
      </>
    );
  },
};
