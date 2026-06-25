import { z } from "zod";

export const registerSchema = z.object({
  email:    z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль минимум 6 символов"),
  name:     z.string().min(1, "Имя обязательно"),
});

export const loginSchema = z.object({
  email:    z.string().email("Некорректный email"),
  password: z.string().min(1, "Введите пароль"),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto    = z.infer<typeof loginSchema>;
