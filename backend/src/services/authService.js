// Service слой — бизнес-логика, валидация, расчёты
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const { JWT_SECRET } = require('../middleware/auth');

class AuthService {
  register({ email, password, name }) {
    if (!email || !password || !name) {
      throw { status: 400, message: 'Все поля обязательны' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw { status: 400, message: 'Некорректный email' };
    }
    if (password.length < 6) {
      throw { status: 400, message: 'Пароль минимум 6 символов' };
    }
    // 409 Conflict — email уже существует
    if (userRepository.emailExists(email)) {
      throw { status: 409, message: 'Пользователь с таким email уже существует' };
    }
    const user = userRepository.create({ email, password, name });
    const accessToken = this._generateToken(user);
    return { accessToken, user };
  }

  login({ email, password }) {
    if (!email || !password) {
      throw { status: 400, message: 'Укажите email и пароль' };
    }
    const user = userRepository.findByEmail(email);
    // 401 — пользователь не найден или пароль неверный
    if (!user || user.password !== password) {
      throw { status: 401, message: 'Неверный email или пароль' };
    }
    const { password: _p, ...safeUser } = user;
    const accessToken = this._generateToken(safeUser);
    return { accessToken, user: safeUser };
  }

  _generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  }
}

module.exports = new AuthService();
