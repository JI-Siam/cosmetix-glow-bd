"use client";

import { motion } from "framer-motion";

interface SubPageHeaderProps {
    title: string;
    subtitle?: string;
    backgroundImage: string;
}

export default function SubPageHeader({ title, subtitle, backgroundImage }: SubPageHeaderProps) {
    return (
        <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden bg-brand-dark">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt={title}
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-brand-dark" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-brand-purple font-script text-3xl md:text-5xl mb-4 block"
                >
                    {subtitle}
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-brand-light text-5xl md:text-8xl font-bold uppercase tracking-tightest mb-4"
                >
                    {title}
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="flex items-center justify-center space-x-4"
                >
                    <div className="h-px w-12 bg-brand-purple/50"></div>
                    <span className="text-[10px] uppercase tracking-[0.5em] text-brand-cream/60">
Cometix Glow Bd | Authentic K-Beauty
                    </span>
                    <div className="h-px w-12 bg-brand-purple/50"></div>
                </motion.div>
            </div>
        </section>
    );
}
