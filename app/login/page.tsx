"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Mock authentication
        setTimeout(() => {
            const formData = new FormData(e.target as HTMLFormElement);
            const email = formData.get("email");
            const password = formData.get("password");

            if (email === "admin@cometixglowbd.com" && password === "admin123") {
                router.push("/admin");
            } else {
                setError("Invalid email or password. Hint: admin@cometixglowbd.com / admin123");
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-brand-dark flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background Texture/Accents */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('/images/texture.png')] bg-repeat"></div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo Section */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex flex-col items-center">
                        <span className="text-3xl font-bold tracking-widest text-brand-purple font-sans uppercase">
                            Cometix Glow Bd
                        </span>
                        <span className="text-xs tracking-widest text-brand-cream/60 uppercase -mt-1 font-sans">
                            Admin Portal
                        </span>
                    </Link>
                </div>

                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-12 shadow-2xl">
                    <h1 className="text-brand-light text-2xl font-bold uppercase tracking-widest mb-8 text-center">Sign In</h1>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 text-xs font-medium mb-8 text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] text-brand-cream/50 font-bold block">Email Address</label>
                            <div className="relative">
                                <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-purple" />
                                <input
                                    required
                                    name="email"
                                    type="email"
                                    className="w-full bg-transparent border-b border-white/20 pl-8 py-3 text-brand-light focus:outline-none focus:border-brand-purple transition-colors placeholder:text-white/10"
                                    placeholder="admin@cometixglowbd.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] text-brand-cream/50 font-bold block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-purple" />
                                <input
                                    required
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full bg-transparent border-b border-white/20 pl-8 py-3 text-brand-light focus:outline-none focus:border-brand-purple transition-colors placeholder:text-white/10"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-cream/50 hover:text-brand-purple transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <label className="flex items-center space-x-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 bg-transparent border border-white/20 text-brand-purple focus:ring-0 focus:ring-offset-0 rounded-none cursor-pointer" />
                                <span className="text-[10px] uppercase tracking-widest text-brand-cream/50 group-hover:text-brand-light transition-colors">Remember Me</span>
                            </label>
                            <Link href="#" className="text-[10px] uppercase tracking-widest text-brand-purple hover:text-brand-light transition-colors font-bold">Forgot Password?</Link>
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full py-5 bg-brand-purple text-brand-dark font-bold uppercase tracking-widest hover:bg-brand-light transition-all duration-300 disabled:opacity-50 mt-8 relative overflow-hidden group"
                        >
                            <span className={isLoading ? "opacity-0" : "opacity-100"}>Enter Dashboard</span>
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-brand-cream/30 text-[10px] uppercase tracking-[0.5em]">Authorized Personnel Only</p>
                </div>
            </motion.div>
        </main>
    );
}
