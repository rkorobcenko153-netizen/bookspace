import bcrypt from "bcrypt";
import jwt    from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import type { RegisterDto, LoginDto } from "../schemas/auth.schema";

export const authService = {
  async register(dto: RegisterDto) {
    const exists = await prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw { status: 409, message: "Пользователь с таким email уже существует" };

    const password = await bcrypt.hash(dto.password, 10);
    const user     = await prisma.user.create({ data: { ...dto, password } });

    const { password: _, ...safeUser } = user;
    const accessToken  = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

    return { user: safeUser, accessToken, refreshToken };
  },

  async login(dto: LoginDto) {
    const user = await prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw { status: 401, message: "Неверный email или пароль" };

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw { status: 401, message: "Неверный email или пароль" };

    const { password: _, ...safeUser } = user;
    const accessToken  = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

    return { user: safeUser, accessToken, refreshToken };
  },
};
