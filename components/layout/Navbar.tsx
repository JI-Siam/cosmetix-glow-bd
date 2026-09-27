"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Bundles", href: "/bundles" },
    { name: "Skin Guide", href: "/skin-guide" },
    { name: "Our Story", href: "/story" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    if (isAdminPage) return null;

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4",
                scrolled
                    ? "bg-white/90 backdrop-blur-xl border-b border-brand-dark/5 py-3 shadow-sm"
                    : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex flex-col items-center relative z-50">
                    <span className={cn(
                        "text-2xl font-bold tracking-[0.2em] font-sans uppercase transition-colors duration-500 text-brand-purple"
                    )}>
                        Cosmetix Glow Bd
                    </span>
                    <span className={cn(
                        "text-[10px] tracking-[0.3em] uppercase -mt-1 font-sans transition-colors duration-500",
                        scrolled ? "text-brand-purple" : "text-brand-cream/80"
                    )}>
                        Korean Beauty, Delivered
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative group py-2"
                        >
                            <span className={cn(
                                "text-xs font-bold tracking-[0.15em] transition-colors uppercase",
                                scrolled ? "text-brand-dark group-hover:text-brand-purple" : "text-brand-light group-hover:text-brand-purple"
                            )}>
                                {link.name}
                            </span>
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-purple transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="relative px-8 py-3 bg-brand-purple overflow-hidden group transition-all duration-300 shadow-md hover:shadow-lg rounded-[20px]"
                    >
                        <div className="absolute inset-0 w-0 bg-brand-dark transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                        <span className="relative text-brand-dark text-xs font-extrabold tracking-[0.15em] uppercase transition-colors z-10">
                            Contact Us
                        </span>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={cn(
                        "md:hidden relative z-50 transition-colors hover:scale-110 duration-300",
                        scrolled ? "text-brand-dark" : "text-brand-light",
                        isOpen && "text-brand-light" // Keep white when menu is open (dark bg)
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 bg-brand-dark z-40 flex flex-col items-center justify-center space-y-8"
                    >
                        {/* Background Decoration */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                            <div className="absolute -top-[20%] -right-[20%] w-[500px] h-[500px] rounded-full bg-brand-purple blur-[100px]" />
                            <div className="absolute -bottom-[20%] -left-[20%] w-[500px] h-[500px] rounded-full bg-brand-purple blur-[100px]" />
                        </div>

                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-3xl md:text-5xl font-bold tracking-widest text-brand-light hover:text-brand-purple uppercase transition-colors"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="px-12 py-5 bg-brand-purple text-brand-dark text-xl font-bold tracking-widest uppercase hover:bg-brand-cream transition-colors mt-8 block rounded-[20px]"
                            >
                                Contact Us
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
