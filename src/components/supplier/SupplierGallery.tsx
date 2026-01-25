"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Boxes, X, Maximize2 } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";

interface SupplierGalleryProps {
    gallery: string[];
}

export const SupplierGallery = ({ gallery }: SupplierGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section className="space-y-6">
            <div className="flex items-end justify-between px-2">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-sky/50 text-sky-foreground">
                        <Boxes className="w-5 h-5" />
                    </span>
                    Inside the <span className="text-primary italic">Floor</span>
                </h2>
                <span className="text-[9px] font-black text-muted-foreground tracking-[0.2em] uppercase">{gallery.length} ASSETS VIEWABLE</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4">
                {gallery.map((img, idx) => (
                    <motion.div
                        key={idx}
                        layoutId={`gallery-${idx}`}
                        whileHover={{ scale: 1.02, rotate: idx % 2 === 0 ? 0.5 : -0.5 }}
                        onClick={() => setSelectedImage(img)}
                        className="aspect-square rounded-2xl overflow-hidden border border-border/50 shadow-soft cursor-pointer relative group bg-muted/20"
                    >
                        <SafeImage
                            src={img}
                            alt={`Production ${idx + 1}`}
                            fill={true}
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Maximize2 className="w-6 h-6 text-white drop-shadow-md" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-md"
                        />
                        <motion.div
                            layoutId={gallery.includes(selectedImage) ? `gallery-${gallery.indexOf(selectedImage)}` : undefined}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative z-10 max-w-5xl w-full aspect-video md:aspect-[16/10] rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 bg-black/40"
                        >
                            <SafeImage
                                src={selectedImage}
                                alt="Gallery Preview"
                                fill={true}
                                className="object-contain md:object-cover"
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(null);
                                }}
                                className="absolute top-6 right-6 p-3 rounded-full bg-black/20 text-white backdrop-blur-md hover:bg-black/40 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
