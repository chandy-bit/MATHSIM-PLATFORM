(function() {
    'use strict';

    // PERFORMANCE MONITORING
    class PerformanceMonitor {
        constructor() {
            this.metrics = {};
            this.startTime = performance.now();
            this.markStart('pageLoad');
        }
        
        markStart(name) {
            this.metrics[name] = performance.now();
        }
        
        markEnd(name) {
            if (this.metrics[name]) {
                const duration = performance.now() - this.metrics[name];
                if (MathSim.config?.debug) {
                    console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
                }
                return duration;
            }
            return 0;
        }
        
        pageLoadTime() {
            const loadTime = performance.now() - this.startTime;
            if (MathSim.config?.debug) {
                console.log(`📊 Page Load Time: ${loadTime.toFixed(2)}ms`);
            }
            return loadTime;
        }
        
        logMetric(name, value) {
            this.metrics[name] = value;
            if (MathSim.config?.debug) {
                console.log(`📈 Metric: ${name} = ${value}`);
            }
        }
    }

    // SAFE STORAGE WRAPPER
    const Storage = {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                ErrorHandler.log(e, `Storage set: ${key}`, 'warn');
                return false;
            }
        },
        
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                ErrorHandler.log(e, `Storage get: ${key}`, 'warn');
                return defaultValue;
            }
        },
        
        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                ErrorHandler.log(e, `Storage remove: ${key}`, 'warn');
                return false;
            }
        },
        
        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (e) {
                ErrorHandler.log(e, 'Storage clear', 'warn');
                return false;
            }
        }
    };

    // MOBILE MENU HANDLER
    const MobileMenu = {
        init() {
            this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
            this.navMenu = document.getElementById('navMenu');
            
            if (!this.mobileMenuBtn || !this.navMenu) return;
            
            this.setupEventListeners();
            this.setupDropdowns();
            this.setupResizeHandler();
            
            if (MathSim.config?.debug) console.log('📱 Mobile menu initialized');
        },
        
        setupEventListeners() {
            // Toggle menu
            this.mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMenu();
            });
            
            // Close menu when clicking on links
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMenu();
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768 && this.navMenu.classList.contains('active')) {
                    if (!this.navMenu.contains(e.target) && !this.mobileMenuBtn.contains(e.target)) {
                        this.closeMenu();
                    }
                }
            });
        },
        
        setupDropdowns() {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                const toggle = dropdown.querySelector('.dropdown-toggle');
                if (toggle) {
                    toggle.addEventListener('click', (e) => {
                        if (window.innerWidth <= 768) {
                            e.preventDefault();
                            e.stopPropagation();
                            dropdown.classList.toggle('active');
                        }
                    });
                }
            });
        },
        
        setupResizeHandler() {
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    this.closeMenu();
                    // Close all dropdowns
                    document.querySelectorAll('.dropdown').forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            });
        },
        
        toggleMenu() {
            this.navMenu.classList.toggle('active');
            this.mobileMenuBtn.classList.toggle('active');
            document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
            document.body.classList.toggle('menu-open', this.navMenu.classList.contains('active'));
        },
        
        closeMenu() {
            this.navMenu.classList.remove('active');
            this.mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        }
    };

    // HERO CANVAS ANIMATION
    const HeroCanvas = {
        init() {
            this.canvas = document.getElementById('heroCanvas');
            if (!this.canvas) return;
            
            this.ctx = this.canvas.getContext('2d');
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.direction = 0.01;
            this.animationInterval = null;
            
            this.setupResize();
            this.startAnimation();
            
            if (MathSim.config?.debug) console.log('🎨 Hero canvas initialized');
        },
        
        setupResize() {
            this.resizeCanvas();
            window.addEventListener('resize', () => {
                this.resizeCanvas();
            });
        },
        
        resizeCanvas() {
            const container = this.canvas.parentElement;
            const containerWidth = Math.min(container.clientWidth, 500);
            this.canvas.width = containerWidth;
            this.canvas.height = containerWidth * 0.8;
            this.drawGraph();
        },
        
        drawGraph() {
            if (!this.ctx) return;
            
            const canvas = this.canvas;
            const ctx = this.ctx;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw grid
            const step = canvas.width / 10;
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 0.5;
            for (let x = 0; x <= canvas.width; x += step) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y <= canvas.height; y += step) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            
            // Draw axes
            ctx.strokeStyle = '#94A3B8';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, canvas.height/2);
            ctx.lineTo(canvas.width, canvas.height/2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(canvas.width/2, 0);
            ctx.lineTo(canvas.width/2, canvas.height);
            ctx.stroke();
            
            // Draw parabola
            ctx.strokeStyle = '#2563EB';
            ctx.lineWidth = 3;
            ctx.beginPath();
            const scale = canvas.width / 10;
            let firstPoint = true;
            
            for (let x = -canvas.width/2; x <= canvas.width/2; x += 5) {
                const scaledX = x / scale;
                const y = this.a * scaledX * scaledX + this.b * scaledX + this.c;
                const canvasX = canvas.width/2 + x;
                const canvasY = canvas.height/2 - y * scale;
                
                if (canvasY >= 0 && canvasY <= canvas.height) {
                    if (firstPoint) {
                        ctx.moveTo(canvasX, canvasY);
                        firstPoint = false;
                    } else {
                        ctx.lineTo(canvasX, canvasY);
                    }
                } else {
                    firstPoint = true;
                }
            }
            ctx.stroke();
        },
        
        startAnimation() {
            if (this.animationInterval) clearInterval(this.animationInterval);
            
            this.animationInterval = setInterval(() => {
                this.a += this.direction;
                if (this.a > 1.5) this.direction = -0.01;
                if (this.a < 0.5) this.direction = 0.01;
                this.drawGraph();
            }, 100);
        },
        
        stopAnimation() {
            if (this.animationInterval) {
                clearInterval(this.animationInterval);
                this.animationInterval = null;
            }
        }
    };

    // STATS COUNTER ANIMATION
    const StatsCounter = {
        init() {
            this.statItems = document.querySelectorAll('.stat-item');
            if (!this.statItems.length) return;
            
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3, rootMargin: '0px' });
            
            this.statItems.forEach(item => this.observer.observe(item));
            
            if (MathSim.config?.debug) console.log('📊 Stats counter initialized');
        },
        
        animateCounter(element) {
            const count = parseInt(element.dataset.count);
            let current = 0;
            const increment = count / 50;
            const isPercentage = count === 98;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= count) {
                    current = count;
                    clearInterval(timer);
                }
                
                const numberSpan = element.querySelector('.stat-number');
                if (numberSpan) {
                    if (isPercentage) {
                        numberSpan.textContent = Math.floor(current) + '%';
                    } else {
                        numberSpan.textContent = Math.floor(current).toLocaleString();
                    }
                }
            }, 30);
        }
    };

    // SMOOTH SCROLL
    const SmoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                const href = anchor.getAttribute('href');
                if (href !== '#' && href !== '#main-content' && href !== '') {
                    anchor.addEventListener('click', (e) => {
                        const target = document.querySelector(href);
                        if (target) {
                            e.preventDefault();
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    });
                }
            });
            
            if (MathSim.config?.debug) console.log('🔗 Smooth scroll initialized');
        }
    };

    // MATH SIM CORE APPLICATION
    const MathSim = {
        version: '2.0.0',
        
        config: {
            defaultLanguage: 'en',
            availableLanguages: ['en', 'es', 'fr', 'de'],
            debug: false,
            analyticsEnabled: true,
            accessibility: {
                highContrast: false,
                largeText: false,
                reducedMotion: false,
                dyslexicFont: false
            }
        },
        
        perfMonitor: null,
        
        init() {
            this.perfMonitor = new PerformanceMonitor();
            this.perfMonitor.markStart('init');
            
            if (this.config.debug) {
                console.log(`🚀 MathSim v${this.version} initializing...`);
            }
            
            // Load saved preferences
            this.loadUserPreferences();
            
            // Initialize systems
            this.initLanguage();
            this.initAccessibility();
            this.setupEventListeners();
            
            // Initialize UI components
            this.initUIComponents();
            
            // Initialize page-specific features
            this.initPageFeatures();
            
            // Check browser support
            this.checkBrowserSupport();
            
            // Track page view
            this.trackPageView();
            
            this.perfMonitor.markEnd('init');
            this.perfMonitor.pageLoadTime();
            
            // Dispatch ready event
            document.dispatchEvent(new CustomEvent('mathsim-ready'));
        },
        
        initUIComponents() {
            // Initialize mobile menu
            MobileMenu.init();
            
            // Initialize hero canvas
            HeroCanvas.init();
            
            // Initialize stats counter
            StatsCounter.init();
            
            // Initialize smooth scroll
            SmoothScroll.init();
        },
        
        loadUserPreferences() {
            try {
                const savedPrefs = Storage.get('mathsim-preferences');
                if (savedPrefs) {
                    this.config = { ...this.config, ...savedPrefs };
                }
            } catch (error) {
                ErrorHandler.log(error, 'Loading user preferences');
            }
        },
        
        initLanguage() {
            if (typeof Language !== 'undefined' && Language.init) {
                try {
                    Language.init(this.config.defaultLanguage);
                } catch (error) {
                    ErrorHandler.log(error, 'Language initialization');
                }
            } else if (this.config.debug) {
                console.warn('Language module not loaded');
            }
        },
        
        initAccessibility() {
            if (typeof Accessibility !== 'undefined' && Accessibility.applySettings) {
                try {
                    Accessibility.applySettings(this.config.accessibility);
                } catch (error) {
                    ErrorHandler.log(error, 'Accessibility initialization');
                }
            }
            
            // Apply CSS classes
            document.body.classList.toggle('high-contrast', this.config.accessibility.highContrast);
            document.body.classList.toggle('large-text', this.config.accessibility.largeText);
            document.body.classList.toggle('reduced-motion', this.config.accessibility.reducedMotion);
            document.body.classList.toggle('dyslexic-font', this.config.accessibility.dyslexicFont);
        },
        
        setupEventListeners() {
            document.addEventListener('languageChanged', (e) => {
                this.updateUILanguage(e.detail?.language || this.config.defaultLanguage);
            });
            
            document.addEventListener('accessibilityChanged', (e) => {
                this.updateAccessibility(e.detail?.settings || this.config.accessibility);
            });
            
            window.addEventListener('beforeunload', () => {
                this.saveUserPreferences();
            });
            
            window.addEventListener('online', () => {
                if (this.config.debug) console.log('📶 App is online');
                document.body.classList.remove('offline');
            });
            
            window.addEventListener('offline', () => {
                if (this.config.debug) console.log('📴 App is offline');
                document.body.classList.add('offline');
            });
        },
        
        updateUILanguage(lang) {
            if (lang && this.config.availableLanguages.includes(lang)) {
                this.config.defaultLanguage = lang;
                document.documentElement.lang = lang;
                document.dispatchEvent(new CustomEvent('ui-language-updated', { detail: { language: lang } }));
                this.saveUserPreferences();
                if (this.config.debug) console.log(`🌐 Language set to: ${lang}`);
            }
        },
        
        updateAccessibility(settings) {
            this.config.accessibility = { ...this.config.accessibility, ...settings };
            
            document.body.classList.toggle('high-contrast', this.config.accessibility.highContrast);
            document.body.classList.toggle('large-text', this.config.accessibility.largeText);
            document.body.classList.toggle('reduced-motion', this.config.accessibility.reducedMotion);
            document.body.classList.toggle('dyslexic-font', this.config.accessibility.dyslexicFont);
            
            document.dispatchEvent(new CustomEvent('ui-accessibility-updated', { 
                detail: { settings: this.config.accessibility } 
            }));
            
            this.saveUserPreferences();
            if (this.config.debug) console.log('♿ Accessibility settings updated');
        },
        
        saveUserPreferences() {
            return Storage.set('mathsim-preferences', this.config);
        },
        
        initPageFeatures() {
            const page = document.body.dataset.page || 
                         window.location.pathname.split('/').pop() || 
                         'index.html';
            
            document.dispatchEvent(new CustomEvent('page-loaded', { detail: { page } }));
            
            switch(page) {
                case 'simulation.html':
                    this.loadPageModule('Simulation');
                    break;
                case 'game.html':
                    this.loadPageModule('Game');
                    break;
                case 'accessibility.html':
                    this.loadPageModule('Accessibility');
                    break;
                case 'progress.html':
                    this.loadPageModule('Progress');
                    break;
            }
        },
        
        loadPageModule(moduleName) {
            if (typeof window[moduleName] !== 'undefined' && window[moduleName].init) {
                try {
                    window[moduleName].init(this.config);
                    if (this.config.debug) console.log(`✅ Loaded module: ${moduleName}`);
                } catch (error) {
                    ErrorHandler.log(error, `Loading ${moduleName} module`);
                }
            }
        },
        
        checkBrowserSupport() {
            const features = {
                localStorage: typeof localStorage !== 'undefined',
                serviceWorker: 'serviceWorker' in navigator,
                canvas: !!document.createElement('canvas').getContext,
                fetch: typeof fetch !== 'undefined'
            };
            
            const missingFeatures = Object.entries(features)
                .filter(([_, supported]) => !supported)
                .map(([feature]) => feature);
            
            if (missingFeatures.length > 0) {
                const warning = document.createElement('div');
                warning.className = 'browser-warning';
                warning.setAttribute('role', 'alert');
                warning.innerHTML = `
                    <p>⚠️ Your browser doesn't support all MathSim features.</p>
                    <p>Missing: ${missingFeatures.join(', ')}</p>
                    <p>Please update your browser for the best experience.</p>
                `;
                document.body.insertBefore(warning, document.body.firstChild);
                ErrorHandler.warn(`Browser missing features: ${missingFeatures.join(', ')}`, 'Browser Support');
            }
            
            return missingFeatures.length === 0;
        },
        
        trackPageView() {
            const page = window.location.pathname;
            if (this.config.analyticsEnabled && typeof enhancedAnalytics !== 'undefined') {
                enhancedAnalytics.trackPageView(page);
            }
            if (this.config.debug) console.log(`📊 Page View: ${page}`);
        },
        
        trackEvent(category, action, label = null, value = null) {
            if (this.config.analyticsEnabled && typeof enhancedAnalytics !== 'undefined') {
                enhancedAnalytics.trackEvent(category, action, label, value);
            }
            if (this.config.debug) console.log(`📊 Event: ${category} - ${action} - ${label}`);
        },
        
        getVersion() {
            return this.version;
        }
    };

    // APP STATE MANAGEMENT
    const AppState = {
        user: {
            preferences: {},
            progress: {
                simulationsCompleted: [],
                gamesWon: 0,
                lastActive: null,
                totalTimeSpent: 0
            },
            gameScores: [],
            achievements: []
        },
        
        ui: {
            currentLanguage: 'en',
            currentTheme: 'light',
            sidebarOpen: false,
            isOffline: !navigator.onLine,
            modalOpen: false
        },
        
        loading: {
            simulations: false,
            games: false,
            tutorials: false,
            resources: {}
        },
        
        listeners: {},
        
        init(initialData = {}) {
            Object.assign(this, initialData);
            this.setupListeners();
            this.loadFromStorage();
        },
        
        setupListeners() {
            window.addEventListener('online', () => this.update('ui.isOffline', false));
            window.addEventListener('offline', () => this.update('ui.isOffline', true));
        },
        
        loadFromStorage() {
            const savedState = Storage.get('mathsim-state');
            if (savedState) {
                this.user.progress = { ...this.user.progress, ...savedState.progress };
                this.user.gameScores = savedState.gameScores || [];
                this.user.achievements = savedState.achievements || [];
            }
        },
        
        saveToStorage() {
            Storage.set('mathsim-state', {
                progress: this.user.progress,
                gameScores: this.user.gameScores,
                achievements: this.user.achievements
            });
        },
        
        update(path, value) {
            const keys = path.split('.');
            let current = this;
            
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            
            const lastKey = keys[keys.length - 1];
            const oldValue = current[lastKey];
            current[lastKey] = value;
            
            this.notifyListeners(path, value, oldValue);
            
            if (path.startsWith('user.progress') || path.startsWith('user.gameScores')) {
                this.saveToStorage();
            }
        },
        
        subscribe(path, callback) {
            if (!this.listeners[path]) {
                this.listeners[path] = [];
            }
            this.listeners[path].push(callback);
            
            return () => {
                this.listeners[path] = this.listeners[path].filter(cb => cb !== callback);
            };
        },
        
        notifyListeners(path, newValue, oldValue) {
            if (this.listeners[path]) {
                this.listeners[path].forEach(callback => {
                    try {
                        callback(newValue, oldValue, path);
                    } catch (error) {
                        ErrorHandler.log(error, `State listener for ${path}`);
                    }
                });
            }
        },
        
        get(path) {
            return path.split('.').reduce((current, key) => 
                current && current[key] !== undefined ? current[key] : undefined, this);
        },
        
        resetProgress() {
            this.user.progress = {
                simulationsCompleted: [],
                gamesWon: 0,
                lastActive: null,
                totalTimeSpent: 0
            };
            this.user.gameScores = [];
            this.user.achievements = [];
            this.saveToStorage();
            if (MathSim.config.debug) console.log('🔄 Progress reset');
        }
    };

    // ERROR HANDLER
    const ErrorHandler = {
        errors: [],
        maxErrors: 50,
        
        log(error, context = '', level = 'error') {
            const errorEntry = {
                id: Date.now() + '_' + Math.random().toString(36).substr(2, 6),
                timestamp: new Date().toISOString(),
                message: error.message || String(error),
                stack: error.stack,
                context,
                level,
                url: window.location.href,
                userAgent: navigator.userAgent
            };
            
            const styles = {
                error: 'color: #ff4444; font-weight: bold',
                warning: 'color: #ffaa00; font-weight: bold',
                info: 'color: #44ff44'
            };
            
            console[level](`%c[MathSim ${context}]`, styles[level] || '', error);
            
            this.errors.unshift(errorEntry);
            if (this.errors.length > this.maxErrors) {
                this.errors.pop();
            }
            
            if (level === 'error' && MathSim.config?.debug) {
                this.showErrorToast(error.message);
            }
            
            if (!MathSim.config?.debug && MathSim.config?.analyticsEnabled) {
                this.sendToAnalytics(errorEntry);
            }
            
            return errorEntry;
        },
        
        warn(message, context = '') {
            return this.log(new Error(message), context, 'warn');
        },
        
        info(message, context = '') {
            return this.log(new Error(message), context, 'info');
        },
        
        showErrorToast(message) {
            const existing = document.querySelector('.error-toast');
            if (existing) existing.remove();
            
            const toast = document.createElement('div');
            toast.className = 'error-toast';
            toast.setAttribute('role', 'alert');
            toast.textContent = `⚠️ ${message}`;
            
            Object.assign(toast.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                background: MathSim.config?.accessibility?.highContrast ? '#000' : '#ff4444',
                color: MathSim.config?.accessibility?.highContrast ? '#ff0' : 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                fontSize: MathSim.config?.accessibility?.largeText ? '18px' : '14px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                zIndex: '10000',
                maxWidth: '300px',
                animation: 'slideIn 0.3s ease',
                cursor: 'pointer'
            });
            
            toast.onclick = () => toast.remove();
            document.body.appendChild(toast);
            
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => toast.remove(), 300);
                }
            }, 5000);
        },
        
        sendToAnalytics(errorEntry) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'error', {
                    'error_message': errorEntry.message,
                    'error_context': errorEntry.context,
                    'error_url': errorEntry.url
                });
            }
        },
        
        getRecentErrors(count = 10) {
            return this.errors.slice(0, count);
        },
        
        clearErrors() {
            this.errors = [];
        }
    };

    // ADD ANIMATION STYLES
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .high-contrast .error-toast {
            border: 2px solid yellow;
            background: black !important;
            color: yellow !important;
        }
        
        .reduced-motion .error-toast,
        .reduced-motion * {
            animation: none !important;
            transition: none !important;
        }
        
        .browser-warning {
            background: #ff9800;
            color: #333;
            padding: 12px;
            text-align: center;
            font-size: 14px;
            position: relative;
            z-index: 10001;
        }
        
        .high-contrast .browser-warning {
            background: black;
            color: yellow;
            border: 2px solid yellow;
        }
        
        body.menu-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(animationStyles);

    // GLOBAL ERROR HANDLERS
    window.addEventListener('error', function(e) {
        ErrorHandler.log(e.error || e.message, 'Global Error', 'error');
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        ErrorHandler.log(e.reason, 'Unhandled Promise Rejection', 'error');
    });

    // THEME TOGGLE FUNCTIONALITY
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const htmlElement = document.documentElement;
        
        function updateThemeButton(theme) {
            if (themeToggle) {
                themeToggle.textContent = theme === 'dark' ? '☀️' : '🌓';
                themeToggle.setAttribute('aria-label', 
                    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            }
        }
        
        function setTheme(theme) {
            htmlElement.setAttribute('data-theme', theme);
            Storage.set('mathsim-theme', theme);
            updateThemeButton(theme);
            if (MathSim.config?.debug) console.log(`🎨 Theme set to: ${theme}`);
        }
        
        const savedTheme = Storage.get('mathsim-theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
        
        themeToggle?.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
        
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!Storage.get('mathsim-theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // EXPOSE GLOBALLY
    window.MathSim = MathSim;
    window.AppState = AppState;
    window.ErrorHandler = ErrorHandler;
    window.Storage = Storage;
    window.PerformanceMonitor = PerformanceMonitor;
    window.MobileMenu = MobileMenu;
    window.HeroCanvas = HeroCanvas;
    window.StatsCounter = StatsCounter;
    
    // INITIALIZE
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initThemeToggle();
            MathSim.init();
        });
    } else {
        initThemeToggle();
        MathSim.init();
    }
    
})();