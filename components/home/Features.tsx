"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Truck, HeartHandshake } from "lucide-react";

const features = [
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "100% Authentic",
        description: "Every product is sourced directly from official Korean brands and authorised distributors — zero counterfeits, ever."
    },
    {
        icon: <Sparkles className="w-8 h-8" />,
        title: "Hand-Picked Bestsellers",
        description: "We curate only cult-favourite, dermatologist-tested formulas that genuinely work for South Asian skin and climate."
    },
    {
        icon: <Truck className="w-8 h-8" />,
        title: "Nationwide Delivery",
        description: "Fast, secure, cold-chain-safe delivery to your doorstep anywhere in Bangladesh, with cash on delivery available."
    },
    {
        icon: <HeartHandshake className="w-8 h-8" />,
        title: "Expert Skin Advice",
        description: "Our team helps you build a routine that suits your skin type and concerns — no guesswork required."
    }
];

export default function Features() {
    return (
        <section className="py-32 bg-white px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <span className="text-brand-purple font-script text-3xl md:text-4xl block mb-4">Why Choose Us</span>
                    <h2 className="text-brand-dark text-4xl md:text-5xl font-bold uppercase tracking-tightest">
                        Authenticity in <span className="text-brand-purple">Every Bottle</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-10 border border-brand-dark/5 hover:border-brand-purple/30 transition-all group"
                        >
                            <div className="text-brand-purple mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-brand-dark uppercase tracking-wide mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-brand-violet leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
