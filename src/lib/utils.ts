import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getAssetPath(path: string) {
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

export function getStoragePath(path: string) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const storageBase = 'https://api.kumopack.com/v1/images/';
    return `${storageBase}${path}`;
}


