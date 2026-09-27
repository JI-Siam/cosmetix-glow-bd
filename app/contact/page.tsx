"use client";

import SubPageHeader from "@/components/layout/SubPageHeader";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { useState, useEffect } from "react";
import { saveInquiryToFire, INITIAL_SETTINGS, subscribeToSettings } from "@/lib/data-store";

export default function ContactPage() {
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [settings, setSettings] = useState(INITIAL_SETTINGS);

    useEffect(() => {
        // Subscribe to settings to show correct contact info
        const unsubscribe = subscribeToSettings((data) => {
            if (data) setSettings(data);
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("submitting");

        const formData = new FormData(e.target as HTMLFormElement);
        const inquiryData = {
            id: Date.now().toString(), // Will be overwritten/used by Firestore
            name: `${formData.get("fname")} ${formData.get("lname")}`,
            email: formData.get("email"),
            phone: formData.get("phone"),
            type: formData.get("type"),
            product: formData.get("product"),
            message: formData.get("message"),
            status: "Pending",
            submittedAt: new Date().toLocaleString()
        };

        // Save to Firestore
        await saveInquiryToFire(inquiryData);

        setTimeout(() => setFormStatus("success"), 1500);
    };

    return (
        <main className="min-h-screen bg-white">
            <SubPageHeader
                title="Contact Us"
                subtitle="Begin your experience"
                backgroundImage="/images/hero/hero-glow.svg"
            />

            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-brand-purple font-script text-3xl mb-4 block">Get in Touch</span>
                            <h2 className="text-brand-dark text-4xl md:text-6xl font-bold uppercase tracking-tightest mb-12 leading-tight">
                                Questions about an <span className="text-brand-purple">order</span>?
                            </h2>

                            <div className="space-y-10 mb-16">
                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 bg-brand-dark flex items-center justify-center shrink-0">
                                        <Mail className="text-brand-purple w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-brand-dark font-bold uppercase tracking-widest text-sm mb-1">Email Us</h3>
                                        <p className="text-brand-violet text-lg">{settings.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 bg-brand-dark flex items-center justify-center shrink-0">
                                        <Phone className="text-brand-purple w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-brand-dark font-bold uppercase tracking-widest text-sm mb-1">Call Us</h3>
                                        <p className="text-brand-violet text-lg">{settings.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 bg-brand-dark flex items-center justify-center shrink-0">
                                        <MapPin className="text-brand-purple w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-brand-dark font-bold uppercase tracking-widest text-sm mb-1">Our Location</h3>
                                        <p className="text-brand-violet text-lg">{settings.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-brand-dark/5">
                                <h3 className="text-brand-dark font-bold uppercase tracking-widest text-xs mb-6">Follow Our Journey</h3>
                                <div className="flex space-x-6">
                                    <a href="#" className="text-brand-dark hover:text-brand-purple transition-colors">
                                        <Instagram className="w-8 h-8" />
                                    </a>
                                    <a href="#" className="text-brand-dark hover:text-brand-purple transition-colors">
                                        <Facebook className="w-8 h-8" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="bg-brand-dark p-10 md:p-16 relative overflow-hidden"
                        >
                            {formStatus === "success" ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 bg-brand-purple rounded-full flex items-center justify-center mb-8"
                                    >
                                        <svg className="w-10 h-10 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </motion.div>
                                    <h2 className="text-brand-light text-3xl font-bold uppercase tracking-tightest mb-4">Message Sent!</h2>
                                    <p className="text-brand-cream/70 mb-10">Thank you for reaching out. Our team will get back to you shortly.</p>
                                    <button
                                        onClick={() => setFormStatus("idle")}
                                        className="text-brand-purple uppercase tracking-widest text-sm font-bold border-b border-brand-purple pb-1 hover:text-brand-light hover:border-brand-light transition-all"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="relative z-10">
                                        <h3 className="text-brand-light text-2xl font-bold uppercase tracking-widest mb-10">Inquiry Form</h3>
                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-[0.3em] text-brand-cream/50 font-bold block">First Name</label>
                                                    <input required name="fname" type="text" className="w-full bg-transparent border-b border-brand-light/20 py-3 text-brand-light focus:outline-none focus:border-brand-purple transition-colors placeholder:text-brand-light/10" placeholder="John" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-[0.3em] text-brand-cream/50 font-bold block">Last Name</label>
                                                    <input required name="lname" type="text" className="w-full bg-transparent border-b border-brand-light/20 py-3 text-brand-light focus:outline-none focus:border-brand-purple transition-colors placeholder:text-brand-light/10" placeholder="Doe" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-[0.3em] text-brand-cream/50 font-bold block">Email Address</label>
                                                    <input required name="email" type="email" className="w-full bg-transparent border-b border-brand-light/20 py-3 text-brand-light focus:outline-none focus:border-brand-purple transition-colors placeholder:text-brand-light/10" placeholder="john@example.com" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-[0.3em] text-brand-cream/50 font-bold block">Phone Number</label>
                                                    <input required name="phone" type="tel" className="w-full bg-transparent border-b border-brand-light/20 py-3 text-brand-light focus:outline-none focus:border-brand-purple transition-colors placeholder:text-brand-light/10" placeholder="+880 1700-000000" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-[0.3em] text-brand-cream/50 font-bold block">Enquiry Type</label>
                                                    <select required name="type" className="w-full bg-brand-dark border-b border-brand-light/20 py-3 text-brand-light focus:outline-none focus:border-brand-purple transition-colors appearance-none cursor-pointer">
                                                        <option value="">Select Enquiry Type</option>
                                                        <option value="order">New Order</option>
                                                        <option value="order-status">Order Status</option>
                                                        <option value="skin-advice">Skin & Product Advice</option>
                                                        <option value="bulk">Bulk / Reseller Enquiry</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-[0.3em] text-brand-cream/50 font-bold block">Product (Optional)</label>
                                                    <input name="product" type="text" className="w-full bg-transparent border-b border-brand-light/20 py-3 text-brand-light focus:outline-none focus:border-brand-purple transition-colors placeholder:text-brand-light/10" placeholder="e.g. Snail Mucin Essence" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] text-brand-cream/50 font-bold block">Your Message</label>
                                                <textarea required name="message" rows={4} className="w-full bg-transparent border-b border-brand-light/20 py-3 text-brand-light focus:outline-none focus:border-brand-purple transition-colors resize-none placeholder:text-brand-light/10" placeholder="Tell us what you're looking for, or ask us anything about your order..." />
                                            </div>

                                            <button
                                                disabled={formStatus === "submitting"}
                                                type="submit"
                                                className="w-full py-5 bg-brand-purple text-white font-bold uppercase tracking-widest hover:bg-brand-light hover:text-brand-dark transition-all duration-300 disabled:opacity-50"
                                            >
                                                {formStatus === "submitting" ? "Sending..." : "Submit Enquiry"}
                                            </button>
                                        </form>
                                    </div>
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 blur-[100px] pointer-events-none" />
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
