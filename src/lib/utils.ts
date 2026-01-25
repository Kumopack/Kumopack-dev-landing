import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getAssetPath(path: string) {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    const basePath = '/Kumopack-dev-landing';
    // Prepend basePath if it's an internal path and doesn't already have it
    if (typeof path === 'string' && path.startsWith('/') && !path.startsWith(basePath)) {
        return `${basePath}${path}`;
    }
    return path;
}

export function getStoragePath(path: string) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const storageBase = 'https://api.kumopack.com/v1/images/';
    return `${storageBase}${path}`;
}


