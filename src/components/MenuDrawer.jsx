// src/components/MenuDrawer.jsx
import React from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import { useNavigate  }  from "react-router-dom";

const MenuDrawer = ({ onSelect }) => {
  const { language } = useLanguage();
  const t = translations[language] || translations["English"];
  const navigate = useNavigate();
  const handleClick = () => {
      navigate("/today");
  };

  return (
    <div className="absolute right-4 top-16 bg-white dark:bg-white-800 shadow-lg rounded-lg p-3 z-10 space-y-2 w-64 text-sm">
      <button onClick={handleClick} className="block w-full text-left">
        {t.aajKaShlok || "📜 Today's Shloka"}
      </button>

        <button onClick={() => navigate("/progress")} className="block w-full text-left">
                  {t.progress || "📈 Progress Report"}
                </button>

      <button onClick={() => onSelect("bookmark")} className="block w-full text-left">
        {t.bookmarkList || "⭐ Bookmarks"}
      </button>
      <hr />
      <button onClick={() => onSelect("settings")} className="block w-full text-left">
        {t.settings || "⚙️ Settings"}
      </button>
    
      {/*<button onClick={() => onSelect("dark")} className="block w-full text-left">
        {t.darkMode || "🌙 Dark Mode"}
      </button>
      */}
      <hr />
      <button onClick={() => navigate("/contact")} className="block w-full text-left">
        {t.contact || "✉ Contact Us"}
      </button>
      <button onClick={() => onSelect("about")} className="block w-full text-left">
        {t.about || "ℹ️ About App"}
      </button>
      <button onClick={() => onSelect("privacy")} className="block w-full text-left">
        {t.privacy || "🔐 Privacy Policy"}
      </button>
    </div>
  );
};

export default MenuDrawer;