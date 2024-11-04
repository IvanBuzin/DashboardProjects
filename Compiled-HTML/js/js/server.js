const express = require("express");
const app = express();
const PORT = 3012; // Коригування порту

// Налаштування статичного каталогу
app.use(express.static("public"));

// Маршрут для отримання загальної кількості записів
app.get("/api/entries/count", (req, res) => {
  const totalEntries = 256000;
  res.json({ total: totalEntries });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Функція для оновлення пагінації
function updatePagination(totalEntries) {
  console.log("Total Entries:", totalEntries);
  // Додайте вашу логіку для оновлення елементів пагінації
}

// Виконання fetch-запиту
fetch("http://localhost:3012/api/entries/count")
  .then((response) => response.json())
  .then((data) => {
    updatePagination(data.total);
  })
  .catch((error) => console.error("Помилка:", error));
