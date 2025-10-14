export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  category?: string;
  tags?: string[];
  author?: string;
  likes?: number;
  description?: string;
}

export interface UserDetail extends User {
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt?: string;
}

export interface GalleryResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface GalleryFilters {
  search?: string;
  category?: string;
  sort?: 'trending' | 'latest' | 'oldest';
}

export interface GalleryParams extends GalleryFilters {
  page?: number;
  per_page?: number;
}
