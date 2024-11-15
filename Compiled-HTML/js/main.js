document.addEventListener("DOMContentLoaded", () => {
  const paginationInfo = document.getElementById("pagination-info");
  const paginationList = document.getElementById("pagination-list");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const entriesContainer = document.getElementById("entries-container");

  if (
    !paginationInfo ||
    !paginationList ||
    !prevPageBtn ||
    !nextPageBtn ||
    !entriesContainer
  ) {
    console.error("Не знайдені деякі елементи DOM. Перевірте HTML структуру.");
    return;
  }

  let currentPage = 1;
  const recordsPerPage = 8;

  // function updatePagination(totalEntries) {
  //   const totalPages = Math.ceil(totalEntries / recordsPerPage);

  //   paginationInfo.textContent = `Показано дані з ${
  //     (currentPage - 1) * recordsPerPage + 1
  //   } по ${Math.min(
  //     currentPage * recordsPerPage,
  //     totalEntries
  //   )} з ${totalEntries} записів`;

  //   paginationList.innerHTML = "";
  //   for (let i = 1; i <= totalPages; i++) {
  //     const pageItem = document.createElement("li");
  //     pageItem.classList.add("page-item");

  //     const pageLink = document.createElement("a");
  //     pageLink.href = "#";
  //     pageLink.textContent = i;
  //     pageLink.dataset.page = i;

  //     pageLink.addEventListener("click", (e) => {
  //       e.preventDefault();
  //       currentPage = i;
  //       fetchAndDisplayEntries();
  //     });

  //     pageItem.appendChild(pageLink);
  //     paginationList.appendChild(pageItem);
  //   }

  //   prevPageBtn.disabled = currentPage === 1;
  //   nextPageBtn.disabled = currentPage === totalPages;
  // }
  function updatePagination(totalEntries) {
    const totalPages = Math.ceil(totalEntries / recordsPerPage);
    paginationInfo.textContent = `Показано дані з ${
      (currentPage - 1) * recordsPerPage + 1
    } по ${Math.min(
      currentPage * recordsPerPage,
      totalEntries
    )} з ${totalEntries} записів`;

    paginationList.innerHTML = ""; // Очищення списку пагінації

    // Додаємо кнопку "Попередня"
    const prevItem = document.createElement("li");
    prevItem.classList.add("page-item");
    prevItem.innerHTML = `<a href="#" class="page-link">&lt;</a>`;
    prevItem.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        fetchAndDisplayEntries();
      }
    });
    paginationList.appendChild(prevItem);
    prevItem.classList.toggle("disabled", currentPage === 1);

    // Логіка для скороченої пагінації
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Перша сторінка
        i === totalPages || // Остання сторінка
        (i >= currentPage - 1 && i <= currentPage + 1) // Поточна, попередня та наступна сторінки
      ) {
        const pageItem = document.createElement("li");
        pageItem.classList.add("page-item");

        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.dataset.page = i;
        pageLink.classList.add("page-link");

        if (i === currentPage) {
          pageItem.classList.add("active");
        }

        pageLink.addEventListener("click", (e) => {
          e.preventDefault();
          currentPage = i;
          fetchAndDisplayEntries();
        });

        pageItem.appendChild(pageLink);
        paginationList.appendChild(pageItem);
      } else if (
        (i === currentPage - 2 && currentPage > 3) ||
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        // Додаємо "..." для пропущених сторінок
        const dots = document.createElement("li");
        dots.classList.add("page-item", "disabled");
        dots.innerHTML = `<span class="page-link">...</span>`;
        paginationList.appendChild(dots);
      }
    }

    // Додаємо кнопку "Наступна"
    const nextItem = document.createElement("li");
    nextItem.classList.add("page-item");
    nextItem.innerHTML = `<a href="#" class="page-link">&gt;</a>`;
    nextItem.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        fetchAndDisplayEntries();
      }
    });
    paginationList.appendChild(nextItem);
    nextItem.classList.toggle("disabled", currentPage === totalPages);
  }

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

        const totalEntries = data.entries.length;
        updatePagination(totalEntries);

        const start = (currentPage - 1) * recordsPerPage;
        const end = start + recordsPerPage;
        const entriesToShow = data.entries.slice(start, end);

        displayEntries(entriesToShow);
      })
      .catch((error) => {
        console.error("Помилка при завантаженні даних:", error);
        entriesContainer.innerHTML = "Не вдалося завантажити дані.";
      });
  }

  function displayEntries(entries) {
    entriesContainer.innerHTML = ` 
    <div class="hover-table">
        <p class="name">Customer Name</p>
        <p class="company">Company</p> 
        <p class="number">Phone Number</p>
        <p class="email">Email</p>
        <p class="country">Country</p>
        <p class="status">Status</p>
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

  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchAndDisplayEntries();
    }
  });

  nextPageBtn.addEventListener("click", () => {
    currentPage++;
    fetchAndDisplayEntries();
  });

  fetchAndDisplayEntries();
});
