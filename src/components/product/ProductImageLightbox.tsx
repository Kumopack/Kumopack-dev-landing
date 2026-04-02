"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { productApi } from "@/lib/product-api";
import { useEffect, useCallback, useState, useRef } from "react";

interface ProductImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  productName?: string;
}

export function ProductImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  productName,
}: ProductImageLightboxProps) {
  const touchStartX = useRef<number | null>(null);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < images.length - 1;

  const goToPrev = useCallback(() => {
    if (canGoPrev) {
      onIndexChange(currentIndex - 1);
    }
  }, [canGoPrev, currentIndex, onIndexChange]);

  const goToNext = useCallback(() => {
    if (canGoNext) {
      onIndexChange(currentIndex + 1);
    }
  }, [canGoNext, currentIndex, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goToPrev, goToNext, onClose]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!images.length) return null;

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToPrev();
      else goToNext();
    }
    touchStartX.current = null;
  };

  const preventSave = (e: React.MouseEvent | React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
          onContextMenu={preventSave}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10001] p-2.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors backdrop-blur-sm"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous arrow */}
          {canGoPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-2 sm:left-6 z-[10001] p-2.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all backdrop-blur-sm hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {/* Next arrow */}
          {canGoNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 sm:right-6 z-[10001] p-2.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all backdrop-blur-sm hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}

          {/* Image container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-transparent pointer-events-none flex flex-col items-center justify-center"
          >
            <div
              className="pointer-events-auto relative w-full aspect-square max-h-[80vh] max-w-[80vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center p-4 sm:p-8 border border-white/20"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Image Slider: Only mount current ± 1 to prevent aggressive lazy loading of all images */}
              <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
                {images.map((img, idx) => {
                  const distance = Math.abs(idx - currentIndex);
                  
                  // Strictly unmount faraway images. This prevents Next.js / Browser from 
                  // eagerly caching them all at once when the lightbox opens, saving bandwidth.
                  if (distance > 1) return null;

                  let offsetX = "100%"; // default right
                  let opacity = 0;
                  
                  if (idx === currentIndex) {
                    offsetX = "0%";
                    opacity = 1;
                  } else if (idx < currentIndex) {
                    offsetX = "-100%";
                  }

                  // Force the browser to eagerly load the current, next, and previous image.
                  // Since the DOM nodes are never destroyed, they will NOT refetch from network.
                  const isNear = Math.abs(idx - currentIndex) <= 1;

                  return (
                    <motion.div
                      key={idx}
                      initial={false}
                      animate={{ x: offsetX, opacity: opacity }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        WebkitTouchCallout: "none",
                      }}
                      onContextMenu={preventSave}
                    >
                      <SafeImage
                        src={productApi.getProductImage(img)}
                        alt={`${productName || "Product Image"} ${idx}`}
                        fill
                        className="object-contain pointer-events-auto"
                        priority={isNear}
                        draggable={false}
                      />
                      {/* Transparent overlay to block right-click/long-press on the image */}
                      <div
                        className="absolute inset-0 z-10 pointer-events-auto"
                        onContextMenu={preventSave}
                        onDragStart={preventSave}
                        style={{ background: "transparent" }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Image counter + product name */}
            <div className="mt-4 flex flex-col items-center gap-1 pointer-events-auto">
              {images.length > 1 && (
                <div className="flex items-center gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onIndexChange(idx);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentIndex
                          ? "bg-white w-6"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
              {productName && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-white font-medium text-lg text-center"
                >
                  {productName}
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
