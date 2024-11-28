document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const entriesContainer = document.getElementById("entries-container");
  const paginationList = document.getElementById("pagination-list");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const paginationInfo = document.getElementById("pagination-info");
  const filterActiveBtn = document.getElementById("filter-active");

  let currentPage = 1;
  const recordsPerPage = 8;
  let fullData = [];
  let filteredData = [];
  let activeFilter = false; // Флаг для фільтрації активних користувачів

  // Відображення фільтрованих записів
  function displayFilteredData() {
    const searchQuery = searchInput.value.trim(); // Отримуємо пошуковий запит

    applyFilters(searchQuery); // Застосовуємо фільтри перед відображенням

    const totalEntries = filteredData.length;
    const totalPages = Math.ceil(totalEntries / recordsPerPage);
    if (currentPage > totalPages) currentPage = 1; // Якщо поточна сторінка більше доступних, скидаємо на 1

    updatePagination(totalEntries); // Оновлюємо пагінацію

    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const entriesToShow = filteredData.slice(start, end); // Отримуємо записі для поточної сторінки

    displayEntries(entriesToShow);
  }

  // Оновлення пагінації
  function updatePagination(totalEntries) {
    const totalPages = Math.ceil(totalEntries / recordsPerPage);

    // Оновлюємо текст інформації
    paginationInfo.textContent = totalEntries
      ? `Showing data ${(currentPage - 1) * recordsPerPage + 1} to ${Math.min(
          currentPage * recordsPerPage,
          totalEntries
        )} of ${totalEntries} entries`
      : "No data to display";

    // Оновлення кнопок пагінації
    prevPageBtn.classList.toggle("left-disabled", currentPage === 1);
    nextPageBtn.classList.toggle(
      "pagination-right-disabled",
      currentPage === totalPages
    );

    // Оновлення сторінок у пагінації
    paginationList.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Перша сторінка
        i === totalPages || // Остання сторінка
        (i >= currentPage - 1 && i <= currentPage + 1) // Сусідні сторінки
      ) {
        const pageItem = document.createElement("li");
        pageItem.classList.add("page-item");

        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.classList.add("page-link");

        if (i === currentPage) pageItem.classList.add("active");

        pageLink.addEventListener("click", (e) => {
          e.preventDefault();
          currentPage = i;
          displayFilteredData(); // Перемикаємо на відповідну сторінку
        });

        pageItem.appendChild(pageLink);
        paginationList.appendChild(pageItem);
      } else if (
        (i === currentPage - 2 && currentPage > 3) ||
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        const dots = document.createElement("li");
        dots.classList.add("page-item", "disabled");
        dots.innerHTML = `<a href="#">...</a>`;
        paginationList.appendChild(dots);
      }
    }
  }

  // Функція для відображення записів
  function displayEntries(entries) {
    entriesContainer.innerHTML = `
    <div class="hover-table">
        <p class="name">Customer Name</p>
        <p class="company">Company</p>
        <p class="number">Phone Number</p>
        <p class="email">Email</p>
        <p class="country">Country</p>
        <p class="statuse">Status</p>
    </div>`;

    if (!Array.isArray(entries) || entries.length === 0) {
      entriesContainer.innerHTML += "<p>Немає записів для відображення</p>";
      return;
    }

    const entriesMarkup = entries
      .map(
        (entry) => `
      <tr class="content-table">
        <td class="name">${entry.CustomerName}</td>
        <td class="company">${entry.Company}</td>
        <td class="number">${entry.PhoneNumber}</td>
        <td class="email">${entry.Email}</td>
        <td class="country">${entry.Country}</td>
        <td>
          <span class="status ${
            entry.Status === "Active" ? "active" : "inactive"
          }">
            ${entry.Status}
          </span>
        </td>
      </tr>`
      )
      .join("");

    entriesContainer.innerHTML += entriesMarkup;
  }

  // Фільтрація даних
  function applyFilters(searchQuery = "") {
    filteredData = fullData.filter((entry) => {
      const matchesSearch = Object.values(entry)
        .filter((value) => value !== null && value !== undefined)
        .some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesActive = !activeFilter || entry.Status === "Active";

      return matchesSearch && matchesActive;
    });
  }

  // Клік на кнопку "Active Members"
  filterActiveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    activeFilter = !activeFilter; // Зберігаємо стан фільтра
    filterActiveBtn.classList.toggle("active", activeFilter);

    displayFilteredData(); // Перезастосовуємо фільтри після натискання
  });

  // Подія для пошуку
  searchInput.addEventListener("input", (e) => {
    displayFilteredData(); // Застосовуємо фільтрацію під час пошуку
  });

  // Завантаження даних
  function loadData() {
    fetch(`/json/cost.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Помилка на сервері.");
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data.entries))
          throw new Error("Невірний формат даних");

        fullData = data.entries;
        filteredData = [...fullData]; // Початково всі дані
        displayFilteredData(); // Відображаємо з початковими фільтрами
      })
      .catch((error) => {
        console.error("Помилка завантаження даних:", error);
        entriesContainer.innerHTML = "<p>Не вдалося завантажити дані.</p>";
      });
  }

  // Обробка пагінації (стрілки)
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayFilteredData(); // Застосовуємо фільтрацію після зміни сторінки
    }
  });

  nextPageBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayFilteredData(); // Застосовуємо фільтрацію після зміни сторінки
    }
  });

  loadData(); // Завантажуємо дані при завантаженні сторінки
});
