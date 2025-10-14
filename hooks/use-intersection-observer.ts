import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: options.root,
        rootMargin: options.rootMargin || "100px",
        threshold: options.threshold || 0,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [options.root, options.rootMargin, options.threshold]);

  return { targetRef, isIntersecting };
}
