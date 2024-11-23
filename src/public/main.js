// document.addEventListener("DOMContentLoaded", () => {
//   const paginationInfo = document.getElementById("pagination-info");
//   const paginationList = document.getElementById("pagination-list");
//   const prevPageBtn = document.getElementById("prev-page");
//   const nextPageBtn = document.getElementById("next-page");
//   const entriesContainer = document.getElementById("entries-container");
//   const filterActiveLink = document.getElementById("filter-active");

//   if (
//     !paginationInfo ||
//     !paginationList ||
//     !prevPageBtn ||
//     !nextPageBtn ||
//     !entriesContainer ||
//     !filterActiveLink
//   ) {
//     console.error("Не знайдені деякі елементи DOM. Перевірте HTML структуру.");
//     return;
//   }

//   let currentPage = 1;
//   const recordsPerPage = 8;
//   let isFilteringActive = false; // Стан фільтрації активних користувачів
//   let allEntries = []; // Зберігаємо всі записи

//   // Завантаження даних
//   function fetchAndDisplayEntries() {
//     fetch(`/json/cost.json`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Помилка на сервері, спробуйте пізніше.");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (!data || !Array.isArray(data.entries)) {
//           throw new Error("Невірний формат даних");
//         }

//         allEntries = data.entries; // Зберігаємо всі записи
//         applyFiltersAndPagination(); // Застосовуємо фільтрацію та оновлюємо пагінацію
//       })
//       .catch((error) => {
//         console.error("Помилка при завантаженні даних:", error);
//         entriesContainer.innerHTML = "Не вдалося завантажити дані.";
//       });
//   }

//   // Фільтрація та пагінація
//   function applyFiltersAndPagination() {
//     let filteredEntries = allEntries;

//     // Якщо активна фільтрація, залишаємо лише активних користувачів
//     if (isFilteringActive) {
//       filteredEntries = allEntries.filter((entry) => entry.Status === "Active");
//     }

//     const totalEntries = filteredEntries.length;
//     const totalPages = Math.ceil(totalEntries / recordsPerPage);

//     // Обмежуємо сторінки в межах дозволеного
//     if (currentPage > totalPages) {
//       currentPage = totalPages;
//     } else if (currentPage < 1) {
//       currentPage = 1;
//     }

//     // Відображаємо потрібні записи
//     const start = (currentPage - 1) * recordsPerPage;
//     const end = start + recordsPerPage;
//     const entriesToShow = filteredEntries.slice(start, end);

//     updatePagination(totalEntries);
//     displayEntries(entriesToShow);
//   }

//   // Оновлення пагінації
//   function updatePagination(totalEntries) {
//     const totalPages = Math.ceil(totalEntries / recordsPerPage);

//     paginationInfo.textContent = `Showing data ${
//       totalEntries === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1
//     } to ${Math.min(
//       currentPage * recordsPerPage,
//       totalEntries
//     )} of ${totalEntries} entries`;

//     paginationList.innerHTML = "";

//     prevPageBtn.classList.toggle("left-disabled", currentPage === 1);
//     nextPageBtn.classList.toggle(
//       "pagination-right-disabled",
//       currentPage === totalPages
//     );

//     for (let i = 1; i <= totalPages; i++) {
//       if (
//         i === 1 ||
//         i === totalPages ||
//         (i >= currentPage - 1 && i <= currentPage + 1)
//       ) {
//         const pageItem = document.createElement("li");
//         pageItem.classList.add("page-item");

//         const pageLink = document.createElement("a");
//         pageLink.href = "#";
//         pageLink.textContent = i;
//         pageLink.classList.add("page-link");

//         if (i === currentPage) {
//           pageItem.classList.add("active");
//         }

//         pageLink.addEventListener("click", (e) => {
//           e.preventDefault();
//           if (i !== currentPage) {
//             currentPage = i;
//             applyFiltersAndPagination(); // Застосовуємо фільтрацію та пагінацію
//           }
//         });

//         pageItem.appendChild(pageLink);
//         paginationList.appendChild(pageItem);
//       } else if (
//         (i === currentPage - 2 && currentPage > 3) ||
//         (i === currentPage + 2 && currentPage < totalPages - 2)
//       ) {
//         const dots = document.createElement("li");
//         dots.classList.add("page-item", "disabled");
//         dots.innerHTML = `<a href="#">...</a>`;
//         paginationList.appendChild(dots);
//       }
//     }
//   }

//   // Відображення записів
//   function displayEntries(entries) {
//     entriesContainer.innerHTML = `
//     <div class="hover-table">
//         <p class="name">Customer Name</p>
//         <p class="company">Company</p>
//         <p class="number">Phone Number</p>
//         <p class="email">Email</p>
//         <p class="country">Country</p>
//         <p class="statuse">Status</p>
//     </div>`;

//     if (!Array.isArray(entries) || entries.length === 0) {
//       entriesContainer.textContent = "Немає записів для відображення";
//       return;
//     }

//     entries.forEach((entry) => {
//       const entryDiv = document.createElement("div");
//       entryDiv.classList.add("entry");

//       entryDiv.innerHTML = `
//       <div class="content-table">
//         <p class="name">${entry.CustomerName}</p>
//         <p class="company">${entry.Company}</p>
//         <p class="number">${entry.PhoneNumber}</p>
//         <p class="email">${entry.Email}</p>
//         <p class="country">${entry.Country}</p>
//         <p>
//           <span class="status ${
//             entry.Status === "Active" ? "active" : "inactive"
//           }">
//            ${entry.Status}
//            </span>
//         </p>
//       </div>
//       `;

//       entriesContainer.appendChild(entryDiv);
//     });
//   }

//   // Обробка кнопок пагінації
//   prevPageBtn.addEventListener("click", () => {
//     if (currentPage > 1) {
//       currentPage--;
//       applyFiltersAndPagination();
//     }
//   });

//   nextPageBtn.addEventListener("click", () => {
//     const totalEntries = isFilteringActive
//       ? allEntries.filter((entry) => entry.Status === "Active").length
//       : allEntries.length;
//     const totalPages = Math.ceil(totalEntries / recordsPerPage);
//     if (currentPage < totalPages) {
//       currentPage++;
//       applyFiltersAndPagination();
//     }
//   });

//   // Обробник для кнопки "Active Members"
//   filterActiveLink.addEventListener("click", (e) => {
//     e.preventDefault();
//     isFilteringActive = !isFilteringActive; // Перемикаємо фільтрацію
//     currentPage = 1; // Починаємо з першої сторінки
//     applyFiltersAndPagination();

//     // Оновлюємо клас активного стану
//     filterActiveLink.classList.toggle("active", isFilteringActive);
//   });

//   fetchAndDisplayEntries(); // Початкове завантаження
// });
// document.addEventListener("DOMContentLoaded", () => {
//   const searchInput = document.getElementById("search-input");
//   const entriesContainer = document.getElementById("entries-container");
//   const paginationList = document.getElementById("pagination-list");
//   const prevPageBtn = document.getElementById("prev-page");
//   const nextPageBtn = document.getElementById("next-page");
//   const paginationInfo = document.getElementById("pagination-info");
//   const statusFilter = document.getElementById("status-filter"); // Фільтр по статусу: Active/Inactive/All

//   if (
//     !searchInput ||
//     !entriesContainer ||
//     !paginationList ||
//     !prevPageBtn ||
//     !nextPageBtn ||
//     !paginationInfo ||
//     !statusFilter
//   ) {
//     console.error("Не знайдені потрібні елементи. Перевірте HTML.");
//     return;
//   }

//   let currentPage = 1;
//   const recordsPerPage = 8;
//   let fullData = []; // Усі записи, завантажені з JSON
//   let filteredData = []; // Дані після фільтрації за пошуком і статусом

//   // Оновлення пагінації
//   function updatePagination(totalEntries) {
//     const totalPages = Math.ceil(totalEntries / recordsPerPage);

//     paginationInfo.textContent = totalEntries
//       ? `Showing data ${(currentPage - 1) * recordsPerPage + 1} to ${Math.min(
//           currentPage * recordsPerPage,
//           totalEntries
//         )} of ${totalEntries} entries`
//       : "No data to display";

//     prevPageBtn.classList.toggle("left-disabled", currentPage === 1);
//     nextPageBtn.classList.toggle(
//       "pagination-right-disabled",
//       currentPage === totalPages
//     );

//     paginationList.innerHTML = "";

//     for (let i = 1; i <= totalPages; i++) {
//       if (
//         i === 1 || // Перша сторінка
//         i === totalPages || // Остання сторінка
//         (i >= currentPage - 1 && i <= currentPage + 1) // Поточна, попередня і наступна сторінки
//       ) {
//         const pageItem = document.createElement("li");
//         pageItem.classList.add("page-item");

//         const pageLink = document.createElement("a");
//         pageLink.href = "#";
//         pageLink.textContent = i;
//         pageLink.classList.add("page-link");

//         if (i === currentPage) pageItem.classList.add("active");

//         pageLink.addEventListener("click", (e) => {
//           e.preventDefault();
//           currentPage = i;
//           displayFilteredData(); // Відображаємо дані відповідно до поточного фільтра
//         });

//         pageItem.appendChild(pageLink);
//         paginationList.appendChild(pageItem);
//       } else if (
//         (i === currentPage - 2 && currentPage > 3) ||
//         (i === currentPage + 2 && currentPage < totalPages - 2)
//       ) {
//         const dots = document.createElement("li");
//         dots.classList.add("page-item", "disabled");
//         dots.innerHTML = `<a href="#">...</a>`;
//         paginationList.appendChild(dots);
//       }
//     }
//   }

//   // Відображення записів
//   function displayEntries(entries) {
//     entriesContainer.innerHTML = `
//     <div class="hover-table">
//         <p class="name">Customer Name</p>
//         <p class="company">Company</p>
//         <p class="number">Phone Number</p>
//         <p class="email">Email</p>
//         <p class="country">Country</p>
//         <p class="statuse">Status</p>
//     </div>`;

//     if (!Array.isArray(entries) || entries.length === 0) {
//       entriesContainer.innerHTML += "<p>Немає записів для відображення</p>";
//       return;
//     }

//     const entriesMarkup = entries
//       .map(
//         (entry) => `
//       <div class="content-table">
//         <p class="name">${entry.CustomerName}</p>
//         <p class="company">${entry.Company}</p>
//         <p class="number">${entry.PhoneNumber}</p>
//         <p class="email">${entry.Email}</p>
//         <p class="country">${entry.Country}</p>
//         <p>
//           <span class="status ${
//             entry.Status === "Active" ? "active" : "inactive"
//           }">
//             ${entry.Status}
//           </span>
//         </p>
//       </div>`
//       )
//       .join("");

//     entriesContainer.innerHTML += entriesMarkup;
//   }

//   // Фільтрація даних
//   function applyFilters() {
//     const searchQuery = searchInput.value.trim().toLowerCase();
//     const selectedStatus = statusFilter.value; // Active/Inactive/All

//     filteredData = fullData.filter((entry) => {
//       const matchesSearch = Object.values(entry)
//         .filter((value) => value !== null && value !== undefined) // Уникаємо null/undefined
//         .some((value) => value.toString().toLowerCase().includes(searchQuery));

//       const matchesStatus =
//         selectedStatus === "All" || entry.Status === selectedStatus;

//       return matchesSearch && matchesStatus; // Пошук і статус
//     });

//     currentPage = 1; // Повертаємося на першу сторінку
//     displayFilteredData();
//   }

//   // Відображення відфільтрованих даних на поточній сторінці
//   function displayFilteredData() {
//     const totalEntries = filteredData.length;

//     updatePagination(totalEntries);

//     const start = (currentPage - 1) * recordsPerPage;
//     const end = start + recordsPerPage;
//     const entriesToShow = filteredData.slice(start, end);

//     displayEntries(entriesToShow);
//   }

//   // Завантаження даних із JSON
//   function loadData() {
//     fetch(`/json/cost.json`)
//       .then((response) => {
//         if (!response.ok)
//           throw new Error("Помилка на сервері, спробуйте пізніше.");
//         return response.json();
//       })
//       .then((data) => {
//         if (!data || !Array.isArray(data.entries))
//           throw new Error("Невірний формат даних");

//         fullData = data.entries;
//         applyFilters(); // Застосовуємо початкові фільтри
//       })
//       .catch((error) => {
//         console.error("Помилка при завантаженні даних:", error);
//         entriesContainer.innerHTML = "Не вдалося завантажити дані.";
//       });
//   }

//   // Подія для кнопки "Попередня"
//   prevPageBtn.addEventListener("click", () => {
//     if (currentPage > 1) {
//       currentPage--;
//       displayFilteredData();
//     }
//   });

//   // Подія для кнопки "Наступна"
//   nextPageBtn.addEventListener("click", () => {
//     const totalPages = Math.ceil(filteredData.length / recordsPerPage);
//     if (currentPage < totalPages) {
//       currentPage++;
//       displayFilteredData();
//     }
//   });

//   // Події для пошуку та фільтрації
//   searchInput.addEventListener("input", applyFilters);
//   statusFilter.addEventListener("change", applyFilters);

//   loadData(); // Початкове завантаження
// });
// document.addEventListener("DOMContentLoaded", () => {
//   const searchInput = document.getElementById("search-input");
//   const entriesContainer = document.getElementById("entries-container");
//   const paginationList = document.getElementById("pagination-list");
//   const prevPageBtn = document.getElementById("prev-page");
//   const nextPageBtn = document.getElementById("next-page");
//   const paginationInfo = document.getElementById("pagination-info");
//   const statusFilter = document.getElementById("status-filter");

//   if (
//     !searchInput ||
//     !entriesContainer ||
//     !paginationList ||
//     !prevPageBtn ||
//     !nextPageBtn ||
//     !paginationInfo ||
//     !statusFilter
//   ) {
//     console.error("Не знайдені потрібні елементи. Перевірте HTML.");
//     return;
//   }

//   let currentPage = 1;
//   const recordsPerPage = 8;
//   let fullData = [];
//   let filteredData = [];

//   // Показати спінер
//   function showLoader() {
//     entriesContainer.innerHTML = `<p class="loader">Завантаження...</p>`;
//   }

//   // Приховати спінер
//   function hideLoader() {
//     const loader = document.querySelector(".loader");
//     if (loader) loader.remove();
//   }

//   // Оновлення пагінації
//   function updatePagination(totalEntries) {
//     const totalPages = Math.ceil(totalEntries / recordsPerPage);

//     paginationInfo.textContent = totalEntries
//       ? `Showing data ${(currentPage - 1) * recordsPerPage + 1} to ${Math.min(
//           currentPage * recordsPerPage,
//           totalEntries
//         )} of ${totalEntries} entries`
//       : "No data to display";

//     prevPageBtn.classList.toggle("left-disabled", currentPage === 1);
//     nextPageBtn.classList.toggle(
//       "pagination-right-disabled",
//       currentPage === totalPages
//     );

//     paginationList.innerHTML = "";

//     for (let i = 1; i <= totalPages; i++) {
//       if (i === 1 || i === totalPages || Math.abs(currentPage - i) <= 2) {
//         const pageItem = document.createElement("li");
//         pageItem.classList.add("page-item");

//         const pageLink = document.createElement("a");
//         pageLink.href = "#";
//         pageLink.textContent = i;
//         pageLink.classList.add("page-link");

//         if (i === currentPage) pageItem.classList.add("active");

//         pageLink.addEventListener("click", (e) => {
//           e.preventDefault();
//           currentPage = i;
//           displayFilteredData();
//         });

//         pageItem.appendChild(pageLink);
//         paginationList.appendChild(pageItem);
//       } else if (i === currentPage - 3 || i === currentPage + 3) {
//         const dots = document.createElement("li");
//         dots.classList.add("page-item", "disabled");
//         dots.innerHTML = `<a href="#">...</a>`;
//         paginationList.appendChild(dots);
//       }
//     }
//   }

//   // Відображення записів
//   function displayEntries(entries) {
//     entriesContainer.innerHTML = `
//     <div class="hover-table">
//         <p class="name">Customer Name</p>
//         <p class="company">Company</p>
//         <p class="number">Phone Number</p>
//         <p class="email">Email</p>
//         <p class="country">Country</p>
//         <p class="statuse">Status</p>
//     </div>`;

//     if (!Array.isArray(entries) || entries.length === 0) {
//       entriesContainer.innerHTML += `<p class="no-entries-message">Немає записів для відображення</p>`;
//       return;
//     }

//     const entriesMarkup = entries
//       .map(
//         (entry) => `
//       <div class="content-table">
//         <p class="name">${entry.CustomerName}</p>
//         <p class="company">${entry.Company}</p>
//         <p class="number">${entry.PhoneNumber}</p>
//         <p class="email">${entry.Email}</p>
//         <p class="country">${entry.Country}</p>
//         <p>
//           <span class="status ${entry.Status.toLowerCase()}">${
//           entry.Status
//         }</span>
//         </p>
//       </div>`
//       )
//       .join("");

//     entriesContainer.innerHTML += entriesMarkup;
//   }

//   // Фільтрація даних
//   function applyFilters() {
//     const searchQuery = searchInput.value.trim().toLowerCase();
//     const selectedStatus = statusFilter.value;

//     filteredData = fullData.filter((entry) => {
//       const matchesSearch = [
//         "CustomerName",
//         "Company",
//         "PhoneNumber",
//         "Email",
//         "Country",
//       ].some((key) =>
//         entry[key]?.toString().toLowerCase().includes(searchQuery)
//       );

//       const matchesStatus =
//         selectedStatus === "All" ||
//         entry.Status.toLowerCase() === selectedStatus.toLowerCase();

//       return matchesSearch && matchesStatus;
//     });

//     currentPage = 1;
//     displayFilteredData();
//   }

//   // Відображення відфільтрованих даних
//   function displayFilteredData() {
//     const totalEntries = filteredData.length;

//     updatePagination(totalEntries);

//     const start = (currentPage - 1) * recordsPerPage;
//     const end = start + recordsPerPage;
//     const entriesToShow = filteredData.slice(start, end);

//     displayEntries(entriesToShow);
//   }

//   // Завантаження даних із JSON
//   function loadData() {
//     showLoader();
//     fetch(`/json/cost.json`)
//       .then((response) => {
//         if (!response.ok)
//           throw new Error("Помилка на сервері, спробуйте пізніше.");
//         return response.json();
//       })
//       .then((data) => {
//         if (!data || !Array.isArray(data.entries))
//           throw new Error("Невірний формат даних");

//         fullData = data.entries;
//         applyFilters();
//       })
//       .catch((error) => {
//         console.error("Помилка при завантаженні даних:", error);
//         entriesContainer.innerHTML = `<p class="error-message">Не вдалося завантажити дані.</p>`;
//       })
//       .finally(() => {
//         hideLoader();
//       });
//   }

//   // Обробка кнопок пагінації
//   prevPageBtn.addEventListener("click", () => {
//     if (currentPage > 1) {
//       currentPage--;
//       displayFilteredData();
//     }
//   });

//   nextPageBtn.addEventListener("click", () => {
//     const totalPages = Math.ceil(filteredData.length / recordsPerPage);
//     if (currentPage < totalPages) {
//       currentPage++;
//       displayFilteredData();
//     }
//   });

//   // Пошук і фільтрація
//   searchInput.addEventListener("input", () => {
//     if (searchInput.value.trim().length > 1 || searchInput.value === "") {
//       applyFilters();
//     }
//   });

//   statusFilter.addEventListener("change", applyFilters);

//   loadData();
// });
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const entriesContainer = document.getElementById("entries-container");
  const paginationList = document.getElementById("pagination-list");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const paginationInfo = document.getElementById("pagination-info");
  const activeFilterBtn = document.getElementById("filter-active"); // Кнопка "Active Members"

  let currentPage = 1;
  const recordsPerPage = 8;
  let fullData = []; // Усі записи
  let filteredData = []; // Відфільтровані записи
  let filterByActive = false; // Чи фільтруємо тільки активних?

  // Завантаження даних із JSON
  function loadData() {
    fetch(`/json/cost.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Помилка завантаження даних.");
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data.entries))
          throw new Error("Неправильний формат JSON.");
        fullData = data.entries;
        applyFilters();
      })
      .catch((error) => {
        console.error(error);
        entriesContainer.innerHTML = "<p>Не вдалося завантажити дані.</p>";
      });
  }

  // Фільтрація даних
  function applyFilters() {
    const searchQuery = searchInput.value.trim().toLowerCase();

    filteredData = fullData.filter((entry) => {
      const matchesSearch = Object.values(entry)
        .filter((value) => value !== null && value !== undefined)
        .some((value) => value.toString().toLowerCase().includes(searchQuery));

      const matchesActive =
        !filterByActive || entry.Status.toLowerCase() === "active";

      return matchesSearch && matchesActive;
    });

    currentPage = 1; // Скидаємо до першої сторінки після фільтрації
    displayFilteredData();
  }

  // Відображення відфільтрованих даних
  function displayFilteredData() {
    const totalEntries = filteredData.length;
    const totalPages = Math.ceil(totalEntries / recordsPerPage);

    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const entriesToShow = filteredData.slice(start, end);

    updatePagination(totalEntries, totalPages);
    displayEntries(entriesToShow);
  }

  // Оновлення таблиці записів
  function displayEntries(entries) {
    entriesContainer.innerHTML = `
      <thead>
        <tr class="hover-table">
          <th>Customer Name</th>
          <th>Company</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Country</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
    `;

    if (entries.length === 0) {
      entriesContainer.innerHTML +=
        "<tr><td colspan='6'>No data available</td></tr>";
    } else {
      entriesContainer.innerHTML += entries
        .map(
          (entry) => `
            <tr class="content-table">
              <td>${entry.CustomerName}</td>
              <td>${entry.Company}</td>
              <td>${entry.PhoneNumber}</td>
              <td>${entry.Email}</td>
              <td>${entry.Country}</td>
              <td class="${entry.Status.toLowerCase()}">${entry.Status}</td>
            </tr>
          `
        )
        .join("");
    }

    entriesContainer.innerHTML += "</tbody>";
  }

  // Оновлення пагінації
  function updatePagination(totalEntries, totalPages) {
    paginationInfo.textContent = totalEntries
      ? `Showing data ${(currentPage - 1) * recordsPerPage + 1} to ${Math.min(
          currentPage * recordsPerPage,
          totalEntries
        )} of ${totalEntries} entries`
      : "No data available";

    prevPageBtn.classList.toggle("disabled", currentPage === 1);
    nextPageBtn.classList.toggle("disabled", currentPage === totalPages);

    paginationList.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement("li");
      pageItem.classList.add("page-item");
      if (i === currentPage) pageItem.classList.add("active");

      const pageLink = document.createElement("a");
      pageLink.href = "#";
      pageLink.textContent = i;
      pageLink.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = i;
        displayFilteredData();
      });

      pageItem.appendChild(pageLink);
      paginationList.appendChild(pageItem);
    }
  }

  // Дії при натисканні на "Active Members"
  activeFilterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    filterByActive = !filterByActive; // Перемикаємо стан фільтру
    activeFilterBtn.classList.toggle("active", filterByActive); // Додаємо візуальне виділення
    applyFilters();
  });

  // Дії при зміні пошуку
  searchInput.addEventListener("input", applyFilters);

  // Початкове завантаження даних
  loadData();
});
