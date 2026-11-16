"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FishHookLine } from "./FishHookLine";
import { ContactModalItem } from "./ContactOrderModal";
import { Sparkles } from "lucide-react";

interface HarvestParallaxShowcaseProps {
  onContactOrder: (item: ContactModalItem) => void;
}

interface FishStageData {
  number: string;
  name: string;
  tamilName: string;
  englishAlt: string;
  image: string;
  sizeSpecs: string;
  description: string;
  tag: string;
}

const HARVEST_FISHES: FishStageData[] = [
  {
    number: "02",
    name: "Sankara",
    englishAlt: "Red Snapper",
    tamilName: "சங்கரா மீன்",
    image: "/fish/sankara.png",
    sizeSpecs: "500g to 2.5 kg sizes",
    description: "Vibrant coral-red reef catch reeled from rocky drop-offs. Flavour-rich skin and sweet, tender white flakes prized by Chennai seafood restaurants for fiery tawa roasts.",
    tag: "Reef Handline Reeled",
  },
  {
    number: "03",
    name: "Kadavaral",
    englishAlt: "Rock Cod / Grouper",
    tamilName: "கடவரால் மீன்",
    image: "/fish/boat_landing_catch.jpg",
    sizeSpecs: "1 kg to 5 kg sizes",
    description: "Prized deep sea predator fish with dense, succulent meat. Outstanding gelatinous texture for traditional coastal meen kuzhambu and heavy restaurant curries.",
    tag: "Prized Deep Catch",
  },
  {
    number: "04",
    name: "Soora",
    englishAlt: "Yellowfin Tuna",
    tamilName: "சூரை மீன்",
    image: "/fish/fresh_steaks_ice.jpg",
    sizeSpecs: "2 kg to 15 kg Loins",
    description: "Deep sea pelagic tuna harvested at sea dawn off Kasimedu. Packed with natural omega oils and pure dark-red protein loins with zero trawler net bruising.",
    tag: "Dawn Pelagic Hooked",
  },
  {
    number: "05",
    name: "Ayila",
    englishAlt: "Indian Mackerel",
    tamilName: "அயிலை / அயிரை மீன்",
    image: "/reference/fresh_silver_tray.png",
    sizeSpecs: "Medium & Jumbo Counts",
    description: "Gleaming silver mackerel naturally rich in healthy coastal oils. Unmatched depth of flavor when pan-roasted with freshly ground coastal spices.",
    tag: "Omega-Rich Coastal",
  },
  {
    number: "06",
    name: "Mathi",
    englishAlt: "Fresh Ocean Sardines",
    tamilName: "மத்தி மீன்",
    image: "/reference/fresh_silver_tray.png",
    sizeSpecs: "Daily Dawn Fresh Batches",
    description: "Pristine silver sardines reeled in morning sea sweeps. Crystal-clear eyes, firm texture, and deep oceanic flavor for homestyle curry and crispy fry.",
    tag: "Dawn Shore Catch",
  },
  {
    number: "07",
    name: "Tiger Prawns",
    englishAlt: "Wild Sea Prawns",
    tamilName: "கடல் இறால்",
    image: "/fish/vanjaram_cutting.jpg",
    sizeSpecs: "Medium, Jumbo & Extra-Jumbo",
    description: "Wild sea-harvested prawns with a firm, snappy bite and natural oceanic sweetness. Cleaned and graded head-on or tail-on for food stalls and grills.",
    tag: "Wild Saline Snap",
  },
  {
    number: "08",
    name: "Squid",
    englishAlt: "Fresh Calamari",
    tamilName: "கணவா மீன்",
    image: "/fish/seafood_ice_display.jpg",
    sizeSpecs: "Whole Tubes & Rings",
    description: "Clean, translucent fresh sea calamari. Tender and succulent when flash-fried or tossed with butter; zero rubbery firmness when chilled in ice slurry.",
    tag: "Restaurant Quality",
  },
  {
    number: "09",
    name: "Kelithi",
    englishAlt: "Sea Catfish",
    tamilName: "கெளுத்தி மீன்",
    image: "/fish/live_hook_catch.jpg",
    sizeSpecs: "800g to 3 kg sizes",
    description: "Deep water coastal catch celebrated for its dense, rich flake and smooth buttery texture. Perfect for traditional village-style spicy tamarind curries.",
    tag: "Rich Flavor Density",
  },
  {
    number: "10",
    name: "Nethili",
    englishAlt: "White Silver Anchovies",
    tamilName: "நெத்திலி மீன்",
    image: "/fish/boat_landing_catch.jpg",
    sizeSpecs: "Uniform Fresh Counts",
    description: "Gleaming silver coastal anchovies reeled in dawn sweeps. Firm bodies with crystal clear eyes, ideal for fiery deep fry and homestyle thokku.",
    tag: "100% Day-Boat Fresh",
  },
];

function FishStageRow({
  fish,
  index,
  onContactOrder,
}: {
  fish: FishStageData;
  index: number;
  onContactOrder: (item: ContactModalItem) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const textParallaxY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  const isImageRight = index % 2 === 1;

  return (
    <div
      ref={rowRef}
      className="relative w-full py-16 sm:py-24 border-t border-[#BAE6FD]/40 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center px-2">
        {/* Photo Container */}
        <div
          className={`md:col-span-6 flex justify-center ${isImageRight ? "md:order-2 md:justify-end" : "md:order-1 md:justify-start"
            }`}
        >
          <motion.div
            style={{ y: imageParallaxY }}
            className="relative will-change-transform max-w-md w-full"
          >
            <div className="relative group overflow-hidden rounded-3xl bg-white border border-[#BAE6FD] shadow-[0_15px_40px_rgba(2,132,199,0.09)] p-2">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F0F9FF]">
                <img
                  src={fish.image}
                  alt={`${fish.name} (${fish.englishAlt})`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Tag Badge */}
              <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/95 border border-[#BAE6FD] text-[10px] font-mono text-[#0284C7] font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3 text-[#0D9488]" />
                <span>{fish.tag}</span>
              </div>

              {/* Size Specification Ribbon */}
              <div className="mt-2 p-3 rounded-xl bg-[#F8F6F0] border border-[#E8E4DC] flex items-center justify-between text-xs font-mono text-[#14243B]">
                <span className="font-medium">Grade: {fish.sizeSpecs}</span>
                <span className="text-[#0D9488] font-semibold">Harbor Fresh Catch</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Editorial Content Container */}
        <div
          className={`md:col-span-6 flex items-start justify-between gap-4 sm:gap-8 ${isImageRight ? "md:order-1" : "md:order-2"
            }`}
        >
          <motion.div
            style={{ y: textParallaxY }}
            className="space-y-3 sm:space-y-4 max-w-lg will-change-transform w-full"
          >
            <span className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#0284C7] font-bold">
              THE TODAY&apos;S HARVEST
            </span>

            <div className="space-y-1">
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0A2540] tracking-tight leading-tight">
                {fish.number} / {fish.name}
              </h2>
              <div className="font-serif text-xl sm:text-2xl text-[#52657A] font-normal">
                ({fish.englishAlt})
              </div>
              <div className="text-xs sm:text-sm font-mono text-[#0D9488] font-semibold pt-0.5">
                {fish.tamilName} • {fish.sizeSpecs}
              </div>
            </div>

            <p className="text-xs sm:text-sm font-sans text-[#52657A] leading-relaxed">
              {fish.description}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() =>
                  onContactOrder({
                    name: `${fish.name} (${fish.englishAlt})`,
                    category: "Fresh Catch",
                    tamilName: fish.tamilName,
                  })
                }
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-[#0284C7] text-[#0284C7] hover:bg-[#0284C7] hover:text-white transition-all text-xs font-sans tracking-wide uppercase font-semibold cursor-pointer active:scale-95 shadow-xs"
              >
                Contact to Order
              </button>
            </div>
          </motion.div>

          {/* Vertical line with fish hook */}
          <div className="hidden sm:block pt-2 shrink-0">
            <FishHookLine lineHeight="h-32 sm:h-44" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HarvestParallaxShowcase({ onContactOrder }: HarvestParallaxShowcaseProps) {
  return (
    <section id="harvest-sequence" className="relative w-full bg-[#FAF8F5] text-[#14243B] border-t border-[#E8E4DC] px-4 sm:px-10 lg:px-20">
      {HARVEST_FISHES.map((fish, index) => (
        <FishStageRow
          key={fish.number}
          fish={fish}
          index={index}
          onContactOrder={onContactOrder}
        />
      ))}
    </section>
  );
}
