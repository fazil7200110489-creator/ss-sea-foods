"use client";

import React, { useState } from "react";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { FishingLineScroll } from "@/components/FishingLineScroll";
import { HeaderNav } from "@/components/HeaderNav";
import { GlobalScrollFrameSequence } from "@/components/GlobalScrollFrameSequence";
import { Section1Hero } from "@/components/Section1Hero";
import { ZoomParallax } from "@/components/ZoomParallax";
import { SectionSeafoodDetails } from "@/components/SectionSeafoodDetails";
import { Section3Delivery } from "@/components/Section3Delivery";
import { SectionBusinessDetails } from "@/components/SectionBusinessDetails";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactOrderModal, ContactModalItem } from "@/components/ContactOrderModal";
import { MessageSquare, Phone } from "lucide-react";

function MainContent() {
  const [selectedItem, setSelectedItem] = useState<ContactModalItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, language } = useLanguage();

  const handleOpenContactModal = (item?: ContactModalItem) => {
    setSelectedItem(
      item || {
        name: language === "ta" ? "வஞ்சிரம்" : "Vanjaram (Seer Fish)",
        category: language === "ta" ? "புதிய வரத்து" : "Fresh Catch",
        tamilName: "வஞ்சிரம் / நெய்மீன்",
      }
    );
    setIsModalOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#F4F9FD]/20 text-[#0F2537] selection:bg-[#BAE6FD]/40 selection:text-[#0F2537]">
      {/* 0. Persistent Global 301-Frame Scroll-Controlled Animation (Fixed Background Behind Entire Website) */}
      <GlobalScrollFrameSequence />

      {/* 1. Core Fishing Line Scroll Indicator */}
      <FishingLineScroll />

      {/* 2. Top Header Navigation (Frosted Beach Glass + Language Toggle + Live Dispatch Status) */}
      <HeaderNav onQuickContact={() => handleOpenContactModal()} />

      {/* FOREGROUND CONTENT LAYER (Z-10) SCROLLING NORMALLY ABOVE THE 301-FRAME ANIMATION */}
      <div className="relative z-10 w-full">
        {/* SECTION 1: Premium Seafood Advertising Hero */}
        <Section1Hero
          onContactClick={() =>
            handleOpenContactModal({
              name: language === "ta" ? "01 / வஞ்சிரம் (நெய்மீன்)" : "01 / Vanjaram (Seer Fish)",
              category: language === "ta" ? "சிறப்பு வகை" : "Fresh Catch",
              tamilName: "வஞ்சிரம் / நெய்மீன்",
            })
          }
        />

        {/* SECTION 2: Central Seafood Showcase using 21st.dev Efferd Zoom Parallax */}
        <ZoomParallax />

        {/* SECTIONS 3 TO 13: Dedicated Individual Seafood Details (11 Varieties in Apple-Style Cards) */}
        <SectionSeafoodDetails onContactOrder={handleOpenContactModal} />

        {/* SECTION 14: Cold-Chain Logistics & Direct Harbor Supply (Chennai & Near Districts) */}
        <Section3Delivery
          onContactClick={() =>
            handleOpenContactModal({
              name: language === "ta" ? "துறைமுக மொத்த விநியோகம்" : "Harbor Wholesale Supply",
              category: language === "ta" ? "மொத்த விநியோகம்" : "Wholesale Order",
              tamilName: "சென்னை & அருகிலுள்ள மாவட்டங்கள்",
            })
          }
        />

        {/* SECTION 15: Commercial Supply & Harbor Distribution Details */}
        <SectionBusinessDetails
          onContactClick={() =>
            handleOpenContactModal({
              name: language === "ta" ? "உணவக & கடை விநியோகம்" : "Restaurant & Stall Supply",
              category: language === "ta" ? "வணிக விநியோகம்" : "Commercial Supply",
              tamilName: "உரிமையாளர்: சுரேஷ்",
            })
          }
        />

        {/* Editorial Footer & Harbor Order Desk (Owner: Suresh) */}
        <SiteFooter />
      </div>

      {/* Floating WhatsApp Symbol Elevated Above the Gemini Watermark / Bottom Bar Area */}
      <aside aria-label="WhatsApp Contact Suresh" className="fixed bottom-24 right-5 sm:bottom-28 sm:right-6 z-50 flex items-center group">
        <a
          href="https://wa.me/919840012345?text=Hello%20Suresh,%20I%20would%20like%20to%20order%20live-hooked%20fresh%20fish%20from%20SSS%20Sea%20Foods"
          target="_blank"
          rel="noreferrer"
          aria-label="Direct WhatsApp Order with Suresh (+91 98400 12345)"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_10px_25px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {/* Subtle live radar pulse */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />

          {/* Authentic WhatsApp Vector Icon */}
          <svg
            className="w-7 h-7 fill-white relative z-10 drop-shadow-xs"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>

          {/* Quick Tooltip on Hover */}
          <span className="hidden sm:inline-block absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#071524] text-white text-[11px] font-mono font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
            {t("whatsappOrder")} • Suresh
          </span>
        </a>
      </aside>

      {/* Floating Quick Action CTA at Bottom */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={() => handleOpenContactModal()}
          aria-label="Open Instant Order Inquiry Modal"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#071524] hover:bg-[#0284C7] text-white font-sans text-xs tracking-wider uppercase font-black shadow-[0_8px_25px_rgba(7,21,36,0.35)] active:scale-95 transition-all cursor-pointer"
        >
          <Phone className="w-4 h-4 text-[#38BDF8]" />
          <span>{t("quickInquiry")}</span>
        </button>
      </div>

      {/* Global Interactive Contact / Order Modal */}
      <ContactOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </main>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
