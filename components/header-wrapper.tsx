"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Images, Plus, Menu } from "lucide-react";

export function HeaderWrapper() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    {
      name: "Explore",
      href: "/",
      icon: Images,
    },
    {
      name: "Create Item",
      href: "/create",
      icon: Plus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg">Explore Gallery</span>
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-foreground/80",
                mounted && pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Right side - Mode Toggle */}
        <div className="flex items-center space-x-2">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 text-base font-medium transition-colors hover:text-foreground/80 p-2 rounded-md hover:bg-accent",
                        mounted && pathname === item.href
                          ? "text-foreground bg-accent"
                          : "text-foreground/60"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
