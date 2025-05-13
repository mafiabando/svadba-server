const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

// Разрешаем все CORS-запросы (для тестов)
app.use(cors());
app.use(express.json());

// Прокси-эндпоинт
app.post('/submit', async (req, res) => {
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbwcunOHv1ORTp26ZNMwB3JLKc-anXIE6vrZedR6RvtGrZH-BpZdRzRyKOLMFHaclZr3/exec ';

  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    res.send(text);
  } catch (error) {
    console.error('Ошибка при отправке:', error);
    res.status(500).send({ error: 'Не удалось отправить данные' });
  }
});

// Проверка работы сервера
app.get('/', (req, res) => {
  res.send('Proxy работает!');
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
});