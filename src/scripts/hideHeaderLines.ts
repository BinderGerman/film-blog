window.addEventListener("DOMContentLoaded", () => {
  const headerLines = document.getElementById("header-lines");

  if (!headerLines) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      headerLines.classList.add("opacity-0", "h-0", "overflow-hidden");
    } else {
      headerLines.classList.remove("opacity-0", "h-0", "overflow-hidden");
    }
  });
});
