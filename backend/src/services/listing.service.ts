import { prisma } from "../lib/prisma";

interface Filters {
  search?:     string;
  categoryId?: string;
  city?:       string;
  minPrice?:   number;
  maxPrice?:   number;
  page?:       number;
  pageSize?:   number;
}

export const listingService = {
  async getAll(filters: Filters = {}) {
    const { search, categoryId, city, minPrice, maxPrice, page = 1, pageSize = 12 } = filters;

    const where = {
      isActive: true,
      ...(categoryId && { categoryId }),
      ...(city       && { city: { contains: city, mode: "insensitive" as const } }),
      ...(search     && { OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { city:  { contains: search, mode: "insensitive" as const } },
      ]}),
      ...(minPrice || maxPrice ? { price: {
        ...(minPrice && { gte: minPrice }),
        ...(maxPrice && { lte: maxPrice }),
      }} : {}),
    };

    const [data, total] = await Promise.all([
      prisma.listing.findMany({
        where, skip: (page - 1) * pageSize, take: pageSize,
        include: { category: true, amenities: { include: { amenity: true } }, owner: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.listing.count({ where }),
    ]);

    return { data, total, page, pageSize };
  },

  async getById(id: string) {
    const listing = await prisma.listing.findUnique({
      where: { id },
      include: { category: true, amenities: { include: { amenity: true } }, owner: { select: { id: true, name: true } }, reviews: { include: { user: { select: { id: true, name: true } } } } },
    });
    if (!listing) throw { status: 404, message: "Объект не найден" };
    return listing;
  },
};
