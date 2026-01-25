import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getAssetPath(path: string) {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    // Remove the prefixing logic for now to ensure local dev stability.
    // If deployment requires a base path, it should ideally be handled via 
    // Next.js basePath config in next.config.js rather than manual prefixing.
    return path;
}

export function getStoragePath(path: string) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const storageBase = 'https://api.kumopack.com/v1/images/';
    return `${storageBase}${path}`;
}


