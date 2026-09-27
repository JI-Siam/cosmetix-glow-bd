"use client";

import { motion } from "framer-motion";
import {
    Users,
    TrendingUp,
    Calendar,
    Star,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { getInquiries, subInquiries } from "@/lib/data-store";

const stats = [
    { name: "Total Orders", value: "128", icon: <Calendar />, change: "+12%", positive: true },
    { name: "Estimated Revenue", value: "৳4,25,000", icon: <TrendingUp />, change: "+8.5%", positive: true },
    { name: "Website Visitors", value: "3,240", icon: <Users />, change: "-2.1%", positive: false },
    { name: "Average Rating", value: "4.9/5", icon: <Star />, change: "+0.2%", positive: true },
];

const MOCK_INQUIRIES = [
    { id: 1, name: "Jessica Rahman", email: "jessica@example.com", phone: "+880 1712-345678", type: "New Order", guests: "Snail Mucin Essence", status: "Pending", date: "2 mins ago" },
    { id: 2, name: "Nusrat Jahan", email: "nusrat@example.com", phone: "+880 1822-223333", type: "Bulk / Reseller", guests: "10-Step Ritual Kit", status: "Confirmed", date: "1 hour ago" },
    { id: 3, name: "David Islam", email: "david@example.com", phone: "+880 1999-888877", type: "Skin Advice", guests: "Relief Sun SPF50+", status: "Cancelled", date: "4 hours ago" },
    { id: 4, name: "Sara Khan", email: "sara@example.com", phone: "+880 1555-444422", type: "New Order", guests: "Bridal Glow Box", status: "Pending", date: "Yesterday" },
];

export default function AdminOverview() {
    const [inquiries, setInquiries] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = subInquiries((data) => {
            setInquiries(data.length > 0 ? data : MOCK_INQUIRIES);
        });
        return () => unsubscribe();
    }, []);

    const stats = [
        { name: "Total Orders", value: inquiries.length.toString(), icon: <Calendar />, change: "+12%", positive: true },
        { name: "Estimated Revenue", value: "৳4,25,000", icon: <TrendingUp />, change: "+8.5%", positive: true },
        { name: "Website Visitors", value: "3,240", icon: <Users />, change: "-2.1%", positive: false },
        { name: "Average Rating", value: "4.9/5", icon: <Star />, change: "+0.2%", positive: true },
    ];

    return (
        <div className="space-y-10">
            {/* Page Title */}
            <div>
                <h1 className="text-3xl font-bold text-brand-dark uppercase tracking-tightest">Dashboard Overview</h1>
                <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest font-medium">Welcome back to Cometix Glow Bd.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow rounded-[20px]"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-brand-dark text-brand-purple rounded-[10px]">
                                {stat.icon}
                            </div>
                            <div className={cn(
                                "flex items-center text-[10px] font-bold uppercase tracking-wider",
                                stat.positive ? "text-green-600" : "text-red-500"
                            )}>
                                {stat.change}
                                {stat.positive ? <ArrowUpRight size={14} className="ml-1" /> : <ArrowDownRight size={14} className="ml-1" />}
                            </div>
                        </div>
                        <p className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold">{stat.name}</p>
                        <p className="text-2xl font-bold text-brand-dark mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Inquiries Table */}
                <div className="lg:col-span-2 bg-white border border-zinc-200 shadow-sm overflow-hidden rounded-[20px]">
                    <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-brand-dark">Recent Orders & Enquiries</h3>
                        <button className="text-[10px] font-bold uppercase tracking-widest text-brand-purple hover:text-brand-dark transition-colors">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-[10px] uppercase tracking-widest text-zinc-400 bg-zinc-50 border-b border-zinc-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold">Customer</th>
                                    <th className="px-6 py-4 font-bold">Contact</th>
                                    <th className="px-6 py-4 font-bold">Received</th>
                                    <th className="px-6 py-4 font-bold">Type</th>
                                    <th className="px-6 py-4 font-bold">Product</th>
                                    <th className="px-6 py-4 font-bold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50">
                                {inquiries.slice(0, 10).map((inquiry) => (
                                    <tr key={inquiry.id} className="hover:bg-zinc-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-bold text-brand-dark uppercase tracking-wide">{inquiry.name}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-[10px] text-zinc-500 font-medium">{inquiry.email}</p>
                                            <p className="text-[10px] text-brand-purple font-bold">{inquiry.phone}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">{inquiry.date || "N/A"}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{inquiry.type}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-zinc-600">{inquiry.guests}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2 py-1 text-[9px] font-bold uppercase tracking-widest border rounded-md",
                                                inquiry.status === "Confirmed" ? "bg-green-50 text-green-700 border-green-200" :
                                                    inquiry.status === "Pending" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                                        "bg-red-50 text-red-700 border-red-200"
                                            )}>
                                                {inquiry.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Popular Products */}
                <div className="bg-white border border-zinc-200 shadow-sm flex flex-col rounded-[20px] overflow-hidden">
                    <div className="p-6 border-b border-zinc-100 bg-zinc-50/50">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-brand-dark">Most Popular Items</h3>
                    </div>
                    <div className="p-6 flex-1 space-y-6">
                        {[
                            { name: "Snail Mucin Power Essence", share: 38, color: "bg-brand-purple" },
                            { name: "Water Sleeping Mask", share: 27, color: "bg-brand-violet" },
                            { name: "Relief Sun SPF50+", share: 20, color: "bg-brand-dark" },
                            { name: "Other Products", share: 15, color: "bg-zinc-300" },
                        ].map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                                    <span className="text-zinc-500">{item.name}</span>
                                    <span className="text-brand-dark">{item.share}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.share}%` }}
                                        transition={{ duration: 1, delay: i * 0.2 }}
                                        className={cn("h-full", item.color)}
                                    ></motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 border-t border-zinc-100">
                        <a href="/admin/products" className="block text-center w-full py-3 border border-brand-dark text-brand-dark text-[10px] font-bold uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-all rounded-[10px]">Manage Products</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
