import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@/src/test/test-utils";
import { useExploreGallery } from "@/hooks/use-explore-gallery";
import { galleryInfiniteOptions } from "@/routers/gallery";
import * as tanstackQuery from "@tanstack/react-query";

vi.mock("@/routers/gallery", () => ({
  galleryInfiniteOptions: vi.fn(),
}));

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useInfiniteQuery: vi.fn(),
  };
});

const mockUserData = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    avatar: "https://example.com/john.jpg",
    category: "photography",
    likes: 42,
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    email: "jane@example.com",
    avatar: "https://example.com/jane.jpg",
    category: "art",
    likes: 38,
  },
  {
    id: 3,
    first_name: "Bob",
    last_name: "Wilson",
    email: "bob@example.com",
    avatar: "https://example.com/bob.jpg",
    category: "nature",
    likes: 56,
  },
];

const mockInfiniteQueryResponse = {
  data: {
    pages: [
      {
        data: mockUserData,
        page: 1,
        per_page: 12,
        total: 3,
        total_pages: 1,
      },
    ],
  },
  isLoading: false,
  isError: false,
  isPending: false,
  error: null,
  fetchNextPage: vi.fn(),
  hasNextPage: false,
  isFetchingNextPage: false,
  status: "success" as const,
  dataUpdatedAt: Date.now(),
  errorUpdatedAt: 0,
  errorUpdateCount: 0,
  failureCount: 0,
  failureReason: null,
  isFetched: true,
  isFetchedAfterMount: true,
  isFetching: false,
  isInitialLoading: false,
  isPaused: false,
  isPlaceholderData: false,
  isRefetchError: false,
  isRefetching: false,
  isStale: false,
  isSuccess: true,
  refetch: vi.fn(),
  fetchStatus: "idle" as const,
  isLoadingError: false,
  isFetchNextPageError: false,
  fetchPreviousPage: vi.fn(),
  hasPreviousPage: false,
  isFetchingPreviousPage: false,
  isFetchPreviousPageError: false,
  isEnabled: true,
  promise: Promise.resolve(),
};

describe("useExploreGallery", () => {
  const mockUseInfiniteQuery = vi.mocked(tanstackQuery.useInfiniteQuery);

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseInfiniteQuery.mockReturnValue(mockInfiniteQueryResponse as never);
  });

  it("returns processed users correctly", () => {
    const { result } = renderHook(() =>
      useExploreGallery({
        search: "",
        category: "all",
        sort: "latest",
      })
    );

    const expectedOrder = [...mockUserData].sort((a, b) => b.id - a.id);
    expect(result.current.users).toEqual(expectedOrder);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasNextPage).toBe(false);
  });

  it("filters users by search term", async () => {
    const { result } = renderHook(() =>
      useExploreGallery({
        search: "john",
        category: "all",
        sort: "latest",
      })
    );

    await waitFor(() => {
      expect(result.current.users).toHaveLength(1);
      expect(result.current.users[0].first_name).toBe("John");
    });
  });

  it("filters users by search term ignoring spaces", async () => {
    const { result } = renderHook(() =>
      useExploreGallery({
        search: "john doe",
        category: "all",
        sort: "latest",
      })
    );

    await waitFor(() => {
      expect(result.current.users).toHaveLength(1);
      expect(result.current.users[0].first_name).toBe("John");
      expect(result.current.users[0].last_name).toBe("Doe");
    });
  });

  it("handles search with extra spaces", async () => {
    const { result } = renderHook(() =>
      useExploreGallery({
        search: "  john   doe  ",
        category: "all",
        sort: "latest",
      })
    );

    await waitFor(() => {
      expect(result.current.users).toHaveLength(1);
      expect(result.current.users[0].first_name).toBe("John");
      expect(result.current.users[0].last_name).toBe("Doe");
    });
  });

  it("handles partial search with spaces", async () => {
    const { result } = renderHook(() =>
      useExploreGallery({
        search: "john ",
        category: "all",
        sort: "latest",
      })
    );

    await waitFor(() => {
      expect(result.current.users).toHaveLength(1);
      expect(result.current.users[0].first_name).toBe("John");
    });
  });

  it("filters users by multiple words in any order", async () => {
    const { result } = renderHook(() =>
      useExploreGallery({
        search: "doe john",
        category: "all",
        sort: "latest",
      })
    );

    await waitFor(() => {
      expect(result.current.users).toHaveLength(1);
      expect(result.current.users[0].first_name).toBe("John");
      expect(result.current.users[0].last_name).toBe("Doe");
    });
  });

  it("does not filter by email - only searches by name", async () => {
    const { result } = renderHook(() =>
      useExploreGallery({
        search: "john@example.com",
        category: "all",
        sort: "latest",
      })
    );

    await waitFor(() => {
      expect(result.current.users).toHaveLength(0);
    });
  });

  it("sorts users by likes (trending)", () => {
    const { result } = renderHook(() =>
      useExploreGallery({
        search: "",
        category: "all",
        sort: "trending",
      })
    );

    const users = result.current.users;
    expect(users[0].likes ?? 0).toBeGreaterThanOrEqual(users[1].likes ?? 0);
    expect(users[1].likes ?? 0).toBeGreaterThanOrEqual(users[2].likes ?? 0);
  });

  it("sorts users by id (latest)", () => {
    const { result } = renderHook(() =>
      useExploreGallery({
        search: "",
        category: "all",
        sort: "latest",
      })
    );

    const users = result.current.users;
    expect(users[0].id).toBeGreaterThanOrEqual(users[1].id);
    expect(users[1].id).toBeGreaterThanOrEqual(users[2].id);
  });

  it("sorts users by id ascending (oldest)", () => {
    const { result } = renderHook(() =>
      useExploreGallery({
        search: "",
        category: "all",
        sort: "oldest",
      })
    );

    const users = result.current.users;
    expect(users[0].id).toBeLessThanOrEqual(users[1].id);
    expect(users[1].id).toBeLessThanOrEqual(users[2].id);
  });

  it("calls galleryInfiniteOptions with correct filters", () => {
    renderHook(() =>
      useExploreGallery({
        search: "test",
        category: "photography",
        sort: "trending",
      })
    );

    expect(galleryInfiniteOptions).toHaveBeenCalledWith({
      search: "test",
      category: "photography",
      sort: "trending",
    });
  });

  it("handles loading state", () => {
    mockUseInfiniteQuery.mockReturnValue({
      ...mockInfiniteQueryResponse,
      isLoading: true,
      data: undefined,
    } as never);

    const { result } = renderHook(() =>
      useExploreGallery({
        search: "",
        category: "all",
        sort: "latest",
      })
    );

    expect(result.current.isLoading).toBe(true);
  });

  it("handles error state", () => {
    const mockError = new Error("Network error");
    mockUseInfiniteQuery.mockReturnValue({
      ...mockInfiniteQueryResponse,
      isError: true,
      error: mockError,
    } as never);

    const { result } = renderHook(() =>
      useExploreGallery({
        search: "",
        category: "all",
        sort: "latest",
      })
    );

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(mockError);
  });

  it("exposes fetchNextPage function", () => {
    const { result } = renderHook(() =>
      useExploreGallery({
        search: "",
        category: "all",
        sort: "latest",
      })
    );

    expect(result.current.fetchNextPage).toBeDefined();
    expect(typeof result.current.fetchNextPage).toBe("function");
  });
});
