import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F4F8FA",
};

export const metadata: Metadata = {
  title: "SSS Sea Foods | Premium Live-Hooked Catch. Ocean-Fresh. Delivered.",
  description:
    "SSS Sea Foods offers 100% live-hooked ocean catch. Specialized in all sizes of premium Vanjaram, direct supply to restaurants & food stalls, and district-to-district secure delivery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} h-full antialiased light`}
    >
      <body className="min-h-full bg-[#F4F8FA] text-[#0A2540] flex flex-col font-sans selection:bg-[#38BDF8]/25 selection:text-[#0A2540]">
        {children}
      </body>
    </html>
  );
}
