import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DsInput, DsSearchInput } from "./DsInput";

const meta: Meta = {
  title: "Design System/Input",
  tags: ["autodocs"],
};
export default meta;

export const BasicInput: StoryObj = {
  name: "Basic Input",
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <DsInput placeholder="이름을 입력하세요" />
      <DsInput label="이름" placeholder="홍길동" />
      <DsInput label="비활성화" placeholder="비활성화 상태" disabled />
    </div>
  ),
};

export const SearchInputStory: StoryObj = {
  name: "Search Input",
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <DsSearchInput placeholder="오행 유형 검색..." />
      <DsSearchInput placeholder="Master 검색..." />
    </div>
  ),
};

export const AllInputs: StoryObj = {
  name: "All Inputs",
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <DsInput label="기본 인풋" placeholder="텍스트를 입력하세요" />
      <DsInput label="포커스 상태" placeholder="클릭해서 확인" />
      <DsInput label="비활성화" placeholder="비활성화 상태" disabled />
      <DsSearchInput placeholder="마스터 또는 오행 유형 검색..." />
    </div>
  ),
};
