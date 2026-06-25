const express = require('express');
const cors    = require('cors');
const routes  = require('./routes');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Все API-роуты под /api
app.use('/api', routes);

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Маршрут не найден' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер BookSpace запущен: http://localhost:${PORT}`);
  console.log(`📡 API:     http://localhost:${PORT}/api`);
  console.log(`❤️  Health: http://localhost:${PORT}/health`);
  console.log(`\n🔑 Тестовые аккаунты:`);
  console.log(`   admin@bookspace.ru / admin123 (ADMIN)`);
  console.log(`   owner@bookspace.ru / owner123 (OWNER)`);
  console.log(`   user@bookspace.ru  / user123  (USER)`);
});

module.exports = app;
