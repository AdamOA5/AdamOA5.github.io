
document.addEventListener("DOMContentLoaded", async () => {
  
  let lang = new URLSearchParams(location.search).get("lang");
  if (!lang) {
    const browserLang = navigator.language || navigator.userLanguage;
    lang = browserLang.startsWith("ja") ? "ja" : browserLang.startsWith("de") ? "de" : "fr";
    window.history.replaceState(null, "", "?lang=" + lang);
  }

  const response = await fetch("cv.json");
  const data = await response.json();

  const cv = data.name ? data : null;
  if (!cv || !cv.languages[lang]) return;

  const d = cv.languages[lang];
  const t = cv.titles[lang];

  document.getElementById("name").textContent = d.name;
  document.getElementById("email").textContent = cv.email;
  document.getElementById("phone").textContent = cv.phone;
  document.getElementById("address").textContent = cv.address;
  document.getElementById("description").textContent = d.description;
  document.getElementById("skills").innerHTML = d.skills.map(s => `<li>${s}</li>`).join("");
  document.getElementById("langues").innerHTML = d.langues.map(s => `<li>${s}</li>`).join("");
  document.getElementById("soft_skills").innerHTML = d.soft_skills.map(s => `<li>${s}</li>`).join("");
  document.getElementById("interests").innerHTML = d.interests.map(s => `<li>${s}</li>`).join("");
  document.getElementById("education").innerHTML = d.education.map(s => `<li>${s}</li>`).join("");
  document.getElementById("experience").innerHTML = d.experience.map(s => `<li>${s}</li>`).join("");
  document.getElementById("projects").innerHTML = d.projects.map(s => `<li>${s}</li>`).join("");

  document.getElementById("title-skills").textContent = t["Compétences"];
  document.getElementById("title-langues").textContent = t["Langues"];
  document.getElementById("title-soft").textContent = t["Soft Skills"];
  document.getElementById("title-interests").textContent = t["Centres d'intérêt"];
  document.getElementById("title-edu").textContent = t["Formation"];
  document.getElementById("title-exp").textContent = t["Expérience professionnelle"];
  document.getElementById("title-proj").textContent = t["Projets informatiques"];
});


  // Mise à jour du titre de la vidéo
  const videoTitles = {
    fr: "Présentation",
    ja: "プレゼンテーション",
    en: "Presentation"
  };
  document.getElementById("title-video").textContent = videoTitles[lang];

  // Affiche uniquement la vidéo de la bonne langue
  document.querySelectorAll("iframe[id^='video-']").forEach(vid => vid.style.display = "none");
  const currentVideo = document.getElementById("video-" + lang);
  if (currentVideo) currentVideo.style.display = "block";


  const iframe = document.getElementById("video-frame");
  if (iframe) {
    const langMap = { fr: "fr", ja: "ja", en: "en" };
    const ytUrl = "https://www.youtube.com/embed/pe_ejTiIcSs" +
      "?hl=" + langMap[lang] +
      "&cc_lang_pref=" + langMap[lang] +
      "&cc_load_policy=1";
    iframe.src = ytUrl;
  }
