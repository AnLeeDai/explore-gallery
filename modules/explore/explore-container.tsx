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

  const { targetRef } = useIntersectionObserver({
    rootMargin: "500px",
    threshold: 0,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  if (!isMounted) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-64" />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load gallery: {error?.message || "Unknown error"}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8" suppressHydrationWarning>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Explore Gallery</h1>
        <p className="text-lg text-muted-foreground">
          Discover amazing people and their profiles
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <Filter
            filters={filters}
            onSearchChange={updateSearch}
            onCategoryChange={updateCategory}
          />
        </div>
        <div>
          <Sort sortBy={filters.sort} onSortChange={updateSort} />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg text-muted-foreground mb-2">
            No users found matching your criteria.
          </p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          {isFetchingNextPage && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={`loading-${index}`} className="space-y-3">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          )}

          <div
            ref={targetRef}
            className="flex justify-center py-8 min-h-[50px]"
          >
            {hasNextPage && isFetchingNextPage && (
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  Loading more...
                </span>
              </div>
            )}
            {!hasNextPage && users.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  You&apos;ve reached the end!
                </p>
              </div>
            )}
          </div>
        </>
      )}
      
      {isMounted && <ScrollToTop />}
    </div>
  );
}
