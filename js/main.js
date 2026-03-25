

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
        
        // Performance monitor instance
        perfMonitor: null,
        
        init() {
            // Initialize performance monitor
            this.perfMonitor = new PerformanceMonitor();
            this.perfMonitor.markStart('init');
            
            // Log initialization
            if (this.config.debug) {
                console.log(`🚀 MathSim v${this.version} initializing...`);
            }
            
            // Load saved preferences FIRST
            this.loadUserPreferences();
            
            // THEN initialize systems with loaded prefs
            this.initLanguage();
            this.initAccessibility();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Initialize page-specific features
            this.initPageFeatures();
            
            // Check browser support
            this.checkBrowserSupport();
            
            // Track page view
            this.trackPageView();
            
            this.perfMonitor.markEnd('init');
            this.perfMonitor.pageLoadTime();
        },
        
        loadUserPreferences() {
            try {
                const savedPrefs = Storage.get('mathsim-preferences');
                if (savedPrefs) {
                    this.config = { ...this.config, ...savedPrefs };
                    
                    // Also update AppState if needed
                    if (typeof AppState !== 'undefined') {
                        AppState.user.preferences = this.config;
                    }
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
                    
                    // Apply CSS classes based on settings
                    document.body.classList.toggle('high-contrast', this.config.accessibility.highContrast);
                    document.body.classList.toggle('large-text', this.config.accessibility.largeText);
                    document.body.classList.toggle('reduced-motion', this.config.accessibility.reducedMotion);
                    document.body.classList.toggle('dyslexic-font', this.config.accessibility.dyslexicFont);
                } catch (error) {
                    ErrorHandler.log(error, 'Accessibility initialization');
                }
            }
        },
        
        setupEventListeners() {
            // Global event listeners
            document.addEventListener('languageChanged', (e) => {
                this.updateUILanguage(e.detail?.language || this.config.defaultLanguage);
            });
            
            document.addEventListener('accessibilityChanged', (e) => {
                this.updateAccessibility(e.detail?.settings || this.config.accessibility);
            });
            
            // Save preferences when user leaves
            window.addEventListener('beforeunload', () => {
                this.saveUserPreferences();
            });
            
            // Handle online/offline status
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
                
                // Update UI elements with new language
                document.documentElement.lang = lang;
                
                // Trigger any language-dependent updates
                const event = new CustomEvent('ui-language-updated', { detail: { language: lang } });
                document.dispatchEvent(event);
                
                // Save preference
                this.saveUserPreferences();
                
                if (this.config.debug) console.log(`🌐 Language set to: ${lang}`);
            }
        },
        
        updateAccessibility(settings) {
            this.config.accessibility = { ...this.config.accessibility, ...settings };
            
            // Apply to body classes
            document.body.classList.toggle('high-contrast', this.config.accessibility.highContrast);
            document.body.classList.toggle('large-text', this.config.accessibility.largeText);
            document.body.classList.toggle('reduced-motion', this.config.accessibility.reducedMotion);
            document.body.classList.toggle('dyslexic-font', this.config.accessibility.dyslexicFont);
            
            // Trigger event for modules that need to react
            const event = new CustomEvent('ui-accessibility-updated', { 
                detail: { settings: this.config.accessibility } 
            });
            document.dispatchEvent(event);
            
            // Save preference
            this.saveUserPreferences();
            
            if (this.config.debug) console.log('♿ Accessibility settings updated');
        },
        
        saveUserPreferences() {
            return Storage.set('mathsim-preferences', this.config);
        },
        
        initPageFeatures() {
            // Detect current page
            const page = document.body.dataset.page || 
                         window.location.pathname.split('/').pop() || 
                         'index.html';
            
            // Dispatch page loaded event
            const event = new CustomEvent('page-loaded', { detail: { page } });
            document.dispatchEvent(event);
            
            // Initialize page-specific modules
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
                fetch: typeof fetch !== 'undefined',
                localStorage: typeof Storage !== 'undefined'
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
            
            // Auto-save after certain updates
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
            
            // Send to analytics in production
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
            // Send to analytics service if configured
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