// import axios from "axios"

let waitTime = 100;
let timeoutId = null;

function getHtml(useML) {
  const html = document.documentElement.outerHTML;
  console.log("HTML received:", html);
  console.log(useML)
  sendHtml(html, window.location.href, useML);
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_HTML") {
    getHtml(msg.useML)
    // const html = document.documentElement.outerHTML;
    // console.log(html)
    // sendResponse({ html });
  }
  return true;
});

chrome.storage.local.get(["waitTime"], (saved) => {
  if (saved.waitTime) waitTime = Number(saved.waitTime);
  scheduleTimeout();
});

function scheduleTimeout() {
  if (timeoutId) clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    getHtml();
  }, waitTime * 1000);
}

// async function sendHtml(html, url) {
//   const endpoint = "http://localhost:8000"
//   try {
//     const response = await axios.post(endpoint, html, {
//       headers: {
//         'Content-Type': 'text/plain',
//         'url': url,
//       }
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error sending data:', error);
//   }
// }

async function sendHtml(html, url, useML) {
  const endpoint = "http://localhost:8000";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "url": url,
        "useML": (useML ? "True" : "False")
      },
      body: html
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text(); // or response.json() if server returns JSON
    console.log(data);
  } catch (error) {
    console.error("Error sending data:", error);
  }
}