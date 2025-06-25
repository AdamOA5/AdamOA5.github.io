<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="text" encoding="UTF-8"/>
  
  <xsl:template match="/cv">
    <xsl:text>{</xsl:text>
    <xsl:text>"name": "</xsl:text><xsl:value-of select="personal_info/n"/><xsl:text>",</xsl:text>
    <xsl:text>"email": "</xsl:text><xsl:value-of select="personal_info/email"/><xsl:text>",</xsl:text>
    <xsl:text>"phone": "</xsl:text><xsl:value-of select="personal_info/phone"/><xsl:text>",</xsl:text>
    <xsl:text>"address": "</xsl:text><xsl:value-of select="personal_info/address"/><xsl:text>",</xsl:text>
    <xsl:text>"languages": {</xsl:text>
    
    <xsl:for-each select="language">
      <xsl:text>"</xsl:text><xsl:value-of select="@code"/><xsl:text>": {</xsl:text>
      <xsl:text>"title": "</xsl:text><xsl:value-of select="title"/><xsl:text>",</xsl:text>
      <xsl:text>"description": "</xsl:text><xsl:value-of select="description"/><xsl:text>",</xsl:text>
      <xsl:text>"name": "</xsl:text><xsl:value-of select="display_name"/><xsl:text>",</xsl:text>
      
      <xsl:text>"skills": [</xsl:text>
      <xsl:for-each select="skills/skill">
        <xsl:text>"</xsl:text><xsl:value-of select="."/><xsl:text>"</xsl:text>
        <xsl:if test="position() != last()">,</xsl:if>
      </xsl:for-each>
      <xsl:text>],</xsl:text>
      
      <xsl:text>"soft_skills": [</xsl:text>
      <xsl:for-each select="soft_skills/soft_skill">
        <xsl:text>"</xsl:text><xsl:value-of select="."/><xsl:text>"</xsl:text>
        <xsl:if test="position() != last()">,</xsl:if>
      </xsl:for-each>
      <xsl:text>],</xsl:text>
      
      <xsl:text>"interests": [</xsl:text>
      <xsl:for-each select="interests/interest">
        <xsl:text>"</xsl:text><xsl:value-of select="."/><xsl:text>"</xsl:text>
        <xsl:if test="position() != last()">,</xsl:if>
      </xsl:for-each>
      <xsl:text>],</xsl:text>
      
      <xsl:text>"langues": [</xsl:text>
      <xsl:for-each select="languages/language_skill">
        <xsl:text>"</xsl:text><xsl:value-of select="."/><xsl:text>"</xsl:text>
        <xsl:if test="position() != last()">,</xsl:if>
      </xsl:for-each>
      <xsl:text>],</xsl:text>
      
      <xsl:text>"education": [</xsl:text>
      <xsl:for-each select="education/degree">
        <xsl:text>"</xsl:text><xsl:value-of select="."/><xsl:text>"</xsl:text>
        <xsl:if test="position() != last()">,</xsl:if>
      </xsl:for-each>
      <xsl:text>],</xsl:text>
      
      <xsl:text>"experience": [</xsl:text>
      <xsl:for-each select="experience/job">
        <xsl:text>"</xsl:text><xsl:value-of select="."/><xsl:text>"</xsl:text>
        <xsl:if test="position() != last()">,</xsl:if>
      </xsl:for-each>
      <xsl:text>],</xsl:text>
      
      <xsl:text>"projects": [</xsl:text>
      <xsl:for-each select="projects/project">
        <xsl:text>"</xsl:text><xsl:value-of select="."/><xsl:text>"</xsl:text>
        <xsl:if test="position() != last()">,</xsl:if>
      </xsl:for-each>
      <xsl:text>]</xsl:text>
      
      <xsl:text>}</xsl:text>
      <xsl:if test="position() != last()">,</xsl:if>
    </xsl:for-each>
    
    <xsl:text>},</xsl:text>
    <xsl:text>"titles": {</xsl:text>
    
    <xsl:for-each select="titles/title_set">
      <xsl:text>"</xsl:text><xsl:value-of select="@lang"/><xsl:text>": {</xsl:text>
      <xsl:for-each select="title_item">
        <xsl:text>"</xsl:text><xsl:value-of select="@key"/><xsl:text>": "</xsl:text><xsl:value-of select="."/><xsl:text>"</xsl:text>
        <xsl:if test="position() != last()">,</xsl:if>
      </xsl:for-each>
      <xsl:text>}</xsl:text>
      <xsl:if test="position() != last()">,</xsl:if>
    </xsl:for-each>
    
    <xsl:text>}</xsl:text>
    <xsl:text>}</xsl:text>
  </xsl:template>
</xsl:stylesheet>