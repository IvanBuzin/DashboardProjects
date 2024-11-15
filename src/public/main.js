// document.addEventListener("DOMContentLoaded", () => {
//   // Перевірка наявності елементів
//   const paginationInfo = document.getElementById("pagination-info");
//   const paginationList = document.getElementById("pagination-list");
//   const prevPageBtn = document.getElementById("prev-page");
//   const nextPageBtn = document.getElementById("next-page");
//   const entriesContainer = document.getElementById("entries-container");

//   // Перевірка, чи всі елементи знайдені на сторінці
//   if (
//     !paginationInfo ||
//     !paginationList ||
//     !prevPageBtn ||
//     !nextPageBtn ||
//     !entriesContainer
//   ) {
//     console.error("Не знайдені деякі елементи DOM. Перевірте HTML структуру.");
//     return; // Якщо хоча б один елемент не знайдений, зупиняємо виконання скрипта
//   }

//   // Початкові значення
//   let currentPage = 1; // Поточна сторінка
//   const recordsPerPage = 8; // Кількість записів на сторінку

//   // Функція для оновлення пагінації на основі загальної кількості записів
//   function updatePagination(totalEntries) {
//     const totalPages = Math.ceil(totalEntries / recordsPerPage); // Загальна кількість сторінок

//     // Оновлення інформації про пагінацію
//     paginationInfo.textContent = `Показано дані з ${
//       (currentPage - 1) * recordsPerPage + 1
//     } по ${Math.min(
//       currentPage * recordsPerPage,
//       totalEntries
//     )} з ${totalEntries} записів`;

//     // Оновлення списку сторінок
//     paginationList.innerHTML = ""; // Очищення списку пагінації
//     for (let i = 1; i <= totalPages; i++) {
//       const pageItem = document.createElement("li");
//       pageItem.classList.add("page-item");

//       const pageLink = document.createElement("a");
//       pageLink.href = "#";
//       pageLink.textContent = i;
//       pageLink.dataset.page = i; // Додаємо атрибут data-page для ідентифікації сторінки

//       // Додаємо обробник події на клік для переходу на вибрану сторінку
//       pageLink.addEventListener("click", (e) => {
//         e.preventDefault();
//         currentPage = i; // Оновлюємо поточну сторінку
//         fetchAndDisplayEntries(); // Завантажуємо записи для нової сторінки
//       });

//       pageItem.appendChild(pageLink);
//       paginationList.appendChild(pageItem);
//     }

//     // Умови активації/деактивації кнопок пагінації
//     prevPageBtn.disabled = currentPage === 1; // Дизейбл кнопки "Попередня" на першій сторінці
//     nextPageBtn.disabled = currentPage === totalPages; // Дизейбл кнопки "Наступна" на останній сторінці
//   }

//   // Функція для отримання записів для поточної сторінки
//   function fetchAndDisplayEntries() {
//     // Запит на сервер для отримання записів для поточної сторінки
//     fetch(`src/json/cost.json?page=${currentPage}&limit=${recordsPerPage}`)
//       .then((response) => response.json())
//       .then((data) => {
//         // Перевірка на наявність даних у відповіді
//         if (!data || !data.totalRecords || !data.records) {
//           throw new Error("Невірний формат даних");
//         }
//         updatePagination(data.totalRecords); // Оновлюємо пагінацію
//         displayEntries(data.records); // Виводимо записи на сторінці
//       })
//       .catch((error) => {
//         console.error("Помилка при завантаженні даних:", error);
//         entriesContainer.innerHTML = "Не вдалося завантажити дані.";
//       });
//   }

//   // Функція для відображення записів на сторінці
//   function displayEntries(entries) {
//     entriesContainer.innerHTML = ""; // Очищаємо контейнер записів

//     // Якщо записи не знайдені або масив порожній
//     if (!Array.isArray(entries) || entries.length === 0) {
//       entriesContainer.textContent = "Немає записів для відображення";
//       return;
//     }

//     // Виводимо кожен запис
//     entries.forEach((entry) => {
//       const entryDiv = document.createElement("div");
//       entryDiv.classList.add("entry");

//       // Виводимо дані з запису (замінити поля відповідно до JSON)
//       entryDiv.innerHTML = `
//       <div class="content-table">
//         <p>${entry.CustomerName}</p>
//         <p>${entry.Company}</p>
//         <p>${entry.PhoneNumber}</p>
//         <p>${entry.Email}</p>
//         <p>${entry.Country}</p>
//         <p>
//           <span class="status ${
//             entry.Status === "Active" ? "active" : "inactive"
//           }">
//            ${entry.Status}
//            </span>
//         </p>
//       </div>
//       `;

//       // Додаємо запис до контейнера
//       entriesContainer.appendChild(entryDiv);
//     });
//   }

//   // Обробники подій для кнопок пагінації
//   prevPageBtn.addEventListener("click", () => {
//     if (currentPage > 1) {
//       currentPage--; // Перехід на попередню сторінку
//       fetchAndDisplayEntries(); // Оновлюємо записи для нової сторінки
//     }
//   });

//   nextPageBtn.addEventListener("click", () => {
//     currentPage++; // Перехід на наступну сторінку
//     fetchAndDisplayEntries(); // Оновлюємо записи для нової сторінки
//   });

//   // Ініціалізація пагінації при першому завантаженні сторінки
//   fetchAndDisplayEntries(); // Отримуємо та відображаємо записи для першої сторінки
// });

document.addEventListener("DOMContentLoaded", () => {
  // Перевірка наявності елементів
  const paginationInfo = document.getElementById("pagination-info");
  const paginationList = document.getElementById("pagination-list");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const entriesContainer = document.getElementById("entries-container");

  // Перевірка, чи всі елементи знайдені на сторінці
  if (
    !paginationInfo ||
    !paginationList ||
    !prevPageBtn ||
    !nextPageBtn ||
    !entriesContainer
  ) {
    console.error("Не знайдені деякі елементи DOM. Перевірте HTML структуру.");
    return; // Якщо хоча б один елемент не знайдений, зупиняємо виконання скрипта
  }

  // Початкові значення
  let currentPage = 1; // Поточна сторінка
  const recordsPerPage = 8; // Кількість записів на сторінку

  // Функція для оновлення пагінації на основі загальної кількості записів
  function updatePagination(totalEntries) {
    const totalPages = Math.ceil(totalEntries / recordsPerPage); // Загальна кількість сторінок

    // Оновлення інформації про пагінацію
    paginationInfo.textContent = `Показано дані з ${
      (currentPage - 1) * recordsPerPage + 1
    } по ${Math.min(
      currentPage * recordsPerPage,
      totalEntries
    )} з ${totalEntries} записів`;

    // Оновлення списку сторінок
    paginationList.innerHTML = ""; // Очищення списку пагінації
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement("li");
      pageItem.classList.add("page-item");

      const pageLink = document.createElement("a");
      pageLink.href = "#";
      pageLink.textContent = i;
      pageLink.dataset.page = i; // Додаємо атрибут data-page для ідентифікації сторінки

      // Додаємо обробник події на клік для переходу на вибрану сторінку
      pageLink.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = i; // Оновлюємо поточну сторінку
        fetchAndDisplayEntries(); // Завантажуємо записи для нової сторінки
      });

      pageItem.appendChild(pageLink);
      paginationList.appendChild(pageItem);
    }

    // Умови активації/деактивації кнопок пагінації
    prevPageBtn.disabled = currentPage === 1; // Дизейбл кнопки "Попередня" на першій сторінці
    nextPageBtn.disabled = currentPage === totalPages; // Дизейбл кнопки "Наступна" на останній сторінці
  }

  // Функція для отримання записів для поточної сторінки
  function fetchAndDisplayEntries() {
    // Запит на сервер для отримання записів для поточної сторінки
    fetch(`/json/cost.json?page=${currentPage}&limit=${recordsPerPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Помилка на сервері, спробуйте пізніше.");
        }
        return response.json();
      })
      .then((data) => {
        // Перевірка на наявність даних у відповіді
        if (!data || !data.totalEntries || !data.entries) {
          throw new Error("Невірний формат даних");
        }
        updatePagination(data.totalEntries); // Оновлюємо пагінацію
        displayEntries(data.entries); // Виводимо записи на сторінці
      })
      .catch((error) => {
        console.error("Помилка при завантаженні даних:", error);
        entriesContainer.innerHTML = "Не вдалося завантажити дані.";
      });
  }

  // Функція для відображення записів на сторінці
  function displayEntries(entries) {
    entriesContainer.innerHTML = ""; // Очищаємо контейнер записів

    // Якщо записи не знайдені або масив порожній
    if (!Array.isArray(entries) || entries.length === 0) {
      entriesContainer.textContent = "Немає записів для відображення";
      return;
    }

    // Виводимо кожен запис
    entries.forEach((entry) => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry");

      // Виводимо дані з запису (замінити поля відповідно до JSON)
      entryDiv.innerHTML = `                
      <div class="content-table">
        <p>${entry.CustomerName}</p>
        <p>${entry.Company}</p>
        <p>${entry.PhoneNumber}</p>
        <p>${entry.Email}</p> 
        <p>${entry.Country}</p>
        <p>
          <span class="status ${
            entry.Status === "Active" ? "active" : "inactive"
          }">
           ${entry.Status}
           </span>
        </p>
      </div>
      `;

      // Додаємо запис до контейнера
      entriesContainer.appendChild(entryDiv);
    });
  }

  // Обробники подій для кнопок пагінації
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--; // Перехід на попередню сторінку
      fetchAndDisplayEntries(); // Оновлюємо записи для нової сторінки
    }
  });

  nextPageBtn.addEventListener("click", () => {
    currentPage++; // Перехід на наступну сторінку
    fetchAndDisplayEntries(); // Оновлюємо записи для нової сторінки
  });

  // Ініціалізація пагінації при першому завантаженні сторінки
  fetchAndDisplayEntries(); // Отримуємо та відображаємо записи для першої сторінки
});
