<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:dc="http://purl.org/dc/terms/"
  xmlns:foaf="http://xmlns.com/foaf/0.1/"
  exclude-result-prefixes="rdf dc foaf">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="//dc:title"/></title>
        <meta charset="UTF-8"/>
      </head>
      <body>
        <h1><xsl:value-of select="//dc:title"/></h1>
        <p><em><xsl:value-of select="//dc:description"/></em></p>
        <h2><xsl:value-of select="//dc:subject[1]"/></h2>
        <xsl:for-each select="//foaf:Person">
          <p><strong><xsl:value-of select="//dc:subject[2]"/> :</strong> <xsl:value-of select="foaf:name"/></p>
          <p><strong><xsl:value-of select="//dc:subject[3]"/> :</strong> <xsl:value-of select="foaf:nick"/></p>
          <p><strong><xsl:value-of select="//dc:subject[4]"/> :</strong> <xsl:value-of select="foaf:mbox/@rdf:resource"/></p>
        </xsl:for-each>
        <h2><xsl:value-of select="//dc:subject[5]"/></h2>
        <ul>
          <xsl:for-each select="//dc:subject[position() > 5]">
            <li><xsl:value-of select="."/></li>
          </xsl:for-each>
        </ul>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
