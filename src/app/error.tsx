"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] px-4 text-center space-y-6">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
          Something went wrong
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
          An unexpected error occurred while loading this page. We&apos;ve been notified and are looking into it.
        </p>
      </div>
      <Button variant="primary" size="md" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
