document.addEventListener("DOMContentLoaded", function () {
  // Знайти таблицю за класом
  const table = document.querySelector(".customers-table");

  // Перевірка, чи таблиця існує
  if (!table) {
    console.error("Таблиця з класом .customers-table не знайдена.");
    return;
  }

  // Додати клас з анімацією
  table.classList.add("table-animate");

  // Показати таблицю з затримкою (для ефекту)
  setTimeout(function () {
    table.classList.add("table-visible");
  }, 200);
});
