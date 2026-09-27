"use client";

import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Search, Filter, Image as ImageIcon } from "lucide-react";
import { subMenu, saveMenuToFire } from "@/lib/data-store";
import { useState, useEffect } from "react";

export default function ProductManagement() {
    const [products, setProducts] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editItem, setEditItem] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = subMenu(setProducts);
        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        const updated = products.filter(p => p.id !== id);
        await saveMenuToFire(updated);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const itemData = {
            name: formData.get("name") as string,
            brand: formData.get("brand") as string,
            category: formData.get("category") as string,
            price: formData.get("price") as string,
            image: formData.get("image") as string,
            description: formData.get("description") as string,
            flavours: (formData.get("flavours") as string).split(',').map(s => s.trim()).filter(Boolean),
            options: (formData.get("options") as string).split(',').map(s => s.trim()).filter(Boolean),
            status: "Active",
            href: editItem?.href || `/products/${(formData.get("name") as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
        };

        let updated;
        if (editItem?.id) {
            updated = products.map(p => p.id === editItem.id ? { ...p, ...itemData } : p);
        } else {
            updated = [...products, { ...itemData, id: Date.now().toString() }];
        }

        await saveMenuToFire(updated);
        setIsEditing(false);
        setEditItem(null);
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-3xl font-bold text-brand-dark uppercase tracking-tightest">Product Management</h1>
                    <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest font-medium">Add, edit, or remove products from your storefront.</p>
                </div>
                <button
                    onClick={() => { setIsEditing(true); setEditItem(null); }}
                    className="flex items-center space-x-2 px-6 py-3 bg-brand-dark text-brand-purple text-[10px] font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-brand-dark transition-all"
                >
                    <Plus size={16} />
                    <span>Add New Product</span>
                </button>
            </div>

            {/* Products Table */}
            <div className="bg-white border border-zinc-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="text-[10px] uppercase tracking-widest text-zinc-400 bg-zinc-50 border-b border-zinc-100">
                        <tr>
                            <th className="px-6 py-4 font-bold">Image</th>
                            <th className="px-6 py-4 font-bold">Product Name</th>
                            <th className="px-6 py-4 font-bold">Brand</th>
                            <th className="px-6 py-4 font-bold">Category</th>
                            <th className="px-6 py-4 font-bold">Price</th>
                            <th className="px-6 py-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-zinc-50/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="w-12 h-12 bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden">
                                        {product.image ? (
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon size={20} className="text-zinc-300" />
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-xs font-bold text-brand-dark uppercase tracking-wide">{product.name}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[10px] font-bold text-brand-purple uppercase tracking-widest">{product.brand || "—"}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{product.category}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-medium text-brand-dark">{product.price}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button
                                            onClick={() => { setEditItem(product); setIsEditing(true); }}
                                            className="p-2 text-zinc-400 hover:text-brand-dark hover:bg-zinc-100 transition-all"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm("Are you sure you want to delete this product?")) {
                                                    handleDelete(product.id);
                                                }
                                            }}
                                            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 overflow-y-auto py-10">
                    <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm fixed" onClick={() => setIsEditing(false)}></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden my-auto"
                    >
                        <div className="p-8 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                            <h3 className="text-lg font-bold uppercase tracking-widest text-brand-dark">
                                {editItem ? "Edit Product" : "Add New Product"}
                            </h3>
                            <button onClick={() => setIsEditing(false)} className="text-zinc-400 hover:text-brand-dark transition-colors">✕</button>
                        </div>
                        <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70">Product Name</label>
                                    <input required name="name" type="text" defaultValue={editItem?.name || ""} className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark placeholder:text-zinc-400 font-medium" placeholder="e.g. Snail Mucin Power Essence" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70">Brand</label>
                                    <input name="brand" type="text" defaultValue={editItem?.brand || ""} className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark placeholder:text-zinc-400 font-medium" placeholder="e.g. COSRX" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70">Category</label>
                                <select name="category" defaultValue={editItem?.category || "Skincare"} className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm bg-white text-brand-dark font-medium">
                                    <option>Skincare</option>
                                    <option>Makeup</option>
                                    <option>Haircare</option>
                                    <option>Sunscreen</option>
                                    <option>Masks</option>
                                    <option>Bodycare</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70">Price (BDT)</label>
                                <input name="price" type="text" defaultValue={editItem?.price || ""} className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark placeholder:text-zinc-400 font-medium" placeholder="e.g. ৳1,450" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70">Description</label>
                                <textarea name="description" defaultValue={editItem?.description || ""} className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark placeholder:text-zinc-400 font-medium h-24" placeholder="Describe the product, key ingredients, and benefits..." />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70">Variants / Sizes (Comma separated)</label>
                                <input name="flavours" type="text" defaultValue={editItem?.flavours?.join(", ") || ""} className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark placeholder:text-zinc-400 font-medium" placeholder="e.g. 30ml, 50ml, 100ml" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-black text-brand-dark/70">Highlights (Comma separated)</label>
                                <input name="options" type="text" defaultValue={editItem?.options?.join(", ") || ""} className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm text-brand-dark placeholder:text-zinc-400 font-medium" placeholder="e.g. 100% Authentic, Cruelty-free, Fragrance-free" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-black text-brand-purple">Image URL (Paste direct photo link)</label>
                                <input
                                    required
                                    name="image"
                                    type="text"
                                    defaultValue={editItem?.image || ""}
                                    className="w-full px-4 py-2 border border-zinc-300 focus:outline-none focus:border-brand-purple text-sm font-mono text-brand-dark placeholder:text-zinc-400 bg-zinc-50/50"
                                    placeholder="https://example.com/product-photo.jpg"
                                />
                                <p className="text-[9px] text-zinc-500 mt-2 uppercase font-medium">Paste a URL from the web or your hosting to change the product photo.</p>
                            </div>
                            <div className="pt-4 flex space-x-4">
                                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-4 border border-zinc-200 text-zinc-500 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-50 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-4 bg-brand-dark text-brand-purple text-[10px] font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-brand-dark transition-all">Save Changes</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
