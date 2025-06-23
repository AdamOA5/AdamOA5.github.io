window.onload = () => {
  const lang = new URLSearchParams(window.location.search).get("lang") || "fr";
  document.querySelectorAll("[data-lang]").forEach(el => {
    el.style.display = (el.getAttribute("data-lang") === lang) ? "block" : "none";
  });
  document.title = document.querySelector('[data-lang="' + lang + '"] h1')?.textContent || "Portfolio RDFa";
};
