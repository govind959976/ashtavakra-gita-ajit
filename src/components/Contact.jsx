import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";

const Contact = ( fontSize = "lg" ) => {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = translations[language] || translations["English"];
    return (
        <div className={`p-6 max-w-3xl mx-auto text-gray-800 bg-white shadow-md rounded-xl mt-6 text-${fontSize}`}>
      <button onClick={() => navigate(-1)} className="text-black mb-4">
        {t.back || "🔙BACK"}
      </button>

            <h2 className="text-xl font-bold mb-2 text-white rounded hover:bg-blue-600 ">{t.contact || "Contact US"}</h2>
            <p>{t.contextText || "For suggestions or help, email us at:"}</p>
            <a href="mailto:whitexloin&44@gmail.com" className="text-blue-800">whitexloin744@gmail.com</a>
        </div>
    );
};

export default Contact;