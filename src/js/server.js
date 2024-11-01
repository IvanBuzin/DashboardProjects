const express = require("express");
const app = express();
const PORT = 3000;

// Маршрут для отримання загальної кількості записів
app.get("/api/entries/count", (req, res) => {
  // Фіксована кількість записів, яку повертає API
  const totalEntries = 256000;

  // Відправка відповіді у форматі JSON
  res.json({ total: totalEntries });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

fetch("http://localhost:3004/api/entries/count")
  .then((response) => response.json())
  .then((data) => {
    updatePagination(data.total);
  })
  .catch((error) => console.error("Помилка:", error));
