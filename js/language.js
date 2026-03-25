
const translations = {
    en: {
        // Navigation
        home: "Home",
        simulations: "Simulations",
        games: "Games",
        accessibility: "Accessibility",
        tutorials: "Tutorials",
        progress: "Progress",
        subjects: "Subjects",
        tools: "Tools",
        planner: "Study Planner",
        all_subjects: "View All",
        
        // Subjects
        subject_algebra: "Algebra",
        subject_geometry: "Geometry",
        subject_precalculus: "Pre-Calculus",
        subject_calculus: "Calculus",
        subject_probability: "Probability",
        subject_statistics: "Statistics",
        subject_trigonometry: "Trigonometry",
        
        // Algebra topics
        algebra_linear: "Linear Equations",
        algebra_quadratic: "Quadratic Equations",
        algebra_systems: "Systems of Equations",
        algebra_polynomials: "Polynomials",
        algebra_inequalities: "Inequalities",
        algebra_exponents: "Exponents & Logarithms",
        
        // Geometry topics
        geometry_triangles: "Triangles",
        geometry_circles: "Circles",
        geometry_angles: "Angles",
        geometry_area: "Area & Perimeter",
        geometry_volume: "Volume",
        geometry_transformations: "Transformations",
        geometry_pythagorean: "Pythagorean Theorem",
        
        // Pre-Calculus topics
        precalc_functions: "Functions",
        precalc_trig: "Trigonometry",
        precalc_limits: "Limits",
        precalc_sequences: "Sequences & Series",
        precalc_vectors: "Vectors",
        precalc_polar: "Polar Coordinates",
        precalc_complex: "Complex Numbers",
        
        // Calculus topics
        calculus_limits: "Limits Review",
        calculus_derivatives: "Derivatives",
        calculus_integrals: "Integrals",
        calculus_applications: "Applications",
        calculus_differential: "Differential Equations",
        calculus_series: "Series",
        calculus_multivariable: "Multivariable Calculus",
        
        // Probability topics
        probability_basic: "Basic Probability",
        probability_conditional: "Conditional Probability",
        probability_distributions: "Distributions",
        probability_combinations: "Combinations & Permutations",
        probability_statistics: "Statistics",
        probability_bayes: "Bayes' Theorem",
        probability_random: "Random Variables",
        
        // Games
        game_slope: "Slope Challenge",
        game_algebra: "Algebra Challenge",
        game_geometry: "Geometry Dash",
        game_probability: "Probability Puzzle",
        game_calculus: "Calculus Runner",
        game_equation: "Equation Solver Game",
        
        // Game UI
        game_score: "Score",
        game_level: "Level",
        game_lives: "Lives",
        game_streak: "Streak",
        game_correct: "Correct!",
        game_incorrect: "Try Again",
        game_hint: "Hint",
        game_next: "Next Question",
        game_new: "New Game",
        game_game_over: "Game Over",
        
        // Simulations
        simulation_title: "Interactive Function Plotter",
        simulation_linear: "Linear Functions",
        simulation_quadratic: "Quadratic Functions",
        simulation_cubic: "Cubic Functions",
        simulation_trig: "Trigonometric Functions",
        simulation_exponential: "Exponential Functions",
        simulation_calculus: "Derivative Explorer",
        
        simulation_param_a: "a:",
        simulation_param_b: "b:",
        simulation_param_c: "c:",
        simulation_param_m: "Slope (m):",
        simulation_param_b_intercept: "Intercept (b):",
        simulation_param_amplitude: "Amplitude:",
        simulation_param_frequency: "Frequency:",
        simulation_param_phase: "Phase:",
        simulation_param_point: "Point:",
        simulation_param_delta: "Δx:",
        
        simulation_preset_reset: "Reset",
        simulation_preset_ushape: "U-Shape",
        simulation_preset_nshape: "∩-Shape",
        simulation_preset_wide: "Wide",
        simulation_preset_basic: "Basic",
        simulation_preset_shifted: "Shifted",
        
        simulation_equation: "f(x) =",
        simulation_save: "Save Graph",
        simulation_load: "Load Graph",
        simulation_tip: "Press Ctrl+S to save, Ctrl+L to load",
        
        // Homepage
        welcome: "Learn Math Through Play",
        tagline: "Interactive simulations and games that make math fun and accessible for everyone",
        explore_simulations: "Explore Simulations",
        play_games: "Play Games",
        how_it_works: "How MathSim Works",
        feature_simulations_title: "Interactive Simulations",
        feature_simulations_desc: "Adjust parameters and see math come alive with real-time graphs",
        feature_games_title: "Fun Math Games",
        feature_games_desc: "Practice math skills through engaging games with adaptive difficulty",
        feature_accessibility_title: "Accessible for All",
        feature_accessibility_desc: "Multiple languages, screen reader support, and customizable display",
        feature_offline_title: "Learn Anywhere",
        feature_offline_desc: "Works offline! Download and learn even without internet",
        try_it_now: "Try It Now",
        graph_plotter: "Function Plotter",
        quick_game: "Quick Math Game",
        open_simulator: "Open Simulator",
        play_now: "Play Now",
        accessibility_ready: "Accessibility Ready",
        accessibility_text: "This site supports screen readers, keyboard navigation, and multiple languages.",
        customize: "Customize Settings",
        
        // Dashboard
        dashboard_welcome: "Welcome back",
        dashboard_learner: "Math Learner",
        dashboard_resume: "Resume Learning",
        dashboard_last: "Your last activity",
        dashboard_continue: "Continue",
        dashboard_daily: "Today's Goal",
        dashboard_quick: "Quick Access",
        dashboard_recent: "Recent Activity",
        dashboard_recommended: "Recommended For You",
        dashboard_progress: "Your Progress",
        dashboard_achievements: "Achievements",
        dashboard_streak: "Current Streak",
        
        // Progress page
        progress_title: "Your Learning Progress",
        progress_tutorials: "Tutorials Watched",
        progress_games: "Games Played",
        progress_accuracy: "Accuracy",
        progress_best: "Best Score",
        progress_time: "Study Time",
        progress_correct: "Correct Answers",
        progress_weekly: "Weekly Activity",
        progress_skills: "Skills Assessment",
        progress_timeline: "Learning Timeline",
        progress_reset: "Reset Progress",
        progress_export: "Export Data",
        
        // Achievements
        achievement_first: "First Steps",
        achievement_first_desc: "Watch your first tutorial",
        achievement_scholar: "Scholar",
        achievement_scholar_desc: "Watch 10 tutorials",
        achievement_player: "Player",
        achievement_player_desc: "Play your first game",
        achievement_master: "Math Master",
        achievement_master_desc: "Get 100 correct answers",
        achievement_precision: "Precision",
        achievement_precision_desc: "Reach 90% accuracy",
        achievement_champion: "Champion",
        achievement_champion_desc: "Score 100 points",
        achievement_dedicated: "Dedicated",
        achievement_dedicated_desc: "Study for 1 hour",
        achievement_streak: "Streak Master",
        achievement_streak_desc: "7 day streak",
        
        // Tutorials
        tutorials_title: "Tutorials & Examples",
        tutorials_all: "All",
        tutorials_basics: "Basics",
        tutorials_intermediate: "Intermediate",
        tutorials_advanced: "Advanced",
        tutorials_watch: "Watch Tutorial",
        tutorials_guide: "Read Guide",
        tutorials_points: "Key Points",
        
        // Accessibility page
        accessibility_title: "Accessibility Settings",
        accessibility_visual: "Visual Settings",
        accessibility_audio: "Audio Settings",
        accessibility_language: "Language & Regional",
        accessibility_learning: "Learning Support",
        accessibility_keyboard: "Keyboard & Navigation",
        accessibility_color: "Color & Theme",
        
        accessibility_high_contrast: "High Contrast Mode",
        accessibility_large_text: "Large Text Mode",
        accessibility_reduced_motion: "Reduced Motion",
        accessibility_dyslexic: "Dyslexic-Friendly Font",
        accessibility_screen_reader: "Screen Reader Optimized",
        accessibility_sound: "Sound Effects",
        accessibility_verbal: "Verbal Instructions",
        
        accessibility_save: "Save Settings",
        accessibility_reset: "Reset to Defaults",
        accessibility_test: "Test Settings",
        
        // Planner
        planner_title: "Study Planner",
        planner_goals: "Learning Goals",
        planner_schedule: "Weekly Schedule",
        planner_reminders: "Study Reminders",
        planner_add_goal: "Add Goal",
        planner_set_reminder: "Set Reminder",
        planner_complete: "Complete",
        
        // Footer
        about: "About MathSim",
        about_text: "Making math accessible and fun through interactive simulations and games.",
        quick_links: "Quick Links",
        accessibility_features: "Accessibility Features",
        rights: "All rights reserved.",
        works_offline: "Works offline",
        learn_more: "Learn more →",
        footer_install: "Install as app for offline use",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms of Use",
        footer_contact: "Contact Us",
        
        // Buttons
        btn_start: "Start",
        btn_explore: "Explore",
        btn_play: "Play",
        btn_learn: "Learn",
        btn_continue: "Continue",
        btn_back: "Back",
        btn_next: "Next",
        btn_submit: "Submit",
        btn_cancel: "Cancel",
        btn_save: "Save",
        btn_delete: "Delete",
        btn_edit: "Edit",
        
        // Time
        time_minutes: "min",
        time_hours: "hours",
        time_days: "days",
        time_today: "Today",
        time_yesterday: "Yesterday",
        time_ago: "ago",
        
        // Errors
        error_loading: "Error loading content",
        error_offline: "You are offline",
        error_try_again: "Please try again",
        error_not_found: "Page not found",
        
        // Success messages
        success_saved: "Progress saved",
        success_achievement: "Achievement unlocked!",
        success_level_up: "Level up!",
        
        // Tooltips
        tooltip_theme: "Toggle dark/light mode",
        tooltip_language: "Change language",
        tooltip_menu: "Toggle menu",
        tooltip_install: "Install app",
        tooltip_fullscreen: "Fullscreen"
    },

    es: {
        // Navigation
        home: "Inicio",
        simulations: "Simulaciones",
        games: "Juegos",
        accessibility: "Accesibilidad",
        tutorials: "Tutoriales",
        progress: "Progreso",
        subjects: "Materias",
        tools: "Herramientas",
        planner: "Planificador",
        all_subjects: "Ver Todo",
        
        // Subjects
        subject_algebra: "Álgebra",
        subject_geometry: "Geometría",
        subject_precalculus: "Pre-Cálculo",
        subject_calculus: "Cálculo",
        subject_probability: "Probabilidad",
        subject_statistics: "Estadística",
        subject_trigonometry: "Trigonometría",
        
        // Algebra topics
        algebra_linear: "Ecuaciones Lineales",
        algebra_quadratic: "Ecuaciones Cuadráticas",
        algebra_systems: "Sistemas de Ecuaciones",
        algebra_polynomials: "Polinomios",
        algebra_inequalities: "Desigualdades",
        algebra_exponents: "Exponentes y Logaritmos",
        
        // Geometry topics
        geometry_triangles: "Triángulos",
        geometry_circles: "Círculos",
        geometry_angles: "Ángulos",
        geometry_area: "Área y Perímetro",
        geometry_volume: "Volumen",
        geometry_transformations: "Transformaciones",
        geometry_pythagorean: "Teorema de Pitágoras",
        
        // Game UI
        game_score: "Puntuación",
        game_level: "Nivel",
        game_lives: "Vidas",
        game_streak: "Racha",
        game_correct: "¡Correcto!",
        game_incorrect: "Intenta de Nuevo",
        game_hint: "Pista",
        game_next: "Siguiente Pregunta",
        game_new: "Nuevo Juego",
        game_game_over: "Juego Terminado",
        
        // Homepage
        welcome: "Aprende Matemáticas Jugando",
        tagline: "Simulaciones interactivas y juegos que hacen las matemáticas divertidas para todos",
        explore_simulations: "Explorar Simulaciones",
        play_games: "Jugar Ahora",
        how_it_works: "Cómo Funciona MathSim",
        feature_simulations_title: "Simulaciones Interactivas",
        feature_simulations_desc: "Ajusta parámetros y ve las matemáticas cobrar vida",
        feature_games_title: "Juegos Divertidos",
        feature_games_desc: "Practica matemáticas con juegos interactivos",
        feature_accessibility_title: "Accesible para Todos",
        feature_accessibility_desc: "Múltiples idiomas y opciones personalizables",
        feature_offline_title: "Aprende Donde Sea",
        feature_offline_desc: "Funciona sin internet",
        try_it_now: "Pruébalo Ahora",
        graph_plotter: "Graficador de Funciones",
        quick_game: "Juego Rápido",
        open_simulator: "Abrir Simulador",
        play_now: "Jugar",
        accessibility_ready: "Listo para Accesibilidad",
        accessibility_text: "Soporte para lectores de pantalla y múltiples idiomas",
        customize: "Personalizar Configuración",
        
        // Dashboard
        dashboard_welcome: "Bienvenido de nuevo",
        dashboard_learner: "Aprendiz de Matemáticas",
        dashboard_resume: "Continuar Aprendiendo",
        dashboard_continue: "Continuar",
        dashboard_daily: "Meta de Hoy",
        dashboard_quick: "Acceso Rápido",
        dashboard_recent: "Actividad Reciente",
        dashboard_progress: "Tu Progreso",
        
        // Progress
        progress_title: "Tu Progreso de Aprendizaje",
        progress_accuracy: "Precisión",
        progress_best: "Mejor Puntuación",
        progress_time: "Tiempo de Estudio",
        progress_reset: "Reiniciar Progreso",
        
        // Buttons
        btn_start: "Comenzar",
        btn_explore: "Explorar",
        btn_play: "Jugar",
        btn_learn: "Aprender",
        btn_continue: "Continuar",
        btn_save: "Guardar",
        btn_cancel: "Cancelar",
        
        // Footer
        about: "Acerca de MathSim",
        about_text: "Haciendo las matemáticas accesibles para todos",
        quick_links: "Enlaces Rápidos",
        accessibility_features: "Características de Accesibilidad",
        rights: "Todos los derechos reservados",
        works_offline: "Funciona sin internet",
        learn_more: "Saber más →",
        footer_install: "Instalar como app para uso sin conexión",
        
        // Time
        time_today: "Hoy",
        time_yesterday: "Ayer",
        
        // Errors
        error_offline: "Estás sin conexión",
        error_try_again: "Por favor intenta de nuevo"
    },

    fr: {
        // Navigation
        home: "Accueil",
        simulations: "Simulations",
        games: "Jeux",
        accessibility: "Accessibilité",
        tutorials: "Tutoriels",
        progress: "Progrès",
        subjects: "Sujets",
        
        // Subjects
        subject_algebra: "Algèbre",
        subject_geometry: "Géométrie",
        subject_calculus: "Calcul",
        subject_probability: "Probabilité",
        
        // Homepage
        welcome: "Apprenez les Mathématiques en Jouant",
        tagline: "Des simulations et jeux interactifs qui rendent les mathématiques amusantes et accessibles pour tous",
        explore_simulations: "Explorer les Simulations",
        play_games: "Jouer",
        feature_simulations_title: "Simulations Interactives",
        feature_games_title: "Jeux Mathématiques Amusants",
        feature_accessibility_title: "Accessible pour Tous",
        feature_offline_title: "Apprenez N'importe Où",
        try_it_now: "Essayez Maintenant",
        
        // Game UI
        game_score: "Score",
        game_level: "Niveau",
        game_correct: "Correct!",
        game_incorrect: "Essaie encore",
        
        // Buttons
        btn_start: "Commencer",
        btn_play: "Jouer",
        btn_save: "Sauvegarder",
        
        // Footer
        rights: "Tous droits réservés",
        works_offline: "Fonctionne hors ligne"
    },

    de: {
        // Navigation
        home: "Startseite",
        simulations: "Simulationen",
        games: "Spiele",
        accessibility: "Barrierefreiheit",
        tutorials: "Tutorials",
        progress: "Fortschritt",
        subjects: "Fächer",
        
        // Subjects
        subject_algebra: "Algebra",
        subject_geometry: "Geometrie",
        subject_calculus: "Analysis",
        subject_probability: "Wahrscheinlichkeit",
        
        // Homepage
        welcome: "Lerne Mathe durch Spielen",
        tagline: "Interaktive Simulationen und Spiele, die Mathe für alle zugänglich und spaßig machen",
        explore_simulations: "Simulationen Erkunden",
        play_games: "Spiele Jetzt",
        feature_simulations_title: "Interaktive Simulationen",
        feature_games_title: "Spaßige Mathe-Spiele",
        feature_accessibility_title: "Für Alle Zugänglich",
        feature_offline_title: "Lerne Überall",
        try_it_now: "Jetzt Ausprobieren",
        
        // Game UI
        game_score: "Punktzahl",
        game_level: "Level",
        game_correct: "Richtig!",
        game_incorrect: "Versuche es noch einmal",
        
        // Buttons
        btn_start: "Starten",
        btn_play: "Spielen",
        btn_save: "Speichern",
        
        // Footer
        rights: "Alle Rechte vorbehalten",
        works_offline: "Funktioniert offline"
    },

    ar: {
        // Navigation
        home: "الرئيسية",
        simulations: "المحاكيات",
        games: "الألعاب",
        accessibility: "سهولة الوصول",
        tutorials: "الدروس",
        progress: "التقدم",
        subjects: "المواد",
        
        // Subjects
        subject_algebra: "الجبر",
        subject_geometry: "الهندسة",
        subject_calculus: "التفاضل",
        subject_probability: "الاحتمالات",
        
        // Homepage
        welcome: "تعلم الرياضيات من خلال اللعب",
        tagline: "محاكيات وألعاب تفاعلية تجعل الرياضيات ممتعة ومتاحة للجميع",
        explore_simulations: "استكشاف المحاكيات",
        play_games: "العب الآن",
        try_it_now: "جربه الآن",
        
        // Game UI
        game_score: "النقاط",
        game_level: "المستوى",
        game_correct: "صحيح!",
        game_incorrect: "حاول مرة أخرى",
        
        // Buttons
        btn_start: "ابدأ",
        btn_play: "العب",
        
        // Footer
        rights: "جميع الحقوق محفوظة",
        works_offline: "يعمل بدون اتصال بالإنترنت"
    },

    zh: {
        // Navigation
        home: "首页",
        simulations: "模拟",
        games: "游戏",
        accessibility: "无障碍",
        tutorials: "教程",
        progress: "进度",
        subjects: "科目",
        
        // Subjects
        subject_algebra: "代数",
        subject_geometry: "几何",
        subject_calculus: "微积分",
        subject_probability: "概率",
        
        // Homepage
        welcome: "通过游戏学习数学",
        tagline: "互动模拟和游戏，让数学变得有趣且易于访问",
        explore_simulations: "探索模拟",
        play_games: "玩游戏",
        try_it_now: "立即试用",
        
        // Game UI
        game_score: "得分",
        game_level: "等级",
        game_correct: "正确！",
        game_incorrect: "再试一次",
        
        // Buttons
        btn_start: "开始",
        btn_play: "玩",
        
        // Footer
        rights: "版权所有",
        works_offline: "离线工作"
    },

    hi: {
        // Navigation
        home: "होम",
        simulations: "सिमुलेशन",
        games: "खेल",
        accessibility: "सुलभता",
        tutorials: "ट्यूटोरियल",
        progress: "प्रगति",
        subjects: "विषय",
        
        // Subjects
        subject_algebra: "बीजगणित",
        subject_geometry: "ज्यामिति",
        subject_calculus: "कैलकुलस",
        subject_probability: "प्रायिकता",
        
        // Homepage
        welcome: "खेल के माध्यम से गणित सीखें",
        tagline: "इंटरैक्टिव सिमुलेशन और गेम जो गणित को सभी के लिए मजेदार बनाते हैं",
        explore_simulations: "सिमुलेशन एक्सप्लोर करें",
        play_games: "खेलें",
        try_it_now: "अभी कोशिश करें",
        
        // Game UI
        game_score: "स्कोर",
        game_level: "स्तर",
        game_correct: "सही!",
        game_incorrect: "फिर से कोशिश करें",
        
        // Buttons
        btn_start: "शुरू करें",
        btn_play: "खेलें",
        
        // Footer
        rights: "सर्वाधिकार सुरक्षित",
        works_offline: "ऑफ़लाइन काम करता है"
    },

    pt: {
        // Navigation
        home: "Início",
        simulations: "Simulações",
        games: "Jogos",
        accessibility: "Acessibilidade",
        tutorials: "Tutoriais",
        progress: "Progresso",
        subjects: "Matérias",
        
        // Subjects
        subject_algebra: "Álgebra",
        subject_geometry: "Geometria",
        subject_calculus: "Cálculo",
        subject_probability: "Probabilidade",
        
        // Homepage
        welcome: "Aprenda matemática jogando",
        tagline: "Simulações interativas e jogos que tornam a matemática divertida e acessível",
        explore_simulations: "Explorar simulações",
        play_games: "Jogar",
        try_it_now: "Experimente agora",
        
        // Game UI
        game_score: "Pontuação",
        game_level: "Nível",
        game_correct: "Correto!",
        game_incorrect: "Tente novamente",
        
        // Buttons
        btn_start: "Começar",
        btn_play: "Jogar",
        
        // Footer
        rights: "Todos os direitos reservados",
        works_offline: "Funciona offline"
    }
};


// Set active language
function changeLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language ${lang} not found, falling back to English`);
        lang = 'en';
    }
    
    localStorage.setItem('mathsim-language', lang);
    localStorage.setItem('preferred-language', lang); // For backward compatibility
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        } else if (translations.en[key]) {
            // Fallback to English
            element.textContent = translations.en[key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        } else if (translations.en[key]) {
            element.placeholder = translations.en[key];
        }
    });
    
    // Update ARIA labels
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
        const key = element.getAttribute('data-i18n-aria');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('aria-label', translations[lang][key]);
        } else if (translations.en[key]) {
            element.setAttribute('aria-label', translations.en[key]);
        }
    });
    
    // Update page title if it has data-i18n
    const titleElement = document.querySelector('title[data-i18n]');
    if (titleElement) {
        const key = titleElement.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            document.title = translations[lang][key];
        } else if (translations.en[key]) {
            document.title = translations.en[key];
        }
    }
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: lang } 
    }));
    
    console.log(`Language changed to: ${lang}`);
}

// Get translated text by key
function t(key, lang = null) {
    const currentLang = lang || localStorage.getItem('mathsim-language') || 'en';
    return translations[currentLang]?.[key] || translations.en[key] || key;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check both localStorage keys for compatibility
    const savedLang = localStorage.getItem('mathsim-language') || 
                      localStorage.getItem('preferred-language') || 
                      'en';
    
    // Update language selector if it exists
    const langSelect = document.getElementById('languageSelect') || 
                       document.getElementById('lang-select');
    
    if (langSelect) {
        langSelect.value = savedLang;
        langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));
    }
    
    // Apply initial language
    changeLanguage(savedLang);
});

// Make functions globally available
window.changeLanguage = changeLanguage;
window.t = t;

// For backward compatibility
window.setLanguage = changeLanguage;