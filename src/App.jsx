import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const getHtml = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "GET_HTML" },
        (response) => {
          console.log(response.html);
        }
      );
    });
  };

  return (
    <>
      <button onClick={getHtml}>Submit</button>
    </>
  )
}

export default App