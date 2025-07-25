// /components/LanguageSelector.jsx
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    "हिंदी",
    "English",
    "தமிழ்",
    "తెలుగు",
    "മലയാളം",
    "বাংলা",
    "اردو",
    "Français",
    "日本語",
    "中文",
    "Deutsch",
  ];

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="w-full border px-3 py-2 rounded"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;