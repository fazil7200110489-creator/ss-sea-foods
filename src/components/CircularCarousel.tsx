"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ContactModalItem } from "./ContactOrderModal";
import { ChevronLeft, ChevronRight, Anchor, ShieldCheck } from "lucide-react";

interface FishVarietyItem {
  number: string;
  name: string;
  englishAlt: string;
  tamilName: string;
  image: string;
  sizeSpecs: string;
  description: string;
  tag: string;
}

const FISH_VARIETIES: FishVarietyItem[] = [
  {
    number: "01",
    name: "Vanjaram",
    englishAlt: "King Seer Fish",
    tamilName: "வஞ்சிரம் / நெய்மீன்",
    image: "/fish/vanjaram_ice_platter.jpg",
    sizeSpecs: "1 kg to 8+ kg Giants",
    description: "Our signature specialty. 100% live-hooked single handline catch with pristine, firm white flesh and unbroken bloodlines.",
    tag: "Kasimedu Signature",
  },
  {
    number: "02",
    name: "Sankara",
    englishAlt: "Red Snapper",
    tamilName: "சங்கரா மீன்",
    image: "/fish/sankara.png",
    sizeSpecs: "500g to 2.5 kg sizes",
    description: "Vibrant coral-red reef catch. Flavour-rich skin and sweet, tender white flakes prized by Chennai seafood restaurants for fiery tawa roasts.",
    tag: "Reef Handline",
  },
  {
    number: "03",
    name: "Kadavaral",
    englishAlt: "Rock Cod / Grouper",
    tamilName: "கடவரால் மீன்",
    image: "/fish/boat_landing_catch.jpg",
    sizeSpecs: "1 kg to 5 kg sizes",
    description: "Prized deep sea predator fish with dense, succulent meat. Outstanding gelatinous texture for traditional coastal meen kuzhambu.",
    tag: "Prized Deep Catch",
  },
  {
    number: "04",
    name: "Soora",
    englishAlt: "Yellowfin Tuna",
    tamilName: "சூரை மீன்",
    image: "/fish/fresh_steaks_ice.jpg",
    sizeSpecs: "2 kg to 15 kg Loins",
    description: "Deep sea pelagic tuna harvested at sea dawn. Packed with natural omega oils and pure dark-red lean protein with zero net bruising.",
    tag: "Dawn Pelagic Hooked",
  },
  {
    number: "05",
    name: "Ayila",
    englishAlt: "Indian Mackerel",
    tamilName: "அயிலை / அயிரை மீன்",
    image: "/reference/fresh_silver_tray.png",
    sizeSpecs: "Medium & Jumbo Counts",
    description: "Gleaming silver mackerel naturally rich in healthy coastal oils. Unmatched depth of flavor for everyday homestyle curries.",
    tag: "Omega-Rich Coastal",
  },
  {
    number: "06",
    name: "Mathi",
    englishAlt: "Ocean Sardines",
    tamilName: "மத்தி மீன்",
    image: "/reference/fresh_silver_tray.png",
    sizeSpecs: "Dawn Harvest Batches",
    description: "Pristine silver sardines reeled in morning sea sweeps. Crystal-clear eyes, firm texture, and deep oceanic flavor for crispy tawa fry.",
    tag: "Dawn Shore Catch",
  },
  {
    number: "07",
    name: "Tiger Prawns",
    englishAlt: "Wild Sea Prawns",
    tamilName: "கடல் இறால்",
    image: "/fish/vanjaram_cutting.jpg",
    sizeSpecs: "Medium, Jumbo & Extra-Jumbo",
    description: "Wild sea-harvested prawns with a firm, snappy bite and oceanic sweetness. Cleaned and graded head-on or tail-on for food stalls and grills.",
    tag: "Wild Saline Snap",
  },
  {
    number: "08",
    name: "Squid",
    englishAlt: "Fresh Calamari",
    tamilName: "கணவா மீன்",
    image: "/fish/seafood_ice_display.jpg",
    sizeSpecs: "Whole Tubes & Rings",
    description: "Clean, translucent fresh sea calamari. Tender and succulent when flash-fried; zero rubbery firmness when chilled in ice slurry.",
    tag: "Restaurant Quality",
  },
  {
    number: "09",
    name: "Kelithi",
    englishAlt: "Sea Catfish",
    tamilName: "கெளுத்தி மீன்",
    image: "/fish/live_hook_catch.jpg",
    sizeSpecs: "800g to 3 kg sizes",
    description: "Deep water coastal catch celebrated for its dense, rich flake and smooth buttery texture. Ideal for traditional spicy tamarind gravies.",
    tag: "Rich Flavor Density",
  },
  {
    number: "10",
    name: "Nethili",
    englishAlt: "White Silver Anchovies",
    tamilName: "நெத்திலி மீன்",
    image: "/fish/boat_landing_catch.jpg",
    sizeSpecs: "Uniform Fresh Counts",
    description: "Gleaming silver coastal anchovies reeled in dawn sweeps. Firm bodies with crystal clear eyes, perfect for fiery deep fry and thokku.",
    tag: "100% Day-Boat Fresh",
  },
];

interface CircularCarouselProps {
  onContactOrder: (item: ContactModalItem) => void;
}

export function CircularCarousel({ onContactOrder }: CircularCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const count = FISH_VARIETIES.length;
  const angleStep = 360 / count;
  const radius = 420;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotateTo = (index: number) => {
    const targetAngle = -index * angleStep;
    let diff = (targetAngle - (rotation % 360)) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    setRotation((prev) => prev + diff);
    setActiveIndex(index);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % count;
    rotateTo(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + count) % count;
    rotateTo(prevIdx);
  };

  // Touch Swipe for Mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Desktop Pointer Drag
  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setStartRotation(rotation);
  };

  const handlePointerMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      const delta = (clientX - startX) * 0.4;
      setRotation(startRotation + delta);
    },
    [isDragging, startX, startRotation]
  );

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const snappedIdx = Math.round(((-rotation % 360) + 360) % 360 / angleStep) % count;
    rotateTo(snappedIdx);
  };

  const currentFish = FISH_VARIETIES[activeIndex];

  return (
    <section
      id="circular-showcase"
      className="relative w-full py-16 sm:py-28 px-4 sm:px-10 lg:px-20 bg-[#FAF8F5] text-[#14243B] border-t border-[#E8E4DC] overflow-hidden select-none"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E4DC] text-[#0284C7] text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-3 shadow-xs font-semibold">
          <Anchor className="w-3.5 h-3.5 text-[#0D9488]" />
          <span>Dawn Kasimedu Catch</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
          <span className="text-[#64748B] font-sans">10 Ocean Varieties</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#14243B] tracking-tight mb-2">
          Explore The Full Catch
        </h2>

        <p className="text-xs sm:text-sm font-sans text-[#64748B] leading-relaxed">
          100% Live-hooked single handline catch. Delivered fresh daily from ocean to table.
        </p>
      </div>

      {/* MOBILE VIEW: Non-overlapping, clean touch-swipeable showcase */}
      {isMobile ? (
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full max-w-sm mx-auto px-2"
        >
          <div className="bg-white rounded-3xl border border-[#BAE6FD] shadow-[0_15px_40px_rgba(2,132,199,0.1)] p-4 flex flex-col justify-between overflow-hidden">
            {/* Photo */}
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F0F9FF] shadow-inner">
              <img
                src={currentFish.image}
                alt={currentFish.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 border border-[#BAE6FD] text-[10px] font-mono text-[#0284C7] font-semibold">
                {currentFish.number} / {count}
              </div>
              <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-[#0A2540]/85 text-[10px] font-mono text-white">
                {currentFish.tag}
              </div>
            </div>

            {/* Fish Info */}
            <div className="pt-3 px-1 text-center">
              <div className="text-xs font-mono text-[#0D9488] font-semibold">
                {currentFish.tamilName}
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0A2540] mt-0.5">
                {currentFish.name}
              </h3>
              <div className="text-xs font-mono text-[#52657A] font-medium mt-0.5">
                ({currentFish.englishAlt}) • {currentFish.sizeSpecs}
              </div>
              <p className="text-xs text-[#52657A] font-sans mt-2 line-clamp-3 leading-relaxed">
                {currentFish.description}
              </p>
            </div>

            {/* Order Action */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() =>
                  onContactOrder({
                    name: `${currentFish.name} (${currentFish.englishAlt})`,
                    category: "Fresh Catch",
                    tamilName: currentFish.tamilName,
                  })
                }
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#0D9488] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Order This Catch (Chennai Delivery)
              </button>
            </div>
          </div>

          {/* Mobile Dots & Next/Prev Controls */}
          <div className="flex items-center justify-between mt-5 px-2">
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="w-10 h-10 rounded-full bg-white border border-[#BAE6FD] text-[#0A2540] flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 text-[#0284C7]" />
            </button>

            {/* Indicators */}
            <div className="flex items-center gap-1.5">
              {FISH_VARIETIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? "w-6 bg-[#0284C7]" : "w-2 bg-[#BAE6FD]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next"
              className="w-10 h-10 rounded-full bg-white border border-[#BAE6FD] text-[#0A2540] flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5 text-[#0284C7]" />
            </button>
          </div>
        </div>
      ) : (
        /* DESKTOP VIEW: Full 3D Circular Ring Carousel */
        <div className="w-full">
          <div
            onMouseDown={(e) => handlePointerDown(e.clientX)}
            onMouseMove={(e) => handlePointerMove(e.clientX)}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            className={`relative w-full h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing ${
              isDragging ? "cursor-grabbing" : ""
            }`}
            style={{ perspective: "1300px" }}
          >
            <div
              className="relative w-[320px] h-[400px]"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${rotation}deg)`,
                transition: isDragging ? "none" : "transform 0.7s cubic-bezier(0.2, 0.9, 0.3, 1)",
              }}
            >
              {FISH_VARIETIES.map((fish, index) => {
                const itemAngle = index * angleStep;
                const isCurrent = index === activeIndex;

                return (
                  <div
                    key={fish.number}
                    onClick={() => {
                      if (!isDragging) {
                        if (isCurrent) {
                          onContactOrder({
                            name: `${fish.name} (${fish.englishAlt})`,
                            category: "Fresh Catch",
                            tamilName: fish.tamilName,
                          });
                        } else {
                          rotateTo(index);
                        }
                      }
                    }}
                    className={`absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden bg-white border transition-all duration-300 shadow-[0_20px_45px_rgba(2,132,199,0.12)] flex flex-col justify-between p-4 backdrop-blur-xl ${
                      isCurrent
                        ? "border-[#0284C7] ring-4 ring-[#BAE6FD]/60 shadow-[0_25px_60px_rgba(2,132,199,0.22)]"
                        : "border-[#BAE6FD]/60 opacity-80 hover:opacity-100"
                    }`}
                    style={{
                      transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {/* Photo */}
                    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F0F9FF] shadow-inner">
                      <img
                        src={fish.image}
                        alt={fish.name}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 border border-[#BAE6FD] text-[10px] font-mono text-[#0284C7] font-semibold">
                        {fish.number} / 10
                      </div>
                      <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-[#0A2540]/85 text-[10px] font-mono text-white">
                        {fish.tag}
                      </div>
                    </div>

                    {/* Fish Info */}
                    <div className="pt-2 px-1 text-center">
                      <div className="text-[11px] font-mono text-[#0D9488] font-semibold">
                        {fish.tamilName}
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#0A2540]">
                        {fish.name}
                      </h3>
                      <p className="text-[11px] text-[#52657A] font-sans line-clamp-2 mt-0.5">
                        {fish.description}
                      </p>
                    </div>

                    {/* Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onContactOrder({
                          name: `${fish.name} (${fish.englishAlt})`,
                          category: "Fresh Catch",
                          tamilName: fish.tamilName,
                        });
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                        isCurrent
                          ? "bg-gradient-to-r from-[#0284C7] to-[#0D9488] text-white hover:opacity-95 shadow-md active:scale-95"
                          : "bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] hover:bg-[#0284C7] hover:text-white"
                      }`}
                    >
                      {isCurrent ? "Order This Catch" : "View Details"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous Fish"
                className="w-11 h-11 rounded-full bg-white border border-[#BAE6FD] hover:border-[#0284C7] text-[#0A2540] flex items-center justify-center shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 text-[#0284C7]" />
              </button>

              <div className="px-5 py-2 rounded-full bg-white border border-[#BAE6FD] shadow-sm flex items-center gap-2 text-xs font-mono">
                <span className="text-[#0284C7] font-bold">
                  {currentFish.number} / {count}
                </span>
                <span className="text-[#52657A]">•</span>
                <span className="text-[#0A2540] font-semibold">{currentFish.name}</span>
                <span className="text-[#52657A]">({currentFish.sizeSpecs})</span>
              </div>

              <button
                onClick={handleNext}
                aria-label="Next Fish"
                className="w-11 h-11 rounded-full bg-white border border-[#BAE6FD] hover:border-[#0284C7] text-[#0A2540] flex items-center justify-center shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5 text-[#0284C7]" />
              </button>
            </div>

            {/* Quick Pills */}
            <div className="max-w-4xl flex flex-wrap justify-center gap-1.5 sm:gap-2 pt-2">
              {FISH_VARIETIES.map((fish, idx) => (
                <button
                  key={fish.number}
                  onClick={() => rotateTo(idx)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                    idx === activeIndex
                      ? "bg-[#0284C7] text-white font-semibold shadow-xs"
                      : "bg-white/80 hover:bg-white border border-[#BAE6FD] text-[#52657A] hover:text-[#0A2540]"
                  }`}
                >
                  {fish.number} {fish.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
