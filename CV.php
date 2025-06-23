<?php
// Liste des langues disponibles
$langs = ['fr', 'ja', 'de'];
$default_lang = 'fr';

// Choix de la langue via GET
$lang = isset($_GET['lang']) && in_array($_GET['lang'], $langs) ? $_GET['lang'] : $default_lang;

// Association fichier RDF pour chaque langue
$rdf_files = [
  'fr' => 'CV.rdf',
  'ja' => 'CV_jp.rdf',
  'de' => 'CV_de.rdf'
];

$rdf_file = $rdf_files[$lang];
$xslt_file = 'rdf_to_html.xsl';

// Transformer RDF en HTML via XSLT
$xml = new DOMDocument;
$xml->load($rdf_file);

$xsl = new DOMDocument;
$xsl->load($xslt_file);

$proc = new XSLTProcessor;
$proc->importStyleSheet($xsl);
echo $proc->transformToXML($xml);
?>
