//components/Settings.jsx
import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import LanguageSelector from "./LanguageSelector"; // ✅ import selector

const Settings = ({ onBack, onChange, onReset, darkMode, fontSize }) => {

  const { language: currentLang } = useLanguage();
  const t = translations[currentLang] || translations["English"];

  const [localDarkMode, setLocalDarkMode] = useState(darkMode);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    localStorage.getItem("notificationsEnabled") === "true"
  );
  const [reminderTime, setReminderTime] = useState(localStorage.getItem("reminderTime") || "07:00");
  const [selectedFontSize, setSelectedFontSize] = useState(fontSize);

  useEffect(() => {
    onChange("darkMode", localDarkMode);
    localStorage.setItem("darkMode", localDarkMode);
  }, [localDarkMode]);

  useEffect(() => {
    localStorage.setItem("reminderTime", reminderTime);
  }, [reminderTime]);

  useEffect(() => {
    onChange("fontSize", selectedFontSize);
    localStorage.setItem("fontSize", selectedFontSize);
  }, [selectedFontSize]);

  useEffect(() => {
    localStorage.setItem("notificationsEnabled", notificationsEnabled);
  }, [notificationsEnabled]);


  const handleNotificationToggle = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);

    if (newValue) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(t.notificationTitle || "📿 Reminder", {
            body: t.notificationMessage || "Don't forget your daily shloka!",
          });
        }
      });
    }
  };

  const handleResetProgress = () => {
    const confirmText = t.confirmReset || "Are you sure you want to reset all progress and settings?";
    if (window.confirm(confirmText)) {
      localStorage.clear();
      onReset();
      setLocalDarkMode(false);
      setSelectedFontSize("medium");
      setReminderTime("07:00");
      setNotificationsEnabled(false);
      alert(t.resetSuccess || "Progress and settings reset successfully.");
    }
  };

  return (
    <div className={`p-4 max-w-md mx-auto text-[${fontSize}]`}>
      <button onClick={onBack} className="text-white rounded hover:bg-blue-600 mb-4">
        {t.back || "🔙BACK"}
      </button>
      <h2 className="text-xl font-bold mb-4">{t.settings || "⚙️ Settings"}</h2>
      

      {/* 🌙 Dark Mode 
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={localDarkMode}
            onChange={() => setLocalDarkMode(!localDarkMode)}
            className="mr-2"
          />
          {t.darkMode || "🌙 Dark Mode"} {localDarkMode ? `(${t.on || "On"})` : `(${t.off || "Off"})`}
        </label>
      </div>*/}

      {/* 🔔 Notifications */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleNotificationToggle}
            className="mr-2"
          />
          {t.notifications || "🔔 Notifications"}{" "}
          {notificationsEnabled ? `(${t.on || "On"})` : `(${t.off || "Off"})`}
        </label>
      </div>

      {/* 🕖 Reminder Time */}
      <div className="mb-4">
        <label className="block mb-1">{t.reminderTime || "🕖 Reminder Time"}:</label>
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* 🔤 Font Size */}
      <div className="mb-4">
        <label className="block mb-1">{t.fontSize || "🔤 Font Size"}:</label>
        <select
          value={selectedFontSize}
          onChange={(e) => setSelectedFontSize(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="small">{t.fontSmall || "Small"}</option>
          <option value="medium">{t.fontMedium || "Medium"}</option>
          <option value="large">{t.fontLarge || "Large"}</option>
          <option value="x-large">{t.fontXL || "Extra Large"}</option>
        </select>
      </div>

      {/* 🌐 Language */}
      <div className="mb-4">
        <label className="block mb-1">{t.changeLanguage || "🌐 Change Language"}:</label>
        <LanguageSelector />
      </div>

      {/* 🔁 Reset */}
      <div className="mb-4">
        <button
          onClick={handleResetProgress}
          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
        >
          {t.resetProgress || "🔄 Reset Progress"}
        </button>
      </div>
    </div>
  );
};

export default Settings;