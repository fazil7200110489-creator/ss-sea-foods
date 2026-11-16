"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ta";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const TRANSLATIONS: Record<string, { en: string; ta: string }> = {
  // Brand & Header
  brandName: { en: "SSS Sea Foods", ta: "எஸ்.எஸ்.எஸ் சீ புட்ஸ்" },
  harborDispatch: { en: "HARBOR DISPATCH:", ta: "காசிமேடு விநியோகம்:" },
  harborStatus: {
    en: "Kasimedu Deep Waters • -1.5°C Slurry Active",
    ta: "காசிமேடு ஆழ்கடல் • -1.5°C பனிக்கூழ் தயார்",
  },
  callNow: { en: "+91 98400 12345", ta: "+91 98400 12345" },
  ownerNameBadge: { en: "Proprietor: Suresh", ta: "உரிமையாளர்: சுரேஷ்" },
  quickInquiry: { en: "Quick Inquiry", ta: "விரைவு விசாரணை" },
  whatsappOrder: { en: "WhatsApp Order", ta: "வாட்ஸ்அப் ஆர்டர்" },

  // Navigation Drawer
  navHeading: { en: "Ocean Catch Navigation", ta: "மீன் வகைகள் வழிசெலுத்தல்" },
  nav01: { en: "01 / Fresh From The Harbour (Hero)", ta: "01 / துறைமுக நேரடி மீன்கள் (முகப்பு)" },
  nav02: { en: "02 / Central Zoom Parallax (11 Varieties)", ta: "02 / 11 வகை மீன்கள் (நேரடி காட்சி)" },
  nav03: { en: "03 / Dedicated Seafood Details (11 Varieties)", ta: "03 / விரிவான மீன் விபரங்கள்" },
  nav04: { en: "04 / Cold-Chain Logistics & Wholesale", ta: "04 / குளிர்சங்கிலி மற்றும் மொத்த விநியோகம்" },
  nav05: { en: "05 / Order & Inquiry Desk", ta: "05 / ஆர்டர் & நேரடி தொடர்பு" },
  navSubtext: {
    en: "100% Live-Hooked • Dawn Kasimedu Harbor Catch • Chennai & Near Districts",
    ta: "100% தூண்டில் மீன் • அதிகாலை காசிமேடு வருகை • சென்னை & சுற்றுவட்டார மாவட்டங்கள்",
  },

  // Hero Section
  heroPillTitle: {
    en: "100% Live-Hooked Ocean Catch",
    ta: "100% நேரடி தூண்டில் மீன்",
  },
  heroPillSub: {
    en: "Kasimedu Deep Waters",
    ta: "காசிமேடு ஆழ்கடல்",
  },
  heroTitle1: {
    en: "Fresh From The Harbour.",
    ta: "துறைமுகத்தில் இருந்து புதியதாக.",
  },
  heroTitle2: {
    en: "Delivered To Your Kitchen.",
    ta: "உங்கள் சமையலறைக்கு நேரடி விநியோகம்.",
  },
  heroSubtitle: {
    en: "Sourced daily at dawn from Kasimedu fishing harbour. We supply premium live-hooked seafood to households, premier coastal stalls, and dining hotels with guaranteed sub-zero ice slurry preservation across Chennai and neighbouring districts.",
    ta: "காசிமேடு மீன்பிடித் துறைமுகத்தில் இருந்து நாள்தோறும் அதிகாலை பெறப்படும் முதல் தர ஆழ்கடல் தூண்டில் மீன்கள். வீடுகள், உணவகங்கள் மற்றும் மீன் கடைகளுக்கு -1.5°C பனிக்கூழ் முறையில் சென்னை மற்றும் அருகிலுள்ள மாவட்டங்களுக்கு விரைவாக விநியோகிக்கப்படுகிறது.",
  },
  pillar1Title: { en: "100% Live-Hooked", ta: "100% நேரடி தூண்டில்" },
  pillar1Desc: { en: "No nets, no bruise trauma.", ta: "வலையற்ற தூண்டில் மீன், தசை சிதைவற்றது." },
  pillar2Title: { en: "Vanjaram Specialists", ta: "வஞ்சிரம் சிறப்பு விற்பனை" },
  pillar2Desc: { en: "All sizes (1kg to 8kg+).", ta: "அனைத்து அளவுகளும் (1கிலோ முதல் 8+ கிலோ வரை)." },
  pillar3Title: { en: "Wholesale & Custom", ta: "மொத்த & சில்லறை விற்பனை" },
  pillar3Desc: { en: "Stalls, dining & bulk.", ta: "கடைகள், உணவகங்கள் மற்றும் குடும்பங்களுக்கு." },
  pillar4Title: { en: "Sub-Zero Delivery", ta: "பனிக்கூழ் பாதுகாப்பு" },
  pillar4Desc: { en: "Sealed -1.5°C brine slurry.", ta: "தூய -1.5°C உப்புக் கரைசலில் அடைக்கப்பட்டது." },
  heroCtaVarieties: { en: "Explore 11 Ocean Varieties", ta: "11 கடல் மீன் வகைகளை காண்க" },
  heroCtaContact: { en: "Contact to Order", ta: "ஆர்டர் செய்ய தொடர்பு கொள்க" },

  // Hero Product Card
  dawnLandingBadge: {
    en: "Kasimedu Dawn Landing • -1.5°C Ice Slurry",
    ta: "காசிமேடு அதிகாலை வருகை • -1.5°C பனிக்கூழ்",
  },
  signatureSpecialtyPill: { en: "Signature Specialty", ta: "முதன்மையான சிறப்பு வகை" },
  signatureSpecialtyTitle: { en: "1kg Table Steaks to 8kg+ Giant Vanjaram", ta: "1 கிலோ முதல் 8+ கிலோ வரை பிரம்மாண்ட வஞ்சிரம்" },
  zeroNetTraumaBadge: { en: "Zero Net Trauma", ta: "தூய தூண்டில் மீன்" },
  heroFishCategory: { en: "SSS SEA FOODS HARBOUR DIRECT", ta: "எஸ்.எஸ்.எஸ் சீ புட்ஸ் நேரடி விநியோகம்" },
  heroFishTitle: { en: "01 / Vanjaram", ta: "01 / வஞ்சிரம்" },
  heroFishTamil: { en: "(King Seer Fish / நெய்மீன்)", ta: "(கிங் சீர் ஃபிஷ் / நெய்மீன்)" },
  heroFishOrderNote: { en: "Pre-ordered & custom sliced on demand", ta: "முன்பதிவு செய்து விரும்பியவாறு வெட்டித் தரப்படும்" },
  heroFishDesc: {
    en: "Reeled by single handline from Kasimedu deep waters. Pristine crystalline white flesh with unbroken bloodlines. Custom sliced into thick center-cut steaks, fillets, curry portions, or whole majestic fish.",
    ta: "காசிமேடு ஆழ்கடலில் ஒற்றைத் தூண்டிலில் பிடிக்கப்பட்ட சிறந்த வஞ்சிரம். நறுமணமும், உறுதியான வெண் தசையும் கொண்ட முதல் தரம். உங்கள் விருப்பப்படி தடிமனான வறுவல் துண்டுகள், குழம்பு துண்டுகள் அல்லது முழு மீனாக வெட்டித் தரப்படும்.",
  },
  inquireCatchBtn: { en: "Inquire Catch", ta: "மீன் இருப்பு அறிய" },
  dailyMorningDispatch: { en: "Daily Morning Dispatch", ta: "தினசரி காலை விரைவு விநியோகம்" },

  // Zoom Parallax Section
  zoomBadge: { en: "SECTION 02 • EFFRED ZOOM PARALLAX", ta: "பிரிவு 02 • 11 கடல் மீன் வகைகள் காட்சி" },
  zoomVarietyBadge: { en: "VARIETY", ta: "மீன் எண்" },
  viewVarietyDetails: { en: "View Details", ta: "முழு விபரம் காண்க" },
  scrollToZoomHint: { en: "Scroll To Zoom Varieties", ta: "ஸ்க்ரோல் செய்து மீன் வகைகளை காண்க" },

  // Logistics & Supply Section
  logisticsPill: { en: "COLD-CHAIN HARBOR SUPPLY", ta: "குளிர்சங்கிலி துறைமுக விநியோகம்" },
  logisticsTitle1: { en: "Direct Harbor Supply", ta: "நேரடி துறைமுக விநியோகம்" },
  logisticsTitle2: { en: "Across Chennai & Near Districts", ta: "சென்னை மற்றும் அருகிலுள்ள மாவட்டங்கள்" },
  logisticsDesc: {
    en: "Direct daily dawn supply from Kasimedu harbor to seafood restaurants, coastal food stalls, banquet halls, and bulk custom orders across Chennai, Chengalpattu, Kanchipuram, and Thiruvallur. Sealed in sterile, insulated thermal ice crates with sub-zero brine slurry.",
    ta: "காசிமேடு மீன்பிடித் துறைமுகத்தில் இருந்து சென்னை, செங்கல்பட்டு, காஞ்சிபுரம் மற்றும் திருவள்ளூர் மாவட்டங்களில் உள்ள வீடுகள், உணவகங்கள் மற்றும் மீன் கடைகளுக்கு நேரடியாக அன்றாடம் அதிகாலை விநியோகிக்கப்படுகிறது.",
  },
  sameDayDispatch: { en: "Same-Day Dawn Harbor Dispatch", ta: "அன்றாட அதிகாலை விரைவு விநியோகம்" },
  wholesaleRates: { en: "Direct Wholesale Rates for Stalls & Restaurants", ta: "கடைகள் மற்றும் உணவகங்களுக்கு நேரடி மொத்த விலை" },
  doorstepDelivery: { en: "Doorstep Delivery in Insulated Sub-Zero Crates", ta: "பனிக்கூழ் பெட்டிகளில் பாதுகாப்பான வீட்டு விநியோகம்" },
  contactHarborSupplyBtn: { en: "Contact for Harbor Supply", ta: "விநியோகத்திற்கு தொடர்பு கொள்க" },

  // Business Operations Section
  distHeadline: { en: "HARBOR LOGISTICS & DISTRIBUTION", ta: "துறைமுக விநியோகக் கட்டமைப்பு" },
  distTitle: { en: "Direct Harbor Supply to Your Station", ta: "உங்கள் இடத்திற்கே நேரடி துறைமுக விநியோகம்" },
  distSubtitle: {
    en: "Eliminating delayed cold storage holding. 100% live-hooked single handline catch reeled from Kasimedu deep waters and preserved under strict sub-zero temperature integrity.",
    ta: "பழைய குளிரூட்டப்பட்ட மீன்களைத் தவிர்த்து, காசிமேடு ஆழ்கடலில் தூண்டில் மூலம் பிடிக்கப்பட்ட புத்தம் புதிய மீன்களை அன்றே உங்களுக்கு வழங்குகிறோம்.",
  },
  card1Title: { en: "All Sizes of Vanjaram", ta: "அனைத்து அளவிலான வஞ்சிரம்" },
  card1Desc: {
    en: "From 1.5kg tender table steaks to majestic 8kg+ banquet fish. Each fish is hooked live with unbroken bloodlines, zero net pressure bruising, and crystalline firm white meat.",
    ta: "1.5 கிலோ குடும்ப மீன் முதல் 8+ கிலோ பிரம்மாண்ட மீன் வரை. முழு மீன் அல்லது உங்கள் விருப்பத்திற்கேற்ப வெட்டித் தரப்படும்.",
  },
  card1Pill: { en: "Whole fish & custom portion cuts", ta: "முழு மீன் மற்றும் துண்டுகள்" },
  card2Title: { en: "Restaurants & Food Stalls", ta: "உணவகங்கள் & மீன் அங்காடிகள்" },
  card2Desc: {
    en: "Reliable daily dawn supply for premier dining, coastal seafood stalls, and catering banquets. Predictable weight-to-count grading and direct wholesale harbor rates.",
    ta: "உணவகங்கள் மற்றும் மீன் கடைகளுக்கு தரமான எடைக் கணக்கீட்டுடன் நேரடி மொத்த விலையில் காலை விரைவு விநியோகம்.",
  },
  card2Pill: { en: "Scheduled daily dawn dispatches", ta: "தினசரி காலை நேர விநியோகம்" },
  card3Title: { en: "Sub-Zero Doorstep Delivery", ta: "வீட்டு வாசல் பனிக்கூழ் விநியோகம்" },
  card3Desc: {
    en: "Packaged in insulated thermal ice crates with sealed sub-zero brine slurry. Delivered directly to your kitchen, stall, or commercial station across Chennai and nearby regions.",
    ta: "சென்னை, செங்கல்பட்டு, காஞ்சிபுரம், திருவள்ளூர் பகுதி வாடிக்கையாளர்களுக்கு சிறப்பு பனிக்கூழ் பெட்டிகளில் வெப்பநிலை மாறாமல் விநியோகம்.",
  },
  card3Pill: { en: "Express cold-chain transit", ta: "குளிர்சங்கிலி விரைவுப் போக்குவரத்து" },
  coverageTitle: { en: "Harbor Supply Logistics & Coverage", ta: "விநியோகப் பகுதிகள் மற்றும் சேவைகள்" },
  setupCommercialSupplyBtn: { en: "Setup Commercial Supply", ta: "வணிக விநியோகத்திற்கு விண்ணப்பிக்க" },

  // Footer Section
  footerOwnerTitle: { en: "Proprietor: Suresh", ta: "உரிமையாளர்: சுரேஷ்" },
  footerPhilosophy: {
    en: "Specialized in all sizes of premium Vanjaram and 100% live-hooked ocean catches. Sourced fresh daily from Kasimedu harbor by Suresh.",
    ta: "சுரேஷ் அவர்களின் நேரடி மேற்பார்வையில் காசிமேடு துறைமுகத்தில் இருந்து அன்றாடம் பெறப்படும் சிறந்த தரமான தூண்டில் வஞ்சிரம் மற்றும் கடல் மீன்கள்.",
  },
  footerOperationsTitle: { en: "Core Operations", ta: "முக்கிய செயல்பாடுகள்" },
  op1: { en: "• 100% Live-Hooked single handlines", ta: "• 100% நேரடி தூண்டில் மீன்கள்" },
  op2: { en: "• Specialized in all sizes of Vanjaram", ta: "• அனைத்து அளவிலான வஞ்சிரம்" },
  op3: { en: "• Sub-zero ice slurry (-1.5°C) chilling", ta: "• -1.5°C பனிக்கூழ் பாதுகாப்பு" },
  op4: { en: "• Direct supply for dining & stalls", ta: "• உணவகங்கள் & கடைகளுக்கு நேரடி விநியோகம்" },
  op5: { en: "• Raised-mesh sun-cured Karuvadu", ta: "• தூய முறையில் உலர்த்திய கருவாடு" },
  op6: { en: "• Custom portion & steak slicing", ta: "• உங்கள் விருப்பப்படி வெட்டித் தருதல்" },
  footerCoverageTitle: { en: "Supply Coverage Areas", ta: "விநியோக எல்லைகள்" },
  footerCoverageSub: {
    en: "Daily express dawn supply across Chennai & neighbouring districts:",
    ta: "சென்னை மற்றும் அருகிலுள்ள மாவட்டங்களுக்கு அன்றாட காலை விநியோகம்:",
  },
  cov1: { en: "Chennai Metro", ta: "சென்னை மாநகரம்" },
  cov2: { en: "Chengalpattu", ta: "செங்கல்பட்டு" },
  cov3: { en: "Kanchipuram", ta: "காஞ்சிபுரம்" },
  cov4: { en: "Thiruvallur", ta: "திருவள்ளூர்" },
  cov5: { en: "Harbor Direct", ta: "துறைமுக விநியோகம்" },
  cov6: { en: "Doorstep Crates", ta: "வீட்டு விநியோகம்" },
  footerContactTitle: { en: "Harbor Order Desk", ta: "நேரடி ஆர்டர் தொடர்பு" },
  ownerContactLabel: { en: "Owner Contact: Suresh", ta: "உரிமையாளர் தொடர்பு: சுரேஷ்" },
  harborAddress: { en: "Kasimedu Fishing Harbor, Chennai - 600013", ta: "காசிமேடு மீன்பிடி துறைமுகம், சென்னை - 600013" },
  copyrightText: {
    en: "© 2026 SSS Sea Foods. Proprietor: Suresh. All rights reserved. 100% Live-Hooked Ocean Harvest.",
    ta: "© 2026 எஸ்.எஸ்.எஸ் சீ புட்ஸ். உரிமையாளர்: சுரேஷ். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
  },
  backToTop: { en: "Back to Top ↑", ta: "மேலே செல்க ↑" },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Load user language preference from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sss_seafoods_lang") as Language;
      if (saved === "en" || saved === "ta") {
        setLanguageState(saved);
      }
    } catch (e) {}
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("sss_seafoods_lang", lang);
    } catch (e) {}
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ta" : "en");
  };

  const t = (key: string): string => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[language] || entry["en"] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

