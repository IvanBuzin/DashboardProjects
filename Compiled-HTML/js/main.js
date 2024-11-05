import "./js/animateNewRows.js";
import "./js/animateTable.js";
import "./js/animateNewRows.js";
import "./js/newCustomer.js";
import "./js/app.js";
import "./js/pagination.js";
import "./js/server.js";

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'"
  );
  next();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "someMessage") {
    setTimeout(() => {
      sendResponse({ result: "response" });
    }, 1000);
    return true;
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
    return true;
  }

  return false;
});
