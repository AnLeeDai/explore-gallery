"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortProps {
  sortBy?: 'trending' | 'latest';
  onSortChange: (sortBy: 'trending' | 'latest') => void;
}

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "latest", label: "Latest" },
];

export default function Sort({ sortBy = 'trending', onSortChange }: SortProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-sm font-medium">Sort by:</span>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-40">
          <SelectValue />
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
  );
}
