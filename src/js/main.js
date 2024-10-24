import "./animateTable";
import "./animateTableRows";
import "./animateNewRows";
import "./newCustomer";
import "./app";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "someMessage") {
    // Вказуємо, що відповідь буде асинхронною
    setTimeout(() => {
      sendResponse({ result: "response" });
    }, 1000);
    return true; // Без цього браузер чекає асинхронну відповідь
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message);

  if (message.action === "getData") {
    fetchData()
      .then((data) => {
        sendResponse({ data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        sendResponse({ error: "Failed to get data" });
      });
    return true; // Повертаємо true для асинхронної відповіді
  }

  return false; // Якщо немає асинхронних дій
});
