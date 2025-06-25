
    let currentLang = 'fr';
    let cvData = null;
    let isUsingFallback = false;

    // Créer les particules d'arrière-plan
    function createParticles() {
      const particlesContainer = document.getElementById('particles');
      const particleCount = 20;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        particlesContainer.appendChild(particle);
      }
    }

    // Fonction pour afficher/masquer les éléments de l'interface
    function showLoading() {
      document.getElementById('loading').style.display = 'block';
      document.getElementById('content').style.display = 'none';
      document.getElementById('error').style.display = 'none';
    }

    function showError() {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('content').style.display = 'block';
      document.getElementById('error').style.display = 'block';
    }

    function showContent() {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('content').style.display = 'block';
      document.getElementById('error').style.display = 'none';
    }

    // Fonction pour charger et transformer le XML
    async function loadXMLData() {
      try {
        console.log('Chargement du XML...');
        
        // Charger le XML
        const xmlResponse = await fetch('cv.xml');
        if (!xmlResponse.ok) {
          throw new Error(`Erreur HTTP ${xmlResponse.status}: ${xmlResponse.statusText}`);
        }
        const xmlText = await xmlResponse.text();
        console.log('XML chargé avec succès');
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Vérifier les erreurs de parsing XML
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) {
          throw new Error('Erreur de parsing XML: ' + parseError.textContent);
        }

        console.log('Chargement du XSLT...');
        
        // Charger le XSLT
        const xsltResponse = await fetch('cv-to-json.xslt');
        if (!xsltResponse.ok) {
          throw new Error(`Erreur HTTP ${xsltResponse.status}: ${xsltResponse.statusText}`);
        }
        const xsltText = await xsltResponse.text();
        console.log('XSLT chargé avec succès');
        
        const xsltDoc = parser.parseFromString(xsltText, 'text/xml');
        
        // Vérifier les erreurs de parsing XSLT
        const xsltParseError = xsltDoc.querySelector('parsererror');
        if (xsltParseError) {
          throw new Error('Erreur de parsing XSLT: ' + xsltParseError.textContent);
        }

        console.log('Application de la transformation XSLT...');
        
        // Transformer XML en JSON via XSLT
        const processor = new XSLTProcessor();
        processor.importStylesheet(xsltDoc);
        const resultDoc = processor.transformToDocument(xmlDoc);
        
        // Extraire le JSON du résultat
        const jsonText = resultDoc.documentElement.textContent;
        console.log('JSON généré:', jsonText.substring(0, 200) + '...');
        
        cvData = JSON.parse(jsonText);
        console.log('Transformation réussie');
        
        return cvData;
      } catch (error) {
        console.error('Erreur lors du chargement/transformation:', error);
        isUsingFallback = true;
        showError();
        return getFallbackData();
      }
    }

    // Données de fallback en cas d'erreur
    function getFallbackData() {
      console.log('Utilisation des données de fallback');
      return {
        name: "Okba Adam",
        email: "Adamokba02@outlook.fr",
        phone: "07 81 01 22 82",
        address: "5 Avenue Léon Blum, 93800 Épinay-sur-seine, France",
        languages: {
          fr: {
            title: "CV – Okba Adam",
            description: "Développeur et ingénieur cybersécurité en formation",
            skills: ["HTML5/CSS", "Python", "OCaml", "Java", "C", "Unix", "Java Swing", "OCaml unification", "Client-serveur C"],
            soft_skills: ["Rigoureux", "Polyvalent", "Déterminé"],
            interests: ["Nouvelle technologie", "Natation", "Voyage"],
            langues: ["Anglais (Avancé)", "Japonais (Intermédiaire)", "Allemand (Débutant)"],
            education: ["Diplôme Ingénieur – Sup Galilée – 2023–2026", "Licence Informatique – Institut Galilée – 2021–2023", "CPGE MPSI – Lycée Gustave Monod – 2020–2021", "Baccalauréat SSI – Lycée Jacques Feyder – 2020 – Mention Bien"],
            experience: ["Stagiaire – SFR – Janvier 2016 / Février 2016"],
            projects: ["Conception d'un jeu en Java (Swing)", "Algorithmes d'unification OCaml", "Client-serveur en C"],
            name: "Okba Adam"
          },
          ja: {
            title: "履歴書 – オクバ・アダム",
            description: "サイバーセキュリティ分野での訓練中の開発者・エンジニア",
            skills: ["HTML5/CSS", "Python", "OCaml", "Java", "C", "Unix", "Java Swing", "OCaml 一致アルゴリズム", "クライアント・サーバ C"],
            soft_skills: ["几帳面", "多才", "意欲的"],
            interests: ["新技術", "水泳", "旅行"],
            langues: ["英語（上級）", "日本語（中級）", "ドイツ語（初級）"],
            education: ["エンジニアディプロム – Sup Galilée – 2023–2026", "情報学学士 – Institut Galilée – 2021–2023", "CPGE MPSI – Gustave Monod高校 – 2020–2021", "高校卒業証書 SSI – Jacques Feyder高校 – 2020 – 優良"],
            experience: ["インターン – SFR – 2016年1月 / 2016年2月"],
            projects: ["Java（Swing）によるゲーム設計", "OCaml の一致アルゴリズム", "C によるクライアント・サーバ"],
            name: "オクバ・アダム"
          },
          en: {
            title: "CV – Okba Adam",
            description: "Developer and aspiring cybersecurity engineer",
            skills: ["HTML5/CSS", "Python", "OCaml", "Java", "C", "Unix", "Java Swing", "OCaml unification", "Client-Server in C"],
            soft_skills: ["Reliable", "Versatile", "Determined"],
            interests: ["New technologies", "Swimming", "Travel"],
            langues: ["English (Advanced)", "Japanese (Intermediate)", "German (Beginner)"],
            education: ["Graduate engineer – Sup Galilée – 2023–2026", "Bachelor of Computer Science – Institut Galilée – 2021–2023", "CPGE MPSI – Lycée Gustave Monod – 2020–2021", "High school diploma IT – Lycée Jacques Feyder – 2020 – Good"],
            experience: ["Intern – SFR – January 2016 / February 2016"],
            projects: ["Developing a game with Java (Swing)", "Unification algorithms in OCaml", "Client-server architecture in C"],
            name: "Okba Adam"
          }
        },
        titles: {
          fr: {
            "Compétences": "Compétences",
            "Langues": "Langues",
            "Soft Skills": "Soft Skills",
            "Centres d'intérêt": "Centres d'intérêt",
            "Formation": "Formation",
            "Expérience professionnelle": "Expérience professionnelle",
            "Projets informatiques": "Projets informatiques",
            "Présentation vidéo": "Présentation vidéo"
          },
          ja: {
            "Compétences": "スキル",
            "Langues": "言語",
            "Soft Skills": "ソフトスキル",
            "Centres d'intérêt": "趣味・関心",
            "Formation": "学歴",
            "Expérience professionnelle": "職務経験",
            "Projets informatiques": "情報プロジェクト",
            "Présentation vidéo": "ビデオ紹介"
          },
          en: {
            "Compétences": "Skills",
            "Langues": "Languages",
            "Soft Skills": "Soft skills",
            "Centres d'intérêt": "Interests",
            "Formation": "Education",
            "Expérience professionnelle": "Work experience",
            "Projets informatiques": "IT Projects",
            "Présentation vidéo": "Video introduction"
          }
        }
      };
    }

    // Fonction pour charger une langue
    function loadLanguage(lang) {
      console.log('Changement de langue vers:', lang);
      currentLang = lang;
      updateURL();
      updateUI();
    }

    // Fonction pour mettre à jour l'URL
    function updateURL() {
      const url = new URL(window.location);
      url.searchParams.set('lang', currentLang);
      window.history.replaceState(null, '', url);
    }

    // Fonction pour mettre à jour l'interface
    function updateUI() {
      if (!cvData) {
        console.warn('Aucune donnée CV disponible pour la mise à jour');
        return;
      }

      const d = cvData.languages[currentLang];
      const t = cvData.titles[currentLang];

      if (!d || !t) {
        console.error('Données manquantes pour la langue:', currentLang);
        return;
      }

      console.log('Mise à jour de l\'interface pour la langue:', currentLang);

      // Mise à jour du titre de la page
      document.title = d.title;

      // Informations personnelles
      document.getElementById("name").textContent = d.name;
      document.getElementById("email").textContent = cvData.email;
      document.getElementById("email").href = "mailto:" + cvData.email;
      document.getElementById("phone").textContent = cvData.phone;
      document.getElementById("address").textContent = cvData.address;
      document.getElementById("description").textContent = d.description;
      
      // Listes de données
      document.getElementById("skills").innerHTML = d.skills.map(s => `<li>${escapeHtml(s)}</li>`).join("");
      document.getElementById("langues").innerHTML = d.langues.map(s => `<li>${escapeHtml(s)}</li>`).join("");
      document.getElementById("soft_skills").innerHTML = d.soft_skills.map(s => `<li>${escapeHtml(s)}</li>`).join("");
      document.getElementById("interests").innerHTML = d.interests.map(s => `<li>${escapeHtml(s)}</li>`).join("");
      document.getElementById("education").innerHTML = d.education.map(s => `<li>${escapeHtml(s)}</li>`).join("");
      document.getElementById("experience").innerHTML = d.experience.map(s => `<li>${escapeHtml(s)}</li>`).join("");
      document.getElementById("projects").innerHTML = d.projects.map(s => `<li>${escapeHtml(s)}</li>`).join("");

      // Titres des sections
      document.getElementById("title-skills").innerHTML = `💻 ${t["Compétences"]}`;
      document.getElementById("title-langues").innerHTML = `🌍 ${t["Langues"]}`;
      document.getElementById("title-soft").innerHTML = `✨ ${t["Soft Skills"]}`;
      document.getElementById("title-interests").innerHTML = `🎯 ${t["Centres d'intérêt"]}`;
      document.getElementById("title-edu").innerHTML = `🎓 ${t["Formation"]}`;
      document.getElementById("title-exp").innerHTML = `💼 ${t["Expérience professionnelle"]}`;
      document.getElementById("title-proj").innerHTML = `🚀 ${t["Projets informatiques"]}`;
      document.getElementById("title-video").innerHTML = `🎥 ${t["Présentation vidéo"]}`;

      // Labels traduits
      const labels = {
        fr: { email: "📧 Email:", phone: "📱 Téléphone:", address: "📍 Adresse:" },
        ja: { email: "📧 メール:", phone: "📱 電話:", address: "📍 住所:" },
        en: { email: "📧 Email:", phone: "📱 Phone:", address: "📍 Address:" }
      };
      
      if (labels[currentLang]) {
        document.getElementById("email-label").innerHTML = labels[currentLang].email;
        document.getElementById("phone-label").innerHTML = labels[currentLang].phone;
        document.getElementById("address-label").innerHTML = labels[currentLang].address;
      }

      const videoUrls = {
        fr: "https://www.youtube.com/embed/pe_ejTiIcSs?cc_load_policy=1&cc_lang_pref=fr",
        ja: "https://www.youtube.com/embed/pe_ejTiIcSs?cc_load_policy=1&cc_lang_pref=ja",
        en: "https://www.youtube.com/embed/pe_ejTiIcSs?cc_load_policy=1&cc_lang_pref=en"
      };
    
      const iframe = document.getElementById("video-frame");
      if (iframe && videoUrls[currentLang]) {
        iframe.src = videoUrls[currentLang];
      }

      console.log('Interface mise à jour avec succès');
    }

    // Fonction utilitaire pour échapper le HTML
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // Fonction pour détecter la langue du navigateur
    function detectBrowserLanguage() {
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.startsWith("ja")) return "ja";
      if (browserLang.startsWith("en")) return "en";
      return "fr"; // Par défaut
    }

    // Initialisation
    document.addEventListener("DOMContentLoaded", async () => {
      console.log('Initialisation de l\'application...');
      
      // Créer les particules d'arrière-plan
      createParticles();
      
      showLoading();
      
      // Déterminer la langue par défaut
      const urlParams = new URLSearchParams(window.location.search);
      let lang = urlParams.get("lang");
      if (!lang) {
        lang = detectBrowserLanguage();
        console.log('Langue détectée du navigateur:', lang);
      }
      currentLang = lang;

      try {
        // Charger les données XML
        console.log('Chargement des données...');
        cvData = await loadXMLData();
        
        if (!isUsingFallback) {
          showContent();
        }
        
        // Mettre à jour l'URL et l'interface
        updateURL();
        updateUI();
        
        console.log('Initialisation terminée avec succès');
      } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
        showError();
      }
    });