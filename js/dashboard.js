
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
    setupGreeting();
    loadActivityFeed();
    loadRecommendations();
});

function loadDashboardData() {
    if (typeof analytics === 'undefined') return;
    
    // Update daily progress
    const dailyPercent = Math.min(100, Math.floor((analytics.dailyData?.timeSpent || 0) / 30 * 100));
    document.getElementById('dailyPercent').textContent = dailyPercent + '%';
    
    // Update circular progress
    const circle = document.querySelector('.circular-progress');
    if (circle) {
        circle.style.background = `conic-gradient(#4CAF50 ${dailyPercent * 3.6}deg, #f0f0f0 0deg)`;
    }
    
    // Update last activity
    const sessions = analytics.data?.sessions || [];
    if (sessions.length > 0) {
        const lastSession = sessions[sessions.length - 1];
        const lastTopic = localStorage.getItem('lastTopic') || 'Algebra';
        document.getElementById('lastTopic').textContent = lastTopic;
        document.getElementById('resumeLink').href = lastTopic.toLowerCase() + '.html';
    }
}

function setupGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good evening';
    
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';
    
    const name = localStorage.getItem('userName') || 'Math Learner';
    document.getElementById('userName').textContent = name;
}

function loadActivityFeed() {
    const feed = document.getElementById('activityFeed');
    if (!feed) return;
    
    const activities = [
        { icon: '', text: 'Watched "Linear Equations" tutorial', time: '2 hours ago' },
        { icon: '', text: 'Completed Algebra Challenge', time: 'yesterday' },
        { icon: '', text: 'Reached 75% in Geometry', time: '2 days ago' },
        { icon: '', text: 'Earned "Math Master" achievement', time: '3 days ago' }
    ];
    
    feed.innerHTML = activities.map(act => `
        <div class="activity-item">
            <span class="activity-icon">${act.icon}</span>
            <div class="activity-details">
                <p class="activity-text">${act.text}</p>
                <span class="activity-time">${act.time}</span>
            </div>
        </div>
    `).join('');
}

function loadRecommendations() {
    const recs = document.getElementById('recommendations');
    if (!recs) return;
    
    const recommendations = [
        { title: 'Calculus: Derivatives', type: 'Tutorial', time: '10 min', icon: '∫' },
        { title: 'Geometry: Circles', type: 'Interactive', time: '15 min', icon: '⚪' },
        { title: 'Probability: Bayes Theorem', type: 'Game', time: '20 min', icon: '🎲' }
    ];
    
    recs.innerHTML = recommendations.map(rec => `
        <div class="rec-card">
            <span class="rec-icon">${rec.icon}</span>
            <h4>${rec.title}</h4>
            <p>${rec.type} • ${rec.time}</p>
            <button class="btn btn-small">Start</button>
        </div>
    `).join('');
}