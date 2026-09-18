"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AosProvider({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const initAos = () => {
      if (typeof window !== "undefined" && (window as unknown as { AOS?: { init: (options?: unknown) => void; refresh: () => void } }).AOS) {
        const aos = (window as unknown as { AOS: { init: (options?: unknown) => void; refresh: () => void } }).AOS;
        aos.init({
          duration: 700,
          easing: "ease-out-cubic",
          once: false,
          offset: 40,
          delay: 40,
        });
        aos.refresh();
        return true;
      }
      return false;
    };

    if (!initAos()) {
      const interval = setInterval(() => {
        if (initAos()) {
          clearInterval(interval);
        }
      }, 80);
      const timeout = setTimeout(() => clearInterval(interval), 3000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [pathname]);

  return <>{children}</>;
}
