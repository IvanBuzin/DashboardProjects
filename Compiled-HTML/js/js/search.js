document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const entriesContainer = document.getElementById("entries-container");

  if (!searchInput || !entriesContainer) {
    console.error("Не знайдені елементи для пошуку. Перевірте HTML.");
    return;
  }

  let currentPage = 1;
  const recordsPerPage = 8;
  let fullData = []; // Усі записи, завантажені з JSON

  function fetchAndDisplayEntries(searchQuery = "") {
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
        const filteredData = fullData.filter((entry) =>
          Object.values(entry).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
          )
        );

        const totalEntries = filteredData.length;
        updatePagination(totalEntries);

        const start = (currentPage - 1) * recordsPerPage;
        const end = start + recordsPerPage;
        const entriesToShow = filteredData.slice(start, end);

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

  // Додаємо подію для пошуку по введенню тексту
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    currentPage = 1; // Повертаємося на першу сторінку після нового пошуку
    fetchAndDisplayEntries(query);
  });

  fetchAndDisplayEntries(); // Завантаження даних при старті сторінки
});
