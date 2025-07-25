// src/components/AajKaShlok.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import chaptersArray from "../assets/ashtavakra_chapter1.json";

const AajKaShlok = ({ fontSize = "lg" }) => {
  const [shlok, setShlok] = useState(null);
  const [allShloks, setAllShloks] = useState([]);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language] || translations["English"];

  useEffect(() => {
    const all = chaptersArray.gita.flatMap((chapter) =>
      chapter.verses.map((verse) => ({
        chapter: chapter.chapter,
        title: chapter.title,
        ...verse,
      }))
    );

    setAllShloks(all);
    const random =
      all[Math.floor(Math.random() * all.length)];
    setShlok(random);
  }, []);

  const handleNextShlok = () => {
    if  (!allShloks.length) return;
    const next = allShloks[Math.floor(Math.random() * allShloks.length)];
    setShlok(next);
  };

  if (!shlok)
    return <p className="text-center mt-10">{t.loading || "Loading..."}</p>;

  // Font size classes
  const sizeMap = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const appliedFontSize = sizeMap[fontSize] || "text-lg";

  // Get translated meaning
  const meaning =
    language === "English"
      ? shlok.english
      : language === "हिंदी"
      ? shlok.hindi
      : shlok.english;

  return (
    <div className={`max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-200 ${appliedFontSize}`}>
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
      >
        {t.back || "🔙"}
      </button>

      <h2 className="text-2xl font-bold text-center mb-4 text-indigo-700">
        {t.todayShloka || "Today’s Shloka"}
      </h2>
      <p className="text-sm text-center text-gray-500 mb-2">
        {shlok.title} | {t.chapter || "Chapter"} {shlok.chapter}, {t.verse || "Verse"} {shlok.verse}
      </p>

      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-xl text-gray-900 font-semibold mb-3 text-center">
          🕉️ {shlok.sanskrit}
        </p>
        <p className="text-gray-800 text-center mb-2">📜 {meaning}</p>
        <p className="text-sm text-gray-500 text-center">{shlok.english}</p>

        <div className="text-center mt-6">
          <button onClick={handleNextShlok} className="px-2 bg-indigo-600 text-sm text-white rounded-xl hover:bg-indigo-700 transition">
            {t.next || "NEXT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AajKaShlok;