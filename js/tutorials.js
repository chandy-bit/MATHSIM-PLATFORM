
const tutorials = {
    // Algebra
    'algebra-linear': {
        title: 'Introduction to Slope',
        videoId: 'MeU-KzdCBps',
        duration: '6:55',
        level: 'Beginner',
        subject: 'algebra',
        points: [
            'Slope measures the steepness of a line',
            'Formula: rise over run (change in y / change in x)',
            'Positive slope goes upward, negative goes downward',
            'Zero slope is horizontal',
            'Undefined slope is vertical'
        ]
    },
    'algebra-quadratic': {
        title: 'Quadratic Functions',
        videoId: 'QEXde5nuG9M',
        duration: '8:15',
        level: 'Intermediate',
        subject: 'algebra',
        points: [
            'Standard form: y = ax² + bx + c',
            'a controls direction (upward/downward) and width',
            'b controls horizontal position of the vertex',
            'c is the y-intercept',
            'Vertex is the highest or lowest point of the parabola'
        ]
    },
    'algebra-intercepts': {
        title: 'X & Y Intercepts',
        videoId: 'RqXOJsCalYQ',
        duration: '6:45',
        level: 'Beginner',
        subject: 'algebra',
        points: [
            'Y-intercept: where line crosses y-axis (x=0)',
            'X-intercept: where line crosses x-axis (y=0)',
            'To find y-intercept: set x=0 and solve',
            'To find x-intercept: set y=0 and solve',
            'Linear equations have one of each intercept'
        ]
    },
    
    // Geometry
    'geometry-parallel': {
        title: 'Parallel & Perpendicular Lines',
        videoId: 'RqXOJsCalYQ',
        duration: '5:50',
        level: 'Intermediate',
        subject: 'geometry',
        points: [
            'Parallel lines have the same slope',
            'Perpendicular lines have slopes that multiply to -1',
            'Horizontal and vertical lines are perpendicular',
            'm₁ × m₂ = -1 for perpendicular lines',
            'Never intersect vs intersect at 90°'
        ]
    },
    'geometry-triangles': {
        title: 'Triangle Properties',
        videoId: 'y99lNRqLjBA',
        duration: '7:30',
        level: 'Intermediate',
        subject: 'geometry',
        points: [
            'Pythagorean theorem: a² + b² = c²',
            '30-60-90 triangle sides: a : a√3 : 2a',
            '45-45-90 triangle sides: a : a : a√2',
            'Area of triangle = ½ × base × height',
            'Triangle angles sum to 180°'
        ]
    },
    
    // Pre-Calculus
    'precalc-functions': {
        title: 'Introduction to Functions',
        videoId: 'MeU-KzdCBps',
        duration: '8:20',
        level: 'Intermediate',
        subject: 'precalculus',
        points: [
            'Domain: all possible input values',
            'Range: all possible output values',
            'Function composition: f(g(x))',
            'Inverse functions: f⁻¹(f(x)) = x',
            'One-to-one functions have inverses'
        ]
    },
    'precalc-trig': {
        title: 'Trigonometry Basics',
        videoId: 'R948Tsyq4vA',
        duration: '9:15',
        level: 'Intermediate',
        subject: 'precalculus',
        points: [
            'Sine = opposite/hypotenuse',
            'Cosine = adjacent/hypotenuse',
            'Tangent = opposite/adjacent',
            'Unit circle: sin²θ + cos²θ = 1',
            'Trigonometric identities for problem solving'
        ]
    },
    
    // Calculus
    'calculus-derivatives': {
        title: 'Introduction to Derivatives',
        videoId: 'QEXde5nuG9M',
        duration: '10:15',
        level: 'Advanced',
        subject: 'calculus',
        points: [
            'Derivative = instantaneous rate of change',
            'Power rule: d/dx[xⁿ] = n·xⁿ⁻¹',
            'Product rule: d/dx[uv] = u\'v + uv\'',
            'Chain rule: d/dx[f(g(x))] = f\'(g(x))·g\'(x)',
            'Derivative gives slope of tangent line'
        ]
    },
    'calculus-integrals': {
        title: 'Understanding Integrals',
        videoId: 'RqXOJsCalYQ',
        duration: '11:30',
        level: 'Advanced',
        subject: 'calculus',
        points: [
            'Integral = area under curve',
            'Antiderivative is opposite of derivative',
            'Fundamental Theorem of Calculus',
            'Definite integral from a to b: F(b)-F(a)',
            'Integrals calculate accumulated change'
        ]
    },
    
    // Probability
    'probability-basics': {
        title: 'Probability Fundamentals',
        videoId: 'y99lNRqLjBA',
        duration: '7:50',
        level: 'Beginner',
        subject: 'probability',
        points: [
            'Probability = favorable outcomes / total outcomes',
            'Sample space: all possible outcomes',
            'Probability ranges from 0 to 1',
            'Complement rule: P(not A) = 1 - P(A)',
            'Addition rule: P(A or B) = P(A) + P(B) - P(A and B)'
        ]
    },
    'probability-distributions': {
        title: 'Probability Distributions',
        videoId: 'R948Tsyq4vA',
        duration: '9:45',
        level: 'Intermediate',
        subject: 'probability',
        points: [
            'Binomial distribution: number of successes in n trials',
            'Normal distribution: bell curve',
            'Expected value: E(X) = Σ x·P(x)',
            'Variance measures spread',
            'Central Limit Theorem'
        ]
    }
};

function openVideo(videoId) {
    const tutorial = tutorials[videoId];
    if (!tutorial) {
        console.error('Video not found:', videoId);
        return;
    }

    const modal = document.getElementById('videoModal');
    const title = document.getElementById('modalTitle');
    const container = document.getElementById('videoContainer');
    const pointsList = document.getElementById('keyPointsList');

    if (!modal || !title || !container || !pointsList) {
        console.error('Modal elements not found');
        return;
    }

    title.textContent = tutorial.title;

    // Create YouTube iframe
    container.innerHTML = `
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
            <iframe 
                src="https://www.youtube.com/embed/${tutorial.videoId}?autoplay=1"
                title="${tutorial.title}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
            </iframe>
        </div>
    `;

    // Update key points
    pointsList.innerHTML = tutorial.points.map(point => `<li>${point}</li>`).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('videoContainer');
    
    if (modal) modal.classList.remove('active');
    if (container) container.innerHTML = '';
    document.body.style.overflow = '';
}

function openGameTips() {
    const modal = document.getElementById('exampleModal');
    const title = document.getElementById('exampleModalTitle');
    const content = document.getElementById('exampleContent');

    if (!modal || !title || !content) {
        console.error('Modal elements not found');
        return;
    }

    title.textContent = ' Slope Game Tips & Strategies';
    content.innerHTML = `
        <div class="interactive-demo">
            <h4>How to Win at Slope Challenge</h4>
            <ul style="text-align: left; margin: 1rem 0; padding-left: 1.5rem;">
                <li><strong>Look at direction first</strong> - Is the line going up or down?</li>
                <li><strong>Count rise and run</strong> - Find two clear points on the grid</li>
                <li><strong>Vertical lines</strong> = undefined slope (straight up/down)</li>
                <li><strong>Horizontal lines</strong> = slope of 0</li>
                <li><strong>Practice with presets</strong> in the simulation page first</li>
                <li><strong>Use the hint button</strong> if you're stuck</li>
                <li><strong>Level 1</strong> - Focus on positive slopes</li>
                <li><strong>Level 2</strong> - Practice negative slopes</li>
                <li><strong>Level 3</strong> - Watch for vertical lines!</li>
            </ul>
            <div class="demo-controls" style="display: flex; justify-content: center;">
                <button class="demo-btn btn btn-primary" onclick="window.location.href='game.html'"> Try the Game Now</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openExample(exampleId) {
    const modal = document.getElementById('exampleModal');
    const title = document.getElementById('exampleModalTitle');
    const content = document.getElementById('exampleContent');
    
    if (!modal || !title || !content) {
        console.error('Modal elements not found');
        return;
    }
    
    if (exampleId === 'slope-calculator') {
        title.textContent = ' Slope Calculator';
        content.innerHTML = `
            <div class="interactive-demo">
                <h4>Calculate slope between two points</h4>
                <div class="demo-controls">
                    <div>
                        <label>Point 1 (x₁, y₁):</label>
                        <input type="number" id="x1" value="1" step="1">,
                        <input type="number" id="y1" value="2" step="1">
                    </div>
                    <div>
                        <label>Point 2 (x₂, y₂):</label>
                        <input type="number" id="x2" value="3" step="1">,
                        <input type="number" id="y2" value="4" step="1">
                    </div>
                    <button class="demo-btn btn btn-primary" onclick="calculateSlopeDemo()">Calculate</button>
                </div>
                <p id="slope-result-demo" style="margin-top: 1rem; font-weight: bold;">Slope = </p>
            </div>
        `;
    }
    else if (exampleId === 'quadratic-explorer') {
        title.textContent = ' Quadratic Explorer';
        content.innerHTML = `
            <div class="interactive-demo">
                <h4>Explore quadratic parameters</h4>
                <div class="demo-controls">
                    <div>a: <input type="range" id="qa" min="-5" max="5" value="1" step="0.5"> <span id="qa-val">1</span></div>
                    <div>b: <input type="range" id="qb" min="-10" max="10" value="0" step="1"> <span id="qb-val">0</span></div>
                    <div>c: <input type="range" id="qc" min="-10" max="10" value="0" step="1"> <span id="qc-val">0</span></div>
                </div>
                <p id="quadratic-result-demo">y = 1x² + 0x + 0</p>
                <p id="vertex-result-demo">Vertex: (0, 0)</p>
            </div>
        `;
    }
    else if (exampleId === 'line-builder') {
        title.textContent = ' Line Builder';
        content.innerHTML = `
            <div class="interactive-demo">
                <h4>Build a line from slope and intercept</h4>
                <div class="demo-controls">
                    <div>Slope (m): <input type="range" id="lm" min="-5" max="5" value="1" step="0.5"> <span id="lm-val">1</span></div>
                    <div>Intercept (b): <input type="range" id="lb" min="-10" max="10" value="0" step="1"> <span id="lb-val">0</span></div>
                </div>
                <p id="line-result-demo">y = 1x + 0</p>
            </div>
        `;
    }
    else if (exampleId === 'equation-solver') {
        title.textContent = ' Equation Solver';
        content.innerHTML = `
            <div class="interactive-demo">
                <h4>Solve linear equations</h4>
                <div class="demo-controls">
                    <input type="text" id="equation-demo" value="2x + 3 = 7" placeholder="Enter equation">
                    <button class="demo-btn btn btn-primary" onclick="solveEquationDemo()">Solve</button>
                </div>
                <p id="solve-result-demo" style="margin-top: 1rem; font-weight: bold;">x = 2</p>
            </div>
        `;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Initialize event listeners for the newly added content
    setTimeout(() => {
        if (exampleId === 'quadratic-explorer') {
            const qa = document.getElementById('qa');
            const qb = document.getElementById('qb');
            const qc = document.getElementById('qc');
            if (qa) qa.addEventListener('input', updateQuadraticDemo);
            if (qb) qb.addEventListener('input', updateQuadraticDemo);
            if (qc) qc.addEventListener('input', updateQuadraticDemo);
            updateQuadraticDemo();
        }
        else if (exampleId === 'line-builder') {
            const lm = document.getElementById('lm');
            const lb = document.getElementById('lb');
            if (lm) lm.addEventListener('input', updateLineDemo);
            if (lb) lb.addEventListener('input', updateLineDemo);
            updateLineDemo();
        }
    }, 0);
}

function closeExampleModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function calculateSlopeDemo() {
    const x1 = parseFloat(document.getElementById('x1')?.value) || 0;
    const y1 = parseFloat(document.getElementById('y1')?.value) || 0;
    const x2 = parseFloat(document.getElementById('x2')?.value) || 0;
    const y2 = parseFloat(document.getElementById('y2')?.value) || 0;
    const result = document.getElementById('slope-result-demo');
    
    if (!result) return;
    
    if (x2 - x1 === 0) {
        result.textContent = 'Slope = undefined (vertical line)';
    } else {
        const slope = ((y2 - y1) / (x2 - x1)).toFixed(2);
        result.textContent = 'Slope = ' + slope;
    }
}

function updateQuadraticDemo() {
    const a = parseFloat(document.getElementById('qa')?.value) || 0;
    const b = parseFloat(document.getElementById('qb')?.value) || 0;
    const c = parseFloat(document.getElementById('qc')?.value) || 0;
    
    const qaVal = document.getElementById('qa-val');
    const qbVal = document.getElementById('qb-val');
    const qcVal = document.getElementById('qc-val');
    const equationEl = document.getElementById('quadratic-result-demo');
    const vertexEl = document.getElementById('vertex-result-demo');
    
    if (qaVal) qaVal.textContent = a;
    if (qbVal) qbVal.textContent = b;
    if (qcVal) qcVal.textContent = c;
    
    if (equationEl) {
        const aTerm = a === 1 ? 'x²' : a === -1 ? '-x²' : a + 'x²';
        const bTerm = b === 0 ? '' : b > 0 ? ' + ' + b + 'x' : ' - ' + Math.abs(b) + 'x';
        const cTerm = c === 0 ? '' : c > 0 ? ' + ' + c : ' - ' + Math.abs(c);
        equationEl.textContent = 'y = ' + aTerm + bTerm + cTerm;
    }
    
    if (vertexEl && a !== 0) {
        const vertexX = (-b / (2 * a)).toFixed(2);
        const vertexY = (a * vertexX * vertexX + b * vertexX + c).toFixed(2);
        vertexEl.textContent = 'Vertex: (' + vertexX + ', ' + vertexY + ')';
    } else if (vertexEl) {
        vertexEl.textContent = 'Not a quadratic (a=0)';
    }
}

function updateLineDemo() {
    const m = parseFloat(document.getElementById('lm')?.value) || 0;
    const b = parseFloat(document.getElementById('lb')?.value) || 0;
    
    const lmVal = document.getElementById('lm-val');
    const lbVal = document.getElementById('lb-val');
    const resultEl = document.getElementById('line-result-demo');
    
    if (lmVal) lmVal.textContent = m;
    if (lbVal) lbVal.textContent = b;
    
    if (resultEl) {
        const mTerm = m === 1 ? 'x' : m === -1 ? '-x' : m + 'x';
        const bTerm = b === 0 ? '' : b > 0 ? ' + ' + b : ' - ' + Math.abs(b);
        resultEl.textContent = 'y = ' + mTerm + bTerm;
    }
}

function solveEquationDemo() {
    const input = document.getElementById('equation-demo')?.value || '';
    const result = document.getElementById('solve-result-demo');
    
    if (!result) return;
    
    const match = input.match(/(-?\d*)x\s*([+-]\s*\d+)?\s*=\s*(-?\d+)/i);
    if (match) {
        let a = match[1] === '' ? 1 : (match[1] === '-' ? -1 : parseInt(match[1]));
        let b = match[2] ? parseInt(match[2].replace(/\s+/g, '')) : 0;
        let c = parseInt(match[3]);
        const x = ((c - b) / a).toFixed(2);
        result.textContent = 'x = ' + x;
    } else {
        result.textContent = 'Please use format: ax + b = c';
    }
}

function filterTutorials(category, event) {
    const cards = document.querySelectorAll('.tutorial-card');
    const buttons = document.querySelectorAll('.tab-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category || card.dataset.subject === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

window.openVideo = openVideo;
window.closeModal = closeModal;
window.openGameTips = openGameTips;
window.openExample = openExample;
window.closeExampleModal = closeExampleModal;
window.filterTutorials = filterTutorials;
window.calculateSlopeDemo = calculateSlopeDemo;
window.updateQuadraticDemo = updateQuadraticDemo;
window.updateLineDemo = updateLineDemo;
window.solveEquationDemo = solveEquationDemo;

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tutorials system loaded. Available tutorials:', Object.keys(tutorials).length);
    
    // Add click handlers for filter buttons
    const filterButtons = document.querySelectorAll('.tab-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const category = this.dataset.category || this.dataset.tab;
            if (category) filterTutorials(category, e);
        });
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeExampleModal();
        }
    });

    // Close modals when clicking outside
    const videoModal = document.getElementById('videoModal');
    const exampleModal = document.getElementById('exampleModal');
    
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    }
    
    if (exampleModal) {
        exampleModal.addEventListener('click', function(e) {
            if (e.target === this) closeExampleModal();
        });
    }
    
    // Initial filter setup
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        const category = activeTab.dataset.category || activeTab.dataset.tab;
        if (category) filterTutorials(category);
    }
});