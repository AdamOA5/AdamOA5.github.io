async function loadRDF(lang = 'fr') {
  const rdfMap = {
    fr: 'competences.rdf',
    ja: 'competences_ja.rdf',
    de: 'competences_de.rdf'
  };
  const rdfFile = rdfMap[lang] || rdfMap['fr'];
  const [xmlRes, xslRes] = await Promise.all([
    fetch(rdfFile),
    fetch('rdf_to_html.xsl')
  ]);
  const xmlText = await xmlRes.text();
  const xslText = await xslRes.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "text/xml");
  const xsl = parser.parseFromString(xslText, "text/xml");
  const xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsl);
  const resultDocument = xsltProcessor.transformToFragment(xml, document);
  document.getElementById("output").appendChild(resultDocument);
}
window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang') || 'fr';
  loadRDF(lang);
};
