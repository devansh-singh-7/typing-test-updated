import React, { useState, useEffect, useRef } from "react";

const sentences = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "I love to code in JavaScript and React.",
    "The sun shines bright in the summer sky.",
    "Learning new things makes me happy.",
    "My favorite food is pizza with extra cheese.",
    "Cats and dogs are common household pets.",
    "The ocean is full of amazing creatures.",
    "Reading books helps expand your knowledge.",
    "Exercise is important for good health.",
    "Music can change your mood instantly."
  ],
  medium: [
    "Programming requires logic, creativity, and attention to detail.",
    "The five boxing wizards jump quickly as the xylophone plays.",
    "She sells seashells by the seashore on sunny summer Sundays.",
    "React hooks provide a powerful way to manage state in components.",
    "Clean code is simple, direct, and reads like well-written prose.",
    "The mysterious diary records the voice of an unknown young woman.",
    "Bright vixens jump while faking quantum leaps over lazy dogs.",
    "Accessibility should be a priority in all web applications.",
    "JavaScript is the lingua franca of web development ecosystems.",
    "Consistency is the key to mastering any new skill."
  ],
  fast: [
    "How vexingly quick daft zebras jump over the lazy fox!",
    "Pack my box with five dozen liquor jugs for the celebration.",
    "Amazingly few discotheques provide jukeboxes these days.",
    "The journey of a thousand miles begins with a single step.",
    "Crazy Frederick bought many very exquisite opal jewels.",
    "Quick zephyrs blow, vexing daft Jim who quickly ran away.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Artificial intelligence is transforming industries worldwide.",
    "TypeScript adds static typing to JavaScript for better tooling.",
    "To be or not to be, that is the question from Shakespeare's Hamlet."
  ]
};

function getRandomSentence(mode) {
  const modeSentences = sentences[mode] || sentences.easy;
  return modeSentences[Math.floor(Math.random() * modeSentences.length)];
}

function TypingTest({ mode, onModeChange }) {
  const [sentence, setSentence] = useState(getRandomSentence(mode));
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [history, setHistory] = useState([]);
  const [commonMistakes, setCommonMistakes] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("typing-history")) || [];
    setHistory(savedHistory);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    if (!startTime) setStartTime(Date.now());

    let newMistakes = 0;
    const minLen = Math.min(value.length, sentence.length);

    for (let i = 0; i < minLen; i++) {
      if (value[i] !== sentence[i]) {
        newMistakes++;
        setCommonMistakes((prev) => ({
          ...prev,
          [sentence[i]]: (prev[sentence[i]] || 0) + 1
        }));
      }
    }

    setMistakes(newMistakes);
    setInput(value);

    if (value.length === sentence.length) {
      const timeTaken = (Date.now() - startTime) / 1000;
      const words = sentence.trim().split(" ").length;
      const calculatedWpm = Math.round((words / timeTaken) * 60);
      setWpm(calculatedWpm);
      setShowResult(true);

      const newResult = {
        sentence,
        wpm: calculatedWpm,
        mistakes: newMistakes,
        time: timeTaken.toFixed(2),
        accuracy: Math.round(((sentence.length - newMistakes) / sentence.length) * 100),
        mode
      };

      const newHistory = [newResult, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem("typing-history", JSON.stringify(newHistory));
    }
  };

  const handleRetry = () => {
    setSentence(getRandomSentence(mode));
    setInput("");
    setMistakes(0);
    setStartTime(null);
    setShowResult(false);
    setCommonMistakes({}); 
    inputRef.current.focus();
  };

  const handleModeChange = () => {
    onModeChange(null); 
  };

  return (
    <div className="typing-test-container">
      <div className="mode-indicator">
        Current Mode: <span className={`mode-tag ${mode}`}>{mode}</span>
        <button className="change-mode-button" onClick={handleModeChange}>
          Change Mode
        </button>
      </div>
      
      <div className="typing-test">
        <h2 className="test-title">Typing Speed Test - {mode.charAt(0).toUpperCase() + mode.slice(1)}</h2>
        <div className="sentence-display">
          {sentence.split('').map((char, index) => {
            let className = '';
            if (index < input.length) {
              className = input[index] === char ? 'correct' : 'incorrect';
            }
            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })}
        </div>
        
        <textarea
          ref={inputRef}
          rows="4"
          value={input}
          onChange={handleChange}
          disabled={showResult}
          placeholder="Start typing here..."
          autoFocus
        ></textarea>

        {showResult && (
          <div className="results-card">
            <h3>Your Results</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">{wpm}</div>
                <div className="stat-label">WPM</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{history[0].accuracy}%</div>
                <div className="stat-label">Accuracy</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{mistakes}</div>
                <div className="stat-label">Mistakes</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{history[0].time}s</div>
                <div className="stat-label">Time</div>
              </div>
            </div>
            <button className="retry-button" onClick={handleRetry}>
              Try Another Sentence
            </button>
          </div>
        )}

        {Object.keys(commonMistakes).length > 0 && (
          <div className="analysis-section">
            <h3>Common Mistakes</h3>
            <div className="mistakes-grid">
              {Object.entries(commonMistakes)
                .sort((a, b) => b[1] - a[1])
                .map(([char, count]) => (
                  <div key={char} className="mistake-item">
                    <span className="char">{char === ' ' ? 'Space' : char}</span>
                    <span className="count">{count} times</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="history-section">
            <h3>Your Past Attempts</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Mode</th>
                    <th>WPM</th>
                    <th>Accuracy</th>
                    <th>Mistakes</th>
                    <th>Time (s)</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((res, index) => (
                    <tr key={index}>
                      <td className={`mode-cell ${res.mode}`}>{res.mode}</td>
                      <td>{res.wpm}</td>
                      <td>{res.accuracy}%</td>
                      <td>{res.mistakes}</td>
                      <td>{res.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
      </div>
      <div className="footer-section">
            <p>© {new Date().getFullYear()} Typing Test App</p>
      </div>
    </div>
  );
}

export default TypingTest;