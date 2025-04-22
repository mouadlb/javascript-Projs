document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('pageLoader');

    // --- Gestion du Loader ---

    // 1. Cacher le loader une fois la page chargée
    // Utiliser window.onload est souvent mieux ici car il attend les images, etc.
    window.addEventListener('load', () => {
        if (loader) {
            // Utiliser une classe pour cacher permet d'utiliser la transition CSS
            loader.classList.add('hidden');
            // Alternative (moins fluide) : loader.style.display = 'none';
        }
    });

    // 2. Afficher le loader juste avant de quitter la page
    // L'événement 'beforeunload' se déclenche quand on navigue ailleurs
    window.addEventListener('beforeunload', () => {
        if (loader) {
            // Remettre visible juste avant que la page ne se décharge
            loader.classList.remove('hidden');
            // Alternative : loader.style.display = 'flex';
        }
    });

    // 3. Gestion du Back/Forward Cache (bfcache)
    // Si l'utilisateur utilise les boutons Précédent/Suivant, la page peut être restaurée
    // depuis le cache sans déclencher 'load'. 'pageshow' gère ce cas.
    window.addEventListener('pageshow', (event) => {
        // event.persisted est true si la page vient du bfcache
        if (event.persisted && loader) {
            // S'assurer que le loader est bien caché si on revient via bfcache
             loader.classList.add('hidden');
            // Alternative : loader.style.display = 'none';
        }
    });
    // --- Section Traduction ---
    let currentLang = 'fr'; // Langue par défaut
    const langSwitchBtn = document.getElementById('langSwitchBtn');

    const translations = {
        'fr': {
            'pageTitle': 'Mouad Guarraz - Portfolio de Projets JS',
            'navAbout': 'À Propos',
            'navTpDom': 'TP DOM',
            'navDocs': 'Cours',
            'navProjects': 'Mes projets',
            'langSwitch': 'English', // Texte du bouton quand FR est affiché
            'heroTitle': 'Découvrez mes Projets JavaScript',
            'heroSubtitle': 'Une collection de travaux réalisés avec passion (et quelques bugs surmontés).',
            'heroBtnProjects': 'Mes projets',
            'heroBtnDocs': 'Voir TP',
            'aboutTitle': 'À Propos de cette Page (et de mes efforts surhumains)',
            'aboutIntro': 'Cette page est humblement dédiée à <strong class="text-primary">M. Salhi</strong>, pour lui présenter le fruit d\'innombrables heures de labeur acharné (et de quelques litres de café).',
            'aboutPara1': 'Naviguer à travers ces projets n\'a pas été une mince affaire, un véritable parcours du combattant digital où chaque fonction JavaScript était une énigme et chaque point-virgule oublié, une potentielle catastrophe. Ce fut... <em class="fst-italic">formateur</em>, dirons-nous.',
            'aboutPara2': 'Chaque ligne de code est une preuve de persévérance face à l\'adversité des bugs et des concepts parfois... abstraits. La console du navigateur est devenue ma confidente, témoin de mes moments de doute et de mes (rares) éclairs de génie.',
            'aboutPara3': 'J\'espère sincèrement que ce portfolio témoignera de l\'effort fourni et saura toucher votre sensibilité... et votre barème de notation. Une excellente note serait, disons-le, la juste récompense pour ces nuits blanches passées à déchiffrer les mystères de l\'asynchrone. 😉',
            'searchPlaceholder': 'Rechercher un projet par titre ou mot-clé...',
            'projectsTitle': 'Mes Projets',
            'noResults': '😕 Aucun projet ne correspond à votre recherche.',
            'footerText': '&copy; 2024 Mouad Guarraz - Tous droits réservés (surtout le droit à une bonne note).',
            'projectCardButton': 'Voir le projet' // Texte pour les boutons des cartes
        },
        'en': {
            'pageTitle': 'Mouad Guarraz - JS Projects Portfolio',
            'navAbout': 'About',
            'navTpDom': 'DOM TP',
            'navDocs': 'Documentation',
            'navProjects': 'My Projects',
            'langSwitch': 'Français', // Texte du bouton quand EN est affiché
            'heroTitle': 'Discover my JavaScript Projects',
            'heroSubtitle': 'A collection of work crafted with passion (and a few overcome bugs).',
            'heroBtnProjects': 'My Projects',
            'heroBtnDocs': 'Documentation',
            'aboutTitle': 'About This Page (and my superhuman efforts)',
            'aboutIntro': 'This page is humbly dedicated to <strong class="text-primary">Mr. Salhi</strong>, to present the fruit of countless hours of hard work (and several liters of coffee).',
            'aboutPara1': 'Navigating through these projects was no easy task, a true digital obstacle course where each JavaScript function was a puzzle and every forgotten semicolon a potential disaster. It was... <em class="fst-italic">educational</em>, let\'s say.',
            'aboutPara2': 'Each line of code is proof of perseverance against the adversity of bugs and sometimes... abstract concepts. The browser console became my confidante, witness to my moments of doubt and my (rare) flashes of genius.',
            'aboutPara3': 'I sincerely hope that this portfolio will testify to the effort involved and will appeal to your sensitivity... and your grading scale. An excellent grade would be, let\'s face it, the fair reward for those sleepless nights spent deciphering the mysteries of asynchronous code. 😉',
            'searchPlaceholder': 'Search for a project by title or keyword...',
            'projectsTitle': 'My Projects',
            'noResults': '😕 No projects match your search.',
            'footerText': '&copy; 2024 Mouad Guarraz - All rights reserved (especially the right to a good grade).',
            'projectCardButton': 'View Project' // Texte pour les boutons des cartes
        }
    };

    function setLanguage(lang) {
        currentLang = lang; // Met à jour la variable globale
        document.documentElement.lang = lang; // Met à jour l'attribut lang de <html>

        // Sélectionne tous les éléments avec l'attribut data-translate-key
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            const translation = translations[lang][key];

            if (translation !== undefined) {
                // Gérer les cas spéciaux comme les placeholders ou le titre de la page
                if (key === 'searchPlaceholder') {
                    element.placeholder = translation;
                } else if (key === 'pageTitle') {
                    element.textContent = translation;
                } else if (element.id === 'langSwitchBtn') {
                    element.textContent = translation; // Met à jour le texte du bouton de langue
                }
                 else {
                    // Utiliser innerHTML pour permettre les balises comme <strong> ou <em>
                    element.innerHTML = translation;
                }
            } else {
                console.warn(`Clé de traduction manquante pour "${key}" en langue "${lang}"`);
            }
        });

        // Rafraîchir l'affichage des projets avec la nouvelle langue
        displayProjects(getFilteredProjects()); // Utilise une fonction pour obtenir les projets filtrés actuels
    }

    // Ajoute l'écouteur au bouton
    if (langSwitchBtn) {
        langSwitchBtn.addEventListener('click', () => {
            const newLang = currentLang === 'fr' ? 'en' : 'fr';
            setLanguage(newLang);
        });
    }
    // --- Fin Section Traduction ---


    // --- Section Recherche et Affichage Projets ---
    // MODIFIER ICI : Inclure les traductions dans les données des projets
    const allProjects = [
         { id: 1, title: { fr: "Citations inspirantes", en: "Inspiring Quotes" }, description: { fr: "Générateur de citations aléatoires.", en: "Random quote generator." }, imageUrl: "images/citation.png", linkUrl: "./Proj/projet1.html", keywords: "citation, api, aléatoire, quote, random" },
         { id: 2, title: { fr: "Chronometre", en: "Stopwatch" }, description: { fr: "Un chronomètre simple et fonctionnel.", en: "A simple and functional stopwatch." }, imageUrl: "images/chrono.png", linkUrl: "./Proj/projet2.html", keywords: "temps, stopwatch, mesure, time, measure" },
         { id: 3, title: { fr: "Generateur de mot de passe", en: "Password Generator" }, description: { fr: "Crée des mots de passe sécurisés.", en: "Creates secure passwords." }, imageUrl: "images/genmdp.png", linkUrl: "./Proj/projet3.html", keywords: "sécurité, password, aléatoire, security, random" },
         { id: 4, title: { fr: "Formulaire de Contact", en: "Contact Form" }, description: { fr: "Validation de formulaire simple.", en: "Simple form validation." }, imageUrl: "images/form.png", linkUrl: "./Proj/projet4.html", keywords: "form, validation, contact" },
         { id: 5, title: { fr: "Convertisseur Température", en: "Temperature Converter" }, description: { fr: "Convertit Celsius en Fahrenheit.", en: "Converts Celsius to Fahrenheit." }, imageUrl: "images/temp.png", linkUrl: "./Proj/projet5.html", keywords: "conversion, celsius, fahrenheit, temperature" },
         { id: 6, title: { fr: "To-Do List", en: "To-Do List" }, description: { fr: "Gestionnaire de tâches basique.", en: "Basic task manager." }, imageUrl: "images/todo.png", linkUrl: "./Proj/projet6.html", keywords: "tâches, liste, organisation, tasks, list" },
         { id: 7, title: { fr: "Liste de Films", en: "Movie List" }, description: { fr: "Ajoutez et supprimez des films.", en: "Add and remove movies." }, imageUrl: "images/movies.png", linkUrl: "./Proj/projet7.html", keywords: "films, liste, cinéma, movies, list, cinema" }
        // ... ajoute tes autres projets ici avec leurs traductions
    ];

    const projectGrid = document.getElementById('projectGrid');
    const searchInput = document.getElementById('searchInput');
    const noResultsDiv = document.getElementById('noResults');

    // MODIFIER ICI : Fonction displayProjects pour utiliser currentLang
    function displayProjects(projectsToDisplay) {
        projectGrid.innerHTML = '';
        noResultsDiv.style.display = 'none';

        if (projectsToDisplay.length === 0) {
            noResultsDiv.style.display = 'block';
            return;
        }

        projectsToDisplay.forEach(project => {
            const col = document.createElement('div');
            col.classList.add('col');
            // Utilise currentLang pour obtenir le texte correct
            col.innerHTML = `
                <div class="card h-100 shadow-sm project-card">
                    <img src="${project.imageUrl || 'https://via.placeholder.com/400x200/dee2e6/6c757d?text=Image'}" class="card-img-top" alt="${project.title[currentLang]}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${project.title[currentLang]}</h5>
                        <p class="card-text">${project.description[currentLang]}</p>
                        <a href="${project.linkUrl}" class="btn btn-outline-primary mt-auto">${translations[currentLang]['projectCardButton']}</a>
                    </div>
                </div>
            `;
            projectGrid.appendChild(col);
        });
    }

    // Fonction pour obtenir les projets filtrés (utilisée par setLanguage et l'écouteur de recherche)
    function getFilteredProjects() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '') {
            return allProjects;
        }
        return allProjects.filter(project => {
            // Recherche dans la langue actuelle
            const titleMatch = project.title[currentLang].toLowerCase().includes(searchTerm);
            const descriptionMatch = project.description[currentLang].toLowerCase().includes(searchTerm);
            // Garde la recherche par mots-clés (suppose qu'ils sont universels ou incluent les deux langues)
            const keywordsMatch = project.keywords.toLowerCase().includes(searchTerm);
            return titleMatch || descriptionMatch || keywordsMatch;
        });
    }

    // Écouteur d'événement sur l'input de recherche (appelle displayProjects avec les projets filtrés)
    searchInput.addEventListener('input', () => {
        displayProjects(getFilteredProjects());
    });

    // Affichage initial (appelle setLanguage qui appelle displayProjects)
    setLanguage(currentLang);

}); // Fin de DOMContentLoaded
