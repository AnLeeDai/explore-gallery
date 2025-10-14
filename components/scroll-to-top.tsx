"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [isMounted]);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}