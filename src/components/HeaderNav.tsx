"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, X, ArrowUpRight, Anchor, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface HeaderNavProps {
  onQuickContact: () => void;
}

export function HeaderNav({ onQuickContact }: HeaderNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-10 lg:px-20 py-3 sm:py-4 flex items-center justify-between transition-all pointer-events-auto bg-transparent backdrop-blur-md border-b border-white/30 shadow-[0_4px_30px_rgba(15,37,55,0.04)]">
        {/* Left: Brand Identity */}
        <div
          onClick={() => scrollTo("hero-harvest")}
          className="cursor-pointer select-none flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0284C7] to-[#0D9488] flex items-center justify-center shadow-md">
            <Anchor className="w-4 h-4 text-white stroke-[2.2]" />
          </div>
          <div>
            <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#0F2537] hover:text-[#0284C7] transition-colors block leading-tight">
              {t("brandName")}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-[#0D9488] font-bold block">
              {t("ownerNameBadge")}
            </span>
          </div>
        </div>

        {/* Center: Live Harbor Dispatch Status (Tablet & Desktop) */}
        <div className="hidden lg:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-transparent backdrop-blur-md border border-white/30 text-xs font-mono text-[#0F2537] shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D9488] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D9488]"></span>
          </span>
          <span className="text-[#0284C7] font-semibold">{t("harborDispatch")}</span>
          <span className="text-[#071524] font-bold">{t("harborStatus")}</span>
        </div>

        {/* Right: Apple-Style Language Switcher + Call CTA + Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Apple-Style Segmented Language Toggle Pill */}
          <div className="flex items-center p-0.5 rounded-full bg-transparent backdrop-blur-md border border-white/30 text-[11px] font-mono shadow-xs">
            <button
              onClick={() => setLanguage("en")}
              aria-label="Switch to English"
              className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                language === "en"
                  ? "bg-[#071524] text-white font-bold shadow-xs scale-102"
                  : "text-[#071524] hover:text-[#0284C7] font-semibold"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ta")}
              aria-label="Switch to Tamil"
              className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                language === "ta"
                  ? "bg-[#0284C7] text-white font-bold shadow-xs scale-102"
                  : "text-[#071524] hover:text-[#0284C7] font-semibold"
              }`}
            >
              தமிழ்
            </button>
          </div>

          <a
            href="tel:+919840012345"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-transparent backdrop-blur-md hover:bg-white/20 border border-white/30 text-[#071524] text-xs font-mono font-bold shadow-xs transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>+91 98400 12345</span>
          </a>

          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Toggle navigation menu"
            className="group flex flex-col justify-center items-end gap-1.5 w-9 h-9 p-2 rounded-2xl bg-white/95 border border-[#BAE6FD] hover:border-[#0284C7] cursor-pointer transition-all shadow-xs"
          >
            <span className="w-5 h-[2px] bg-[#0F2537] group-hover:w-6 transition-all duration-300" />
            <span className="w-4 h-[2px] bg-[#0284C7] group-hover:w-6 transition-all duration-300" />
            <span className="w-5 h-[2px] bg-[#0F2537] group-hover:w-6 transition-all duration-300" />
          </button>
        </div>
      </header>

      {/* Slide-over Apple-Style Editorial Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#F4F9FD]/95 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-14 lg:p-20 overflow-y-auto animate-fadeIn text-[#0F2537]">
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between border-b border-[#D2E4F0] pb-5 sm:pb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0284C7] to-[#0D9488] flex items-center justify-center shadow-md">
                <Anchor className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0F2537]">
                  {t("brandName")}
                </span>
                <span className="text-xs font-mono text-[#0D9488] font-bold block">
                  {t("ownerNameBadge")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Switcher inside Drawer */}
              <div className="flex items-center p-0.5 rounded-full bg-white border border-[#BAE6FD] text-xs font-mono shadow-inner">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    language === "en" ? "bg-[#0284C7] text-white font-bold" : "text-[#486581]"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("ta")}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    language === "ta" ? "bg-[#0284C7] text-white font-bold" : "text-[#486581]"
                  }`}
                >
                  தமிழ்
                </button>
              </div>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full border border-[#BAE6FD] bg-white text-[#0F2537] hover:bg-[#0284C7] hover:text-white transition-all cursor-pointer shadow-xs"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="my-auto py-10 max-w-3xl space-y-4 sm:space-y-6">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#0284C7] font-semibold">
              {t("navHeading")}
            </div>

            <nav className="flex flex-col space-y-3 sm:space-y-5">
              <button
                onClick={() => scrollTo("hero-harvest")}
                className="text-left font-serif text-2xl sm:text-4xl text-[#0F2537] hover:text-[#0284C7] transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span>{t("nav01")}</span>
                <ArrowUpRight className="w-5 h-5 text-[#0284C7] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => scrollTo("zoom-varieties")}
                className="text-left font-serif text-2xl sm:text-4xl text-[#0F2537] hover:text-[#0284C7] transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span>{t("nav02")}</span>
                <ArrowUpRight className="w-5 h-5 text-[#0284C7] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => scrollTo("seafood-details-catalog")}
                className="text-left font-serif text-2xl sm:text-4xl text-[#0F2537] hover:text-[#0284C7] transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span>{t("nav03")}</span>
                <ArrowUpRight className="w-5 h-5 text-[#0284C7] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => scrollTo("boat-to-business")}
                className="text-left font-serif text-2xl sm:text-4xl text-[#0F2537] hover:text-[#0284C7] transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span>{t("nav04")}</span>
                <ArrowUpRight className="w-5 h-5 text-[#0284C7] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onQuickContact();
                }}
                className="text-left font-serif text-2xl sm:text-4xl text-[#0F2537] hover:text-[#0284C7] transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span>{t("nav05")}</span>
                <ArrowUpRight className="w-5 h-5 text-[#0284C7] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </nav>
          </div>

          {/* Quick Contact Footer inside Menu */}
          <div className="pt-6 sm:pt-8 border-t border-[#D2E4F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#486581]">
              {t("navSubtext")}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919840012345?text=Hello%20SSS%20Sea%20Foods,%20I%20would%20like%20to%20order%20fresh%20fish"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-medium shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+919840012345"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0F2537] hover:bg-[#0284C7] text-white text-xs font-mono font-medium shadow-md transition-all"
              >
                <Phone className="w-4 h-4 text-[#38BDF8]" />
                <span>{t("callNow")}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
