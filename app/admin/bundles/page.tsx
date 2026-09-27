"use client";

import { useState, useEffect } from "react";
import { subPackages, savePackagesToFire, PackageItem } from "@/lib/data-store";
import { Plus, Trash2, Edit2, Save, X, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPackagesPage() {
    const [packages, setPackages] = useState<PackageItem[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState<PackageItem | null>(null);

    useEffect(() => {
        const unsubscribe = subPackages(setPackages);
        return () => unsubscribe();
    }, []);

    const handleSave = async () => {
        if (!editingItem) return;

        let updatedPackages;
        if (packages.find(p => p.id === editingItem.id)) {
            // Update existing
            updatedPackages = packages.map(p => p.id === editingItem.id ? editingItem : p);
        } else {
            // Add new
            updatedPackages = [...packages, { ...editingItem, id: Date.now().toString() }];
        }

        await savePackagesToFire(updatedPackages);
        setIsEditing(false);
        setEditingItem(null);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this bundle?")) {
            const updated = packages.filter(p => p.id !== id);
            await savePackagesToFire(updated);
        }
    };

    const handleFeatureChange = (index: number, value: string) => {
        if (!editingItem) return;
        const newFeatures = [...editingItem.features];
        newFeatures[index] = value;
        setEditingItem({ ...editingItem, features: newFeatures });
    };

    const addFeature = () => {
        if (!editingItem) return;
        setEditingItem({ ...editingItem, features: [...editingItem.features, ""] });
    };

    const removeFeature = (index: number) => {
        if (!editingItem) return;
        const newFeatures = editingItem.features.filter((_, i) => i !== index);
        setEditingItem({ ...editingItem, features: newFeatures });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-brand-dark uppercase tracking-wide">Bundles & Gift Sets</h1>
                    <p className="text-brand-dark/60 mt-2">Manage your curated skincare bundles and gift sets.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingItem({
                            id: "",
                            title: "",
                            subtitle: "",
                            description: "",
                            price: "",
                            features: [],
                            image: "",
                            cta: ""
                        });
                        setIsEditing(true);
                    }}
                    className="flex items-center space-x-2 bg-brand-purple text-brand-dark px-6 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors"
                >
                    <Plus size={18} />
                    <span>Add Bundle</span>
                </button>
            </div>

            {/* List View */}
            {!isEditing && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <motion.div
                            key={pkg.id}
                            layoutId={pkg.id}
                            className="bg-white border border-brand-dark/5 p-6 shadow-sm hover:shadow-md transition-shadow group relative"
                        >
                            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => {
                                        setEditingItem(pkg);
                                        setIsEditing(true);
                                    }}
                                    className="p-2 bg-brand-dark text-white rounded-full hover:bg-brand-purple transition-colors"
                                >
                                    <Edit2 size={14} />
                                </button>
                                <button
                                    onClick={() => handleDelete(pkg.id)}
                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            <span className="text-brand-purple font-script text-xl">{pkg.subtitle}</span>
                            <h3 className="text-xl font-bold text-brand-dark uppercase tracking-wide mt-1 mb-4">{pkg.title}</h3>
                            <p className="text-sm text-brand-dark/60 mb-6 line-clamp-3">{pkg.description}</p>

                            <div className="flex justify-between items-center pt-4 border-t border-brand-dark/5">
                                <span className="font-bold text-brand-dark">{pkg.price}</span>
                                <span className="text-xs text-brand-dark/40 uppercase tracking-widest">{pkg.features.length} Features</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Edit Form */}
            {isEditing && editingItem && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-brand-dark/5 p-8 max-w-4xl mx-auto shadow-xl"
                >
                    <div className="flex justify-between items-center mb-8 border-b border-brand-dark/5 pb-4">
                        <h2 className="text-2xl font-bold text-brand-dark uppercase tracking-wide">
                            {editingItem.id ? "Edit Bundle" : "New Bundle"}
                        </h2>
                        <button onClick={() => setIsEditing(false)} className="text-brand-dark/40 hover:text-brand-dark">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={editingItem.title}
                                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                    className="w-full bg-zinc-50 border border-brand-dark/10 p-3 focus:outline-none focus:border-brand-purple"
                                    placeholder="e.g. Glass Skin Starter Kit"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Subtitle</label>
                                <input
                                    type="text"
                                    value={editingItem.subtitle}
                                    onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                                    className="w-full bg-zinc-50 border border-brand-dark/10 p-3 focus:outline-none focus:border-brand-purple"
                                    placeholder="e.g. Your First Step Into K-Beauty"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Description</label>
                            <textarea
                                value={editingItem.description}
                                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                className="w-full bg-zinc-50 border border-brand-dark/10 p-3 h-32 focus:outline-none focus:border-brand-purple"
                                placeholder="Describe the package..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Price</label>
                                <input
                                    type="text"
                                    value={editingItem.price}
                                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                                    className="w-full bg-zinc-50 border border-brand-dark/10 p-3 focus:outline-none focus:border-brand-purple"
                                    placeholder="e.g. ৳3,500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60 mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={editingItem.image}
                                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                                    className="w-full bg-zinc-50 border border-brand-dark/10 p-3 focus:outline-none focus:border-brand-purple"
                                    placeholder="/images/packages/..."
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/60">Features</label>
                                <button
                                    onClick={addFeature}
                                    className="text-[10px] font-bold uppercase tracking-widest text-brand-purple hover:text-brand-dark"
                                >
                                    + Add Feature
                                </button>
                            </div>
                            <div className="space-y-3">
                                {editingItem.features.map((feature, idx) => (
                                    <div key={idx} className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) => handleFeatureChange(idx, e.target.value)}
                                            className="flex-1 bg-zinc-50 border border-brand-dark/10 p-3 focus:outline-none focus:border-brand-purple"
                                            placeholder="Feature detail..."
                                        />
                                        <button
                                            onClick={() => removeFeature(idx)}
                                            className="p-3 text-red-400 hover:text-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 flex justify-end space-x-4 border-t border-brand-dark/5">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-3 text-brand-dark/60 font-bold uppercase tracking-widest hover:text-brand-dark text-xs"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-8 py-3 bg-brand-dark text-brand-light font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-brand-dark transition-colors text-xs flex items-center space-x-2"
                            >
                                <Save size={16} />
                                <span>Save Bundle</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
