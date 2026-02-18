"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { productApi } from "@/lib/product-api";

interface ProductImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  productName?: string;
}

export function ProductImageLightbox({
  isOpen,
  onClose,
  imageSrc,
  productName,
}: ProductImageLightboxProps) {
  if (!imageSrc) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-transparent pointer-events-none flex flex-col items-center justify-center"
          >
            <div className="pointer-events-auto relative w-full aspect-square max-h-[80vh] max-w-[80vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center p-4 sm:p-8 border border-white/20">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-foreground transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Container - Square constrained */}
              <div className="relative w-full h-full flex items-center justify-center">
                <SafeImage
                  src={productApi.getProductImage(imageSrc)}
                  alt={productName || "Product Image"}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Optional Caption/Name */}
            {productName && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-white font-medium text-lg text-center pointer-events-auto"
              >
                {productName}
              </motion.p>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
