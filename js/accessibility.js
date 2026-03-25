
class AccessibilityManager {
    constructor() {
        // Load saved settings or use defaults
        this.fontSize = parseInt(localStorage.getItem('font-size')) || 100;
        this.highContrast = localStorage.getItem('high-contrast') === 'true';
        this.dyslexicFont = localStorage.getItem('dyslexic-font') === 'true';
        
        this.init();
    }
    

    resetFontSize() {
    this.fontSize = 100;
    document.documentElement.style.fontSize = this.fontSize + '%';
    localStorage.setItem('font-size', 100);
    }

    init() {
        this.applySettings();
        this.setupEventListeners();
        this.setupKeyboardNavigation();
    }

    applySettings() {
        // Apply font size
        document.documentElement.style.fontSize = this.fontSize + '%';
        
        // Apply high contrast
        if (this.highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
        
        // Apply dyslexic font
        if (this.dyslexicFont) {
            document.body.classList.add('dyslexic-font');
        } else {
            document.body.classList.remove('dyslexic-font');
        }
    }

    setupEventListeners() {
        // Font size buttons
        const increaseBtn = document.getElementById('increase-font');
        const decreaseBtn = document.getElementById('decrease-font');
        const resetBtn = document.getElementById('reset-font');

        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => this.adjustFontSize(10));
        }

        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => this.adjustFontSize(-10));
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetFontSize());
        }

        // Contrast toggle
        const contrastBtn = document.getElementById('toggle-contrast');
        if (contrastBtn) {
            contrastBtn.addEventListener('click', () => this.toggleHighContrast());
        }
    }

    adjustFontSize(change) {
        this.fontSize = Math.min(Math.max(this.fontSize + change, 70), 200);
        this.applySettings();
        localStorage.setItem('font-size', this.fontSize);
    }

    toggleHighContrast() {
        this.highContrast = !this.highContrast;
        this.applySettings();
        localStorage.setItem('high-contrast', this.highContrast);
    }

    toggleDyslexicFont() {
        this.dyslexicFont = !this.dyslexicFont;
        this.applySettings();
        localStorage.setItem('dyslexic-font', this.dyslexicFont);
    }

    resetFontSize() {
        this.fontSize = 100;
        this.applySettings();
        localStorage.setItem('font-size', 100);
    }

    setupKeyboardNavigation() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Alt + F: Increase font
            if (e.altKey && e.key === 'f') {
                e.preventDefault();
                this.adjustFontSize(10);
            }
            // Alt + C: Toggle contrast
            if (e.altKey && e.key === 'c') {
                e.preventDefault();
                this.toggleHighContrast();
            }
        });
    }
}

// Initialize accessibility manager when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.a11y = new AccessibilityManager();
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !expanded);
            navMenu.classList.toggle('active');
        });
    }
});

document.querySelectorAll('.mini-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert(btn.textContent === '8' ? 'Correct! ' : 'Try again!');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    const AccessibilityManager = {
        // Default settings
        defaults: {
            highContrast: false,
            largeText: false,
            reducedMotion: false,
            fontSize: 16,
            dyslexicFont: false,
            lineSpacing: 1.6,
            readingGuide: false,
            focusIndicator: true,
            language: 'en'
        },
        
        // Current settings
        settings: {},
        
        // Initialize
        init: function() {
            this.loadSettings();
            this.setupEventListeners();
            this.updateUI();
            this.applyAllSettings();
            console.log('Accessibility manager initialized');
        },
        
        // Load settings from localStorage
        loadSettings: function() {
            const saved = localStorage.getItem('mathsim-accessibility');
            if (saved) {
                try {
                    this.settings = JSON.parse(saved);
                } catch (e) {
                    console.error('Error loading settings', e);
                    this.settings = {...this.defaults};
                }
            } else {
                this.settings = {...this.defaults};
            }
        },
        
        // Save settings to localStorage
        saveSettings: function(showMessage = true) {
            localStorage.setItem('mathsim-accessibility', JSON.stringify(this.settings));
            
            // Update status badge
            const statusEl = document.getElementById('saveStatus');
            if (statusEl && showMessage) {
                statusEl.textContent = '✓ Settings saved';
                statusEl.style.background = 'var(--success-light)';
                statusEl.style.color = 'var(--success-dark)';
                
                setTimeout(() => {
                    statusEl.textContent = 'All settings saved';
                }, 2000);
            }
            
            // Apply all settings
            this.applyAllSettings();
            
            // Dispatch event for other pages
            window.dispatchEvent(new CustomEvent('accessibilityChanged', { 
                detail: this.settings 
            }));
        },
        
        // Update setting
        updateSetting: function(key, value) {
            this.settings[key] = value;
            this.saveSettings(true);
        },
        
        // Apply all settings to document
        applyAllSettings: function() {
            const html = document.documentElement;
            const body = document.body;
            
            // High Contrast
            if (this.settings.highContrast) {
                body.classList.add('high-contrast');
            } else {
                body.classList.remove('high-contrast');
            }
            
            // Large Text
            if (this.settings.largeText) {
                body.classList.add('large-text');
            } else {
                body.classList.remove('large-text');
            }
            
            // Reduced Motion
            if (this.settings.reducedMotion) {
                body.classList.add('reduced-motion');
            } else {
                body.classList.remove('reduced-motion');
            }
            
            // Dyslexic Font
            if (this.settings.dyslexicFont) {
                body.classList.add('dyslexic-font');
            } else {
                body.classList.remove('dyslexic-font');
            }
            
            // Font Size
            body.style.fontSize = this.settings.fontSize + 'px';
            
            // Line Spacing
            body.style.lineHeight = this.settings.lineSpacing;
            
            // Focus Indicator
            if (this.settings.focusIndicator) {
                body.classList.add('enhanced-focus');
            } else {
                body.classList.remove('enhanced-focus');
            }
            
            // Reading Guide (create if enabled)
            this.toggleReadingGuide(this.settings.readingGuide);
        },
        
        // Toggle reading guide
        toggleReadingGuide: function(enable) {
            let guide = document.getElementById('reading-guide');
            
            if (enable) {
                if (!guide) {
                    guide = document.createElement('div');
                    guide.id = 'reading-guide';
                    guide.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background: rgba(255, 0, 0, 0.3);
                        pointer-events: none;
                        z-index: 9999;
                        transform: translateY(-50%);
                        display: none;
                    `;
                    document.body.appendChild(guide);
                }
                
                // Show guide and track mouse
                guide.style.display = 'block';
                
                document.addEventListener('mousemove', function(e) {
                    if (document.getElementById('reading-guide')) {
                        guide.style.top = e.clientY + 'px';
                    }
                });
            } else {
                if (guide) {
                    guide.remove();
                }
            }
        },
        
        // Update UI to match settings
        updateUI: function() {
            // Update toggles
            document.getElementById('highContrast').checked = this.settings.highContrast;
            document.getElementById('largeText').checked = this.settings.largeText;
            document.getElementById('reducedMotion').checked = this.settings.reducedMotion;
            document.getElementById('dyslexicFont').checked = this.settings.dyslexicFont;
            document.getElementById('readingGuide').checked = this.settings.readingGuide;
            document.getElementById('focusIndicator').checked = this.settings.focusIndicator;
            
            // Update sliders
            document.getElementById('fontSize').value = this.settings.fontSize;
            document.getElementById('fontSizeValue').textContent = this.settings.fontSize + 'px';
            
            document.getElementById('lineSpacing').value = this.settings.lineSpacing;
            document.getElementById('lineSpacingValue').textContent = this.settings.lineSpacing;
            
            // Update language
            document.getElementById('languageSelect').value = this.settings.language;
        },
        
        // Setup event listeners
        setupEventListeners: function() {
            const self = this;
            
            // Toggle switches
            document.getElementById('highContrast').addEventListener('change', function(e) {
                self.updateSetting('highContrast', e.target.checked);
            });
            
            document.getElementById('largeText').addEventListener('change', function(e) {
                self.updateSetting('largeText', e.target.checked);
            });
            
            document.getElementById('reducedMotion').addEventListener('change', function(e) {
                self.updateSetting('reducedMotion', e.target.checked);
            });
            
            document.getElementById('dyslexicFont').addEventListener('change', function(e) {
                self.updateSetting('dyslexicFont', e.target.checked);
            });
            
            document.getElementById('readingGuide').addEventListener('change', function(e) {
                self.updateSetting('readingGuide', e.target.checked);
            });
            
            document.getElementById('focusIndicator').addEventListener('change', function(e) {
                self.updateSetting('focusIndicator', e.target.checked);
            });
            
            // Sliders
            document.getElementById('fontSize').addEventListener('input', function(e) {
                const val = e.target.value;
                document.getElementById('fontSizeValue').textContent = val + 'px';
                document.body.style.fontSize = val + 'px';
            });
            
            document.getElementById('fontSize').addEventListener('change', function(e) {
                self.updateSetting('fontSize', parseInt(e.target.value));
            });
            
            document.getElementById('lineSpacing').addEventListener('input', function(e) {
                const val = e.target.value;
                document.getElementById('lineSpacingValue').textContent = val;
                document.body.style.lineHeight = val;
            });
            
            document.getElementById('lineSpacing').addEventListener('change', function(e) {
                self.updateSetting('lineSpacing', parseFloat(e.target.value));
            });
            
            // Language
            document.getElementById('languageSelect').addEventListener('change', function(e) {
                self.updateSetting('language', e.target.value);
                // You can implement language switching here
            });
            
            // Reset button
            document.getElementById('resetAllBtn').addEventListener('click', function() {
                if (confirm('Reset all accessibility settings to defaults?')) {
                    self.settings = {...self.defaults};
                    self.updateUI();
                    self.saveSettings(true);
                }
            });
            
            // Save button
            document.getElementById('saveSettingsBtn').addEventListener('click', function() {
                self.saveSettings(true);
            });
            
            // Footer controls
            document.getElementById('footerTextSize')?.addEventListener('click', function() {
                const current = self.settings.fontSize;
                self.updateSetting('fontSize', Math.min(current + 2, 24));
                document.getElementById('fontSize').value = self.settings.fontSize;
                document.getElementById('fontSizeValue').textContent = self.settings.fontSize + 'px';
            });
            
            document.getElementById('footerContrast')?.addEventListener('click', function() {
                self.updateSetting('highContrast', !self.settings.highContrast);
                document.getElementById('highContrast').checked = self.settings.highContrast;
            });
        }
    };
    
    // Initialize
    AccessibilityManager.init();
});