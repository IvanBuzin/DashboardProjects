// document.addEventListener("DOMContentLoaded", () => {
//   const paginationInfo = document.getElementById("pagination-info");
//   const paginationList = document.getElementById("pagination-list");
//   const prevPageBtn = document.getElementById("prev-page");
//   const nextPageBtn = document.getElementById("next-page");

//   let currentPage = 1; // Змінна для зберігання поточної сторінки
//   const recordsPerPage = 8; // Кількість записів на сторінку

//   // Функція для оновлення даних пагінації
//   function updatePagination(totalEntries) {
//     const totalPages = Math.ceil(totalEntries / recordsPerPage); // Загальна кількість сторінок

//     // Оновлення інформації про пагінацію
//     paginationInfo.textContent = `Showing data ${
//       (currentPage - 1) * recordsPerPage + 1
//     } to ${Math.min(
//       currentPage * recordsPerPage,
//       totalEntries
//     )} of ${totalEntries} entries`;

//     // Динамічне оновлення списку пагінації
//     paginationList.innerHTML = ""; // Очищення
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
//         fetchAndDisplayEntries(); // Функція для отримання та відображення записів
//       });

//       pageItem.appendChild(pageLink);
//       paginationList.appendChild(pageItem);
//     }

//     // Умови активації кнопок "Попередня" та "Наступна" сторінки
//     prevPageBtn.disabled = currentPage === 1; // Дизейбл кнопки "Попередня" на першій сторінці
//     nextPageBtn.disabled = currentPage === totalPages; // Дизейбл кнопки "Наступна" на останній сторінці
//   }

//   // Функція для отримання загальної кількості записів і оновлення пагінації
//   function fetchAndDisplayEntries() {
//     fetch("/api/entries/count")
//       .then((response) => response.json())
//       .then((data) => {
//         updatePagination(data.total);
//         obtenerClientes(currentPage); // Функція для отримання клієнтів на поточній сторінці
//       })
//       .catch((error) => console.error("Помилка:", error));
//   }

//   // Обробники подій для кнопок пагінації
//   prevPageBtn.addEventListener("click", () => {
//     if (currentPage > 1) {
//       currentPage--;
//       fetchAndDisplayEntries(); // Оновлення записів на попередній сторінці
//     }
//   });

//   nextPageBtn.addEventListener("click", () => {
//     fetch("/api/entries/count")
//       .then((response) => response.json())
//       .then((data) => {
//         const totalPages = Math.ceil(data.total / recordsPerPage);
//         if (currentPage < totalPages) {
//           currentPage++;
//           fetchAndDisplayEntries(); // Оновлення записів на наступній сторінці
//         }
//       })
//       .catch((error) => console.error("Помилка:", error));
//   });

//   // Ініціалізація пагінації
//   fetchAndDisplayEntries();
// });
// document.addEventListener("DOMContentLoaded", () => {
//   const listadoClientes = document.querySelector("#listado-clientes");
//   const paginationInfo = document.getElementById("pagination-info");
//   const paginationList = document.getElementById("pagination-list");

//   const recordsPerPage = 8; // Кількість записів на сторінку
//   let currentPage = 1;
//   let customers = [];

//   // Отримуємо дані з customers.json
//   fetch("json/customers.json")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       customers = data; // Зберігаємо дані у змінну
//       updatePagination(customers.length); // Оновлюємо пагінацію
//       obtenerClientes(currentPage); // Виводимо клієнтів на початку
//     })
//     .catch((error) =>
//       console.error("Error loading customers from JSON:", error)
//     );

//   // Функція для оновлення даних пагінації
//   function updatePagination(totalEntries) {
//     paginationInfo.textContent = `Showing data 1 to ${Math.min(
//       recordsPerPage,
//       totalEntries
//     )} of ${totalEntries} entries`;

//     // Оновлення списку пагінації
//     paginationList.innerHTML = ""; // Очищення
//     const totalPages = Math.ceil(totalEntries / recordsPerPage);
//     for (let i = 1; i <= totalPages; i++) {
//       const pageItem = document.createElement("li");
//       pageItem.classList.add("page-item");
//       const pageLink = document.createElement("a");
//       pageLink.href = "#";
//       pageLink.textContent = i;
//       pageLink.dataset.page = i; // Додаємо атрибут для отримання номера сторінки
//       pageItem.appendChild(pageLink);
//       paginationList.appendChild(pageItem);
//     }
//   }

//   // Функція для отримання клієнтів на поточній сторінці
//   function obtenerClientes(page) {
//     const startRecord = (page - 1) * recordsPerPage;
//     const endRecord = Math.min(startRecord + recordsPerPage, customers.length);

//     listadoClientes.innerHTML = ""; // Очищення таблиці перед додаванням нових записів

//     for (let i = startRecord; i < endRecord; i++) {
//       const customer = customers[i];
//       listadoClientes.innerHTML += `
//         <tr>
//           <td>${customer.CustomerName}</td>
//           <td>${customer.Company}</td>
//           <td>${customer.PhoneNumber}</td>
//           <td>${customer.Email}</td>
//           <td>${customer.Country}</td>
//           <td>${customer.Status}</td>
//           <td>
//             <a href="editar-cliente.html?id=${i}" class="btn btn-modificar">Edit</a>
//             <a href="#" data-cliente="${i}" class="btn btn-delete delete">Delete</a>
//           </td>
//         </tr>
//       `;
//     }
//   }

//   // Додайте обробники для пагінації
//   paginationList.addEventListener("click", (e) => {
//     if (e.target.tagName === "A") {
//       e.preventDefault();
//       currentPage = parseInt(e.target.dataset.page);
//       obtenerClientes(currentPage); // Оновлення клієнтів при зміні сторінки
//     }
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  const paginationInfo = document.getElementById("pagination-info");
  const paginationList = document.getElementById("pagination-list");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");

  let currentPage = 1; // Змінна для зберігання поточної сторінки
  const recordsPerPage = 8; // Кількість записів на сторінку

  // Функція для оновлення даних пагінації
  function updatePagination(totalEntries) {
    const totalPages = Math.ceil(totalEntries / recordsPerPage); // Загальна кількість сторінок

    // Оновлення інформації про пагінацію
    paginationInfo.textContent = `Показано дані з ${
      (currentPage - 1) * recordsPerPage + 1
    } по ${Math.min(
      currentPage * recordsPerPage,
      totalEntries
    )} з ${totalEntries} записів`;

    // Динамічне оновлення списку пагінації
    paginationList.innerHTML = ""; // Очищення
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
        fetchAndDisplayEntries(); // Функція для отримання та відображення записів
      });

      pageItem.appendChild(pageLink);
      paginationList.appendChild(pageItem);
    }

    // Умови активації кнопок "Попередня" та "Наступна" сторінки
    prevPageBtn.disabled = currentPage === 1; // Дизейбл кнопки "Попередня" на першій сторінці
    nextPageBtn.disabled = currentPage === totalPages; // Дизейбл кнопки "Наступна" на останній сторінці
  }

  // Функція для отримання записів на поточній сторінці
  function fetchAndDisplayEntries() {
    fetch(`/api/entries?page=${currentPage}&limit=${recordsPerPage}`)
      .then((response) => response.json())
      .then((data) => {
        updatePagination(data.total); // Оновлення пагінації
        displayEntries(data.entries); // Виведення записів на сторінку
      })
      .catch((error) =>
        console.error("Помилка при завантаженні даних:", error)
      );
  }

  // Функція для відображення записів на сторінці
  function displayEntries(entries) {
    const entriesContainer = document.getElementById("entries-container");
    entriesContainer.innerHTML = ""; // Очищаємо контейнер

    entries.forEach((entry) => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry");
      entryDiv.textContent = `Запис: ${entry.id}, ${entry.name}`;
      entriesContainer.appendChild(entryDiv);
    });
  }

  // Обробники подій для кнопок пагінації
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--; // Переходимо на попередню сторінку
      fetchAndDisplayEntries(); // Оновлюємо запис на поточній сторінці
    }
  });

  nextPageBtn.addEventListener("click", () => {
    currentPage++; // Переходимо на наступну сторінку
    fetchAndDisplayEntries(); // Оновлюємо запис на поточній сторінці
  });

  // Ініціалізація пагінації при першому завантаженні сторінки
  fetchAndDisplayEntries();
});
