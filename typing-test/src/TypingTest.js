import React, { useState, useRef } from "react";

const sentences = {
  easy: [
    "The quick brown fox jumps over the lazy dog. The sun is shining brightly and the birds are singing in the trees. Children are playing in the park, laughing and running around. It is a beautiful day to enjoy the outdoors and have fun with friends.",
    "I love to code in JavaScript and React. Building web applications is both challenging and rewarding. Every new project teaches me something valuable and helps me grow as a developer. The community is supportive and full of creative ideas.",
    "The sun shines bright in the summer sky. Families gather for picnics and enjoy delicious food together. The sound of laughter fills the air as everyone relaxes and enjoys the warm weather. Summer days are perfect for making happy memories.",
    "Learning new things makes me happy. Reading books, watching documentaries, and exploring new hobbies keep life interesting. Curiosity drives me to discover the world around me and understand how things work. Every day is an opportunity to grow.",
    "My favorite food is pizza with extra cheese. Sharing a meal with family and friends brings joy and comfort. The aroma of freshly baked pizza fills the kitchen, making everyone eager to take a slice. Good food always brings people together.",
    "Cats and dogs are common household pets. They bring happiness and companionship to their owners. Playing with pets after a long day is relaxing and fun. Their loyalty and affection make them beloved members of the family.",
    "The ocean is full of amazing creatures. Dolphins leap through the waves while colorful fish swim below. Coral reefs provide shelter for many species and create a vibrant underwater world. Exploring the ocean reveals the beauty of nature.",
    "Reading books helps expand your knowledge. Stories transport you to different worlds and introduce you to new ideas. Whether you prefer fiction or non-fiction, there is always something interesting to learn. Books are windows to endless adventures.",
    "Exercise is important for good health. Going for a walk, riding a bike, or playing sports keeps your body strong and your mind sharp. Staying active helps you feel energetic and happy. Make time for movement every day.",
    "Music can change your mood instantly. Listening to your favorite songs can lift your spirits and help you relax. Singing along or dancing to the beat is a great way to have fun. Music connects people and creates lasting memories.",
    "A gentle breeze rustled the leaves as the sun set behind the hills. The sky turned shades of orange and pink, painting a beautiful picture. Families gathered on their porches, sharing stories and laughter as the day came to an end.",
    "The aroma of freshly baked bread filled the house. Children eagerly waited at the table, their mouths watering in anticipation. When the bread was finally served, everyone enjoyed its warm, soft texture and delicious taste."
  ],
  medium: [
    "Programming requires logic, creativity, and attention to detail. Solving complex problems can be both challenging and rewarding. Collaborating with others on projects helps you learn new techniques and improve your skills. The world of technology is always evolving, so staying curious is essential.",
    "The five boxing wizards jump quickly as the xylophone plays. In the background, a crowd gathers to watch the spectacle unfold. The music grows louder, and the wizards perform their tricks with precision and flair. The audience cheers, amazed by the magical display.",
    "She sells seashells by the seashore on sunny summer Sundays. The gentle waves lap at her feet as she arranges her collection. Tourists stop to admire the colorful shells and ask questions about their origins. Each shell has a story, and she loves sharing them.",
    "React hooks provide a powerful way to manage state in components. By using useState and useEffect, developers can create dynamic and interactive user interfaces. Understanding how hooks work is key to building efficient React applications. Practice makes perfect, so keep experimenting.",
    "Clean code is simple, direct, and reads like well-written prose. Refactoring messy code improves readability and maintainability. Good developers strive to write code that others can easily understand and build upon. Consistency and clarity are the hallmarks of great software.",
    "The mysterious diary records the voice of an unknown young woman. Each entry reveals secrets and dreams, painting a vivid picture of her life. Readers are drawn into her world, eager to uncover the truth behind her words. The diary becomes a treasured keepsake.",
    "Bright vixens jump while faking quantum leaps over lazy dogs. The experiment is part of a larger study on animal behavior and agility. Researchers observe and record the results, hoping to gain new insights. Science often begins with simple observations.",
    "Accessibility should be a priority in all web applications. Designing for users with disabilities ensures everyone can enjoy your site. Adding alt text to images and using semantic HTML are important steps. Inclusive design benefits everyone and creates a better user experience.",
    "JavaScript is the lingua franca of web development ecosystems. From front-end frameworks to back-end servers, it powers countless applications. Learning JavaScript opens doors to many career opportunities. The language continues to grow and evolve with the industry.",
    "Consistency is the key to mastering any new skill. Practicing regularly helps you build confidence and improve over time. Setting achievable goals and tracking your progress keeps you motivated. Remember, every expert was once a beginner.",
    "The city lights twinkled as cars rushed by on busy streets. People hurried to their destinations, each with a story to tell. The energy of the city was contagious, inspiring creativity and ambition. Nighttime brought a sense of excitement and possibility.",
    "A sudden rainstorm drenched the garden, leaving droplets on every leaf. Flowers glistened in the soft light, their colors more vibrant than ever. The air smelled fresh and clean, and birds sang from the shelter of the trees. Nature's beauty was on full display."
  ],
  fast: [
    "How vexingly quick daft zebras jump over the lazy fox! The challenge is to type this sentence as fast and accurately as possible. Speed and precision are both important for mastering typing skills. Practice regularly to see improvement in your results.",
    "Pack my box with five dozen liquor jugs for the celebration. The party was lively, with music and laughter filling the room. Friends gathered to share stories and enjoy delicious food and drinks. Everyone left with happy memories and smiles on their faces.",
    "Amazingly few discotheques provide jukeboxes these days. Technology has changed the way people listen to music and dance. Digital playlists and streaming services offer endless options for entertainment. The classic jukebox remains a nostalgic favorite for many.",
    "The journey of a thousand miles begins with a single step. Setting goals and working towards them is the key to success. Every small effort adds up, leading to big achievements over time. Stay focused and keep moving forward, no matter the obstacles.",
    "Crazy Frederick bought many very exquisite opal jewels. He traveled the world in search of rare and beautiful gems. Each jewel had a unique story and added to his impressive collection. His passion for discovery inspired others to follow their dreams.",
    "Quick zephyrs blow, vexing daft Jim who quickly ran away. The wind howled through the trees, making it difficult to walk. Jim hurried home, hoping to escape the storm before it grew stronger. Safe inside, he watched the rain from his window.",
    "The future belongs to those who believe in the beauty of their dreams. Ambition and perseverance are essential for achieving great things. Dream big, work hard, and never give up on your goals. Success is built on determination and belief in yourself.",
    "Artificial intelligence is transforming industries worldwide. Automation and machine learning are changing the way we work and live. New technologies create opportunities for innovation and growth. Staying informed helps you adapt to a rapidly evolving world.",
    "TypeScript adds static typing to JavaScript for better tooling. Developers benefit from improved code quality and easier debugging. Learning new languages and frameworks expands your skill set. The tech industry rewards those who embrace change and growth.",
    "To be or not to be, that is the question from Shakespeare's Hamlet. The play explores themes of life, death, and the human experience. Shakespeare's words continue to inspire readers and audiences around the world. Literature connects us across time and culture.",
    "A marathon runner pushed through exhaustion to reach the finish line. Crowds cheered as she crossed, proud of her accomplishment. Her dedication and training paid off, proving that hard work leads to success. Every race is a test of strength and willpower.",
    "The scientist carefully recorded each result in her notebook. Experiments required patience, precision, and attention to detail. Discoveries were celebrated, and failures became lessons for future research. Science is a journey of curiosity and exploration."
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
  const [commonMistakes, setCommonMistakes] = useState({});
  const [testHistory, setTestHistory] = useState([]);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    if (!startTime) setStartTime(Date.now());

    let newMistakes = 0;
    let correctChars = 0;
    const minLen = Math.min(value.length, sentence.length);

    for (let i = 0; i < minLen; i++) {
      if (value[i] !== sentence[i]) {
        newMistakes++;
        setCommonMistakes((prev) => ({
          ...prev,
          [sentence[i]]: (prev[sentence[i]] || 0) + 1
        }));
      } else {
        correctChars++;
      }
    }

    setMistakes(newMistakes);
    setInput(value);

    if (value.length === sentence.length) {
      const timeTaken = (Date.now() - startTime) / 1000;
      const words = sentence.trim().split(" ").length;
      const calculatedWpm = Math.round((words / timeTaken) * 60);
      const accuracy = Math.round((correctChars / sentence.length) * 100);
      setWpm(calculatedWpm);
      setShowResult(true);

      const result = {
        wpm: calculatedWpm,
        mistakes: newMistakes,
        time: parseFloat(timeTaken.toFixed(2)),
        accuracy: accuracy
      };

      setTestHistory([result, ...testHistory]);
    }
  }

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
                <div className="stat-value">{Math.round(((input.length - mistakes) / input.length) * 100) || 0}%</div>
                <div className="stat-label">Accuracy</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{mistakes}</div>
                <div className="stat-label">Mistakes</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{((Date.now() - startTime) / 1000).toFixed(1)}s</div>
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

        {testHistory.length > 0 && (
          <div className="history-section">
            <h3>Your Past Attempts</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>WPM</th>
                    <th>Accuracy</th>
                    <th>Mistakes</th>
                    <th>Time (s)</th>
                  </tr>
                </thead>
                <tbody>
                  {testHistory.map((res, index) => (
                    <tr key={index}>
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