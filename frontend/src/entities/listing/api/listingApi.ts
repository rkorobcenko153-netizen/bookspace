import { axiosInstance } from "@shared/api/axiosInstance";
import type { Listing } from "../model/types";

export interface ListingFilters {
  search?:     string;
  categoryId?: string;
  city?:       string;
  minPrice?:   number;
  maxPrice?:   number;
  page?:       number;
  pageSize?:   number;
}

export const listingApi = {
  getAll: (params?: ListingFilters) =>
    axiosInstance.get<{ data: Listing[]; total: number }>("/listings", { params }),

  getById: (id: string) =>
    axiosInstance.get<{ data: Listing }>(`/listings/${id}`),
};
