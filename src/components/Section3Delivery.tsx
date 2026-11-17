"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FishHookLine } from "./FishHookLine";
import { Truck, ShieldCheck, ThermometerSnowflake, Store, MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Section3DeliveryProps {
  onContactClick: () => void;
}

export function Section3Delivery({ onContactClick }: Section3DeliveryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const trayParallaxY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <section
      id="boat-to-business"
      ref={containerRef}
      className="relative w-full py-10 sm:py-16 px-4 sm:px-10 lg:px-20 bg-transparent text-[#0F2537] border-t border-[#D2E4F0]/60 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
        {/* Left Side: Fresh Silver Fish Tray in Fully Transparent Card */}
        <div className="md:col-span-6 flex justify-center md:justify-start">
          <motion.div
            style={{ y: trayParallaxY }}
            className="relative will-change-transform max-w-md w-full"
          >
            <div className="relative group overflow-hidden rounded-[32px] bg-transparent backdrop-blur-md border border-white/30 shadow-[0_20px_45px_rgba(7,21,36,0.1)] hover:shadow-[0_25px_55px_rgba(2,132,199,0.2)] p-3 sm:p-4 transition-all">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-transparent">
                <img
                  src="/reference/fresh_silver_tray.png"
                  alt="Fresh silver ocean catch packed in sub-zero ice slurry for secure dispatch"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="mt-3 p-3.5 rounded-xl bg-transparent backdrop-blur-xs border border-white/25 flex items-center justify-between text-xs font-mono">
                <span className="text-[#0284C7] flex items-center gap-1.5 font-black">
                  <ThermometerSnowflake className="w-3.5 h-3.5 text-[#006A60]" /> -1.5°C Brine Cold Chain
                </span>
                <span className="text-[#006A60] font-black">Direct Harbor Dispatch</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Fully Transparent Clean Information Card */}
        <div className="md:col-span-6 flex items-start justify-between gap-4 sm:gap-8">
          <div className="p-6 sm:p-8 rounded-[32px] bg-transparent backdrop-blur-md border border-white/30 shadow-[0_20px_45px_rgba(7,21,36,0.1)] space-y-3.5 max-w-lg w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-transparent border border-white/30 text-[#0284C7] text-[10px] font-mono uppercase tracking-[0.2em] shadow-xs font-black">
              <Truck className="w-3.5 h-3.5 text-[#006A60]" />
              <span>{t("logisticsPill")}</span>
            </div>

            <div className="space-y-1">
              <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#071524] tracking-tight leading-tight drop-shadow-sm">
                {t("logisticsTitle1")}<br />
                {t("logisticsTitle2")}
              </h2>
            </div>

            <p className="text-xs sm:text-sm font-sans font-bold text-[#071524] tracking-wide leading-relaxed">
              {t("logisticsDesc")}
            </p>

            <div className="space-y-2 pt-1 text-xs font-mono font-bold text-[#071524]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#006A60] shrink-0" />
                <span>{t("sameDayDispatch")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Store className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                <span>{t("wholesaleRates")}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                <span>{t("doorstepDelivery")}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onContactClick}
                className="px-6 py-2.5 rounded-full bg-[#071524] hover:bg-[#0284C7] text-white font-sans text-xs tracking-wider uppercase font-black cursor-pointer active:scale-95 shadow-[0_10px_25px_rgba(7,21,36,0.3)] transition-all flex items-center gap-2"
              >
                <span>{t("contactHarborSupplyBtn")}</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          <div className="hidden sm:block ml-auto pt-2 shrink-0">
            <FishHookLine lineHeight="h-32 sm:h-48" />
          </div>
        </div>
      </div>
    </section>
  );
}
