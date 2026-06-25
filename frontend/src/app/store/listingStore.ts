import { create } from "zustand";
import type { Listing } from "@entities/listing/model/types";

interface Filters {
  search:     string;
  categoryId: string;
  city:       string;
  minPrice:   number | null;
  maxPrice:   number | null;
}

interface ListingState {
  listings:   Listing[];
  total:      number;
  filters:    Filters;
  isLoading:  boolean;
  setListings: (data: Listing[], total: number) => void;
  setFilter:   (key: keyof Filters, value: string | number | null) => void;
  resetFilters:() => void;
  setLoading:  (v: boolean) => void;
}

const DEFAULT_FILTERS: Filters = {
  search: "", categoryId: "", city: "", minPrice: null, maxPrice: null,
};

export const useListingStore = create<ListingState>()((set) => ({
  listings:  [],
  total:     0,
  filters:   DEFAULT_FILTERS,
  isLoading: false,
  setListings: (listings, total) => set({ listings, total, isLoading: false }),
  setFilter:   (key, value)      => set((s) => ({ filters: { ...s.filters, [key]: value } })),
  resetFilters: ()               => set({ filters: DEFAULT_FILTERS }),
  setLoading:   (isLoading)      => set({ isLoading }),
}));
