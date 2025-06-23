async function loadRDF(lang = 'fr') {
  const rdfMap = {
    fr: 'competences.rdf',
    ja: 'competences_ja.rdf',
    de: 'competences_de.rdf'
  };
  const rdfFile = rdfMap[lang] || rdfMap['fr'];
  const res = await fetch(rdfFile);
  const xmlText = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "application/xml");

  // Données principales
  document.getElementById("title").textContent = xml.querySelector("dc\\:title")?.textContent || "";
  document.getElementById("description").textContent = xml.querySelector("dc\\:description")?.textContent || "";
  document.getElementById("name").textContent = xml.querySelector("foaf\\:name")?.textContent || "";
  document.getElementById("nick").textContent = xml.querySelector("foaf\\:nick")?.textContent || "";
  const mbox = xml.querySelector("foaf\\:mbox")?.getAttribute("rdf:resource") || "";
  const email = document.getElementById("email");
  if (email && mbox) {
    email.href = mbox;
    email.textContent = mbox.replace("mailto:", "");
  }

  // Libellés
  const subjects = xml.querySelectorAll("dc\\:subject");
  if (subjects.length >= 5) {
    document.getElementById("label-author").textContent = subjects[0].textContent;
    document.getElementById("label-name").textContent = subjects[1].textContent + " :";
    document.getElementById("label-nick").textContent = subjects[2].textContent + " :";
    document.getElementById("label-email").textContent = subjects[3].textContent + " :";
    document.getElementById("label-competences").textContent = subjects[4].textContent;
  }

  // Compétences
  const compList = document.getElementById("competence-list");
  compList.innerHTML = "";
  for (let i = 5; i < subjects.length; i++) {
    const li = document.createElement("li");
    li.textContent = subjects[i].textContent;
    li.setAttribute("property", "dc:subject");
    compList.appendChild(li);
  }
}

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get("lang") || "fr";
  loadRDF(lang);
};
