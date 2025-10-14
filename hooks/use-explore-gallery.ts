import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GalleryFilters } from "@/types/gallery";
import { galleryInfiniteOptions } from "@/routers/gallery";
import { useDebounce } from "./use-debounce";

export function useExploreGallery(initialFilters: GalleryFilters = {}) {
  const [filters, setFilters] = useState<GalleryFilters>(initialFilters);
  const debouncedSearch = useDebounce(filters.search, 300);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery(
    galleryInfiniteOptions({
      ...filters,
      search: debouncedSearch,
    })
  );

  const allUsers = data?.pages.flatMap((page) => page.data) || [];

  const processedUsers = allUsers;
  let sortedUsers = processedUsers;
  if (filters.sort) {
    switch (filters.sort) {
      case "latest":
        sortedUsers = [...processedUsers].sort((a, b) => b.id - a.id);
        break;
      case "trending":
        sortedUsers = [...processedUsers].sort(
          (a, b) => (b.likes || 0) - (a.likes || 0)
        );
        break;
      case "oldest":
        sortedUsers = [...processedUsers].sort((a, b) => a.id - b.id);
        break;
    }
  }

  const updateFilters = (newFilters: Partial<GalleryFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const updateSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const updateCategory = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const updateSort = (sort: "trending" | "latest" | "oldest") => {
    setFilters((prev) => ({ ...prev, sort }));
  };

  return {
    users: sortedUsers,
    filters,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    updateFilters,
    updateSearch,
    updateCategory,
    updateSort,
  };
}
