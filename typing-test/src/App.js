import React, { useState, useEffect } from "react";
import TypingTest from "./TypingTest";
import Auth from "./components/Auth";
import "./styles.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // eslint-disable-line no-unused-vars


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState(null);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    let unsubscribe;
    try {
      unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
    } catch (error) {
      console.error("Error setting up auth listener:", error);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [auth]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.className = darkMode ? "" : "dark";
  };

  const selectMode = (selectedMode) => {
    setMode(selectedMode);
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      {!user ? (
        <Auth />
      ) : (
        <>
          <div className="header">
            <button className="dark-toggle" onClick={toggleDarkMode}>
              {darkMode ? <FaSun /> : <FaMoon />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button 
              className="logout-btn" 
              onClick={() => auth.signOut()}
              title={user?.email || "Guest"}
            >
              <FaSignOutAlt />
              Sign Out
            </button>
          </div>
          
          <div className="main-content">
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
        </>
      )}
    </div>
  );
}


export default App;