import PortfolioPDF from "../../public/curriculum.pdf";

function openPDF() {
  window.open(PortfolioPDF);
}

export default function CVButton() {
  return (
    <a
      className="text-sm p-1 cursor-pointer rounded-full bg-transparent border-solid border-2 border-light w-10 h-10 flex items-center justify-center hover:bg-black hover:bg-opacity-25"
      rel="follow"
      target="_blank"
      onClick={openPDF}
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
    </a>
  );
}
