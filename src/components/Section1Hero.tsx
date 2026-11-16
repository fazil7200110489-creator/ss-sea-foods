"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Anchor, ShieldCheck, Sparkles, Award, ArrowUpRight, ChevronDown } from "lucide-react";
import { FishHookLine } from "./FishHookLine";
import { useLanguage } from "@/context/LanguageContext";

interface Section1HeroProps {
  onContactClick: () => void;
}

export function Section1Hero({ onContactClick }: Section1HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 25]);

  const scrollToVarieties = () => {
    const el = document.getElementById("zoom-varieties") || document.getElementById("seafood-story");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero-harvest"
      ref={containerRef}
      className="relative w-full min-h-[94vh] flex flex-col justify-between pt-24 sm:pt-32 pb-14 sm:pb-20 px-4 sm:px-10 lg:px-20 overflow-hidden bg-transparent text-[#0F2537]"
    >
      {/* 1. Pure Ambient Coastal Sea Breeze Lighting (Zero watermarks, zero text overlaps) */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#E0F2FE]/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#38BDF8]/15 blur-3xl pointer-events-none" />
      <div className="absolute top-32 -left-20 w-80 h-80 rounded-full bg-[#0D9488]/15 blur-3xl pointer-events-none" />

      {/* 2. Top Editorial Header (Clean Headline, High Contrast Readability) */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-8 sm:mb-12 px-2">
        {/* Apple-Style Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-white/70 text-[#0284C7] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] mb-4 shadow-[0_4px_20px_rgba(2,132,199,0.08)] font-semibold">
          <Anchor className="w-3.5 h-3.5 text-[#0D9488]" />
          <span>{t("heroPillTitle")}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
          <span className="text-[#486581] font-sans">{t("heroPillSub")}</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#071524] leading-[1.12] mb-4">
          {t("heroTitle1")}<br />
          {t("heroTitle2")}
        </h1>

        <p className="text-sm sm:text-base md:text-lg font-sans text-[#0B1E32] font-bold tracking-wide leading-relaxed max-w-2xl mx-auto mb-6">
          {t("heroSubtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={scrollToVarieties}
            className="px-7 py-3 rounded-full bg-[#0F2537] hover:bg-[#0284C7] text-white font-sans text-xs tracking-wider uppercase font-semibold cursor-pointer active:scale-95 shadow-[0_10px_25px_rgba(15,37,55,0.25)] transition-all flex items-center gap-2"
          >
            <span>{t("heroCtaVarieties")}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <button
            onClick={onContactClick}
            className="px-7 py-3 rounded-full bg-white/40 hover:bg-white/60 border border-white/50 text-[#0F2537] font-sans text-xs tracking-wider uppercase font-semibold cursor-pointer active:scale-95 shadow-[0_6px_20px_rgba(0,0,0,0.04)] transition-all"
          >
            {t("heroCtaContact")}
          </button>
        </div>
      </div>

      {/* 3. Hero Asymmetric Photographic Spread */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: Fish Platter Composition in Apple-Style Ultra-Transparent Glass Card */}
        <div className="md:col-span-7 flex justify-center md:justify-start">
          <motion.div
            style={{ scale: imageScale, y: imageY }}
            className="relative max-w-lg w-full will-change-transform"
          >
            <div className="relative rounded-[28px] overflow-hidden bg-white/12 backdrop-blur-xl border border-white/40 p-3 shadow-[0_25px_60px_rgba(7,21,36,0.1)]">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white/5">
                <img
                  src="/fish/vanjaram_ice_platter.jpg"
                  alt="Fresh Vanjaram on Crushed Ice Platter"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Status Badge */}
              <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-[10px] sm:text-xs font-mono text-[#071524] font-black flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#006A60] animate-pulse" />
                <span>{t("dawnLandingBadge")}</span>
              </div>

              {/* Info Strip */}
              <div className="mt-3 p-3.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-between">
                <div>
                  <div className="text-[10px] sm:text-xs font-mono text-[#0284C7] uppercase tracking-wider font-extrabold">
                    {t("signatureSpecialtyPill")}
                  </div>
                  <div className="font-serif text-sm sm:text-base text-[#071524] font-black">
                    {t("signatureSpecialtyTitle")}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/30 border border-white/50 text-[#006A60] text-[10px] font-mono font-extrabold shadow-2xs">
                    {t("zeroNetTraumaBadge")}
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Cutout Fish (Desktop Only) */}
            <div className="absolute -bottom-6 -right-4 sm:-right-8 w-44 sm:w-56 pointer-events-none drop-shadow-[0_15px_25px_rgba(2,132,199,0.2)] hidden sm:block">
              <img
                src="/reference/vanjaram_hero.png"
                alt="Vanjaram Seer Fish Cutout"
                className="w-full h-auto object-contain transform -rotate-3"
              />
            </div>
          </motion.div>
        </div>

        {/* Right: Editorial Information in Apple-Style Ultra-Transparent Glass Card */}
        <div className="md:col-span-5 flex items-start justify-between gap-4 sm:gap-6">
          <div className="p-6 sm:p-8 rounded-[28px] bg-white/12 backdrop-blur-xl border border-white/40 shadow-[0_25px_60px_rgba(7,21,36,0.1)] space-y-3.5 w-full">
            <span className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#0284C7] font-extrabold">
              {t("heroFishCategory")}
            </span>

            <div className="space-y-1">
              <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#071524] tracking-tight leading-tight">
                {t("heroFishTitle")}
              </h2>
              <div className="font-serif text-xl sm:text-2xl text-[#0B1E32] font-extrabold">
                {t("heroFishTamil")}
              </div>
              <div className="text-xs sm:text-sm font-mono text-[#0D9488] font-black pt-0.5">
                {t("heroFishOrderNote")}
              </div>
            </div>

            <p className="text-xs sm:text-sm font-sans text-[#071524] font-bold leading-relaxed">
              {t("heroFishDesc")}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onContactClick}
                className="px-6 py-2.5 rounded-full border-2 border-[#071524] bg-white/30 hover:bg-[#071524] hover:text-white text-[#071524] font-sans text-xs tracking-wider uppercase font-extrabold cursor-pointer active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>{t("inquireCatchBtn")}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-[#071524] font-extrabold">
                {t("dailyMorningDispatch")}
              </span>
            </div>
          </div>

          {/* Right edge: Vertical line with hook icon */}
          <div className="hidden sm:block ml-auto pt-2 shrink-0">
            <FishHookLine lineHeight="h-32 sm:h-44" />
          </div>
        </div>
      </div>
    </section>
  );
}
