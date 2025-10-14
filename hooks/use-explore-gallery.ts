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



  // Flatten all pages data - keep it simple for infinite scroll
  const allUsers = data?.pages.flatMap((page) => page.data) || [];

  // Apply minimal client-side filtering only if search exists
  let processedUsers = allUsers;
  
  if (debouncedSearch) {
    const searchLower = debouncedSearch.toLowerCase();
    processedUsers = allUsers.filter((user) =>
      user.first_name.toLowerCase().includes(searchLower) ||
      user.last_name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  const sortedUsers =
    filters.sortBy === "latest" ? [...processedUsers].reverse() : processedUsers;

  const updateFilters = (newFilters: Partial<GalleryFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const updateSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const updateCategory = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const updateSort = (sortBy: "trending" | "latest") => {
    setFilters((prev) => ({ ...prev, sortBy }));
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
