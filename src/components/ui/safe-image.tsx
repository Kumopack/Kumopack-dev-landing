"use client";

import React, { useState } from "react";
import { ImageOff } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
    className?: string;
}

export const SafeImage = ({ src, alt, fallbackSrc, className, ...props }: SafeImageProps) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const finalSrc = getAssetPath(src as string);

    const defaultFallback = "https://images.unsplash.com/photo-1586769852044-692d6e3703a0?auto=format&fit=crop&q=80&w=1000";

    if (error || !src) {
        return (
            <div className={`flex flex-col items-center justify-center bg-muted/30 border border-border/50 rounded-2xl ${className}`}>
                <ImageOff className="w-8 h-8 text-muted-foreground/50 mb-2" />
                <span className="text-[10px] text-muted-foreground/30 uppercase tracking-widest font-bold">Image Unavailable</span>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {loading && (
                <div className="absolute inset-0 bg-muted/20 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                </div>
            )}
            <img
                src={finalSrc as string}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-1'}`}
                onLoad={() => setLoading(false)}
                onError={() => {
                    setError(true);
                    setLoading(false);
                }}
                {...props}
            />
        </div>
    );
};
