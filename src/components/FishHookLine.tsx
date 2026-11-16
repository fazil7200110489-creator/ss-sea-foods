"use client";

import React from "react";

interface FishHookLineProps {
  className?: string;
  lineHeight?: string;
}

export function FishHookLine({
  className = "",
  lineHeight = "h-32 sm:h-48",
}: FishHookLineProps) {
  return (
    <div className={`relative flex flex-col items-center pointer-events-none ${className}`}>
      {/* Sunlit monofilament fishing line */}
      <div className={`w-[1px] bg-gradient-to-b from-[#0284C7]/15 via-[#0284C7]/40 to-[#0284C7]/75 ${lineHeight}`} />
      {/* Stainless steel fishing hook SVG attached at bottom */}
      <svg
        width="15"
        height="24"
        viewBox="0 0 15 24"
        fill="none"
        stroke="#0284C7"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="-mt-0.5 drop-shadow-[0_2px_6px_rgba(2,132,199,0.25)]"
      >
        {/* Hook eyelet */}
        <circle cx="7.5" cy="2" r="1.5" fill="#0284C7" fillOpacity="0.25" stroke="#0284C7" strokeWidth="1" />
        {/* Hook shank down */}
        <line x1="7.5" y1="3.5" x2="7.5" y2="15" />
        {/* Hook bend and barbed point */}
        <path d="M7.5 15a4.5 4.5 0 0 0 4.5 4.5h0.5a3 3 0 0 0 3-3v-2l-1.5 1" />
      </svg>
    </div>
  );
}
