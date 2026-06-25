import { prisma } from "../lib/prisma";
import type { CreateBookingDto } from "../schemas/booking.schema";

export const bookingService = {
  async getByUser(userId: string) {
    // .filter() — только активные брони пользователя
    return prisma.booking.findMany({
      where: { userId },
      include: { listing: true },
      orderBy: { createdAt: "desc" },
    });
  },

  async create(userId: string, dto: CreateBookingDto) {
    const listing = await prisma.listing.findUnique({ where: { id: dto.listingId } });
    if (!listing)       throw { status: 404, message: "Объект не найден" };
    if (!listing.isActive) throw { status: 400, message: "Объект недоступен" };
    if (listing.ownerId === userId) throw { status: 400, message: "Нельзя бронировать собственный объект" };

    const dateFrom = new Date(dto.dateFrom);
    const dateTo   = new Date(dto.dateTo);

    if (dateTo <= dateFrom) throw { status: 400, message: "Дата выезда должна быть позже заезда" };

    const conflict = await prisma.booking.findFirst({
      where: { listingId: dto.listingId, status: { not: "CANCELLED" },
               AND: [{ dateFrom: { lt: dateTo } }, { dateTo: { gt: dateFrom } }] },
    });
    if (conflict) throw { status: 409, message: "Выбранные даты недоступны" };

    // Расчёт стоимости: цена × количество ночей
    const nights     = Math.ceil((dateTo.getTime() - dateFrom.getTime()) / 86_400_000);
    const totalPrice = Number(listing.price) * nights;

    const booking = await prisma.booking.create({
      data: { userId, listingId: dto.listingId, dateFrom, dateTo, totalPrice, status: "CONFIRMED" },
      include: { listing: true },
    });

    await prisma.notification.create({
      data: {
        userId,
        message: `Бронирование "${listing.title}" подтверждено`,
        type: "BOOKING_CONFIRMED",
      },
    });

    return booking;
  },

  async cancel(id: string, userId: string, role: string) {
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) throw { status: 404, message: "Бронирование не найдено" };
    if (booking.userId !== userId && role !== "ADMIN") throw { status: 403, message: "Нет доступа" };
    if (booking.status === "CANCELLED") throw { status: 400, message: "Уже отменено" };

    return prisma.booking.update({ where: { id }, data: { status: "CANCELLED" } });
  },
};
