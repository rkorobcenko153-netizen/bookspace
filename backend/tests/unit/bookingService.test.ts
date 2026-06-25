import { describe, it, expect, vi, beforeEach } from "vitest";
import { bookingService } from "../../src/services/booking.service";
import { prisma }         from "../../src/lib/prisma";

const mockListing = {
  id: "lst-1", title: "Тест", price: 3000, isActive: true, ownerId: "owner-1",
  description: "", imageUrl: null, city: "Москва", address: "", categoryId: "cat-1",
  createdAt: new Date(), updatedAt: new Date(),
};

describe("BookingService", () => {
  beforeEach(() => vi.clearAllMocks());

  it("должен создать бронирование и рассчитать стоимость (цена × ночи)", async () => {
    vi.mocked(prisma.listing.findUnique).mockResolvedValue(mockListing);
    vi.mocked(prisma.booking.findFirst).mockResolvedValue(null);
    vi.mocked(prisma.booking.create).mockResolvedValue({
      id: "bk-1", userId: "user-1", listingId: "lst-1",
      dateFrom: new Date("2026-07-01"), dateTo: new Date("2026-07-05"),
      totalPrice: 12000 as any, status: "CONFIRMED",
      createdAt: new Date(), updatedAt: new Date(),
    } as any);
    vi.mocked(prisma.notification.create).mockResolvedValue({} as any);

    const result = await bookingService.create("user-1", {
      listingId: "lst-1", dateFrom: "2026-07-01", dateTo: "2026-07-05",
    });

    expect(result.totalPrice).toBe(12000); // 3000 × 4 ночи
  });

  it("должен вернуть 409 при конфликте дат", async () => {
    vi.mocked(prisma.listing.findUnique).mockResolvedValue(mockListing);
    vi.mocked(prisma.booking.findFirst).mockResolvedValue({ id: "conflict" } as any);

    await expect(bookingService.create("user-1", {
      listingId: "lst-1", dateFrom: "2026-07-01", dateTo: "2026-07-05",
    })).rejects.toMatchObject({ status: 409 });
  });

  it("должен вернуть 400 при попытке забронировать своё", async () => {
    vi.mocked(prisma.listing.findUnique).mockResolvedValue(mockListing);

    await expect(bookingService.create("owner-1", {
      listingId: "lst-1", dateFrom: "2026-07-01", dateTo: "2026-07-05",
    })).rejects.toMatchObject({ status: 400 });
  });
});
