export interface Listing {
  id:           string;
  title:        string;
  description:  string;
  price:        number;
  city:         string;
  address:      string;
  imageUrl:     string | null;
  isActive:     boolean;
  rating?:      number;
  reviewsCount?: number;
  category:     { id: string; name: string; icon: string; slug: string };
  amenities:    { id: string; name: string; icon: string }[];
  owner:        { id: string; name: string };
}
