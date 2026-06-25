import { describe, it, expect, vi } from "vitest";
import request  from "supertest";
import app      from "../../src/index";
import { prisma } from "../../src/lib/prisma";
import bcrypt   from "bcrypt";

vi.mock("../../src/services/auth.service", () => ({
  authService: {
    login: vi.fn().mockResolvedValue({
      user: { id: "1", email: "admin@bookspace.ru", name: "Admin", role: "ADMIN" },
      accessToken: "test.token.here",
      refreshToken: "refresh.token",
    }),
    register: vi.fn().mockResolvedValue({
      user: { id: "2", email: "new@test.com", name: "New", role: "USER" },
      accessToken: "new.token",
      refreshToken: "refresh.token",
    }),
  },
}));

describe("POST /api/auth/login", () => {
  it("должен вернуть 200 и токены при верных данных", async () => {
    const res = await request(app).post("/api/auth/login").send({ email: "admin@bookspace.ru", password: "admin123" });
    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user.role).toBe("ADMIN");
  });
});
