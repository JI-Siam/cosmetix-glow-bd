"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    Image as ImageIcon,
    Settings,
    LogOut,
    Bell,
    Search,
    User,
    ShieldCheck,
    Box,
    BookOpen,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const sidebarLinks = [
    { name: "Overview", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Products", href: "/admin/products", icon: <ShoppingBag size={20} /> },
    { name: "Bundles", href: "/admin/bundles", icon: <Box size={20} /> },
    { name: "Our Story", href: "/admin/story", icon: <BookOpen size={20} /> },
    { name: "Skin Guide", href: "/admin/skin-guide", icon: <Sparkles size={20} /> },
    { name: "Media Gallery", href: "/admin/media", icon: <ImageIcon size={20} /> },
    { name: "Brand Partners", href: "/admin/brands", icon: <ShieldCheck size={20} /> },
    { name: "Site Settings", href: "/admin/settings", icon: <Settings size={20} /> },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        router.push("/login");
    };

    return (
        <div className="flex h-screen bg-zinc-50 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-brand-dark flex flex-col items-center py-10 px-6 border-r border-brand-purple/10 z-50">
                <Link href="/" className="flex flex-col items-center mb-16">
                    <span className="text-xl font-bold tracking-widest text-brand-purple uppercase">
                        Cometix Glow Bd
                    </span>
                    <span className="text-[10px] tracking-widest text-brand-cream/60 uppercase">
                        Admin Control
                    </span>
                </Link>

                <nav className="flex-1 w-full space-y-2">
                    {sidebarLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "flex items-center space-x-3 px-4 py-3 rounded-none transition-all duration-300 group",
                                pathname === link.href
                                    ? "bg-brand-purple text-brand-dark"
                                    : "text-brand-cream/80 hover:text-brand-purple hover:bg-white/5"
                            )}
                        >
                            <span className={cn(
                                "transition-colors",
                                pathname === link.href ? "text-brand-dark" : "group-hover:text-brand-purple"
                            )}>
                                {link.icon}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest">{link.name}</span>
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute right-0 w-1 h-8 bg-brand-dark"
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="w-full pt-6 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 w-full text-brand-cream/60 hover:text-red-400 transition-colors group"
                    >
                        <LogOut size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-20 bg-brand-dark border-b border-brand-purple/10 flex items-center justify-between px-10 shrink-0 shadow-2xl relative z-20">
                    <div className="flex items-center space-x-1">
                        {[
                            { name: "Home", href: "/" },
                            { name: "Shop", href: "/shop" },
                            { name: "Bundles", href: "/bundles" },
                            { name: "Skin Guide", href: "/skin-guide" },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-brand-purple hover:bg-white/5 transition-all border border-transparent hover:border-brand-purple/20"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-6">
                        <button className="relative text-brand-cream/60 hover:text-brand-purple transition-colors">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-purple rounded-full border-2 border-brand-dark"></span>
                        </button>
                        <div className="h-8 w-px bg-white/10 mx-2"></div>
                        <div className="flex items-center space-x-3">
                            <div className="text-right hidden md:block">
                                <p className="text-xs font-bold text-brand-purple uppercase tracking-wide">Admin</p>
                                <p className="text-[10px] text-brand-cream/40 uppercase tracking-widest font-bold">Manage Site</p>
                            </div>
                            <div className="w-10 h-10 bg-brand-purple text-brand-dark rounded-none flex items-center justify-center font-bold shadow-lg border border-brand-purple/20">
                                <User size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-10 bg-zinc-50/50">
                    {children}
                </div>
            </main>
        </div>
    );
}
