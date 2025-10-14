import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import instance from "@/lib/axios";
import {
  GalleryParams,
  GalleryResponse,
  User,
  GalleryFilters,
} from "@/types/gallery";

export const galleryInfiniteOptions = (filters: GalleryFilters = {}) =>
  infiniteQueryOptions({
    queryKey: ["gallery", filters],
    queryFn: async ({ pageParam = 1 }) => {
      const searchParams = new URLSearchParams();
      searchParams.set("_page", pageParam.toString());
      searchParams.set("_limit", "4");

      if (filters.search) {
        searchParams.set("search", filters.search);
      }

      if (filters.category && filters.category !== "all") {
        searchParams.set("category", filters.category);
      }

      if (filters.sort) {
        searchParams.set("sort", filters.sort);
      }

      const response = await instance.get(`/users?${searchParams.toString()}`);

      const data: GalleryResponse = response.data;
      
      return data;
    },
    getNextPageParam: (lastPage: GalleryResponse) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

export const galleryOptions = (params: GalleryParams = {}) =>
  queryOptions({
    queryKey: ["gallery", params],
    queryFn: async (): Promise<GalleryResponse> => {
      const searchParams = new URLSearchParams();

      if (params.page) searchParams.set("_page", params.page.toString());
      if (params.per_page)
        searchParams.set("_limit", params.per_page.toString());

      const response = await instance.get(`/users?${searchParams.toString()}`);

      const total = parseInt(response.headers["x-total-count"] || "0");
      const totalPages = Math.ceil(total / (params.per_page || 6));

      return {
        page: params.page || 1,
        per_page: params.per_page || 6,
        total: total,
        total_pages: totalPages,
        data: response.data,
      };
    },
  });

export const galleryApi = {
  getUserById: async (id: string | number): Promise<User> => {
    const response = await instance.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (userData: Omit<User, "id">): Promise<User> => {
    const response = await instance.post("/users", userData);
    return response.data;
  },

  updateUserLikes: async (id: number, likes: number): Promise<User> => {
    const response = await instance.patch(`/users/${id}`, { likes });
    return response.data;
  },

  toggleSaveUser: async (
    id: number,
    isSaved: boolean
  ): Promise<{ success: boolean; isSaved: boolean }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, isSaved };
  },

  getCategories: async (): Promise<string[]> => {
    const response = await instance.get("/categories");
    return response.data;
  },

  getRelatedUsers: async (
    category: string,
    excludeId?: string | number,
    limit: number = 4
  ): Promise<User[]> => {
    const searchParams = new URLSearchParams();
    searchParams.set("category", category);
    searchParams.set("_limit", limit.toString());
    if (excludeId) {
      searchParams.set("id_ne", excludeId.toString());
    }

    const response = await instance.get(`/users?${searchParams.toString()}`);
    return response.data.data || response.data;
  },
};
