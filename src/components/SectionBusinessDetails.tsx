"use client";

import React from "react";
import { Store, Truck, ShieldCheck, MapPin, CheckCircle2, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SectionBusinessDetailsProps {
  onContactClick: () => void;
}

export function SectionBusinessDetails({ onContactClick }: SectionBusinessDetailsProps) {
  const { t } = useLanguage();

  return (
    <section className="relative w-full py-10 sm:py-16 px-4 sm:px-10 lg:px-20 bg-transparent text-[#0F2537] border-t border-[#D2E4F0]/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
          <span className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#0284C7] font-black mb-2">
            {t("distHeadline")}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#071524] tracking-tight drop-shadow-sm">
            {t("distTitle")}
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-sans font-bold text-[#071524] leading-relaxed">
            {t("distSubtitle")}
          </p>
        </div>

        {/* 3 Pillars in Apple-Style Ultra-Transparent Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Card 1 */}
          <div className="bg-white/12 backdrop-blur-xl rounded-[32px] border border-white/40 p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(7,21,36,0.1)] hover:shadow-[0_25px_60px_rgba(2,132,199,0.2)] hover:-translate-y-1 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/25 border border-white/40 flex items-center justify-center mb-5 text-[#006A60] shadow-xs">
                <ShieldCheck className="w-6 h-6 text-[#006A60] stroke-[2.2]" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-black text-[#071524] mb-2">
                {t("card1Title")}
              </h3>
              <p className="text-xs sm:text-sm font-sans font-bold text-[#071524] leading-relaxed">
                {t("card1Desc")}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/30 text-xs font-mono text-[#071524] flex items-center gap-1.5 font-black">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#006A60]" />
              <span>{t("card1Pill")}</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/12 backdrop-blur-xl rounded-[32px] border border-white/40 p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(7,21,36,0.1)] hover:shadow-[0_25px_60px_rgba(2,132,199,0.2)] hover:-translate-y-1 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/25 border border-white/40 flex items-center justify-center mb-5 text-[#0284C7] shadow-xs">
                <Store className="w-6 h-6 text-[#0284C7] stroke-[2.2]" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-black text-[#071524] mb-2">
                {t("card2Title")}
              </h3>
              <p className="text-xs sm:text-sm font-sans font-bold text-[#071524] leading-relaxed">
                {t("card2Desc")}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/30 text-xs font-mono text-[#071524] flex items-center gap-1.5 font-black">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#006A60]" />
              <span>{t("card2Pill")}</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white/12 backdrop-blur-xl rounded-[32px] border border-white/40 p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(7,21,36,0.1)] hover:shadow-[0_25px_60px_rgba(2,132,199,0.2)] hover:-translate-y-1 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/25 border border-white/40 flex items-center justify-center mb-5 text-[#0284C7] shadow-xs">
                <Truck className="w-6 h-6 text-[#0284C7] stroke-[2.2]" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-black text-[#071524] mb-2">
                {t("card3Title")}
              </h3>
              <p className="text-xs sm:text-sm font-sans font-bold text-[#071524] leading-relaxed">
                {t("card3Desc")}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/30 text-xs font-mono text-[#071524] flex items-center gap-1.5 font-black">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#006A60]" />
              <span>{t("card3Pill")}</span>
            </div>
          </div>
        </div>

        {/* Coverage Strip in Apple-Style Glass Card */}
        <div className="bg-white/12 backdrop-blur-xl rounded-[28px] border border-white/40 p-5 sm:p-7 shadow-[0_20px_50px_rgba(7,21,36,0.1)]">
          <div className="flex items-center gap-2 mb-3.5">
            <MapPin className="w-4 h-4 text-[#0284C7] stroke-[2.5]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#071524] font-black">
              {t("coverageTitle")}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                { en: "Kasimedu Harbor Pier", ta: "காசிமேடு துறைமுகம்" },
                { en: "Chennai Metro", ta: "சென்னை மாநகரம்" },
                { en: "Chengalpattu District", ta: "செங்கல்பட்டு மாவட்டம்" },
                { en: "Kanchipuram District", ta: "காஞ்சிபுரம் மாவட்டம்" },
                { en: "Thiruvallur District", ta: "திருவள்ளூர் மாவட்டம்" },
                { en: "Doorstep Sub-Zero Crates", ta: "பனிக்கூழ் நேரடி விநியோகம்" },
              ].map((service, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-white/35 backdrop-blur-md border border-white/60 text-xs font-mono text-[#071524] font-black shadow-xs"
                >
                  {service.ta ? (t("brandName") === "எஸ்.எஸ்.எஸ் சீ புட்ஸ்" ? service.ta : service.en) : service.en}
                </span>
              ))}
            </div>

            <button
              onClick={onContactClick}
              className="mt-3 sm:mt-0 px-6 py-2 rounded-full bg-[#071524] hover:bg-[#0284C7] text-white text-xs font-sans font-black tracking-wider uppercase transition-all shadow-[0_8px_20px_rgba(7,21,36,0.3)] active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>{t("setupCommercialSupplyBtn")}</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
