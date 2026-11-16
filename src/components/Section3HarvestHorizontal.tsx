"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PhoneCall, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

interface Section3HarvestHorizontalProps {
  onContactOrder: (item: { name: string; category: string; tamilName?: string }) => void;
}

export function Section3HarvestHorizontal({ onContactOrder }: Section3HarvestHorizontalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform vertical progress 0 -> 1 into horizontal shift 0% -> -75%
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const slides = [
    {
      num: "01",
      title: "Vanjaram (Seer Fish)",
      tamilName: "வஞ்சிரம் / நெய்மீன்",
      subline: "Pre-ordered & Custom Cut to Perfection",
      description:
        "The undisputed crown jewel of South Indian waters. Reeled live on single lines. We supply all sizes—from 1.5kg tender table cuts to colossal 8kg+ King Seer fish, portioned to exact steak thickness.",
      image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=1200&q=85",
      secondaryImage: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
      highlights: ["Specialised in All Sizes (1kg–8kg+)", "Pre-ordered & Custom Cut", "High Natural Omega Oil"],
      tag: "Signature Catch",
      tastingNotes: "Dense, juicy steaks that hold marinades without breaking; perfect for tawa fry & fish curry.",
    },
    {
      num: "02",
      title: "Sankara & Kadavaral",
      tamilName: "சங்கரா & கடவரால் (Red Snapper & Rock Cod)",
      subline: "Reef Hook Catches. Crisp Skin & Succulent Flakes.",
      description:
        "Harvested from natural coral reef drop-offs. Sankara offers delicate rose-crimson skin that crisps in the skillet, while Kadavaral (Grouper) yields dense, gelatinous chunks that make unforgettable fish curries.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85",
      secondaryImage: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
      highlights: ["Coral Reef Handline Reeled", "Tender White Sweet Meat", "Uniform Hotel Grading"],
      tag: "Reef Hook Catch",
      tastingNotes: "Moist, sweet, nutty undertones; gelatinous head portions ideal for authentic fish curry.",
    },
    {
      num: "03",
      title: "Soora, Ayila & Mathi",
      tamilName: "சூரை, அயிலா & மத்தி (Tuna, Mackerel & Sardines)",
      subline: "Pelagic Powerhouses. Rich in Natural Omega-3.",
      description:
        "Reeled at dawn off continental trenches. Yellowfin Tuna brings ruby-red protein steaks, while Indian Mackerel and oil sardines offer deep ocean savoriness and healthy omega fats for daily dining.",
      image: "https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?auto=format&fit=crop&w=1200&q=85",
      secondaryImage: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=600&q=80",
      highlights: ["Pure Ruby-Red Tuna Loins", "High Calcium & DHA Density", "Daily Morning Shore Landings"],
      tag: "High Omega-3 Haul",
      tastingNotes: "Robust ocean savoriness, tender bone-melt center, exceptional for traditional shallow fries.",
    },
    {
      num: "04",
      title: "Premium Catch: Prawn, Squid, Lobster, Kelithi, Nethili",
      tamilName: "இறால், கணவா, லாப்ஸ்டர், கெளுத்தி, நெத்திலி",
      subline: "Wild Shellfish & Heritage Coastal Catches.",
      description:
        "A grand assortment of coastal treasures: extra-jumbo wild tiger prawns, tender kanava calamari tubes, spiny rock lobster, dense boneless sea catfish (Kelithi), and sparkling silver white anchovies (Nethili).",
      image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=85",
      secondaryImage: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80",
      highlights: ["Wild Saline Snap Prawns", "Tender Calamari Rings", "Luxury Spiny Lobster"],
      tag: "Grand Coastal Reserve",
      tastingNotes: "Naturally sweet, crisp snap, rich buttery lobster claws and crispy silver anchovies.",
    },
  ];

  return (
    <section
      id="harvest-showcase"
      ref={containerRef}
      className="relative w-full bg-[#F8F6F0] text-[#14243B]"
      style={{ height: "400vh" }}
    >
      {/* Pinned 100svh Viewport */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between py-4 sm:py-8">
        {/* Top Header Bar */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between pb-3 sm:pb-4 border-b border-[#D8D5CD]">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[10px] sm:text-xs font-mono text-[#7999A5] font-bold tracking-widest uppercase">
              SECTION 03
            </span>
            <span className="text-[#D8D5CD]">•</span>
            <h2 className="text-base sm:text-2xl font-serif font-bold text-[#14243B]">
              Today&apos;s Harvest
            </h2>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-[#777873]">
            <span className="hidden sm:inline">Scroll to explore</span>
            <span className="sm:hidden">Swipe / Scroll</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#7999A5] animate-pulse" />
          </div>
        </div>

        {/* Horizontal Moving Reel */}
        <div className="relative flex-1 w-full overflow-hidden flex items-center my-auto">
          <motion.div
            style={{ x }}
            className="flex h-full items-center will-change-transform"
          >
            {slides.map((slide) => (
              <div
                key={slide.num}
                className="w-screen min-w-[100vw] h-full flex items-center justify-center px-4 sm:px-10 lg:px-16"
              >
                {/* Mobile-First Frosted Pearl White Card */}
                <div className="relative max-w-5xl w-full max-h-[82svh] overflow-y-auto lg:overflow-visible bg-[#FFFDF8] border border-[#D8D5CD] rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(20,36,59,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center">
                  {/* Floating Water Bubble Assets */}
                  <div className="water-bubble absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 opacity-40 pointer-events-none" />

                  {/* Giant Editorial Number in Background */}
                  <div className="absolute top-2 right-4 sm:right-8 font-serif font-black text-6xl sm:text-8xl lg:text-9xl text-[#14243B]/5 select-none pointer-events-none">
                    {slide.num}
                  </div>

                  {/* Image Column (12 cols on mobile, 6 on desktop) */}
                  <div className="lg:col-span-6 relative">
                    <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#EFEBE2] border border-[#D8D5CD] shadow-md group">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center filter brightness-[1.01] contrast-[1.03] group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14243B]/35 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Secondary Overlapping Thumbnail on Tablet/Desktop */}
                    <div className="hidden md:block absolute -bottom-4 -right-4 w-36 aspect-[4/3] rounded-xl overflow-hidden bg-[#FFFDF8] border-2 border-white shadow-xl group">
                      <img
                        src={slide.secondaryImage}
                        alt="Seafood detail"
                        className="w-full h-full object-cover object-center filter brightness-[1.02]"
                      />
                    </div>

                    {/* Top Tag Badge */}
                    <div className="absolute top-3 left-3 z-10 px-3 py-0.5 rounded-full bg-[#FFFDF8]/95 backdrop-blur-md border border-[#D8D5CD] text-[10px] font-mono text-[#14243B] font-semibold shadow-sm">
                      {slide.tag}
                    </div>
                  </div>

                  {/* Typography & Actions Column */}
                  <div className="lg:col-span-6 space-y-3 sm:space-y-4 relative z-10">
                    <div>
                      <div className="text-[10px] sm:text-xs font-mono text-[#7999A5] font-semibold tracking-wider uppercase mb-0.5">
                        {slide.tamilName}
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#14243B] tracking-tight leading-tight">
                        {slide.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-serif italic text-[#777873] mt-0.5">
                        {slide.subline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm font-sans text-[#777873] leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {slide.description}
                    </p>

                    {/* Tasting Profile Card */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#F8F6F0] border border-[#D8D5CD] text-[11px] sm:text-xs font-mono text-[#14243B]">
                      <span className="font-bold text-[#7999A5]">TASTE: </span>
                      <span>{slide.tastingNotes}</span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-1 border-t border-[#D8D5CD]">
                      {slide.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#14243B]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#7999A5] flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Touch-Friendly Action Button */}
                    <div className="pt-2">
                      <button
                        onClick={() =>
                          onContactOrder({
                            name: slide.title,
                            category: "Fresh Catch",
                            tamilName: slide.tamilName,
                          })
                        }
                        className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#14243B] hover:bg-[#7999A5] text-white font-mono text-xs font-bold uppercase tracking-wider active:scale-95 transition-all shadow-[0_10px_25px_rgba(20,36,59,0.12)] flex items-center justify-center gap-2"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-white" />
                        <span>Contact to Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12">
          <div className="w-full h-1 bg-[#D8D5CD] rounded-full overflow-hidden">
            <motion.div
              style={{
                scaleX: scrollYProgress,
                transformOrigin: "left",
              }}
              className="h-full bg-[#14243B] rounded-full"
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#777873] mt-1.5">
            <span>01 VANJARAM (SEER FISH)</span>
            <span>04 SHELLFISH & HERITAGE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
