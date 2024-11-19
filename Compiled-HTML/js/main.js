document.addEventListener("DOMContentLoaded", () => {
  const paginationInfo = document.getElementById("pagination-info");
  const paginationList = document.getElementById("pagination-list");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const entriesContainer = document.getElementById("entries-container");
  const filterActiveLink = document.getElementById("filter-active");

  if (
    !paginationInfo ||
    !paginationList ||
    !prevPageBtn ||
    !nextPageBtn ||
    !entriesContainer ||
    !filterActiveLink
  ) {
    console.error("Не знайдені деякі елементи DOM. Перевірте HTML структуру.");
    return;
  }

  let currentPage = 1;
  const recordsPerPage = 8;
  let isFilteringActive = false; // Стан фільтрації активних користувачів
  let allEntries = []; // Зберігаємо всі записи

  // Завантаження даних
  function fetchAndDisplayEntries() {
    fetch(`/json/cost.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Помилка на сервері, спробуйте пізніше.");
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !Array.isArray(data.entries)) {
          throw new Error("Невірний формат даних");
        }

        allEntries = data.entries; // Зберігаємо всі записи
        applyFiltersAndPagination(); // Застосовуємо фільтрацію та оновлюємо пагінацію
      })
      .catch((error) => {
        console.error("Помилка при завантаженні даних:", error);
        entriesContainer.innerHTML = "Не вдалося завантажити дані.";
      });
  }

  // Фільтрація та пагінація
  function applyFiltersAndPagination() {
    let filteredEntries = allEntries;

    // Якщо активна фільтрація, залишаємо лише активних користувачів
    if (isFilteringActive) {
      filteredEntries = allEntries.filter((entry) => entry.Status === "Active");
    }

    const totalEntries = filteredEntries.length;
    const totalPages = Math.ceil(totalEntries / recordsPerPage);

    // Обмежуємо сторінки в межах дозволеного
    if (currentPage > totalPages) {
      currentPage = totalPages;
    } else if (currentPage < 1) {
      currentPage = 1;
    }

    // Відображаємо потрібні записи
    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const entriesToShow = filteredEntries.slice(start, end);

    updatePagination(totalEntries);
    displayEntries(entriesToShow);
  }

  // Оновлення пагінації
  function updatePagination(totalEntries) {
    const totalPages = Math.ceil(totalEntries / recordsPerPage);

    paginationInfo.textContent = `Showing data ${
      totalEntries === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1
    } to ${Math.min(
      currentPage * recordsPerPage,
      totalEntries
    )} of ${totalEntries} entries`;

    paginationList.innerHTML = "";

    prevPageBtn.classList.toggle("left-disabled", currentPage === 1);
    nextPageBtn.classList.toggle(
      "pagination-right-disabled",
      currentPage === totalPages
    );

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        const pageItem = document.createElement("li");
        pageItem.classList.add("page-item");

        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.classList.add("page-link");

        if (i === currentPage) {
          pageItem.classList.add("active");
        }

        pageLink.addEventListener("click", (e) => {
          e.preventDefault();
          if (i !== currentPage) {
            currentPage = i;
            applyFiltersAndPagination(); // Застосовуємо фільтрацію та пагінацію
          }
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
      entriesContainer.textContent = "Немає записів для відображення";
      return;
    }

    entries.forEach((entry) => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry");

      entryDiv.innerHTML = `              
      <div class="content-table">
        <p class="name">${entry.CustomerName}</p>
        <p class="company">${entry.Company}</p>
        <p class="number">${entry.PhoneNumber}</p>
        <p class="email">${entry.Email}</p> 
        <p class="country">${entry.Country}</p>
        <p>
          <span class="status ${
            entry.Status === "Active" ? "active" : "inactive"
          }">
           ${entry.Status}
           </span>
        </p>
      </div>
      `;

      entriesContainer.appendChild(entryDiv);
    });
  }

  // Обробка кнопок пагінації
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      applyFiltersAndPagination();
    }
  });

  nextPageBtn.addEventListener("click", () => {
    currentPage++;
    applyFiltersAndPagination();
  });

  // Обробник для кнопки "Active Members"
  filterActiveLink.addEventListener("click", (e) => {
    e.preventDefault();
    isFilteringActive = !isFilteringActive; // Перемикаємо фільтрацію
    currentPage = 1; // Починаємо з першої сторінки
    applyFiltersAndPagination();
  });

  fetchAndDisplayEntries(); // Початкове завантаження
});
