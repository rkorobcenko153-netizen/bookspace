import { describe, it, expect, vi, beforeEach } from "vitest";
import { authService } from "../../src/services/auth.service";
import { prisma }      from "../../src/lib/prisma";
import bcrypt          from "bcrypt";

const mockUser = {
  id: "user-1", email: "test@test.com", name: "Test", password: "", role: "USER" as const,
  createdAt: new Date(), updatedAt: new Date(),
};

describe("AuthService", () => {
  beforeEach(() => vi.clearAllMocks());

  it("должен зарегистрировать нового пользователя", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.user.create).mockResolvedValue({ ...mockUser, password: "hashed" });

    const result = await authService.register({ email: "test@test.com", password: "123456", name: "Test" });

    expect(result.accessToken).toBeDefined();
    expect(result.user.email).toBe("test@test.com");
  });

  it("должен вернуть 409 при дублировании email", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser);
    await expect(authService.register({ email: "test@test.com", password: "123456", name: "Test" }))
      .rejects.toMatchObject({ status: 409 });
  });

  it("должен вернуть 401 при неверном пароле", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({ ...mockUser, password: await bcrypt.hash("correct", 10) });
    await expect(authService.login({ email: "test@test.com", password: "wrong" }))
      .rejects.toMatchObject({ status: 401 });
  });
});
