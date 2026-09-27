"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
    INITIAL_MENU_ITEMS,
    INITIAL_PACKAGES,
    INITIAL_HERO_SLIDES,
    INITIAL_BRANDS,
    INITIAL_STORY,
    INITIAL_NUTRITION,
    INITIAL_SETTINGS
} from "@/lib/data-store";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export default function InitializeDataPage() {
    const [status, setStatus] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{ name: string; status: "success" | "exists" | "error"; message: string }[]>([]);

    const initializeData = async () => {
        setLoading(true);
        setStatus("Starting initialization...");
        const newResults: typeof results = [];

        const steps = [
            { name: "Menu", ref: doc(db, "content", "menu"), payload: { items: INITIAL_MENU_ITEMS }, info: `${INITIAL_MENU_ITEMS.length} items` },
            { name: "Packages", ref: doc(db, "content", "packages"), payload: { items: INITIAL_PACKAGES }, info: `${INITIAL_PACKAGES.length} packages` },
            { name: "Hero Slides", ref: doc(db, "content", "hero"), payload: { items: INITIAL_HERO_SLIDES }, info: `${INITIAL_HERO_SLIDES.length} slides` },
            { name: "Brands", ref: doc(db, "content", "brands"), payload: { items: INITIAL_BRANDS }, info: `${INITIAL_BRANDS.length} brands` },
            { name: "Story", ref: doc(db, "content", "story"), payload: INITIAL_STORY, info: "Story data" },
            { name: "Nutrition", ref: doc(db, "content", "nutrition"), payload: INITIAL_NUTRITION, info: "Nutrition data" },
            { name: "Settings", ref: doc(db, "settings", "global"), payload: INITIAL_SETTINGS, info: "Global settings" },
        ];

        for (const step of steps) {
            setStatus(`Initializing ${step.name}...`);
            try {
                const docSnap = await getDoc(step.ref);
                if (!docSnap.exists()) {
                    await setDoc(step.ref, step.payload);
                    newResults.push({ name: step.name, status: "success", message: `${step.info} initialized` });
                } else {
                    newResults.push({ name: step.name, status: "exists", message: "Already exists" });
                }
            } catch (err: any) {
                console.error(`Error initializing ${step.name}:`, err);
                newResults.push({
                    name: step.name,
                    status: "error",
                    message: err?.message || "Permission denied or network error"
                });
            }
            setResults([...newResults]);
        }

        setStatus("Initialization finished.");
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-brand-light flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white border border-brand-dark/10 shadow-xl">
                <div className="p-8 border-b border-brand-dark/5 bg-zinc-50">
                    <h1 className="text-3xl font-bold text-brand-dark uppercase tracking-tightest">
                        Firebase Data Initialization
                    </h1>
                    <p className="text-brand-dark/60 mt-2 text-sm">
                        Click the button below to populate your Firebase database with initial data.
                    </p>
                </div>

                <div className="p-8 space-y-6">
                    {!loading && results.length === 0 && (
                        <button
                            onClick={initializeData}
                            className="w-full py-4 bg-brand-dark text-brand-purple font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-brand-dark transition-all text-sm"
                        >
                            Initialize Firebase Data
                        </button>
                    )}

                    {loading && (
                        <div className="flex items-center justify-center space-x-3 py-8">
                            <Loader2 className="w-6 h-6 text-brand-purple animate-spin" />
                            <span className="text-brand-dark/60 text-sm uppercase tracking-widest">{status}</span>
                        </div>
                    )}

                    {results.length > 0 && (
                        <div className="space-y-3">
                            {results.map((result, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center justify-between p-4 border ${result.status === "success"
                                        ? "border-green-200 bg-green-50"
                                        : result.status === "exists"
                                            ? "border-blue-200 bg-blue-50"
                                            : "border-red-200 bg-red-50"
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        {result.status === "success" && (
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        )}
                                        {result.status === "exists" && (
                                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                        )}
                                        {result.status === "error" && (
                                            <AlertCircle className="w-5 h-5 text-red-600" />
                                        )}
                                        <span className="font-bold text-sm uppercase tracking-widest text-brand-dark">
                                            {result.name}
                                        </span>
                                    </div>
                                    <span className="text-xs text-brand-dark/60">{result.message}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && results.length > 0 && (
                        <div className="pt-6 border-t border-brand-dark/5 space-y-4">
                            <p className="text-sm text-brand-dark/80 text-center">
                                {status}
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="/"
                                    className="flex-1 py-3 bg-brand-purple text-brand-dark font-bold uppercase tracking-widest hover:bg-brand-dark hover:text-brand-purple transition-all text-center text-sm"
                                >
                                    View Website
                                </a>
                                <a
                                    href="/admin"
                                    className="flex-1 py-3 border border-brand-dark text-brand-dark font-bold uppercase tracking-widest hover:bg-brand-dark hover:text-brand-purple transition-all text-center text-sm"
                                >
                                    Admin Dashboard
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
