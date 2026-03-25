

console.log(' plotter.js loaded - Browser environment detected');

// Get DOM elements
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

// Verify elements
console.log('Canvas found:', canvas ? '' : '');
console.log('Slider a found:', sliders.a ? '' : '');
console.log('Slider b found:', sliders.b ? '' : '');
console.log('Slider c found:', sliders.c ? '' : '');

// If canvas is missing, stop
if (!canvas) {
    console.error(' Canvas element not found! Check ID "graph" in HTML');
} else {
    console.log(' Canvas dimensions:', canvas.width, 'x', canvas.height);
}

function drawGrid() {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Light grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    
    // Vertical grid lines
    for (let x = 0; x <= canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let y = 0; y <= canvas.height; y += 30) {
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
    ctx.fillText('x', canvas.width - 20, canvas.height/2 - 10);
    ctx.fillText('y', canvas.width/2 + 10, 20);
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
    
    // Plot from left to right
    for (let x = -300; x <= 300; x += 2) {
        const scaledX = x / 30;
        const y = a * scaledX * scaledX + b * scaledX + c;
        
        const canvasX = canvas.width / 2 + x;
        const canvasY = canvas.height / 2 - y * 30;
        
        // Count points for debugging
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
    console.log(` Plotted function with ${points} points, a=${a}, b=${b}, c=${c}`);
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
    description += 'a = ' + a + ', b = ' + b + ', c = ' + c + '. ';
    
    if (a > 0) description += 'Opens upward. ';
    else if (a < 0) description += 'Opens downward. ';
    else description += 'Linear function (a=0). ';
    
    descEl.textContent = description;
}

// Main update function
function update() {
    if (!sliders.a || !sliders.b || !sliders.c) {
        console.error('Could not find sliders!');
        return;
    }
    
    const a = parseFloat(sliders.a.value) || 0;
    const b = parseFloat(sliders.b.value) || 0;
    const c = parseFloat(sliders.c.value) || 0;
    
    // Update labels
    if (labels.a) labels.a.textContent = a.toFixed(1);
    if (labels.b) labels.b.textContent = b;
    if (labels.c) labels.c.textContent = c;
    
    updateEquation(a, b, c);
    describeGraph(a, b, c);
    plotFunction(a, b, c);
}

// Add event listeners
if (sliders.a && sliders.b && sliders.c) {
    sliders.a.addEventListener('input', update);
    sliders.b.addEventListener('input', update);
    sliders.c.addEventListener('input', update);
    console.log(' Event listeners added');
} else {
    console.error('Could not add listeners - sliders missing');
}

// Preset buttons
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

// Initialize on page load
window.addEventListener('load', function() {
    console.log(' Page loaded, drawing initial graph...');
    update();
});

// Also run when DOM is ready (in case load event already fired)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', update);
} else {
    // DOM already loaded, run now
    setTimeout(update, 100);
}

// Add a test rectangle to verify canvas works
setTimeout(function() {
    if (canvas && ctx) {
        // Draw a small test dot
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(300, 200, 5, 0, 2 * Math.PI);
        ctx.fill();
        console.log('Test dot drawn at (300,200)');
    }
}, 500);