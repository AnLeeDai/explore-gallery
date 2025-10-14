"use client";

import { useEffect, useState } from "react";
import { useExploreGallery } from "@/hooks/use-explore-gallery";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import Filter from "./filter";
import Sort from "./sort";
import UserCard from "@/components/user-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ScrollToTop from "@/components/scroll-to-top";

export default function ExploreContainer() {
  const [isMounted, setIsMounted] = useState(false);

  const {
    users,
    filters,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    updateSearch,
    updateCategory,
    updateSort,
  } = useExploreGallery();

  const { targetRef, isIntersecting } = useIntersectionObserver({
    rootMargin: "500px",
    threshold: 0,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto load more when intersection observer triggers
  useEffect(() => {
    if (isMounted && isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    isMounted,
    isIntersecting,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  // Backup scroll listener
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight;

      const scrolledToBottom =
        Math.ceil(scrollTop + clientHeight) >= scrollHeight - 100;

      if (scrolledToBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Show loading state before mount to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-64"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load gallery: {error?.message || "Unknown error"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" suppressHydrationWarning>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Explore Gallery</h1>
          <p className="text-muted-foreground">
            Discover amazing people and their profiles
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <Filter
              filters={filters}
              onSearchChange={updateSearch}
              onCategoryChange={updateCategory}
            />
          </div>
          <div>
            <Sort sortBy={filters.sortBy} onSortChange={updateSort} />
          </div>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No users found matching your criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>

            {/* Infinite Scroll Loading Skeletons */}
            {isFetchingNextPage && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={`loading-${index}`} className="space-y-3">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            <div
              ref={targetRef}
              className="flex justify-center py-8 min-h-[50px]"
            >
              {hasNextPage && isFetchingNextPage && (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="text-sm text-muted-foreground">
                    Loading more...
                  </span>
                </div>
              )}
              {!hasNextPage && users.length > 0 && users.length > 0 && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    You&apos;ve reached the end!
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {isMounted && <ScrollToTop />}
    </div>
  );
}
