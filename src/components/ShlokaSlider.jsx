import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import data from "../assets/ashtavakra_chapter1.json";
import commentaryMap from "../assets/commentaryMap";

const ShlokaSlider = ({ chapterIndex, dailyWisdomMode = false }) => {
  const chapter = data.gita[chapterIndex];
  const [bookmarked, setBookmarked] = useState([]);
  const [notes, setNotes] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedShloka, setExpandedShloka] = useState(null);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarked") || "[]");
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "{}");
    setBookmarked(storedBookmarks);
    setNotes(storedNotes);
  }, [chapterIndex]);

  const getTodayShlokaIndex = () => {
    const total = chapter.verses.length;
    const today = new Date();
    return (today.getDate() + today.getMonth() * 31) % total;
  };

  const toggleBookmark = (index) => {
    const id = `${chapterIndex}-${index}`;
    const updated = bookmarked.includes(id)
      ? bookmarked.filter((b) => b !== id)
      : [...bookmarked, id];
    setBookmarked(updated);
    localStorage.setItem("bookmarked", JSON.stringify(updated));
  };

  const saveNote = (index, text) => {
    const id = `${chapterIndex}-${index}`;
    const updated = { ...notes, [id]: text };
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const shareOrCopy = (v) => {
    const text = `🕉️ अष्टावक्र गीता\n\n📜 ${v.sanskrit}\n\n📝 ${v.hindi}\n\n💬 ${v.english}\n\n🔗 Explore: https://yourapp.com`;

    const encodedText = encodeURIComponent(text);
    const whatsappURL = `https://wa.me/?text=${encodedText}`;
    const emailURL = `mailto:?subject=Ashtavakra Gita Shloka&body=${encodedText}`;

    if (navigator.share) {
      navigator.share({ title: "Ashtavakra Gita", text });
    } else {
      window.open(whatsappURL, "_blank");
      navigator.clipboard.writeText(text);
      window.open(emailURL, "_blank");
      alert("✅ Shared via WhatsApp & Email and copied to clipboard!");
    }
  };

  const renderSlide = (v, i) => {
    const id = `${chapterIndex}-${i}`;
    return (
      <SwiperSlide key={i}>
        <div
          style={{
            backgroundColor: "#fff8dc",
            color: "#000",
            padding: "16px",
            borderRadius: "10px",
            textAlign: "center",
            margin: "8px",
            fontFamily: "serif"
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "25px" }}>{v.sanskrit.split("\n").map((line, idx) => (
            <span key={idx}>{line}<br /></span>
          ))}</p>
          <p style={{ fontStyle: "italic", fontSize: "16px", margin: "12px 0", marginBottom: "20px" }}>{v.hindi.split("\n").map((line, idx) => (
            <span key={idx}>{line}<br /></span>
          ))}</p>
          <p style={{ fontWeight: "600", fontSize: "14px", color: "#444" }}>{v.english}</p>

          <div
            style={{
              marginTop: "12px",
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <button
              onClick={() => speak(v.hindi)}
              style={{
                backgroundColor: "#3b82f6",
                color: "#fff",
                borderRadius: "6px",
                padding: "6px 12px"
              }}
            >
              🔊 Listen
            </button>

            <button
              onClick={() => toggleBookmark(i)}
              style={{
                backgroundColor: "#facc15",
                borderRadius: "6px",
                padding: "6px 12px"
              }}
            >
              {bookmarked.includes(id) ? "★ Bookmarked" : "☆ Bookmark"}
            </button>

            <button
              onClick={() => shareOrCopy(v)}
              style={{
                backgroundColor: "#10b981",
                color: "#fff",
                borderRadius: "6px",
                padding: "6px 12px"
              }}
            >
              📤 Share
            </button>
          </div>

          <button
            onClick={() => setExpandedShloka(expandedShloka === i ? null : i)}
            style={{
              marginTop: "10px",
              backgroundColor: "#e2e8f0",
              padding: "6px 12px",
              borderRadius: "6px"
            }}
          >
            {expandedShloka === i ? "🔼 Hide Commentary" : "🔽 Show Commentary"}
          </button>

          {expandedShloka === i && (
            <div
              style={{
                backgroundColor: "#fefcbf",
                padding: "10px",
                borderRadius: "6px",
                marginTop: "10px",
                textAlign: "left"
              }}
            >
              <p>
                <strong>📝 हिंदी:</strong>{" "}
                {commentaryMap[`${chapterIndex}-${i}`]?.hindi || "कोई टिप्पणी नहीं।"}
              </p>
              <p>
                <strong>💬 English:</strong>{" "}
                {commentaryMap[`${chapterIndex}-${i}`]?.english || "No commentary yet."}
              </p>
            </div>
          )}

          <textarea
            value={notes[id] || ""}
            onChange={(e) => saveNote(i, e.target.value)}
            placeholder="📝 Write your notes here..."
            style={{
              marginTop: "16px",
              width: "100%",
              padding: "8px",
              borderRadius: "6px"
            }}
          />
        </div>
      </SwiperSlide>
    );
  };

  return (
    <div className="mt-4">
      <div className="flex justify-center mb-2">
        <h2 className="text-xl font-semibold text-center">{chapter.title}</h2>
      </div>
      <div className="text-center text-sm text-gray-600 mb-2">
        📖 Shloka {dailyWisdomMode ? getTodayShlokaIndex() + 1 : currentSlide + 1} /{" "}
        {chapter.verses.length}
      </div>
      <Swiper spaceBetween={30} onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}>
        {dailyWisdomMode
          ? renderSlide(chapter.verses[getTodayShlokaIndex()], getTodayShlokaIndex())
          : chapter.verses.map((v, i) => renderSlide(v, i))}
      </Swiper>
    </div>
  );
};

export default ShlokaSlider;