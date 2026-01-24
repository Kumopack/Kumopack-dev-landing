import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getAssetPath(path: string) {
    const basePath = '/Kumopack-dev-landing';
    if (typeof path === 'string' && path.startsWith('/') && !path.startsWith(basePath)) {
        return `${basePath}${path}`;
    }
    return path;
}
