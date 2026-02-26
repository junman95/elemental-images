import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Container, SectionHeader, DsNav, PageWrapper } from "./Layout";
import DsButton from "./DsButton";
import { DsSearchInput } from "./DsInput";
import DsCard from "./DsCard";
import ElementTag, { ElementTagRow } from "./ElementTag";
import Divider from "./Divider";
import { Body, Muted } from "./Typography";

const meta: Meta = {
  title: "Design System/Layout",
  tags: ["autodocs"],
};
export default meta;

/** 내비게이션 바 */
export const Navigation: StoryObj = {
  name: "DsNav — 흰 글래스 내비",
  parameters: { layout: "fullscreen" },
  render: () => (
    <PageWrapper>
      <DsNav>
        {/* 로고 */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🏯</span>
          <span className="font-display font-black text-[#1a2e1a] text-lg tracking-tight">
            오행 관상
          </span>
        </div>

        {/* 내비 링크 */}
        <nav className="hidden md:flex items-center gap-8">
          {["분석하기", "오행 소개", "결과 공유"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-[#4a664a] hover:text-[#13ec5b] transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* 액션 */}
        <div className="flex items-center gap-3">
          <DsSearchInput placeholder="검색..." className="hidden lg:flex w-48" />
          <DsButton variant="primary" size="sm">분석 시작</DsButton>
        </div>
      </DsNav>

      {/* 페이지 내용 미리보기 */}
      <Container className="py-16">
        <SectionHeader
          eyebrow="The Imperial Registry"
          title="오행 얼굴형 분석"
          description="AI와 얼굴 랜드마크 기반으로 당신의 오행 유형을 분석합니다"
        />
      </Container>
    </PageWrapper>
  ),
};

/** Container + SectionHeader */
export const SectionHeaderExample: StoryObj = {
  name: "SectionHeader",
  parameters: { layout: "fullscreen" },
  render: () => (
    <PageWrapper className="py-16">
      <Container>
        <SectionHeader
          eyebrow="The Imperial Registry"
          title={<>오행 <span className="text-[#13ec5b]">얼굴형</span> 분석</>}
          description="AI와 얼굴 랜드마크 기반으로 당신의 오행 유형을 정밀 분석합니다"
        />
        <Divider color="gold" className="mb-12" />
        <ElementTagRow className="justify-center mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["wood", "fire", "earth"].map((el) => (
            <DsCard key={el} variant="glass" hover>
              <ElementTag element={el as "wood" | "fire" | "earth"} size="sm" />
              <Body className="mt-3 text-[#4a664a] text-sm leading-relaxed">
                오행의 기운이 얼굴 형상에 깃들어 있습니다.
              </Body>
              <Muted className="mt-2 text-xs">클릭하여 자세히 보기</Muted>
            </DsCard>
          ))}
        </div>
      </Container>
    </PageWrapper>
  ),
};

/** 1600px Container 폭 확인 */
export const ContainerWidth: StoryObj = {
  name: "Container (max 1600px)",
  parameters: { layout: "fullscreen" },
  render: () => (
    <PageWrapper>
      <div className="py-8">
        <Container>
          <div className="ds-glass rounded-xl p-6 text-center">
            <Body className="font-mono text-sm text-[#4a664a]">
              max-width: 1600px · px-6 lg:px-10 · mx-auto
            </Body>
          </div>
        </Container>
      </div>
    </PageWrapper>
  ),
};
