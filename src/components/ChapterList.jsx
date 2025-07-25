// src/components/ChapterList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuDrawer from "./MenuDrawer";
import Settings from "./Settings";
import AajKaShlok from "./AajKaShlok";
import PragatiReport from "./PragatiReport";
import PrivacyPolicy from "./PrivacyPolicy";
import AboutApp from "./AboutApp";
import BookmarkList from "./BookmarkList";
import data from "../assets/ashtavakra_chapter1.json";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";

const ChapterList = () => {
  const navigate = useNavigate();

  const { language } = useLanguage();
  const t = translations[language] || translations["English"];

  const [menuOption, setMenuOption] = useState(null);
  const [dailyMode, setDailyMode] = useState(false);
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "medium");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [menuOpen, setMenuOpen] = useState(false);

 useEffect(() => {
          const body = document.body;
          if(darkMode) {
            body.classList.add("dark-mode");
            body.classList.remove("light-move");
          } else {
            body.classList.add("light-mode");
            body.classList.remove("dark-move");
          }
        }, [darkMode]); 

  useEffect(() => {
    document.documentElement.style.fontSize =
      fontSize === "small"
        ? "14px"
        : fontSize === "large"
        ? "20px"
        : fontSize === "x-large"
        ? "24px"
        : "16px";
  }, [fontSize]);

  const handleChange = (key, value) => {
    if (key === "darkMode") setDarkMode(value);
    if (key === "language") localStorage.setItem("language", value);
    if (key === "fontSize") setFontSize(value);
  };

  const handleReset = () => {
    setDarkMode(false);
    setFontSize("medium");
  };

  const handleBack = () => {
    setMenuOption(null);
    setDailyMode(false);
  };

  const handleMenuSelect = (option) => {
    setMenuOption(option);
    setDailyMode(false);
    setMenuOpen(false);
  };

  return (
    <div className="p-4 h-screen overflow-y-auto relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute right-4 top-4 z-20 text-2xl"
      >
        ...
      </button>

      {menuOpen && <MenuDrawer onSelect={handleMenuSelect} />}

      {menuOption === "about" && <AboutApp onBack={handleBack} fontSize={fontSize} />}
      {menuOption === "privacy" && <PrivacyPolicy onBack={handleBack} fontSize={fontSize} />}
      {menuOption === "PragatiReport" && <PragatiReport onBack={handleBack} fontSize={fontSize} />}
      {menuOption === "settings" && (
        <Settings
          onBack={handleBack}
          onChange={handleChange}
          onReset={handleReset}
          darkMode={darkMode}
          fontSize={fontSize}
        />
      )}
      {menuOption === "bookmark" && <BookmarkList onBack={handleBack} fontSize={fontSize} />}
      {dailyMode && <AajKaShlok onBack={handleBack} fontSize={fontSize} />}

      {!menuOption && !dailyMode && (
        <div className="flex flex-col gap-2 ">
          <h2 className="text-xl font-bold text-center mb-4">{t.selectChapter}</h2>

        
          
          {data.gita.map((chapter, index) => (
            <button
              key={index}
              className="bg-white text-left px-4 py-2 rounded-lg shadow cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:bg-gradient-to-r hover:from-orange-400 hover:to-yellow-300 dark:hover:bg-gray-700"
              onClick={() => navigate(`/chapter/${index}`)}
            >
              {t.chapter} {index + 1} - {chapter.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChapterList;