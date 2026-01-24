"use client";

// Image import removed
// Image import removed
// Image import removed

const galleryItems = [
  {
    image: "/asset/gallery-3.jpg",
    title: "Custom Corrugated Boxes",
    category: "Shipping",
    size: "large",
  },
  {
    image: "/asset/gallery-3.jpg",
    title: "Branded Logo Tape",
    category: "Accessories",
    size: "medium",
  },
  {
    image: "/asset/gallery-3.jpg",
    title: "Premium Film Pouches",
    category: "Flexible Packaging",
    size: "medium",
  },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 bg-accent/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full bg-lavender text-purple-soft text-sm font-medium mb-4">
            Client Success
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Beautiful packaging, delivered
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how brands are elevating their unboxing experience with Kumopack
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="break-inside-avoid group relative overflow-hidden rounded-3xl bg-card shadow-soft hover:shadow-float transition-all duration-500"
            >
              <div className="aspect-auto">
                <img
                  src="/asset/gallery-3.jpg"
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-xs font-medium text-primary-foreground/70 mb-1">{item.category}</span>
                <h3 className="text-xl font-semibold text-primary-foreground">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "Happy Brands" },
            { value: "10M+", label: "Boxes Delivered" },
            { value: "50+", label: "Factory Partners" },
            { value: "99%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-3xl bg-card shadow-soft">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
