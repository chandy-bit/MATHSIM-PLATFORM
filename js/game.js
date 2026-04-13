
class SlopeGame {
    constructor() {
        this.canvas = document.getElementById('game-graph');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        
        // Game state
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.currentSlope = 1;
        this.currentIntercept = 0;
        this.answerSelected = false;
        this.questionCount = 0;
        this.correctAnswers = 0;
        this.totalAnswers = 0;
        
        // DOM elements
        this.scoreEl = document.getElementById('score');
        this.levelEl = document.getElementById('level');
        this.livesEl = document.getElementById('lives');
        this.feedbackEl = document.getElementById('feedback');
        this.slopeQuestionEl = document.getElementById('slope-question');
        this.descriptionEl = document.getElementById('game-description');
        this.answerBtns = document.querySelectorAll('.answer-btn');
        this.nextBtn = document.getElementById('next-question');
        this.newGameBtn = document.getElementById('new-game');
        this.hintBtn = document.getElementById('hint');
        
        // Check if canvas exists
        if (!this.canvas) {
            console.error(' Game canvas not found!');
            return;
        }
        
        this.init();
    }
    
    init() {
        // Make canvas responsive
        this.makeCanvasResponsive();
        
        // Draw initial graph
        this.generateNewLine();
        this.drawGraph();
        
        // Add event listeners
        this.answerBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.checkAnswer(e));
        });
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextQuestion());
        }
        
        if (this.newGameBtn) {
            this.newGameBtn.addEventListener('click', () => this.resetGame());
        }
        
        if (this.hintBtn) {
            this.hintBtn.addEventListener('click', () => this.showHint());
        }
        
        // Keyboard support
        if (this.canvas) {
            this.canvas.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showHint();
                }
            });
        }
        
        // Window resize handler
        window.addEventListener('resize', () => {
            this.makeCanvasResponsive();
            this.drawGraph();
        });
        
        // Update screen reader description
        this.updateDescription();
        
        console.log('🎮 Game initialized successfully');
    }
    
    makeCanvasResponsive() {
        if (!this.canvas) return;
        
        const container = this.canvas.parentElement;
        if (!container) return;
        
        const containerWidth = container.clientWidth;
        // Maintain aspect ratio (1:1 for game graph)
        let newSize = Math.min(containerWidth, 400);
        
        this.canvas.width = newSize;
        this.canvas.height = newSize;
        
        this.canvas.style.width = newSize + 'px';
        this.canvas.style.height = newSize + 'px';
        
        console.log(`📐 Game canvas resized to ${newSize}x${newSize}`);
    }
    
    generateNewLine() {
        // Generate random slope based on level
        const slopes = [-2, -1, -0.5, 0, 0.5, 1, 2, 3];
        
        // Level progression: harder slopes at higher levels
        if (this.level === 1) {
            // Easy: only positive slopes
            const easySlopes = [0.5, 1, 2];
            this.currentSlope = easySlopes[Math.floor(Math.random() * easySlopes.length)];
        } else if (this.level === 2) {
            // Medium: add negative slopes
            const mediumSlopes = [-1, -0.5, 0.5, 1, 2];
            this.currentSlope = mediumSlopes[Math.floor(Math.random() * mediumSlopes.length)];
        } else {
            // Hard: all slopes including undefined (vertical)
            this.currentSlope = slopes[Math.floor(Math.random() * slopes.length)];
        }
        
        // Random intercept between -3 and 3
        this.currentIntercept = Math.floor(Math.random() * 7) - 3;
        
        this.answerSelected = false;
        if (this.nextBtn) this.nextBtn.disabled = true;
        
        // Reset button styles
        this.answerBtns.forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
            btn.disabled = false;
        });
        
        // Clear feedback
        if (this.feedbackEl) {
            this.feedbackEl.textContent = '';
            this.feedbackEl.className = 'feedback';
        }
        
        // Update question display
        if (this.slopeQuestionEl) {
            this.slopeQuestionEl.textContent = '?';
        }
    }
    
    drawGraph() {
        if (!this.ctx || !this.canvas) return;
        
        const w = this.canvas.width;
        const h = this.canvas.height;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, w, h);
        
        // Draw grid (light gray)
        this.ctx.strokeStyle = '#ddd';
        this.ctx.lineWidth = 0.5;
        
        // Calculate grid spacing based on canvas size
        const gridSpacing = w / 8;
        
        // Vertical grid lines
        for (let x = gridSpacing; x < w; x += gridSpacing) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, h);
            this.ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let y = gridSpacing; y < h; y += gridSpacing) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(w, y);
            this.ctx.stroke();
        }
        
        // Draw axes (dark gray)
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        
        // X-axis
        this.ctx.beginPath();
        this.ctx.moveTo(0, h/2);
        this.ctx.lineTo(w, h/2);
        this.ctx.stroke();
        
        // Y-axis
        this.ctx.beginPath();
        this.ctx.moveTo(w/2, 0);
        this.ctx.lineTo(w/2, h);
        this.ctx.stroke();
        
        // Draw the line
        this.ctx.strokeStyle = '#4CAF50';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        // Calculate line points
        const centerX = w/2;
        const centerY = h/2;
        const scale = w / 10; // Scale factor for coordinates
        
        // Handle undefined slope (vertical line)
        if (this.currentSlope === 'undefined') {
            const x = centerX + (this.currentIntercept * scale);
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, h);
            this.ctx.stroke();
        } else {
            // Draw line across the canvas
            let first = true;
            for (let screenX = 0; screenX <= w; screenX += 5) {
                const x = (screenX - centerX) / scale;
                const y = this.currentSlope * x + this.currentIntercept;
                const screenY = centerY - (y * scale);
                
                if (screenY >= 0 && screenY <= h) {
                    if (first) {
                        this.ctx.moveTo(screenX, screenY);
                        first = false;
                    } else {
                        this.ctx.lineTo(screenX, screenY);
                    }
                } else {
                    first = true;
                }
            }
            this.ctx.stroke();
        }
        
        // Add axis labels
        this.ctx.fillStyle = '#666';
        this.ctx.font = '12px Arial';
        this.ctx.fillText('x', w-20, h/2-10);
        this.ctx.fillText('y', w/2+10, 20);
    }
    
    checkAnswer(event) {
        if (this.answerSelected) return;
        
        const selectedBtn = event.currentTarget;
        const selectedSlope = selectedBtn.dataset.slope;
        
        // Handle "undefined" as string
        const isCorrect = (this.currentSlope === 'undefined' && selectedSlope === 'undefined') ||
                         (parseFloat(selectedSlope) === this.currentSlope);
        
        this.answerSelected = true;
        if (this.nextBtn) this.nextBtn.disabled = false;
        
        // Disable all buttons
        this.answerBtns.forEach(btn => btn.disabled = true);
        
        // Track analytics
        this.totalAnswers++;
        
        if (isCorrect) {
            // Correct answer
            selectedBtn.classList.add('correct');
            if (this.feedbackEl) {
                this.feedbackEl.textContent = ' Correct! Great job!';
                this.feedbackEl.className = 'feedback correct';
            }
            
            this.correctAnswers++;
            
            // Update score based on level
            const pointsEarned = this.level * 10;
            this.score += pointsEarned;
            
            // Show slope in question area
            if (this.slopeQuestionEl) {
                this.slopeQuestionEl.textContent = this.formatSlope(this.currentSlope);
            }
            
            // Level up every 3 correct answers
            this.questionCount++;
            if (this.questionCount % 3 === 0) {
                this.level = Math.min(this.level + 1, 3);
            }
            
            // Track correct answer in analytics
            if (typeof analytics !== 'undefined') {
                analytics.answer(true);
                analytics.gamePlayed(this.score);
            }
        } else {
            // Wrong answer
            selectedBtn.classList.add('incorrect');
            
            // Highlight correct answer
            this.answerBtns.forEach(btn => {
                if (btn.dataset.slope == this.currentSlope) {
                    btn.classList.add('correct');
                }
            });
            
            if (this.feedbackEl) {
                this.feedbackEl.textContent = ' Try again! The correct answer is highlighted.';
                this.feedbackEl.className = 'feedback incorrect';
            }
            
            // Lose a life
            this.lives--;
            
            // Track wrong answer in analytics
            if (typeof analytics !== 'undefined') {
                analytics.answer(false);
            }
            
            if (this.lives === 0) {
                this.gameOver();
            }
        }
        
        // Update displays
        this.updateStats();
        this.updateDescription();
    }
    
    formatSlope(slope) {
        if (slope === 'undefined') return 'undefined';
        if (slope === 0.5) return '½';
        if (slope === -0.5) return '-½';
        if (slope === 1) return '1';
        if (slope === -1) return '-1';
        return slope.toString();
    }
    
    nextQuestion() {
        if (this.lives > 0) {
            this.generateNewLine();
            this.drawGraph();
            this.updateDescription();
        }
    }
    
    resetGame() {
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.questionCount = 0;
        this.correctAnswers = 0;
        this.totalAnswers = 0;
        this.generateNewLine();
        this.drawGraph();
        this.updateStats();
        this.updateDescription();
        if (this.nextBtn) this.nextBtn.disabled = true;
        
        console.log(' Game reset');
    }
    
    gameOver() {
        if (this.feedbackEl) {
            this.feedbackEl.textContent = ` Game Over! Final score: ${this.score}`;
            this.feedbackEl.className = 'feedback incorrect';
        }
        this.answerBtns.forEach(btn => btn.disabled = true);
        if (this.nextBtn) this.nextBtn.disabled = true;
        
        // Screen reader announcement
        const announcement = `Game over. You scored ${this.score} points. Press New Game to play again.`;
        if (this.descriptionEl) {
            this.descriptionEl.textContent = announcement;
        }
        
        // Track final score in analytics
        if (typeof analytics !== 'undefined') {
            analytics.gamePlayed(this.score);
        }
    }
    
    showHint() {
        const hint = `The line goes ${this.getDirectionHint()} and rises ${Math.abs(this.currentSlope)} units for each 1 unit across.`;
        
        // Create temporary hint element
        const hintEl = document.createElement('div');
        hintEl.textContent = hint;
        hintEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-tertiary, #333);
            color: var(--text-primary, white);
            padding: 20px;
            border-radius: 8px;
            z-index: 10000;
            max-width: 300px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(hintEl);
        
        // Remove after 3 seconds
        setTimeout(() => hintEl.remove(), 3000);
        
        // Also provide for screen readers
        if (this.descriptionEl) {
            this.descriptionEl.textContent = hint;
        }
    }
    
    getDirectionHint() {
        if (this.currentSlope === 'undefined') return 'straight up and down (vertical)';
        if (this.currentSlope === 0) return 'flat (horizontal)';
        if (this.currentSlope > 0) return 'uphill (increasing)';
        return 'downhill (decreasing)';
    }
    
    updateStats() {
        if (this.scoreEl) this.scoreEl.textContent = this.score;
        if (this.levelEl) this.levelEl.textContent = this.level;
        
        // Update lives display with hearts
        if (this.livesEl) {
            let livesDisplay = '';
            for (let i = 0; i < this.lives; i++) {
                livesDisplay += '❤️';
            }
            for (let i = this.lives; i < 3; i++) {
                livesDisplay += '🖤';
            }
            this.livesEl.textContent = livesDisplay;
        }
    }
    
    updateDescription() {
        if (!this.descriptionEl) return;
        
        let desc = `Current line has slope ${this.formatSlope(this.currentSlope)}. `;
        desc += `It ${this.getDirectionHint()}. `;
        desc += `Score: ${this.score}, Level: ${this.level}, Lives: ${this.lives}. `;
        
        if (!this.answerSelected) {
            desc += 'Choose a slope from the buttons below.';
        }
        
        this.descriptionEl.textContent = desc;
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if game canvas exists before initializing
    if (document.getElementById('game-graph')) {
        new SlopeGame();
        console.log(' Slope Game initialized');
    } else {
        console.log(' Game page not detected');
    }
});

// Helper function to check analytics availability
window.checkAnalytics = function() {
    if (typeof analytics !== 'undefined') {
        console.log(' Analytics available');
        return true;
    }
    console.warn(' Analytics not available');
    return false;
};