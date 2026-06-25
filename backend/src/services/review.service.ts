import { prisma } from "../lib/prisma";

export const reviewService = {
  async create(userId: string, dto: { listingId: string; rating: number; comment: string }) {
    const listing = await prisma.listing.findUnique({ where: { id: dto.listingId } });
    if (!listing) throw { status: 404, message: "Объект не найден" };

    const existing = await prisma.review.findFirst({ where: { userId, listingId: dto.listingId } });
    if (existing) throw { status: 409, message: "Вы уже оставили отзыв на этот объект" };

    return prisma.review.create({
      data: { ...dto, userId },
      include: { user: { select: { id: true, name: true } } },
    });
  },
};
