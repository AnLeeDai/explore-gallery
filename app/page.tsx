import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import ExploreContainer from "@/modules/explore/explore-container";
import { getQueryClient } from "@/providers/get-query-client";
import { galleryInfiniteOptions } from "@/routers/gallery";

export default function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(galleryInfiniteOptions());

  return (
    <main className="space-y-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExploreContainer />
      </HydrationBoundary>
    </main>
  );
}
