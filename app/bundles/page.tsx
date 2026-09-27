"use client";

import SubPageHeader from "@/components/layout/SubPageHeader";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import { subPackages, PackageItem } from "@/lib/data-store";

export default function PackagesPage() {
    const [packages, setPackages] = useState<PackageItem[]>([]);

    useEffect(() => {
        const unsubscribe = subPackages(setPackages);
        return () => unsubscribe();
    }, []);

    return (
        <main className="min-h-screen bg-brand-light">
            <SubPageHeader
                title="Bundles & Gift Sets"
                subtitle="Curated K-Beauty Routines"
                backgroundImage="/images/hero/hero-bundle.svg"
            />

            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white border border-brand-dark/5 hover:border-brand-purple/30 transition-all duration-500 overflow-hidden group shadow-sm hover:shadow-xl"
                            >
                                {/* Package Image Placeholder/Visual */}
                                <div className="h-64 bg-brand-dark relative overflow-hidden">
                                    {pkg.image ? (
                                        <img src={pkg.image} alt={pkg.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                                    ) : (
                                        <div className="absolute inset-0 bg-brand-purple/20 mix-blend-overlay" />
                                    )}

                                    <div className="absolute inset-0 bg-brand-purple/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
                                    <div className="absolute inset-0 flex items-center justify-center p-10 text-center">
                                        <h3 className="text-brand-light text-2xl font-bold uppercase tracking-widest drop-shadow-md">{pkg.title}</h3>
                                    </div>
                                </div>

                                <div className="p-10">
                                    <span className="text-brand-purple font-script text-2xl mb-2 block">{pkg.subtitle}</span>
                                    <h4 className="text-brand-dark text-xl font-bold uppercase tracking-wide mb-6">{pkg.title}</h4>
                                    <p className="text-brand-violet mb-8 leading-relaxed text-sm">
                                        {pkg.description}
                                    </p>

                                    <div className="space-y-4 mb-10">
                                        {pkg.features.map((feature, fIndex) => (
                                            <div key={fIndex} className="flex items-start space-x-3">
                                                <Check className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                                                <span className="text-xs text-brand-dark/80">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-8 border-t border-brand-dark/5">
                                        <span className="text-xl font-bold text-brand-dark">{pkg.price}</span>
                                        <a
                                            href="/contact"
                                            className="px-6 py-3 bg-brand-dark text-brand-light text-[10px] font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-brand-dark transition-all duration-300"
                                        >
                                            {pkg.cta}
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-32 bg-brand-dark p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-brand-light text-3xl md:text-5xl font-bold uppercase tracking-tightest mb-8">
                                Want a <span className="text-brand-purple">Custom</span> Bundle?
                            </h2>
                            <p className="text-brand-cream/70 text-lg mb-12">
                                Every skin is unique. If our curated kits don't quite match your skin type or concerns,
                                message us and we'll build a personalised routine just for you.
                            </p>
                            <a
                                href="/contact"
                                className="inline-block px-12 py-5 border border-brand-purple text-brand-purple font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-brand-dark transition-all duration-300"
                            >
                                Talk to Our Team
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
