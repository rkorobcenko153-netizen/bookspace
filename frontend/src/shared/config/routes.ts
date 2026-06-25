export const ROUTES = {
  HOME:    "/",
  LISTING: (id: string) => `/listings/${id}`,
  PROFILE: "/profile",
  AUTH:    "/auth",
  ADMIN:   "/admin",
} as const;
