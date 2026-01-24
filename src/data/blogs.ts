export interface Blog {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;
    slug: string;
}

export const blogs: Blog[] = [
    {
        id: "1",
        title: "The Ultimate Guide to Custom Packaging",
        description: "Learn how to choose the right materials and finishes for your brand's unique packaging needs.",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=2070",
        date: "Jan 15, 2024",
        slug: "guide-to-custom-packaging"
    },
    {
        id: "2",
        title: "Eco-Friendly Materials in 2024",
        description: "Explore the latest sustainable packaging options that are both beautiful and kind to the planet.",
        image: "https://images.unsplash.com/photo-1591336395902-d2fb7706ee2d?auto=format&fit=crop&q=80&w=2070",
        date: "Jan 12, 2024",
        slug: "eco-friendly-materials-2024"
    },
    {
        id: "3",
        title: "The Power of Unboxing Experiences",
        description: "Why the first physical touchpoint matters more than ever for direct-to-consumer brands.",
        image: "https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&q=80&w=2070",
        date: "Jan 10, 2024",
        slug: "unboxing-experiences"
    }
];
