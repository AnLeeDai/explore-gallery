import { infiniteQueryOptions } from "@tanstack/react-query";
import instance from "@/lib/axios";
import { GalleryParams, GalleryResponse } from "@/types/gallery";

export const galleryInfiniteOptions = (
  filters: Omit<GalleryParams, "page"> = {}
) =>
  infiniteQueryOptions({
    queryKey: ["gallery", filters],
    queryFn: async ({ pageParam = 1 }) => {
      const searchParams = new URLSearchParams();
      searchParams.set("page", pageParam.toString());
      searchParams.set("per_page", "6");

      const response = await instance.get(
        `/api/users?${searchParams.toString()}`
      );
      return response.data;
    },
    getNextPageParam: (lastPage: GalleryResponse) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
