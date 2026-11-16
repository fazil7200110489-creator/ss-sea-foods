export interface ShowcaseSubItem {
  name: string;
  tamilName: string;
  image: string;
  sizeSpecs: string;
  highlights: string[];
  tasteNotes: string;
}

export interface ShowcaseStage {
  id: string;
  stageNumber: string;
  category: "Fresh Catch" | "Premium Dry Fish";
  title: string;
  tamilTitle: string;
  headline: string;
  description: string;
  subItems: ShowcaseSubItem[];
  supplyHighlights: string[];
}

export const SHOWCASE_STAGES: ShowcaseStage[] = [
  // 1. Vanjaram
  {
    id: "vanjaram",
    stageNumber: "01",
    category: "Fresh Catch",
    title: "Vanjaram",
    tamilTitle: "வஞ்சிரம் / நெய்மீன் (Seer Fish)",
    headline: "Specialized in All Sizes. 100% Live-Hooked.",
    description:
      "The undisputed crown jewel of coastal Tamil cuisine. Reeled by handline from deep waters off Kasimedu. We stock and supply every size category—from 1.5kg tender table fish to 6kg+ giant King Seer fish with unbruised, firm white meat.",
    subItems: [
      {
        name: "Vanjaram (Seer Fish)",
        tamilName: "வஞ்சிரம் / நெய்மீன்",
        image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=1200&q=80",
        sizeSpecs: "All Sizes Available (1 kg to 8+ kg Giants)",
        highlights: ["Zero Net Trauma", "Firm Sashimi-Grade Flesh", "High Natural Oil Content"],
        tasteNotes: "Dense, juicy steaks that hold marinades without breaking; perfect for tawa fry & fish curry.",
      },
    ],
    supplyHighlights: [
      "Custom slicing: Thick Steaks, Curry Cuts, or Whole Fish",
      "Supplied daily to fine dining restaurants & seafood stalls",
      "Immediate sub-zero cold slurry packing upon boat landing",
    ],
  },

  // 2. Sankara & Kadavaral
  {
    id: "sankara-kadavaral",
    stageNumber: "02",
    category: "Fresh Catch",
    title: "Sankara & Kadavaral",
    tamilTitle: "சங்கரா & கடவரால் (Red Snapper & Rock Cod)",
    headline: "Reef Hook Catches. Intense Flavor & Flake Firmness.",
    description:
      "Harvested from natural coral reef drop-offs. Sankara offers vibrant rose-crimson skin with pearl-white flakes for searing, while Kadavaral (Grouper) is prized for gelatinous, dense meat that makes legendary fish curries.",
    subItems: [
      {
        name: "Sankara (Red Snapper)",
        tamilName: "சங்கரா மீன்",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
        sizeSpecs: "500g to 2.5 kg per fish",
        highlights: ["Crisp Skin Roast", "Sweet Flake Texture", "Reef Handline Reeled"],
        tasteNotes: "Moist, sweet, nutty undertones; crisp skin crisps dramatically when pan-roasted.",
      },
      {
        name: "Kadavaral (Rock Cod / Grouper)",
        tamilName: "கடவரால் மீன்",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
        sizeSpecs: "1 kg to 5 kg sizes",
        highlights: ["Thick Succulent Meat", "Gelatinous Head for Curry", "High Gelatin Density"],
        tasteNotes: "Deep sea predator fish with dense chunks that absorb tamarind gravy deeply.",
      },
    ],
    supplyHighlights: [
      "Uniform weight grading for hotel banquet consistency",
      "Gutted & descaled with cold sterile seawater upon request",
      "Live hooked to preserve firm skin without scrapes",
    ],
  },

  // 3. Soora & Ayila
  {
    id: "soora-ayila",
    stageNumber: "03",
    category: "Fresh Catch",
    title: "Soora & Ayila",
    tamilTitle: "சூரை & அயிலா (Yellowfin Tuna & Mackerel)",
    headline: "Pelagic Powerhouses. Packed with Natural Omega-3.",
    description:
      "Deep pelagic species reeled at sea dawn. Yellowfin Tuna (Soora) delivers ruby-red steaks with pure lean protein, while Ayila (Indian Mackerel) is naturally rich in oceanic fats and healthy oils, making it a beloved everyday favorite.",
    subItems: [
      {
        name: "Soora (Yellowfin Tuna)",
        tamilName: "சூரை மீன்",
        image: "https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?auto=format&fit=crop&w=1200&q=80",
        sizeSpecs: "2 kg to 15 kg Loins",
        highlights: ["Pure Ruby Protein", "Sashimi / Steak Grade", "Zero Trawler Bruising"],
        tasteNotes: "Meaty, firm, steak-like texture; ideal for pepper pan-searing and protein diets.",
      },
      {
        name: "Ayila (Indian Mackerel)",
        tamilName: "அயிலா மீன்",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
        sizeSpecs: "150g to 300g uniform counts",
        highlights: ["High Omega-3 Density", "Daily Dawn Landing", "Full Savoriness"],
        tasteNotes: "Rich, savory coastal taste with tender flaky flesh that fries to golden perfection.",
      },
    ],
    supplyHighlights: [
      "Bulk crate supply for food stalls and mess kitchens",
      "Loin portioning and custom cutting available",
      "Sub-zero temperature data-logged in transit",
    ],
  },

  // 4. Prawn, Squid, & Lobster
  {
    id: "prawn-squid-lobster",
    stageNumber: "04",
    category: "Fresh Catch",
    title: "Prawn, Squid, & Lobster",
    tamilTitle: "இறால், கணவா & சிங்க இறால்",
    headline: "Wild Shellfish Trio. Snappy, Sweet & Succulent.",
    description:
      "The ultimate triumvirate of coastal shellfish. Jumbo wild prawns with a crisp saline snap, fresh squid tubes that cook tender without rubberiness, and deep-sea spiny lobsters for luxury dining banquets.",
    subItems: [
      {
        name: "Wild Tiger & White Prawn",
        tamilName: "புலி இறால் / கடல் இறால்",
        image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=80",
        sizeSpecs: "Medium, Jumbo & Extra-Jumbo Counts",
        highlights: ["Crisp Saline Bite", "Deveined & Cleaned", "Zero Preservatives"],
        tasteNotes: "Naturally sweet, succulent, and snaps crisply between teeth when butter seared.",
      },
      {
        name: "Kanava (Fresh Calamari / Squid)",
        tamilName: "கணவா (Squid)",
        image: "https://images.unsplash.com/photo-1548811579-017cf2a4268b?auto=format&fit=crop&w=1200&q=80",
        sizeSpecs: "Cleaned Tubes & Tentacles",
        highlights: ["Tender Calamari Rings", "Slurry Flash Chilled", "Zero Rubbery Texture"],
        tasteNotes: "Delicate oceanic sweetness that absorbs garlic, butter, and fiery dry spices.",
      },
      {
        name: "Singa Eraal (Spiny Rock Lobster)",
        tamilName: "சிங்க இறால் (Lobster)",
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80",
        sizeSpecs: "400g to 1.8 kg each",
        highlights: ["Jumbo Tail Meat", "Fine Dining Grade", "Live Hooked / Slurry Kept"],
        tasteNotes: "Rich, buttery, luxurious firm tail meat; star of premium coastal banquets.",
      },
    ],
    supplyHighlights: [
      "Supplied whole head-on, deveined, or tail-on to hotel chefs",
      "Weighed accurately in sea water slurries with zero ice melt loss",
      "Express same-day cold crate transport to restaurant kitchens",
    ],
  },

  // 5. Kelithi, Nethili, & Mathi
  {
    id: "kelithi-nethili-mathi",
    stageNumber: "05",
    category: "Fresh Catch",
    title: "Kelithi, Nethili, & Mathi",
    tamilTitle: "கெளுத்தி, நெத்திலி & மத்தி",
    headline: "Heritage Coastal Hauls. Dawn Landings.",
    description:
      "Traditional coastal staples beloved across generations. Kelithi (Catfish) is celebrated for boneless dense meat, white Nethili anchovies offer pristine crispy fry indulgence, and Mathi sardines provide unmatched nutritional density.",
    subItems: [
      {
        name: "Kelithi (Sea Catfish)",
        tamilName: "கெளுத்தி மீன்",
        image: "https://images.unsplash.com/photo-1510130387422-82ebd33b1046?auto=format&fit=crop&w=1200&q=80",
        sizeSpecs: "800g to 3 kg sizes",
        highlights: ["Rich Density", "Boneless Cleaned Chunks", "Spicy Thokku Favorite"],
        tasteNotes: "Unique, robust coastal flavor that melds effortlessly with garlic-tamarind curries.",
      },
      {
        name: "Nethili (White Silver Anchovies)",
        tamilName: "நெத்திலி மீன்",
        image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=1200&q=80",
        sizeSpecs: "Uniform Fresh Counts",
        highlights: ["Crispy Deep Fry", "Gleaming Silver Scales", "Zero Formalin"],
        tasteNotes: "Crisp outside, tender bone-melt inside; absolute staple for seaside tawa stalls.",
      },
      {
        name: "Mathi (Oil Sardines)",
        tamilName: "மத்தி மீன்",
        image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=1200&q=80",
        sizeSpecs: "Uniform Fresh Catch Counts",
        highlights: ["Direct Shore Landing", "High Calcium & DHA", "Intact Scales"],
        tasteNotes: "Hearty, unadulterated sea flavor; prized for earthen-pot meen kuzhambu.",
      },
    ],
    supplyHighlights: [
      "Head & gut trimming available on request",
      "Daily dawn delivery directly to street food stalls & homes",
      "Guaranteed zero chemical soak or bleaching",
    ],
  },

  // 6. Premium Dry Fish: Waala Karuvadu & Nethili Karuvaadu
  {
    id: "dry-fish",
    stageNumber: "06",
    category: "Premium Dry Fish",
    title: "Waala Karuvadu & Nethili Karuvaadu",
    tamilTitle: "வாலாக் கருவாடு & நெத்திலிக் கருவாடு",
    headline: "Artisanal Sun-Cured. Pure Sea Salt, Zero Sand Grit.",
    description:
      "Hand-rubbed with unrefined Tuticorin sea salt and sun-cured on raised hygienic coconut mesh racks under coastal sea breezes. 100% natural, intensely savory, and free from sand or chemical preservatives.",
    subItems: [
      {
        name: "Waala Karuvadu (Ribbon Fish)",
        tamilName: "வாலாக் கருவாடு",
        image: "https://images.unsplash.com/photo-1520635360276-79f3dbd809f6?auto=format&fit=crop&w=1200&q=80",
        sizeSpecs: "Whole Strips / Portioned Cuts",
        highlights: ["Sea Salt Cured", "Traditional Umami", "Zero Chemicals"],
        tasteNotes: "Intensely savory, melts in spicy tomato garlic gravies with phenomenal aroma.",
      },
      {
        name: "Nethili Karuvaadu (Dried Anchovies)",
        tamilName: "நெத்திலிக் கருவாடு",
        image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1200&q=80",
        sizeSpecs: "250g, 500g & 5kg Bulk Bags",
        highlights: ["Clean Head-Trimmed", "Zero Sand Grit", "Sun-Dried Crisp"],
        tasteNotes: "Crunchy when shallow-fried with onions and green chillies; legendary comfort food.",
      },
    ],
    supplyHighlights: [
      "Hygienically cured on raised drying beds (never dried on ground)",
      "Vacuum-sealed in moisture-barrier bags for long shelf life",
      "Supplied in bulk to grocery stores, restaurants, and households across districts",
    ],
  },
];

