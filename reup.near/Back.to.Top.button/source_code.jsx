return (
  <button id="back-to-top" onclick="scrollToTop()">
    Top
  </button>
);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
