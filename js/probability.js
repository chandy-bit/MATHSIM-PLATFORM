
let heads = 0;
let tails = 0;

function flipCoin() {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    alert(`Coin flip: ${result}!`);
    
    // Track for analytics if available
    if (typeof analytics !== 'undefined') {
        analytics.answer(true);
    }
}

function rollDice() {
    const result = Math.floor(Math.random() * 6) + 1;
    alert(` You rolled a ${result}!`);
    
    if (typeof analytics !== 'undefined') {
        analytics.answer(true);
    }
}

function runSimulation(trials) {
    heads = 0;
    tails = 0;
    
    for (let i = 0; i < trials; i++) {
        if (Math.random() < 0.5) {
            heads++;
        } else {
            tails++;
        }
    }
    
    const ratio = (heads / trials).toFixed(2);
    
    document.getElementById('simulationResults').innerHTML = `
        <div class="result-item">Heads: ${heads}</div>
        <div class="result-item">Tails: ${tails}</div>
        <div class="result-item">Ratio: ${ratio}</div>
        <div class="result-item">Expected: 0.50</div>
        <div class="result-item">Difference: ${Math.abs(0.5 - ratio).toFixed(2)}</div>
    `;
    
    if (typeof analytics !== 'undefined') {
        analytics.gamePlayed(trials, heads, trials);
    }
}

function calculateCombination(n, r) {
    if (r > n) return 0;
    
    function factorial(x) {
        if (x <= 1) return 1;
        return x * factorial(x - 1);
    }
    
    return factorial(n) / (factorial(r) * factorial(n - r));
}

function showCombinations() {
    const n = parseInt(prompt('Enter n (total items):')) || 5;
    const r = parseInt(prompt('Enter r (items to choose):')) || 3;
    
    const nCr = calculateCombination(n, r);
    alert(`${n}C${r} = ${nCr} combinations`);
}