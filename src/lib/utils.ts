import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getAssetPath(path: string | null | undefined) {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    
    // Only prefix with basePath in production for GitHub Pages compatibility
    if (process.env.NODE_ENV === 'production') {
        const basePath = '/Kumopack-dev-landing';
        return `${basePath}${cleanPath}`;
    }
    
    return cleanPath;
}

export function getStoragePath(path: string | null | undefined) {
    if (!path) return '/placeholder-image.jpg'; // Or a transparent pixel
    if (path.startsWith('http')) return path;
    const storageBase = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.kumopack.com/v1/images';
    // Remove leading slash if present to avoid double slash if base has trailing slash
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const base = storageBase.endsWith('/') ? storageBase : `${storageBase}/`;
    // Encode the path to handle spaces and special characters
    // But be careful not to double-encode if already encoded. 
    // Usually DB paths are raw strings.
    const encodedPath = cleanPath.split('/').map(part => encodeURIComponent(part)).join('/');
    return `${base}${encodedPath}`;
}


