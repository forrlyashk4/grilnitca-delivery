import clsx from "clsx";
import React, { createElement } from "react";

export type TitleProps = React.PropsWithChildren<{
  size: TitleSizes;
  className?: string;
}>;

type TitleSizes = "xs" | "s" | "m" | "l" | "xl" | "2xl";

const titleTags: Record<TitleSizes, string> = {
  xs: "h5",
  s: "h4",
  m: "h3",
  l: "h2",
  xl: "h1",
  "2xl": "h1",
};

const titleFonts: Record<TitleSizes, string> = {
  xs: "text-base",
  s: "text-lg",
  m: "text-xl",
  l: "text-2xl",
  xl: "text-3xl",
  "2xl": "text-4xl",
};

export const Title: React.FC<TitleProps> = ({ className, size, children }) => {
  return createElement(
    titleTags[size],
    { className: clsx(className, titleFonts[size], "font-bold") },
    children
  );
};
