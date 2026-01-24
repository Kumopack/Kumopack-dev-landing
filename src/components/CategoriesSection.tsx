"use client";

import { useState } from "react";
import { Package, Box, Film, Tag, Layers, Archive } from "lucide-react";

const categories = [
  {
    icon: Box,
    name: "Corrugated Boxes",
    description: "Durable shipping & retail boxes",
    specs: ["Flexo Print", "Digital UV", "Custom Die-Cut"],
    color: "from-amber-100 to-orange-100",
  },
  {
    icon: Film,
    name: "Film Pouches",
    description: "Flexible packaging for food & products",
    specs: ["Matte/Gloss Finish", "Resealable Zippers", "Stand-up Design"],
    color: "from-emerald-100 to-teal-100",
  },
  {
    icon: Tag,
    name: "Custom Labels",
    description: "Branded stickers & product labels",
    specs: ["Vinyl & Paper", "Waterproof Options", "Die-Cut Shapes"],
    color: "from-lavender to-purple-100",
  },
  {
    icon: Layers,
    name: "Branded Tape",
    description: "Custom printed packing tape",
    specs: ["1-3 Color Print", "Strong Adhesive", "Custom Widths"],
    color: "from-blue-100 to-indigo-100",
  },
  {
    icon: Package,
    name: "Mailer Bags",
    description: "Poly mailers for e-commerce",
    specs: ["Self-Seal", "Tamper Evident", "Eco-Friendly Options"],
    color: "from-rose-100 to-pink-100",
  },
  {
    icon: Archive,
    name: "Gift Boxes",
    description: "Premium presentation packaging",
    specs: ["Rigid & Folding", "Magnetic Closure", "Embossing Available"],
    color: "from-violet-100 to-purple-100",
  },
];

const CategoriesSection = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full bg-lavender text-purple-soft text-sm font-medium mb-4">
            Product Categories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Packaging for every need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of custom packaging solutions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative cursor-pointer group"
              onMouseEnter={() => setActiveCategory(index)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div
                className={`
                  p-6 rounded-3xl border border-border/50 bg-card text-center
                  transition-all duration-500 hover:shadow-float hover:-translate-y-2
                  ${activeCategory === index ? 'shadow-float -translate-y-2' : ''}
                `}
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                  <category.icon className="w-8 h-8 text-foreground/70" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 text-sm">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </div>

              {/* Expanded specs panel */}
              <div
                className={`
                  absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 z-20
                  floating-card p-4 transition-all duration-300
                  ${activeCategory === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
                `}
              >
                <p className="text-sm font-medium text-foreground mb-3">Printing & Specs</p>
                <div className="space-y-2">
                  {category.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {spec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
