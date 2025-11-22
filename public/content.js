chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_HTML") {
    const html = document.documentElement.outerHTML;
    console.log(html)
    sendResponse({ html });
  }
  return true;
});