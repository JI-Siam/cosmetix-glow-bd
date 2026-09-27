import HeroCarousel from "@/components/home/HeroCarousel";
import CorporateTicker from "@/components/home/CorporateTicker";
import GridMenu from "@/components/home/GridMenu";
import BrandNarrative from "@/components/home/BrandNarrative";
import Features from "@/components/home/Features";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroCarousel />
      <GridMenu />
      <CorporateTicker />
      <BrandNarrative />
      <Features />

      {/* Call to Action Section */}
      <section className="py-32 bg-brand-dark px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-7xl font-bold text-brand-light uppercase tracking-tightest mb-8">
            Ready to Find Your <span className="text-brand-purple">Glow</span>?
          </h2>
          <p className="text-brand-cream/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Shop 100% authentic Korean cosmetics today and discover the skincare and makeup that Korea's beauty industry swears by.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a
              href="/shop"
              className="px-12 py-5 bg-brand-purple text-white rounded-[20px] font-bold uppercase tracking-widest hover:bg-brand-light hover:text-brand-dark transition-all duration-300"
            >
              Shop All Products
            </a>
            <a
              href="/bundles"
              className="px-12 py-5 border border-brand-purple text-brand-purple rounded-[20px] font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-brand-dark transition-all duration-300"
            >
              View Bundles
            </a>
          </div>
        </div>

        {/* Subtle background texture/overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/images/texture.png')] bg-repeat"></div>
      </section>
    </div>
  );
}
