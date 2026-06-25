import { describe, it, expect, vi, beforeEach } from "vitest";
import { listingService } from "../../src/services/listing.service";
import { prisma }         from "../../src/lib/prisma";

describe("ListingService", () => {
  beforeEach(() => vi.clearAllMocks());

  it("должен вернуть 404 если объект не найден", async () => {
    vi.mocked(prisma.listing.findUnique).mockResolvedValue(null);
    await expect(listingService.getById("bad-id")).rejects.toMatchObject({ status: 404 });
  });

  it("должен вернуть список объектов", async () => {
    vi.mocked(prisma.listing.findMany).mockResolvedValue([]);
    vi.mocked(prisma.listing.count).mockResolvedValue(0);
    const result = await listingService.getAll({});
    expect(result.data).toEqual([]);
    expect(result.total).toBe(0);
  });
});
