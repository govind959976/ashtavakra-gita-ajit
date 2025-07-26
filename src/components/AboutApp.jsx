import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';

const AboutApp = ({ onBack, fontSize = 'base' }) => {
  const { language } = useLanguage();
  const t = translations[language] || translations["English"];

  return (
    <div className={`p-6 max-w-3xl mx-auto text-gray-800 bg-white shadow-md rounded-xl mt-6 text-${fontSize}`}>
            <button onClick={onBack} className="text-black mb-4">
        {t.back || "🔙BACK"}
      </button>
      <h2 className="text-xl text-white rounded hover:bg-blue-600 font-bold">{t.about || "ℹ️ About App"}</h2>

      {/* अब multilingual body paragraphs आप चाहें तो translate.js में भी डाल सकते हैं,
          पर यहां फिलहाल हिंदी में रखें जब तक और भाषाओं का content ना मिल जाए */}

      <p>
        <strong>परिचय:</strong> यह ऐप "अष्टावक्र गीता" के ज्ञान को सरल, प्रभावशाली और डिजिटल रूप में प्रस्तुत करने के लिए बनाया गया है...
      </p>

      <p>
        <strong>🌿 अष्टावक्र गीता का महत्व:</strong><br />
        अष्टावक्र गीता एक दिव्य संवाद है जो ऋषि अष्टावक्र और राजा जनक के बीच हुआ था...
      </p>

      <p>
        <strong>🧠 हमारा उद्देश्य:</strong><br />
        इस ऐप का उद्देश्य अष्टावक्र गीता के ज्ञान को हर व्यक्ति तक पहुँचाना है...
      </p>

      <div>
        <strong>📱 ऐप की विशेषताएं:</strong>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li><strong>{t.aajKaShlok}:</strong> हर दिन एक नया श्लोक पढ़ें...</li>
          <li><strong>{t.pragati}:</strong> आपने कितने अध्याय पढ़ लिए हैं...</li>
          <li><strong>{t.bookmarkList || 'बुकमार्क'}:</strong> मनपसंद श्लोक को सेव करें...</li>
          <li><strong>डार्क मोड:</strong> रात में अध्ययन करने के लिए...</li>
          <li><strong>बहुभाषा सपोर्ट:</strong> यह ऐप भविष्य में विश्व की प्रमुख भाषाओं में...</li>
          <li><strong>⋮ मेनू:</strong> जहां से आप आज का श्लोक, सेटिंग्स, भाषा बदलें...</li>
        </ul>
      </div>

      <p>
        <strong>🔒 आपकी गोपनीयता:</strong><br />
        इस ऐप में आपकी कोई निजी जानकारी संग्रहीत नहीं की जाती...
      </p>

      <p>
        <strong>💡 यह ऐप किसके लिए है?</strong>
         </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>जो छात्र/युवा आत्मज्ञान की ओर आकर्षित हैं।</li>
          <li>जो व्यक्ति मानसिक शांति की खोज में हैं।</li>
          <li>जो वेदांत दर्शन को गहराई से समझना चाहते हैं।</li>
          <li>जो नियमित रूप से कोई आध्यात्मिक ग्रंथ पढ़ना चाहते हैं।</li>
        </ul>
     

      <p>
        <strong>🙏 हमारे प्रेरणा स्रोत:</strong><br />
        यह ऐप भारत के महान आध्यात्मिक ग्रंथों से प्रेरित है...
      </p>

      <p>
        <strong>📧 संपर्क करें:</strong><br />
        ईमेल: <a href="mailto:whitexloin744@gmail.com" className="text-blue-600 underline">whitexloin744@gmail.com</a>
      </p>

      <p>
        <strong>👨‍💻 डेवलपर के बारे में:</strong><br />
        इस ऐप को एक स्वतंत्र युवा डेवलपर द्वारा बनाया गया है...
        <br />
        <em>“ज्ञान बांटो, शांति फैलाओ, आत्मा को जानो।”</em>
      </p>
    </div>
  );
};

export default AboutApp;