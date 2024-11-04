import "./js/animateNewRows";
import "./js/animateTable";
import "./js/animateNewRows";
import "./js/newCustomer";
import "./js/app";
import "./js/pagination";
import "./js/server";

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
