import React from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";

const PrivacyPolicy = ({ onBack, fontSize = "base" }) => {
  const { language } = useLanguage();
  const t = translations[language] || translations["English"];

  return (
    <div className={`p-6 max-w-3xl mx-auto text-gray-800 bg-white shadow-md rounded-xl mt-6 text-${fontSize}`}>
            <button onClick={onBack} className="text-white mb-4">
        {t.back || "🔙"}
      </button>
      <h1 className="text-2xl font-bold text-blue-800 mb-4">{t.privacy || "🔐 Privacy Policy"}</h1>

      {language === "English" ? (
        <>
          <p className="mb-4">
            We take your data privacy seriously. The Ashtavakra Gita app is designed to share spiritual wisdom simply and privately, without collecting personal data.
          </p>
          <p className="mb-4">
            This app does not require any <strong>login, account creation, or personally identifiable information</strong>. All progress data like viewed shlokas, chapters, and bookmarks are stored only on your device and never shared to any server or cloud.
          </p>
          <p className="mb-4">
            We do not use any third-party APIs that track your behavior. Your language preferences, dark mode setting, and bookmarks are saved only locally.
          </p>
          <p className="mb-4">
            If you contact us via email (e.g., <strong>whitexloin744@gmail.com</strong>), it will be used only for responses or feedback improvement. We do not share any data with third parties.
          </p>
          <p className="mb-4">
            This app does not use <strong>ads, trackers, camera, microphone, location, or contact access</strong>.
          </p>
          <p>
            This privacy policy may be updated occasionally. Any important updates will be shared inside the app. For questions, contact us at: <strong>whitexloin744@gmail.com</strong>
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            हम आपके डेटा की सुरक्षा को गंभीरता से लेते हैं। अष्टावक्र गीता ऐप का उद्देश्य आध्यात्मिक ज्ञान को सरल और सुलभ रूप में प्रदान करना है,
            न कि किसी भी प्रकार की व्यक्तिगत जानकारी एकत्र करना या उसका उपयोग करना।
          </p>
          <p className="mb-4">
            यह ऐप किसी भी प्रकार का <strong>लॉगिन, अकाउंट निर्माण या व्यक्तिगत पहचान योग्य जानकारी</strong> नहीं मांगता।
            उपयोगकर्ताओं द्वारा देखे गए श्लोक, अध्याय या प्रगति रिपोर्ट केवल स्थानीय डिवाइस पर ही संग्रहीत रहते हैं और किसी सर्वर या क्लाउड पर साझा नहीं किए जाते।
          </p>
          <p className="mb-4">
            हम थर्ड पार्टी APIs का उपयोग नहीं करते जो आपकी गतिविधि पर नज़र रखें। आपकी भाषा प्राथमिकता, डार्क मोड चयन,
            या श्लोक बुकमार्क जैसी सुविधाएँ केवल आपके मोबाइल/ब्राउज़र की local storage में रहती हैं।
          </p>
          <p className="mb-4">
            यदि आप हमें ईमेल के माध्यम से संपर्क करते हैं (जैसे: <strong>whitexloin744@gmail.com</strong>),
            तो आपका ईमेल केवल उत्तर देने या फीडबैक सुधारने के लिए ही उपयोग किया जाएगा। हम किसी भी जानकारी को किसी तीसरे पक्ष के साथ साझा नहीं करते।
          </p>
          <p className="mb-4">
            यह ऐप कोई <strong>ऐड्स, ट्रैकर्स, कैमरा, माइक्रोफ़ोन, लोकेशन या कॉन्टेक्ट एक्सेस</strong> नहीं करता।
          </p>
          <p>
            हम समय-समय पर इस प्राइवेसी पॉलिसी को अपडेट कर सकते हैं। यदि कोई महत्वपूर्ण बदलाव होगा, तो ऐप के भीतर ही सूचना प्रदान की जाएगी।
            किसी भी प्रश्न के लिए हमें ईमेल करें: <strong>whitexloin744@gmail.com</strong>
          </p>
        </>
      )}
    </div>
  );
};

export default PrivacyPolicy;