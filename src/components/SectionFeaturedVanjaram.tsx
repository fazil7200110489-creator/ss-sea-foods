"use client";

import React from "react";
import { ContactModalItem } from "./ContactOrderModal";
import { ShieldCheck, Sparkles, CheckCircle2, ArrowUpRight } from "lucide-react";
import { FishHookLine } from "./FishHookLine";

interface SectionFeaturedVanjaramProps {
  onContactOrder: (item: ContactModalItem) => void;
}

export function SectionFeaturedVanjaram({ onContactOrder }: SectionFeaturedVanjaramProps) {
  return (
    <section
      id="featured-vanjaram"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-10 lg:px-20 bg-[#FFFDF8] text-[#14243B] border-t border-[#D8D5CD] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial Advertising Spread (2-Column Asymmetric Composition) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Overlapping Photographic Composition */}
          <div className="lg:col-span-7">
            <div className="relative">
              {/* Primary Photo: Artisan Chef Slicing Vanjaram Steaks */}
              <div className="relative rounded-3xl overflow-hidden bg-[#F8F6F0] border border-[#D8D5CD] p-2.5 shadow-[0_20px_45px_rgba(20,36,59,0.08)]">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden">
                  <img
                    src="/fish/vanjaram_cutting.jpg"
                    alt="Master harbor cutter slicing Vanjaram steaks with razor precision"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#FFFDF8]/95 border border-[#D8D5CD] text-[10px] font-mono font-semibold text-[#1E3A5F]">
                    Artisan Center-Cut Steaks
                  </div>
                </div>

                {/* Sub-strip with live catch stats */}
                <div className="mt-2.5 p-3 rounded-xl bg-[#F8F6F0] border border-[#D8D5CD] grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-[10px] font-mono text-[#777873] uppercase">Weight Range</div>
                    <div className="font-serif text-sm font-bold text-[#14243B]">1kg to 8kg+</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#777873] uppercase">Preservation</div>
                    <div className="font-serif text-sm font-bold text-[#0D9488]">-1.5°C Slurry</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#777873] uppercase">Bloodline</div>
                    <div className="font-serif text-sm font-bold text-[#14243B]">100% Intact</div>
                  </div>
                </div>
              </div>

              {/* Overlapping Floating Frame: Whole Vanjaram on Crushed Ice */}
              <div className="absolute -bottom-8 -left-4 sm:-left-8 w-48 sm:w-64 rounded-2xl overflow-hidden bg-white border border-[#D8D5CD] p-1.5 shadow-[0_20px_40px_rgba(20,36,59,0.14)] hidden sm:block">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src="/fish/vanjaram_ice_platter.jpg"
                    alt="Whole Vanjaram on Crushed Ice"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 text-center text-[10px] font-mono text-[#1E3A5F] font-semibold">
                  Dawn Harbor Harvest
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Typography & Detailed Specs */}
          <div className="lg:col-span-5 flex items-start justify-between gap-4">
            <div className="space-y-4 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F6F0] border border-[#D8D5CD] text-[10px] font-mono uppercase tracking-[0.2em] text-[#1E3A5F] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>SIGNATURE SPECIALTY HARVEST</span>
              </div>

              <div className="space-y-1">
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#14243B] tracking-tight leading-tight">
                  The King of Deep Waters — Vanjaram
                </h2>
                <div className="text-sm font-mono text-[#0D9488] font-semibold">
                  வஞ்சிரம் / நெய்மீன் (King Seer Fish)
                </div>
              </div>

              <p className="text-xs sm:text-sm font-sans text-[#777873] leading-relaxed">
                Reeled exclusively by single handline from Kasimedu deep oceanic waters. Because no nets are used, the fish experiences zero crushing trauma, maintaining firm crystalline white flakes, pristine silvery skin, and unbroken natural bloodlines.
              </p>

              {/* Specification Checklist */}
              <div className="space-y-2 pt-1 text-xs font-mono text-[#14243B]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                  <span>Single Handline Catch • Zero Trawler Net Damage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                  <span>Available in all sizes from 1kg table fish to 8kg+ banquet giants</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                  <span>Custom sliced on demand: Center-cut steaks, fillets, or whole</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                  <span>Chilled in sterile maritime ice slurry for maximum sweetness</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() =>
                    onContactOrder({
                      name: "Vanjaram (Seer Fish) - All Sizes",
                      category: "Signature Harvest",
                      tamilName: "வஞ்சிரம் / நெய்மீன்",
                    })
                  }
                  className="px-6 py-2.5 rounded-full bg-[#14243B] hover:bg-[#0A1A2E] text-white font-sans text-xs tracking-wider uppercase font-semibold cursor-pointer active:scale-95 shadow-md transition-all flex items-center gap-2"
                >
                  <span>Reserve Your Vanjaram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-[#777873]">
                  Direct Wholesale &amp; Custom Orders
                </span>
              </div>
            </div>

            {/* Vertical Hook Line Accent */}
            <div className="hidden sm:block ml-auto pt-2 shrink-0">
              <FishHookLine lineHeight="h-32 sm:h-48" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

