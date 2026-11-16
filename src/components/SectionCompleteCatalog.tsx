"use client";

import React, { useState } from "react";
import { SEAFOOD_ITEMS } from "@/data/products";
import { ContactModalItem } from "./ContactOrderModal";
import { Phone, MessageSquare, ChevronDown } from "lucide-react";

interface SectionCompleteCatalogProps {
  onContactOrder: (item: ContactModalItem) => void;
}

export function SectionCompleteCatalog({ onContactOrder }: SectionCompleteCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<"All" | "Fresh Catch" | "Premium Dry Fish">("All");

  const filteredItems = SEAFOOD_ITEMS.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  return (
    <section
      id="complete-catalog"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-12 lg:px-20 bg-[#EDE8DE] text-[#14243B] border-t border-[#D8D5CD]/60"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#777873] font-medium mb-2">
              THE FULL HARVEST CATALOG
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#14243B] tracking-tight">
              All Ocean Varieties
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2">
            {(["All", "Fresh Catch", "Premium Dry Fish"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#14243B] text-white"
                    : "border border-[#14243B]/30 text-[#14243B] hover:bg-[#14243B]/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid in Warm Editorial Aesthetic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-[#F8F6F0] rounded-2xl border border-[#D8D5CD]/80 p-5 sm:p-6 flex flex-col justify-between shadow-[0_10px_25px_rgba(20,36,59,0.04)] hover:shadow-[0_15px_35px_rgba(20,36,59,0.08)] transition-all group"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-4 bg-[#EDE8DE]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#14243B]/80 backdrop-blur-sm text-[10px] font-mono text-white">
                    {item.availability}
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#777873] uppercase tracking-wider">
                    {String(index + 1).padStart(2, "0")} / {item.category}
                  </span>
                  <span className="text-[10px] font-sans text-[#7999A5] font-semibold">
                    {item.specialtyTag}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#14243B] mb-1">
                  {item.name}
                </h3>

                <p className="text-xs font-sans text-[#777873] mb-3">
                  {item.tamilName}
                </p>

                <p className="text-xs font-sans text-[#14243B]/80 leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D8D5CD]/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#777873]">
                  {item.typicalSizes}
                </span>

                <button
                  onClick={() =>
                    onContactOrder({
                      name: item.name,
                      category: item.category,
                      tamilName: item.tamilName,
                    })
                  }
                  className="px-4 py-1.5 rounded-full border border-[#14243B]/40 hover:border-[#14243B] text-[#14243B] hover:bg-[#14243B] hover:text-white transition-all text-xs font-sans cursor-pointer active:scale-95"
                >
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

