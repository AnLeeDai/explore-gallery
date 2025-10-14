export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface GalleryResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
  _meta: {
    powered_by: string;
    upgrade_url: string;
    docs_url: string;
    template_gallery: string;
  };
}

export interface GalleryFilters {
  search?: string;
  category?: string;
  sortBy?: 'trending' | 'latest';
}

export interface GalleryParams extends GalleryFilters {
  page?: number;
  per_page?: number;
}
