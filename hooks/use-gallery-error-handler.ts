import { useCallback } from "react";
import { toast } from "sonner";

export interface ErrorHandlerOptions {
  showToast?: boolean;
  fallbackMessage?: string;
}

export function useGalleryErrorHandler() {
  const handleError = useCallback((
    error: unknown,
    options: ErrorHandlerOptions = {}
  ) => {
    const { showToast = true, fallbackMessage = "Something went wrong" } = options;
    
    let message: string;
    
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    } else if (error && typeof error === "object" && "message" in error) {
      message = String(error.message);
    } else {
      message = fallbackMessage;
    }

    if (showToast) {
      toast.error(message);
    }

    // Log error for debugging
    console.error("Gallery Error:", error);
    
    return message;
  }, []);

  return { handleError };
}