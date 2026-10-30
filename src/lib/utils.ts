import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const parts = dateString.split("-").map(Number);
  if (parts.length === 3 && !parts.some(isNaN)) {
    const [year, month, day] = parts;
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  }
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function getYoutubeEmbedUrl(url: string, autoplay: boolean = true): string {
  try {
    const u = new URL(url);
    let videoId: string | null = null;

    if (u.hostname.includes("youtu.be")) {
      videoId = u.pathname.replace(/^\//, "");
    } else if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) {
        videoId = u.pathname.replace("/embed/", "");
      } else if (u.pathname.startsWith("/shorts/")) {
        videoId = u.pathname.replace("/shorts/", "");
      } else {
        videoId = u.searchParams.get("v");
      }
    }

    if (videoId) {
      const cleanId = videoId.split("&")[0].split("?")[0];
      const params = new URLSearchParams();
      if (autoplay) {
        params.set("autoplay", "1");
        params.set("mute", "1");
        params.set("loop", "1");
        params.set("playlist", cleanId);
      }
      params.set("rel", "0");
      params.set("modestbranding", "1");
      return `https://www.youtube.com/embed/${cleanId}?${params.toString()}`;
    }

    return url;
  } catch {
    return url;
  }
}
