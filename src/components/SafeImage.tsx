"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
    fallbackSrc?: string;
}

const SafeImage = ({
    src,
    alt,
    fallbackSrc = "/images/placeholder.webp",
    ...props
}: SafeImageProps) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [error, setError] = useState(false);

    // Sync with src prop changes
    useEffect(() => {
        setImgSrc(src);
        setError(false);
    }, [src]);

    return (
        <Image
            {...props}
            src={error ? fallbackSrc : imgSrc}
            alt={alt}
            onError={() => {
                if (!error) {
                    setImgSrc(fallbackSrc);
                    setError(true);
                }
            }}
        />
    );
};

export default SafeImage;
