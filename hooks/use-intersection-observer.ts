import { useEffect, useRef, useCallback } from "react";

interface UseIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect?: () => void;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const targetRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry && entry.isIntersecting && options.onIntersect) {
      options.onIntersect();
    }
  }, [options]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(handleIntersect, {
      root: options.root,
      rootMargin: options.rootMargin || "100px",
      threshold: options.threshold || 0,
    });

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [handleIntersect, options.root, options.rootMargin, options.threshold]);

  return { targetRef };
}
