"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sun, PhoneCall, CheckCircle2 } from "lucide-react";

interface Section4SunDriedProps {
  onContactOrder: (item: { name: string; category: string; tamilName?: string }) => void;
}

export function Section4SunDried({ onContactOrder }: Section4SunDriedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Mobile-safe parallax drift
  const yWaala = useTransform(scrollYProgress, [0, 1], [60, -50]);
  const yNethili = useTransform(scrollYProgress, [0, 1], [100, -70]);

  return (
    <section
      id="sun-dried-section"
      ref={containerRef}
      className="relative w-full py-20 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#EFEBE2] text-[#14243B] overflow-hidden border-t border-[#D8D5CD]"
    >
      {/* Subtle warm sun-baked ambient glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-amber-100/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#D8D5CD] text-[#7999A5] text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-3.5 shadow-sm">
            <Sun className="w-4 h-4 text-[#14243B]" />
            <span>Artisanal Sea-Breeze Curing</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#14243B] tracking-tight mb-3 sm:mb-4">
            Premium Dry Fish - Sun-cured to perfection.
          </h2>

          <p className="text-[#777873] text-xs sm:text-base font-sans leading-relaxed">
            Prepared with centuries-old coastal Tamil traditions. Hand-rubbed with unrefined Tuticorin
            sea salt crystals and cured on raised coconut mesh beds. 100% free of sand grit and chemicals.
          </p>
        </div>

        {/* 2 Floating Upward Drifting Cards (Waala Karuvadu & Neethile Karuvaadu) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Item 1: Waala Karuvadu (Ribbon Fish) */}
          <motion.div
            style={{ y: yWaala }}
            className="rounded-2xl sm:rounded-[2.5rem] bg-[#FFFDF8] border border-[#D8D5CD] p-6 sm:p-10 shadow-[0_20px_50px_rgba(20,36,59,0.06)] relative group hover:border-[#7999A5] transition-all will-change-transform"
          >
            <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden mb-5 sm:mb-6 shadow-md border border-[#D8D5CD] bg-[#F8F6F0]">
              <img
                src="https://images.unsplash.com/photo-1520635360276-79f3dbd809f6?auto=format&fit=crop&w=1000&q=80"
                alt="Waala Karuvadu"
                className="w-full h-full object-cover object-center filter brightness-[1.01] contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 px-3 py-0.5 rounded-full bg-[#FFFDF8]/95 text-[10px] sm:text-[11px] font-mono font-semibold text-[#14243B] shadow-sm border border-[#D8D5CD]">
                Sun-Cured Ribbon Fish
              </div>
            </div>

            <div className="text-[10px] sm:text-xs font-mono text-[#7999A5] font-semibold tracking-wider uppercase mb-1">
              வாலாக் கருவாடு
            </div>

            <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#14243B] mb-2 sm:mb-3">
              Waala Karuvadu
            </h3>

            <p className="text-[#777873] text-xs sm:text-sm font-sans leading-relaxed mb-5">
              Long, silver-fleshed ribbon fish salted to perfection. Known for its intense savory aroma
              and incredible flavor when simmered in traditional garlic-tamarind kuzhambu.
            </p>

            <div className="space-y-2 mb-6 pt-3 border-t border-[#D8D5CD] text-[11px] sm:text-xs font-mono text-[#14243B]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7999A5]" />
                <span>Zero Chemical Bleach or Powder</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7999A5]" />
                <span>Whole Strips & Portioned Cuts</span>
              </div>
            </div>

            <button
              onClick={() =>
                onContactOrder({
                  name: "Waala Karuvadu",
                  category: "Premium Dry Fish",
                  tamilName: "வாலாக் கருவாடு",
                })
              }
              className="w-full py-3.5 sm:py-4 rounded-full bg-[#14243B] hover:bg-[#7999A5] text-white font-mono text-xs font-bold uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white" />
              <span>Contact to Order Waala Karuvadu</span>
            </button>
          </motion.div>

          {/* Item 2: Neethile Karuvaadu (Dried Anchovies) */}
          <motion.div
            style={{ y: yNethili }}
            className="rounded-2xl sm:rounded-[2.5rem] bg-[#FFFDF8] border border-[#D8D5CD] p-6 sm:p-10 shadow-[0_20px_50px_rgba(20,36,59,0.06)] relative group hover:border-[#7999A5] transition-all will-change-transform md:mt-10"
          >
            <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden mb-5 sm:mb-6 shadow-md border border-[#D8D5CD] bg-[#F8F6F0]">
              <img
                src="https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1000&q=80"
                alt="Nethili Karuvaadu"
                className="w-full h-full object-cover object-center filter brightness-[1.01] contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 px-3 py-0.5 rounded-full bg-[#FFFDF8]/95 text-[10px] sm:text-[11px] font-mono font-semibold text-[#14243B] shadow-sm border border-[#D8D5CD]">
                White Sun-Dried Anchovies
              </div>
            </div>

            <div className="text-[10px] sm:text-xs font-mono text-[#7999A5] font-semibold tracking-wider uppercase mb-1">
              நெத்திலிக் கருவாடு
            </div>

            <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#14243B] mb-2 sm:mb-3">
              Neethile Karuvaadu
            </h3>

            <p className="text-[#777873] text-xs sm:text-sm font-sans leading-relaxed mb-5">
              Carefully trimmed white anchovies, sun-dried on hygienic raised beds. Crisp, crunchy,
              and completely free of beach sand. A beloved pantry essential across Tamil households.
            </p>

            <div className="space-y-2 mb-6 pt-3 border-t border-[#D8D5CD] text-[11px] sm:text-xs font-mono text-[#14243B]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7999A5]" />
                <span>100% Sand-Grit Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7999A5]" />
                <span>Available in 250g, 500g & 5kg Bulk Bags</span>
              </div>
            </div>

            <button
              onClick={() =>
                onContactOrder({
                  name: "Neethile Karuvaadu",
                  category: "Premium Dry Fish",
                  tamilName: "நெத்திலிக் கருவாடு",
                })
              }
              className="w-full py-3.5 sm:py-4 rounded-full bg-[#14243B] hover:bg-[#7999A5] text-white font-mono text-xs font-bold uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white" />
              <span>Contact to Order Neethile Karuvaadu</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
