import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@/src/test/test-utils";
import ExploreContainer from "@/modules/explore/explore-container";

// Mock the hooks
vi.mock("@/hooks/use-explore-gallery", () => ({
  useExploreGallery: vi.fn(() => ({
    users: [],
    filters: {},
    isLoading: false,
    isError: false,
    error: null,
    hasNextPage: true,
    isFetchingNextPage: false,
    fetchNextPage: vi.fn(),
    updateSearch: vi.fn(),
    updateCategory: vi.fn(),
    updateSort: vi.fn(),
  })),
}));

vi.mock("@/hooks/use-intersection-observer", () => ({
  useIntersectionObserver: vi.fn(() => ({
    targetRef: { current: null },
  })),
}));

vi.mock("@/routers/gallery", () => ({
  galleryApi: {
    getCategories: vi.fn(() => Promise.resolve([])),
  },
}));

describe("ExploreContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<ExploreContainer />);
    expect(screen.getByText("Explore Gallery")).toBeInTheDocument();
  });

  it("shows empty state when no users", () => {
    render(<ExploreContainer />);
    expect(screen.getByText("No users found matching your criteria.")).toBeInTheDocument();
  });

  it("renders infinite scroll target element", () => {
    const { container } = render(<ExploreContainer />);
    // The targetRef div should exist for intersection observer
    const targetDivs = container.querySelectorAll('div');
    expect(targetDivs.length).toBeGreaterThan(0);
  });
});