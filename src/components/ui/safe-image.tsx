"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { ImageOff } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export const SafeImage = ({
  src,
  alt,
  fallbackSrc,
  className,
  width,
  height,
  fill,
  ...props
}: SafeImageProps) => {
  const [error, setError] = useState(false);
  const safeSrc = getAssetPath(src as string);

  useEffect(() => {
    setError(false);
  }, [src]);

  // Determine what to show
  // 1. If error occurred and we have a fallback, use fallback.
  // 2. Otherwise use the safeSrc.
  const finalSrc = error && fallbackSrc ? fallbackSrc : safeSrc;

  // Fallback dimensions if not provided and not using fill
  const finalWidth = !fill && !width ? 1200 : width;
  const finalHeight = !fill && !height ? 800 : height;

  // Final check: if we have no source to show at all (no src provided, or src empty and no fallback)
  // render the "Image Unavailable" placeholder.
  // Note: if src is provided but broken, we rely on onError to switch to fallback.
  // If we switched to fallback and that is also broken (or missing), we might still try to render it.

  if (!finalSrc && !fallbackSrc) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-muted/30 border border-border/50 rounded-2xl w-full h-full ${className}`}
      >
        <ImageOff className="w-8 h-8 text-muted-foreground/50 mb-2" />
        <span className="text-[10px] text-muted-foreground/30 uppercase tracking-widest font-bold">
          Image Unavailable
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden w-full h-full ${fill ? "" : className}`}
    >
      <Image
        {...props}
        src={finalSrc || fallbackSrc || ""}
        alt={alt}
        width={fill ? undefined : finalWidth}
        height={fill ? undefined : finalHeight}
        fill={fill}
        onError={() => setError(true)}
        sizes={
          fill
            ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            : undefined
        }
        className={`transition-all duration-500 opacity-100 scale-100 ${className || ""}`}
      />
    </div>
  );
};
