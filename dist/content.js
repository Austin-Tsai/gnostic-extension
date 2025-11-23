let waitTime = 100;
let timeoutId = null;

function getHtml() {
  const html = document.documentElement.outerHTML;
  console.log("HTML received:", html);
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