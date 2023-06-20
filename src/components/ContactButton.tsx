function scrollToContact() {
  document.getElementById("Contact")?.scrollIntoView({
    behavior: "smooth",
  });
}

export default function ContactButton() {
  return (
    <button
      className="bg-second-dark font-semibold text-sm lg:text-lg py-2 px-3 lg:px-4 rounded-lg text-light font-primary hover:bg-opacity-70 transition duration-200 ease-in-out"
      onClick={scrollToContact}
    >
      Contact
    </button>
  );
}
