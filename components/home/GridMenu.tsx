"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { subMenu } from "@/lib/data-store";
import { useState, useEffect } from "react";

export default function GridMenu() {
    const [menuItems, setMenuItems] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = subMenu(setMenuItems);
        return () => unsubscribe();
    }, []);

    return (
        <section className="bg-transparent px-4 md:px-12 pt-4 pb-16 md:pt-6 md:pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                {menuItems.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="w-full h-full"
                    >
                        <Link
                            href={item.href}
                            className="group relative block h-[400px] overflow-hidden"
                        >
                            {/* Background Image */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544787210-22d2dc479d4b?q=80&w=2000&auto=format&fit=crop";
                                }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-royal/60 transition-colors duration-500" />

                            {/* Border on Hover */}
                            <div className="absolute inset-0 border-0 group-hover:border-[12px] border-brand-purple/20 transition-all duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                                <motion.h3
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                    className="text-brand-light text-2xl md:text-3xl font-bold uppercase tracking-widest group-hover:text-brand-purple transition-colors duration-300 font-sans"
                                >
                                    {item.name}
                                </motion.h3>
                                <div className="mt-4 h-[1px] w-0 group-hover:w-20 bg-brand-purple transition-all duration-500" />
                                <span className="mt-4 text-[10px] uppercase tracking-[0.3em] text-brand-cream/0 group-hover:text-brand-cream transition-all duration-300">
                                    Explore More
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
