const jwt = require('jsonwebtoken');
const { users } = require('../lib/db');

const JWT_SECRET = process.env.JWT_SECRET || 'bookspace-dev-secret-2026';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Требуется авторизация' });
  }
  try {
    const token = authHeader.slice(7);
    const payload = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === payload.id);
    if (!user) return res.status(401).json({ success: false, message: 'Пользователь не найден' });
    req.user = { id: user.id, email: user.email, name: user.name, role: user.role };
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Недействительный токен' });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Требуется авторизация' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Недостаточно прав' });
    }
    next();
  };
}

module.exports = { authMiddleware, requireRole, JWT_SECRET };
