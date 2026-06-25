export const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric", month: "long", year: "numeric",
  });
