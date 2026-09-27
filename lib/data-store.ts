"use client";

// --- Types ---

export interface Product {
    id: string;
    name: string;
    href: string;
    image: string;
    category: string;
    brand?: string;
    price: string;
    status: string;
    description?: string;
    flavours?: string[]; // Variants / Sizes / Shades
    options?: string[]; // Highlights
}

export interface PackageItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    price: string;
    features: string[];
    image: string;
    cta: string;
}

export interface StoryData {
    visionTitle: string;
    visionSubtitle: string;
    visionText1: string;
    visionText2: string;
    values: { title: string; text: string }[];
    qualityTitle: string;
    qualitySubtitle: string;
    qualityText1: string;
    qualityText2: string;
}

export interface NutritionData {
    introTitle: string;
    introSubtitle: string;
    introText: string;
    highlights: { icon: string; title: string; description: string }[];
    allergenTitle: string;
    allergenSubtitle: string;
    allergenText: string;
    allergenPoints: string[];
    stats: { label: string; percent: string }[];
}

export interface SettingsData {
    email: string;
    phone: string;
    location: string;
    instagram: string;
    facebook: string;
    website: string;
    mission: string;
}

// --- Initial Data ---

export const INITIAL_MENU_ITEMS: Product[] = [
    {
        id: '1',
        name: "Snail Mucin Power Essence",
        href: "/products/snail-mucin-essence",
        image: "/images/products/serum.svg",
        category: "Skincare",
        brand: "COSRX",
        price: "৳1,450",
        status: "Active",
        description: "A cult-favourite, lightweight essence packed with 96% snail secretion filtrate to repair the skin barrier, fade acne marks, and deliver deep hydration. A staple first step in any K-beauty routine.",
        flavours: ["100ml", "Travel Size 30ml"],
        options: ["100% Authentic — imported directly from Korea", "Fragrance-free & lightweight", "Repairs and hydrates in one step", "Cruelty-free formula"]
    },
    {
        id: '2',
        name: "Glow Deep Serum: Propolis + Niacinamide",
        href: "/products/glow-deep-serum",
        image: "/images/products/glow-serum.svg",
        category: "Skincare",
        brand: "Beauty of Joseon",
        price: "৳1,650",
        status: "Active",
        description: "A brightening, glass-skin serum blending black bee propolis with niacinamide to even out tone, calm redness, and leave skin with a natural, dewy glow.",
        flavours: ["30ml"],
        options: ["Brightens & evens skin tone", "Calms redness and irritation", "Lightweight, fast-absorbing texture", "Suitable for sensitive skin"]
    },
    {
        id: '3',
        name: "Water Sleeping Mask",
        href: "/products/water-sleeping-mask",
        image: "/images/products/sleeping-mask.svg",
        category: "Masks",
        brand: "Laneige",
        price: "৳2,200",
        status: "Active",
        description: "An overnight hydration mask that works while you sleep, delivering a surge of moisture so you wake up to plump, radiant, glass-like skin every morning.",
        flavours: ["Original", "Lavender", "Mini 15ml"],
        options: ["Wake up to visibly hydrated skin", "Non-sticky, gel-like texture", "Dermatologist tested", "Free nationwide delivery in Bangladesh"]
    },
    {
        id: '4',
        name: "No-Sebum Rice Velvet Cushion",
        href: "/products/rice-velvet-cushion",
        image: "/images/products/cushion.svg",
        category: "Makeup",
        brand: "Innisfree",
        price: "৳1,850",
        status: "Active",
        description: "A lightweight, velvet-finish cushion foundation infused with rice extract that controls oil and shine all day while giving skin a soft-focus, natural finish.",
        flavours: ["13 Light Beige", "21 Natural Beige", "23 Warm Beige"],
        options: ["Long-lasting oil control", "Buildable, natural coverage", "Includes refill-ready compact", "SPF 33 PA++ protection"]
    },
    {
        id: '5',
        name: "AC Collection Blemish Spot Serum",
        href: "/products/ac-blemish-serum",
        image: "/images/products/spot-serum.svg",
        category: "Skincare",
        brand: "Some By Mi",
        price: "৳990",
        status: "Active",
        description: "A targeted treatment with tea tree and AHA/BHA/PHA to calm active breakouts, reduce inflammation, and prevent future blemishes — a Bangladeshi bestseller.",
        flavours: ["30ml"],
        options: ["Targets acne & blemishes fast", "AHA/BHA/PHA exfoliating complex", "Reduces inflammation overnight", "Loved by oily & combination skin types"]
    },
    {
        id: '6',
        name: "Relief Sun: Rice + Probiotics SPF50+",
        href: "/products/relief-sun-spf",
        image: "/images/products/sunscreen.svg",
        category: "Sunscreen",
        brand: "Beauty of Joseon",
        price: "৳1,350",
        status: "Active",
        description: "A weightless, no white-cast daily sunscreen with SPF50+ PA+++ that doubles as a hydrating skincare step — perfect for Dhaka's climate.",
        flavours: ["50ml"],
        options: ["No white cast, dewy finish", "SPF50+ PA+++ broad spectrum", "Doubles as a moisturiser", "Reef-safe filters"]
    },
    {
        id: '7',
        name: "Soon Jung 2x Barrier Intensive Cream",
        href: "/products/soon-jung-barrier-cream",
        image: "/images/products/cream.svg",
        category: "Skincare",
        brand: "Etude House",
        price: "৳1,250",
        status: "Active",
        description: "A fragrance-free, panthenol-rich moisturiser designed to soothe sensitive, reactive skin while reinforcing the skin barrier for lasting comfort.",
        flavours: ["60ml", "110ml"],
        options: ["Fragrance & irritant-free", "Strengthens the skin barrier", "Suitable for sensitive skin", "Dermatologically tested"]
    },
    {
        id: '8',
        name: "Perfect Repair Hair Serum",
        href: "/products/perfect-repair-hair-serum",
        image: "/images/products/hair-serum.svg",
        category: "Haircare",
        brand: "Mise en Scene",
        price: "৳890",
        status: "Active",
        description: "A silky, argan-oil infused hair serum that repairs split ends, tames frizz, and adds a glassy shine — built to survive Dhaka's humidity.",
        flavours: ["80ml"],
        options: ["Tames frizz & flyaways", "Repairs split ends", "Lightweight, non-greasy formula", "Heat protectant up to 180°C"]
    },
];

export const INITIAL_PACKAGES: PackageItem[] = [
    {
        id: '1',
        title: "Glass Skin Starter Kit",
        subtitle: "Your First Step Into K-Beauty",
        description: "New to Korean skincare? This curated starter set introduces you to the essential steps — cleanse, treat, hydrate, and protect — using bestselling, beginner-friendly picks.",
        price: "৳3,500",
        features: [
            "Gentle Low pH Cleansing Foam",
            "Snail Mucin Power Essence (30ml)",
            "Lightweight Daily Moisturiser",
            "Relief Sun SPF50+ (Travel Size)",
            "Printed Korean Skincare Routine Guide",
            "Free Gift Wrapping"
        ],
        image: "/images/packages/starter-kit.svg",
        cta: "Shop This Kit"
    },
    {
        id: '2',
        title: "10-Step Korean Skincare Ritual",
        subtitle: "The Complete Routine",
        description: "Experience the full traditional 10-step Korean skincare ritual, from double cleansing to sleeping masks, with authentic bestsellers hand-picked by our team.",
        price: "৳7,900",
        features: [
            "Oil Cleanser + Foam Cleanser Duo",
            "Exfoliating Toner",
            "Snail Mucin & Propolis Essences",
            "Ampoule + Sheet Mask Set (5pcs)",
            "Eye Cream & Barrier Moisturiser",
            "Water Sleeping Mask + SPF50+"
        ],
        image: "/images/packages/ten-step-ritual.svg",
        cta: "Shop This Kit"
    },
    {
        id: '3',
        title: "Bridal Glow Box",
        subtitle: "Wedding-Ready Radiance",
        description: "Get camera-ready for your big day with our bridal edit — brightening serums, hydrating masks, and a flawless base, all curated for that coveted Korean glass-skin glow.",
        price: "৳5,200",
        features: [
            "Glow Deep Propolis Serum",
            "Brightening Sheet Mask Set (10pcs)",
            "Rice Velvet Cushion Foundation",
            "Hydrating Lip Tint Duo",
            "Water Sleeping Mask (Mini)",
            "Luxury Gift Box Packaging"
        ],
        image: "/images/packages/bridal-glow.svg",
        cta: "Shop This Kit"
    }
];

export const INITIAL_STORY: StoryData = {
    visionTitle: "Bringing authentic Korean beauty to Bangladesh",
    visionSubtitle: "The Beginning",
    visionText1: "Cometix Glow Bd was born from a simple frustration: finding genuine, authentic Korean skincare and makeup in Bangladesh was difficult, expensive, and full of counterfeits. We set out to change that by building direct relationships with trusted Korean suppliers and bringing their bestselling formulas straight to Bangladeshi shelves and doorsteps.",
    visionText2: "What started as a small passion project has grown into a trusted destination for K-beauty lovers across Dhaka and beyond. Our name represents more than a shop — it represents a promise of authenticity, radiant skin, and a glow that's uniquely yours.",
    values: [
        { title: "Authenticity", text: "Every product we sell is sourced directly from authorised Korean distributors — no counterfeits, ever. What you see is exactly what you get." },
        { title: "Curation", text: "We don't sell everything — we hand-pick bestsellers, cult favourites, and rising K-beauty stars that genuinely work for South Asian skin types and climates." },
        { title: "Care", text: "From packaging to delivery, every order is handled with care, because your skincare journey deserves nothing less than genuine attention." }
    ],
    qualityTitle: "Only 100% Authentic Products",
    qualitySubtitle: "Quality First",
    qualityText1: "We believe glowing skin starts with genuine ingredients. That's why every product on Cometix Glow Bd is sourced directly from official Korean brands and authorised distributors, with batch codes you can verify.",
    qualityText2: "Our commitment to quality extends from cold-chain storage of sensitive formulas to careful, tamper-proof packaging on every single order shipped across Bangladesh."
};

export const INITIAL_NUTRITION: NutritionData = {
    introTitle: "Know what you're putting on your skin",
    introSubtitle: "Ingredient Transparency",
    introText: "At Cometix Glow Bd, we believe glowing skin starts with understanding your ingredients. We highlight the hero ingredients in every product so you can choose formulas that genuinely suit your skin type and concerns.",
    highlights: [
        { icon: "Leaf", title: "Centella Asiatica", description: "A calming hero ingredient (Cica) known for soothing redness, irritation, and supporting a healthy skin barrier." },
        { icon: "ShieldCheck", title: "Niacinamide", description: "A gentle, brightening Vitamin B3 derivative that evens skin tone and minimises the look of pores." },
        { icon: "HeartPulse", title: "Hyaluronic Acid", description: "A powerful humectant that holds up to 1000x its weight in water for deep, lasting hydration." },
        { icon: "Zap", title: "Daily SPF Protection", description: "Broad-spectrum SPF is the single most effective step for preventing premature ageing and pigmentation." }
    ],
    allergenTitle: "Ingredient Safety & Skin Testing",
    allergenSubtitle: "Safety First",
    allergenText: "Your skin's safety is our priority. We only stock dermatologically-tested formulas and always recommend a patch test before introducing any new product into your routine.",
    allergenPoints: ["Fragrance-Free Options Available", "Cruelty-Free & Vegan-Friendly Picks", "Dermatologically Tested Formulas"],
    stats: [
        { label: "Authentic Sourcing", percent: "100%" },
        { label: "Cruelty-Free Brands", percent: "90%" },
        { label: "Dermatologist Tested", percent: "85%" },
        { label: "Reef-Safe Sunscreens", percent: "60%" }
    ]
};

export const INITIAL_HERO_SLIDES = [
    {
        id: '1',
        image: "/images/hero/hero-glow.svg",
        title: "Authentic K-Beauty",
        subtitle: "Direct from Korea to your doorstep",
    },
    {
        id: '2',
        image: "/images/hero/hero-serum.svg",
        title: "The Glass Skin Edit",
        subtitle: "Bestselling serums & essences",
    },
    {
        id: '3',
        image: "/images/hero/hero-bundle.svg",
        title: "Curated Skincare Bundles",
        subtitle: "Your complete K-beauty ritual",
    },
];

export const INITIAL_BRANDS = [
    { id: '1', name: "COSRX" },
    { id: '2', name: "Laneige" },
    { id: '3', name: "Innisfree" },
    { id: '4', name: "Beauty of Joseon" },
    { id: '5', name: "Some By Mi" },
    { id: '6', name: "Etude House" },
];

export const INITIAL_SETTINGS: SettingsData = {
    email: "hello@cometixglowbd.com",
    phone: "+880 1700-000000",
    location: "Gulshan, Dhaka, Bangladesh",
    instagram: "@cometixglowbd",
    facebook: "Cometix Glow BD",
    website: "https://cometixglowbd.com",
    mission: "At Cometix Glow Bd, we bring 100% authentic Korean cosmetics straight from Korea to Bangladesh, so every customer can discover their own natural glow with confidence."
};

// --- Keys ---
const MENU_KEY = "cometixglow_menu_v2";
const PACKAGES_KEY = "cometixglow_packages";
const STORY_KEY = "cometixglow_story";
const NUTRITION_KEY = "cometixglow_nutrition";
const HERO_KEY = "cometixglow_hero";
const BRAND_KEY = "cometixglow_brands_clean_v6";
const INQUIRY_KEY = "cometixglow_inquiries";
const SETTINGS_KEY = "cometixglow_settings";

// --- Helpers ---

import { db } from "./firebase";
import { collection, doc, getDoc, setDoc, getDocs, onSnapshot, query, orderBy, limit, addDoc } from "firebase/firestore";

// Generic fetcher
async function fetchCollection<T>(collectionName: string, defaultValue: T[]): Promise<T[]> {
    try {
        const snapshot = await getDocs(collection(db, collectionName));
        if (snapshot.empty) return defaultValue;
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as unknown as T[];
    } catch (e) {
        console.error(`Error fetching ${collectionName}:`, e);
        return defaultValue;
    }
}

// Generic single doc fetcher
async function fetchDoc<T>(collectionName: string, docId: string, defaultValue: T): Promise<T> {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) return docSnap.data() as T;
        return defaultValue;
    } catch (e) {
        console.error(`Error fetching ${collectionName}/${docId}:`, e);
        return defaultValue;
    }
}

// Subscribe helper
export const subscribeToCollection = (collectionName: string, callback: (data: any[]) => void) => {
    const q = query(collection(db, collectionName));
    return onSnapshot(
        q,
        (snapshot) => {
            const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            callback(data);
        },
        (error) => {
            console.warn(`[Firestore] Permission or query error on collection '${collectionName}':`, error);
            callback([]);
        }
    );
};

export const subscribeToDoc = (collectionName: string, docId: string, callback: (data: any) => void) => {
    return onSnapshot(
        doc(db, collectionName, docId),
        (doc) => {
            if (doc.exists()) callback(doc.data());
        },
        (error) => {
            console.warn(`[Firestore] Permission or query error on doc '${collectionName}/${docId}':`, error);
        }
    );
};

// Settings
export const getStoredSettings = async (): Promise<SettingsData> => {
    return fetchDoc("settings", "global", INITIAL_SETTINGS);
};
export const saveSettings = async (data: SettingsData) => {
    await setDoc(doc(db, "settings", "global"), data);
};
export const subscribeToSettings = (cb: (data: SettingsData) => void) => subscribeToDoc("settings", "global", cb);


// Menu / Products
export const getStoredMenu = async (): Promise<Product[]> => {
    return fetchCollection("menu", INITIAL_MENU_ITEMS);
};
export const saveMenu = async (items: Product[]) => {
    await setDoc(doc(db, "lists", "menu"), { items });
};
export const getStoredMenuV2 = async (): Promise<Product[]> => {
    const data = await fetchDoc<{ items: Product[] }>("lists", "menu", { items: INITIAL_MENU_ITEMS });
    return data.items;
};

// For small lists (Products, Packages, Hero, Brands), we store each as ONE document.
// For Inquiries/Orders, we store as a Collection.

// Products (Menu)
export const getMenu = async (): Promise<Product[]> => {
    const d = await fetchDoc<{ items: Product[] }>("content", "menu", { items: INITIAL_MENU_ITEMS });
    return d.items;
};
export const saveMenuToFire = async (items: Product[]) => {
    await setDoc(doc(db, "content", "menu"), { items });
};
export const subMenu = (cb: (items: Product[]) => void) => subscribeToDoc("content", "menu", (d) => cb(d?.items || INITIAL_MENU_ITEMS));


// Packages / Bundles
export const getPackages = async (): Promise<PackageItem[]> => {
    const d = await fetchDoc<{ items: PackageItem[] }>("content", "packages", { items: INITIAL_PACKAGES });
    return d.items;
};
export const savePackagesToFire = async (items: PackageItem[]) => {
    await setDoc(doc(db, "content", "packages"), { items });
};
export const subPackages = (cb: (items: PackageItem[]) => void) => subscribeToDoc("content", "packages", (d) => cb(d?.items || INITIAL_PACKAGES));


// Story
export const getStory = async (): Promise<StoryData> => {
    return fetchDoc("content", "story", INITIAL_STORY);
};
export const saveStoryToFire = async (data: StoryData) => {
    await setDoc(doc(db, "content", "story"), data);
};
export const subStory = (cb: (data: StoryData) => void) => subscribeToDoc("content", "story", (d) => cb(d || INITIAL_STORY));


// Nutrition / Skin Guide
export const getNutrition = async (): Promise<NutritionData> => {
    return fetchDoc("content", "nutrition", INITIAL_NUTRITION);
};
export const saveNutritionToFire = async (data: NutritionData) => {
    await setDoc(doc(db, "content", "nutrition"), data);
};
export const subNutrition = (cb: (data: NutritionData) => void) => subscribeToDoc("content", "nutrition", (d) => cb(d || INITIAL_NUTRITION));


// Hero
export const getHero = async (): Promise<any[]> => {
    const d = await fetchDoc<{ items: any[] }>("content", "hero", { items: INITIAL_HERO_SLIDES });
    return d.items;
};
export const saveHeroToFire = async (items: any[]) => {
    await setDoc(doc(db, "content", "hero"), { items });
};
export const subHero = (cb: (items: any[]) => void) => subscribeToDoc("content", "hero", (d) => cb(d?.items || INITIAL_HERO_SLIDES));


// Brands
export const getBrands = async (): Promise<any[]> => {
    const d = await fetchDoc<{ items: any[] }>("content", "brands", { items: INITIAL_BRANDS });
    return d.items;
};
export const saveBrandsToFire = async (items: any[]) => {
    await setDoc(doc(db, "content", "brands"), { items });
};
export const subBrands = (cb: (items: any[]) => void) => subscribeToDoc("content", "brands", (d) => cb(d?.items || INITIAL_BRANDS));


// Inquiries / Orders (Collection)
export const getInquiries = async (): Promise<any[]> => {
    const q = query(collection(db, "inquiries"), orderBy("date", "desc"), limit(50));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ ...d.data(), id: d.id }));
};
export const saveInquiryToFire = async (inquiry: any) => {
    await addDoc(collection(db, "inquiries"), {
        ...inquiry,
        date: new Date().toISOString(),
        read: false
    });
};
export const subInquiries = (cb: (items: any[]) => void) => {
    const q = query(collection(db, "inquiries"), orderBy("date", "desc"), limit(50));
    return onSnapshot(
        q,
        (snapshot) => {
            cb(snapshot.docs.map(d => ({ ...d.data(), id: d.id })));
        },
        (error) => {
            console.warn("[Firestore] Permission error on subInquiries:", error);
            cb([]);
        }
    );
};
