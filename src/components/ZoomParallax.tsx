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

  // Zoom scales matching 21st.dev @efferd / Olivier Larose zoom-parallax
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  // Update active variety dynamically as user scrubs through zoom parallax
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const idx = Math.min(Math.floor(latest * VARIETIES.length), VARIETIES.length - 1);
      setActiveIdx(idx);
    });
  }, [scrollYProgress]);

  // 7 Zoom Image Layers placed symmetrically around the central stage in Apple-style glass borders
  const pictures = [
    {
      src: "/fish/vanjaram_ice_platter.jpg",
      scale: scale4,
      alt: "Vanjaram Seer Fish on Crushed Ice",
      classes: "w-[32vw] h-[26vh] sm:w-[24vw] sm:h-[26vh]",
    },
    {
      src: "/fish/sankara.png",
      scale: scale5,
      alt: "Sankara Red Snapper",
      classes: "top-[-28vh] left-[6vw] w-[32vw] h-[26vh] sm:w-[26vw] sm:h-[26vh]",
    },
    {
      src: "/fish/boat_landing_catch.jpg",
      scale: scale6,
      alt: "Harbour Dawn Landing",
      classes: "top-[-10vh] left-[-26vw] w-[26vw] h-[38vh] sm:w-[22vw] sm:h-[42vh]",
    },
    {
      src: "/fish/fresh_steaks_ice.jpg",
      scale: scale5,
      alt: "Yellowfin Tuna Steaks on Ice",
      classes: "left-[28vw] w-[28vw] h-[26vh] sm:w-[22vw] sm:h-[26vh]",
    },
    {
      src: "/fish/vanjaram_cutting.jpg",
      scale: scale6,
      alt: "Master Slicing Steaks",
      classes: "top-[26vh] left-[6vw] w-[24vw] h-[24vh] sm:w-[20vw] sm:h-[24vh]",
    },
    {
      src: "/reference/fresh_silver_tray.png",
      scale: scale8,
      alt: "Fresh Silver Ocean Catch",
      classes: "top-[26vh] left-[-22vw] w-[30vw] h-[24vh] sm:w-[26vw] sm:h-[24vh]",
    },
    {
      src: "/reference/sun_cured_trays.png",
      scale: scale9,
      alt: "Sun Cured Karuvadu Trays",
      classes: "top-[22vh] left-[26vw] w-[20vw] h-[20vh] sm:w-[16vw] sm:h-[16vh]",
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
      className="relative h-[260vh] sm:h-[320vh] bg-transparent text-[#0F2537] border-t border-[#D2E4F0]/60"
    >
      {/* Sticky Fullscreen Stage (Efferd 21st.dev Architecture) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none">
        {/* Soft Ambient Radial Light Sea Glow */}
        <div className="absolute inset-0 bg-radial from-[#E0F2FE]/20 via-transparent to-transparent pointer-events-none" />

        {/* 7 Zoom Layers Scaling Dynamically with Scroll */}
        {pictures.map(({ src, scale, alt, classes }, index) => (
          <motion.div
            key={index}
            style={{ scale }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none will-change-transform"
          >
            <div
              className={`relative overflow-hidden rounded-[26px] sm:rounded-[32px] shadow-[0_20px_50px_rgba(2,132,199,0.16)] border-2 border-white/80 bg-white/70 backdrop-blur-md ${classes}`}
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2537]/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        ))}

        {/* Top Header Label */}
        <div className="absolute top-20 sm:top-24 left-4 right-4 sm:left-10 sm:right-10 z-30 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-2xl border border-white/70 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#0284C7] shadow-sm font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>{t("zoomBadge")}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-2xl border border-white/70 text-[10px] sm:text-xs font-mono text-[#0F2537] shadow-sm font-semibold">
            <span className="text-[#0284C7]">{t("zoomVarietyBadge")}</span>
            <span className="font-bold">{currentVariety.number} / {VARIETIES.length}</span>
          </div>
        </div>

        {/* PROMINENT CENTRAL TYPOGRAPHY (APPLE-STYLE ULTRA-TRANSPARENT GLASS CENTERPIECE CARD) */}
        <div className="relative z-30 max-w-xl w-full px-4 text-center pointer-events-auto">
          <div className="rounded-[32px] bg-white/12 backdrop-blur-xl border border-white/40 p-6 sm:p-9 shadow-[0_30px_70px_rgba(7,21,36,0.12)] space-y-4">
            {/* Category tag & Number */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/30 border border-white/50 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#0284C7] font-black shadow-2xs">
              <Anchor className="w-3.5 h-3.5 text-[#006A60]" />
              <span>
                {language === "ta" ? currentVariety.tagTa : currentVariety.tagEn} • {currentVariety.number}
              </span>
            </div>

            {/* Giant Centered Headline with High Contrast Readability */}
            <div>
              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black text-[#071524] tracking-tight leading-tight transition-all duration-300">
                {language === "ta" ? currentVariety.nameTa : currentVariety.nameEn}
              </h2>

              <div className="font-serif text-lg sm:text-2xl text-[#0B1E32] mt-1 font-black">
                ({currentVariety.english})
              </div>

              <div className="text-xs sm:text-sm font-mono text-[#006A60] font-black mt-1">
                {currentVariety.tamil}
              </div>
            </div>

            {/* Quick Navigation Pills Across All 11 Varieties */}
            <div className="pt-2 border-t border-white/30 flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {VARIETIES.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => scrollToDetail(v.id)}
                  className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-black transition-all cursor-pointer ${
                    activeIdx === i
                      ? "bg-[#0284C7] text-white shadow-md scale-105"
                      : "bg-white/25 backdrop-blur-sm text-[#071524] hover:text-[#0284C7] hover:bg-white/50 border border-white/40"
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
                className="px-6 py-2.5 rounded-full bg-[#071524] hover:bg-[#0284C7] text-white text-xs font-sans font-black tracking-wider uppercase transition-all shadow-[0_10px_25px_rgba(15,37,55,0.3)] active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>
                  {t("viewVarietyDetails")} ({language === "ta" ? currentVariety.nameTa : currentVariety.nameEn})
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll To Explore Hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-[11px] font-mono text-[#0284C7] pointer-events-none animate-bounce">
          <span className="uppercase tracking-widest font-semibold">{t("scrollToZoomHint")}</span>
          <ChevronDown className="w-4 h-4 text-[#0284C7]" />
        </div>
      </div>
    </div>
  );
}
