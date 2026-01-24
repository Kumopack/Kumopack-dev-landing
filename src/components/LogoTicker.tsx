"use client";

import { motion } from 'framer-motion';

// Abstract logo icons as SVG components
const LogoIcons = [
    // Factory77 style - geometric building
    () => (
        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12">
            <path d="M8 40V20L18 12V20L28 12V20L38 12V40H8Z" fill="hsl(200, 70%, 50%)" />
            <rect x="12" y="28" width="6" height="8" fill="hsl(200, 70%, 40%)" />
            <rect x="22" y="28" width="6" height="8" fill="hsl(200, 70%, 40%)" />
        </svg>
    ),
    // Lazada style - heart
    () => (
        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12">
            <path d="M24 42L6 24C2 20 2 14 6 10C10 6 16 6 20 10L24 14L28 10C32 6 38 6 42 10C46 14 46 20 42 24L24 42Z" fill="url(#lazada)" />
            <defs>
                <linearGradient id="lazada" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B6B" />
                    <stop offset="100%" stopColor="#FF8E53" />
                </linearGradient>
            </defs>
        </svg>
    ),
    // Shopee style - shopping bag
    () => (
        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12">
            <rect x="8" y="16" width="32" height="28" rx="4" fill="#EE4D2D" />
            <path d="M16 16V12C16 7.58 19.58 4 24 4C28.42 4 32 7.58 32 12V16" stroke="#EE4D2D" strokeWidth="4" fill="none" />
            <text x="24" y="36" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">S</text>
        </svg>
    ),
    // Nok Air style - bird circle
    () => (
        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12">
            <circle cx="24" cy="24" r="20" fill="none" stroke="#1a1a1a" strokeWidth="2" />
            <path d="M14 24C14 24 20 18 28 20C36 22 34 30 34 30" stroke="#1a1a1a" strokeWidth="2" fill="none" />
            <circle cx="30" cy="22" r="2" fill="#1a1a1a" />
        </svg>
    ),
    // eBay style - colorful letters
    () => (
        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12">
            <circle cx="12" cy="24" r="8" fill="#E53238" />
            <circle cx="24" cy="24" r="8" fill="#0064D2" />
            <circle cx="36" cy="24" r="8" fill="#F5AF02" />
            <circle cx="30" cy="32" r="6" fill="#86B817" />
        </svg>
    ),
    // depa style - bird
    () => (
        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12">
            <path d="M8 32L24 16L40 32" stroke="#0EA5E9" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="40" cy="18" r="4" fill="#FACC15" />
        </svg>
    ),
    // Ninja Van style - ninja mask
    () => (
        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12">
            <ellipse cx="24" cy="24" rx="18" ry="10" fill="#C41E3A" />
            <ellipse cx="16" cy="24" rx="4" ry="3" fill="white" />
            <ellipse cx="32" cy="24" rx="4" ry="3" fill="white" />
            <circle cx="16" cy="24" r="2" fill="#1a1a1a" />
            <circle cx="32" cy="24" r="2" fill="#1a1a1a" />
        </svg>
    ),
    // Flash style - lightning
    () => (
        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12">
            <rect x="8" y="8" width="32" height="32" rx="4" fill="#FFD700" />
            <path d="M28 8L18 26H24L20 40L32 20H26L28 8Z" fill="#0066CC" />
        </svg>
    ),
    // Peak style - square badge
    () => (
        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12">
            <rect x="8" y="12" width="32" height="24" rx="2" fill="#2563EB" />
            <text x="24" y="29" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PEAK</text>
        </svg>
    ),
    // AirAsia style - red circle
    () => (
        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12">
            <circle cx="24" cy="24" r="18" fill="#DC2626" />
            <path d="M16 28L24 16L32 28" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    // Abstract hexagon
    () => (
        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12">
            <polygon points="24,4 44,14 44,34 24,44 4,34 4,14" fill="url(#hex)" />
            <defs>
                <linearGradient id="hex" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
            </defs>
        </svg>
    ),
    // Abstract diamond
    () => (
        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12">
            <path d="M24 4L44 24L24 44L4 24Z" fill="#10B981" />
            <path d="M24 12L36 24L24 36L12 24Z" fill="#34D399" />
        </svg>
    ),
];

const LogoTicker = () => {
    // Duplicate logos for seamless infinite scroll
    const duplicatedLogos = [...LogoIcons, ...LogoIcons];

    return (
        <section className="py-12 md:py-16 overflow-hidden bg-muted/30">
            <div className="max-w-6xl mx-auto px-4 md:px-8 mb-8">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center text-muted-foreground text-sm md:text-base font-medium"
                >
                    เข้าร่วมกับบริษัทมากกว่า 500 แห่งที่กำลังเติบโต
                </motion.p>
            </div>

            <div className="relative">
                {/* Gradient fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                {/* Scrolling container */}
                <div className="flex animate-ticker items-center w-max">
                    {duplicatedLogos.map((LogoIcon, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 px-6 md:px-10"
                        >
                            <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-card/60 backdrop-blur-sm border border-border/30 rounded-xl hover:border-primary/30 hover:scale-105 transition-all duration-300">
                                <LogoIcon />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LogoTicker;
