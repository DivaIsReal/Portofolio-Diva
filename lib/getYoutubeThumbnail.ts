/**
 * Extracts the YouTube video ID from a URL and returns the thumbnail URL.
 * Supports standard, short (youtu.be), and embed URL formats.
 */
export function getYoutubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }

    if (
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "youtube.com"
    ) {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/embed/")[1].split("?")[0];
      }
      return parsed.searchParams.get("v");
    }
  } catch {
    return null;
  }

  return null;
}

export function getYoutubeThumbnail(url: string): string {
  const videoId = getYoutubeVideoId(url);
  if (!videoId) return "";
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}
