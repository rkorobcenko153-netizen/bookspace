import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seed started...");

  // Categories
  const [cats, doma, komn] = await Promise.all([
    prisma.category.upsert({ where: { slug: "apartments" }, update: {}, create: { name: "Апартаменты", icon: "🏠", slug: "apartments" } }),
    prisma.category.upsert({ where: { slug: "houses" },    update: {}, create: { name: "Дома",        icon: "🏡", slug: "houses" } }),
    prisma.category.upsert({ where: { slug: "rooms" },     update: {}, create: { name: "Комнаты",     icon: "🛏️", slug: "rooms" } }),
  ]);

  // Amenities
  const amenities = await Promise.all([
    prisma.amenity.upsert({ where: { name: "Wi-Fi" },        update: {}, create: { name: "Wi-Fi",        icon: "📶" } }),
    prisma.amenity.upsert({ where: { name: "Парковка" },     update: {}, create: { name: "Парковка",     icon: "🚗" } }),
    prisma.amenity.upsert({ where: { name: "Кондиционер" },  update: {}, create: { name: "Кондиционер",  icon: "❄️" } }),
    prisma.amenity.upsert({ where: { name: "Стиральная машина" }, update: {}, create: { name: "Стиральная машина", icon: "🫧" } }),
    prisma.amenity.upsert({ where: { name: "Кухня" },        update: {}, create: { name: "Кухня",        icon: "🍳" } }),
  ]);

  // Users
  const hash = (p: string) => bcrypt.hash(p, 10);
  const [admin, owner1, user1] = await Promise.all([
    prisma.user.upsert({ where: { email: "admin@bookspace.ru" }, update: {}, create: { email: "admin@bookspace.ru", name: "Администратор", password: await hash("admin123"), role: "ADMIN" } }),
    prisma.user.upsert({ where: { email: "owner@bookspace.ru" }, update: {}, create: { email: "owner@bookspace.ru", name: "Иван Хозяев",   password: await hash("owner123"), role: "OWNER" } }),
    prisma.user.upsert({ where: { email: "user@bookspace.ru"  }, update: {}, create: { email: "user@bookspace.ru",  name: "Мария Клиент", password: await hash("user123"),  role: "USER"  } }),
  ]);

  // Listings
  const listingsData = [
    { title: "Уютная студия у метро Арбат",        city: "Москва",          price: 3800,  categoryId: cats.id, ownerId: owner1.id },
    { title: "Коттедж «Сосновый бор»",             city: "Подмосковье",     price: 14500, categoryId: doma.id, ownerId: owner1.id },
    { title: "Бутик-отель «Невский»",               city: "Санкт-Петербург", price: 7900,  categoryId: cats.id, ownerId: owner1.id },
    { title: "Вилла с бассейном в Сочи",            city: "Сочи",            price: 28000, categoryId: doma.id, ownerId: admin.id  },
    { title: "Апарт-студия на Петроградке",         city: "Санкт-Петербург", price: 4500,  categoryId: cats.id, ownerId: owner1.id },
    { title: "Шале «Горный орёл»",                  city: "Красная Поляна",  price: 19000, categoryId: doma.id, ownerId: owner1.id },
  ];

  for (const d of listingsData) {
    await prisma.listing.create({
      data: {
        ...d, description: "Прекрасное место для отдыха.", address: "ул. Примерная, 1",
        price: d.price,
        amenities: { create: amenities.slice(0, 3).map((a) => ({ amenity: { connect: { id: a.id } } })) },
      },
    });
  }

  console.log("✅ Seed completed!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
