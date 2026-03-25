console.log('Theme.js loaded');

// Check if theme system is loaded
console.log('Theme toggle button:', document.getElementById('themeToggle'));
console.log('HTML data-theme:', document.documentElement.getAttribute('data-theme'));

// Manually toggle theme
document.documentElement.setAttribute('data-theme', 'dark');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready - looking for theme button');
    
    const themeToggle = document.getElementById('themeToggle');
    console.log('Theme button found:', themeToggle);
    
    if (!themeToggle) {
        console.error('ERROR: Theme button not found! Check HTML ID');
        return;
    }
    
    themeToggle.addEventListener('click', function() {
        console.log('Button clicked!');
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme') || 'light';
        console.log('Current theme:', currentTheme);
        
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('mathsim-theme', newTheme);
        
        this.textContent = newTheme === 'dark' ? '' : '';
        console.log('New theme:', newTheme);
    });
    
    // Load saved theme
    const saved = localStorage.getItem('mathsim-theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
        themeToggle.textContent = saved === 'dark' ? '' : '';
        console.log('Loaded saved theme:', saved);
    }
});


(function() {
    'use strict';
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initTheme();
    });
    
    function initTheme() {
        // Get theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        const htmlElement = document.documentElement;
        
        if (!themeToggle) {
            console.warn('Theme toggle button not found - make sure it exists in HTML');
            return;
        }
        
        console.log(' Theme system initialized');
        
        // Function to set theme
        function setTheme(theme) {
            // Set the data-theme attribute
            htmlElement.setAttribute('data-theme', theme);
            
            // Save to localStorage
            localStorage.setItem('mathsim-theme', theme);
            
            // Update button appearance
            if (theme === 'dark') {
                themeToggle.textContent = '🔅';
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
            } else {
                themeToggle.textContent = '🌓';
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            }
            
            // Log for debugging
            console.log(`Theme set to: ${theme}`);
            
            // Dispatch event for other components
            window.dispatchEvent(new CustomEvent('themeChanged', { 
                detail: { theme: theme } 
            }));
        }
        
        // Function to get current theme
        function getCurrentTheme() {
            return htmlElement.getAttribute('data-theme') || 'light';
        }
        
        // Load saved theme or use system preference
        function loadInitialTheme() {
            const savedTheme = localStorage.getItem('mathsim-theme');
            
            if (savedTheme) {
                // Use saved theme preference
                setTheme(savedTheme);
            } else {
                // Check system preference
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    setTheme('dark');
                } else {
                    setTheme('light');
                }
            }
        }
        
        // Handle button click
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const currentTheme = getCurrentTheme();
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
        
        // Listen for system theme changes (only if user hasn't set preference)
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addEventListener('change', function(e) {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem('mathsim-theme')) {
                    setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
        
        // Also handle footer theme button if it exists
        const footerThemeBtn = document.getElementById('footerTheme');
        if (footerThemeBtn) {
            footerThemeBtn.addEventListener('click', function() {
                themeToggle.click();
            });
        }
        
        // Initialize theme
        loadInitialTheme();
    }
})();