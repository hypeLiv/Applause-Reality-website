"use client";

import NextImage, { type ImageProps } from "next/image";
import { createContext, useContext } from "react";

/** Image src → blur placeholder (a BlurHash decoded to a tiny PNG on the server). */
const BlurContext = createContext<Record<string, string>>({});

export function BlurProvider({ map, children }: { map: Record<string, string>; children: React.ReactNode }) {
  return <BlurContext.Provider value={map}>{children}</BlurContext.Provider>;
}

/**
 * next/image with a BlurHash placeholder whenever one is known for the src.
 * A drop-in replacement: import this instead of "next/image". An explicit
 * `placeholder` prop always wins.
 */
export default function Image(props: ImageProps) {
  const map = useContext(BlurContext);
  const blur = typeof props.src === "string" ? map[props.src] : undefined;
  if (!blur || props.placeholder) return <NextImage {...props} />;
  return <NextImage placeholder="blur" blurDataURL={blur} {...props} />;
}
