import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../assets/ashtavakra_chapter1.json";
import { useLanguage } from "../context/LanguageContext";
import ShareShlokaButton from "../components/ShareShlokaButton";
import commentaryMap from "../assets/commentaryMap";
import translations from "../translations";
import { useNavigate } from "react-router-dom";

const ShlokaSlider = ({ onBack }) => {
    const navigate = useNavigate();
    const goBackToChapterList =() => {
      navigate("/");
    };
  const { language } = useLanguage();
  const t = translations[language] || translations["English"];
  const [commentaryVisible, setCommentaryVisible ] = useState(false);

  const { id } = useParams();
  const chapterIndex = parseInt(id, 10);
  const chapter = data.gita[chapterIndex];
  const [bookmarked, setBookmarked] = useState([]);
  const [notes, setNotes] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "medium");

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarked") || "[]");
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "{}");
    setBookmarked(storedBookmarks);
    setNotes(storedNotes);
  }, [chapterIndex]);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech not supported");

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase();
      handleVoiceCommand(text);
      setIsListening(false);
    };

    recognition.onerror = () => {
      alert("🎙️ Mic error. Try again.");
      setIsListening(false);
    };

    recognition.start();
  };


  const handleVoiceCommand = (spoken) => {
    const num = parseInt(spoken.replace(/[^0-9]/g, ""));
    if (spoken.includes("bookmark")) {
      if (!isNaN(num)) toggleBookmark(num - 1);
    } else if (spoken.includes("read") || spoken.includes("shlok")) {
      if (!isNaN(num) && num > 0 && num <= chapter.verses.length) {
        setCurrentSlide(num - 1);
        speak(chapter.verses[num - 1].hindi);
      } else {
        alert("❌ कृपया सही श्लोक संख्या बोलें");
      }
    } else {
      alert("❌ समझ नहीं आया");
    }
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


  const saveProgress = (chapterNum, shlokaNum) => {
    const today = new Date().toISOString().split("T")[0];
    const progress = JSON.parse(localStorage.getItem("progress")) || {};
     if  (!progress[today])progress[today] = {};
     if (!progress[today][chapterNum]) progress[today][chapterNum] =[];

     if (!progress[today][chapterNum].includes(shlokaNum)) {
      progress[today][chapterNum].push(shlokaNum);

      localStorage.setItem("progress", JSON.stringify(progress));
     }
  };

  const renderSlide = (v, i) => {
    const id = `${chapterIndex}-${i}`;

     saveProgress(chapterIndex, i);

    return (
      <SwiperSlide key={i}>
        <div
          style={ {
            backgroundColor: "#fff8dc",
            padding: "16px",
            borderRadius: "10px",
            margin: "8px",
            fontSize:
              fontSize === "small"
                ? "14px"
                : fontSize === "large"
                ? "20px"
                : fontSize === "x-large"
                ? "24px"
                : "16px",
          }}
        >
          <p style={{ fontWeight: "bold", textAlign: "center", marginBottom: "25px" }}>{v.sanskrit.split("\n").map((line, idx) => (
            <span key={idx}>{line}<br /></span>
          ))}</p>

          <p style={{ fontStyle: "italic", textAlign: "center", marginBottom: "20px" }}>{v.hindi.split("\n").map((line, idx) => (
            <span key={idx}>{line}<br /></span>
          ))}</p>

          <p style={{ color: "#444", textAlign: "center", marginBottom: "20px" }}>{v.english}</p>

          <div style={{ marginTop: "12px", display: "flex", gap: "10px", justifyContent: "center" }}>
            <button onClick={() => speak(v.hindi)}>🔊 Listen</button>
            <button onClick={startListening} disabled={isListening}>
              🎤 {isListening ? "Listening..." : "Mic"}
            </button>
            <button onClick={() => toggleBookmark(i)}>
              {bookmarked.includes(id) ? "★ Bookmarked" : "☆ Bookmark"}
            </button>

          </div>

          <textarea
            placeholder="📝 Your note..."
            value={notes[id] || ""}
            onChange={(e) => saveNote(i, e.target.value)}
            style={{ marginTop: "12px", width: "100%" }}
          />
          <button onClick={() =>
            setCommentaryVisible(!commentaryVisible)
          }>
            {commentaryVisible ? "Hide Commentary"  : "Commentary"}
          </button>

          {commentaryVisible && commentaryMap[id] && (
            <div style={{ marginTop: "12px", backgroundColor: "#f4f4f4", padding: "10px", borderRadius: "8px" }}>
              <p style={{ fontWeight: "bold" }}>
                हिंदी
              </p>
              <p>{commentaryMap[id].hindi}</p>
              <p style={{ fontWeight: "bold", marginTop: "8px" }}>English</p>
              <p>{commentaryMap[id].english}</p>
            </div>
          )}
          </div>
          <ShareShlokaButton shloka={v} />

      </SwiperSlide>
    );
  };

  return (
    <div className="mt-4 px-4 relative">
      {/* 🔙 Back Button */}
      <button
        onClick={goBackToChapterList}
        className="absolute top-2 left-2 text-white bg-white dark:bg-white text-sm px-3 py-1 rounded"
      >
        {t.back || "🔙"}
      </button>

      <h2 className="text-xl font-semibold text-center mb-2">{chapter.title}</h2>
      <p className="text-center text-sm text-gray-600 mb-2">
        {currentSlide + 1} / {chapter.verses.length}
      </p>

      <Swiper
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        initialSlide={currentSlide}
      >
        {chapter.verses.map((v, i) => renderSlide(v, i))}
      </Swiper>
    </div>
  );
};

export default ShlokaSlider;