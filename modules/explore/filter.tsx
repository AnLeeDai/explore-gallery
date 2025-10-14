"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GalleryFilters } from "@/types/gallery";

interface FilterProps {
  filters: GalleryFilters;
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "people", label: "People" },
  { value: "nature", label: "Nature" },
  { value: "technology", label: "Technology" },
  { value: "art", label: "Art" },
];

export default function Filter({
  filters,
  onSearchChange,
  onCategoryChange,
}: FilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder="Search by name or email..."
          value={filters.search || ""}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="w-full sm:w-48">
        <Select
          value={filters.category || "all"}
          onValueChange={onCategoryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
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
