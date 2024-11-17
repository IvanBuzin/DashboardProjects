// document.addEventListener("DOMContentLoaded", () => {
//   const formulario = document.querySelector("#nuevo-cliente");

//   // Перевірка наявності форми
//   if (formulario) {
//     formulario.addEventListener("submit", agregarCliente);
//   } else {
//     console.error("Form element with ID 'nuevo-cliente' not found.");
//   }
// });

// function agregarCliente(e) {
//   e.preventDefault();

//   // Збираємо дані з форми
//   const customer = {
//     CustomerName: sanitizeInput(document.querySelector("#customerName").value),
//     Company: sanitizeInput(document.querySelector("#company").value),
//     PhoneNumber: sanitizeInput(document.querySelector("#phoneNumber").value),
//     Email: sanitizeInput(document.querySelector("#email").value),
//     Country: sanitizeInput(document.querySelector("#country").value),
//     Status: sanitizeInput(document.querySelector("#status").value),
//   };

//   // Перевірка на коректність введених даних
//   const validationResult = validateCustomer(customer);
//   if (validationResult.isValid) {
//     // Додавання нового рядка клієнта
//     addNewCustomerRow(customer);

//     // Скидаємо форму
//     e.target.reset();
//     alert("New customer added successfully!");
//   } else {
//     // Відображення помилки
//     alert(validationResult.message);
//   }
// }

// // Функція для очищення введених даних
// function sanitizeInput(input) {
//   return input.trim(); // Видалення пробілів з початку та кінця
// }

// // Функція для валідації даних клієнта
// function validateCustomer(customer) {
//   if (!customer.CustomerName)
//     return { isValid: false, message: "Customer Name is required." };
//   if (!customer.Company)
//     return { isValid: false, message: "Company is required." };
//   if (!customer.PhoneNumber)
//     return { isValid: false, message: "Phone Number is required." };
//   if (!validateEmail(customer.Email))
//     return { isValid: false, message: "Invalid email address." };
//   if (!customer.Country)
//     return { isValid: false, message: "Country is required." };
//   if (!customer.Status)
//     return { isValid: false, message: "Status is required." };

//   return { isValid: true, message: "" };
// }

// // Функція для валідації email
// function validateEmail(email) {
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return re.test(email);
// }

// // Функція для додавання нового клієнта в таблицю
// function addNewCustomerRow(customer) {
//   const tableBody = document.querySelector(".customers-table tbody");

//   if (!tableBody) {
//     console.error("Table body not found.");
//     return;
//   }

//   const newRow = document.createElement("tr");

//   newRow.innerHTML = `
//     <td>${customer.CustomerName}</td>
//     <td>${customer.Company}</td>
//     <td>${customer.PhoneNumber}</td>
//     <td>${customer.Email}</td>
//     <td>${customer.Country}</td>
//     <td>
//       <span class="status ${
//         customer.Status === "Active" ? "active" : "inactive"
//       }">
//         ${customer.Status}
//       </span>
//     </td>
//   `;

//   // Додавання нового рядка до таблиці
//   tableBody.appendChild(newRow);
// }
