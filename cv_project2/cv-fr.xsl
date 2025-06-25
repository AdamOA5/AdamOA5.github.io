<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:param name="lang" select="'fr'"/>
  <xsl:template match="/cv">
    <html><head><title><xsl:value-of select="language[@code=$lang]/title"/></title></head><body>
      <h1><xsl:value-of select="name"/></h1>
      <p><strong>Email :</strong> <xsl:value-of select="email"/></p>
      <p><strong>Téléphone :</strong> <xsl:value-of select="phone"/></p>
      <p><strong>Adresse :</strong> <xsl:value-of select="address"/></p>
      <p><xsl:value-of select="language[@code=$lang]/description"/></p>
      <h2>Compétences</h2><ul><xsl:for-each select="language[@code=$lang]/skills/skill"><li><xsl:value-of select="."/></li></xsl:for-each></ul>
      <h2>Soft Skills</h2><ul><xsl:for-each select="language[@code=$lang]/soft_skills/soft"><li><xsl:value-of select="."/></li></xsl:for-each></ul>
      <h2>Langues</h2><ul><xsl:for-each select="language[@code=$lang]/languages/langue"><li><xsl:value-of select="."/></li></xsl:for-each></ul>
      <h2>Centres d’intérêt</h2><ul><xsl:for-each select="language[@code=$lang]/interests/interest"><li><xsl:value-of select="."/></li></xsl:for-each></ul>
      <h2>Formation</h2><ul><xsl:for-each select="language[@code=$lang]/education/item"><li><xsl:value-of select="."/></li></xsl:for-each></ul>
      <h2>Expérience</h2><ul><xsl:for-each select="language[@code=$lang]/experience/item"><li><xsl:value-of select="."/></li></xsl:for-each></ul>
      <h2>Projets</h2><ul><xsl:for-each select="language[@code=$lang]/projects/project"><li><xsl:value-of select="."/></li></xsl:for-each></ul>
    </body></html>
  </xsl:template>
</xsl:stylesheet>