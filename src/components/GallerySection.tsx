"use client";
import { SafeImage } from "@/components/ui/safe-image";

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

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 bg-accent/30 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full bg-lavender text-purple-soft text-sm font-medium mb-4">
            Product Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Packaging Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of custom box types tailored for your
            business needs
          </p>
        </div>

        {/* Clean, Premium Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col bg-white rounded-[2.5rem] p-4 shadow-soft hover:shadow-float transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-accent"
            >
              {/* Image Container */}
              <div className="aspect-square relative overflow-hidden rounded-[2rem] bg-accent/30 mb-6 w-full">
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Product Info Below Image */}
              <div className="px-2 pb-2">
                <span className="inline-block text-[10px] font-bold text-primary/60 uppercase tracking-[0.2em] mb-2">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
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
            <div
              key={index}
              className="text-center p-6 rounded-3xl bg-card shadow-soft"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
