"use client";

import Link from "next/link";
import {
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { subscribeToSettings, INITIAL_SETTINGS } from "@/lib/data-store";

export default function Footer() {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  const pathname = usePathname();
  const isAdminPage =
    pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  useEffect(() => {
    const unsubscribe = subscribeToSettings((data) => {
      if (data) setSettings(data);
    });
    return () => unsubscribe();
  }, []);

  // Derived values for social links
  const instagramUrl = settings.instagram.startsWith("@")
    ? `https://instagram.com/${settings.instagram.slice(1)}`
    : settings.instagram;
  const whatsappNumber = settings.phone.replace(/[^0-9]/g, "");

  if (isAdminPage) return null;
  return (
    <footer className="relative bg-brand-dark text-brand-light pt-24 pb-12 px-6 border-t border-brand-purple/10 overflow-hidden">
      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12">
        {/* Brand Column */}
        <div className="space-y-8">
          <Link href="/" className="flex flex-col group">
            <span className="text-4xl font-bold tracking-widest text-brand-purple font-sans uppercase group-hover:text-white transition-colors duration-500">
              Cosmetix Glow Bd
            </span>
            <span className="text-[10px] tracking-[0.4em] text-brand-cream/60 uppercase font-sans mt-2">
              Korean Beauty, Delivered
            </span>
          </Link>
          <p className="text-sm leading-8 text-brand-cream/60 max-w-xs font-light">
            Bringing 100% authentic Korean skincare, makeup, and haircare from
            Korea to Bangladesh. Discover your natural glow with genuine,
            dermatologist-tested K-beauty.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-brand-purple font-bold uppercase tracking-[0.2em] text-xs mb-8">
            Explore
          </h4>
          <ul className="space-y-4">
            {[
              { name: "Shop All Products", href: "/shop" },
              { name: "Bundles & Gift Sets", href: "/bundles" },
              { name: "Skin Guide", href: "/skin-guide" },
              { name: "Our Story", href: "/story" },
              { name: "Gallery", href: "/gallery" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm text-brand-cream/70 hover:text-brand-purple hover:pl-2 transition-all duration-300 uppercase tracking-wide flex items-center gap-2"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-brand-purple font-bold uppercase tracking-[0.2em] text-xs mb-8">
            Connect
          </h4>
          <ul className="space-y-6">
            <li className="flex items-start space-x-4 text-sm text-brand-cream/70 group">
              <Phone
                size={18}
                className="text-brand-purple mt-1 group-hover:text-white transition-colors"
              />
              <span className="leading-relaxed">{settings.phone}</span>
            </li>
            <li className="flex items-start space-x-4 text-sm text-brand-cream/70 group">
              <Mail
                size={18}
                className="text-brand-purple mt-1 group-hover:text-white transition-colors"
              />
              <span className="leading-relaxed">{settings.email}</span>
            </li>
            <li className="flex items-start space-x-4 text-sm text-brand-cream/70 group">
              <MapPin
                size={18}
                className="text-brand-purple mt-1 group-hover:text-white transition-colors"
              />
              <span className="leading-relaxed">{settings.location}</span>
            </li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h4 className="text-brand-purple font-bold uppercase tracking-[0.2em] text-xs mb-8">
            Follow Us
          </h4>
          <div className="flex space-x-6 mb-10">
            <Link
              href={instagramUrl}
              target="_blank"
              className="text-brand-cream/60 hover:text-brand-purple hover:-translate-y-1 transition-all duration-300"
            >
              <Instagram size={24} strokeWidth={1.5} />
            </Link>
            <Link
              href={settings.facebook}
              target="_blank"
              className="text-brand-cream/60 hover:text-brand-purple hover:-translate-y-1 transition-all duration-300"
            >
              <Facebook size={24} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="group relative p-6 border border-brand-purple/20 hover:border-brand-purple/50 transition-colors duration-500 bg-brand-light/5">
            <p className="text-[10px] text-brand-purple font-bold uppercase tracking-widest mb-3">
              Ready to Order?
            </p>
            <Link
              href="/contact"
              className="flex items-center gap-2 text-sm font-bold text-brand-cream group-hover:gap-4 transition-all duration-300"
            >
              <span>Order via WhatsApp</span>
              <ArrowRight size={16} className="text-brand-purple" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-brand-purple/5 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] text-brand-cream/30 uppercase">
        <p>© 2026 Cometix Glow Bd. All Rights Reserved.</p>
        <div className="flex space-x-8 mt-6 md:mt-0">
          <Link
            href="/login"
            className="hover:text-brand-purple transition-colors"
          >
            Admin
          </Link>
          <Link
            href="/privacy"
            className="hover:text-brand-purple transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-brand-purple transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>

      {/* Floating WhatsApp Link */}
      <Link
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-brand-purple/20 hover:shadow-lg transition-all duration-300 z-40 flex items-center justify-center"
      >
        <MessageCircle size={28} fill="currentColor" />
      </Link>
    </footer>
  );
}
