// App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import IntroAnimation from "./components/IntroAnimation";
import ChapterList from "./components/ChapterList";
import ShlokaSlider from "./components/ShlokaSlider";
import AboutApp from "./components/AboutApp";
import AajKaShlok from "./components/AajKaShlok";
import Contact from "./components/Contact";
import PragatiReport from "./components/PragatiReport";


import { LanguageProvider } from "./context/LanguageContext";

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <Router>
       
          {showIntro ? (
            <IntroAnimation />
          ) : (
            <>

              <Routes>
                <Route path="/" element={<ChapterList />} />
                <Route path="/chapter/:id" element={<ShlokaSlider />} />
                <Route path="/about" element={<AboutApp />} />
                <Route path="/today" element={<AajKaShlok fontSize="lg" />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/Progress" element={<PragatiReport fontSize="base"/>} />
                {/* Add more routes as needed */}
              </Routes>
            </>
          )}
      
      </Router>
    </LanguageProvider>
  );
};

export default App;