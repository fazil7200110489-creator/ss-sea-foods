"use client";

import React, { useState } from "react";
import { ContactModalItem } from "./ContactOrderModal";
import { Sparkles, Anchor, ArrowUpRight, CheckCircle2 } from "lucide-react";

interface SectionSeafoodVarietiesProps {
  onContactOrder: (item: ContactModalItem) => void;
}

interface FishProduct {
  id: string;
  number: string;
  name: string;
  englishAlt: string;
  tamilName: string;
  category: "signature" | "reef_pelagic" | "silvers_shellfish";
  image: string;
  sizeSpecs: string;
  description: string;
  culinaryNote: string;
  badge: string;
  featured?: boolean;
}

const PRODUCTS: FishProduct[] = [
  {
    id: "vanjaram",
    number: "01",
    name: "Vanjaram",
    englishAlt: "King Seer Fish",
    tamilName: "வஞ்சிரம் / நெய்மீன்",
    category: "signature",
    image: "/fish/vanjaram_ice_platter.jpg",
    sizeSpecs: "1 kg to 8+ kg Giants",
    description:
      "Our signature harvest reeled live by single handline from Kasimedu deep waters. Pristine crystalline white flesh with unbroken bloodlines and zero trawler compression trauma.",
    culinaryNote: "Thick tawa fry steaks, fish biryani & king steaks",
    badge: "Kasimedu Signature Harvest",
    featured: true,
  },
  {
    id: "sankara",
    number: "02",
    name: "Sankara",
    englishAlt: "Coral Red Snapper",
    tamilName: "சங்கரா மீன்",
    category: "reef_pelagic",
    image: "/fish/sankara.png",
    sizeSpecs: "500g to 2.5 kg sizes",
    description:
      "Vibrant coral-red reef catch reeled from rocky drop-offs. Flavour-rich skin and sweet, tender white flakes prized by seafood restaurants for fiery tawa roasts.",
    culinaryNote: "Whole fish roasts, grilled fillets & chettinad curries",
    badge: "Reef Handline Reeled",
  },
  {
    id: "kadavaral",
    number: "03",
    name: "Kadavaral",
    englishAlt: "Rock Cod / Grouper",
    tamilName: "கடவரால் மீன்",
    category: "reef_pelagic",
    image: "/fish/boat_landing_catch.jpg",
    sizeSpecs: "1 kg to 5 kg sizes",
    description:
      "Prized deep sea predator fish with dense, succulent meat. Outstanding gelatinous skin texture that enriches traditional coastal meen kuzhambu.",
    culinaryNote: "Traditional slow-simmered fish curries & head gravies",
    badge: "Deep Water Catch",
  },
  {
    id: "soora",
    number: "04",
    name: "Soora",
    englishAlt: "Yellowfin Tuna",
    tamilName: "சூரை மீன்",
    category: "reef_pelagic",
    image: "/fish/fresh_steaks_ice.jpg",
    sizeSpecs: "2 kg to 15 kg Loins",
    description:
      "Deep sea pelagic tuna harvested at sea dawn off Kasimedu. Packed with natural omega-3 oils and pure dark-red lean protein with zero net bruising.",
    culinaryNote: "Steak searing, tawa fry, fish cutlets & curry chunks",
    badge: "Pelagic Dawn Hooked",
    featured: true,
  },
  {
    id: "ayila",
    number: "05",
    name: "Ayila",
    englishAlt: "Indian Mackerel",
    tamilName: "அயிலை / அயிரை மீன்",
    category: "silvers_shellfish",
    image: "/reference/fresh_silver_tray.png",
    sizeSpecs: "Medium & Jumbo Counts",
    description:
      "Gleaming silver mackerel naturally rich in healthy coastal oils. Unmatched depth of oceanic flavor for everyday aromatic curries and crispy shallow fry.",
    culinaryNote: "Spicy meen kuzhambu & rustic coconut tawa roasts",
    badge: "Omega-Rich Silver Catch",
  },
  {
    id: "mathi",
    number: "06",
    name: "Mathi",
    englishAlt: "Ocean Sardines",
    tamilName: "மத்தி மீன்",
    category: "silvers_shellfish",
    image: "/reference/fresh_sardines.png",
    sizeSpecs: "Dawn Shoreline Sweep",
    description:
      "Pristine silver sardines reeled in morning sea sweeps. Crystal-clear convex eyes, firm silvery skin, and intense savory oceanic flavor.",
    culinaryNote: "Crispy rava fry, coastal chatti curries & pollichathu",
    badge: "Day-Boat Dawn Sweep",
  },
  {
    id: "tiger_prawns",
    number: "07",
    name: "Tiger Prawns",
    englishAlt: "Wild Sea Prawns",
    tamilName: "கடல் இறால்",
    category: "silvers_shellfish",
    image: "/fish/vanjaram_cutting.jpg",
    sizeSpecs: "Medium, Jumbo & Extra-Jumbo",
    description:
      "Wild sea-harvested prawns with a firm, snappy texture and natural oceanic sweetness. Cleaned and graded head-on or tail-on for food stalls and gourmet grills.",
    culinaryNote: "Prawn thokku, butter garlic sauté & biryani portions",
    badge: "Wild Saline Snap",
  },
  {
    id: "squid",
    number: "08",
    name: "Squid",
    englishAlt: "Fresh Calamari",
    tamilName: "கணவா மீன்",
    category: "silvers_shellfish",
    image: "/fish/seafood_ice_display.jpg",
    sizeSpecs: "Whole Tubes & Rings",
    description:
      "Clean, translucent fresh sea calamari. Tender and succulent when flash-fried; zero rubbery firmness when chilled in our sub-zero brine ice slurry.",
    culinaryNote: "Crispy calamari rings, pepper fry & masala sauté",
    badge: "Restaurant Grade A",
  },
  {
    id: "kelithi",
    number: "09",
    name: "Kelithi",
    englishAlt: "Sea Catfish",
    tamilName: "கெளுத்தி மீன்",
    category: "reef_pelagic",
    image: "/fish/live_hook_catch.jpg",
    sizeSpecs: "800g to 3 kg sizes",
    description:
      "Deep water coastal catch celebrated for its dense, rich flake and smooth buttery texture. Ideal for traditional spicy tamarind gravies.",
    culinaryNote: "Village-style tamarind meen kuzhambu & masala fry",
    badge: "Rich Flavor Density",
  },
  {
    id: "nethili",
    number: "10",
    name: "Nethili",
    englishAlt: "White Silver Anchovies",
    tamilName: "நெத்திலி மீன்",
    category: "silvers_shellfish",
    image: "/reference/fresh_silver_tray.png",
    sizeSpecs: "Uniform Fresh Counts",
    description:
      "Gleaming silver coastal anchovies reeled in dawn sweeps. Firm bodies with crystal clear eyes, perfect for fiery deep fry and thokku.",
    culinaryNote: "Fiery nethili fry, pepper thokku & crispy appetizer",
    badge: "100% Day-Boat Fresh",
  },
];

export function SectionSeafoodVarieties({ onContactOrder }: SectionSeafoodVarietiesProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "signature" | "reef_pelagic" | "silvers_shellfish">("all");

  const filteredProducts = activeCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="seafood-varieties"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-10 lg:px-20 bg-[#F8F6F0] text-[#14243B] border-t border-[#D8D5CD]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header (Balanced, Tight, Editorial) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14 pb-6 border-b border-[#D8D5CD]">
          <div className="space-y-2 max-w-xl">
            <span className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#1E3A5F] font-bold">
              THE COMPLETE OCEAN COLLECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#14243B] tracking-tight leading-tight">
              10 Fresh Handline Varieties
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#777873] leading-relaxed">
              Harvested daily off Kasimedu deep waters. Each fish is reeled live by handline, chilled in -1.5°C ice slurry, and custom portioned on demand.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Catch (10)" },
              { id: "signature", label: "Vanjaram Flagship" },
              { id: "reef_pelagic", label: "Reef & Pelagic" },
              { id: "silvers_shellfish", label: "Silvers & Shellfish" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#14243B] text-white border border-[#14243B] shadow-2xs font-semibold"
                    : "bg-[#FFFDF8] text-[#777873] border border-[#D8D5CD] hover:border-[#14243B]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Photographic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((fish, index) => {
            const isSpan2 = fish.featured && (index === 0 || index === 3);

            return (
              <div
                key={fish.id}
                className={`group rounded-3xl bg-[#FFFDF8] border border-[#D8D5CD] overflow-hidden p-3 sm:p-4 flex flex-col justify-between shadow-[0_15px_35px_rgba(20,36,59,0.06)] hover:shadow-[0_20px_45px_rgba(20,36,59,0.1)] transition-all ${
                  isSpan2 ? "lg:col-span-2" : "col-span-1"
                }`}
              >
                {/* Photo Container with Elegant Aspect Ratio */}
                <div>
                  <div
                    className={`relative w-full rounded-2xl overflow-hidden bg-[#F8F6F0] mb-4 ${
                      isSpan2 ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[4/3]"
                    }`}
                  >
                    <img
                      src={fish.image}
                      alt={`${fish.name} (${fish.englishAlt})`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Frame Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FFFDF8]/95 border border-[#D8D5CD] text-[10px] font-mono font-semibold text-[#1E3A5F] shadow-2xs flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#0D9488]" />
                      <span>{fish.badge}</span>
                    </div>

                    {/* Number Tag */}
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-[#14243B]/85 text-white text-[10px] font-mono">
                      {fish.number} / 10
                    </div>
                  </div>

                  {/* Fish Names & Grade */}
                  <div className="space-y-1 mb-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#14243B] font-normal leading-tight">
                        {fish.name}
                      </h3>
                      <span className="text-xs font-mono text-[#777873]">
                        {fish.englishAlt}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-[#0D9488] font-semibold">
                      {fish.tamilName} • Grade: {fish.sizeSpecs}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs font-sans text-[#777873] leading-relaxed mb-3">
                    {fish.description}
                  </p>
                </div>

                {/* Culinary Note & Action Button */}
                <div className="pt-3 border-t border-[#D8D5CD]/60 space-y-3">
                  <div className="text-[11px] font-mono text-[#14243B] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                    <span className="truncate">Best for: {fish.culinaryNote}</span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#777873]">
                      Dawn Harvest Available
                    </span>

                    <button
                      onClick={() =>
                        onContactOrder({
                          name: `${fish.name} (${fish.englishAlt})`,
                          category: "Fresh Catch",
                          tamilName: fish.tamilName,
                        })
                      }
                      className="px-4 py-2 rounded-full border border-[#14243B] hover:bg-[#14243B] hover:text-white text-[#14243B] text-xs font-sans font-semibold tracking-wider uppercase transition-all active:scale-95 cursor-pointer shadow-2xs flex items-center gap-1.5"
                    >
                      <span>Inquire / Order</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

