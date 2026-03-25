(function() {
    // Track loaded modules
    const modules = {
        core: ['MathSim', 'AppState', 'ErrorHandler'],
        features: ['Language', 'Accessibility'],
        pages: ['Simulation', 'Game']
    };
    
    // Check if all core modules are loaded
    function checkCoreModules() {
        return modules.core.every(module => typeof window[module] !== 'undefined');
    }
    
    // Wait for core before initializing features
    function waitForCore(callback, maxAttempts = 50) {
        let attempts = 0;
        
        function check() {
            if (checkCoreModules()) {
                callback();
            } else if (attempts < maxAttempts) {
                attempts++;
                setTimeout(check, 50);
            } else {
                console.error('Core modules failed to load');
            }
        }
        
        check();
    }
    
    // Export to global
    window.ModuleLoader = {
        waitForCore,
        checkCoreModules
    };
})();