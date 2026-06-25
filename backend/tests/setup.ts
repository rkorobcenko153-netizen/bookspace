import { vi } from "vitest";

vi.mock("../src/lib/prisma", () => ({
  prisma: {
    user:         { findUnique: vi.fn(), create: vi.fn(), findMany: vi.fn(), update: vi.fn() },
    listing:      { findUnique: vi.fn(), findMany: vi.fn(), count: vi.fn() },
    booking:      { create: vi.fn(), findMany: vi.fn(), findUnique: vi.fn(), findFirst: vi.fn(), update: vi.fn() },
    review:       { findFirst: vi.fn(), create: vi.fn() },
    notification: { create: vi.fn(), findMany: vi.fn(), update: vi.fn(), updateMany: vi.fn() },
  },
}));

process.env.JWT_SECRET         = "test-secret";
process.env.JWT_REFRESH_SECRET = "test-refresh-secret";
