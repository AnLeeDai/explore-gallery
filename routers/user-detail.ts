import { queryOptions } from "@tanstack/react-query";
import instance from "@/lib/axios";
import { UserDetail, User } from "@/types/gallery";

export const userDetailOptions = (userId: number) =>
  queryOptions({
    queryKey: ["user-detail", userId],
    queryFn: async (): Promise<UserDetail> => {
      const response = await instance.get(`/users/${userId}`);
      const user: User = response.data;
      
      const userDetail: UserDetail = {
        ...user,
        likes: user.likes || 0,
        isLiked: Math.random() > 0.5,
        isSaved: Math.random() > 0.7,
      };
      
      return userDetail;
    },
  });