"use client";

import SubPageHeader from "@/components/layout/SubPageHeader";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { subMenu, Product } from "@/lib/data-store";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    const unsubscribe = subMenu(setProducts);
    return () => unsubscribe();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean)),
    );
    return ["All", ...unique];
  }, [products]);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-brand-light">
      <SubPageHeader
        title="Shop All Products"
        subtitle="Authentic Korean Beauty"
        backgroundImage="/images/hero/hero-serum.svg"
      />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as string)}
                className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-brand-dark text-white border-brand-dark"
                    : "bg-white text-brand-dark/60 border-brand-dark/10 hover:border-brand-purple/40 hover:text-brand-purple"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 8) * 0.06 }}
              >
                <Link
                  href={product.href}
                  className="group block bg-white border border-brand-dark/5 hover:border-brand-purple/30 hover:shadow-xl transition-all duration-500 overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden bg-brand-cream">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.brand && (
                      <span className="absolute top-4 left-4 bg-white text-brand-purple text-[9px] font-bold uppercase tracking-widest px-3 py-1.5">
                        {product.brand}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-purple">
                      {product.category}
                    </span>
                    <h3 className="text-brand-dark text-sm font-bold uppercase tracking-wide mt-2 mb-3 leading-snug min-h-[2.5em]">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between pt-3 border-t border-brand-dark/5">
                      <span className="text-brand-dark font-bold text-sm">
                        {product.price}
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-brand-dark/40 group-hover:text-brand-purple transition-colors">
                        View
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-brand-dark/40 uppercase tracking-widest text-sm">
                No products found in this category yet.
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-32 bg-brand-dark p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-brand-light text-3xl md:text-5xl font-bold uppercase tracking-tightest mb-8">
                Not Sure Where to{" "}
                <span className="text-brand-purple">Start</span>?
              </h2>
              <p className="text-brand-cream/70 text-lg mb-12">
                Try one of our curated bundles — hand-picked routines that take
                the guesswork out of building your K-beauty regimen.
              </p>
              <a
                href="/bundles"
                className="inline-block px-12 py-5 border border-brand-purple text-brand-purple font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-brand-dark transition-all duration-300"
              >
                Explore Bundles
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
