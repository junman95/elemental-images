import type { Preview, Decorator } from "@storybook/nextjs-vite";
import React from "react";
import "../src/app/globals.css";

/** 모든 스토리에 dancheong-light 배경 + 여백 적용 */
const withBackground: Decorator = (Story, context) => {
  const isFullscreen = context.parameters.layout === "fullscreen";
  return (
    <div
      className={
        isFullscreen
          ? "dancheong-light min-h-screen"
          : "dancheong-light min-h-[200px] p-10 flex items-center justify-center"
      }
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withBackground],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    backgrounds: { disable: true },
    layout: "centered",
  },
};

export default preview;
