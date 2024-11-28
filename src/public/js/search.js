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
  let activeFilter = false; // Фільтр активних користувачів

  // Оновлення пагінації
  function updatePagination(totalEntries) {
    const totalPages = Math.ceil(totalEntries / recordsPerPage);

    // Оновлення тексту пагінації
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

    // Оновлення сторінок
    paginationList.innerHTML = "";

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        const pageItem = createPageItem(i);
        paginationList.appendChild(pageItem);
      }
      return;
    }

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Перша сторінка
        i === totalPages || // Остання сторінка
        (i >= currentPage - 1 && i <= currentPage + 1) // Сусідні сторінки
      ) {
        const pageItem = createPageItem(i);
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

  // Створення елемента сторінки
  function createPageItem(page) {
    const pageItem = document.createElement("li");
    pageItem.classList.add("page-item");

    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = page;
    pageLink.classList.add("page-link");

    if (page === currentPage) pageItem.classList.add("active");

    pageLink.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = page;
      displayFilteredData(); // Відображаємо дані на обраній сторінці
    });

    pageItem.appendChild(pageLink);
    return pageItem;
  }

  // Відображення записів
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
      entriesContainer.innerHTML +=
        "<p class='no-data'>Немає записів для відображення.</p>";
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
        <td class="status ${entry.Status === "Active" ? "active" : "inactive"}">
            ${entry.Status}
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

      const matchesActive = !activeFilter || entry.Status === "Active"; // Перевірка на активність

      return matchesSearch && matchesActive;
    });

    currentPage = 1; // Перезавантажуємо на першу сторінку при кожному фільтрі
    displayFilteredData(); // Оновлюємо відображення
  }

  // Відображення фільтрованих даних
  function displayFilteredData() {
    const totalEntries = filteredData.length;
    updatePagination(totalEntries);

    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const entriesToShow = filteredData.slice(start, end);

    displayEntries(entriesToShow);
  }

  // Завантаження даних з JSON
  function loadData() {
    entriesContainer.innerHTML = "<p class='loading'>Завантаження даних...</p>";
    fetch(`/json/cost.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Помилка на сервері.");
        return response.json();
      })
      .then((data) => {
        if (!data || !Array.isArray(data.entries))
          throw new Error("Невірний формат даних");

        fullData = data.entries;
        applyFilters(); // Початкове відображення даних
      })
      .catch((error) => {
        console.error("Помилка при завантаженні даних:", error);
        entriesContainer.innerHTML = "Не вдалося завантажити дані.";
      });
  }

  // Кнопка фільтрації активних користувачів
  filterActiveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    activeFilter = !activeFilter; // Перемикаємо фільтр активних користувачів
    filterActiveBtn.classList.toggle("active", activeFilter); // Зміна стилю кнопки
    applyFilters(searchInput.value.trim()); // Оновлюємо дані з поточним пошуковим запитом
  });

  // Події для кнопок пагінації
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayFilteredData();
    }
  });

  nextPageBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayFilteredData();
    }
  });

  // Реалізація debounce для пошуку
  let debounceTimeout;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      applyFilters(e.target.value.trim());
    }, 300); // Затримка 300 мс
  });

  loadData(); // Завантажуємо дані при завантаженні сторінки
});
