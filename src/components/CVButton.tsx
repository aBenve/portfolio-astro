import { useState } from "react";
import PortfolioPDF from "../../public/cv.pdf";
import PortfolioPDF_ES from "../../public/cv_es.pdf";

export default function CVButton() {
  const [showPopup, setShowPopup] = useState(false);

  const openPDF = (language: 'en' | 'es') => {
    const pdfUrl = language === 'en' ? PortfolioPDF : PortfolioPDF_ES;
    window.open(pdfUrl);
    setShowPopup(false);
  };

  return (
    <div className="relative">
      <button
        className="text-sm p-1 cursor-pointer rounded-full bg-transparent border-solid border-2 border-light w-10 h-10 flex items-center justify-center hover:bg-black hover:bg-opacity-25"
        onClick={() => setShowPopup(!showPopup)}
        aria-label="Open CV"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 32 32"
        >
          <path
            fill="#FFF"
            d="M8 2a3 3 0 0 0-3 3v22a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V10.828a3 3 0 0 0-.879-2.12l-5.828-5.83A3 3 0 0 0 18.172 2H8ZM7 5a1 1 0 0 1 1-1h9v5a3 3 0 0 0 3 3h5v15a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5Zm17.586 5H20a1 1 0 0 1-1-1V4.414L24.586 10Z"
          />
        </svg>
      </button>

      {showPopup && (
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => openPDF('en')}
              role="menuitem"
            >
              English CV
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => openPDF('es')}
              role="menuitem"
            >
              Spanish CV
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
