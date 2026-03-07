"use client";

import { useState, useEffect, useCallback } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galleryItems = [
  {
    image: "/img/box/corrugated-mailer-box.jpg",
    title: "Corrugated Mailer Box",
    category: "Standard",
  },
  {
    image: "/img/box/corrugated-pizza-box.jpg",
    title: "Corrugated Pizza Box",
    category: "Food",
  },
  {
    image: "/img/box/die-cut-fruit-box.jpg",
    title: "Die-cut Fruit Box",
    category: "Agriculture",
  },
  {
    image: "/img/box/document-box.jpg",
    title: "Document Box",
    category: "Office",
  },
  {
    image: "/img/box/drawer-box.jpg",
    title: "Drawer Box",
    category: "Premium",
  },
  {
    image: "/img/box/folding-carton-box.jpg",
    title: "Folding Carton Box",
    category: "Retail",
  },
  {
    image: "/img/box/full-telescope-ftd.jpg",
    title: "Full Telescope (FTD)",
    category: "Industrial",
  },
  { image: "/img/box/handle-box.jpg", title: "Handle Box", category: "Retail" },
  {
    image: "/img/box/regular-slotted-container-rsc.jpg",
    title: "Regular Slotted Container (RSC)",
    category: "Shipping",
  },
  {
    image: "/img/box/reverse-tuck-end-rte.jpg",
    title: "Reverse Tuck End (RTE)",
    category: "Cosmetics",
  },
  {
    image: "/img/box/roll-end-tray.jpg",
    title: "Roll End Tray",
    category: "Display",
  },
  { image: "/img/box/shoe-box.jpg", title: "Shoe Box", category: "Apparel" },
];

const VISIBLE_COUNT = 5; // How many cards visible at once (odd number for symmetry)

const GallerySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = galleryItems.length;

  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % total),
    [total],
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + total) % total),
    [total],
  );

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next]);

  /**
   * Calculate the position offset from center for each item.
   * Returns a number like -2, -1, 0, 1, 2 where 0 = center.
   * Items outside the visible range return null.
   */
  const getOffset = (index: number): number | null => {
    let diff = index - activeIndex;
    // Wrap around
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    const half = Math.floor(VISIBLE_COUNT / 2);
    if (Math.abs(diff) > half) return null;
    return diff;
  };

  const getCardStyle = (offset: number | null): React.CSSProperties => {
    if (offset === null) {
      return {
        opacity: 0,
        transform: "translateX(0) scale(0.5)",
        zIndex: 0,
        pointerEvents: "none",
      };
    }

    const absOffset = Math.abs(offset);
    const scale = 1 - absOffset * 0.15; // center=1, ±1=0.85, ±2=0.70
    const translateX = offset * 240; // px shift per position
    const zIndex = VISIBLE_COUNT - absOffset;
    const opacity = 1 - absOffset * 0.25; // center=1, ±1=0.75, ±2=0.50
    const rotateY = offset * -8; // slight 3D tilt

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      pointerEvents: offset === 0 ? "auto" : "none",
    };
  };

  return (
    <section
      id="gallery"
      className="py-20 bg-accent/30 scroll-mt-24 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-2 animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full bg-lavender text-purple-soft text-sm font-semibold mb-3">
            Product Gallery
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Our Packaging Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of custom box types
          </p>
        </div>
      </div>

      <div className="relative w-full" style={{ perspective: "1200px" }}>
        <div className="relative h-[400px] sm:h-[460px] w-full flex items-center justify-center">
          {galleryItems.map((item, index) => {
            const offset = getOffset(index);
            const style = getCardStyle(offset);
            const isCenter = offset === 0;

            return (
              <div
                key={index}
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  ...style,
                  width: isCenter ? "380px" : "300px",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className={`
                    bg-white dark:bg-card rounded-3xl overflow-hidden shadow-soft
                    transition-all duration-700
                    ${
                      isCenter
                        ? "shadow-glow ring-2 ring-primary/20 scale-100"
                        : "shadow-soft scale-100"
                    }
                  `}
                >
                  <div className="relative overflow-hidden aspect-square w-full">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="280px"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-foreground uppercase tracking-wider shadow-sm border border-white/30">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-base font-bold text-white leading-snug drop-shadow-md">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4 sm:px-8 md:px-16 lg:px-32">
          <button
            onClick={prev}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 dark:bg-card backdrop-blur-md border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 dark:bg-card backdrop-blur-md border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-6">
          {galleryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "w-8 h-2.5 bg-primary shadow-sm"
                  : "w-2.5 h-2.5 bg-foreground/15 hover:bg-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "500+", label: "Happy Brands" },
            { value: "10M+", label: "Boxes Delivered" },
            { value: "50+", label: "Factory Partners" },
            { value: "99%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-2xl bg-card shadow-soft"
            >
              <p className="text-2xl md:text-3xl font-bold text-primary mb-0.5">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
