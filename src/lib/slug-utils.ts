/**
 * Utility to generate filesystem-safe slugs.
 * Primarily used to avoid "filename too long" errors during static export (output: 'export').
 * Most filesystems have a 255-byte limit. Thai characters use 3 bytes each in UTF-8.
 */

export function getSafeSlug(slug: string): string {
  if (!slug) return "";

  // 1. Decode EVERYTHING first to get the clean original characters (like Thai chars)
  let decoded = slug;
  try {
    let prev = "";
    while (decoded !== prev) {
      prev = decoded;
      decoded = decodeURIComponent(decoded);
    }
  } catch (e) {
    // Ignore decoding errors
  }
  
  // 2. Normalize to NFC for consistent filesystem/routing
  decoded = decoded.normalize("NFC");
  
  // 3. Handle truncation safely for Thai/Multi-byte characters
  // A conservative safe limit for filenames. Thai characters use multiple bytes.
  // Using 50 to match previous implementation's hash compatibility.
  if (decoded.length <= 50) return decoded;

  // Use Array.from or spread to be somewhat more aware of surrogate pairs
  let truncated = [...decoded].slice(0, 50).join("");
  
  const hash = simpleHash(decoded);
  return `${truncated}-${hash}`;
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36).substring(0, 5);
}

/**
 * Checks if a given slug matches a blog article, considering both original and safe versions.
 */
export function slugMatches(articleSlug: string, targetSlug: string): boolean {
  if (!articleSlug || !targetSlug) return false;
  
  const normArticle = articleSlug.normalize("NFC");
  const normTarget = targetSlug.normalize("NFC");
  const decodedTarget = decodeURIComponent(normTarget).normalize("NFC");
  
  if (normArticle === normTarget) return true;
  if (getSafeSlug(normArticle) === normTarget) return true;
  if (normArticle === decodedTarget) return true;
  if (getSafeSlug(normArticle) === decodedTarget) return true;
  
  return false;
}
