"use client";

import { useState, useEffect } from "react";
import { subNutrition, saveNutritionToFire, NutritionData } from "@/lib/data-store";
import { Save } from "lucide-react";

export default function AdminNutritionPage() {
    const [data, setData] = useState<NutritionData | null>(null);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const unsubscribe = subNutrition((fetchedData) => {
            if (fetchedData) setData(fetchedData);
        });
        return () => unsubscribe();
    }, []);

    const handleSave = async () => {
        if (data) {
            await saveNutritionToFire(data);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }
    };

    if (!data) return <div>Loading...</div>;

    const updateHighlight = (index: number, field: string, value: string) => {
        const newHighlights = [...data.highlights];
        newHighlights[index] = { ...newHighlights[index], [field]: value };
        setData({ ...data, highlights: newHighlights });
    };

    const updateAllergenPoint = (index: number, value: string) => {
        const newPoints = [...data.allergenPoints];
        newPoints[index] = value;
        setData({ ...data, allergenPoints: newPoints });
    };

    const updateStat = (index: number, field: string, value: string) => {
        const newStats = [...data.stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setData({ ...data, stats: newStats });
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-brand-dark uppercase tracking-wide">Skin Guide</h1>
                    <p className="text-brand-dark/60 mt-2">Manage hero ingredients, safety info, and trust stats.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-brand-dark text-brand-light px-8 py-3 font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-brand-dark transition-colors"
                >
                    <Save size={18} />
                    <span>{saved ? "Saved!" : "Save Changes"}</span>
                </button>
            </div>

            <div className="space-y-12">
                {/* Intro Section */}
                <section className="bg-white p-8 shadow-sm border border-brand-dark/5">
                    <h2 className="text-xl font-bold text-brand-purple uppercase tracking-widest mb-6 border-b border-brand-dark/5 pb-4">Introduction</h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Section Subtitle</label>
                                <input
                                    type="text"
                                    value={data.introSubtitle}
                                    onChange={(e) => setData({ ...data, introSubtitle: e.target.value })}
                                    className="w-full bg-zinc-50 border border-brand-dark/10 p-3 focus:outline-none focus:border-brand-purple"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Main Headline</label>
                                <input
                                    type="text"
                                    value={data.introTitle}
                                    onChange={(e) => setData({ ...data, introTitle: e.target.value })}
                                    className="w-full bg-zinc-50 border border-brand-dark/10 p-3 focus:outline-none focus:border-brand-purple"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Introduction Text</label>
                            <textarea
                                value={data.introText}
                                onChange={(e) => setData({ ...data, introText: e.target.value })}
                                className="w-full bg-zinc-50 border border-brand-dark/10 p-3 h-32 focus:outline-none focus:border-brand-purple"
                            />
                        </div>
                    </div>
                </section>

                {/* Highlights Section */}
                <section className="bg-white p-8 shadow-sm border border-brand-dark/5">
                    <h2 className="text-xl font-bold text-brand-purple uppercase tracking-widest mb-6 border-b border-brand-dark/5 pb-4">Ingredient Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {data.highlights.map((highlight, index) => (
                            <div key={index} className="bg-zinc-50 p-6 border border-brand-dark/5">
                                <span className="text-[10px] text-brand-dark/40 font-bold uppercase tracking-widest block mb-4">Highlight {index + 1}</span>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={highlight.title}
                                        onChange={(e) => updateHighlight(index, 'title', e.target.value)}
                                        className="w-full bg-white border border-brand-dark/10 p-3 focus:outline-none focus:border-brand-purple placeholder:text-zinc-300"
                                        placeholder="Title"
                                    />
                                    <textarea
                                        value={highlight.description}
                                        onChange={(e) => updateHighlight(index, 'description', e.target.value)}
                                        className="w-full bg-white border border-brand-dark/10 p-3 h-24 focus:outline-none focus:border-brand-purple placeholder:text-zinc-300"
                                        placeholder="Description"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Allergen Section */}
                <section className="bg-white p-8 shadow-sm border border-brand-dark/5">
                    <h2 className="text-xl font-bold text-brand-purple uppercase tracking-widest mb-6 border-b border-brand-dark/5 pb-4">Safety & Stats</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Allergen Info */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wide">Allergen Information</h3>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Description</label>
                                <textarea
                                    value={data.allergenText}
                                    onChange={(e) => setData({ ...data, allergenText: e.target.value })}
                                    className="w-full bg-zinc-50 border border-brand-dark/10 p-3 h-24 focus:outline-none focus:border-brand-purple"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Key Points</label>
                                <div className="space-y-2">
                                    {data.allergenPoints.map((point, idx) => (
                                        <input
                                            key={idx}
                                            type="text"
                                            value={point}
                                            onChange={(e) => updateAllergenPoint(idx, e.target.value)}
                                            className="w-full bg-zinc-50 border border-brand-dark/10 p-2 focus:outline-none focus:border-brand-purple"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Stats Info */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wide">Ingredient Stats</h3>
                            <div className="space-y-4">
                                {data.stats.map((stat, idx) => (
                                    <div key={idx} className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={stat.label}
                                            onChange={(e) => updateStat(idx, 'label', e.target.value)}
                                            className="flex-1 bg-zinc-50 border border-brand-dark/10 p-2 focus:outline-none focus:border-brand-purple"
                                            placeholder="Label"
                                        />
                                        <input
                                            type="text"
                                            value={stat.percent}
                                            onChange={(e) => updateStat(idx, 'percent', e.target.value)}
                                            className="w-20 bg-zinc-50 border border-brand-dark/10 p-2 focus:outline-none focus:border-brand-purple text-center"
                                            placeholder="%"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
