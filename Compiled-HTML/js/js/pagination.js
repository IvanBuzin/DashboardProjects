document.addEventListener("DOMContentLoaded", () => {
  const paginationInfo = document.getElementById("pagination-info");
  const paginationList = document.getElementById("pagination-list");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");

  // Функція для оновлення даних пагінації
  function updatePagination(totalEntries) {
    paginationInfo.textContent = `Showing data 1 to 8 of ${totalEntries} entries`;

    // Динамічне оновлення списку пагінації (1, 2, 3, ..., 40)
    paginationList.innerHTML = ""; // Очищення
    for (let i = 1; i <= Math.min(5, totalEntries / 8); i++) {
      const pageItem = document.createElement("li");
      pageItem.classList.add("page-item");
      const pageLink = document.createElement("a");
      pageLink.href = "#";
      pageLink.textContent = i;
      pageItem.appendChild(pageLink);
      paginationList.appendChild(pageItem);
    }
  }

  // Отримання загальної кількості записів
  fetch("/api/entries/count")
    .then((response) => response.json())
    .then((data) => {
      updatePagination(data.total);
    })
    .catch((error) => console.error("Помилка:", error));
});
