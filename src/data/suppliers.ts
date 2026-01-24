export interface SupplierFeature {
    title: string;
    description: string;
    icon: string;
}

export interface ProductCategory {
    name: string;
    items: string[];
}

export interface Supplier {
    id: string;
    name: string;
    rating: number;
    reviewCount: number;
    location: string;
    address: string;
    specialized: string;
    image: string;
    logo: string;
    tagline: string;
    description: string;
    website: string;
    email: string;
    features: SupplierFeature[];
    categories: ProductCategory[];
    gallery: string[];
    stats: {
        experience: string;
        capacity: string;
        certifications: string;
        leadTime: string;
    };
}

export const suppliers: Supplier[] = [
    {
        id: "1",
        name: "Premium Print Co.",
        rating: 4.9,
        reviewCount: 120,
        location: "Bangkok",
        address: "123 Rama IX Rd, Huai Khwang, Bangkok 10310",
        specialized: "Luxury Mailers",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
        logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80&w=200",
        tagline: "Leading the way in sustainable luxury packaging.",
        description: "With over 20 years of experience in high-end offset printing, Premium Print Co. specializes in luxury mailer boxes and specialty finishes for global brands. Our facility is equipped with state-of-the-art 8-color HEIDELBERG machines.",
        website: "https://premiumprint.com",
        email: "contact@premiumprint.com",
        features: [
            { title: "High-End Offset", description: "8-color printing with specialized UV coating.", icon: "https://cdn-icons-png.flaticon.com/512/2972/2972179.png" },
            { title: "Eco-Friendly Materials", description: "FSC certified paper and soy-based inks.", icon: "https://cdn-icons-png.flaticon.com/512/1598/1598196.png" },
            { title: "Rapid Prototyping", description: "3D structural design and physical samples in 48 hours.", icon: "https://cdn-icons-png.flaticon.com/512/1055/1055666.png" }
        ],
        categories: [
            { name: "Luxury Rigid Boxes", items: ["Magnetic Gift Boxes", "Drawer Boxes", "Shoulder & Neck Boxes"] },
            { name: "Corrugated Solutions", items: ["E-commerce Mailers", "Subscription Boxes", "Heavy Duty Shippers"] },
            { name: "Specialty Finishes", items: ["Foil Stamping", "Spot UV", "Soft Touch Lamination", "Embossing"] }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1591336395902-d2fb7706ee2d?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1549463327-f0c39f1c4801?auto=format&fit=crop&q=80&w=800"
        ],
        stats: {
            experience: "20y",
            capacity: "50k/day",
            certifications: "ISO, FSC",
            leadTime: "7 days"
        }
    },
    {
        id: "2",
        name: "EcoBox Industries",
        rating: 4.8,
        reviewCount: 85,
        location: "Samut Prakan",
        address: "456 Industrial Ring Rd, Bang Phli, Samut Prakan 10540",
        specialized: "Recycled Board",
        image: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?auto=format&fit=crop&q=80&w=2071",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200",
        tagline: "Eco-conscious packaging solutions for a better tomorrow.",
        description: "EcoBox Industries is a pioneer in 100% recycled corrugated solutions. We help brands reduce their carbon footprint without compromising on structural integrity or design.",
        website: "https://ecobox.co.th",
        email: "hello@ecobox.co.th",
        features: [
            { title: "100% Recycled", description: "Made from post-consumer waste materials.", icon: "https://cdn-icons-png.flaticon.com/512/1598/1598196.png" },
            { title: "Carbon Neutral", description: "Production facility powered by renewable energy.", icon: "https://cdn-icons-png.flaticon.com/512/2910/2910317.png" }
        ],
        categories: [
            { name: "Kraft Packaging", items: ["Brown Kraft Boxes", "White Kraft Boxes", "Divider Inserts"] },
            { name: "Eco Mailers", items: ["Compostable Bags", "Recycled Paper Mailers"] }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1603598513554-469b8216e3c0?auto=format&fit=crop&q=80&w=800"
        ],
        stats: {
            experience: "12y",
            capacity: "100k/day",
            certifications: "ISO 14001",
            leadTime: "5 days"
        }
    }
];
