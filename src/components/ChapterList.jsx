import React, { useState } from "react";
import ShlokaSlider from "./ShlokaSlider";
import BookmarkList from "./BookmarkList";
import data from "../assets/ashtavakra_chapter1.json"; // ← पूरा chapters वाला JSON

const ChapterList = () => {
  const [selected, setSelected] = useState(null);
  const [dailyMode, setDailyMode] = useState(false);
  const [bookmarkView, setBookmarkView] = useState(false);

  const handleBack = () => {
    setSelected(null);
    setDailyMode(false);
    setBookmarkView(false);
  };

  return (
    <div
      className="h-screen overflow-y-scroll px-4 py-6"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>

      {bookmarkView ? (
        <BookmarkList onBack={handleBack} />
      ) : selected === null && !dailyMode ? (
        <>
        <div className="relative mb-4">
          {/* ⭐ Bookmarks Button */}
          <button
            className=" absolute right-0 top-0 mb-4 px-3 py-1 text-left text-lg rounded-md hover:scale-105 transition-transform"
            onClick={() => setBookmarkView(true)}
          >
            ⭐
          </button>
             <h1 className="text-center text-2xl font-bold text-blue-800 mb-4">🕉️ Chapters</h1>
</div>

          {/* 📅 Daily Wisdom Button */}
          <button
            className="mb-3 w-full px-4 py-3 bg-gradient-to-r from-green-200 to-green-300 text-left text-lg rounded-xl shadow hover:scale-[1.01] transition-transform duration-200"
            onClick={() => setDailyMode(true)}
          >
            📅 Daily Wisdom – 1 Shloka a Day
          </button>

          

          {/* 📚 Chapter List */}
          {data.gita.map((ch, idx) => (
            <div key={idx} className="mb-3">
              <button
                className="w-full text-left px-4 py-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl shadow hover:scale-[1.01] transition-transform duration-200"
                onClick={() => setSelected(idx)}
              >
                <div className="text-lg font-semibold text-gray-800">{ch.title}</div>
              </button>
            </div>
          ))}
        </>
      ) : (
        <>
          <button
            onClick={handleBack}
            className="mb-4 px-4 py-2 bg-red-500 text-white rounded shadow"
          >
            🔙 Back
          </button>

          <ShlokaSlider chapterIndex={selected || 0} dailyWisdomMode={dailyMode} />
        </>
      )}
    </div>
  );
};

export default ChapterList;