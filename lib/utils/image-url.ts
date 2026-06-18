/** Lighter Unsplash (or similar) URLs for mobile bandwidth. */
export function optimizeImageUrl(url: string, width = 720): string {
  if (!url.includes("unsplash.com")) return url;
  return url.replace(/w=\d+/i, `w=${width}`);
}
