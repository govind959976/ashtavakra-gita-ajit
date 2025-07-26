import React from "react";
import data from "../assets/ashtavakra_chapter1.json";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";

const BookmarkList = ({ onBack, fontSize = "base" }) => {
  const { language } = useLanguage();
  const t = translations[language] || translations["English"];

  const bookmarks = JSON.parse(localStorage.getItem("bookmarked") || "[]");

  const getShloka = (id) => {
    const [chIndex, shlokaIndex] = id.split("-").map(Number);
    return data.gita[chIndex]?.verses[shlokaIndex];
  };

  const getTranslation = (shloka) => {
    if (language === "English") return shloka.english;
    if (language === "हिंदी") return shloka.hindi;
    return shloka.english; // fallback
  };

  return (
    <div className={`p-6 max-w-3xl mx-auto text-gray-800 bg-white shadow-md rounded-xl mt-6 text-${fontSize}`}>
      <h2 className="text-xl font-bold mb-4 text-center">
        {t.bookmarkList || "⭐ Bookmarked Shlokas"}
      </h2>

      <button
        onClick={onBack}
        className="mb-4 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
       {t.back || "🔙BACK"}
      </button>

      {bookmarks.length === 0 ? (
        <p className="text-center text-gray-500">
          {t.noBookmarks || "No bookmarks yet."}
        </p>
      ) : (
        bookmarks.map((id) => {
          const shloka = getShloka(id);
          if (!shloka) return null;

          return (
            <div key={id} className="mb-4 p-4 bg-yellow-100 rounded shadow">
              <p className="font-bold text-center whitespace-pre-line">{shloka.sanskrit}</p>
              <p className="italic text-center mt-2">{getTranslation(shloka)}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default BookmarkList;