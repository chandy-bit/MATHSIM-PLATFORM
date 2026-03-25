
if ('serviceWorker' in navigator) {
    // Register service worker on page load
    window.addEventListener('load', registerServiceWorker);
    
    // Track service worker controller changes
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
}

/**
 * Register the service worker
 */
function registerServiceWorker() {
    navigator.serviceWorker.register('/service-worker.js')
        .then(onRegistrationSuccess)
        .catch(onRegistrationFailed);
}

/**
 * Handle successful service worker registration
 */
function onRegistrationSuccess(registration) {
    console.log(' Service Worker registered successfully:', registration.scope);
    
    // Check for updates
    registration.addEventListener('updatefound', () => onUpdateFound(registration));
}


function onUpdateFound(registration) {
    const newWorker = registration.installing;
    console.log(' Service Worker update found!');
    
    newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available
            showUpdateNotification();
        }
    });
}


function onRegistrationFailed(error) {
    console.log(' Service Worker registration failed:', error);
}


function onControllerChange() {
    console.log(' Service Worker controller changed');
}


let deferredPrompt;

// Listen for install prompt
window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);


function onBeforeInstallPrompt(e) {
    console.log(' Install prompt detected');
    // Prevent Chrome from showing the prompt automatically
    e.preventDefault();
    
    // Stash the event for later use
    deferredPrompt = e;
    
    // Show install button
    showInstallButton();
}


function initInstallButton() {
    const installContainer = document.getElementById('installContainer');
    const installButton = document.getElementById('installButton');
    
    if (!installContainer || !installButton) return;
    
    // Always show the container
    installContainer.style.display = 'block';
    
    // Update button based on status
    updateInstallButtonStatus(installButton);
    
    // Handle click
    installButton.onclick = () => onInstallButtonClick(installButton);
    
    // Listen for install
    window.addEventListener('appinstalled', onAppInstalled);
}

function isAppInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
}

function updateInstallButtonStatus(installButton) {
    const installMessage = document.getElementById('installMessage');
    
    if (isAppInstalled()) {
        installButton.innerHTML = ' App Installed';
        installButton.disabled = true;
        installButton.style.opacity = '0.7';
        installButton.style.cursor = 'default';
        
        if (installMessage) {
            installMessage.textContent = 'MathSim is installed on your device';
        }
    } else {
        installButton.innerHTML = ' Install MathSim App';
        installButton.disabled = false;
        installButton.style.opacity = '1';
        installButton.style.cursor = 'pointer';
    }
}

function onInstallButtonClick(installButton) {
    if (isAppInstalled()) {
        alert('MathSim is already installed!');
    } else if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                updateInstallButtonStatus(installButton);
            }
            deferredPrompt = null;
        });
    } else {
        alert('To install: Use browser menu → "Add to Home Screen"');
    }
}

function showInstallButton() {
    const installContainer = document.getElementById('installContainer');
    if (installContainer) {
        installContainer.style.display = 'block';
        console.log(' Install button shown');
    }
}


function hideInstallButton() {
    const installContainer = document.getElementById('installContainer');
    if (installContainer) {
        installContainer.style.display = 'none';
    }
}

window.installPWA = function() {
    if (!deferredPrompt) {
        console.log(' No install prompt available');
        return;
    }
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for user response
    deferredPrompt.userChoice.then(function(choiceResult) {
        if (choiceResult.outcome === 'accepted') {
            console.log(' User accepted install');
            hideInstallButton();
        } else {
            console.log(' User dismissed install');
        }
        
        // Clear the prompt
        deferredPrompt = null;
    });
};


function onAppInstalled(e) {
    console.log(' MathSim was installed successfully');
    hideInstallButton();
    
    // Track install event
    if ('gtag' in window) {
        gtag('event', 'install', {
            'event_category': 'PWA',
            'event_label': 'MathSim'
        });
    }
}

// Listen for successful install
window.addEventListener('appinstalled', onAppInstalled);

// Listen for online/offline events
window.addEventListener('online', onOnline);
window.addEventListener('offline', onOffline);


function onOnline() {
    console.log(' App is online');
    updateOnlineStatus();
    showNotification('You are back online!', 'success');
}

function onOffline() {
    if (!window.location.pathname.includes('offline.html')) {
        window.location.href = '/offline.html';
    }
    console.log(' App is offline');
    updateOnlineStatus();
    showNotification('You are offline. Using cached content.', 'warning');
}


function updateOnlineStatus() {
    const statusElement = document.getElementById('onlineStatus');
    if (statusElement) {
        if (navigator.onLine) {
            statusElement.innerHTML = ' Online'; 
            statusElement.style.background = '#4CAF50'; // Green
            statusElement.style.color = 'white';
        } else {
            statusElement.innerHTML = ' Offline';
            statusElement.style.background = '#f44336'; // Red
            statusElement.style.color = 'white';
        }
    }
    
    // Update body class
    if (navigator.onLine) {
        document.body.classList.remove('offline');
        console.log(' Body class: offline removed (online)');
    } else {
        document.body.classList.add('offline');
        console.log(' Body class: offline added');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        background: ${getNotificationColor(type)};
        color: white;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}


function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#4CAF50';
        case 'warning': return '#ff9800';
        case 'info': default: return '#2196F3';
    }
}


function showUpdateNotification() {
    const updateBar = document.createElement('div');
    updateBar.className = 'update-bar';
    updateBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #2196F3;
        color: white;
        text-align: center;
        padding: 12px;
        z-index: 10001;
        animation: slideDown 0.3s ease;
        cursor: pointer;
    `;
    updateBar.innerHTML = `
        New version available! 
        <button style="margin-left: 10px; padding: 4px 12px; background: white; color: #2196F3; border: none; border-radius: 4px; cursor: pointer;">
            Update Now
        </button>
    `;
    
    updateBar.querySelector('button').addEventListener('click', function() {
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
        }
    });
    
    document.body.appendChild(updateBar);
    
    // Auto hide after 10 seconds
    setTimeout(() => {
        if (updateBar.parentNode) {
            updateBar.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => updateBar.remove(), 300);
        }
    }, 10000);
}

const CACHE_NAME = 'mathsim-v1';

function checkCacheStatus() {
    if ('caches' in window) {
        caches.open(CACHE_NAME).then(function(cache) {
            cache.keys().then(function(keys) {
                console.log(` Cache contains ${keys.length} items`);
            });
        });
    }
}


window.clearMathSimCache = function() {
    if ('caches' in window) {
        caches.delete(CACHE_NAME).then(function(success) {
            if (success) {
                console.log('Cache cleared');
                showNotification('Cache cleared. Reloading...', 'info');
                setTimeout(() => window.location.reload(), 1000);
            }
        });
    }
};


function addCSSAnimations() {
    if (document.getElementById('pwa-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'pwa-animations';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes slideDown {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(-100%); opacity: 0; }
        }
        
        .online-badge {
            position: fixed;
            bottom: 10px;
            left: 10px;
            padding: 4px 8px;
            border-radius: 4px;
            color: white;
            font-size: 12px;
            z-index: 9999;
        }
    `;
    document.head.appendChild(style);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initializePWA);


function initializePWA() {
    console.log(' PWA module initialized');
    
    // Initialize components
    initInstallButton();
    updateOnlineStatus();
    checkCacheStatus();
    addCSSAnimations();
}