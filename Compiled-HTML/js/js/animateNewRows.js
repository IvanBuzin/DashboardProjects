function addNewCustomerRow(customer) {
  const tableBody = document.querySelector(".customer-table tbody");
  const newRow = document.createElement("tr");

  // Додаємо дані клієнта до нового рядка
  newRow.innerHTML = `
        <td>${customer.name}</td>
        <td>${customer.company}</td>
        <td>${customer.phone}</td>
        <td>${customer.email}</td>
        <td>${customer.country}</td>
        <td>${customer.status}</td>
    `;

  // Додаємо рядок до таблиці
  tableBody.appendChild(newRow);

  // Додаємо клас анімації
  newRow.classList.add("row-animate");

  // Після анімації, прибираємо клас
  setTimeout(function () {
    newRow.classList.remove("row-animate");
  }, 1000);
}
