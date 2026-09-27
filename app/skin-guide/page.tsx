"use client";

import SubPageHeader from "@/components/layout/SubPageHeader";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, HeartPulse, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { subNutrition, NutritionData } from "@/lib/data-store";

const iconMap: Record<string, any> = {
    "Leaf": <Leaf className="w-10 h-10" />,
    "ShieldCheck": <ShieldCheck className="w-10 h-10" />,
    "HeartPulse": <HeartPulse className="w-10 h-10" />,
    "Zap": <Zap className="w-10 h-10" />
};

export default function NutritionPage() {
    const [data, setData] = useState<NutritionData | null>(null);

    useEffect(() => {
        const unsubscribe = subNutrition((fetchedData) => {
            if (fetchedData) setData(fetchedData);
        });
        return () => unsubscribe();
    }, []);

    if (!data) return <div className="min-h-screen bg-brand-light flex items-center justify-center">Loading...</div>;

    return (
        <main className="min-h-screen bg-brand-light">
            <SubPageHeader
                title="Skin Guide"
                subtitle="Know Your Ingredients"
                backgroundImage="/images/hero/hero-serum.svg"
            />

            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Intro Section */}
                    <div className="max-w-3xl mx-auto text-center mb-32">
                        <span className="text-brand-purple font-script text-3xl mb-4 block">{data.introSubtitle}</span>
                        <h2 className="text-brand-dark text-4xl md:text-6xl font-bold uppercase tracking-tightest mb-8 leading-tight">
                            {data.introTitle}
                        </h2>
                        <p className="text-brand-violet text-lg leading-loose">
                            {data.introText}
                        </p>
                    </div>

                    {/* Ingredient Spotlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                        {data.highlights.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-12 border border-brand-dark/5 text-center group hover:border-brand-purple transition-colors duration-500"
                            >
                                <div className="text-brand-purple mb-8 flex justify-center group-hover:scale-110 transition-transform duration-300">
                                    {iconMap[item.icon] || <Leaf className="w-10 h-10" />}
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark uppercase tracking-wide mb-4 whitespace-nowrap">
                                    {item.title}
                                </h3>
                                <p className="text-brand-violet text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Detailed Info Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-brand-dark p-12 md:p-20 flex flex-col justify-center"
                        >
                            <h2 className="text-brand-light text-3xl md:text-5xl font-bold uppercase tracking-tightest mb-8">
                                {data.allergenTitle}
                            </h2>
                            <p className="text-brand-cream/70 text-lg leading-relaxed mb-8">
                                {data.allergenText}
                            </p>
                            <div className="space-y-4">
                                {data.allergenPoints.map((point, i) => (
                                    <div key={i} className="flex items-center space-x-4 border-b border-brand-light/10 pb-4">
                                        <div className="w-2 h-2 rounded-full bg-brand-purple" />
                                        <span className="text-brand-light uppercase tracking-widest text-sm">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative overflow-hidden min-h-[400px] bg-brand-dark"
                        >
                            {/* Placeholder for nutrition chart or image */}
                            <div className="absolute inset-0 bg-brand-purple/10 mix-blend-overlay" />
                            <div className="absolute inset-0 flex items-center justify-center text-center p-12">
                                <div className="border border-brand-purple/30 p-12 w-full max-w-md">
                                    <span className="text-brand-purple uppercase tracking-[0.5em] text-xs block mb-6">Ingredient Profile</span>
                                    <div className="space-y-4">
                                        {data.stats.map((stat, sIndex) => (
                                            <div key={sIndex} className="flex justify-between items-end border-b border-brand-purple/20 pb-2">
                                                <span className="text-brand-cream/80 text-xs uppercase tracking-widest">{stat.label}</span>
                                                <span className="text-brand-purple font-bold">{stat.percent}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
