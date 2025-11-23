import axios from 'axios'

let waitTime = 100;
let timeoutId = null;

function getHtml() {
  const html = document.documentElement.outerHTML;
  console.log("HTML received:", html);
  sendHtml(html, window.location.href);
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_HTML") {
    getHtml()
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

async function sendHtml(html, url) {
  const endpoint = "http://localhost:8000"
  try {
    const response = await axios.post(endpoint, html, {
      headers: {
        'Content-Type': 'text/plain',
        'url': url,
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error sending data:', error);
  }
}