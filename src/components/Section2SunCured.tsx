"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FishHookLine } from "./FishHookLine";
import { Sun, CheckCircle2, ArrowUpRight } from "lucide-react";

interface Section2SunCuredProps {
  onContactOrder: (item: { name: string; category: string; tamilName?: string }) => void;
}

export function Section2SunCured({ onContactOrder }: Section2SunCuredProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const trayParallaxY = useTransform(scrollYProgress, [0, 1], [30, -20]);
  const textParallaxY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <section
      id="sun-cured-section"
      ref={containerRef}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-10 lg:px-20 bg-[#EFEBE2] text-[#14243B] border-t border-[#D8D5CD] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
        {/* Left Side: Typography + Hook Line */}
        <div className="md:col-span-6 flex items-start gap-4 sm:gap-8 order-2 md:order-1">
          <div className="hidden sm:block pt-2 shrink-0">
            <FishHookLine lineHeight="h-32 sm:h-48" />
          </div>

          <motion.div
            style={{ y: textParallaxY }}
            className="space-y-4 will-change-transform w-full"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFDF8] border border-[#D8D5CD] text-[#C5A880] text-[10px] font-mono uppercase tracking-[0.2em] shadow-2xs font-semibold">
              <Sun className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Centuries-Old Coastal Tradition</span>
            </div>

            <div className="space-y-1">
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#14243B] tracking-tight leading-tight">
                SUN-CURED<br />
                PERFECTION
              </h2>
              <div className="text-xs sm:text-sm font-mono text-[#0D9488] font-semibold">
                Premium Dry Fish — Waala Karuvadu &amp; Neethili Karuvaadu
              </div>
            </div>

            <p className="text-xs sm:text-sm font-sans text-[#777873] leading-relaxed">
              Crafted in Tuticorin &amp; Kasimedu coastal yards. Cured on raised coconut mesh beds under natural salt-laden sea breeze with solar evaporation. 100% free of sand grit, zero chemical bleaching, and no artificial coloring.
            </p>

            <div className="space-y-2 pt-1 text-xs font-mono text-[#14243B]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                <span>Zero Chemical Bleach • Sun-Dried on Raised Coconut Mesh</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                <span>Whole Strips &amp; Portioned Traditional Cuts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                <span>Vacuum-sealed moisture-barrier aroma pouches</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() =>
                  onContactOrder({
                    name: "Waala Karuvadu & Neethili Karuvaadu",
                    category: "Premium Dry Fish",
                    tamilName: "வாலாக் கருவாடு / நெத்திலி கருவாடு",
                  })
                }
                className="px-6 py-2.5 rounded-full border border-[#14243B] bg-transparent hover:bg-[#14243B] hover:text-white text-[#14243B] text-xs font-sans tracking-wider uppercase font-semibold cursor-pointer active:scale-95 transition-all shadow-2xs flex items-center gap-2"
              >
                <span>Order Dry Fish Packs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Authentic Bamboo Tray Showcase (Local High-Res Asset) */}
        <div className="md:col-span-6 flex justify-center md:justify-end order-1 md:order-2">
          <motion.div
            style={{ y: trayParallaxY }}
            className="relative will-change-transform max-w-md w-full"
          >
            {/* Woven Bamboo Tray Container */}
            <div className="relative rounded-3xl overflow-hidden bg-[#FFFDF8] border border-[#D8D5CD] p-3 shadow-[0_20px_45px_rgba(20,36,59,0.08)]">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#EFEBE2]">
                <img
                  src="/reference/sun_cured_trays.png"
                  alt="Sun-cured dry fish Waala Karuvadu and Neethili in traditional woven bamboo trays"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Status Ribbon */}
              <div className="mt-2.5 p-3 rounded-xl bg-[#F8F6F0] border border-[#D8D5CD] flex items-center justify-between text-xs font-mono">
                <span className="text-[#14243B] font-semibold">
                  வாலாக் கருவாடு • நெத்திலி
                </span>
                <span className="text-[#0D9488] font-semibold">
                  Raised Mesh Cured
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
