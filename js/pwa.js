
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log(' Service Worker registered successfully!');
                console.log('   Scope:', registration.scope);
                
                // Check for updates
                registration.addEventListener('updatefound', function() {
                    const newWorker = registration.installing;
                    console.log(' Service Worker update found!');
                    
                    newWorker.addEventListener('statechange', function() {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log(' New version available! Refresh to update.');
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch(function(error) {
                console.log(' Service Worker registration failed:', error);
            });
    });
} else {
    console.log(' Service Worker not supported in this browser');
}

navigator.serviceWorker.ready.then(function(registration) {
    console.log(' Service Worker ready:', registration);
});

let deferredPrompt;
const installContainer = document.getElementById('installContainer');

window.addEventListener('beforeinstallprompt', function(e) {
    console.log(' Install prompt detected');
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button
    if (installContainer) {
        installContainer.style.display = 'block';
        console.log('Install button shown');
    }
});

// Install PWA function
window.installPWA = function() {
    if (!deferredPrompt) {
        console.log('No install prompt available');
        return;
    }
    
    deferredPrompt.prompt();
    
    deferredPrompt.userChoice.then(function(choiceResult) {
        if (choiceResult.outcome === 'accepted') {
            console.log(' User accepted install');
            if (installContainer) {
                installContainer.style.display = 'none';
            }
        } else {
            console.log(' User dismissed install');
        }
        deferredPrompt = null;
    });
};

function updateOnlineStatus() {
    const statusElement = document.getElementById('onlineStatus');
    if (statusElement) {
        if (navigator.onLine) {
            statusElement.textContent = ' Online';
            statusElement.style.background = '#4CAF50';
            statusElement.style.color = 'white';
            console.log(' App is online');
        } else {
            statusElement.textContent = ' Offline';
            statusElement.style.background = '#f44336';
            statusElement.style.color = 'white';
            console.log(' App is offline');
        }
    }
    
    // Update body class
    if (navigator.onLine) {
        document.body.classList.remove('offline-mode');
        document.body.classList.remove('offline');
    } else {
        document.body.classList.add('offline-mode');
        document.body.classList.add('offline');
    }
}

// Listen for online/offline events
window.addEventListener('online', function() {
    console.log(' Connection restored');
    updateOnlineStatus();
    showNotification(' You are back online!', 'success');
});

window.addEventListener('offline', function() {
    console.log(' Connection lost');
    updateOnlineStatus();
    showNotification(' You are offline. Using cached content.', 'warning');
});

// Initialize status
updateOnlineStatus();

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'success' ? '#4CAF50' : '#ff9800'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showUpdateNotification() {
    const updateBar = document.createElement('div');
    updateBar.className = 'update-bar';
    updateBar.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #2196F3;
        color: white;
        text-align: center;
        padding: 12px;
        z-index: 10001;
        cursor: pointer;
        animation: slideUp 0.3s ease;
    `;
    updateBar.innerHTML = `
         New version available! 
        <button style="margin-left: 10px; padding: 5px 15px; background: white; color: #2196F3; border: none; border-radius: 4px; cursor: pointer;">
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
    
    setTimeout(() => {
        if (updateBar.parentNode) {
            updateBar.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => updateBar.remove(), 300);
        }
    }, 10000);
}

function checkCacheStatus() {
    if ('caches' in window) {
        caches.keys().then(function(keys) {
            console.log(' Caches:', keys);
        });
        
        caches.open('mathsim-v3').then(function(cache) {
            cache.keys().then(function(keys) {
                console.log(` Cache contains ${keys.length} items`);
            });
        });
    }
}

window.clearMathSimCache = function() {
    if ('caches' in window) {
        caches.keys().then(function(keys) {
            keys.forEach(function(key) {
                caches.delete(key);
                console.log(' Deleted cache:', key);
            });
            alert('Cache cleared! Refresh the page.');
        });
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log(' PWA module initialized');
    checkCacheStatus();
    
    // Add CSS animations if not present
    if (!document.getElementById('pwa-animations')) {
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
            @keyframes slideUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes slideDown {
                from { transform: translateY(0); opacity: 1; }
                to { transform: translateY(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});

// Make functions global
window.installPWA = installPWA;