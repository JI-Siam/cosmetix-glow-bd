"use client";

import SubPageHeader from "@/components/layout/SubPageHeader";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { subStory, StoryData } from "@/lib/data-store";

export default function StoryPage() {
  const [story, setStory] = useState<StoryData | null>(null);

  useEffect(() => {
    const unsubscribe = subStory((data) => {
      if (data) setStory(data);
    });
    return () => unsubscribe();
  }, []);

  if (!story) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-light">
      <SubPageHeader
        title="Our Story"
        subtitle="Passion in every pour"
        backgroundImage="/images/hero/hero-glow.svg"
      />

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Vision Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-purple font-script text-3xl mb-4 block">
                {story.visionSubtitle}
              </span>
              <h2 className="text-brand-dark text-4xl md:text-6xl font-bold uppercase tracking-tightest mb-8 leading-tight">
                {story.visionTitle}
              </h2>
              <p className="text-brand-violet text-lg leading-loose mb-8">
                {story.visionText1}
              </p>
              <p className="text-brand-violet text-lg leading-loose">
                {story.visionText2}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative h-[600px] group"
            >
              <div className="absolute inset-0 border-[20px] border-brand-purple/10 translate-x-6 translate-y-6 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500" />
              <div className="relative h-full w-full overflow-hidden bg-brand-dark">
                {/* Placeholder for brand image */}
                <div className="absolute inset-0 bg-brand-purple/20 mix-blend-overlay" />
                <div className="absolute inset-0 flex items-center justify-center p-10 text-center">
                  <span className="text-brand-light/30 uppercase tracking-[1em] font-bold">
                    Cometix Glow Bd
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values Section */}
          <div className="bg-brand-dark p-12 md:p-32 relative overflow-hidden mb-32">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-purple/5 blur-[120px]" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-brand-light text-3xl md:text-5xl font-bold uppercase tracking-tightest mb-20 whitespace-nowrap">
                Our <span className="text-brand-purple">Craft</span> Philosophy
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {story.values.map((value, index) => (
                  <div key={index}>
                    <h3 className="text-brand-purple text-xl font-bold uppercase tracking-widest mb-6">
                      {value.title}
                    </h3>
                    <p className="text-brand-cream/70 leading-relaxed">
                      {value.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quality Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative h-[500px] order-2 lg:order-1"
            >
              <div className="absolute inset-0 bg-brand-violet/10 -translate-x-10 translate-y-10" />
              <div className="relative h-full w-full overflow-hidden bg-brand-dark">
                {/* Placeholder for quality image */}
                <div className="absolute inset-0 bg-brand-purple/10 mix-blend-overlay" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-brand-light/30 uppercase tracking-[1em] font-bold">
                    Authentic Korean Sourcing
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <span className="text-brand-purple font-script text-3xl mb-4 block">
                {story.qualitySubtitle}
              </span>
              <h2 className="text-brand-dark text-4xl md:text-6xl font-bold uppercase tracking-tightest mb-8 leading-tight">
                {story.qualityTitle}
              </h2>
              <p className="text-brand-violet text-lg leading-loose mb-8">
                {story.qualityText1}
              </p>
              <p className="text-brand-violet text-lg leading-loose">
                {story.qualityText2}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
