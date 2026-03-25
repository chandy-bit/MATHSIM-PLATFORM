
function calculateDerivative() {
    const func = document.getElementById('functionInput').value;
    const result = document.getElementById('derivativeResult');
    
    if (!func) {
        result.textContent = 'Please enter a function';
        return;
    }
    
    // Simple derivative rules for common functions
    let derivative = '';
    
    if (func.includes('x^2')) {
        derivative = '2x';
    } else if (func.includes('x^3')) {
        derivative = '3x^2';
    } else if (func.includes('x')) {
        if (func.match(/(\d+)x/)) {
            const coef = func.match(/(\d+)x/)[1];
            derivative = coef;
        } else {
            derivative = '1';
        }
    } else if (func.includes('sin')) {
        derivative = 'cos(x)';
    } else if (func.includes('cos')) {
        derivative = '-sin(x)';
    } else if (func.includes('e^x')) {
        derivative = 'e^x';
    } else if (func.includes('ln')) {
        derivative = '1/x';
    } else {
        derivative = 'Could not compute (try x^2, x^3, sin(x), cos(x), e^x)';
    }
    
    result.innerHTML = `
        <strong>Function:</strong> ${func}<br>
        <strong>Derivative:</strong> ${derivative}
    `;
}

function calculateIntegral() {
    // Placeholder for integral calculation
    alert('Integral calculator coming soon!');
}

function showLimit() {
    alert('Limit visualization coming soon!');
}