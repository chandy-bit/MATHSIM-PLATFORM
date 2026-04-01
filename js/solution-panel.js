
class SolutionPanel {
    constructor() {
        this.container = document.getElementById('solutionPanel');
        this.currentEquation = '';
    }
    
    showSolution(equation, type) {
        const steps = this.generateSteps(equation, type);
        this.container.innerHTML = `
            <h3> Step-by-Step Solution</h3>
            <div class="solution-steps">
                ${steps.map((step, i) => `<div class="step">${i + 1}. ${step}</div>`).join('')}
            </div>
            <div class="final-answer">Answer: ${this.getAnswer(equation)}</div>
        `;
        this.container.style.display = 'block';
    }
    
    generateSteps(equation, type) {
        if (type === 'quadratic') {
            return [
                `Identify coefficients: a = ${equation.a}, b = ${equation.b}, c = ${equation.c}`,
                `Calculate discriminant: Δ = b² - 4ac = ${equation.b}² - 4(${equation.a})(${equation.c}) = ${equation.discriminant}`,
                `Apply quadratic formula: x = [-b ± √Δ] / (2a)`,
                `x = [${-equation.b} ± √${equation.discriminant}] / (${2 * equation.a})`,
                `x = ${this.formatRoots(equation)}`
            ];
        }
        return ['Solution steps will appear here'];
    }
    
    formatRoots(equation) {
        if (equation.discriminant < 0) return 'No real roots';
        const root1 = (-equation.b + Math.sqrt(equation.discriminant)) / (2 * equation.a);
        const root2 = (-equation.b - Math.sqrt(equation.discriminant)) / (2 * equation.a);
        return root1 === root2 ? `x = ${root1.toFixed(2)}` : `x = ${root1.toFixed(2)}, ${root2.toFixed(2)}`;
    }
    
    getAnswer(equation) {
        if (equation.discriminant < 0) return 'No real solution';
        const root1 = (-equation.b + Math.sqrt(equation.discriminant)) / (2 * equation.a);
        return root1.toFixed(2);
    }
}

const solutionPanel = new SolutionPanel();
window.solutionPanel = solutionPanel;