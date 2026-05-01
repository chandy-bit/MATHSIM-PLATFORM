
console.log(' plotter.js loaded - Browser environment detected');

let updateTimeout;
function throttledUpdate() {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => update(), 16); // ~60fps for smooth performance
}

function makeGraphResponsive(canvasId, updateCallback) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(` Canvas with id "${canvasId}" not found`);
        return;
    }
    
    const container = canvas.parentElement;
    if (!container) {
        console.error(` Container for canvas "${canvasId}" not found`);
        return;
    }
    
    function resizeCanvas() {
        const containerWidth = container.clientWidth;
        // Maintain aspect ratio (4:3 for graphs) but respect max width
        let newWidth = Math.min(containerWidth, 600);
        let newHeight = newWidth * 0.75;
        
        // Set canvas dimensions
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        // Update CSS dimensions
        canvas.style.width = newWidth + 'px';
        canvas.style.height = newHeight + 'px';
        
        console.log(` Canvas resized to ${newWidth}x${newHeight}`);
        
        // Redraw the graph
        if (typeof updateCallback === 'function') {
            updateCallback();
        } else if (typeof update === 'function') {
            update();
        }
    }
    
    // Use requestAnimationFrame for smoother resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeCanvas, 150);
    });
    resizeCanvas();
}

const canvas = document.getElementById('graph');
const ctx = canvas ? canvas.getContext('2d') : null;

const sliders = {
    a: document.getElementById('a'),
    b: document.getElementById('b'),
    c: document.getElementById('c')
};

const labels = {
    a: document.getElementById('a-value'),
    b: document.getElementById('b-value'),
    c: document.getElementById('c-value')
};

// ===== VERIFY ELEMENTS =====
console.log('Canvas found:', canvas ? '' : '');
console.log('Slider a found:', sliders.a ? '' : '');
console.log('Slider b found:', sliders.b ? '' : '');
console.log('Slider c found:', sliders.c ? '' : '');

// If canvas is missing, stop
if (!canvas) {
    console.error(' Canvas element not found! Check ID "graph" in HTML');
} else {
    console.log(' Canvas initial dimensions:', canvas.width, 'x', canvas.height);
}

function drawGrid() {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Light grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    
    // Calculate grid spacing based on canvas size
    const gridSpacingX = canvas.width / 20;
    const gridSpacingY = canvas.height / 20;
    
    // Vertical grid lines
    for (let x = gridSpacingX; x < canvas.width; x += gridSpacingX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let y = gridSpacingY; y < canvas.height; y += gridSpacingY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawAxes() {
    if (!ctx) return;
    
    // Main axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    
    // Axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.fillText('x', canvas.width - 20, canvas.height / 2 - 10);
    ctx.fillText('y', canvas.width / 2 + 10, 20);
}

function plotFunction(a, b, c) {
    if (!ctx) return;
    
    drawGrid();
    drawAxes();
    
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let points = 0;
    let first = true;
    
    // Calculate scale factors based on canvas size
    const xScale = canvas.width / 600;
    const yScale = canvas.height / 400;
    
    // Plot from left to right
    for (let x = -300; x <= 300; x += 2) {
        const scaledX = x / 30;
        const y = a * scaledX * scaledX + b * scaledX + c;
        
        const canvasX = canvas.width / 2 + (x * xScale);
        const canvasY = canvas.height / 2 - (y * 30 * yScale);
        
        points++;
        
        // Only draw if within canvas bounds
        if (canvasY >= 0 && canvasY <= canvas.height) {
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        } else {
            first = true;
        }
    }
    
    ctx.stroke();
    console.log(` Plotted function with ${points} points, a=${a.toFixed(2)}, b=${b.toFixed(2)}, c=${c.toFixed(2)}`);
}

function updateEquation(a, b, c) {
    const equationEl = document.getElementById('equation');
    if (!equationEl) return;
    
    // Format a term
    let aTerm = '';
    if (a === 1) aTerm = 'x²';
    else if (a === -1) aTerm = '-x²';
    else aTerm = a + 'x²';
    
    // Format b term
    let bTerm = '';
    if (b !== 0) {
        if (b > 0) bTerm = ' + ' + b + 'x';
        else bTerm = ' - ' + Math.abs(b) + 'x';
    }
    
    // Format c term
    let cTerm = '';
    if (c !== 0) {
        if (c > 0) cTerm = ' + ' + c;
        else cTerm = ' - ' + Math.abs(c);
    }
    
    let eq = aTerm + bTerm + cTerm;
    eq = eq.replace(/\+ -/g, '- ');
    if (eq === '') eq = '0';
    
    equationEl.textContent = 'f(x) = ' + eq;
}

function describeGraph(a, b, c) {
    const descEl = document.getElementById('graph-description');
    if (!descEl) return;
    
    let description = 'Quadratic function: ';
    description += 'a = ' + a.toFixed(2) + ', b = ' + b.toFixed(2) + ', c = ' + c.toFixed(2) + '. ';
    
    if (a > 0) description += 'Opens upward. ';
    else if (a < 0) description += 'Opens downward. ';
    else description += 'Linear function (a=0). ';
    
    // Calculate vertex
    if (a !== 0) {
        const vertexX = -b / (2 * a);
        const vertexY = a * vertexX * vertexX + b * vertexX + c;
        description += `Vertex at (${vertexX.toFixed(2)}, ${vertexY.toFixed(2)}). `;
    }
    
    // Calculate discriminant
    const discriminant = b * b - 4 * a * c;
    if (discriminant > 0) {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        description += `Roots at x = ${root1.toFixed(2)} and x = ${root2.toFixed(2)}.`;
    } else if (discriminant === 0) {
        const root = -b / (2 * a);
        description += `One root at x = ${root.toFixed(2)}.`;
    } else {
        description += 'No real roots.';
    }
    
    descEl.textContent = description;
}

function update() {
    if (!sliders.a || !sliders.b || !sliders.c) {
        console.error(' Could not find sliders!');
        return;
    }
    
    const a = parseFloat(sliders.a.value) || 0;
    const b = parseFloat(sliders.b.value) || 0;
    const c = parseFloat(sliders.c.value) || 0;
    
    // Update labels
    if (labels.a) labels.a.textContent = a.toFixed(2);
    if (labels.b) labels.b.textContent = b.toFixed(2);
    if (labels.c) labels.c.textContent = c.toFixed(2);
    
    updateEquation(a, b, c);
    describeGraph(a, b, c);
    plotFunction(a, b, c);
}

if (sliders.a && sliders.b && sliders.c) {
    sliders.a.addEventListener('input', throttledUpdate);
    sliders.b.addEventListener('input', throttledUpdate);
    sliders.c.addEventListener('input', throttledUpdate);
    console.log(' Event listeners added (throttled for performance)');
} else {
    console.error(' Could not add listeners - sliders missing');
}


const resetBtn = document.getElementById('reset');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        if (sliders.a) sliders.a.value = 1;
        if (sliders.b) sliders.b.value = 0;
        if (sliders.c) sliders.c.value = 0;
        update();
    });
}

const preset1Btn = document.getElementById('preset1');
if (preset1Btn) {
    preset1Btn.addEventListener('click', () => {
        if (sliders.a) sliders.a.value = 2;
        if (sliders.b) sliders.b.value = 0;
        if (sliders.c) sliders.c.value = -3;
        update();
    });
}

const preset2Btn = document.getElementById('preset2');
if (preset2Btn) {
    preset2Btn.addEventListener('click', () => {
        if (sliders.a) sliders.a.value = -2;
        if (sliders.b) sliders.b.value = 0;
        if (sliders.c) sliders.c.value = 4;
        update();
    });
}

const preset3Btn = document.getElementById('preset3');
if (preset3Btn) {
    preset3Btn.addEventListener('click', () => {
        if (sliders.a) sliders.a.value = 0.5;
        if (sliders.b) sliders.b.value = 0;
        if (sliders.c) sliders.c.value = 0;
        update();
    });
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Ctrl+S to save graph state
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        if (!navigator.onLine) {
            alert(' You are offline. Graph will be saved when you reconnect.');
            localStorage.setItem('pending-graph-save', JSON.stringify({
                a: sliders.a.value,
                b: sliders.b.value,
                c: sliders.c.value,
                timestamp: Date.now()
            }));
            return;
        }
        
        const state = {
            a: sliders.a.value,
            b: sliders.b.value,
            c: sliders.c.value
        };
        localStorage.setItem('mathsim-last-graph', JSON.stringify(state));
        
        // Visual feedback
        const saveMsg = document.createElement('div');
        saveMsg.textContent = '✓ Graph saved';
        saveMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            z-index: 10000;
            animation: fadeOut 2s forwards;
        `;
        document.body.appendChild(saveMsg);
        setTimeout(() => saveMsg.remove(), 2000);
    }
    
    // Ctrl+L to load graph state
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        const saved = localStorage.getItem('mathsim-last-graph');
        if (saved) {
            const state = JSON.parse(saved);
            sliders.a.value = state.a;
            sliders.b.value = state.b;
            sliders.c.value = state.c;
            update();
            
            const loadMsg = document.createElement('div');
            loadMsg.textContent = ' Graph loaded';
            loadMsg.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #2196F3;
                color: white;
                padding: 10px 20px;
                border-radius: 8px;
                z-index: 10000;
                animation: fadeOut 2s forwards;
            `;
            document.body.appendChild(loadMsg);
            setTimeout(() => loadMsg.remove(), 2000);
        } else {
            alert('No saved graph found. Use Ctrl+S to save first.');
        }
    }
});

window.addEventListener('online', () => {
    const pendingSave = localStorage.getItem('pending-graph-save');
    if (pendingSave) {
        const state = JSON.parse(pendingSave);
        sliders.a.value = state.a;
        sliders.b.value = state.b;
        sliders.c.value = state.c;
        update();
        localStorage.removeItem('pending-graph-save');
        
        const syncMsg = document.createElement('div');
        syncMsg.textContent = '✓ Offline graph changes synced!';
        syncMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            z-index: 10000;
            animation: fadeOut 3s forwards;
        `;
        document.body.appendChild(syncMsg);
        setTimeout(() => syncMsg.remove(), 3000);
    }
});

window.addEventListener('load', function() {
    console.log('Page loaded, initialising responsive canvas...');
    makeGraphResponsive('graph', update);
    update();
});

// Fallback for DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM ready, ensuring canvas is responsive...');
        makeGraphResponsive('graph', update);
        update();
    });
} else {
    setTimeout(function() {
        makeGraphResponsive('graph', update);
        update();
    }, 100);
}

const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes fadeOut {
        0% { opacity: 1; transform: translateX(0); }
        70% { opacity: 1; transform: translateX(0); }
        100% { opacity: 0; transform: translateX(20px); }
    }
`;
document.head.appendChild(animationStyle);