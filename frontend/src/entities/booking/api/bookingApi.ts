import { axiosInstance } from "@shared/api/axiosInstance";
import type { Booking } from "../model/types";

export const bookingApi = {
  getMyBookings: () =>
    axiosInstance.get<{ data: Booking[] }>("/bookings"),

  create: (dto: { listingId: string; dateFrom: string; dateTo: string }) =>
    axiosInstance.post<{ data: Booking }>("/bookings", dto),

  cancel: (id: string) =>
    axiosInstance.patch<{ data: Booking }>(`/bookings/${id}/cancel`),
};
