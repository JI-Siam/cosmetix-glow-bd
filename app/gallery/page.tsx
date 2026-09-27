"use client";

import SubPageHeader from "@/components/layout/SubPageHeader";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { subMenu, subHero, Product } from "@/lib/data-store";

export default function GalleryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [heroSlides, setHeroSlides] = useState<any[]>([]);

    useEffect(() => {
        const unsubMenu = subMenu(setProducts);
        const unsubHero = subHero(setHeroSlides);
        return () => {
            unsubMenu();
            unsubHero();
        };
    }, []);

    const images = [
        ...heroSlides.map((s) => ({ src: s.image, alt: s.title })),
        ...products.map((p) => ({ src: p.image, alt: p.name })),
    ];

    return (
        <div className="bg-brand-dark min-h-screen">
            <SubPageHeader
                title="Gallery"
                subtitle="The Glow Edit"
                backgroundImage="/images/hero/hero-glow.svg"
            />

            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: (index % 9) * 0.08 }}
                                viewport={{ once: true }}
                                className="group relative aspect-square overflow-hidden rounded-md bg-white/5"
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-brand-purple text-lg font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-center px-4">
                                        {image.alt}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {images.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-brand-light/40 uppercase tracking-widest text-sm">Loading gallery...</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
