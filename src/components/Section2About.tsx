"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Fish, ShieldCheck, Waves, Store, Truck, CheckCircle2 } from "lucide-react";

export function Section2About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Mobile-safe subtle parallax offsets
  const yImage1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yImage2 = useTransform(scrollYProgress, [0, 1], [70, -50]);

  return (
    <section
      id="about-catch"
      ref={containerRef}
      className="relative w-full py-20 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#EFEBE2] text-[#14243B] overflow-hidden border-y border-[#D8D5CD]"
    >
      {/* Background Subtle Water Bubbles */}
      <div className="water-bubble absolute top-[8%] right-[6%] w-20 h-20 opacity-35 pointer-events-none" />
      <div className="water-bubble absolute bottom-[8%] left-[4%] w-16 h-16 opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#D8D5CD] text-[#7999A5] text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-3.5 shadow-sm">
            <Waves className="w-3.5 h-3.5 text-[#14243B]" />
            <span>The Art of the Catch</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#14243B] tracking-tight leading-[1.08] mb-4">
            Purity by Practice. <br />
            <span className="text-[#777873]">Artisanal Ocean Standards.</span>
          </h2>

          <p className="text-[#777873] text-sm sm:text-base font-sans leading-relaxed">
            SSS Sea Foods eliminates industrial trawler crushing and prolonged cold-storage delays.
            From single handline reels to your culinary kitchen, experience untouched cellular firmness
            and clean oceanic sweetness.
          </p>
        </div>

        {/* Asymmetric Photographic & Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-24">
          {/* Overlapping Advertising Seafood Images (7 cols on desktop) */}
          <div className="lg:col-span-7 relative">
            {/* Primary Large Image (Clean seafood on crushed ice) */}
            <motion.div
              style={{ y: yImage1 }}
              className="relative aspect-[16/11] w-full rounded-2xl sm:rounded-[2rem] overflow-hidden bg-[#FFFDF8] border border-[#D8D5CD] shadow-[0_20px_45px_rgba(20,36,59,0.08)] group will-change-transform"
            >
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85"
                alt="Fresh Sankara red snapper on crushed sea ice"
                className="w-full h-full object-cover object-center filter brightness-[1.01] contrast-[1.03] group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 px-3 py-1 rounded-full bg-[#FFFDF8]/95 border border-[#D8D5CD] text-[10px] sm:text-xs font-mono text-[#14243B] font-semibold">
                Single Handline Reeled
              </div>
            </motion.div>

            {/* Secondary Overlapping Image */}
            <motion.div
              style={{ y: yImage2 }}
              className="hidden sm:block absolute -bottom-10 -right-6 w-56 lg:w-64 aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFFDF8] border-2 border-white shadow-2xl group will-change-transform"
            >
              <img
                src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80"
                alt="Expertly cut seafood steaks"
                className="w-full h-full object-cover object-center filter brightness-[1.02] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14243B]/40 via-transparent to-transparent opacity-50" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-[10px] sm:text-[11px] font-mono">
                Portioned to Order
              </div>
            </motion.div>
          </div>

          {/* Pillars 1 & 2 Cards (5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            {/* Pillar 1: 100% Live-Hooked Fishes */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FFFDF8] border border-[#D8D5CD] shadow-[0_15px_35px_rgba(20,36,59,0.03)]">
              <div className="w-11 h-11 rounded-xl bg-[#F8F6F0] border border-[#D8D5CD] text-[#14243B] flex items-center justify-center mb-4 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#7999A5]" />
              </div>

              <div className="text-[10px] sm:text-xs font-mono text-[#7999A5] uppercase tracking-wider mb-1.5 font-semibold">
                Ethical Angling
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#14243B] mb-2.5 leading-snug">
                100% Live-Hooked Fishes.
              </h3>

              <p className="text-[#777873] text-xs sm:text-sm font-sans leading-relaxed mb-4">
                Reeled individually with braided monofilament lines. Eliminates trawler net crushing,
                internal blood rupture, and stress acid buildup, ensuring pristine firmness.
              </p>

              <div className="pt-3 border-t border-[#D8D5CD]/60 flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#14243B]">
                <CheckCircle2 className="w-4 h-4 text-[#7999A5]" />
                <span>Zero Net Trauma • Intact Firm Flesh</span>
              </div>
            </div>

            {/* Pillar 2: Specialized in all sizes of Vanjaram */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FFFDF8] border border-[#D8D5CD] shadow-[0_15px_35px_rgba(20,36,59,0.03)]">
              <div className="w-11 h-11 rounded-xl bg-[#F8F6F0] border border-[#D8D5CD] text-[#14243B] flex items-center justify-center mb-4 shadow-sm">
                <Fish className="w-5 h-5 text-[#14243B]" />
              </div>

              <div className="text-[10px] sm:text-xs font-mono text-[#7999A5] uppercase tracking-wider mb-1.5 font-semibold">
                Signature Reserve
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#14243B] mb-2.5 leading-snug">
                Specialized in all sizes of Vanjaram.
              </h3>

              <p className="text-[#777873] text-xs sm:text-sm font-sans leading-relaxed mb-4">
                From 1.5kg tender table steaks to giant 8kg+ King Seer banquet cuts. Dense white steaks
                with rich natural oils that hold marinades and stay juicy when pan-roasted.
              </p>

              <div className="pt-3 border-t border-[#D8D5CD]/60 flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#14243B]">
                <CheckCircle2 className="w-4 h-4 text-[#7999A5]" />
                <span>Table Cuts to 8kg+ King Seer Fish</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars 3 & 4: Two Editorial Advertising Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Pillar 3 */}
          <div className="p-6 sm:p-9 rounded-2xl sm:rounded-3xl bg-[#FFFDF8] border border-[#D8D5CD] shadow-[0_15px_35px_rgba(20,36,59,0.03)] flex flex-col justify-between group hover:border-[#7999A5] transition-colors">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#F8F6F0] border border-[#D8D5CD] text-[#14243B] flex items-center justify-center mb-4">
                <Store className="w-5 h-5 text-[#14243B]" />
              </div>

              <div className="text-[10px] sm:text-xs font-mono text-[#7999A5] uppercase tracking-wider mb-1.5 font-semibold">
                Hospitality & Catering Supply
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#14243B] mb-2.5">
                Trusted supplier for restaurants, stalls, and custom bulk orders.
              </h3>

              <p className="text-[#777873] text-xs sm:text-sm font-sans leading-relaxed mb-5">
                Supplying premier coastal dining establishments, street seafood stalls, catering banquets,
                and custom household orders. We provide honest wholesale pricing and uniform weight count grading.
              </p>
            </div>

            <div className="pt-3.5 border-t border-[#D8D5CD] flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#14243B]">
              <CheckCircle2 className="w-4 h-4 text-[#7999A5]" />
              <span>Wholesale Direct Harbor Rates • Uniform Count Grading</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 sm:p-9 rounded-2xl sm:rounded-3xl bg-[#FFFDF8] border border-[#D8D5CD] shadow-[0_15px_35px_rgba(20,36,59,0.03)] flex flex-col justify-between group hover:border-[#7999A5] transition-colors">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#F8F6F0] border border-[#D8D5CD] text-[#14243B] flex items-center justify-center mb-4">
                <Truck className="w-5 h-5 text-[#7999A5]" />
              </div>

              <div className="text-[10px] sm:text-xs font-mono text-[#7999A5] uppercase tracking-wider mb-1.5 font-semibold">
                Statewide Cold Chain
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#14243B] mb-2.5">
                Reliable district-to-district fresh delivery.
              </h3>

              <p className="text-[#777873] text-xs sm:text-sm font-sans leading-relaxed mb-5">
                Packed in sterile, insulated thermal ice crates with sub-zero brine slurry. Delivering
                across all Tamil Nadu districts with guaranteed temperature logs and morning arrivals.
              </p>
            </div>

            <div className="pt-3.5 border-t border-[#D8D5CD] flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#14243B]">
              <CheckCircle2 className="w-4 h-4 text-[#7999A5]" />
              <span>Sub-Zero Slurry Packed • All Tamil Nadu Districts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
