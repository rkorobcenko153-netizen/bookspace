const { users, uuidv4 } = require('../lib/db');

class UserRepository {
  findByEmail(email) {
    return users.find(u => u.email === email) || null;
  }

  findById(id) {
    return users.find(u => u.id === id) || null;
  }

  findAll() {
    // .map() из лекции — трансформируем массив, убирая пароль
    return users.map(({ password, ...u }) => u);
  }

  create({ email, password, name, role = 'USER' }) {
    const user = { id: uuidv4(), email, password, name, role, createdAt: new Date().toISOString() };
    users.push(user);
    const { password: _p, ...safe } = user;
    return safe;
  }

  emailExists(email) {
    return users.some(u => u.email === email);
  }
}

module.exports = new UserRepository();
