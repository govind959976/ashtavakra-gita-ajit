import React from "react";
import data from "../assets/ashtavakra_chapter1.json";

const BookmarkList = ({ onBack }) => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarked") || "[]");

  const getShloka = (id) => {
    const [chIndex, shlokaIndex] = id.split("-").map(Number);
    return data.gita[chIndex]?.verses[shlokaIndex];
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">⭐ Bookmarked Shlokas</h2>

      <button
        onClick={onBack}
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded shadow"
      >
        🔙 Back
      </button>

      {bookmarks.length === 0 ? (
        <p className="text-center text-gray-500">No bookmarks yet.</p>
      ) : (
        bookmarks.map((id) => {
          const shloka = getShloka(id);
          if (!shloka) return null;

          return (
            <div key={id} className="mb-4 p-4 bg-yellow-100 rounded shadow">
              <p className="font-bold text-center whitespace-pre-line">
                {shloka.sanskrit}
              </p>
              <p className="italic text-center mt-2">{shloka.hindi}</p>
              <p className="text-sm text-center text-gray-600 mt-1">
                {shloka.english}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default BookmarkList;