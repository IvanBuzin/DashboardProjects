document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const entriesContainer = document.getElementById("entries-container");
  const paginationList = document.getElementById("pagination-list");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");

  if (
    !searchInput ||
    !entriesContainer ||
    !paginationList ||
    !prevPageBtn ||
    !nextPageBtn
  ) {
    console.error("Не знайдені потрібні елементи. Перевірте HTML.");
    return;
  }

  let currentPage = 1;
  const recordsPerPage = 8;
  let fullData = []; // Усі записи, завантажені з JSON
  let filteredData = []; // Відфільтровані записи для відображення

  // Функція оновлення пагінації
  function updatePagination(totalEntries) {
    const totalPages = Math.ceil(totalEntries / recordsPerPage);

    // Оновлення тексту пагінації
    const paginationInfo = document.getElementById("pagination-info");
    if (paginationInfo) {
      paginationInfo.textContent = `Showing data ${
        (currentPage - 1) * recordsPerPage + 1
      } to ${Math.min(
        currentPage * recordsPerPage,
        totalEntries
      )} of ${totalEntries} entries`;
    }

    // Дезактивація кнопок
    prevPageBtn.classList.toggle("left-disabled", currentPage === 1);
    nextPageBtn.classList.toggle(
      "pagination-right-disabled",
      currentPage === totalPages
    );

    // Оновлення списку сторінок
    paginationList.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Перша сторінка
        i === totalPages || // Остання сторінка
        (i >= currentPage - 1 && i <= currentPage + 1) // Поточна, попередня і наступна сторінки
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
          currentPage = i;
          fetchAndDisplayEntries(searchInput.value.trim());
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
        <th class="name">Customer Name</th>
        <th class="company">Company</th> 
        <th class="number">Phone Number</th>
        <th class="email">Email</th>
        <th class="country">Country</th>
        <th class="statuse">Status</th>
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

  // Функція завантаження та фільтрації записів
  function fetchAndDisplayEntries(searchQuery = "") {
    const dataToShow = searchQuery
      ? fullData.filter((entry) =>
          Object.values(entry).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      : fullData;

    filteredData = dataToShow; // Оновлюємо відфільтровані дані
    const totalEntries = filteredData.length;

    updatePagination(totalEntries);

    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const entriesToShow = filteredData.slice(start, end);

    displayEntries(entriesToShow);
  }

  // Завантаження даних з JSON
  function loadData() {
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

        fullData = data.entries; // Зберігаємо всі записи
        fetchAndDisplayEntries(); // Відображаємо записи
      })
      .catch((error) => {
        console.error("Помилка при завантаженні даних:", error);
        entriesContainer.innerHTML = "Не вдалося завантажити дані.";
      });
  }

  // Подія для кнопки "Попередня"
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchAndDisplayEntries(searchInput.value.trim());
    }
  });

  // Подія для кнопки "Наступна"
  nextPageBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      fetchAndDisplayEntries(searchInput.value.trim());
    }
  });

  // Подія для пошуку
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    currentPage = 1; // Скидаємо поточну сторінку
    fetchAndDisplayEntries(query);
  });

  loadData(); // Завантаження даних при старті сторінки
});
