// PragatiReport.jsx
import React from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import { useNavigate } from "react-router-dom";

const PragatiReport = ({ fontSize = "base" }) => {
  const { language } = useLanguage();
  const t = translations[language] || translations["English"];
  const navigate = useNavigate();

  const progress = JSON.parse(localStorage.getItem("progress")) || {};

  const formatDate = (date) => date.toISOString().split("T")[0];

  const todayDate = formatDate(new Date());
  const yesterdayDate = formatDate(new Date(Date.now() - 86400000)); // 1 day = 86400000 ms

  const calculateStats = (date) => {
    const dayProgress = progress[date] || {};
    let chapters = Object.keys(dayProgress).length;
    let shlokas = Object.values(dayProgress).reduce((acc, arr) => acc + arr.length, 0);
    return { chapters, shlokas };
  };

  const totalChapters = new Set();
  let totalShlokas = 0;
  const breakdown = {};

  for (const date in progress) {
    const dayData = progress[date];
    for (const chapter in dayData) {
      totalChapters.add(chapter);
      if (!breakdown[chapter]) breakdown[chapter] = new Set();
      dayData[chapter].forEach((shlok) => {
        breakdown[chapter].add(shlok);
        totalShlokas++;
      });
    }
  }

  const getShlokaText = () =>
    Object.entries(breakdown)
      .map(([chapter, shloks]) => {
        const shlokaList = Array.from(shloks).sort((a, b) => a - b).join(", ");
        return language === "English"
          ? `- Chapter ${chapter}: Shlokas ${shlokaList}`
          : `- अध्याय ${chapter}: श्लोक ${shlokaList}`;
      })
      .join("\n");

  const todayStats = calculateStats(todayDate);
  const yesterdayStats = calculateStats(yesterdayDate);

  const reportText =
    language === "English"
      ? `📆 Today: ${todayStats.chapters} chapters, ${todayStats.shlokas} shlokas\n📅 Yesterday: ${yesterdayStats.chapters} chapters, ${yesterdayStats.shlokas} shlokas\n📚 Total: ${totalChapters.size} chapters, ${totalShlokas} shlokas\n\n📖 Chapter-wise Shlokas:\n${getShlokaText()}`
      : `📆 आज: ${todayStats.chapters} अध्याय, ${todayStats.shlokas} श्लोक\n📅 कल: ${yesterdayStats.chapters} अध्याय, ${yesterdayStats.shlokas} श्लोक\n📚 कुल: ${totalChapters.size} अध्याय, ${totalShlokas} श्लोक\n\n📖 अध्यायवार श्लोक:\n${getShlokaText()}`;

  return (
    <div className={`p-4 text-${fontSize} whitespace-pre-line`}>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {t.back || "🔙"}
      </button>

      <h2 className="text-xl font-bold mb-2">
        {t.progress || (language === "Hindi" ? "📈 प्रगति रिपोर्ट" : "📈 Progress Report")}
      </h2>

      <p>{reportText}</p>
    </div>
  );
};

export default PragatiReport;