// document.addEventListener("DOMContentLoaded", () => {
//   const formulario = document.querySelector("#nuevo-cliente");

//   // Перевірка наявності форми перед додаванням обробника
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

//   // Перевірка на коректність введених даних перед додаванням
//   if (validateCustomer(customer)) {
//     // Викликаємо функцію для додавання нового клієнта
//     addNewCustomerRow(customer);

//     // Скидаємо форму після додавання
//     e.target.reset();
//     alert("New customer added successfully!");
//   } else {
//     alert("Please fill out all fields correctly.");
//   }
// }

// // Функція для санітарії введення
// function sanitizeInput(input) {
//   return input.trim(); // Вилучає пробіли на початку і в кінці
// }

// // Функція для валідації даних клієнта
// function validateCustomer(customer) {
//   return (
//     customer.CustomerName &&
//     customer.Company &&
//     customer.PhoneNumber &&
//     validateEmail(customer.Email) &&
//     customer.Country &&
//     customer.Status
//   );
// }

// // Функція для валідації email
// function validateEmail(email) {
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Проста регулярка для перевірки email
//   return re.test(email);
// }
