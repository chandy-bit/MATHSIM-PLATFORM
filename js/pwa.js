
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(function(error) {
                console.log('Service Worker registration failed:', error);
            });
    });
} else {
    console.log('Service Worker not supported in this browser');
}

let deferredPrompt;
const installContainer = document.getElementById('installContainer');

window.addEventListener('beforeinstallprompt', function(e) {
    console.log('Install prompt detected');
    e.preventDefault();
    deferredPrompt = e;
    
    if (installContainer) {
        installContainer.style.display = 'block';
        console.log('Install button shown');
    }
});

// Install PWA function - called from button
window.installPWA = function() {
    if (!deferredPrompt) {
        console.log('No install prompt available');
        return;
    }
    
    deferredPrompt.prompt();
    
    deferredPrompt.userChoice.then(function(choiceResult) {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted install');
            if (installContainer) {
                installContainer.style.display = 'none';
            }
        } else {
            console.log('User dismissed install');
        }
        deferredPrompt = null;
    });
};


function updateOnlineStatus() {
    const statusElement = document.getElementById('onlineStatus');
    if (statusElement) {
        if (navigator.onLine) {
            statusElement.textContent = 'Online';
            statusElement.style.background = '#4CAF50';
            statusElement.style.color = 'white';
            console.log('App is online');
        } else {
            statusElement.textContent = 'Offline';
            statusElement.style.background = '#f44336';
            statusElement.style.color = 'white';
            console.log('App is offline');
        }
    }
    
    // Update body class for offline styling
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
    console.log('Connection restored');
    updateOnlineStatus();
    showNotification('You are back online', 'success');
});

window.addEventListener('offline', function() {
    console.log('Connection lost');
    updateOnlineStatus();
    showNotification('You are offline. Using cached content.', 'warning');
});

// Initialize status on page load
updateOnlineStatus();


function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
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
        cursor: pointer;
    `;
    
    notification.onclick = function() {
        notification.remove();
    };
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(function() {
                if (notification.parentNode) notification.remove();
            }, 300);
        }
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
    
    const updateButton = updateBar.querySelector('button');
    updateButton.addEventListener('click', function() {
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
        }
    });
    
    document.body.appendChild(updateBar);
    
    // Auto hide after 15 seconds
    setTimeout(function() {
        if (updateBar.parentNode) {
            updateBar.style.animation = 'slideDown 0.3s ease';
            setTimeout(function() {
                if (updateBar.parentNode) updateBar.remove();
            }, 300);
        }
    }, 15000);
}

function checkCacheStatus() {
    if ('caches' in window) {
        caches.keys().then(function(keys) {
            console.log('Available caches:', keys);
            
            // Check for MathSim cache
            const mathsimCache = keys.find(function(key) {
                return key.includes('mathsim');
            });
            
            if (mathsimCache) {
                console.log('Offline cache is ready:', mathsimCache);
                caches.open(mathsimCache).then(function(cache) {
                    cache.keys().then(function(requests) {
                        console.log('Cache contains ' + requests.length + ' items');
                    });
                });
            } else {
                console.log('Offline cache not found. Visit the site online first.');
            }
        });
    }
}

window.clearMathSimCache = function() {
    if ('caches' in window) {
        caches.keys().then(function(keys) {
            keys.forEach(function(key) {
                if (key.includes('mathsim')) {
                    caches.delete(key);
                    console.log('Deleted cache:', key);
                }
            });
            alert('Cache cleared. Refresh the page to rebuild cache.');
        });
    } else {
        alert('Caches not supported in this browser.');
    }
};


function isAppInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
}

if (isAppInstalled()) {
    console.log('App is installed and running in standalone mode');
    if (installContainer) {
        installContainer.style.display = 'none';
    }
}


const pwaStyles = document.createElement('style');
pwaStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
    }
    
    .update-bar {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
    }
    
    .update-bar button {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 600;
    }
    
    .high-contrast .notification {
        border: 2px solid yellow;
        background: black !important;
        color: yellow !important;
    }
    
    .high-contrast .update-bar {
        border: 2px solid yellow;
        background: black !important;
        color: yellow !important;
    }
    
    .high-contrast .update-bar button {
        background: yellow !important;
        color: black !important;
        border: 2px solid black;
    }
    
    .reduced-motion .notification,
    .reduced-motion .update-bar,
    .reduced-motion .online-badge {
        animation: none !important;
        transition: none !important;
    }
`;
document.head.appendChild(pwaStyles);


document.addEventListener('DOMContentLoaded', function() {
    console.log('PWA module initialized');
    checkCacheStatus();
});

if (navigator.serviceWorker) {
    navigator.serviceWorker.addEventListener('controllerchange', function() {
        console.log('Service Worker controller changed');
        showUpdateNotification();
    });
    
    // Check for waiting service worker
    navigator.serviceWorker.ready.then(function(registration) {
        if (registration.waiting) {
            console.log('Waiting service worker found');
            showUpdateNotification();
        }
        
        registration.addEventListener('updatefound', function() {
            const newWorker = registration.installing;
            console.log('Service Worker update found');
            
            newWorker.addEventListener('statechange', function() {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('New version available');
                    showUpdateNotification();
                }
            });
        });
    });
}


window.updateOnlineStatus = updateOnlineStatus;
window.showNotification = showNotification;
window.checkCacheStatus = checkCacheStatus;
window.isAppInstalled = isAppInstalled;