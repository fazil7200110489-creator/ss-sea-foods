"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Anchor, Sparkles, ChevronDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ZoomParallaxProps {
  onSelectVariety?: (name: string) => void;
}

const VARIETIES = [
  { id: "vanjaram", number: "01", nameEn: "Vanjaram", nameTa: "வஞ்சிரம்", tamil: "வஞ்சிரம் / நெய்மீன்", english: "King Seer Fish", tagEn: "Signature Specialty", tagTa: "சிறப்பு வகை" },
  { id: "sankara", number: "02", nameEn: "Sankara", nameTa: "சங்கரா", tamil: "சங்கரா மீன்", english: "Coral Red Snapper", tagEn: "Reef Hook Catch", tagTa: "பவளப்பாறை தூண்டில்" },
  { id: "kadalvaral", number: "03", nameEn: "Kadalvaral", nameTa: "கடவரால்", tamil: "கடவரால் மீன்", english: "Rock Cod / Grouper", tagEn: "Deep Water Catch", tagTa: "ஆழ்கடல் வகை" },
  { id: "soora", number: "04", nameEn: "Soora", nameTa: "சூரை", tamil: "சூரை மீன்", english: "Yellowfin Tuna", tagEn: "Dawn Pelagic Hook", tagTa: "அதிகாலை தூண்டில்" },
  { id: "prawns", number: "05", nameEn: "Prawns", nameTa: "கடல் இறால்", tamil: "கடல் இறால்", english: "Wild Sea Prawns", tagEn: "Saline Snap", tagTa: "இயற்கை கடல் இறால்" },
  { id: "squid", number: "06", nameEn: "Squid", nameTa: "கணவா", tamil: "கணவா மீன்", english: "Fresh Calamari", tagEn: "Tender Tubes & Rings", tagTa: "மென்மையான கணவா" },
  { id: "kelithee", number: "07", nameEn: "Kelithee", nameTa: "கெளுத்தி", tamil: "கெளுத்தி மீன்", english: "Sea Catfish", tagEn: "Rich Flavor Density", tagTa: "சுவைமிகு கெளுத்தி" },
  { id: "nethili", number: "08", nameEn: "Nethili", nameTa: "நெத்திலி", tamil: "நெத்திலி மீன்", english: "White Anchovies", tagEn: "Pristine Silver Shore", tagTa: "வெள்ளி நெத்திலி" },
  { id: "ayila", number: "09", nameEn: "Ayila", nameTa: "அயிலை", tamil: "அயிலை / அயிரை", english: "Indian Mackerel", tagEn: "Omega-Rich Coastal", tagTa: "ஒமேகா சத்து வகை" },
  { id: "vaala-karuvadu", number: "10", nameEn: "Vaala Karuvadu", nameTa: "வாலாக் கருவாடு", tamil: "வாலாக் கருவாடு", english: "Sun-Cured Ribbon Fish", tagEn: "Artisanal Raised Mesh", tagTa: "தூய உலர்ந்த கருவாடு" },
  { id: "lobster", number: "11", nameEn: "Lobster", nameTa: "சிங்க இறால்", tamil: "சிங்க இறால் / லாப்ஸ்டர்", english: "Spiny Rock Lobster", tagEn: "Luxury Banquet Grade", tagTa: "உயர் விருந்து வகை" },
];

export function ZoomParallax({ onSelectVariety }: ZoomParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const { language, t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Balanced, smooth zoom scales without sudden jumps or blank gaps
  const scale1 = useTransform(scrollYProgress, [0, 0.88], [1, 2.4]);
  const scale2 = useTransform(scrollYProgress, [0, 0.88], [1, 2.9]);
  const scale3 = useTransform(scrollYProgress, [0, 0.88], [1, 3.3]);
  const scale4 = useTransform(scrollYProgress, [0, 0.88], [1, 3.7]);
  const scale5 = useTransform(scrollYProgress, [0, 0.88], [1, 4.0]);

  // Smooth opacity to keep visual connection without empty voids
  const stageOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.95, 0.35]);

  // Update active variety dynamically as user scrubs through zoom parallax
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const idx = Math.min(Math.floor(latest * VARIETIES.length), VARIETIES.length - 1);
      setActiveIdx(idx);
    });
  }, [scrollYProgress]);

  // 7 Zoom Image Layers with balanced responsive offsets framing the central card
  const pictures = [
    {
      src: "/fish/vanjaram_ice_platter.jpg",
      scale: scale1,
      alt: "Vanjaram Seer Fish on Crushed Ice",
      classes: "w-[58vw] sm:w-[26vw] h-[26vh] sm:h-[30vh]",
    },
    {
      src: "/fish/sankara.png",
      scale: scale2,
      alt: "Sankara Red Snapper",
      classes: "top-[-18vh] sm:top-[-26vh] left-[18vw] sm:left-[22vw] w-[40vw] sm:w-[22vw] h-[20vh] sm:h-[26vh]",
    },
    {
      src: "/fish/boat_landing_catch.jpg",
      scale: scale3,
      alt: "Harbour Dawn Landing",
      classes: "top-[-16vh] sm:top-[-22vh] left-[-20vw] sm:left-[-24vw] w-[38vw] sm:w-[20vw] h-[22vh] sm:h-[28vh]",
    },
    {
      src: "/fish/fresh_steaks_ice.jpg",
      scale: scale2,
      alt: "Yellowfin Tuna Steaks on Ice",
      classes: "top-[2vh] sm:top-[0vh] left-[26vw] sm:left-[28vw] w-[36vw] sm:w-[20vw] h-[18vh] sm:h-[24vh]",
    },
    {
      src: "/fish/vanjaram_cutting.jpg",
      scale: scale3,
      alt: "Master Slicing Steaks",
      classes: "top-[4vh] sm:top-[2vh] left-[-26vw] sm:left-[-28vw] w-[36vw] sm:w-[20vw] h-[18vh] sm:h-[24vh]",
    },
    {
      src: "/reference/fresh_silver_tray.png",
      scale: scale4,
      alt: "Fresh Silver Ocean Catch",
      classes: "top-[20vh] sm:top-[25vh] left-[-16vw] sm:left-[-18vw] w-[40vw] sm:w-[22vw] h-[18vh] sm:h-[24vh]",
    },
    {
      src: "/reference/sun_cured_trays.png",
      scale: scale5,
      alt: "Sun Cured Karuvadu Trays",
      classes: "top-[18vh] sm:top-[23vh] left-[18vw] sm:left-[20vw] w-[42vw] sm:w-[24vw] h-[20vh] sm:h-[24vh]",
    },
  ];

  const currentVariety = VARIETIES[activeIdx];

  const scrollToDetail = (id: string) => {
    const el = document.getElementById(`detail-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="zoom-varieties"
      ref={containerRef}
      // Compact height eliminates vast empty scroll space (130vh mobile, 170vh desktop)
      className="relative h-[135vh] sm:h-[175vh] bg-transparent text-[#0F2537]"
    >
      {/* Sticky Fullscreen Stage (Efferd 21st.dev Architecture) */}
      <motion.div
        style={{ opacity: stageOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none"
      >
        {/* Soft Ambient Radial Light Sea Glow */}
        <div className="absolute inset-0 bg-radial from-[#E0F2FE]/15 via-transparent to-transparent pointer-events-none" />

        {/* 7 Zoom Layers Scaling Dynamically with Scroll */}
        {pictures.map(({ src, scale, alt, classes }, index) => (
          <motion.div
            key={index}
            style={{ scale }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none will-change-transform"
          >
            <div
              className={`relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_15px_35px_rgba(7,21,36,0.12)] border border-white/40 bg-transparent backdrop-blur-xs ${classes}`}
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071524]/25 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        ))}

        {/* Top Header Label - Fully Transparent */}
        <div className="absolute top-20 sm:top-24 left-4 right-4 sm:left-10 sm:right-10 z-30 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-transparent backdrop-blur-md border border-white/30 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#0284C7] shadow-xs font-black">
            <Sparkles className="w-3.5 h-3.5 text-[#006A60]" />
            <span>{t("zoomBadge")}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-transparent backdrop-blur-md border border-white/30 text-[10px] sm:text-xs font-mono text-[#071524] shadow-xs font-black">
            <span className="text-[#0284C7]">{t("zoomVarietyBadge")}</span>
            <span className="font-black">{currentVariety.number} / {VARIETIES.length}</span>
          </div>
        </div>

        {/* PROMINENT CENTRAL TYPOGRAPHY — FULLY TRANSPARENT CLEAN GLASS CARD */}
        <div className="relative z-30 max-w-lg w-full px-4 text-center pointer-events-auto">
          <div className="rounded-[28px] bg-transparent backdrop-blur-sm border border-white/35 p-5 sm:p-7 shadow-[0_20px_45px_rgba(7,21,36,0.1)] space-y-3">
            {/* Category tag & Number */}
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-transparent border border-white/30 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#0284C7] font-black shadow-xs">
              <Anchor className="w-3.5 h-3.5 text-[#006A60]" />
              <span>
                {language === "ta" ? currentVariety.tagTa : currentVariety.tagEn} • {currentVariety.number}
              </span>
            </div>

            {/* Giant Centered Headline with High Contrast Readability */}
            <div>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-[#071524] tracking-tight leading-tight transition-all duration-300 drop-shadow-xs">
                {language === "ta" ? currentVariety.nameTa : currentVariety.nameEn}
              </h2>

              <div className="font-serif text-base sm:text-xl text-[#0B1E32] mt-0.5 font-black">
                ({currentVariety.english})
              </div>

              <div className="text-xs sm:text-sm font-mono text-[#006A60] font-black mt-0.5">
                {currentVariety.tamil}
              </div>
            </div>

            {/* Quick Navigation Pills Across All 11 Varieties - Clean & Mobile Horizontal Scroll */}
            <div className="pt-2 border-t border-white/20 flex flex-nowrap overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-1.5 py-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {VARIETIES.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => scrollToDetail(v.id)}
                  className={`shrink-0 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-black transition-all cursor-pointer ${
                    activeIdx === i
                      ? "bg-[#071524] text-white shadow-sm scale-105"
                      : "bg-transparent backdrop-blur-xs text-[#071524] hover:text-[#0284C7] hover:bg-white/20 border border-white/25"
                  }`}
                >
                  {language === "ta" ? v.nameTa : v.nameEn}
                </button>
              ))}
            </div>

            {/* CTA: Jump to dedicated detail section */}
            <div className="pt-1 flex items-center justify-center gap-3">
              <button
                onClick={() => scrollToDetail(currentVariety.id)}
                className="px-5 py-2 rounded-full bg-[#071524] hover:bg-[#0284C7] text-white text-xs font-sans font-black tracking-wider uppercase transition-all shadow-[0_8px_20px_rgba(7,21,36,0.3)] active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>
                  {t("viewVarietyDetails")} ({language === "ta" ? currentVariety.nameTa : currentVariety.nameEn})
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll To Explore Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-0.5 text-[10px] sm:text-[11px] font-mono text-[#0284C7] pointer-events-none animate-bounce">
          <span className="uppercase tracking-widest font-black">{t("scrollToZoomHint")}</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#0284C7]" />
        </div>
      </motion.div>
    </div>
  );
}
