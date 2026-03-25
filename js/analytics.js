this.subjectData = this.loadSubjectData();

loadSubjectData() 
    const saved = localStorage.getItem("mathsimSubjects");
    return saved ? JSON.parse(saved) : {
        algebra: { visits: 0, timeSpent: 0, gamesPlayed: 0, accuracy: [] },
        geometry: { visits: 0, timeSpent: 0, gamesPlayed: 0, accuracy: [] },
        precalculus: { visits: 0, timeSpent: 0, gamesPlayed: 0, accuracy: [] },
        calculus: { visits: 0, timeSpent: 0, gamesPlayed: 0, accuracy: [] },
        probability: { visits: 0, timeSpent: 0, gamesPlayed: 0, accuracy: [] }
    };


// Track subject visit
function trackSubjectVisit(subject) {
    if (this.subjectData[subject]) {
        this.subjectData[subject].visits++;
        this.subjectData[subject].lastVisit = new Date().toISOString();
        localStorage.setItem("mathsimSubjects", JSON.stringify(this.subjectData));
    }
}

// Track subject game
function trackSubjectGame(subject, score, correct, total) {
    if (this.subjectData[subject]) {
        this.subjectData[subject].gamesPlayed++;
        this.subjectData[subject].accuracy.push(correct / total);
        localStorage.setItem("mathsimSubjects", JSON.stringify(this.subjectData));
    }
}

class MathSimAnalytics {
    constructor() {
        this.data = this.loadData();
        this.startTime = Date.now();
        this.sessionStart = new Date();
        this.dailyData = this.loadDailyData();
    }

    loadData() {
        const saved = localStorage.getItem("mathsimAnalytics");
        const defaultData = {
            tutorialsWatched: 0,
            tutorials: {},
            gamesPlayed: 0,
            correctAnswers: 0,
            totalAnswers: 0,
            bestScore: 0,
            totalTime: 0,
            sessions: [],
            lastPlayed: null,
            achievements: [],
            accuracyHistory: [],
            scoreHistory: []
        };
        
        if (saved) {
            try {
                return { ...defaultData, ...JSON.parse(saved) };
            } catch (e) {
                console.error('Error loading analytics', e);
                return defaultData;
            }
        }
        return defaultData;
    }

    loadDailyData() {
        const saved = localStorage.getItem("mathsimDaily");
        const today = new Date().toDateString();
        
        if (saved) {
            try {
                const daily = JSON.parse(saved);
                if (daily.date === today) {
                    return daily;
                }
            } catch (e) {}
        }
        
        return {
            date: today,
            tutorialsWatched: 0,
            gamesPlayed: 0,
            correctAnswers: 0,
            totalAnswers: 0,
            timeSpent: 0
        };
    }

    saveData() {
        localStorage.setItem("mathsimAnalytics", JSON.stringify(this.data));
        localStorage.setItem("mathsimDaily", JSON.stringify(this.dailyData));
    }

    tutorialWatched(tutorialId, tutorialTitle) {
        this.data.tutorialsWatched++;
        this.dailyData.tutorialsWatched++;
        
        // Track specific tutorials
        if (!this.data.tutorials[tutorialId]) {
            this.data.tutorials[tutorialId] = {
                title: tutorialTitle,
                count: 0,
                lastWatched: null
            };
        }
        this.data.tutorials[tutorialId].count++;
        this.data.tutorials[tutorialId].lastWatched = new Date().toISOString();
        
        this.saveData();
        
        // Check for achievement
        this.checkAchievements();
    }

    gamePlayed(score, correct, total) {
        this.data.gamesPlayed++;
        this.dailyData.gamesPlayed++;
        
        if (score > this.data.bestScore) {
            this.data.bestScore = score;
        }
        
        // Track score history
        this.data.scoreHistory.push({
            date: new Date().toISOString(),
            score: score
        });
        
        // Keep last 20 scores
        if (this.data.scoreHistory.length > 20) {
            this.data.scoreHistory.shift();
        }
        
        this.saveData();
        this.checkAchievements();
    }

    answer(correct) {
        this.data.totalAnswers++;
        this.dailyData.totalAnswers++;
        
        if (correct) {
            this.data.correctAnswers++;
            this.dailyData.correctAnswers++;
        }
        
        // Track accuracy history (every 10 answers)
        if (this.data.totalAnswers % 10 === 0) {
            this.data.accuracyHistory.push({
                date: new Date().toISOString(),
                accuracy: this.getAccuracy()
            });
            
            // Keep last 20 accuracy points
            if (this.data.accuracyHistory.length > 20) {
                this.data.accuracyHistory.shift();
            }
        }
        
        this.saveData();
    }

    endSession() {
        const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
        this.data.totalTime += timeSpent;
        this.dailyData.timeSpent += timeSpent;
        
        // Track session
        this.data.sessions.push({
            date: this.sessionStart.toISOString(),
            duration: timeSpent
        });
        
        // Keep last 50 sessions
        if (this.data.sessions.length > 50) {
            this.data.sessions.shift();
        }
        
        this.data.lastPlayed = new Date().toISOString();
        this.saveData();
    }

    getAccuracy() {
        if (this.data.totalAnswers === 0) return 0;
        return Math.round((this.data.correctAnswers / this.data.totalAnswers) * 100);
    }

    getDailyAccuracy() {
        if (this.dailyData.totalAnswers === 0) return 0;
        return Math.round((this.dailyData.correctAnswers / this.dailyData.totalAnswers) * 100);
    }

    getStreak() {
        // Calculate current streak based on daily activity
        if (!this.data.sessions.length) return 0;
        
        let streak = 1;
        const today = new Date().toDateString();
        const sessions = [...this.data.sessions].reverse();
        
        for (let i = 0; i < sessions.length - 1; i++) {
            const currentDate = new Date(sessions[i].date).toDateString();
            const nextDate = new Date(sessions[i + 1].date).toDateString();
            
            const current = new Date(currentDate);
            const next = new Date(nextDate);
            const diffDays = Math.floor((current - next) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    checkAchievements() {
        const achievements = [];
        
        // First tutorial watched
        if (this.data.tutorialsWatched >= 1 && !this.hasAchievement('First Steps')) {
            achievements.push('First Steps');
        }
        
        // 10 tutorials
        if (this.data.tutorialsWatched >= 10 && !this.hasAchievement('Scholar')) {
            achievements.push('Scholar');
        }
        
        // First game played
        if (this.data.gamesPlayed >= 1 && !this.hasAchievement('Player')) {
            achievements.push('Player');
        }
        
        // 100 correct answers
        if (this.data.correctAnswers >= 100 && !this.hasAchievement('Math Master')) {
            achievements.push('Math Master');
        }
        
        // 90% accuracy
        if (this.getAccuracy() >= 90 && !this.hasAchievement('Precision')) {
            achievements.push('Precision');
        }
        
        // Add new achievements
        achievements.forEach(ach => {
            if (!this.hasAchievement(ach)) {
                this.data.achievements.push({
                    name: ach,
                    date: new Date().toISOString()
                });
            }
        });
        
        if (achievements.length > 0) {
            this.saveData();
        }
    }

    hasAchievement(name) {
        return this.data.achievements.some(a => a.name === name);
    }

    getChartData() {
        return {
            accuracy: this.data.accuracyHistory,
            scores: this.data.scoreHistory,
            sessions: this.data.sessions.slice(-7) // Last 7 sessions
        };
    }
}

// Initialize analytics
const analytics = new MathSimAnalytics();

// Save time when user leaves
window.addEventListener("beforeunload", () => {
    analytics.endSession();
});

// Make available globally
window.analytics = analytics;

class EnhancedAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.trackPageView();
    }
    
    generateSessionId() {
        let id = localStorage.getItem('sessionId');
        if (!id) {
            id = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('sessionId', id);
        }
        return id;
    }
    
    trackPageView() {
        const page = window.location.pathname;
        console.log(` Page View: ${page}`);
        // Send to your analytics service if needed
    }
    
    trackEvent(category, action, label = null, value = null) {
        console.log(` Event: ${category} - ${action} - ${label}`);
        // Send to your analytics service if needed
    }
    
    trackError(error, context) {
        console.error(` Error in ${context}:`, error);
        // Send to error tracking service if needed
    }
}

const enhancedAnalytics = new EnhancedAnalytics();
window.enhancedAnalytics = enhancedAnalytics;