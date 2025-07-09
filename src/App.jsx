import React, { useState, useEffect } from "react";
import IntroAnimation from "./components/IntroAnimation";
import ChapterList from "./components/ChapterList";

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {showIntro ? <IntroAnimation /> : <ChapterList />}
    </div>
  );
};

export default App;