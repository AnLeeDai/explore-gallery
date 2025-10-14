import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/providers/get-query-client";
import { userDetailOptions } from "@/routers/user-detail";
import ItemDetailContainer from "@/modules/item-detail/item-detail-container";

interface ItemPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
  const queryClient = getQueryClient();
  const { id } = await params;
  const userId = parseInt(id);

  void queryClient.prefetchQuery(userDetailOptions(userId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemDetailContainer userId={userId} />
    </HydrationBoundary>
  );
}