import { create } from "zustand";
import type { Listing } from "@entities/listing/model/types";

export interface CartItem {
  listing:  Listing;
  dateFrom: string;
  dateTo:   string;
}

interface CartState {
  items:      CartItem[];
  add:        (listing: Listing) => void;
  remove:     (id: string) => void;
  updateDates:(id: string, field: "dateFrom" | "dateTo", value: string) => void;
  has:        (id: string) => boolean;
  total:      () => number;
  clear:      () => void;
}

const today = () => new Date().toISOString().split("T")[0];
const tmrw  = () => {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split("T")[0];
};
const nights = (a: string, b: string) =>
  Math.max(0, Math.ceil((+new Date(b) - +new Date(a)) / 86_400_000));

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  add: (listing) =>
    set((s) =>
      s.items.some((i) => i.listing.id === listing.id)
        ? s
        : { items: [...s.items, { listing, dateFrom: today(), dateTo: tmrw() }] }
    ),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.listing.id !== id) })),
  updateDates: (id, field, value) =>
    set((s) => ({
      items: s.items.map((i) => (i.listing.id === id ? { ...i, [field]: value } : i)),
    })),
  has: (id) => get().items.some((i) => i.listing.id === id),
  // .reduce() из лекции — суммируем стоимость
  total: () =>
    get().items.reduce(
      (sum, i) => sum + i.listing.price * nights(i.dateFrom, i.dateTo),
      0
    ),
  clear: () => set({ items: [] }),
}));
