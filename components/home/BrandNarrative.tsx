"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function BrandNarrative() {
  const [mission, setMission] = useState(
    "At Cosmetix Glow Bd, we bring 100% authentic Korean cosmetics straight from Korea to Bangladesh, so every customer can discover their own natural glow with confidence.",
  );

  useEffect(() => {
    const stored = localStorage.getItem("cometixglow_settings");
    if (stored) {
      const parsed = JSON.parse(stored);
      setMission(parsed.mission);
    }
  }, []);
  return (
    <section className="py-32 bg-white px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <span className="text-brand-purple font-script text-4xl md:text-6xl mb-6 block">
            Our Story
          </span>
          <h2 className="text-brand-dark text-4xl md:text-7xl font-bold uppercase tracking-tightest mb-8 leading-tight">
            Redefining <span className="text-brand-purple">K-Beauty</span> in
            Bangladesh
          </h2>
          <div className="w-24 h-1 bg-brand-purple mx-auto mb-12"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6"
        >
          <p className="text-brand-violet text-lg md:text-2xl leading-relaxed italic">
            "{mission}"
          </p>
          <p className="text-brand-dark/70 text-base md:text-lg leading-loose max-w-2xl mx-auto">
            From cult-favourite snail mucin essences to glass-skin sleeping
            masks, every product on Cosmetix Glow Bd is sourced directly from
            Korea and checked for authenticity. Whether you're starting your
            first skincare routine or chasing the perfect 10-step ritual, we
            bring genuine K-beauty to your doorstep.
          </p>

          <div className="pt-12">
            <a
              href="/story"
              className="text-brand-purple border-b border-brand-purple pb-1 uppercase tracking-widest text-sm font-bold hover:text-brand-light hover:border-brand-light transition-all"
            >
              Read Our Full Story
            </a>
          </div>
        </motion.div>
      </div>

      {/* Subtle background element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
}
