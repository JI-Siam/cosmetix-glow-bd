"use client";

import SubPageHeader from "@/components/layout/SubPageHeader";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { subMenu, INITIAL_SETTINGS, subscribeToSettings } from "@/lib/data-store";

export default function ProductPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState(INITIAL_SETTINGS);

    useEffect(() => {
        const unsubscribe = subMenu((menuItems) => {
            const found = menuItems.find((item: any) => item.href.includes(slug));

            if (found) {
                setProduct({
                    title: found.name,
                    subtitle: found.brand || found.category || "Cometix Glow Bd",
                    description: found.description || "Experience authentic Korean beauty with this Cometix Glow Bd bestseller, sourced directly from Korea and loved by skincare enthusiasts across Bangladesh.",
                    image: found.image,
                    price: found.price,
                    category: found.category,
                    flavours: found.flavours && found.flavours.length > 0 ? found.flavours : ["Standard Size"],
                    options: found.options && found.options.length > 0 ? found.options : [
                        "100% Authentic — sourced directly from Korea",
                        "Dermatologically tested formula",
                        "Free nationwide delivery in Bangladesh",
                        "Cash on delivery available"
                    ]
                });
            }
            setLoading(false);
        });

        const unsubSettings = subscribeToSettings((data) => {
            if (data) setSettings(data);
        });

        return () => {
            unsubscribe();
            unsubSettings();
        };
    }, [slug]);

    if (loading) return null;
    if (!product) {
        notFound();
    }

    const whatsappNumber = settings.phone.replace(/[^0-9]/g, '');
    const whatsappMessage = encodeURIComponent(`Hi Cometix Glow Bd! I'd like to order: ${product.title} (${product.price})`);

    return (
        <main className="min-h-screen bg-white text-brand-dark font-sans selection:bg-brand-purple selection:text-white">
            <SubPageHeader
                title={product.title}
                subtitle={product.category || "Our Collection"}
                backgroundImage={product.image}
            />

            <section className="py-20 lg:py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                        {/* Left Column: Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-square w-full bg-brand-cream flex items-center justify-center overflow-hidden"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>

                        {/* Right Column: Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col h-full justify-center"
                        >
                            {/* Brand / Subtitle */}
                            <h2 className="text-sm font-bold tracking-[0.3em] uppercase mb-3 text-brand-purple">
                                {product.subtitle}
                            </h2>

                            {/* Title */}
                            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.1em] mb-4 text-brand-dark">
                                {product.title}
                            </h1>

                            {/* Price */}
                            <p className="text-2xl font-bold text-brand-dark mb-8">{product.price}</p>

                            {/* Variants */}
                            <h2 className="text-sm font-bold tracking-[0.3em] uppercase mb-4 text-brand-dark/60">
                                Available Variants
                            </h2>
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                {product.flavours && product.flavours.map((flavour: string, idx: number) => (
                                    <div key={idx} className="bg-brand-cream py-4 px-6 flex items-center justify-center text-center">
                                        <span className="text-xs font-bold tracking-widest uppercase text-brand-dark/70">
                                            {flavour}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Description Box */}
                            <div className="bg-brand-cream p-8 mb-10">
                                <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-brand-dark/40">Description</h3>
                                <p className="text-brand-dark/80 leading-relaxed text-sm md:text-base">
                                    {product.description}
                                </p>
                            </div>

                            {/* Highlights List */}
                            <div className="space-y-2 mb-12">
                                {product.options && product.options.map((option: string, idx: number) => (
                                    <div key={idx} className="flex items-center space-x-3">
                                        <div className="w-1 h-1 bg-brand-dark rounded-full"></div>
                                        <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-brand-dark/60">
                                            {option}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-brand-purple text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-dark transition-colors duration-300 text-center flex items-center justify-center"
                                >
                                    Order via WhatsApp
                                </a>
                                <a
                                    href="/shop"
                                    className="px-8 py-4 border border-brand-purple text-brand-purple text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-purple hover:text-white transition-colors duration-300 text-center flex items-center justify-center"
                                >
                                    Continue Shopping
                                </a>
                            </div>

                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
