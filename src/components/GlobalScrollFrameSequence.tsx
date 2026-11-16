"use client";

import React, { useRef, useEffect, useCallback } from "react";

const TOTAL_FRAMES = 301;
const MAX_CONCURRENT_DOWNLOADS = 4;
const MAX_DECODED_IN_MEMORY = 80; // Mobile safety limit: keep max 80 decoded bitmaps in RAM
const FORWARD_PRELOAD_COUNT = 15;
const BACKWARD_PRELOAD_COUNT = 8;

const enum FrameStatus {
  EMPTY = 0,
  LOADING = 1,
  LOADED = 2,
  FAILED = 3,
}

export function GlobalScrollFrameSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const statusRef = useRef<Uint8Array>(new Uint8Array(TOTAL_FRAMES + 1));
  const activeDownloadsRef = useRef<number>(0);
  const priorityQueueRef = useRef<number[]>([]);
  const targetFrameRef = useRef<number>(1);
  const renderedFrameRef = useRef<number>(1);
  const lastDrawnImageRef = useRef<HTMLImageElement | null>(null);
  const scrollDirectionRef = useRef<number>(1); // 1 = down, -1 = up
  const lastScrollYRef = useRef<number>(0);
  const lastDocHeightRef = useRef<number>(0);
  const lastMaxScrollRef = useRef<number>(0);
  const lastProgressRef = useRef<number>(0);
  const isRafActiveRef = useRef<boolean>(false);
  const smoothFrameRef = useRef<number>(1);

  // Helper to format frame path
  const getFrameUrl = useCallback((idx: number) => {
    const padded = String(idx).padStart(4, "0");
    return `/seafood/frames/frame_${padded}.webp`;
  }, []);

  // Direct canvas paint with object-fit: cover
  const renderImageToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    if (canvasWidth === 0 || canvasHeight === 0) return;

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

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastDrawnImageRef.current = img;
  }, []);

  // Update canvas to target frame or nearest loaded fallback
  const updateCanvas = useCallback(
    (targetFrame: number) => {
      // 1. Exact match
      const exactImg = imagesRef.current[targetFrame];
      if (exactImg && statusRef.current[targetFrame] === FrameStatus.LOADED) {
        renderImageToCanvas(exactImg);
        renderedFrameRef.current = targetFrame;
        return;
      }

      // 2. Search outward for nearest loaded frame
      let bestFrame = -1;
      let minDiff = Infinity;

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        if (statusRef.current[i] === FrameStatus.LOADED && imagesRef.current[i]) {
          const diff = Math.abs(i - targetFrame);
          if (diff < minDiff) {
            minDiff = diff;
            bestFrame = i;
            if (diff === 1) break;
          }
        }
      }

      if (bestFrame !== -1 && imagesRef.current[bestFrame]) {
        renderImageToCanvas(imagesRef.current[bestFrame]!);
        renderedFrameRef.current = bestFrame;
      } else if (lastDrawnImageRef.current) {
        renderImageToCanvas(lastDrawnImageRef.current);
      }
    },
    [renderImageToCanvas]
  );

  // Evict frames far away from current viewport to preserve mobile RAM
  const evictDistantFrames = useCallback((centerIdx: number) => {
    let loadedCount = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (statusRef.current[i] === FrameStatus.LOADED) loadedCount++;
    }

    if (loadedCount <= MAX_DECODED_IN_MEMORY) return;

    const candidates: { idx: number; dist: number }[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (statusRef.current[i] === FrameStatus.LOADED) {
        candidates.push({ idx: i, dist: Math.abs(i - centerIdx) });
      }
    }

    // Sort descending by distance
    candidates.sort((a, b) => b.dist - a.dist);

    const countToEvict = loadedCount - MAX_DECODED_IN_MEMORY;
    for (let i = 0; i < countToEvict; i++) {
      const evictIdx = candidates[i].idx;
      // Never evict Frame 1 (hero anchor) or frames within 20 of current view
      if (evictIdx !== 1 && candidates[i].dist > 20) {
        imagesRef.current[evictIdx] = null;
        statusRef.current[evictIdx] = FrameStatus.EMPTY;
      }
    }
  }, []);

  // Process download queue with 4 concurrent connections max
  const pumpQueue = useCallback(() => {
    while (
      activeDownloadsRef.current < MAX_CONCURRENT_DOWNLOADS &&
      priorityQueueRef.current.length > 0
    ) {
      const idx = priorityQueueRef.current.shift()!;
      if (statusRef.current[idx] !== FrameStatus.EMPTY) continue;

      statusRef.current[idx] = FrameStatus.LOADING;
      activeDownloadsRef.current++;

      const img = new Image();
      if ("fetchPriority" in img) {
        const dist = Math.abs(idx - targetFrameRef.current);
        (img as any).fetchPriority = dist <= 4 ? "high" : "low";
      }

      img.src = getFrameUrl(idx);

      const handleLoaded = async (loadedImg: HTMLImageElement) => {
        activeDownloadsRef.current--;

        try {
          if ("decode" in loadedImg) {
            await loadedImg.decode();
          }
        } catch {
          // decode error fallback
        }

        imagesRef.current[idx] = loadedImg;
        statusRef.current[idx] = FrameStatus.LOADED;

        // CRITICAL: Check if this new frame is closer to target than currently rendered frame
        const currentTarget = targetFrameRef.current;
        const currentRendered = renderedFrameRef.current;
        const diffNew = Math.abs(idx - currentTarget);
        const diffCurrent = Math.abs(currentRendered - currentTarget);

        if (diffNew < diffCurrent || idx === currentTarget || idx === 1) {
          renderImageToCanvas(loadedImg);
          renderedFrameRef.current = idx;
        }

        evictDistantFrames(currentTarget);
        pumpQueue();
      };

      img.onload = () => handleLoaded(img);
      img.onerror = () => {
        // Fallback to /sequence/ path
        const fallback = new Image();
        const padded = String(idx).padStart(4, "0");
        fallback.src = `/sequence/frame_${padded}.webp`;
        fallback.onload = () => handleLoaded(fallback);
        fallback.onerror = () => {
          activeDownloadsRef.current--;
          statusRef.current[idx] = FrameStatus.FAILED;
          pumpQueue();
        };
      };
    }
  }, [getFrameUrl, renderImageToCanvas, evictDistantFrames]);

  // Direction-aware lookahead range request
  const requestFrameRange = useCallback(
    (target: number, direction: number) => {
      targetFrameRef.current = target;
      const needed: number[] = [];

      // 1. Exact target frame first
      if (statusRef.current[target] === FrameStatus.EMPTY) {
        needed.push(target);
      }

      // 2. Lookahead frames in scroll direction
      if (direction >= 0) {
        // Scrolling DOWN
        for (let i = 1; i <= FORWARD_PRELOAD_COUNT; i++) {
          const next = target + i;
          if (next <= TOTAL_FRAMES && statusRef.current[next] === FrameStatus.EMPTY) {
            needed.push(next);
          }
        }
        for (let i = 1; i <= BACKWARD_PRELOAD_COUNT; i++) {
          const prev = target - i;
          if (prev >= 1 && statusRef.current[prev] === FrameStatus.EMPTY) {
            needed.push(prev);
          }
        }
      } else {
        // Scrolling UP (Reverse)
        for (let i = 1; i <= FORWARD_PRELOAD_COUNT; i++) {
          const prev = target - i;
          if (prev >= 1 && statusRef.current[prev] === FrameStatus.EMPTY) {
            needed.push(prev);
          }
        }
        for (let i = 1; i <= BACKWARD_PRELOAD_COUNT; i++) {
          const next = target + i;
          if (next <= TOTAL_FRAMES && statusRef.current[next] === FrameStatus.EMPTY) {
            needed.push(next);
          }
        }
      }

      if (needed.length > 0) {
        // Filter out items already in queue and place urgent needed frames at front
        const queueSet = new Set(needed);
        const remainingQueue = priorityQueueRef.current.filter((id) => !queueSet.has(id));
        priorityQueueRef.current = [...needed, ...remainingQueue];
        pumpQueue();
      }
    },
    [pumpQueue]
  );

  // Resize canvas to match screen DPR
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(window.innerWidth * dpr);
    const h = Math.round(window.innerHeight * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      updateCanvas(targetFrameRef.current);
    }
  }, [updateCanvas]);

  // Initial load: Frame 1 immediately, then first buffer
  useEffect(() => {
    let isCancelled = false;

    const img1 = new Image();
    if ("fetchPriority" in img1) {
      (img1 as any).fetchPriority = "high";
    }
    img1.src = getFrameUrl(1);
    statusRef.current[1] = FrameStatus.LOADING;
    activeDownloadsRef.current++;

    const onFrame1Ready = async (f1: HTMLImageElement) => {
      activeDownloadsRef.current--;
      if (isCancelled) return;
      try {
        if ("decode" in f1) await f1.decode();
      } catch {}
      imagesRef.current[1] = f1;
      statusRef.current[1] = FrameStatus.LOADED;
      renderImageToCanvas(f1);
      renderedFrameRef.current = 1;

      // Preload initial buffer (frames 2 to 10)
      requestFrameRange(1, 1);
    };

    img1.onload = () => onFrame1Ready(img1);
    img1.onerror = () => {
      const fb = new Image();
      fb.src = "/sequence/frame_0001.webp";
      fb.onload = () => onFrame1Ready(fb);
      fb.onerror = () => {
        activeDownloadsRef.current--;
        statusRef.current[1] = FrameStatus.FAILED;
      };
    };

    // Idle background progressive loader
    let idleTimer: any = null;
    const scheduleIdleBackground = () => {
      idleTimer = setTimeout(() => {
        if (isCancelled) return;
        if (priorityQueueRef.current.length === 0 && activeDownloadsRef.current === 0) {
          const keyframes: number[] = [];
          for (let i = 10; i <= TOTAL_FRAMES; i += 10) {
            if (statusRef.current[i] === FrameStatus.EMPTY) {
              keyframes.push(i);
            }
          }
          if (keyframes.length > 0) {
            priorityQueueRef.current.push(...keyframes.slice(0, 4));
            pumpQueue();
          }
        }
        scheduleIdleBackground();
      }, 1500);
    };

    scheduleIdleBackground();

    return () => {
      isCancelled = true;
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [getFrameUrl, renderImageToCanvas, requestFrameRange, pumpQueue]);

  // Window resize listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Core Global Scroll Controller
  useEffect(() => {
    let rafId: number;

    const getScrollProgress = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight
      );
      const winHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const maxScroll = Math.max(docHeight - winHeight, 1);
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // Track scroll direction
      const diffY = scrollY - lastScrollYRef.current;
      if (Math.abs(diffY) > 1) {
        scrollDirectionRef.current = diffY >= 0 ? 1 : -1;
        lastScrollYRef.current = scrollY;
      }

      lastDocHeightRef.current = docHeight;
      lastMaxScrollRef.current = maxScroll;
      lastProgressRef.current = progress;

      return progress;
    };

    // Continuous smooth animation loop
    const onTick = () => {
      const progress = getScrollProgress();
      // EXACT MAPPING: frameIndex = Math.round(progress * 300) + 1 (clamped between 1 and 301)
      const targetFrame = Math.min(Math.max(Math.round(progress * (TOTAL_FRAMES - 1)) + 1, 1), TOTAL_FRAMES);

      // Smooth damped lerp between current smooth frame and target frame
      const delta = targetFrame - smoothFrameRef.current;
      if (Math.abs(delta) < 0.05) {
        smoothFrameRef.current = targetFrame;
      } else {
        smoothFrameRef.current += delta * 0.35;
      }

      const activeFrame = Math.round(smoothFrameRef.current);

      if (activeFrame !== renderedFrameRef.current) {
        updateCanvas(activeFrame);
      }

      // If still moving toward target, continue animation loop
      if (Math.abs(targetFrame - smoothFrameRef.current) >= 0.05) {
        rafId = requestAnimationFrame(onTick);
      } else {
        isRafActiveRef.current = false;
      }
    };

    const handleScroll = () => {
      const progress = getScrollProgress();
      const targetFrame = Math.min(Math.max(Math.round(progress * (TOTAL_FRAMES - 1)) + 1, 1), TOTAL_FRAMES);
      targetFrameRef.current = targetFrame;

      // Queue upcoming frames immediately in the active scroll direction
      requestFrameRange(targetFrame, scrollDirectionRef.current);

      // If target frame is already loaded, render it directly on scroll for zero latency
      if (statusRef.current[targetFrame] === FrameStatus.LOADED && imagesRef.current[targetFrame]) {
        renderImageToCanvas(imagesRef.current[targetFrame]!);
        renderedFrameRef.current = targetFrame;
        smoothFrameRef.current = targetFrame;
      }

      // Start smooth animation loop if not active
      if (!isRafActiveRef.current) {
        isRafActiveRef.current = true;
        rafId = requestAnimationFrame(onTick);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    // Expose debug telemetry for testing
    if (typeof window !== "undefined") {
      (window as any).__bgFrameDebug = {
        getStats: () => {
          const currentTarget = targetFrameRef.current;
          const currentRendered = renderedFrameRef.current;
          return {
            scrollY: lastScrollYRef.current,
            docHeight: lastDocHeightRef.current,
            maxScroll: lastMaxScrollRef.current,
            progress: lastProgressRef.current,
            requestedFrame: currentTarget,
            renderedFrame: currentRendered,
            isRequestedLoaded: statusRef.current[currentTarget] === FrameStatus.LOADED,
            loadedCount: Array.from(statusRef.current).filter((s) => s === FrameStatus.LOADED).length,
          };
        },
      };
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [updateCanvas, renderImageToCanvas, requestFrameRange]);

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

      {/* Subtle Atmospheric Overlay - calibrated so video frames are richly visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4F9FD]/20 via-[#F4F9FD]/25 to-[#F4F9FD]/35" />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#0F2537]/15" />
    </div>
  );
}
