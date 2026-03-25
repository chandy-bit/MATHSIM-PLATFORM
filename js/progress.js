
let accuracyChart, scoresChart;

function updateProgress() {
    if (!analytics) return;
    
    // Basic stats
    document.getElementById("tutorialCount").textContent = analytics.data.tutorialsWatched;
    document.getElementById("gamesPlayed").textContent = analytics.data.gamesPlayed;
    document.getElementById("bestScore").textContent = analytics.data.bestScore;
    document.getElementById("correctAnswers").textContent = analytics.data.correctAnswers;
    
    // Accuracy
    const accuracy = analytics.getAccuracy();
    document.getElementById("accuracy").textContent = accuracy + "%";
    
    // Accuracy badge
    const badge = document.getElementById("accuracyBadge");
    if (accuracy >= 90) {
        badge.textContent = "Excellent";
        badge.className = "stat-badge excellent";
    } else if (accuracy >= 70) {
        badge.textContent = "Good";
        badge.className = "stat-badge good";
    } else if (accuracy >= 50) {
        badge.textContent = "Getting There";
        badge.className = "stat-badge average";
    } else {
        badge.textContent = "Keep Practicing";
        badge.className = "stat-badge needs-work";
    }
    
    // Score badge
    const scoreBadge = document.getElementById("scoreBadge");
    if (analytics.data.bestScore >= 100) {
        scoreBadge.textContent = "Champion";
        scoreBadge.className = "stat-badge excellent";
    } else if (analytics.data.bestScore >= 50) {
        scoreBadge.textContent = "Pro";
        scoreBadge.className = "stat-badge good";
    } else if (analytics.data.bestScore >= 20) {
        scoreBadge.textContent = "Rising";
        scoreBadge.className = "stat-badge average";
    } else {
        scoreBadge.textContent = "Beginner";
        scoreBadge.className = "stat-badge needs-work";
    }
    
    // Study time
    const totalMinutes = Math.floor(analytics.data.totalTime / 60);
    document.getElementById("studyTime").textContent = totalMinutes + " min";
    
    // Streak
    const streak = analytics.getStreak();
    document.getElementById("streakCount").textContent = streak + " day" + (streak !== 1 ? 's' : '');
    
    // Achievements count
    document.getElementById("achievementCount").textContent = analytics.data.achievements.length;
    
    // Last active
    if (analytics.data.lastPlayed) {
        const lastDate = new Date(analytics.data.lastPlayed);
        const today = new Date();
        const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            document.getElementById("lastActive").textContent = "Today";
        } else if (diffDays === 1) {
            document.getElementById("lastActive").textContent = "Yesterday";
        } else {
            document.getElementById("lastActive").textContent = lastDate.toLocaleDateString();
        }
    }
    
    // Daily stats
    document.getElementById("dailyTutorials").textContent = analytics.dailyData.tutorialsWatched;
    document.getElementById("dailyGames").textContent = analytics.dailyData.gamesPlayed;
    document.getElementById("dailyAccuracy").textContent = analytics.getDailyAccuracy() + "%";
    document.getElementById("dailyTime").textContent = Math.floor(analytics.dailyData.timeSpent / 60) + " min";
    
    // Update charts
    updateCharts();
    
    // Update achievements
    updateAchievements();
    
    // Update timeline
    updateTimeline();
}

function updateCharts() {
    const chartData = analytics.getChartData();
    
    // Accuracy Chart
    const accuracyCtx = document.getElementById('accuracyChart').getContext('2d');
    
    if (accuracyChart) {
        accuracyChart.destroy();
    }
    
    accuracyChart = new Chart(accuracyCtx, {
        type: 'line',
        data: {
            labels: chartData.accuracy.map((_, i) => i + 1),
            datasets: [{
                label: 'Accuracy %',
                data: chartData.accuracy.map(a => a.accuracy),
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
    
    // Scores Chart
    const scoresCtx = document.getElementById('scoresChart').getContext('2d');
    
    if (scoresChart) {
        scoresChart.destroy();
    }
    
    scoresChart = new Chart(scoresCtx, {
        type: 'bar',
        data: {
            labels: chartData.scores.map((_, i) => i + 1),
            datasets: [{
                label: 'Score',
                data: chartData.scores.map(s => s.score),
                backgroundColor: '#2196F3',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function updateAchievements() {
    const achievementsList = document.getElementById('achievementsList');
    
    const allAchievements = [
        { name: 'First Steps', desc: 'Watch your first tutorial', icon: '', condition: analytics.data.tutorialsWatched >= 1 },
        { name: 'Scholar', desc: 'Watch 10 tutorials', icon: '', condition: analytics.data.tutorialsWatched >= 10 },
        { name: 'Player', desc: 'Play your first game', icon: '', condition: analytics.data.gamesPlayed >= 1 },
        { name: 'Math Master', desc: 'Get 100 correct answers', icon: '', condition: analytics.data.correctAnswers >= 100 },
        { name: 'Precision', desc: 'Reach 90% accuracy', icon: '', condition: analytics.getAccuracy() >= 90 },
        { name: 'Champion', desc: 'Score 100 points', icon: '', condition: analytics.data.bestScore >= 100 },
        { name: 'Dedicated', desc: 'Study for 1 hour', icon: '', condition: analytics.data.totalTime >= 3600 },
        { name: 'Streak Master', desc: '7 day streak', icon: '', condition: analytics.getStreak() >= 7 }
    ];
    
    achievementsList.innerHTML = allAchievements.map(ach => `
        <div class="achievement-card ${ach.condition ? 'unlocked' : 'locked'}">
            <div class="achievement-icon">${ach.icon}</div>
            <div class="achievement-info">
                <h4>${ach.name}</h4>
                <p>${ach.desc}</p>
                ${ach.condition ? '<span class="achievement-date">Unlocked!</span>' : ''}
            </div>
        </div>
    `).join('');
}

function updateTimeline() {
    const timeline = document.getElementById('timeline');
    const sessions = analytics.data.sessions.slice(-5).reverse();
    
    if (sessions.length === 0) {
        timeline.innerHTML = '<p class="no-activity">No recent activity. Start learning!</p>';
        return;
    }
    
    timeline.innerHTML = sessions.map(session => {
        const date = new Date(session.date);
        const minutes = Math.floor(session.duration / 60);
        const seconds = session.duration % 60;
        
        return `
            <div class="timeline-item">
                <div class="timeline-date">${date.toLocaleDateString()}</div>
                <div class="timeline-content">
                    <span class="timeline-time">${date.toLocaleTimeString()}</span>
                    <span class="timeline-duration">Studied for ${minutes}m ${seconds}s</span>
                </div>
            </div>
        `;
    }).join('');
}

function resetProgress() {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
        localStorage.removeItem("mathsimAnalytics");
        localStorage.removeItem("mathsimDaily");
        location.reload();
    }
}

function exportProgress() {
    const data = {
        analytics: analytics.data,
        daily: analytics.dailyData,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mathsim-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', updateProgress);
setInterval(updateProgress, 1000); // Update every second for time tracking