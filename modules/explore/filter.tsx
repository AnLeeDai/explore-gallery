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
}

export default function Filter({
  filters,
  onSearchChange,
  onCategoryChange,
}: FilterProps) {
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: galleryApi.getCategories,
  });

  const allCategories = [
    { value: "all", label: "All Categories" },
    ...categories.map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }))
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Input
          placeholder="Search by name, email or author..."
          value={filters.search || ""}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10"
        />
      </div>
      <div className="w-full sm:w-48">
        <Select
          value={filters.category || "all"}
          onValueChange={onCategoryChange}
          disabled={categoriesLoading}
        >
          <SelectTrigger className="h-10">
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
    </div>
  );
}
