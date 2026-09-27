"use client";

import { useState, useEffect } from "react";
import { subStory, saveStoryToFire, StoryData } from "@/lib/data-store";
import { Save } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminStoryPage() {
    const [story, setStory] = useState<StoryData | null>(null);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const unsubscribe = subStory((data) => {
            if (data) setStory(data);
        });
        return () => unsubscribe();
    }, []);

    const handleSave = async () => {
        if (story) {
            await saveStoryToFire(story);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }
    };

    if (!story) return <div>Loading...</div>;

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-brand-dark uppercase tracking-wide">Our Story</h1>
                    <p className="text-brand-dark/60 mt-2">Update your brand narrative, vision, and values.</p>
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
                {/* Vision Section */}
                <section className="bg-white p-8 shadow-sm border border-brand-dark/5">
                    <h2 className="text-xl font-bold text-brand-purple uppercase tracking-widest mb-6 border-b border-brand-dark/5 pb-4">The Vision</h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Section Subtitle</label>
                                <input
                                    type="text"
                                    value={story.visionSubtitle}
                                    onChange={(e) => setStory({ ...story, visionSubtitle: e.target.value })}
                                    className="w-full bg-zinc-50 border border-brand-dark/10 p-3 focus:outline-none focus:border-brand-purple"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Main Headline</label>
                                <input
                                    type="text"
                                    value={story.visionTitle}
                                    onChange={(e) => setStory({ ...story, visionTitle: e.target.value })}
                                    className="w-full bg-zinc-50 border border-brand-dark/10 p-3 focus:outline-none focus:border-brand-purple"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Paragraph 1</label>
                            <textarea
                                value={story.visionText1}
                                onChange={(e) => setStory({ ...story, visionText1: e.target.value })}
                                className="w-full bg-zinc-50 border border-brand-dark/10 p-3 h-32 focus:outline-none focus:border-brand-purple"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Paragraph 2</label>
                            <textarea
                                value={story.visionText2}
                                onChange={(e) => setStory({ ...story, visionText2: e.target.value })}
                                className="w-full bg-zinc-50 border border-brand-dark/10 p-3 h-32 focus:outline-none focus:border-brand-purple"
                            />
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="bg-white p-8 shadow-sm border border-brand-dark/5">
                    <h2 className="text-xl font-bold text-brand-purple uppercase tracking-widest mb-6 border-b border-brand-dark/5 pb-4">Core Values</h2>
                    <div className="space-y-8">
                        {story.values.map((value, index) => (
                            <div key={index} className="bg-zinc-50 p-6 border border-brand-dark/5">
                                <div className="mb-4">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Value Title {index + 1}</label>
                                    <input
                                        type="text"
                                        value={value.title}
                                        onChange={(e) => {
                                            const newValues = [...story.values];
                                            newValues[index].title = e.target.value;
                                            setStory({ ...story, values: newValues });
                                        }}
                                        className="w-full bg-white border border-brand-dark/10 p-3 focus:outline-none focus:border-brand-purple"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Value Description</label>
                                    <textarea
                                        value={value.text}
                                        onChange={(e) => {
                                            const newValues = [...story.values];
                                            newValues[index].text = e.target.value;
                                            setStory({ ...story, values: newValues });
                                        }}
                                        className="w-full bg-white border border-brand-dark/10 p-3 h-24 focus:outline-none focus:border-brand-purple"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quality Section */}
                <section className="bg-white p-8 shadow-sm border border-brand-dark/5">
                    <h2 className="text-xl font-bold text-brand-purple uppercase tracking-widest mb-6 border-b border-brand-dark/5 pb-4">Quality Philosophy</h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Section Subtitle</label>
                                <input
                                    type="text"
                                    value={story.qualitySubtitle}
                                    onChange={(e) => setStory({ ...story, qualitySubtitle: e.target.value })}
                                    className="w-full bg-zinc-50 border border-brand-dark/10 p-3 focus:outline-none focus:border-brand-purple"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Main Headline</label>
                                <input
                                    type="text"
                                    value={story.qualityTitle}
                                    onChange={(e) => setStory({ ...story, qualityTitle: e.target.value })}
                                    className="w-full bg-zinc-50 border border-brand-dark/10 p-3 focus:outline-none focus:border-brand-purple"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Paragraph 1</label>
                            <textarea
                                value={story.qualityText1}
                                onChange={(e) => setStory({ ...story, qualityText1: e.target.value })}
                                className="w-full bg-zinc-50 border border-brand-dark/10 p-3 h-32 focus:outline-none focus:border-brand-purple"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Paragraph 2</label>
                            <textarea
                                value={story.qualityText2}
                                onChange={(e) => setStory({ ...story, qualityText2: e.target.value })}
                                className="w-full bg-zinc-50 border border-brand-dark/10 p-3 h-32 focus:outline-none focus:border-brand-purple"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
