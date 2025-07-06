import React, { useState } from "react";
import TypingTest from "./TypingTest";
import "./styles.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState(null); 

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.className = darkMode ? "" : "dark";
  };

  const selectMode = (selectedMode) => {
    setMode(selectedMode);
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <div className="header">
        <button className="dark-toggle" onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      
      {!mode ? (
        <div className="mode-selection">
          <h2>Select Difficulty Mode</h2>
          <div className="mode-buttons">
            <button className="mode-button easy" onClick={() => selectMode('easy')}>
              Easy
            </button>
            <button className="mode-button medium" onClick={() => selectMode('medium')}>
              Medium
            </button>
            <button className="mode-button fast" onClick={() => selectMode('fast')}>
              Fast
            </button>
          </div>
        </div>
      ) : (
        <TypingTest mode={mode} onModeChange={setMode} />
      )}
    </div>
    
  );
}


export default App;