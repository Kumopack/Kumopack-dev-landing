"use client";

import React from "react";
import { getAssetPath } from "@/lib/utils";

interface Animated3DBoxProps {
  size?: number;
  speed?: number;
}

const PARTICLES = [
  { icon: "⭐", x: -8,  delay: 0,   dur: 2.5, endY: -28, endX: -14, sz: 13, color: "#fadb14" },
  { icon: "⚡", x: 20,  delay: 0.6, dur: 2.8, endY: -35, endX: 8,   sz: 11, color: "#722ed1" },
  { icon: "❤️", x: 6,   delay: 1.3, dur: 2.2, endY: -30, endX: -6,  sz: 10, color: "#eb2f96" },
  { icon: "🔥", x: -14, delay: 1.8, dur: 3,   endY: -32, endX: -18, sz: 12, color: "#fa541c" },
  { icon: "👑", x: 28,  delay: 0.4, dur: 2.6, endY: -26, endX: 16,  sz: 12, color: "#faad14" },
];

export const Animated3DBox: React.FC<Animated3DBoxProps> = ({
  size = 80,
  speed = 6,
}) => {
  const id = React.useId().replace(/:/g, "");

  const keyframes = `
    @keyframes boxsvg_float_${id} {
      0%, 100% { transform: perspective(600px) rotateY(-5deg) rotateX(2deg) translateY(0px); }
      50%       { transform: perspective(600px) rotateY(5deg)  rotateX(-2deg) translateY(-4px); }
    }
    ${PARTICLES.map(
      (s, i) => `
      @keyframes sparkle_fly_${id}_${i} {
        0%   { opacity: 0;   transform: translate(0px, 0px) scale(0.3); }
        15%  { opacity: 1;   transform: translate(${s.endX * 0.3}px, ${s.endY * 0.3}px) scale(0.8); }
        60%  { opacity: 0.9; transform: translate(${s.endX * 0.8}px, ${s.endY * 0.8}px) scale(1); }
        100% { opacity: 0;   transform: translate(${s.endX}px, ${s.endY * 1.2}px) scale(0.2); }
      }
    `
    ).join("\n")}
    .boxsvg-scene-${id} {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: ${size + 40}px;
      height: ${size + 20}px;
    }
    .boxsvg-wrap-${id} {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      animation: boxsvg_float_${id} ${speed}s ease-in-out infinite;
      filter: drop-shadow(0 6px 14px rgba(100, 60, 140, 0.22));
      transform-style: preserve-3d;
      will-change: transform;
      position: relative;
      z-index: 2;
    }
    ${PARTICLES.map(
      (s, i) => `
      .particle-${id}-${i} {
        position: absolute;
        left: calc(50% + ${s.x}px);
        top: 50%;
        font-size: ${s.sz}px;
        pointer-events: none;
        z-index: 3;
        animation: sparkle_fly_${id}_${i} ${s.dur}s ease-out ${s.delay}s infinite;
        opacity: 0;
        line-height: 1;
      }
    `
    ).join("\n")}
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div className={`boxsvg-scene-${id}`}>
        <div className={`boxsvg-wrap-${id}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getAssetPath("/asset/box.svg")}
            alt="3D Open Box"
            width={size}
            height={size}
            style={{ objectFit: "contain" }}
          />
        </div>
        {PARTICLES.map((s, i) => (
          <span key={i} className={`particle-${id}-${i}`}>
            {s.icon}
          </span>
        ))}
      </div>
    </>
  );
};

export default Animated3DBox;
