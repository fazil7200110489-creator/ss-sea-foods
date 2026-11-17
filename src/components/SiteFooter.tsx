"use client";

import React from "react";
import { Anchor, Phone, MessageSquare, Compass, Truck, Mail, MapPin, UserCheck, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function SiteFooter() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-transparent backdrop-blur-md text-[#071524] border-t border-white/30 pt-14 sm:pt-20 pb-12 px-4 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Main 4-Column Apple-Style Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-white/20">
          {/* Column 1: Brand & Owner Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#071524] text-white flex items-center justify-center font-bold shadow-md">
                <Anchor className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
              <div>
                <span className="font-serif text-xl tracking-wider uppercase font-black text-[#071524] block drop-shadow-xs">
                  {t("brandName")}
                </span>
                {/* PROMINENT OWNER IDENTIFIER AS REQUESTED */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-transparent backdrop-blur-md border border-white/30 text-[10px] font-mono font-black text-[#0284C7] shadow-2xs">
                  <UserCheck className="w-3 h-3 text-[#006A60]" />
                  <span>{t("footerOwnerTitle")}</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-sans font-bold text-[#071524] leading-relaxed">
              {t("footerPhilosophy")}
            </p>

            <div className="text-xs font-mono text-[#0284C7] font-black flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#006A60]" />
              <span>Kasimedu Deep Waters • Bay of Bengal</span>
            </div>
          </div>

          {/* Column 2: Core Operations */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#071524] font-black mb-3.5">
              {t("footerOperationsTitle")}
            </h4>
            <ul className="space-y-2 text-xs font-mono font-bold text-[#071524]">
              <li className="text-[#0284C7] font-black">{t("op1")}</li>
              <li>{t("op2")}</li>
              <li>{t("op3")}</li>
              <li>{t("op4")}</li>
              <li>{t("op5")}</li>
              <li>{t("op6")}</li>
            </ul>
          </div>

          {/* Column 3: Logistics & Coverage (Chennai & Near Districts) */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#071524] font-black mb-3.5">
              {t("footerCoverageTitle")}
            </h4>
            <p className="text-xs font-bold text-[#071524] mb-3 leading-relaxed">
              {t("footerCoverageSub")}
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-[#071524]">
              <span className="px-3 py-1 rounded-full bg-transparent backdrop-blur-xs border border-white/25 shadow-2xs font-black">
                {t("cov1")}
              </span>
              <span className="px-3 py-1 rounded-full bg-transparent backdrop-blur-xs border border-white/25 shadow-2xs font-black">
                {t("cov2")}
              </span>
              <span className="px-3 py-1 rounded-full bg-transparent backdrop-blur-xs border border-white/25 shadow-2xs font-black">
                {t("cov3")}
              </span>
              <span className="px-3 py-1 rounded-full bg-transparent backdrop-blur-xs border border-white/25 shadow-2xs font-black">
                {t("cov4")}
              </span>
              <span className="px-3 py-1 rounded-full bg-transparent backdrop-blur-xs border border-white/25 shadow-2xs font-black">
                {t("cov5")}
              </span>
              <span className="px-3 py-1 rounded-full bg-transparent backdrop-blur-xs border border-white/25 shadow-2xs font-black">
                {t("cov6")}
              </span>
            </div>
          </div>

          {/* Column 4: Contact & Order Desk (Owner: Suresh) */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#071524] font-black mb-3.5">
              {t("footerContactTitle")}
            </h4>
            <div className="space-y-3 text-xs font-mono">
              {/* Owner card - Fully Transparent Clean Glass */}
              <div className="p-3.5 rounded-2xl bg-transparent backdrop-blur-md border border-white/30 shadow-sm space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-[#0284C7] font-black flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#006A60]" />
                  <span>{t("ownerContactLabel")}</span>
                </div>
                <a
                  href="tel:+919840012345"
                  className="flex items-center gap-2 text-[#071524] hover:text-[#0284C7] transition-colors font-black text-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>+91 98400 12345</span>
                </a>
              </div>

              <a
                href="https://wa.me/919840012345?text=Hello%20Suresh,%20I%20would%20like%20to%20order%20fresh%20fish%20from%20SSS%20Sea%20Foods"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-800 hover:text-emerald-950 transition-colors font-black text-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t("whatsappOrder")}</span>
              </a>

              <div className="flex items-center gap-2 text-[#071524] font-bold">
                <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>orders@sssseafoods.com</span>
              </div>

              <div className="flex items-center gap-2 text-[#071524] font-bold">
                <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>{t("harborAddress")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#071524] font-bold gap-3">
          <div>
            {t("copyrightText")}
          </div>
          <button
            onClick={scrollToTop}
            className="hover:text-[#0284C7] transition-colors cursor-pointer font-black"
          >
            {t("backToTop")}
          </button>
        </div>
      </div>
    </footer>
  );
}
