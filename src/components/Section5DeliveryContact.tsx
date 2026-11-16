"use client";

import React from "react";
import { Store, Truck, Phone, MessageSquare, MapPin, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

interface Section5DeliveryContactProps {
  onContactClick: () => void;
}

export function Section5DeliveryContact({ onContactClick }: Section5DeliveryContactProps) {
  return (
    <section
      id="contact-delivery"
      className="relative w-full py-20 sm:py-32 px-4 sm:px-8 lg:px-12 bg-ocean-caustics text-[#14243B] overflow-hidden border-t border-[#D8D5CD]"
    >
      {/* Floating Soft Water Bubbles */}
      <div className="water-bubble absolute top-[12%] left-[6%] w-16 h-16 sm:w-24 sm:h-24 opacity-35 pointer-events-none" />
      <div className="water-bubble absolute bottom-[12%] right-[8%] w-20 h-20 sm:w-28 sm:h-28 opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#D8D5CD] text-[#7999A5] text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-3.5 shadow-sm">
            <Truck className="w-4 h-4 text-[#14243B]" />
            <span>Statewide Direct Cold Chain</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#14243B] tracking-tight mb-3 sm:mb-4">
            Reliable Harbor-to-Kitchen Supply
          </h2>

          <p className="text-[#777873] text-xs sm:text-base font-sans leading-relaxed">
            Eliminating delayed storage centers and middleman markups. From the sea boats of Kasimedu
            directly to your kitchen table or restaurant station.
          </p>
        </div>

        {/* Dual Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Card 1: Restaurants, Stalls & Custom Orders */}
          <div className="p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] bg-[#FFFDF8] border border-[#D8D5CD] shadow-[0_20px_45px_rgba(20,36,59,0.04)] flex flex-col justify-between group hover:border-[#7999A5] transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F8F6F0] border border-[#D8D5CD] text-[#14243B] flex items-center justify-center mb-4 sm:mb-5 shadow-sm">
                <Store className="w-6 h-6 text-[#14243B]" />
              </div>

              <div className="text-[10px] sm:text-xs font-mono text-[#7999A5] uppercase tracking-wider mb-1.5 font-semibold">
                Wholesale & Hospitality
              </div>

              <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#14243B] mb-3">
                Restaurants, Stalls & Custom Orders
              </h3>

              <p className="text-[#777873] text-xs sm:text-sm font-sans leading-relaxed mb-5">
                Supplying premier seafood restaurants, street food stalls, catering banquets, and
                custom household orders. Guaranteed weight counts, zero ice dilution, and daily dawn dispatches.
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-[#D8D5CD] text-[11px] sm:text-xs font-mono text-[#14243B]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7999A5]" />
                <span>Uniform Size & Count Grading</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7999A5]" />
                <span>Wholesale Direct Harbor Rates</span>
              </div>
            </div>
          </div>

          {/* Card 2: District-to-District Secure Delivery */}
          <div className="p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] bg-[#FFFDF8] border border-[#D8D5CD] shadow-[0_20px_45px_rgba(20,36,59,0.04)] flex flex-col justify-between group hover:border-[#7999A5] transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F8F6F0] border border-[#D8D5CD] text-[#14243B] flex items-center justify-center mb-4 sm:mb-5 shadow-sm">
                <Truck className="w-6 h-6 text-[#7999A5]" />
              </div>

              <div className="text-[10px] sm:text-xs font-mono text-[#7999A5] uppercase tracking-wider mb-1.5 font-semibold">
                Statewide Cold Logistics
              </div>

              <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#14243B] mb-3">
                District-to-District Secure Delivery
              </h3>

              <p className="text-[#777873] text-xs sm:text-sm font-sans leading-relaxed mb-5">
                Packed in sterile, insulated thermal ice crates with sub-zero brine slurry. Delivering
                across all Tamil Nadu districts including Chennai, Coimbatore, Madurai, Salem, Trichy, and beyond.
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-[#D8D5CD] text-[11px] sm:text-xs font-mono text-[#14243B]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7999A5]" />
                <span>Insulated Thermal Ice Crate Packaging</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7999A5]" />
                <span>Same-Day & Early Dawn Arrival Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Large Modern Primary Action Callout */}
        <div className="rounded-2xl sm:rounded-[2.5rem] bg-[#FFFDF8] border border-[#D8D5CD] p-6 sm:p-12 shadow-[0_25px_60px_rgba(20,36,59,0.06)] text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#7999A5] uppercase tracking-wider mb-2 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#14243B]" />
            <span>Ready for Today&apos;s Fresh Catch?</span>
          </div>

          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#14243B] mb-3">
            Partner with SSS Sea Foods
          </h3>

          <p className="text-[#777873] text-xs sm:text-sm max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Whether you need a single 8kg giant Vanjaram for a family celebration or 50kg daily restaurant
            supplies, our Kasimedu harbor team is ready.
          </p>

          <button
            onClick={onContactClick}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#14243B] hover:bg-[#7999A5] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-widest active:scale-95 transition-all duration-300 shadow-[0_15px_35px_rgba(20,36,59,0.18)] flex items-center justify-center gap-3 group"
          >
            <span>Contact for Supply</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
