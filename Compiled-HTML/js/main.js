// document.addEventListener("DOMContentLoaded", () => {
//   const paginationInfo = document.getElementById("pagination-info");
//   const paginationList = document.getElementById("pagination-list");
//   const prevPageBtn = document.getElementById("prev-page");
//   const nextPageBtn = document.getElementById("next-page");
//   const entriesContainer = document.getElementById("entries-container");

//   if (
//     !paginationInfo ||
//     !paginationList ||
//     !prevPageBtn ||
//     !nextPageBtn ||
//     !entriesContainer
//   ) {
//     console.error("Не знайдені деякі елементи DOM. Перевірте HTML структуру.");
//     return;
//   }

//   let currentPage = 1;
//   const recordsPerPage = 8;

//   function updatePagination(totalEntries) {
//     const totalPages = Math.ceil(totalEntries / recordsPerPage);

//     // Оновлюємо інформацію про записи
//     paginationInfo.textContent = `Showing data ${
//       (currentPage - 1) * recordsPerPage + 1
//     } to ${Math.min(
//       currentPage * recordsPerPage,
//       totalEntries
//     )} of ${totalEntries} entries`;

//     // Очищення списку сторінок
//     paginationList.innerHTML = "";

//     // Відображення кнопки "Попередня"
//     prevPageBtn.classList.toggle("left-disabled", currentPage === 1);

//     // Відображення сторінок
//     for (let i = 1; i <= totalPages; i++) {
//       if (
//         i === 1 || // Перша сторінка
//         i === totalPages || // Остання сторінка
//         (i >= currentPage - 1 && i <= currentPage + 1) // Поточна, попередня та наступна
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
//           currentPage = i;
//           fetchAndDisplayEntries();
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

//     // Відображення кнопки "Наступна"
//     nextPageBtn.classList.toggle(
//       "pagination-right-disabled",
//       currentPage === totalPages
//     );
//   }

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

//         const totalEntries = data.entries.length;
//         updatePagination(totalEntries);

//         const start = (currentPage - 1) * recordsPerPage;
//         const end = start + recordsPerPage;
//         const entriesToShow = data.entries.slice(start, end);

//         displayEntries(entriesToShow);
//       })
//       .catch((error) => {
//         console.error("Помилка при завантаженні даних:", error);
//         entriesContainer.innerHTML = "Не вдалося завантажити дані.";
//       });
//   }

//   function displayEntries(entries) {
//     entriesContainer.innerHTML = `
//     <div class="hover-table">
//         <p class="name">Customer Name</p>
//         <p class="company">Company</p>
//         <p class="number">Phone Number</p>
//         <p class="email">Email</p>
//         <p class="country">Country</p>
//         <p class="status">Status</p>
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

//   prevPageBtn.addEventListener("click", () => {
//     if (currentPage > 1) {
//       currentPage--;
//       fetchAndDisplayEntries();
//     }
//   });

//   nextPageBtn.addEventListener("click", () => {
//     currentPage++;
//     fetchAndDisplayEntries();
//   });

//   fetchAndDisplayEntries();
// });
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
  let totalPages = 0;

  // Оновлення пагінації
  function updatePagination(totalEntries) {
    totalPages = Math.ceil(totalEntries / recordsPerPage);

    // Оновлюємо інформацію про кількість записів
    paginationInfo.textContent = `Showing data ${
      (currentPage - 1) * recordsPerPage + 1
    } to ${Math.min(
      currentPage * recordsPerPage,
      totalEntries
    )} of ${totalEntries} entries`;

    // Очищення списку сторінок
    paginationList.innerHTML = "";

    // Оновлюємо стан кнопок
    prevPageBtn.classList.toggle("left-disabled", currentPage === 1);
    nextPageBtn.classList.toggle(
      "pagination-right-disabled",
      currentPage === totalPages
    );

    // Відображення сторінок
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Перша сторінка
        i === totalPages || // Остання сторінка
        (i >= currentPage - 1 && i <= currentPage + 1) // Поточна, попередня та наступна
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
            fetchAndDisplayEntries();
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

  // Відображення записів
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

  // Обробка кнопок пагінації
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchAndDisplayEntries();
    }
  });

  nextPageBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      fetchAndDisplayEntries();
    }
  });

  fetchAndDisplayEntries(); // Початкове завантаження
});
