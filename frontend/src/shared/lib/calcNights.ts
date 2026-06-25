export const calcNights = (from: string, to: string): number =>
  Math.max(0, Math.ceil((+new Date(to) - +new Date(from)) / 86_400_000));
