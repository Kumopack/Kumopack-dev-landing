"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { getAssetPath } from "@/lib/utils";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
    fallbackSrc?: string;
}

const SafeImage = ({
    src,
    alt,
    fallbackSrc = "/images/placeholder.webp",
    ...props
}: SafeImageProps) => {
    const [imgSrc, setImgSrc] = useState(getAssetPath(src as string));
    const [error, setError] = useState(false);

    // Sync with src prop changes
    useEffect(() => {
        setImgSrc(getAssetPath(src as string));
        setError(false);
    }, [src]);

    return (
        <Image
            {...props}
            src={error ? getAssetPath(fallbackSrc) : imgSrc}
            alt={alt}
            onError={() => {
                if (!error) {
                    setImgSrc(getAssetPath(fallbackSrc));
                    setError(true);
                }
            }}
        />
    );
};

export default SafeImage;
