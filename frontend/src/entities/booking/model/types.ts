export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface Booking {
  id:         string;
  dateFrom:   string;
  dateTo:     string;
  totalPrice: number;
  status:     BookingStatus;
  listing:    { id: string; title: string; price: number; city: string };
  createdAt:  string;
}
