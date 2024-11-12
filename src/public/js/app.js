document.addEventListener("DOMContentLoaded", () => {
  const paginationInfo = document.getElementById("pagination-info");
  const paginationList = document.getElementById("pagination-list");
  const prevPageBtn = document.getElementById("prev-page"); // Переконайтесь, що в HTML є цей елемент
  const nextPageBtn = document.getElementById("next-page"); // Переконайтесь, що в HTML є цей елемент
  const entriesContainer = document.getElementById("entries-container");

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
    // Викликаємо API для отримання записів на поточній сторінці
    fetch(`/json/cost.json?page=${currentPage}&limit=${recordsPerPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Помилка при завантаженні даних");
        }
        return response.json();
      })
      .then((data) => {
        updatePagination(data.totalRecords); // Оновлення пагінації
        displayEntries(data.records); // Виведення записів на сторінку
      })
      .catch((error) => {
        console.error("Помилка при завантаженні даних:", error);
        entriesContainer.innerHTML = "Не вдалося завантажити дані.";
      });
  }

  // Функція для відображення записів на сторінці
  function displayEntries(entries) {
    entriesContainer.innerHTML = ""; // Очищаємо контейнер записів

    if (!Array.isArray(entries) || entries.length === 0) {
      // Якщо entries не є масивом або масив порожній
      entriesContainer.textContent = "Немає записів для відображення";
      return;
    }

    // Виводимо записи
    entries.forEach((entry) => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry");

      // Створюємо HTML контент для кожного запису
      entryDiv.innerHTML = `
        <p><strong>Customer Name:</strong> ${entry.CustomerName}</p>
        <p><strong>Company:</strong> ${entry.Company}</p>
        <p><strong>Phone:</strong> ${entry.PhoneNumber}</p>
        <p><strong>Email:</strong> ${entry.Email}</p>
        <p><strong>Country:</strong> ${entry.Country}</p>
        <p><strong>Status:</strong> ${entry.Status}</p>
      `;

      // Додаємо запис до контейнера
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
