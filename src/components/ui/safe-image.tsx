"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { ImageOff } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
    fallbackSrc?: string;
}

export const SafeImage = ({
    src,
    alt,
    fallbackSrc,
    className,
    width,
    height,
    fill,
    ...props
}: SafeImageProps) => {
    const [imgSrc, setImgSrc] = useState(getAssetPath(src as string));
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fallback dimensions if not provided and not using fill
    const finalWidth = !fill && !width ? 1200 : width;
    const finalHeight = !fill && !height ? 800 : height;

    useEffect(() => {
        setImgSrc(getAssetPath(src as string));
        setError(false);
        setLoading(true);
    }, [src]);

    if (error || !src) {
        return (
            <div className={`flex flex-col items-center justify-center bg-muted/30 border border-border/50 rounded-2xl w-full h-full ${className}`}>
                <ImageOff className="w-8 h-8 text-muted-foreground/50 mb-2" />
                <span className="text-[10px] text-muted-foreground/30 uppercase tracking-widest font-bold">Image Unavailable</span>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden w-full h-full ${fill ? '' : className}`}>
            {loading && (
                <div className="absolute inset-0 bg-muted/20 animate-pulse flex items-center justify-center z-10">
                    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                </div>
            )}
            <Image
                {...props}
                src={imgSrc}
                alt={alt}
                width={fill ? undefined : finalWidth}
                height={fill ? undefined : finalHeight}
                fill={fill}
                sizes={fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined}
                className={`transition-all duration-500 ${loading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'} ${className || ''}`}
                onLoad={() => setLoading(false)}
                onError={() => {
                    setError(true);
                    setLoading(false);
                }}
            />
        </div>
    );
};

