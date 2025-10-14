"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortProps {
  sortBy?: 'trending' | 'latest' | 'oldest';
  onSortChange: (sortBy: 'trending' | 'latest' | 'oldest') => void;
}

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
];

export default function Sort({ sortBy = 'trending', onSortChange }: SortProps) {
  return (
    <div className="flex items-center gap-3">
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-32 h-10">
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
