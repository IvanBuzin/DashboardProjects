// Анімація при наведенні на рядки таблиці:
const tableRows = document.querySelectorAll(".customer-table tbody tr");

tableRows.forEach((row) => {
  row.addEventListener("mouseenter", () => {
    row.classList.add("row-hover");
  });

  row.addEventListener("mouseleave", () => {
    row.classList.remove("row-hover");
  });
});
