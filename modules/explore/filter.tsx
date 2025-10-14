"use client";

import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GalleryFilters } from "@/types/gallery";
import { galleryApi } from "@/routers/gallery";

interface FilterProps {
  filters: GalleryFilters;
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: "trending" | "latest" | "oldest") => void;
}

export default function Filter({
  filters,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: FilterProps) {
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: galleryApi.getCategories,
  });

  const allCategories = [
    { value: "all", label: "All Categories" },
    ...categories.map((cat) => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    })),
  ];

  const sortOptions = [
    { value: "trending", label: "Trending" },
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {/* Search Input */}
      <div className="w-full">
        <Input
          placeholder="Search by name..."
          value={filters.search || ""}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 w-full"
        />
      </div>

      {/* Category Filter */}
      <div className="w-full">
        <Select
          value={filters.category || "all"}
          onValueChange={onCategoryChange}
          disabled={categoriesLoading}
        >
          <SelectTrigger className="h-10 w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {allCategories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort Options */}
      <div className="w-full">
        <Select
          value={filters.sort || "trending"}
          onValueChange={onSortChange}
        >
          <SelectTrigger className="h-10 w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
