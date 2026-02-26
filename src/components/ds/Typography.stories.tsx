import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Eyebrow, PageTitle, SectionTitle, CardTitle, Body, Muted, Quote } from "./Typography";
import Divider from "./Divider";

const meta: Meta = {
  title: "Design System/Typography",
  tags: ["autodocs"],
};
export default meta;

/** 모든 타이포그래피 스케일 한눈에 보기 */
export const AllScales: StoryObj = {
  name: "All Scales",
  render: () => (
    <div className="flex flex-col gap-6 w-[640px]">
      <div className="flex flex-col gap-2">
        <Eyebrow>The Imperial Registry</Eyebrow>
        <PageTitle>오행 얼굴형 분석</PageTitle>
      </div>
      <Divider color="gold" />
      <SectionTitle>당신의 오행 유형은 무엇인가요?</SectionTitle>
      <CardTitle>목(木)형 — 나무의 기운</CardTitle>
      <Body>
        오행(五行)은 목·화·토·금·수의 다섯 가지 기운으로 이루어져 있으며,
        사람의 얼굴형에도 이 기운이 반영됩니다.
      </Body>
      <Muted>※ 본 서비스는 엔터테인먼트 목적이며, 의학적 판단의 근거가 아닙니다.</Muted>
      <Quote>
        운명은 얼굴의 이목구비에 새겨진 문자와 같다
      </Quote>
    </div>
  ),
};

export const EyebrowVariant: StoryObj = {
  name: "Eyebrow",
  render: () => <Eyebrow>The Imperial Registry · 오행 분석</Eyebrow>,
};

export const PageTitleVariant: StoryObj = {
  name: "PageTitle",
  render: () => <PageTitle>오행 얼굴형 분석</PageTitle>,
};

export const SectionTitleVariant: StoryObj = {
  name: "SectionTitle",
  render: () => <SectionTitle>당신의 오행 유형</SectionTitle>,
};

export const QuoteVariant: StoryObj = {
  name: "Quote",
  render: () => (
    <Quote>운명은 얼굴의 이목구비에 새겨진 문자와 같다</Quote>
  ),
};
