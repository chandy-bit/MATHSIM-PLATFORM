
let leaderboardData = [];

function loadLeaderboard(timeframe = 'all-time') {
    // Load from localStorage
    const saved = localStorage.getItem('mathsim-leaderboard');
    if (saved) {
        leaderboardData = JSON.parse(saved);
    } else {
        leaderboardData = getMockData();
    }
    
    // Sort by score
    leaderboardData.sort((a, b) => b.score - a.score);
    
    // Filter by timeframe
    let filtered = leaderboardData;
    if (timeframe === 'weekly') {
        filtered = leaderboardData.filter(d => d.lastPlayed > Date.now() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeframe === 'monthly') {
        filtered = leaderboardData.filter(d => d.lastPlayed > Date.now() - 30 * 24 * 60 * 60 * 1000);
    }
    
    renderLeaderboard(filtered);
}

function renderLeaderboard(data) {
    const container = document.getElementById('leaderboardBody');
    if (!container) return;
    
    container.innerHTML = data.slice(0, 50).map((user, index) => `
        <div class="leaderboard-row ${index < 3 ? 'top-rank' : ''}">
            <div class="rank">${index + 1} ${index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}</div>
            <div class="name">${user.name}</div>
            <div class="score">${user.score}</div>
            <div class="games">${user.gamesPlayed}</div>
            <div class="accuracy">${user.accuracy}%</div>
        </div>
    `).join('');
}

function updateLeaderboard(score, name) {
    const userName = name || localStorage.getItem('mathsim-user') || 'Math Learner';
    
    let userData = leaderboardData.find(u => u.name === userName);
    
    if (userData) {
        userData.score += score;
        userData.gamesPlayed++;
        userData.accuracy = ((userData.correctAnswers / userData.totalAnswers) * 100).toFixed(1);
        userData.lastPlayed = Date.now();
    } else {
        leaderboardData.push({
            name: userName,
            score: score,
            gamesPlayed: 1,
            accuracy: 100,
            lastPlayed: Date.now(),
            correctAnswers: 1,
            totalAnswers: 1
        });
    }
    
    localStorage.setItem('mathsim-leaderboard', JSON.stringify(leaderboardData));
}

function getMockData() {
    return [
        { name: 'Math Master', score: 2450, gamesPlayed: 45, accuracy: 92, lastPlayed: Date.now() },
        { name: 'Algebra Ace', score: 1980, gamesPlayed: 38, accuracy: 88, lastPlayed: Date.now() - 2 * 24 * 60 * 60 * 1000 },
        { name: 'Calculus Pro', score: 1750, gamesPlayed: 32, accuracy: 85, lastPlayed: Date.now() - 5 * 24 * 60 * 60 * 1000 },
        { name: 'Geometry Genius', score: 1520, gamesPlayed: 28, accuracy: 82, lastPlayed: Date.now() - 10 * 24 * 60 * 60 * 1000 },
        { name: 'Slope Star', score: 1340, gamesPlayed: 25, accuracy: 79, lastPlayed: Date.now() - 15 * 24 * 60 * 60 * 1000 }
    ];
}

document.addEventListener('DOMContentLoaded', () => {
    loadLeaderboard('all-time');
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            loadLeaderboard(e.target.textContent.toLowerCase().replace(' ', '-'));
        });
    });
});