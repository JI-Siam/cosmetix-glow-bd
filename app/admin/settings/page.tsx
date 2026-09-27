"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Save, Mail, Phone, MapPin, Instagram, Facebook, Globe } from "lucide-react";
import { saveSettings, subscribeToSettings } from "@/lib/data-store";

export default function SiteSettings() {
    const [settings, setSettings] = useState({
        email: "",
        phone: "",
        location: "",
        instagram: "",
        facebook: "",
        website: "",
        mission: ""
    });

    useEffect(() => {
        const unsubscribe = subscribeToSettings((data) => {
            if (data) setSettings(data);
        });
        return () => unsubscribe();
    }, []);

    const handleSave = async () => {
        await saveSettings(settings);
        alert("Settings saved successfully!");
    };
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-brand-dark uppercase tracking-tightest">Site Settings</h1>
                    <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest font-medium">Update company information and branding.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-8 py-3 bg-brand-dark text-brand-purple text-[10px] font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-brand-dark transition-all"
                >
                    <Save size={16} />
                    <span>Save Changes</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Company Information */}
                <div className="bg-white border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-zinc-100 bg-zinc-50/50">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-brand-dark">Company Information</h3>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70 block">Contact Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dark/40" size={16} />
                                <input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark font-medium"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70 block">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dark/40" size={16} />
                                <input
                                    type="text"
                                    value={settings.phone}
                                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark font-medium"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70 block">Base Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dark/40" size={16} />
                                <input
                                    type="text"
                                    value={settings.location}
                                    onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark font-medium"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Presence */}
                <div className="bg-white border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-zinc-100 bg-zinc-50/50">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-brand-dark">Social Presence</h3>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70 block">Instagram Handle</label>
                            <div className="relative">
                                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dark/40" size={16} />
                                <input
                                    type="text"
                                    value={settings.instagram}
                                    onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark font-medium"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70 block">Facebook Page</label>
                            <div className="relative">
                                <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dark/40" size={16} />
                                <input
                                    type="text"
                                    value={settings.facebook}
                                    onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark font-medium"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70 block">Website URL</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dark/40" size={16} />
                                <input
                                    type="text"
                                    value={settings.website}
                                    onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark font-medium"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brand Story Highlights */}
                <div className="lg:col-span-2 bg-white border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-zinc-100 bg-zinc-50/50">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-brand-dark">Brand Narrative Highlights</h3>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70 block">Mission Statement</label>
                            <textarea
                                rows={4}
                                value={settings.mission}
                                onChange={(e) => setSettings({ ...settings, mission: e.target.value })}
                                className="w-full px-4 py-3 bg-white border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm resize-none text-brand-dark font-medium"
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
