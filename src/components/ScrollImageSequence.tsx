"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Anchor, ShieldCheck, ThermometerSnowflake, Sparkles, Award, Truck, ChevronDown } from "lucide-react";

interface ScrollImageSequenceProps {
  onContactClick?: () => void;
}

interface NarrativeStage {
  startProgress: number;
  endProgress: number;
  stageNumber: string;
  tag: string;
  title: string;
  tamilName?: string;
  description: string;
  highlightPill: string;
  icon: "anchor" | "shield" | "slurry" | "sparkles" | "award" | "truck";
}

const TOTAL_FRAMES = 301;

const NARRATIVE_STAGES: NarrativeStage[] = [
  {
    startProgress: 0,
    endProgress: 0.16,
    stageNumber: "01",
    tag: "DEEP SEA HARVEST",
    title: "100% Live-Hooked Ocean Catch",
    tamilName: "ஆழ்கடல் தூண்டில் மீன்",
    description:
      "Handline reeled one by one from Kasimedu deep waters. No trawl nets, no crushing pressure, and unbroken bloodlines for pristine, firm white flesh.",
    highlightPill: "Single Handline • Zero Net Trauma",
    icon: "anchor",
  },
  {
    startProgress: 0.16,
    endProgress: 0.32,
    stageNumber: "02",
    tag: "DAWN HARBOR LANDING",
    title: "Direct Harbor Dawn Landing",
    tamilName: "அதிகாலை படகு வருகை",
    description:
      "Arriving at first light with the morning day-boat fleet. Each fish inspected for crystal-clear convex eyes, vibrant scales, and sea-sweet aroma.",
    highlightPill: "Kasimedu Pier Landing • Grade A",
    icon: "shield",
  },
  {
    startProgress: 0.32,
    endProgress: 0.52,
    stageNumber: "03",
    tag: "COLD CHAIN PRESERVATION",
    title: "Instant Sub-Zero Slurry (-1.5°C)",
    tamilName: "பனிக்கூழ் பதப்படுத்துதல்",
    description:
      "Submerged instantly into maritime brine ice slurry. Rapid cellular chilling prevents bacterial degradation and locks in just-caught ocean tenderness.",
    highlightPill: "-1.5°C Sterile Brine Slurry",
    icon: "slurry",
  },
  {
    startProgress: 0.52,
    endProgress: 0.74,
    stageNumber: "04",
    tag: "ARTISAN PREPARATION",
    title: "Master Slicing & Custom Portions",
    tamilName: "நேர்த்தியான வெட்டு முறை",
    description:
      "Skilled harbor fishmongers custom cut Vanjaram and fresh catches into succulent center-cut steaks, thick steaks, curry cuts, or pristine whole dressed fish.",
    highlightPill: "Custom Sliced on Demand",
    icon: "sparkles",
  },
  {
    startProgress: 0.74,
    endProgress: 0.88,
    stageNumber: "05",
    tag: "PRISTINE OCEAN CATCH",
    title: "Gleaming Seafood on Crushed Ice",
    tamilName: "புதிய கடல் மீன் வகைகள்",
    description:
      "From majestic giant Vanjaram to coral Red Snapper (Sankara), Yellowfin Tuna (Soora), Wild Prawns, and pristine squid presented in peak freshness.",
    highlightPill: "10 Core Fresh Varieties",
    icon: "award",
  },
  {
    startProgress: 0.88,
    endProgress: 1.0,
    stageNumber: "06",
    tag: "OCEAN TO TABLE",
    title: "Reliable Fresh Harbor Dispatch",
    tamilName: "விரைவு விநியோகம்",
    description:
      "Packed in sterile, insulated thermal ice crates. Supplying premier restaurants, coastal stalls, banquet caterers, and private gourmet kitchens.",
    highlightPill: "Thermal Cold Crates • Doorstep Supply",
    icon: "truck",
  },
];

export function ScrollImageSequence({ onContactClick }: ScrollImageSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingSetRef = useRef<Set<number>>(new Set());

  const [currentFrame, setCurrentFrame] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState<NarrativeStage>(NARRATIVE_STAGES[0]);

  // Helper to construct frame URL
  const getFrameUrl = useCallback((idx: number) => {
    const padded = String(idx).padStart(4, "0");
    return `/sequence/frame_${padded}.webp`;
  }, []);

  // Draw frame with object-fit: cover math
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current.get(frameIdx);
    if (!img || !img.complete || img.naturalWidth === 0) {
      let closestIdx = 1;
      let minDiff = Infinity;
      for (const [idx, loadedImg] of imagesRef.current.entries()) {
        if (loadedImg.complete && loadedImg.naturalWidth > 0) {
          const diff = Math.abs(idx - frameIdx);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        }
      }
      img = imagesRef.current.get(closestIdx);
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || 720;
    const imgHeight = img.naturalHeight || 1280;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      drawHeight = canvasHeight;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  const loadSingleImage = useCallback(
    (idx: number): Promise<HTMLImageElement | null> => {
      if (imagesRef.current.has(idx)) {
        return Promise.resolve(imagesRef.current.get(idx)!);
      }
      if (loadingSetRef.current.has(idx)) {
        return Promise.resolve(null);
      }
      loadingSetRef.current.add(idx);

      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = () => {
          imagesRef.current.set(idx, img);
          loadingSetRef.current.delete(idx);
          resolve(img);
        };
        img.onerror = () => {
          loadingSetRef.current.delete(idx);
          resolve(null);
        };
      });
    },
    [getFrameUrl]
  );

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      drawFrame(currentFrame);
    }
  }, [currentFrame, drawFrame]);

  // Progressive preloader
  useEffect(() => {
    let isCancelled = false;

    async function startProgressiveLoad() {
      // 1. Critical initial frames
      const initialBatch = Array.from({ length: 15 }, (_, i) => i + 1);
      await Promise.all(initialBatch.map((idx) => loadSingleImage(idx)));
      if (isCancelled) return;
      drawFrame(1);

      // 2. Keyframes (every 5th frame)
      const milestones: number[] = [];
      for (let i = 20; i <= TOTAL_FRAMES; i += 5) {
        milestones.push(i);
      }
      await Promise.all(milestones.map((idx) => loadSingleImage(idx)));
      if (isCancelled) return;

      // 3. Remainder in batches of 10
      const allFrames = Array.from({ length: TOTAL_FRAMES }, (_, i) => i + 1);
      const remaining = allFrames.filter((idx) => !imagesRef.current.has(idx));

      for (let i = 0; i < remaining.length; i += 10) {
        if (isCancelled) break;
        const slice = remaining.slice(i, i + 10);
        await Promise.all(slice.map((idx) => loadSingleImage(idx)));
        await new Promise((r) => setTimeout(r, 16));
      }
    }

    startProgressiveLoad();
    return () => {
      isCancelled = true;
    };
  }, [loadSingleImage, drawFrame]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Smooth scroll scrubbing loop
  useEffect(() => {
    let rafId: number;
    let targetProgress = 0;
    let smoothProgress = 0;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;
      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      targetProgress = progress;
    };

    const updateLoop = () => {
      smoothProgress += (targetProgress - smoothProgress) * 0.4;

      const rawFrame = Math.round(smoothProgress * (TOTAL_FRAMES - 1)) + 1;
      const clampedFrame = Math.min(Math.max(rawFrame, 1), TOTAL_FRAMES);

      setCurrentFrame((prev) => {
        if (prev !== clampedFrame) {
          drawFrame(clampedFrame);
          return clampedFrame;
        }
        return prev;
      });

      setScrollProgress(smoothProgress);

      const stage =
        NARRATIVE_STAGES.find(
          (s) => smoothProgress >= s.startProgress && smoothProgress <= s.endProgress
        ) || NARRATIVE_STAGES[NARRATIVE_STAGES.length - 1];

      setActiveStage(stage);

      rafId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [drawFrame]);

  const renderIcon = (type: NarrativeStage["icon"]) => {
    switch (type) {
      case "anchor":
        return <Anchor className="w-3.5 h-3.5 text-[#1E3A5F]" />;
      case "shield":
        return <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />;
      case "slurry":
        return <ThermometerSnowflake className="w-3.5 h-3.5 text-[#1E3A5F]" />;
      case "sparkles":
        return <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />;
      case "award":
        return <Award className="w-3.5 h-3.5 text-[#C5A880]" />;
      case "truck":
        return <Truck className="w-3.5 h-3.5 text-[#1E3A5F]" />;
    }
  };

  return (
    <section
      id="seafood-story"
      ref={containerRef}
      className="relative w-full h-[190vh] sm:h-[230vh] bg-[#F8F6F0] text-[#14243B] select-none border-t border-[#D8D5CD]"
    >
      {/* Sticky Fullscreen Stage (Tight, Proportional, Zero Empty Dead Space) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Hardware-accelerated HTML5 Canvas with frame-by-frame rendering */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover touch-none pointer-events-none"
        />

        {/* Ambient Warm Editorial Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F6F0]/85 via-transparent to-[#F8F6F0]/50 pointer-events-none" />

        {/* Top Floating Editorial Header */}
        <div className="absolute top-20 sm:top-24 left-4 right-4 sm:left-10 sm:right-10 z-20 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8]/95 backdrop-blur-md border border-[#D8D5CD] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#1E3A5F] shadow-2xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
            <span>THE LIVE SEAFOOD JOURNEY</span>
            <span className="hidden sm:inline text-[#777873]">• Scroll to Scrub</span>
          </div>

          {/* Frame Counter */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFDF8]/95 backdrop-blur-md border border-[#D8D5CD] text-[10px] sm:text-xs font-mono text-[#14243B] shadow-2xs font-semibold">
            <span className="text-[#1E3A5F]">SEQUENCE</span>
            <span>
              {String(currentFrame).padStart(3, "0")} / {TOTAL_FRAMES}
            </span>
          </div>
        </div>

        {/* Storytelling Editorial Card (Balanced & Tight, No Empty Voids) */}
        <div className="absolute bottom-5 sm:bottom-8 left-3 right-3 sm:left-auto sm:right-10 sm:max-w-md z-20 pointer-events-auto">
          <div className="rounded-3xl bg-[#FFFDF8]/95 backdrop-blur-xl border border-[#D8D5CD] p-4 sm:p-6 shadow-[0_20px_45px_rgba(20,36,59,0.1)] space-y-2.5 sm:space-y-3 transition-all">
            {/* Stage Identification Pill */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F6F0] border border-[#D8D5CD] text-[10px] font-mono uppercase tracking-wider text-[#1E3A5F] font-semibold">
                {renderIcon(activeStage.icon)}
                <span>
                  STAGE {activeStage.stageNumber} • {activeStage.tag}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#777873]">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>

            {/* Title & Tamil Name */}
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#14243B] font-normal leading-tight">
                {activeStage.title}
              </h3>
              {activeStage.tamilName && (
                <div className="text-xs font-mono text-[#0D9488] font-semibold mt-0.5">
                  {activeStage.tamilName}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm font-sans text-[#777873] leading-relaxed">
              {activeStage.description}
            </p>

            {/* Action & Pill */}
            <div className="pt-1 flex items-center justify-between gap-2 border-t border-[#D8D5CD]">
              <span className="text-[10px] sm:text-xs font-mono font-semibold text-[#1E3A5F]">
                ✓ {activeStage.highlightPill}
              </span>

              {onContactClick && (
                <button
                  onClick={onContactClick}
                  className="px-4 py-1.5 rounded-full bg-[#14243B] hover:bg-[#0A1A2E] text-white text-[11px] font-sans font-semibold tracking-wider uppercase transition-all active:scale-95 cursor-pointer shadow-2xs"
                >
                  Order Catch
                </button>
              )}
            </div>

            {/* Mini Scroll Progress Bar */}
            <div className="w-full bg-[#EFEBE2] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#1E3A5F] to-[#0D9488] h-full rounded-full transition-all duration-75"
                style={{ width: `${Math.max(scrollProgress * 100, 2)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Scroll Hint on initial view */}
        {scrollProgress < 0.05 && (
          <div className="absolute bottom-28 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[11px] font-mono text-[#777873] pointer-events-none animate-bounce">
            <span className="uppercase tracking-widest font-semibold text-[#1E3A5F]">Scroll To Scrub Story</span>
            <ChevronDown className="w-4 h-4 text-[#1E3A5F]" />
          </div>
        )}
      </div>
    </section>
  );
}
