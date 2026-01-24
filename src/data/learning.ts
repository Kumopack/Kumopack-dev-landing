export interface LearningArticle {
    id: string;
    title: string;
    description: string;
    category: string;
    audience: 'buyer' | 'supplier';
    image: string;
    videoUrl?: string;
    date: string;
    content: string;
}

export const learningArticles: LearningArticle[] = [
    {
        id: "1",
        title: "Introduction to Custom Mailer Boxes",
        description: "Learn the basics of designing and ordering custom mailer boxes for your brand.",
        category: "Basics",
        audience: "buyer",
        image: "https://images.unsplash.com/photo-1549463327-f0c39f1c4801?auto=format&fit=crop&q=80&w=2070",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        date: "Jan 15, 2024",
        content: "Detailed guide about mailer boxes..."
    },
    {
        id: "2",
        title: "Sustainability Trends in 2024",
        description: "Explore the latest eco-friendly materials and how to communicate sustainability to customers.",
        category: "Sustainability",
        audience: "buyer",
        image: "https://images.unsplash.com/photo-1595113316349-9fa4ee24ef84?auto=format&fit=crop&q=80&w=2070",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        date: "Jan 20, 2024",
        content: "Detailed guide about sustainability..."
    },
    {
        id: "3",
        title: "Optimizing Your Factory Profile",
        description: "How to showcase your capabilities and attract more brand inquiries.",
        category: "Growth",
        audience: "supplier",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
        date: "Jan 12, 2024",
        content: "Detailed guide for suppliers..."
    },
    {
        id: "4",
        title: "Managing Large Scale Custom Orders",
        description: "Best practices for production planning and quality control for big brands.",
        category: "Production",
        audience: "supplier",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=2070",
        date: "Jan 18, 2024",
        content: "Detailed guide about order management..."
    }
];
