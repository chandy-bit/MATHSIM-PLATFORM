
const controlDefinitions = {
    'linear': [
        { id: 'm', label: 'Slope (m)', min: -5, max: 5, value: 1, step: 0.1 },
        { id: 'b', label: 'Intercept (b)', min: -10, max: 10, value: 0, step: 1 }
    ],
    'quadratic': [
        { id: 'a', label: 'a', min: -5, max: 5, value: 1, step: 0.1 },
        { id: 'b', label: 'b', min: -10, max: 10, value: 0, step: 1 },
        { id: 'c', label: 'c', min: -10, max: 10, value: 0, step: 1 }
    ],
    'cubic': [
        { id: 'a', label: 'a', min: -3, max: 3, value: 1, step: 0.1 },
        { id: 'b', label: 'b', min: -5, max: 5, value: 0, step: 0.5 },
        { id: 'c', label: 'c', min: -5, max: 5, value: 0, step: 0.5 },
        { id: 'd', label: 'd', min: -10, max: 10, value: 0, step: 1 }
    ],
    'trig': [
        { id: 'a', label: 'Amplitude', min: -3, max: 3, value: 1, step: 0.1 },
        { id: 'f', label: 'Frequency', min: 0.1, max: 3, value: 1, step: 0.1 },
        { id: 'p', label: 'Phase', min: -3.14, max: 3.14, value: 0, step: 0.1 }
    ],
    'exponential': [
        { id: 'a', label: 'Base', min: 0.1, max: 3, value: 2, step: 0.1 },
        { id: 'b', label: 'Coefficient', min: -3, max: 3, value: 1, step: 0.1 },
        { id: 'c', label: 'Constant', min: -5, max: 5, value: 0, step: 0.5 }
    ],
    'calculus': [
        { id: 'x', label: 'Point', min: -5, max: 5, value: 1, step: 0.1 },
        { id: 'h', label: 'Δx', min: 0.01, max: 1, value: 0.1, step: 0.01 }
    ]
};

// Preset definitions
const presetDefinitions = {
    'linear': [
        { name: 'y = x', params: { m: 1, b: 0 } },
        { name: 'y = 2x + 3', params: { m: 2, b: 3 } },
        { name: 'y = -x + 5', params: { m: -1, b: 5 } },
        { name: 'Horizontal', params: { m: 0, b: 2 } }
    ],
    'quadratic': [
        { name: 'Basic', params: { a: 1, b: 0, c: 0 } },
        { name: 'U-Shape', params: { a: 2, b: 0, c: -3 } },
        { name: '∩-Shape', params: { a: -2, b: 0, c: 4 } },
        { name: 'Shifted', params: { a: 1, b: -2, c: 1 } }
    ],
    'trig': [
        { name: 'sin(x)', params: { a: 1, f: 1, p: 0 } },
        { name: '2sin(x)', params: { a: 2, f: 1, p: 0 } },
        { name: 'sin(2x)', params: { a: 1, f: 2, p: 0 } },
        { name: 'cos(x)', params: { a: 1, f: 1, p: 1.57 } }
    ]
};

// Load controls for specific type
function loadControls(type) {
    const container = document.getElementById('paramControls');
    if (!container) return;
    
    const controls = controlDefinitions[type] || controlDefinitions.quadratic;
    
    let html = '<div class="controls-grid">';
    controls.forEach(control => {
        html += `
            <div class="control-group">
                <label for="${control.id}">${control.label}: <span id="${control.id}-value">${control.value}</span></label>
                <input type="range" id="${control.id}" min="${control.min}" max="${control.max}" 
                       value="${control.value}" step="${control.step}" class="param-input">
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
    
    // Add event listeners
    controls.forEach(control => {
        const input = document.getElementById(control.id);
        if (input) {
            input.addEventListener('input', () => {
                document.getElementById(`${control.id}-value`).textContent = input.value;
                updateFunction(type);
            });
        }
    });
    
    // Initial update
    setTimeout(() => updateFunction(type), 100);
}

// Load preset buttons
function loadPresets(type) {
    const container = document.getElementById('presetButtons');
    if (!container) return;
    
    const presets = presetDefinitions[type] || [];
    
    let html = '';
    presets.forEach((preset, index) => {
        html += `<button class="preset-btn" onclick="loadPreset('${type}', ${index})">${preset.name}</button>`;
    });
    
    container.innerHTML = html;
}

// Load preset values
function loadPreset(type, index) {
    const presets = presetDefinitions[type];
    if (!presets || !presets[index]) return;
    
    const preset = presets[index];
    
    Object.keys(preset.params).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = preset.params[key];
            document.getElementById(`${key}-value`).textContent = preset.params[key];
        }
    });
    
    updateFunction(type);
}

// Update function based on type
function updateFunction(type) {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes();
    
    switch(type) {
        case 'linear':
            plotLinear();
            break;
        case 'quadratic':
            plotQuadratic();
            break;
        case 'cubic':
            plotCubic();
            break;
        case 'trig':
            plotTrigonometric();
            break;
        case 'exponential':
            plotExponential();
            break;
        case 'calculus':
            plotDerivative();
            break;
    }
}

// Draw axes (reused from plotter.js)
function drawAxes() {
    // Grid
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.5;
    
    for (let x = 0; x <= canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    for (let y = 0; y <= canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
}

// Plot linear functions
function plotLinear() {
    const m = parseFloat(document.getElementById('m')?.value) || 1;
    const b = parseFloat(document.getElementById('b')?.value) || 0;
    
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let x = -300; x <= 300; x += 2) {
        const scaledX = x / 30;
        const y = m * scaledX + b;
        const canvasX = canvas.width/2 + x;
        const canvasY = canvas.height/2 - y * 30;
        
        if (x === -300) ctx.moveTo(canvasX, canvasY);
        else ctx.lineTo(canvasX, canvasY);
    }
    
    ctx.stroke();
    
    document.getElementById('equation').textContent = `f(x) = ${m}x + ${b}`;
}

// Plot quadratic functions
function plotQuadratic() {
    const a = parseFloat(document.getElementById('a')?.value) || 1;
    const b = parseFloat(document.getElementById('b')?.value) || 0;
    const c = parseFloat(document.getElementById('c')?.value) || 0;
    
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    for (let x = -300; x <= 300; x += 2) {
        const scaledX = x / 30;
        const y = a * scaledX * scaledX + b * scaledX + c;
        const canvasX = canvas.width/2 + x;
        const canvasY = canvas.height/2 - y * 30;
        
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
    
    let eq = `${a}x²`;
    if (b !== 0) eq += b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`;
    if (c !== 0) eq += c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
    document.getElementById('equation').textContent = `f(x) = ${eq}`;
}

// Plot cubic functions
function plotCubic() {
    const a = parseFloat(document.getElementById('a')?.value) || 1;
    const b = parseFloat(document.getElementById('b')?.value) || 0;
    const c = parseFloat(document.getElementById('c')?.value) || 0;
    const d = parseFloat(document.getElementById('d')?.value) || 0;
    
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let x = -300; x <= 300; x += 2) {
        const scaledX = x / 30;
        const y = a * scaledX * scaledX * scaledX + b * scaledX * scaledX + c * scaledX + d;
        const canvasX = canvas.width/2 + x;
        const canvasY = canvas.height/2 - y * 30;
        
        if (x === -300) ctx.moveTo(canvasX, canvasY);
        else ctx.lineTo(canvasX, canvasY);
    }
    
    ctx.stroke();
}

// Plot trigonometric functions
function plotTrigonometric() {
    const a = parseFloat(document.getElementById('a')?.value) || 1;
    const f = parseFloat(document.getElementById('f')?.value) || 1;
    const p = parseFloat(document.getElementById('p')?.value) || 0;
    
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let x = -300; x <= 300; x += 2) {
        const scaledX = x / 30;
        const y = a * Math.sin(f * scaledX + p);
        const canvasX = canvas.width/2 + x;
        const canvasY = canvas.height/2 - y * 30;
        
        if (x === -300) ctx.moveTo(canvasX, canvasY);
        else ctx.lineTo(canvasX, canvasY);
    }
    
    ctx.stroke();
    
    document.getElementById('equation').textContent = `f(x) = ${a} sin(${f}x + ${p.toFixed(2)})`;
}

// Plot exponential functions
function plotExponential() {
    const a = parseFloat(document.getElementById('a')?.value) || 2;
    const b = parseFloat(document.getElementById('b')?.value) || 1;
    const c = parseFloat(document.getElementById('c')?.value) || 0;
    
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let x = -300; x <= 300; x += 2) {
        const scaledX = x / 30;
        const y = b * Math.pow(a, scaledX) + c;
        const canvasX = canvas.width/2 + x;
        const canvasY = canvas.height/2 - y * 30;
        
        if (x === -300) ctx.moveTo(canvasX, canvasY);
        else ctx.lineTo(canvasX, canvasY);
    }
    
    ctx.stroke();
}

// Plot derivative visualization
function plotDerivative() {
    const point = parseFloat(document.getElementById('x')?.value) || 1;
    const h = parseFloat(document.getElementById('h')?.value) || 0.1;
    
    // Plot original function (f(x) = x²)
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let x = -300; x <= 300; x += 2) {
        const scaledX = x / 30;
        const y = scaledX * scaledX;
        const canvasX = canvas.width/2 + x;
        const canvasY = canvas.height/2 - y * 30;
        
        if (x === -300) ctx.moveTo(canvasX, canvasY);
        else ctx.lineTo(canvasX, canvasY);
    }
    ctx.stroke();
    
    // Plot tangent line at point
    const slope = 2 * point;
    const yPoint = point * point;
    
    ctx.strokeStyle = '#f44336';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let x = -50; x <= 50; x += 2) {
        const scaledX = (x / 10) + point;
        const y = yPoint + slope * (scaledX - point);
        const canvasX = canvas.width/2 + scaledX * 30;
        const canvasY = canvas.height/2 - y * 30;
        
        if (x === -50) ctx.moveTo(canvasX, canvasY);
        else ctx.lineTo(canvasX, canvasY);
    }
    ctx.stroke();
    
    // Mark point
    ctx.fillStyle = '#f44336';
    ctx.beginPath();
    ctx.arc(canvas.width/2 + point * 30, canvas.height/2 - yPoint * 30, 5, 0, 2*Math.PI);
    ctx.fill();
    
    document.getElementById('equation').textContent = 
        `f(x) = x², f'(${point}) = ${slope.toFixed(2)}`;
}