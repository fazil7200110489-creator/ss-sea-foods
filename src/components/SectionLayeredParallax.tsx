"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { Anchor, ShieldCheck, Sparkles, ChevronDown, Compass, Play } from "lucide-react";

interface SectionLayeredParallaxProps {
  onContactClick?: () => void;
}

const TOTAL_FRAMES = 301;

export function SectionLayeredParallax({ onContactClick }: SectionLayeredParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Direct array cache for all 301 images: index 1 to 301
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const loadedCountRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(1);

  // Direct DOM refs for non-re-rendering 60fps status updates
  const frameCounterRef = useRef<HTMLSpanElement>(null);
  const progressPctRef = useRef<HTMLSpanElement>(null);
  const narrativeCardRef = useRef<HTMLDivElement>(null);
  const narrativeTextRef = useRef<HTMLParagraphElement>(null);
  const narrativePhaseRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const getFrameUrl = useCallback((idx: number) => {
    const padded = String(idx).padStart(4, "0");
    return `/sequence/frame_${padded}.webp`;
  }, []);

  // Direct high-performance canvas painter
  const drawFrameDirect = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Retrieve cached image or closest loaded frame
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame
      let minDiff = Infinity;
      let closest: HTMLImageElement | null = null;
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const diff = Math.abs(i - frameIdx);
          if (diff < minDiff) {
            minDiff = diff;
            closest = candidate;
            if (minDiff <= 2) break; // Good enough
          }
        }
      }
      img = closest;
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

    // "cover" fit - fills entire canvas with zero letterbox bars
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

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    currentFrameRef.current = frameIdx;
  }, []);

  // Responsive canvas resize listener
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
      drawFrameDirect(currentFrameRef.current);
    }
  }, [drawFrameDirect]);

  // Aggressive parallel preloading of all 301 frames
  useEffect(() => {
    let isCancelled = false;

    const loadSingle = (idx: number): Promise<void> => {
      if (imagesRef.current[idx]) return Promise.resolve();
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[idx] = img;
            loadedCountRef.current += 1;
            // Draw immediately if this is frame 1
            if (idx === 1 && currentFrameRef.current === 1) {
              drawFrameDirect(1);
            }
          }
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    };

    async function preloadAllFrames() {
      // Step 1: Immediately load first 20 frames for instant display
      const priorityFrames = Array.from({ length: 20 }, (_, i) => i + 1);
      await Promise.all(priorityFrames.map(loadSingle));
      if (isCancelled) return;
      drawFrameDirect(1);

      // Step 2: Concurrently load all remaining frames in fast batches of 25
      const remaining: number[] = [];
      for (let i = 21; i <= TOTAL_FRAMES; i++) {
        remaining.push(i);
      }

      const BATCH_SIZE = 25;
      for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
        if (isCancelled) break;
        const batch = remaining.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(loadSingle));
      }
    }

    preloadAllFrames();

    return () => {
      isCancelled = true;
    };
  }, [getFrameUrl, drawFrameDirect]);

  // Canvas resize hook
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // 60FPS Scroll Scrubbing Loop (No React Re-renders!)
  useEffect(() => {
    let rafId: number;
    let targetProgress = 0;
    let smoothProgress = 0;
    let lastRenderedFrame = -1;

    const narrativePhases = [
      {
        progress: 0.0,
        phase: "PHASE 01 • HARBOUR DEPARTURE",
        title: "Single Handline Reeling",
        desc: "Live hook harvesting at first sea light off Kasimedu deep waters. Zero trawler nets, zero bruise compression.",
      },
      {
        progress: 0.3,
        phase: "PHASE 02 • LIVE HARVEST",
        title: "King Vanjaram & Pelagic Catches",
        desc: "Reeled onboard within minutes and preserved in maritime ice slurry to lock in natural succulence and sweetness.",
      },
      {
        progress: 0.65,
        phase: "PHASE 03 • SUB-ZERO TRANSIT",
        title: "-1.5°C Brine Cold Chain",
        desc: "Strict temperature control maintains crystalline flesh, translucent eyes, and pristine oceanic freshness.",
      },
      {
        progress: 0.9,
        phase: "PHASE 04 • KITCHEN READY",
        title: "Artisanal Custom Slicing",
        desc: "Pre-ordered and sliced on demand: thick center-cut steaks, fillets, and banquet portions delivered across Chennai.",
      },
    ];

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;
      // Calculate progress 0.0 to 1.0
      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      targetProgress = progress;
    };

    const updateLoop = () => {
      // Damped lerp for silky smooth continuous momentum
      smoothProgress += (targetProgress - smoothProgress) * 0.28;

      // Absolute frame index 1 to 301
      const rawFrame = Math.round(smoothProgress * (TOTAL_FRAMES - 1)) + 1;
      const clampedFrame = Math.min(Math.max(rawFrame, 1), TOTAL_FRAMES);

      // Only paint when frame actually changes
      if (clampedFrame !== lastRenderedFrame) {
        lastRenderedFrame = clampedFrame;
        drawFrameDirect(clampedFrame);

        // Update DOM elements directly for buttery 60fps performance
        if (frameCounterRef.current) {
          frameCounterRef.current.textContent = `${String(clampedFrame).padStart(3, "0")} / ${TOTAL_FRAMES}`;
        }
        if (progressPctRef.current) {
          progressPctRef.current.textContent = `${Math.round(smoothProgress * 100)}%`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${Math.round(smoothProgress * 100)}%`;
        }

        // Update narrative milestone smoothly
        if (narrativePhaseRef.current && narrativeTextRef.current) {
          let currentPhase = narrativePhases[0];
          for (const p of narrativePhases) {
            if (smoothProgress >= p.progress) {
              currentPhase = p;
            }
          }
          narrativePhaseRef.current.textContent = currentPhase.phase;
          narrativeTextRef.current.innerHTML = `<strong class="text-[#0F2537]">${currentPhase.title}</strong> — ${currentPhase.desc}`;
        }
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [drawFrameDirect]);

  return (
    <section
      id="seafood-story"
      ref={containerRef}
      className="relative w-full h-[320vh] sm:h-[380vh] bg-[#F4F9FD] text-[#0F2537] select-none border-t border-[#D2E4F0]"
    >
      {/* Sticky Fullscreen Stage (Pins for the duration of the 301 frames, then unpins cleanly) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Full-width HTML5 Canvas rendering 301 continuous video frames */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover touch-none pointer-events-none"
        />

        {/* Ambient Light Sea Breeze Gradients (Light, Crisp, Beach View) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F9FD]/95 via-transparent to-[#F4F9FD]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0284C7]/5 to-[#0F2537]/20 pointer-events-none" />

        {/* Top Header Badge Strip */}
        <div className="absolute top-20 sm:top-24 left-4 right-4 sm:left-10 sm:right-10 z-20 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#D2E4F0] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#0284C7] shadow-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
            <span>SECTION 02 • 301-FRAME SCROLL ANIMATION</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#D2E4F0] text-[10px] sm:text-xs font-mono text-[#0F2537] shadow-sm font-semibold">
            <span className="text-[#0284C7]">FRAME</span>
            <span ref={frameCounterRef} className="font-bold">001 / 301</span>
          </div>
        </div>

        {/* Bottom Editorial Narrative Card (Light Sea / Beach View Frosted Card) */}
        <div
          ref={narrativeCardRef}
          className="absolute bottom-6 sm:bottom-10 left-3 right-3 sm:left-auto sm:right-10 sm:max-w-lg z-20 pointer-events-auto"
        >
          <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-[#D2E4F0] p-5 sm:p-7 shadow-[0_20px_45px_rgba(2,132,199,0.12)] space-y-3.5 transition-all">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[10px] font-mono uppercase tracking-wider text-[#0284C7] font-semibold">
                <Anchor className="w-3.5 h-3.5 text-[#0D9488]" />
                <span ref={narrativePhaseRef}>PHASE 01 • HARBOUR DEPARTURE</span>
              </div>
              <span ref={progressPctRef} className="text-xs font-mono font-bold text-[#0284C7]">
                0%
              </span>
            </div>

            {/* Dynamic narrative paragraph updated at 60fps */}
            <p ref={narrativeTextRef} className="text-xs sm:text-sm font-sans text-[#486581] leading-relaxed">
              <strong className="text-[#0F2537]">Single Handline Reeling</strong> — Live hook harvesting at first sea light off Kasimedu deep waters. Zero trawler nets, zero bruise compression.
            </p>

            {/* Continuous Visual Scroll Progress Bar */}
            <div className="w-full h-1.5 bg-[#E0F2FE] rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-[#0284C7] to-[#0D9488] rounded-full transition-all duration-75"
                style={{ width: "0%" }}
              />
            </div>

            {/* Trust Badges */}
            <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-[#486581] border-t border-[#E0F2FE]">
              <div className="flex items-center gap-1.5 text-[#0D9488] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Scroll Controls Sequence</span>
              </div>
              <button
                onClick={onContactClick}
                className="text-[11px] font-mono uppercase tracking-wider text-[#0284C7] hover:underline font-bold cursor-pointer"
              >
                Inquire Fresh Harvest →
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Guide Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-[11px] font-mono text-[#0284C7] pointer-events-none animate-bounce">
          <span className="uppercase tracking-widest font-semibold">Scroll to Scrub Sequence</span>
          <ChevronDown className="w-4 h-4 text-[#0284C7]" />
        </div>
      </div>
    </section>
  );
}
