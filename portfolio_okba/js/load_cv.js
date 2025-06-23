
document.addEventListener("DOMContentLoaded", async () => {
  const lang = new URLSearchParams(location.search).get("lang") || "fr";
  const response = await fetch("cv.json");
  const data = await response.json();

  const cv = data.name ? data : null;
  if (!cv || !cv.languages[lang]) return;

  const d = cv.languages[lang];
  document.getElementById("name").textContent = cv.name;
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
});
