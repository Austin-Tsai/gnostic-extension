import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [waitTime, setWaitTime] = useState(10);
  const [useML, setUseML] = useState(true);

  const getHtml = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { 
          type: "GET_HTML",
          useML: useML
        }
      );
    });
  };
  
  const saveSettings = () => {
    chrome.storage.local.set({waitTime: waitTime})
  }

  const handleWait = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    setWaitTime(value);
  }

  useEffect(() => {
    chrome.storage.local.get(["waitTime"], (saved) => {
      if (saved.waitTime) setWaitTime(saved.waitTime);
    })
  }, []);

  return (
    <>
      <div className="container">
        <div className="waiting">
          <label for="wait-time">Automatic Wait</label>
          <input 
            type="number" 
            value={waitTime} 
            onChange={handleWait} 
            name="wait-time" 
            min="0"
            onKeyDown={(e) => {
            if (
              e.key === 'e' ||
              e.key === 'E' ||
              e.key === '+' ||
              e.key === '-' ||
              e.key === '.'
            ) {
              e.preventDefault();
            }
          }}>
          </input>
        </div>
        
        <div className="useML">
          <label for="useML">Use ML Keywords</label>
          <input type="checkbox" name="useML" checked={useML} onChange={() => setUseML(!useML)} />
        </div>
        
        <div className="save">
          {/* <label id="save-label">Save Settings</label> */}
          <button onClick={saveSettings} aria-labelledby="save-label">Save Settings</button>
        </div>
        <div className="submit">
          {/* <label id="submit-label">Save Changes</label> */}
          <button onClick={getHtml} aria-labelledby="submit-label">Save Page</button>
        </div>
      </div>
    </>
  )
}

export default App