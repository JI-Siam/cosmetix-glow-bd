import type { Metadata } from "next";
import { Montserrat, Alex_Brush } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const scriptFont = Alex_Brush({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cosmetix Glow Bd | Authentic Korean Cosmetics in Bangladesh",
  description:
    "Shop 100% authentic Korean skincare, makeup, and haircare — sourced directly from Korea and delivered across Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${scriptFont.variable} antialiased bg-white text-brand-dark font-sans`}
      >
        <div id="root-content">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
