"use client";

import React, { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { subHero } from "@/lib/data-store";

export default function HeroCarousel() {
    const [slides, setSlides] = useState<any[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 60 }, [
        Autoplay({ delay: 6000, stopOnInteraction: false }),
    ]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        // Subscribe to Firestore updates
        const unsubscribe = subHero((data) => {
            setSlides(data);
        });

        if (emblaApi) {
            emblaApi.on("select", onSelect);
        }

        return () => {
            unsubscribe();
            if (emblaApi) emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);


    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    return (
        <section className="relative h-[85vh] md:h-[95vh] w-full overflow-hidden bg-brand-dark">
            <div className="h-full w-full" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="relative min-w-0 flex-[0_0_100%] h-full flex items-center justify-center"
                        >
                            {/* Background Image with Ken Burns Effect */}
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <motion.div
                                    initial={{ scale: 1 }}
                                    animate={{
                                        scale: selectedIndex === index ? 1.15 : 1,
                                    }}
                                    transition={{
                                        duration: 8,
                                        ease: "linear",
                                        repeat: 0
                                    }}
                                    className="w-full h-full"
                                >
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // Fallback to a placeholder if image fails
                                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544787210-22d2dc479d4b?q=80&w=2000";
                                        }}
                                    />
                                </motion.div>
                                {/* Refined Premium Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-brand-dark/20" />
                                <div className="absolute inset-0 bg-black/20" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20 md:mt-0">
                                {selectedIndex === index && (
                                    <div key={`content-${index}`}>
                                        <div>
                                            <span className="text-brand-purple font-script text-4xl md:text-5xl lg:text-7xl mb-4 md:mb-6 block drop-shadow-lg">
                                                {slide.subtitle}
                                            </span>
                                        </div>

                                        <h1 className="text-brand-light text-5xl md:text-7xl lg:text-9xl font-bold uppercase tracking-tightest mb-8 md:mb-12 font-sans leading-tight drop-shadow-xl animate-none">
                                            {slide.title}
                                        </h1>

                                        <div>
                                            <a
                                                href="/shop"
                                                className="group relative inline-flex items-center gap-3 px-8 md:px-12 py-3 md:py-4 overflow-hidden rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-brand-purple hover:border-brand-purple transition-all duration-500"
                                            >
                                                <span className="relative font-sans font-bold uppercase tracking-widest text-sm md:text-base text-white group-hover:text-brand-dark transition-colors duration-500">
                                                    Shop All Products
                                                </span>
                                                <ChevronRight className="w-4 h-4 text-brand-purple group-hover:text-brand-dark transition-colors duration-500" />
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Glassmorphism Navigation Controls - Desktop */}
            <div className="absolute bottom-12 right-12 z-20 hidden md:flex gap-4">
                <button
                    onClick={scrollPrev}
                    className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 group"
                >
                    <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                    onClick={scrollNext}
                    className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 group"
                >
                    <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>

            {/* Pagination Dots - Mobile & Desktop */}
            <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`transition-all duration-500 rounded-full ${index === selectedIndex
                            ? "w-8 md:w-12 h-1 md:h-1.5 bg-brand-purple"
                            : "w-1 md:w-1.5 h-1 md:h-1.5 bg-white/30 hover:bg-white/60"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
