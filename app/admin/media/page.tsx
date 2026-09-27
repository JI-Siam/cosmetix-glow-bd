"use client";

import { motion } from "framer-motion";
import { Upload, X, Grid, List, Search, Image as ImageIcon, Trash2, Edit2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { subHero, subMenu, saveHeroToFire } from "@/lib/data-store";

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}

export default function MediaManagement() {
    const [view, setView] = useState<"grid" | "list">("grid");
    const [heroSlides, setHeroSlides] = useState<any[]>([]);
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSlide, setCurrentSlide] = useState<any>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const unsubHero = subHero(setHeroSlides);
        const unsubMenu = subMenu(setMenuItems);
        return () => {
            unsubHero();
            unsubMenu();
        };
    }, []);

    const showToast = (msg: string) => {
        setSuccessMessage(msg);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    const handleDeleteHero = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this slide?")) return;
        try {
            const updated = heroSlides.filter((s: any) => s.id !== id);
            await saveHeroToFire(updated);
            showToast("Slide deleted successfully");
        } catch (error) {
            console.error("Delete error:", error);
            alert("Delete failed");
        }
    };

    const handleSaveSlide = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const title = formData.get("title") as string;
        const image = formData.get("image") as string;
        const subtitle = formData.get("subtitle") as string;

        try {
            let updated;
            if (currentSlide?.id) {
                updated = heroSlides.map((s: any) => s.id === currentSlide.id ? { ...s, title, image, subtitle } : s);
            } else {
                updated = [...heroSlides, {
                    id: Date.now().toString(),
                    title,
                    image,
                    subtitle
                }];
            }

            await saveHeroToFire(updated);
            setIsEditing(false);
            setCurrentSlide(null);
            showToast("Hero updated");
        } catch (error) {
            alert("Save failed");
        }
    };


    return (
        <div className="space-y-12 relative">
            {/* Hero Management Section */}
            <section className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-brand-dark uppercase tracking-widest">Hero Carousel Management</h2>
                        <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">Manage images shown on the homepage hero.</p>
                    </div>
                    <button
                        onClick={() => { setIsEditing(true); setCurrentSlide(null); }}
                        className="flex items-center space-x-2 px-6 py-3 bg-brand-dark text-brand-purple text-[10px] font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-brand-dark transition-all"
                    >
                        <Plus size={16} />
                        <span>Add Hero Slide</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {heroSlides.map((slide) => (
                        <div key={slide.id} className="bg-white border border-zinc-200 group relative shadow-sm">
                            <div className="aspect-video bg-brand-dark flex items-center justify-center overflow-hidden relative">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544787210-22d2dc479d4b?q=80&w=2000";
                                    }}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-black/20">
                                    <p className="text-brand-purple text-xs font-bold uppercase tracking-widest drop-shadow-md">{slide.title}</p>
                                </div>
                            </div>
                            <div className="p-4 flex justify-between items-center bg-white relative z-10">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest truncate max-w-[150px]">{slide.title}</span>
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => { setCurrentSlide(slide); setIsEditing(true); }}
                                        className="p-3 text-zinc-400 hover:text-brand-dark hover:bg-zinc-100 transition-all rounded-full"
                                        title="Edit Slide"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteHero(slide.id)}
                                        className="p-3 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-full"
                                        title="Delete Slide"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal for Adding/Editing Hero Slide */}
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
                                {currentSlide ? "Edit Hero Slide" : "Add Hero Slide"}
                            </h3>
                            <button onClick={() => setIsEditing(false)} className="text-zinc-600 hover:text-brand-dark transition-colors font-bold">✕</button>
                        </div>
                        <form onSubmit={handleSaveSlide} className="p-8 space-y-6">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70">Slide Title</label>
                                <input
                                    required
                                    name="title"
                                    type="text"
                                    defaultValue={currentSlide?.title || ""}
                                    className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark placeholder:text-zinc-400 font-medium"
                                    placeholder="e.g. Authentic K-Beauty"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70">Subtitle</label>
                                <input
                                    name="subtitle"
                                    type="text"
                                    defaultValue={currentSlide?.subtitle || ""}
                                    className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark placeholder:text-zinc-400 font-medium"
                                    placeholder="Short description under title"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-black text-brand-purple">Image URL (Direct link to photo)</label>
                                <input
                                    required
                                    name="image"
                                    type="text"
                                    defaultValue={currentSlide?.image || ""}
                                    className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark placeholder:text-zinc-400 font-medium"
                                    placeholder="https://example.com/photo.jpg"
                                />
                                <p className="text-[9px] text-zinc-500 mt-2 uppercase font-medium italic">Note: Use a high-quality landscape image URL.</p>
                            </div>

                            <div className="pt-4 flex space-x-4">
                                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-4 border border-zinc-200 text-zinc-500 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-50 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-4 bg-brand-dark text-brand-purple text-[10px] font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-brand-dark transition-all">Save Slide</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            <div className="h-px bg-zinc-200 w-full"></div>

            {/* General Media Section */}
            <section className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                    <div>
                        <h2 className="text-xl font-bold text-brand-dark uppercase tracking-widest">General Media Assets</h2>
                        <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">Gallery and product images.</p>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-white p-6 border border-zinc-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search media..."
                            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-brand-purple text-sm"
                        />
                    </div>
                    <div className="flex items-center space-x-2 border border-zinc-200 p-1">
                        <button
                            onClick={() => setView("grid")}
                            className={cn("p-2 transition-all", view === "grid" ? "bg-brand-dark text-brand-purple" : "text-zinc-400 hover:text-brand-dark")}
                        >
                            <Grid size={18} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {/* Hero Images */}
                    {heroSlides.map((slide) => (
                        <div key={`gal-hero-${slide.id}`} className="group relative bg-white border border-zinc-200 aspect-square overflow-hidden">
                            <img src={slide.image} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                <button onClick={() => handleDeleteHero(slide.id)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                            <div className="absolute bottom-0 inset-x-0 bg-brand-dark/80 p-1">
                                <p className="text-[8px] text-white uppercase text-center truncate">Hero</p>
                            </div>
                        </div>
                    ))}
                    {/* Menu Images */}
                    {menuItems.map((item: any) => (
                        <div key={`gal-menu-${item.id}`} className="group relative bg-white border border-zinc-200 aspect-square overflow-hidden">
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 inset-x-0 bg-brand-purple/80 p-1">
                                <p className="text-[8px] text-brand-dark font-bold uppercase text-center truncate">{item.name}</p>
                            </div>
                        </div>
                    ))}
                    {heroSlides.length === 0 && menuItems.length === 0 && (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-100">
                            <ImageIcon className="mx-auto text-zinc-200 mb-4" size={48} />
                            <p className="text-zinc-400 text-xs uppercase tracking-widest">No media assets found</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Toast Notification */}
            {successMessage && (
                <div className="fixed top-24 right-8 z-[200] bg-brand-dark text-brand-purple px-6 py-3 shadow-2xl border border-brand-purple/20 animate-in fade-in slide-in-from-top-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest">{successMessage}</p>
                </div>
            )}
        </div>
    );
}
