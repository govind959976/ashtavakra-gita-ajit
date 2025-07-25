import { useState } from "react";

const ShareShlokaButton = ({ shloka }) => {
  const [showOptions, setShowOptions] = useState(false);

  const text = `${shloka.sanskrit}\n\n${shloka.hindi}\n\n${shloka.english}`;
  const encodedText = encodeURIComponent(text);
  const pageUrl = encodeURIComponent(window.location.href);

  const shareOptions = [
    {
      name: "📤 WhatsApp Chat",
      url: `https://wa.me/?text=${encodedText}`,
    },
    {
      name: "🟢 WhatsApp Status",
      url: `whatsapp://send?text=${encodedText}`,
    },
    {
      name: "📸 Instagram Story",
      url: `https://www.instagram.com`, // Direct Story sharing via browser not supported
    },
    {
      name: "✉️ Gmail",
      url: `mailto:?subject=Beautiful%20Shloka&body=${encodedText}`,
    },
    {
      name: "📩 SMS",
      url: `sms:?body=${encodedText}`,
    },
    {
      name: "📨 Telegram",
      url: `https://t.me/share/url?url=${pageUrl}&text=${encodedText}`,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert("📋 Copied to clipboard!");
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({ title: "📜 Shloka", text, url: window.location.href })
        .catch(() => alert("❌ Share failed."));
    } else {
      setShowOptions(true); // Fallback custom menu
    }
  };

  return (
    <div className="text-center my-4">
      <button
        onClick={handleNativeShare}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        🔗 Share
      </button>

      {showOptions && (
        <div className="mt-4 space-y-2">
          {shareOptions.map((opt, i) => (
            <a
              key={i}
              href={opt.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
            >
              {opt.name}
            </a>
          ))}
          <button
            onClick={handleCopy}
            className="block bg-green-200 px-3 py-2 rounded hover:bg-green-300 w-full"
          >
            📋 Copy to Clipboard
          </button>
          <button
            onClick={() => setShowOptions(false)}
            className="text-sm text-red-600 mt-2"
          >
            ❌ Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareShlokaButton;