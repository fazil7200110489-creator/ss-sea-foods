"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function FishingLineScroll() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const [pct, setPct] = useState(0);

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      setPct(Math.round(latest * 100));
    });
  }, [smoothProgress]);

  // Map progress to pixel vertical travel within viewport
  const yPosition = useTransform(smoothProgress, [0, 1], ["0px", "calc(100vh - 75px)"]);

  return (
    <div className="fixed top-0 bottom-0 left-2 sm:left-5 lg:left-8 w-6 pointer-events-none z-30 hidden sm:flex flex-col items-center">
      {/* Ultra-thin vertical fishing line */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#0284C7]/25 to-transparent" />

      {/* Floating minimalist Fish Hook SVG moving with scroll */}
      <motion.div
        className="absolute top-0 flex items-center gap-1.5 will-change-transform"
        style={{
          y: yPosition,
        }}
      >
        {/* Polished Stainless Fishing Hook in Frosted Beach Glass */}
        <div className="relative -ml-[11px] p-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-[0_4px_16px_rgba(2,132,199,0.18)] border border-[#BAE6FD] text-[#0284C7]">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transform -rotate-12"
          >
            {/* Hook Eyelet */}
            <circle cx="14" cy="4" r="2" fill="#0284C7" fillOpacity="0.3" stroke="#0284C7" />
            {/* Hook Shank, Bend & Barb */}
            <path d="M14 6v8a5 5 0 0 1-5 5 5 5 0 0 1-5-5c0-2.5 2-4 2-4" />
            <path d="M7 13l-1 1" />
          </svg>
        </div>

        {/* Minimalist Depth indicator */}
        <span className="hidden lg:inline-block font-mono text-[9px] tracking-widest text-[#52657A] bg-white/90 px-1.5 py-0.5 rounded border border-[#BAE6FD] backdrop-blur-sm shadow-sm font-semibold">
          {String(pct).padStart(2, "0")}%
        </span>
      </motion.div>
    </div>
  );
}
