import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import app     from "../../src/index";

vi.mock("../../src/services/listing.service", () => ({
  listingService: {
    getAll: vi.fn().mockResolvedValue({ data: [], total: 0, page: 1, pageSize: 12 }),
    getById: vi.fn().mockResolvedValue(null),
  },
}));

describe("GET /api/listings", () => {
  it("должен вернуть 200 и массив объектов", async () => {
    const res = await request(app).get("/api/listings");
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });
});
