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
        consent: "Consent",
        faq: "FAQ",
        feedback: "Feedback",
        about: "About",
        contact: "Contact",
        docs: "Documentation",
        
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
        btn_reset: "Reset",
        btn_export: "Export",
        btn_import: "Import",
        
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
        error_save_failed: "Failed to save",
        error_load_failed: "Failed to load",
        
        // Success messages
        success_saved: "Progress saved",
        success_achievement: "Achievement unlocked!",
        success_level_up: "Level up!",
        success_exported: "Data exported successfully",
        success_imported: "Data imported successfully",
        
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
        planner: "Planificador de Estudio",
        all_subjects: "Ver Todo",
        consent: "Consentimiento",
        faq: "Preguntas Frecuentes",
        feedback: "Comentarios",
        about: "Acerca de",
        contact: "Contacto",
        docs: "Documentación",
        
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
        
        // Pre-Calculus topics
        precalc_functions: "Funciones",
        precalc_trig: "Trigonometría",
        precalc_limits: "Límites",
        precalc_sequences: "Sucesiones y Series",
        precalc_vectors: "Vectores",
        precalc_polar: "Coordenadas Polares",
        precalc_complex: "Números Complejos",
        
        // Calculus topics
        calculus_limits: "Revisión de Límites",
        calculus_derivatives: "Derivadas",
        calculus_integrals: "Integrales",
        calculus_applications: "Aplicaciones",
        calculus_differential: "Ecuaciones Diferenciales",
        calculus_series: "Series",
        calculus_multivariable: "Cálculo Multivariable",
        
        // Probability topics
        probability_basic: "Probabilidad Básica",
        probability_conditional: "Probabilidad Condicional",
        probability_distributions: "Distribuciones",
        probability_combinations: "Combinaciones y Permutaciones",
        probability_statistics: "Estadística",
        probability_bayes: "Teorema de Bayes",
        probability_random: "Variables Aleatorias",
        
        // Games
        game_slope: "Desafío de Pendiente",
        game_algebra: "Desafío de Álgebra",
        game_geometry: "Geometría Dash",
        game_probability: "Rompecabezas de Probabilidad",
        game_calculus: "Corredor de Cálculo",
        game_equation: "Juego de Solución de Ecuaciones",
        
        // Game UI
        game_score: "Puntuación",
        game_level: "Nivel",
        game_lives: "Vidas",
        game_streak: "Racha",
        game_correct: "¡Correcto!",
        game_incorrect: "Inténtalo de Nuevo",
        game_hint: "Pista",
        game_next: "Siguiente Pregunta",
        game_new: "Nuevo Juego",
        game_game_over: "Juego Terminado",
        
        // Simulations
        simulation_title: "Trazador de Funciones Interactivo",
        simulation_linear: "Funciones Lineales",
        simulation_quadratic: "Funciones Cuadráticas",
        simulation_cubic: "Funciones Cúbicas",
        simulation_trig: "Funciones Trigonométricas",
        simulation_exponential: "Funciones Exponenciales",
        simulation_calculus: "Explorador de Derivadas",
        
        simulation_param_a: "a:",
        simulation_param_b: "b:",
        simulation_param_c: "c:",
        simulation_param_m: "Pendiente (m):",
        simulation_param_b_intercept: "Intersección (b):",
        simulation_param_amplitude: "Amplitud:",
        simulation_param_frequency: "Frecuencia:",
        simulation_param_phase: "Fase:",
        simulation_param_point: "Punto:",
        simulation_param_delta: "Δx:",
        
        simulation_preset_reset: "Reiniciar",
        simulation_preset_ushape: "Forma de U",
        simulation_preset_nshape: "Forma de ∩",
        simulation_preset_wide: "Ancho",
        simulation_preset_basic: "Básico",
        simulation_preset_shifted: "Desplazado",
        
        simulation_equation: "f(x) =",
        simulation_save: "Guardar Gráfico",
        simulation_load: "Cargar Gráfico",
        simulation_tip: "Presiona Ctrl+G para guardar, Ctrl+C para cargar",
        
        // Homepage
        welcome: "Aprende Matemáticas Jugando",
        tagline: "Simulaciones interactivas y juegos que hacen las matemáticas divertidas y accesibles para todos",
        explore_simulations: "Explorar Simulaciones",
        play_games: "Jugar",
        how_it_works: "Cómo Funciona MathSim",
        feature_simulations_title: "Simulaciones Interactivas",
        feature_simulations_desc: "Ajusta parámetros y ve las matemáticas cobrar vida",
        feature_games_title: "Juegos Divertidos",
        feature_games_desc: "Practica matemáticas con juegos interactivos de dificultad adaptativa",
        feature_accessibility_title: "Accesible para Todos",
        feature_accessibility_desc: "Múltiples idiomas, soporte para lectores de pantalla y opciones personalizables",
        feature_offline_title: "Aprende en Cualquier Lugar",
        feature_offline_desc: "¡Funciona sin conexión! Descarga y aprende sin internet",
        try_it_now: "Pruébalo Ahora",
        graph_plotter: "Trazador de Funciones",
        quick_game: "Juego Rápido de Matemáticas",
        open_simulator: "Abrir Simulador",
        play_now: "Jugar Ahora",
        accessibility_ready: "Listo para Accesibilidad",
        accessibility_text: "Este sitio es compatible con lectores de pantalla, navegación por teclado y múltiples idiomas.",
        customize: "Personalizar Configuración",
        
        // Dashboard
        dashboard_welcome: "Bienvenido de nuevo",
        dashboard_learner: "Aprendiz de Matemáticas",
        dashboard_resume: "Continuar Aprendiendo",
        dashboard_last: "Tu última actividad",
        dashboard_continue: "Continuar",
        dashboard_daily: "Meta de Hoy",
        dashboard_quick: "Acceso Rápido",
        dashboard_recent: "Actividad Reciente",
        dashboard_recommended: "Recomendado para Ti",
        dashboard_progress: "Tu Progreso",
        dashboard_achievements: "Logros",
        dashboard_streak: "Racha Actual",
        
        // Progress page
        progress_title: "Tu Progreso de Aprendizaje",
        progress_tutorials: "Tutoriales Vistos",
        progress_games: "Juegos Jugados",
        progress_accuracy: "Precisión",
        progress_best: "Mejor Puntuación",
        progress_time: "Tiempo de Estudio",
        progress_correct: "Respuestas Correctas",
        progress_weekly: "Actividad Semanal",
        progress_skills: "Evaluación de Habilidades",
        progress_timeline: "Línea de Tiempo de Aprendizaje",
        progress_reset: "Reiniciar Progreso",
        progress_export: "Exportar Datos",
        
        // Achievements
        achievement_first: "Primeros Pasos",
        achievement_first_desc: "Mira tu primer tutorial",
        achievement_scholar: "Estudioso",
        achievement_scholar_desc: "Mira 10 tutoriales",
        achievement_player: "Jugador",
        achievement_player_desc: "Juega tu primer juego",
        achievement_master: "Maestro de Matemáticas",
        achievement_master_desc: "Obtén 100 respuestas correctas",
        achievement_precision: "Precisión",
        achievement_precision_desc: "Alcanza 90% de precisión",
        achievement_champion: "Campeón",
        achievement_champion_desc: "Puntúa 100 puntos",
        achievement_dedicated: "Dedicado",
        achievement_dedicated_desc: "Estudia por 1 hora",
        achievement_streak: "Maestro de la Racha",
        achievement_streak_desc: "Racha de 7 días",
        
        // Tutorials
        tutorials_title: "Tutoriales y Ejemplos",
        tutorials_all: "Todos",
        tutorials_basics: "Básicos",
        tutorials_intermediate: "Intermedio",
        tutorials_advanced: "Avanzado",
        tutorials_watch: "Ver Tutorial",
        tutorials_guide: "Leer Guía",
        tutorials_points: "Puntos Clave",
        
        // Accessibility page
        accessibility_title: "Configuración de Accesibilidad",
        accessibility_visual: "Configuración Visual",
        accessibility_audio: "Configuración de Audio",
        accessibility_language: "Idioma y Regional",
        accessibility_learning: "Apoyo al Aprendizaje",
        accessibility_keyboard: "Teclado y Navegación",
        accessibility_color: "Color y Tema",
        
        accessibility_high_contrast: "Modo de Alto Contraste",
        accessibility_large_text: "Modo de Texto Grande",
        accessibility_reduced_motion: "Movimiento Reducido",
        accessibility_dyslexic: "Fuente Amigable para Disléxicos",
        accessibility_screen_reader: "Optimizado para Lectores de Pantalla",
        accessibility_sound: "Efectos de Sonido",
        accessibility_verbal: "Instrucciones Verbales",
        
        accessibility_save: "Guardar Configuración",
        accessibility_reset: "Restablecer a Valores Predeterminados",
        accessibility_test: "Probar Configuración",
        
        // Planner
        planner_title: "Planificador de Estudio",
        planner_goals: "Metas de Aprendizaje",
        planner_schedule: "Horario Semanal",
        planner_reminders: "Recordatorios de Estudio",
        planner_add_goal: "Agregar Meta",
        planner_set_reminder: "Establecer Recordatorio",
        planner_complete: "Completar",
        
        // Footer
        about_text: "Haciendo las matemáticas accesibles y divertidas a través de simulaciones y juegos interactivos.",
        quick_links: "Enlaces Rápidos",
        accessibility_features: "Características de Accesibilidad",
        rights: "Todos los derechos reservados.",
        works_offline: "Funciona sin conexión",
        learn_more: "Aprende más →",
        footer_install: "Instalar como aplicación para uso sin conexión",
        footer_privacy: "Política de Privacidad",
        footer_terms: "Términos de Uso",
        footer_contact: "Contáctenos",
        
        // Buttons
        btn_start: "Comenzar",
        btn_explore: "Explorar",
        btn_play: "Jugar",
        btn_learn: "Aprender",
        btn_continue: "Continuar",
        btn_back: "Atrás",
        btn_next: "Siguiente",
        btn_submit: "Enviar",
        btn_cancel: "Cancelar",
        btn_save: "Guardar",
        btn_delete: "Eliminar",
        btn_edit: "Editar",
        btn_reset: "Reiniciar",
        btn_export: "Exportar",
        btn_import: "Importar",
        
        // Time
        time_minutes: "min",
        time_hours: "horas",
        time_days: "días",
        time_today: "Hoy",
        time_yesterday: "Ayer",
        time_ago: "atrás",
        
        // Errors
        error_loading: "Error al cargar contenido",
        error_offline: "Estás sin conexión",
        error_try_again: "Por favor intenta de nuevo",
        error_not_found: "Página no encontrada",
        error_save_failed: "Error al guardar",
        error_load_failed: "Error al cargar",
        
        // Success messages
        success_saved: "Progreso guardado",
        success_achievement: "¡Logro desbloqueado!",
        success_level_up: "¡Subiste de nivel!",
        success_exported: "Datos exportados exitosamente",
        success_imported: "Datos importados exitosamente",
        
        // Tooltips
        tooltip_theme: "Cambiar modo oscuro/claro",
        tooltip_language: "Cambiar idioma",
        tooltip_menu: "Abrir menú",
        tooltip_install: "Instalar aplicación",
        tooltip_fullscreen: "Pantalla completa"
    },

    fr: {
        // Navigation (Core only for French)
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
        welcome: "Apprenez les Maths en Jouant",
        tagline: "Des simulations interactives et des jeux qui rendent les mathématiques amusantes et accessibles à tous",
        explore_simulations: "Explorer les Simulations",
        play_games: "Jouer",
        
        // Feature cards
        feature_simulations_title: "Simulations Interactives",
        feature_games_title: "Jeux Mathématiques",
        feature_accessibility_title: "Accessible à Tous",
        feature_offline_title: "Apprenez Partout",
        
        // Game UI
        game_score: "Score",
        game_level: "Niveau",
        game_correct: "Correct!",
        game_incorrect: "Essaie encore",
        game_hint: "Indice",
        game_new: "Nouvelle Partie",
        
        // Buttons
        btn_start: "Commencer",
        btn_play: "Jouer",
        btn_save: "Sauvegarder",
        btn_cancel: "Annuler",
        
        // Footer
        rights: "Tous droits réservés",
        works_offline: "Fonctionne hors ligne",
        learn_more: "En savoir plus →",
        
        // Time
        time_today: "Aujourd'hui",
        
        // Errors
        error_offline: "Vous êtes hors ligne"
    },

    de: {
        // Navigation (Core only for German)
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
        tagline: "Interaktive Simulationen und Spiele, die Mathematik für alle zugänglich und unterhaltsam machen",
        explore_simulations: "Simulationen Erkunden",
        play_games: "Spielen",
        
        // Feature cards
        feature_simulations_title: "Interaktive Simulationen",
        feature_games_title: "Mathe-Spiele",
        feature_accessibility_title: "Zugänglich für Alle",
        feature_offline_title: "Überall Lernen",
        
        // Game UI
        game_score: "Punktzahl",
        game_level: "Level",
        game_correct: "Richtig!",
        game_incorrect: "Nochmal versuchen",
        game_hint: "Hinweis",
        game_new: "Neues Spiel",
        
        // Buttons
        btn_start: "Starten",
        btn_play: "Spielen",
        btn_save: "Speichern",
        btn_cancel: "Abbrechen",
        
        // Footer
        rights: "Alle Rechte vorbehalten",
        works_offline: "Funktioniert offline",
        learn_more: "Mehr erfahren →",
        
        // Time
        time_today: "Heute",
        
        // Errors
        error_offline: "Sie sind offline"
    },

    ar: {
        // Navigation (RTL support)
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
        subject_calculus: "التفاضل والتكامل",
        subject_probability: "الاحتمالات",
        
        // Homepage
        welcome: "تعلم الرياضيات من خلال اللعب",
        tagline: "محاكيات وألعاب تفاعلية تجعل الرياضيات ممتعة ومتاحة للجميع",
        explore_simulations: "استكشاف المحاكيات",
        play_games: "العب الآن",
        
        // Game UI
        game_score: "النقاط",
        game_level: "المستوى",
        game_correct: "صحيح!",
        game_incorrect: "حاول مرة أخرى",
        game_hint: "تلميح",
        game_new: "لعبة جديدة",
        
        // Buttons
        btn_start: "ابدأ",
        btn_play: "العب",
        btn_save: "حفظ",
        
        // Footer
        rights: "جميع الحقوق محفوظة",
        works_offline: "يعمل بدون إنترنت"
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
        welcome: "Aprenda Matemática Jogando",
        tagline: "Simulações interativas e jogos que tornam a matemática divertida e acessível para todos",
        explore_simulations: "Explorar Simulações",
        play_games: "Jogar",
        
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
        console.warn(` Language ${lang} not found, falling back to English`);
        lang = 'en';
    }
    
    // Save to localStorage (both keys for compatibility)
    localStorage.setItem('mathsim-language', lang);
    localStorage.setItem('preferred-language', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update RTL direction for Arabic
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
        document.body.classList.add('rtl');
    } else {
        document.documentElement.dir = 'ltr';
        document.body.classList.remove('rtl');
    }
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        } else if (translations.en[key]) {
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
    
    // Update language selector if it exists
    const langSelect = document.getElementById('languageSelect') || document.getElementById('lang-select');
    if (langSelect && langSelect.value !== lang) {
        langSelect.value = lang;
    }
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: lang } 
    }));
    
    console.log(` Language changed to: ${lang} (${translations[lang]?.home || 'Translation loaded'})`);
}

// Get translated text by key
function t(key, lang = null) {
    const currentLang = lang || localStorage.getItem('mathsim-language') || 'en';
    return translations[currentLang]?.[key] || translations.en[key] || key;
}

// Get current language
function getCurrentLanguage() {
    return localStorage.getItem('mathsim-language') || 'en';
}

// Get all available languages
function getAvailableLanguages() {
    return Object.keys(translations).map(code => ({
        code: code,
        name: getLanguageName(code)
    }));
}

// Get language name in native form
function getLanguageName(code) {
    const names = {
        en: 'English',
        es: 'Español',
        fr: 'Français',
        de: 'Deutsch',
        ar: 'العربية',
        zh: '中文',
        hi: 'हिन्दी',
        pt: 'Português'
    };
    return names[code] || code;
}

document.addEventListener('DOMContentLoaded', () => {
    // Check both localStorage keys for compatibility with older versions
    const savedLang = localStorage.getItem('mathsim-language') || 
                      localStorage.getItem('preferred-language') || 
                      'en';
    
    // Update language selector if it exists
    const langSelect = document.getElementById('languageSelect') || document.getElementById('lang-select');
    
    if (langSelect) {
        // Populate options if empty
        if (langSelect.options.length <= 1) {
            const languages = getAvailableLanguages();
            languages.forEach(lang => {
                const option = document.createElement('option');
                option.value = lang.code;
                option.textContent = lang.name;
                langSelect.appendChild(option);
            });
        }
        
        langSelect.value = savedLang;
        langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));
    }
    
    // Apply initial language
    changeLanguage(savedLang);
});

window.changeLanguage = changeLanguage;
window.t = t;
window.getCurrentLanguage = getCurrentLanguage;
window.getAvailableLanguages = getAvailableLanguages;

// For backward compatibility with older code
window.setLanguage = changeLanguage;