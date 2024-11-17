document.addEventListener("DOMContentLoaded", function () {
  const tableRows = document.querySelectorAll(".customer-table tbody tr");

  // Перевірка, чи є рядки таблиці
  if (tableRows.length === 0) {
    console.warn("Не знайдено жодного рядка таблиці для анімації.");
    return;
  }

  // Додавання обробників подій для кожного рядка
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      row.classList.add("row-hover");
    });

    row.addEventListener("mouseleave", () => {
      row.classList.remove("row-hover");
    });
  });
});
