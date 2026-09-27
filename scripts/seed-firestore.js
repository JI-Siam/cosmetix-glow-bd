// Seed script to populate Firestore with initial data
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDHedDyfjn0NImFTC0jIuzJXuAB7xFlHgk",
    authDomain: "chaibros.firebaseapp.com",
    projectId: "chaibros",
    storageBucket: "chaibros.firebasestorage.app",
    messagingSenderId: "687663699224",
    appId: "1:687663699224:web:cffab1e5dd4c1737effa6d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initial data from data-store.ts
const INITIAL_MENU_ITEMS = [
    {
        id: '1',
        name: "Chai",
        href: "/products/chai",
        image: "/images/products/chai.png",
        category: "Chai",
        price: "£3.50",
        status: "Active",
        description: "Our world-famous Karak Chaii is a blend of premium black tea leaves, evaporated milk, and a secret infusion of ginger, cardamom, and saffron. Slow-brewed to perfection for a rich, velvety texture and an aromatic depth that is truly unmatched.",
        flavours: ["Masala", "Karak", "Saffron", "Elaichi"],
        options: ["Served in premium insulated cups", "Available in original and sugar-free", "Live theatre pouring experience", "Sourced from single-origin estates"]
    },
    {
        id: '2',
        name: "Ice Coffee",
        href: "/products/iced-coffee",
        image: "/images/products/iced-coffee.png",
        category: "Coffee",
        price: "£4.50",
        status: "Active",
        description: "Our iced coffee is crafted from cold-brewed Arabica beans, steeped for 18 hours for a smooth, low-acidity profile. Combined with our signature milk blend and a hint of vanilla or caramel for the ultimate refreshment.",
        flavours: ["Caramel on Ice", "Blondie", "Vanilla Bean", "Double Espresso"],
        options: ["Customisable sweetness levels", "Vegan milk alternatives available", "Served over crystal clear ice", "Freshly prepared for every event"]
    },
    {
        id: '3',
        name: "Matcha",
        href: "/products/matcha",
        image: "/images/products/matcha.png",
        category: "Health",
        price: "£5.50",
        status: "Active",
        description: "Experience the vibrant energy of our Ceremonial Grade Matcha. Whisked traditionally and served with a choice of premium milks, it's the perfect balance of earthy sweetness and refined focus.",
        flavours: ["Ceremonial", "Matcha Latte", "Iced Matcha", "Rose Matcha"],
        options: ["Whisked to order for freshness", "Available hot or as a latte", "High in antioxidants", "Vibrant, natural green hue"]
    },
    {
        id: '4',
        name: "Mocktails",
        href: "/products/mocktails",
        image: "/images/products/mocktails.png",
        category: "Drinks",
        price: "£4.50",
        status: "Active",
        description: "Elevate your beverage choice with our curated collection of artisan mocktails. Using fresh fruit purées, botanical extracts, and high-quality sparkling bases, each drink is a masterpiece of balance and flavour.",
        flavours: ["Classic Mojito", "Piña Colada", "Blue Lagoon", "Strawberry Daiquiri"],
        options: ["Signature blends tailored to you", "No artificial colours or flavours", "Professional mixology service", "Beautifully garnished presentation"]
    },
    {
        id: '5',
        name: "Live Dutch Pancakes",
        href: "/products/pancakes",
        image: "/images/products/pancakes.png",
        category: "Snacks",
        price: "From £5.00",
        status: "Active",
        description: "Experience the theatre of live cooking with our mini Dutch Pancakes (Poffertjes). Fluffy, bite-sized delights cooked right before your eyes and topped with an array of premium indulgences.",
        flavours: ["Classic Sugar", "Nutella", "Lotus Biscoff", "Pistachio"],
        options: ["Over 6 premium toppings available", "Fresh seasonal fruits included", "Served warm in luxury trays", "Interative dessert station"]
    },
    {
        id: '6',
        name: "Strawberry Cups",
        href: "/products/strawberry-cups",
        image: "/images/products/strawberry-cups.png",
        category: "Snacks",
        price: "£4.00",
        status: "Active",
        description: "A simple yet luxurious treat. Hand-picked, succulent strawberries drenched in rich, molten Belgian chocolate and served in our signature luxury cups.",
        flavours: ["Milk Chocolate", "White Chocolate", "Dark Chocolate", "Half & Half"],
        options: ["Available with 3 chocolate types", "Optional nutty toppings", "Perfect for garden parties", "Daily fresh sourcing guaranteed"]
    },
];

const INITIAL_PACKAGES = [
    {
        id: '1',
        title: "Wedding Grandeur",
        subtitle: "The Royal Experience",
        description: "Elevate your special day with our most premium offering, designed for large gatherings and luxury celebrations.",
        price: "From £1,250",
        features: [
            "Unlimited Karak Chaii Service (4 Hours)",
            "Live Dutch Pancake Station with 6+ Toppings",
            "Signature Mocktail Bar (Choice of 3 Flavours)",
            "Waitress Service with Traditional Uniforms",
            "Custom Branded Cups & Napkins",
            "Grand Display Setup with Floral Decor"
        ],
        image: "/images/packages/wedding.png",
        cta: "Inquire for Wedding"
    },
    {
        id: '2',
        title: "Corporate Hub",
        subtitle: "Professional Networking",
        description: "Impress clients and reward your team with a sophisticated drink and dessert station tailored for business environments.",
        price: "From £850",
        features: [
            "Premium Coffee & Karak Chaii Station",
            "Pre-packaged Dutch Pancake Trays",
            "3 Hours Continuous Service",
            "Corporate Branded Logistics",
            "Fast-paced Service for High Footfall",
            "Nutritional Information Display"
        ],
        image: "/images/packages/corporate.png",
        cta: "Book Corporate"
    },
    {
        id: '3',
        title: "Private Soirée",
        subtitle: "Intimate & Elegant",
        description: "Perfect for birthdays, baby showers, or garden parties where quality and intimacy are the priorities.",
        price: "From £450",
        features: [
            "30 Litre Signature Karak Chaii",
            "Live Dutch Pancake Station (2 Hours)",
            "Choice of 2 Signature Mocktails",
            "Elegant Compact Setup",
            "Friendly Barista Service",
            "Biodegradable Luxury Packaging"
        ],
        image: "/images/packages/private.png",
        cta: "Plan Private Party"
    }
];

const INITIAL_HERO_SLIDES = [
    {
        id: '1',
        image: "/images/hero/karak-chaii.png",
        title: "Artisan Karak Chaii",
        subtitle: "The heart of every celebration",
    },
    {
        id: '2',
        image: "/images/hero/pancakes.png",
        title: "Live Dutch Pancakes",
        subtitle: "Sweet moments, cooked live",
    },
    {
        id: '3',
        image: "/images/hero/mocktail.png",
        title: "Premium Mocktails",
        subtitle: "Crafted with passion and precision",
    },
];

const INITIAL_BRANDS = [
    { id: '1', name: "Netflix" },
    { id: '2', name: "Rolex" },
    { id: '3', name: "Land Rover" },
    { id: '4', name: "Hilton" },
    { id: '5', name: "Vogue" },
];

const INITIAL_STORY = {
    visionTitle: "From a shared passion to a premium experience",
    visionSubtitle: "The Beginning",
    visionText1: "ChaiBros was born from a simple observation: the world of catering was missing a touch of theatre and a commitment to true quality. We saw an opportunity to bring the rich, aromatic traditions of authentic Karak Chaii and the playful sweetness of Dutch Pancakes to the UK's most prestigious events.",
    visionText2: "What started as a small project between friends has grown into a sophisticated premium catering service that prioritises excellence above all else. Our name represents more than just a partnership; it represents the warmth and hospitality we bring to every event.",
    values: [
        { title: "Authenticity", text: "We honour traditional recipes, using authentic spices and time-tested methods to ensure every sip and bite is genuine." },
        { title: "Innovation", text: "While we respect tradition, we are constantly exploring new flavours and interactive ways to serve our guests." },
        { title: "Bespoke", text: "Every event is a unique canvas. We tailor our service to reflect your vision and your brand's identity." }
    ],
    qualityTitle: "Only the Finest Ingredients",
    qualitySubtitle: "Quality First",
    qualityText1: "We believe that true luxury is found in the details. That's why we source our tea leaves from specific estates, use only pure organic honey for sweetness, and craft our mocktail syrups in-house using fresh botanical extracts.",
    qualityText2: "Our commitment to quality extends beyond the plate and the cup to our equipment, our service standards, and our environmental impact."
};

const INITIAL_NUTRITION = {
    introTitle: "Quality you can trust",
    introSubtitle: "Mindful Indulgence",
    introText: "At ChaiBros, we believe that taste shouldn't come at the expense of well-being. We meticulously select every ingredient, prioritizing natural sweetness, organic products, and authentic spices that offer more than just flavor.",
    highlights: [
        { icon: "Leaf", title: "Organic Honey", description: "We replace refined sugars with premium organic honey, providing natural sweetness and antioxidants." },
        { icon: "ShieldCheck", title: "Authentic Spices", description: "Our Karak Chaii is infused with ginger, cardamom, and saffron, known for their digestive benefits." },
        { icon: "HeartPulse", title: "Pure Dairy", description: "We use high-quality, sustainably sourced milk and offer premium plant-based alternatives." },
        { icon: "Zap", title: "Fresh Botanicals", description: "Our mocktails are crafted with fresh herbs and fruit extracts, never artificial syrups." }
    ],
    allergenTitle: "Allergen Awareness",
    allergenSubtitle: "Safety First",
    allergenText: "Safety is our priority. We maintain strict hygiene standards and are fully transparent about the allergens present in our products.",
    allergenPoints: ["Gluten-Free Options Available", "Vegan Alternatives Provided", "Nut-Free Facility Processes"],
    stats: [
        { label: "Organic Ingredients", percent: "95%" },
        { label: "Zero Artificial Flavours", percent: "100%" },
        { label: "Natural Sweeteners", percent: "100%" },
        { label: "Premium Botanical Extracts", percent: "100%" }
    ]
};

const INITIAL_SETTINGS = {
    email: "info@chaiibros.com",
    phone: "+44 790 000 0000",
    location: "London, United Kingdom",
    instagram: "@chaibros",
    facebook: "Chaii Bros Official",
    website: "https://chaibros.com",
    mission: "At Chaii Bros, we redefine catering with theater and excellence, creating immersive experiences that leave a lasting impression on your guests."
};

async function seedFirestore() {
    try {
        console.log("🌱 Starting Firestore seeding...");

        // Seed Menu
        await setDoc(doc(db, "content", "menu"), { items: INITIAL_MENU_ITEMS });
        console.log("✅ Menu seeded");

        // Seed Packages
        await setDoc(doc(db, "content", "packages"), { items: INITIAL_PACKAGES });
        console.log("✅ Packages seeded");

        // Seed Hero Slides
        await setDoc(doc(db, "content", "hero"), { items: INITIAL_HERO_SLIDES });
        console.log("✅ Hero slides seeded");

        // Seed Brands
        await setDoc(doc(db, "content", "brands"), { items: INITIAL_BRANDS });
        console.log("✅ Brands seeded");

        // Seed Story
        await setDoc(doc(db, "content", "story"), INITIAL_STORY);
        console.log("✅ Story seeded");

        // Seed Nutrition
        await setDoc(doc(db, "content", "nutrition"), INITIAL_NUTRITION);
        console.log("✅ Nutrition seeded");

        // Seed Settings
        await setDoc(doc(db, "settings", "global"), INITIAL_SETTINGS);
        console.log("✅ Settings seeded");

        console.log("\n🎉 Firestore seeding completed successfully!");
        console.log("🌐 Your website should now display all content!");

    } catch (error) {
        console.error("❌ Error seeding Firestore:", error);
    }
}

seedFirestore();
