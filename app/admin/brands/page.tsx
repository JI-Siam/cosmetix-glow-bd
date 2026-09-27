"use client";

import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Globe, Search } from "lucide-react";
import { subBrands, saveBrandsToFire } from "@/lib/data-store";
import { useState, useEffect } from "react";

export default function BrandManagement() {
    const [brands, setBrands] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editItem, setEditItem] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = subBrands(setBrands);
        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        const updated = brands.filter(b => b.id !== id);
        await saveBrandsToFire(updated);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const itemData = {
            name: formData.get("name") as string,
            logo: formData.get("logo") as string,
        };

        let updated;
        if (editItem?.id) {
            updated = brands.map(b => b.id === editItem.id ? { ...b, ...itemData } : b);
        } else {
            updated = [...brands, { ...itemData, id: Date.now().toString() }];
        }

        await saveBrandsToFire(updated);
        setIsEditing(false);
        setEditItem(null);
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-3xl font-bold text-brand-dark uppercase tracking-tightest">Brand Partners</h1>
                    <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest font-medium">Manage 'Trusted by' logos.</p>
                </div>
                <button
                    onClick={() => { setIsEditing(true); setEditItem(null); }}
                    className="flex items-center space-x-2 px-6 py-3 bg-brand-dark text-brand-purple text-[10px] font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-brand-dark transition-all"
                >
                    <Plus size={16} />
                    <span>Add New Brand</span>
                </button>
            </div>

            {/* Brands Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {brands.map((brand) => (
                    <div key={brand.id} className="bg-white border border-zinc-200 group relative p-6 flex flex-col items-center justify-center">
                        <div className="h-12 w-full flex items-center justify-center mb-4 grayscale group-hover:grayscale-0 transition-all">
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="h-full w-auto object-contain"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=Logo+Error";
                                }}
                            />
                        </div>
                        <p className="text-[10px] font-bold text-brand-dark uppercase tracking-widest mb-4 text-center truncate w-full">{brand.name}</p>

                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-white/90 items-center justify-center">
                            <button
                                onClick={() => { setEditItem(brand); setIsEditing(true); }}
                                className="p-2 text-zinc-400 hover:text-brand-dark transition-all"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => {
                                    if (confirm("Are you sure you want to delete this brand?")) {
                                        handleDelete(brand.id);
                                    }
                                }}
                                className="p-2 text-zinc-400 hover:text-red-500 transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm" onClick={() => setIsEditing(false)}></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white w-full max-w-xl relative z-10 shadow-2xl overflow-hidden"
                    >
                        <div className="p-8 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                            <h3 className="text-lg font-bold uppercase tracking-widest text-brand-dark">
                                {editItem ? "Edit Brand" : "Add New Brand"}
                            </h3>
                            <button onClick={() => setIsEditing(false)} className="text-zinc-600 hover:text-brand-dark transition-colors font-bold">✕</button>
                        </div>
                        <form onSubmit={handleSave} className="p-8 space-y-6">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70">Brand Name</label>
                                <input required name="name" type="text" defaultValue={editItem?.name || ""} className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark placeholder:text-zinc-400 font-medium" placeholder="e.g. Netflix" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-black text-brand-purple">Logo URL</label>
                                <input
                                    required
                                    name="logo"
                                    type="text"
                                    defaultValue={editItem?.logo || ""}
                                    className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm font-mono text-brand-dark placeholder:text-zinc-400 bg-zinc-50/50"
                                    placeholder="https://logo.clearbit.com/netflix.com"
                                />
                                <p className="text-[9px] text-zinc-500 mt-2 uppercase font-medium">Use a PNG or SVG with transparent background for best results.</p>
                            </div>
                            <div className="pt-4 flex space-x-4">
                                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-4 border border-zinc-200 text-zinc-500 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-50 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-4 bg-brand-dark text-brand-purple text-[10px] font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-brand-dark transition-all">Save Brand</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
