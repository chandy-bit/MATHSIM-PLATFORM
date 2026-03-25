
let canvas, ctx;
let currentType = 'quadratic';
let currentParams = {};

// Get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        type: params.get('type') || 'quadratic'
    };
}

// Load simulation based on type
function loadSimulation(type) {
    currentType = type;
    
    // Update URL without reloading
    const url = new URL(window.location);
    url.searchParams.set('type', type);
    window.history.pushState({}, '', url);
    
    // Update UI
    updateSimulationUI(type);
    
    // Load appropriate controls
    loadControls(type);
    
    // Load presets
    loadPresets(type);
    
    // Track in analytics
    if (typeof analytics !== 'undefined') {
        analytics.tutorialWatched(type + '-simulation', getSimulationName(type));
    }
}

// Get simulation display name
function getSimulationName(type) {
    const names = {
        'linear': 'Linear Functions',
        'quadratic': 'Quadratic Functions',
        'cubic': 'Cubic Functions',
        'trig': 'Trigonometric Functions',
        'exponential': 'Exponential Functions',
        'calculus': 'Derivatives Explorer',
        'algebra': 'Algebra Explorer',
        'geometry': 'Geometry Explorer'
    };
    return names[type] || 'Function Explorer';
}

// Update UI based on type
function updateSimulationUI(type) {
    const title = document.getElementById('simulationTitle');
    const desc = document.getElementById('simulationDescription');
    
    const titles = {
        'linear': 'Linear Function Explorer',
        'quadratic': 'Quadratic Function Explorer',
        'cubic': 'Cubic Function Explorer',
        'trig': 'Trigonometric Function Explorer',
        'exponential': 'Exponential Function Explorer',
        'calculus': 'Derivative Explorer',
        'algebra': 'Algebra Visualizer',
        'geometry': 'Geometry Tool'
    };
    
    const descriptions = {
        'linear': 'Explore slope and y-intercept (y = mx + b)',
        'quadratic': 'Explore parabolas and vertex form (y = ax² + bx + c)',
        'cubic': 'Explore cubic functions (y = ax³ + bx² + cx + d)',
        'trig': 'Explore sine, cosine, and tangent waves',
        'exponential': 'Explore exponential growth and decay',
        'calculus': 'Visualize derivatives and rates of change',
        'algebra': 'Explore algebraic relationships',
        'geometry': 'Explore geometric properties'
    };
    
    if (title) title.textContent = titles[type] || 'Function Explorer';
    if (desc) desc.textContent = descriptions[type] || 'Explore mathematical functions';
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick')?.includes(type)) {
            btn.classList.add('active');
        }
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('graph');
    ctx = canvas ? canvas.getContext('2d') : null;
    
    const params = getUrlParams();
    loadSimulation(params.type);
});