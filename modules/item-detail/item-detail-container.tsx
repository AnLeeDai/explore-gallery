"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { userDetailOptions } from "@/routers/user-detail";
import ItemDetailView from "./item-detail-view";

interface ItemDetailContainerProps {
  userId: number;
}

export default function ItemDetailContainer({ userId }: ItemDetailContainerProps) {
  const { data: userDetail } = useSuspenseQuery(userDetailOptions(userId));

  return <ItemDetailView userDetail={userDetail} />;
}