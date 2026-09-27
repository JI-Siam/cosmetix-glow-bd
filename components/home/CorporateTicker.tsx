"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { subBrands } from "@/lib/data-store";

export default function CorporateTicker() {
    const [brands, setBrands] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = subBrands((data) => {
            if (data && data.length > 0) {
                setBrands(data);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <section className="py-24 bg-white overflow-hidden border-y border-brand-purple/10">
            <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-brand-violet font-script text-4xl md:text-6xl mb-4 block">Brands we carry</h2>
                    <p className="text-sm md:text-base uppercase tracking-[0.8em] text-brand-dark font-black">Authorised Retailer</p>
                </motion.div>
            </div>

            <div className="flex overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-brand-light to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-brand-light to-transparent z-10" />

                <motion.div
                    key={brands.length}
                    animate={{ x: [0, -(brands.length * 378)] }}
                    transition={{
                        duration: brands.length * 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex gap-32 items-center whitespace-nowrap px-12"
                >
                    {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
                        <div
                            key={`${brand.id}-${index}`}
                            className="flex items-center justify-center min-w-[250px] group/logo cursor-default"
                        >
                            {renderBrandManual(brand)}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function renderBrandManual(brand: any) {
    const name = brand.name.toUpperCase();

    // If brand has a logo URL, try to show it
    if (brand.logo) {
        return (
            <img
                src={brand.logo}
                alt={brand.name}
                className="h-10 md:h-14 w-auto object-contain transition-all duration-300"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    // Fallback to text if image fails
                }}
            />
        );
    }

    switch (name) {
        case "COSRX":
            return (
                <span className="text-4xl md:text-5xl font-black tracking-tighter text-brand-royal font-sans drop-shadow-sm">
                    COSRX
                </span>
            );
        case "LANEIGE":
            return (
                <span className="text-3xl md:text-5xl font-serif tracking-[0.3em] text-brand-dark font-light italic opacity-90">
                    LANEIGE
                </span>
            );
        case "INNISFREE":
            return (
                <span className="text-3xl md:text-4xl font-sans tracking-widest text-brand-violet font-bold border-b border-brand-violet">
                    innisfree
                </span>
            );
        case "BEAUTY OF JOSEON":
            return (
                <div className="px-8 py-2 border-[3px] border-brand-purple rounded-full bg-white">
                    <span className="text-lg md:text-xl font-sans font-black text-brand-purple tracking-widest">
                        BEAUTY OF JOSEON
                    </span>
                </div>
            );
        case "SOME BY MI":
            return (
                <span className="text-3xl md:text-4xl font-sans font-light tracking-[0.3em] text-brand-dark">
                    SOME BY MI
                </span>
            );
        case "ETUDE HOUSE":
            return (
                <span className="text-2xl md:text-3xl font-sans font-black tracking-widest text-brand-royal">
                    ETUDE HOUSE
                </span>
            );
        default:
            return (
                <span className="text-2xl md:text-3xl font-black text-brand-dark/20 uppercase tracking-widest">
                    {brand.name}
                </span>
            );
    }
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
