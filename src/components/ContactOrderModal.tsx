"use client";

import React, { useState } from "react";
import { X, Phone, MessageSquare, Check } from "lucide-react";
import confetti from "canvas-confetti";

export interface ContactModalItem {
  name: string;
  category: string;
  tamilName?: string;
}

interface ContactOrderModalProps {
  item: ContactModalItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactOrderModal({ item, isOpen, onClose }: ContactOrderModalProps) {
  const [orderType, setOrderType] = useState<"Restaurant / Stall Bulk" | "Custom Household">("Restaurant / Stall Bulk");
  const [district, setDistrict] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("5 kg");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen || !item) return null;

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello SSS Sea Foods,\n\nI want to inquire about ordering:\n• Item: ${item.name} (${item.category})\n• Order Type: ${orderType}\n• Delivery Location: ${district || "Not specified"}\n• Quantity: ${quantity || "Custom"}\n• Contact Name: ${name || "Customer"}\n\nPlease share today's dawn catch availability, price, and delivery schedule.`
    );
    window.open(`https://wa.me/919840012345?text=${text}`, "_blank");
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#0284C7", "#0D9488", "#BAE6FD"],
      });
    } catch (e) {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0A2540]/40 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog with Light Beach View Frame */}
      <div className="relative w-full max-w-xl bg-white/80 border border-white/60 rounded-[2rem] shadow-[0_30px_90px_rgba(7,21,36,0.22)] overflow-hidden z-10 my-8 text-[#071524] backdrop-blur-2xl">
        {/* Header */}
        <div className="relative p-6 sm:p-8 bg-white/40 border-b border-white/50 backdrop-blur-md">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/60 hover:bg-white text-[#071524] transition-all border border-white/60 shadow-xs cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/60 border border-white/70 text-[#0284C7] uppercase tracking-wider font-black shadow-2xs">
              {item.category}
            </span>
            <span className="text-xs font-mono text-[#006A60] font-black">
              • 100% Live-Hooked
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#071524]">
            {item.name}
          </h3>
          {item.tamilName && (
            <p className="text-xs sm:text-sm font-mono text-[#0284C7] font-black mt-0.5">
              {item.tamilName}
            </p>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Check className="w-8 h-8 text-[#0284C7] stroke-[2.5]" />
              </div>
              <h4 className="text-2xl font-serif font-black text-[#071524] mb-2">
                Inquiry Logged with Harbor Dispatch
              </h4>
              <p className="text-[#071524] font-bold text-sm max-w-md mx-auto mb-6">
                Our SSS Sea Foods harbor team has logged your inquiry for{" "}
                <span className="text-[#0284C7] font-black">{item.name}</span>.
                We will confirm today&apos;s market rates and arrange insulated ice-crate dispatch.
              </p>

              <button
                onClick={handleWhatsAppDirect}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs uppercase tracking-wider font-black shadow-md transition-all mb-4 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Open in WhatsApp for Instant Rate</span>
              </button>

              <div>
                <button
                  onClick={onClose}
                  className="text-xs font-mono text-[#0284C7] hover:underline uppercase tracking-wider mt-2 font-black cursor-pointer"
                >
                  Return to Catch Showcase
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Quick direct contact action buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-mono font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Order</span>
                </button>

                <a
                  href="tel:+919840012345"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-mono font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Dispatch</span>
                </a>
              </div>

              <div className="relative my-6 text-center">
                <hr className="border-white/60" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 px-3 text-[11px] font-mono text-[#071524] uppercase tracking-wider font-black">
                  Or Send Dispatch Request
                </span>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmitForm} className="space-y-4">
                {/* Order Type Toggle */}
                <div>
                  <label className="block text-xs font-mono text-[#071524] uppercase tracking-wider mb-2 font-black">
                    Supply Requirement
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["Restaurant / Stall Bulk", "Custom Household"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setOrderType(t)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-mono transition-all text-center cursor-pointer font-black ${
                          orderType === t
                            ? "bg-[#071524] text-white border-[#071524] shadow-sm"
                            : "bg-white/40 text-[#071524] border-white/60 hover:bg-white/60"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery Location Input */}
                <div>
                  <label className="block text-xs font-mono text-[#071524] uppercase tracking-wider mb-1.5 font-black">
                    Delivery Location / City / Address
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Chennai, Coimbatore, Madurai, or your street address"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/40 border border-white/60 text-[#071524] text-xs font-mono font-bold placeholder:text-gray-500 focus:outline-none focus:border-[#0284C7]"
                  />
                  <p className="mt-1 text-[11px] font-sans text-[#006A60] font-black">
                    ✓ Fresh cold-chain delivery in insulated thermal sub-zero ice crates.
                  </p>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs font-mono text-[#071524] uppercase tracking-wider mb-1.5 font-black">
                    Estimated Quantity
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 5 kg, 20 kg bulk, or whole 6kg fish"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/40 border border-white/60 text-[#071524] text-xs font-mono font-bold placeholder:text-gray-500 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                {/* Contact Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#071524] uppercase tracking-wider mb-1.5 font-black">
                      Your Name / Business Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Annamalai Seafood"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/40 border border-white/60 text-[#071524] text-xs font-mono font-bold placeholder:text-gray-500 focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#52657A] uppercase tracking-wider mb-1.5 font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 98400 12345"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-[#0A2540] text-xs font-mono placeholder:text-gray-400 focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full mt-4 py-3.5 rounded-full bg-gradient-to-r from-[#0284C7] to-[#0D9488] hover:from-[#0369A1] hover:to-[#0F766E] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Submit Order Inquiry
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
