import { describe, it, expect, vi, beforeEach } from "vitest";
import { reviewService } from "../../src/services/review.service";
import { prisma }        from "../../src/lib/prisma";

const mockListing = { id: "lst-1", isActive: true } as any;

describe("ReviewService", () => {
  beforeEach(() => vi.clearAllMocks());

  it("должен вернуть 409 при повторном отзыве", async () => {
    vi.mocked(prisma.listing.findUnique).mockResolvedValue(mockListing);
    vi.mocked(prisma.review.findFirst).mockResolvedValue({ id: "rv-1" } as any);

    await expect(reviewService.create("user-1", { listingId: "lst-1", rating: 5, comment: "Отлично!" }))
      .rejects.toMatchObject({ status: 409 });
  });
});
