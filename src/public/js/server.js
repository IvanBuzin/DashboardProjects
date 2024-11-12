import express from "express";
import path from "path";

const app = express();

// Налаштування статичної папки для публічних файлів
app.use(express.static(path.join(__dirname, "public")));

// Маршрут для завантаження даних про клієнтів
app.get("/json/cost.json", (req, res) => {
  // Відправка JSON-файлу клієнту
  res.sendFile(path.join(__dirname, "public", "customers.json"));
});

const PORT = process.env.PORT || 3018;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
