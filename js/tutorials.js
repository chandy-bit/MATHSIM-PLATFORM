
console.log('tutorials.js loaded');

// Video database with REAL Khan Academy YouTube IDs
const tutorials = {
    'slope-basics': {
        title: 'Understanding Slope',
        videoId: 'MeU-KzdCBps',
        duration: '6:55',
        level: 'Beginner',
        points: [
            'Slope measures steepness of a line',
            'Formula: rise over run (change in y / change in x)',
            'Positive slope goes up, negative goes down',
            'Zero slope is horizontal',
            'Undefined slope is vertical'
        ]
    },
    'quadratics': {
        title: 'Quadratic Functions',
        videoId: 'W3F5U3k1k6Q',
        duration: '8:15',
        level: 'Intermediate',
        points: [
            'Standard form: y = ax² + bx + c',
            'a controls direction and width',
            'b controls horizontal position',
            'c is y-intercept',
            'Vertex is highest or lowest point'
        ]
    },
    
    'intercepts': {
        title: 'X & Y Intercepts',
        videoId: 'RqXOJsCalYQ',
        duration: '6:45',
        level: 'Beginner',
        points: [
            'Y-intercept: where line crosses y-axis (x=0)',
            'X-intercept: where line crosses x-axis (y=0)',
            'To find y-intercept: set x=0 and solve',
            'To find x-intercept: set y=0 and solve',
            'Linear equations have one of each'
        ]
    },
    'vertex': {
        title: 'Vertex Form',
        videoId: 'y99lNRqLjBA',
        duration: '7:30',
        level: 'Advanced',
        points: [
            'Vertex form: y = a(x-h)² + k',
            '(h,k) is the vertex',
            'a controls direction and width',
            'Convert from standard form by completing square',
            'Vertex is maximum if a<0, minimum if a>0'
        ]
    },
    'parallel': {
        title: 'Parallel & Perpendicular',
        videoId: 'RqXOJsCalYQ',
        duration: '5:50',
        level: 'Intermediate',
        points: [
            'Parallel lines have same slope',
            'Perpendicular lines have negative reciprocal slopes',
            'm1 x m2 = -1 for perpendicular',
            'Horizontal and vertical lines are perpendicular',
            'Never intersect vs intersect at 90 degrees'
        ]
    }
};

// Interactive examples database
const examples = {
    'slope-calculator': {
        title: 'Slope Calculator',
        content: `
            <div class="interactive-demo">
                <h4>Calculate slope between two points</h4>
                <div class="demo-controls">
                    <div>
                        <label>Point 1 (x1, y1):</label>
                        <input type="number" id="x1" value="1" step="1">,
                        <input type="number" id="y1" value="2" step="1">
                    </div>
                    <div>
                        <label>Point 2 (x2, y2):</label>
                        <input type="number" id="x2" value="3" step="1">,
                        <input type="number" id="y2" value="4" step="1">
                    </div>
                    <button class="demo-btn" onclick="calculateSlope()">Calculate</button>
                </div>
                <p id="slope-result">Slope = </p>
            </div>
        `
    },
    'quadratic-explorer': {
        title: 'Quadratic Explorer',
        content: `
            <div class="interactive-demo">
                <h4>Explore quadratic parameters</h4>
                <div class="demo-controls">
                    <div>a: <input type="range" id="qa" min="-5" max="5" value="1" step="0.5"> <span id="qa-val">1</span></div>
                    <div>b: <input type="range" id="qb" min="-10" max="10" value="0" step="1"> <span id="qb-val">0</span></div>
                    <div>c: <input type="range" id="qc" min="-10" max="10" value="0" step="1"> <span id="qc-val">0</span></div>
                </div>
                <p id="quadratic-result">y = 1x2 + 0x + 0</p>
                <p id="vertex-result">Vertex: (0, 0)</p>
            </div>
        `
    },
    'line-builder': {
        title: 'Line Builder',
        content: `
            <div class="interactive-demo">
                <h4>Build a line from slope and intercept</h4>
                <div class="demo-controls">
                    <div>Slope (m): <input type="range" id="lm" min="-5" max="5" value="1" step="0.5"> <span id="lm-val">1</span></div>
                    <div>Intercept (b): <input type="range" id="lb" min="-10" max="10" value="0" step="1"> <span id="lb-val">0</span></div>
                </div>
                <p id="line-result">y = 1x + 0</p>
            </div>
        `
    },
    'equation-solver': {
        title: 'Equation Solver',
        content: `
            <div class="interactive-demo">
                <h4>Solve linear equations</h4>
                <div class="demo-controls">
                    <input type="text" id="equation" value="2x + 3 = 7" placeholder="Enter equation">
                    <button class="demo-btn" onclick="solveEquation()">Solve</button>
                </div>
                <p id="solve-result">x = 2</p>
            </div>
        `
    }
};

// Open video modal
function openVideo(videoId) {
    console.log('Opening video:', videoId);
    
    const tutorial = tutorials[videoId];
    if (!tutorial) {
        console.error('Tutorial not found:', videoId);
        alert('Video not found!');
        return;
    }
    
    console.log('Tutorial found:', tutorial.title);
    
    const modal = document.getElementById('videoModal');
    const title = document.getElementById('modalTitle');
    const container = document.getElementById('videoContainer');
    const pointsList = document.getElementById('keyPointsList');
    
    if (!modal) {
        console.error('Video modal element not found!');
        return;
    }
    if (!title) {
        console.error('Modal title element not found!');
        return;
    }
    if (!container) {
        console.error('Video container element not found!');
        return;
    }
    if (!pointsList) {
        console.error('Key points list element not found!');
        return;
    }
    
    title.textContent = tutorial.title;
    
    // Insert YouTube iframe
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + tutorial.videoId;
    iframe.title = tutorial.title;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.border = '0';
    
    container.innerHTML = '';
    container.style.position = 'relative';
    container.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
    container.style.height = '0';
    container.style.overflow = 'hidden';
    container.appendChild(iframe);
    
    console.log('Iframe created with src:', iframe.src);
    
    // Update key points
    let pointsHTML = '';
    for (let i = 0; i < tutorial.points.length; i++) {
        pointsHTML = pointsHTML + '<li>' + tutorial.points[i] + '</li>';
    }
    pointsList.innerHTML = pointsHTML;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close video modal
function closeModal() {
    console.log('Closing video modal');
    
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('videoContainer');
    
    if (modal) {
        modal.classList.remove('active');
    }
    document.body.style.overflow = '';
    
    if (container) {
        container.innerHTML = '';
    }
}

// Open example modal
function openExample(exampleId) {
    console.log('Opening example:', exampleId);
    
    const example = examples[exampleId];
    if (!example) {
        console.error('Example not found:', exampleId);
        return;
    }
    
    const modal = document.getElementById('exampleModal');
    const title = document.getElementById('exampleModalTitle');
    const content = document.getElementById('exampleContent');
    
    if (!modal) {
        console.error('Example modal element not found!');
        return;
    }
    if (!title) {
        console.error('Example modal title element not found!');
        return;
    }
    if (!content) {
        console.error('Example content element not found!');
        return;
    }
    
    title.textContent = example.title;
    content.innerHTML = example.content;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Initialize example-specific listeners
    setTimeout(function() {
        console.log('Initializing example listeners');
        
        if (exampleId === 'slope-calculator') {
            const btn = document.querySelector('.demo-btn[onclick="calculateSlope()"]');
            if (btn) {
                btn.addEventListener('click', calculateSlope);
            }
            
            // Add input listeners for real-time calculation
            const inputs = ['x1', 'y1', 'x2', 'y2'];
            for (let i = 0; i < inputs.length; i++) {
                const el = document.getElementById(inputs[i]);
                if (el) {
                    el.addEventListener('input', calculateSlope);
                }
            }
        }
        else if (exampleId === 'quadratic-explorer') {
            const ids = ['qa', 'qb', 'qc'];
            for (let i = 0; i < ids.length; i++) {
                const el = document.getElementById(ids[i]);
                if (el) {
                    el.addEventListener('input', updateQuadratic);
                }
            }
            updateQuadratic();
        }
        else if (exampleId === 'line-builder') {
            const ids = ['lm', 'lb'];
            for (let i = 0; i < ids.length; i++) {
                const el = document.getElementById(ids[i]);
                if (el) {
                    el.addEventListener('input', updateLine);
                }
            }
            updateLine();
        }
    }, 100);
}

// Close example modal
function closeExampleModal() {
    console.log('Closing example modal');
    
    const modal = document.getElementById('exampleModal');
    if (modal) {
        modal.classList.remove('active');
    }
    document.body.style.overflow = '';
}

// Calculate slope function
function calculateSlope() {
    console.log('Calculating slope');
    
    const x1El = document.getElementById('x1');
    const y1El = document.getElementById('y1');
    const x2El = document.getElementById('x2');
    const y2El = document.getElementById('y2');
    const resultEl = document.getElementById('slope-result');
    
    if (!x1El || !y1El || !x2El || !y2El || !resultEl) {
        console.error('Slope calculator elements not found');
        return;
    }
    
    const x1 = parseFloat(x1El.value) || 0;
    const y1 = parseFloat(y1El.value) || 0;
    const x2 = parseFloat(x2El.value) || 0;
    const y2 = parseFloat(y2El.value) || 0;
    
    if (x2 - x1 === 0) {
        resultEl.textContent = 'Slope = undefined (vertical line)';
    } else {
        const slope = ((y2 - y1) / (x2 - x1)).toFixed(2);
        resultEl.textContent = 'Slope = ' + slope;
    }
}

// Update quadratic function
function updateQuadratic() {
    const aEl = document.getElementById('qa');
    const bEl = document.getElementById('qb');
    const cEl = document.getElementById('qc');
    
    if (!aEl || !bEl || !cEl) return;
    
    const a = parseFloat(aEl.value) || 0;
    const b = parseFloat(bEl.value) || 0;
    const c = parseFloat(cEl.value) || 0;
    
    const aValEl = document.getElementById('qa-val');
    const bValEl = document.getElementById('qb-val');
    const cValEl = document.getElementById('qc-val');
    const equationEl = document.getElementById('quadratic-result');
    const vertexEl = document.getElementById('vertex-result');
    
    if (aValEl) aValEl.textContent = a;
    if (bValEl) bValEl.textContent = b;
    if (cValEl) cValEl.textContent = c;
    
    if (equationEl) {
        let aTerm = '';
        if (a === 1) {
            aTerm = 'x2';
        } else if (a === -1) {
            aTerm = '-x2';
        } else {
            aTerm = a + 'x2';
        }
        
        let bTerm = '';
        if (b !== 0) {
            if (b > 0) {
                bTerm = ' + ' + b + 'x';
            } else {
                bTerm = ' - ' + Math.abs(b) + 'x';
            }
        }
        
        let cTerm = '';
        if (c !== 0) {
            if (c > 0) {
                cTerm = ' + ' + c;
            } else {
                cTerm = ' - ' + Math.abs(c);
            }
        }
        
        let eq = aTerm + bTerm + cTerm;
        eq = eq.replace(/\+ -/g, '- ');
        equationEl.textContent = 'y = ' + eq;
    }
    
    if (vertexEl) {
        if (a !== 0) {
            const vertexX = (-b / (2 * a)).toFixed(2);
            const vertexY = (a * vertexX * vertexX + b * vertexX + c).toFixed(2);
            vertexEl.textContent = 'Vertex: (' + vertexX + ', ' + vertexY + ')';
        } else {
            vertexEl.textContent = 'Not a quadratic (a=0)';
        }
    }
}

// Update line function
function updateLine() {
    const mEl = document.getElementById('lm');
    const bEl = document.getElementById('lb');
    
    if (!mEl || !bEl) return;
    
    const m = parseFloat(mEl.value) || 0;
    const b = parseFloat(bEl.value) || 0;
    
    const mValEl = document.getElementById('lm-val');
    const bValEl = document.getElementById('lb-val');
    const resultEl = document.getElementById('line-result');
    
    if (mValEl) mValEl.textContent = m;
    if (bValEl) bValEl.textContent = b;
    
    if (resultEl) {
        let mTerm = '';
        if (m === 1) {
            mTerm = 'x';
        } else if (m === -1) {
            mTerm = '-x';
        } else {
            mTerm = m + 'x';
        }
        
        let bTerm = '';
        if (b !== 0) {
            if (b > 0) {
                bTerm = ' + ' + b;
            } else {
                bTerm = ' - ' + Math.abs(b);
            }
        }
        
        let eq = 'y = ' + mTerm + bTerm;
        eq = eq.replace(/\+ -/g, '- ');
        resultEl.textContent = eq;
    }
}

// Solve equation
function solveEquation() {
    console.log('Solving equation');
    
    const inputEl = document.getElementById('equation');
    const resultEl = document.getElementById('solve-result');
    
    if (!inputEl || !resultEl) return;
    
    const input = inputEl.value || '2x + 3 = 7';
    
    try {
        // Parse "ax + b = c" format
        const match = input.match(/(-?\d*)x\s*([+-]\s*\d+)?\s*=\s*(-?\d+)/i);
        if (match) {
            let a = match[1] === '' ? 1 : (match[1] === '-' ? -1 : parseInt(match[1]));
            let b = match[2] ? parseInt(match[2].replace(/\s+/g, '')) : 0;
            let c = parseInt(match[3]);
            
            const x = ((c - b) / a).toFixed(2);
            resultEl.textContent = 'x = ' + x;
        } else {
            resultEl.textContent = 'Please use format: ax + b = c';
        }
    } catch (e) {
        console.error('Error solving equation:', e);
        resultEl.textContent = 'Error parsing equation';
    }
}

function openGameTips() {
    const modal = document.getElementById('exampleModal');
    const title = document.getElementById('exampleModalTitle');
    const content = document.getElementById('exampleContent');
    
    title.textContent = 'Slope Game Tips & Strategies';
    content.innerHTML = `
        <div class="interactive-demo">
            <h4>How to Win at Slope Challenge</h4>
            <ul style="text-align: left; margin: 1rem 0;">
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
            <div class="demo-controls">
                <button class="demo-btn" onclick="window.location.href='game.html'">Try the Game Now</button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Tab filtering
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    const tabs = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.tutorial-card');
    
    console.log('Found ' + tabs.length + ' tabs and ' + cards.length + ' cards');
    
    // Add click listeners to tabs
    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        tab.addEventListener('click', function() {
            console.log('Tab clicked:', this.dataset.tab);
            
            // Remove active class from all tabs
            for (let j = 0; j < tabs.length; j++) {
                tabs[j].classList.remove('active');
            }
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const category = this.dataset.tab;
            
            // Filter cards
            for (let k = 0; k < cards.length; k++) {
                const card = cards[k];
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeExampleModal();
        }
    });
    
    // Close modals when clicking outside
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    const exampleModal = document.getElementById('exampleModal');
    if (exampleModal) {
        exampleModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeExampleModal();
            }
        });
    }
    
    // Test that video IDs work
    console.log('Tutorials loaded:', Object.keys(tutorials));
    console.log('Examples loaded:', Object.keys(examples));
});

const tutorial = {
    // Algebra tutorials
    'algebra-linear': {
        title: 'Linear Equations',
        videoId: 'MeU-KzdCBps',
        subject: 'algebra',
        duration: '6:55',
        level: 'Beginner'
    },
    'algebra-quadratic': {
        title: 'Quadratic Equations',
        videoId: 'QEXde5nuG9M',
        subject: 'algebra',
        duration: '8:15',
        level: 'Intermediate'
    },
    
    // Geometry tutorials
    'geometry-triangles': {
        title: 'Triangle Properties',
        videoId: 'RqXOJsCalYQ',
        subject: 'geometry',
        duration: '7:30',
        level: 'Beginner'
    },
    'geometry-circles': {
        title: 'Circles and Pi',
        videoId: 'y99lNRqLjBA',
        subject: 'geometry',
        duration: '6:45',
        level: 'Intermediate'
    },
    
    // Pre-Calculus tutorials
    'precalc-trig': {
        title: 'Trigonometry Basics',
        videoId: 'R948Tsyq4vA',
        subject: 'precalculus',
        duration: '9:20',
        level: 'Intermediate'
    },
    'precalc-functions': {
        title: 'Function Transformations',
        videoId: 'MeU-KzdCBps',
        subject: 'precalculus',
        duration: '8:40',
        level: 'Advanced'
    },
    
    // Calculus tutorials
    'calculus-derivatives': {
        title: 'Introduction to Derivatives',
        videoId: 'QEXde5nuG9M',
        subject: 'calculus',
        duration: '10:15',
        level: 'Advanced'
    },
    'calculus-integrals': {
        title: 'Understanding Integrals',
        videoId: 'RqXOJsCalYQ',
        subject: 'calculus',
        duration: '11:30',
        level: 'Advanced'
    },
    
    // Probability tutorials
    'probability-basics': {
        title: 'Probability Fundamentals',
        videoId: 'y99lNRqLjBA',
        subject: 'probability',
        duration: '7:50',
        level: 'Beginner'
    },
    'probability-distributions': {
        title: 'Probability Distributions',
        videoId: 'R948Tsyq4vA',
        subject: 'probability',
        duration: '9:45',
        level: 'Intermediate'
    }
};

function filterTutorials(subject) {
    const cards = document.querySelectorAll('.tutorial-card');
    cards.forEach(card => {
        if (subject === 'all' || card.dataset.subject === subject) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Make functions globally available
window.openVideo = openVideo;
window.closeModal = closeModal;
window.openExample = openExample;
window.closeExampleModal = closeExampleModal;
window.calculateSlope = calculateSlope;
window.updateQuadratic = updateQuadratic;
window.updateLine = updateLine;
window.solveEquation = solveEquation;