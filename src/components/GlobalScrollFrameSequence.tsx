"use client";

import React, { useRef, useEffect, useCallback } from "react";

const TOTAL_FRAMES = 301;

export function GlobalScrollFrameSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const currentFrameRef = useRef<number>(1);
  const isLoadedRef = useRef<boolean>(false);

  // Helper to format frame path
  const getFrameUrl = useCallback((idx: number) => {
    const padded = String(idx).padStart(4, "0");
    return `/seafood/frames/frame_${padded}.webp`;
  }, []);

  // Direct 60fps canvas draw with object-fit: cover scaling
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Retrieve cached image or closest loaded frame
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      let minDiff = Infinity;
      let closest: HTMLImageElement | null = null;
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const diff = Math.abs(i - frameIdx);
          if (diff < minDiff) {
            minDiff = diff;
            closest = candidate;
            if (minDiff <= 2) break;
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

    // cover scaling
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

  // High-DPI canvas resize listener
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(window.innerWidth * dpr);
    const h = Math.round(window.innerHeight * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      drawFrame(currentFrameRef.current);
    }
  }, [drawFrame]);

  // Aggressive parallel preloading of the 301 original frames
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
            if (idx === 1 && currentFrameRef.current === 1) {
              drawFrame(1);
            }
          }
          resolve();
        };
        img.onerror = () => {
          // Fallback to /sequence/ if /seafood/frames/ has issue
          const fallbackImg = new Image();
          const padded = String(idx).padStart(4, "0");
          fallbackImg.src = `/sequence/frame_${padded}.webp`;
          fallbackImg.onload = () => {
            if (!isCancelled) {
              imagesRef.current[idx] = fallbackImg;
            }
            resolve();
          };
          fallbackImg.onerror = () => resolve();
        };
      });
    };

    async function preloadAll() {
      // 1. Critical first frames
      const priority = Array.from({ length: 25 }, (_, i) => i + 1);
      await Promise.all(priority.map(loadSingle));
      if (isCancelled) return;
      isLoadedRef.current = true;
      drawFrame(1);

      // 2. Remainder in fast parallel batches of 30
      const remaining: number[] = [];
      for (let i = 26; i <= TOTAL_FRAMES; i++) {
        remaining.push(i);
      }

      const BATCH_SIZE = 30;
      for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
        if (isCancelled) break;
        const batch = remaining.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(loadSingle));
      }
    }

    preloadAll();

    return () => {
      isCancelled = true;
    };
  }, [getFrameUrl, drawFrame]);

  // Resize handler
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Global scroll listener mapping whole website scroll to frames 1 -> 301
  useEffect(() => {
    let rafId: number;
    let targetProgress = 0;
    let smoothProgress = 0;
    let lastRenderedFrame = -1;

    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const totalScrollable = scrollHeight - clientHeight;

      if (totalScrollable <= 0) return;
      const progress = Math.min(Math.max(scrollY / totalScrollable, 0), 1);
      targetProgress = progress;
    };

    const updateLoop = () => {
      // Damped lerp for silky continuous momentum
      smoothProgress += (targetProgress - smoothProgress) * 0.35;

      // Map progress strictly to Frame 1 -> 301
      const rawFrame = Math.round(smoothProgress * (TOTAL_FRAMES - 1)) + 1;
      const clampedFrame = Math.min(Math.max(rawFrame, 1), TOTAL_FRAMES);

      if (clampedFrame !== lastRenderedFrame) {
        lastRenderedFrame = clampedFrame;
        drawFrame(clampedFrame);
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
  }, [drawFrame]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* HTML5 Canvas painting the 301 original frames at 60fps */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover touch-none"
      />

      {/* Subtle Atmospheric Overlay - calibrated so 301 video frames are richly visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4F9FD]/20 via-[#F4F9FD]/25 to-[#F4F9FD]/35" />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#0F2537]/15" />
    </div>
  );
}

