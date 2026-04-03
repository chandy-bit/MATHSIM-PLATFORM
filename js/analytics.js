class MathSimAnalytics {
    constructor() {
        this.data = this.loadData();
        this.subjectData = this.loadSubjectData();
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

    loadSubjectData() {
        const saved = localStorage.getItem("mathsimSubjects");
        const defaultSubjectData = {
            algebra: { visits: 0, timeSpent: 0, gamesPlayed: 0, accuracy: [], lastVisit: null },
            geometry: { visits: 0, timeSpent: 0, gamesPlayed: 0, accuracy: [], lastVisit: null },
            precalculus: { visits: 0, timeSpent: 0, gamesPlayed: 0, accuracy: [], lastVisit: null },
            calculus: { visits: 0, timeSpent: 0, gamesPlayed: 0, accuracy: [], lastVisit: null },
            probability: { visits: 0, timeSpent: 0, gamesPlayed: 0, accuracy: [], lastVisit: null }
        };
        
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Merge with default to ensure all properties exist
                const merged = { ...defaultSubjectData };
                for (const subject in parsed) {
                    if (merged[subject]) {
                        merged[subject] = { ...merged[subject], ...parsed[subject] };
                    }
                }
                return merged;
            } catch (e) {
                console.error('Error loading subject data', e);
                return defaultSubjectData;
            }
        }
        return defaultSubjectData;
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
            } catch (e) {
                console.error('Error loading daily data', e);
            }
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

    saveSubjectData() {
        localStorage.setItem("mathsimSubjects", JSON.stringify(this.subjectData));
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

    // Subject tracking methods
    trackSubjectVisit(subject) {
        if (this.subjectData[subject]) {
            this.subjectData[subject].visits++;
            this.subjectData[subject].lastVisit = new Date().toISOString();
            this.saveSubjectData();
        } else {
            console.warn(`Unknown subject: ${subject}`);
        }
    }

    trackSubjectGame(subject, score, correct, total) {
        if (this.subjectData[subject]) {
            this.subjectData[subject].gamesPlayed++;
            const accuracy = correct / total;
            this.subjectData[subject].accuracy.push(accuracy);
            
            // Keep only last 50 accuracy records per subject
            if (this.subjectData[subject].accuracy.length > 50) {
                this.subjectData[subject].accuracy.shift();
            }
            
            this.saveSubjectData();
        } else {
            console.warn(`Unknown subject: ${subject}`);
        }
    }

    trackSubjectTime(subject, secondsSpent) {
        if (this.subjectData[subject]) {
            this.subjectData[subject].timeSpent += secondsSpent;
            this.saveSubjectData();
        } else {
            console.warn(`Unknown subject: ${subject}`);
        }
    }

    getSubjectAccuracy(subject) {
        if (!this.subjectData[subject] || this.subjectData[subject].accuracy.length === 0) {
            return 0;
        }
        const sum = this.subjectData[subject].accuracy.reduce((a, b) => a + b, 0);
        return Math.round((sum / this.subjectData[subject].accuracy.length) * 100);
    }

    getAllSubjectsStats() {
        const stats = {};
        for (const [subject, data] of Object.entries(this.subjectData)) {
            stats[subject] = {
                visits: data.visits,
                gamesPlayed: data.gamesPlayed,
                timeSpent: data.timeSpent,
                accuracy: this.getSubjectAccuracy(subject),
                lastVisit: data.lastVisit
            };
        }
        return stats;
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
        
        // Subject mastery achievements
        for (const [subject, data] of Object.entries(this.subjectData)) {
            const subjectAccuracy = this.getSubjectAccuracy(subject);
            if (data.gamesPlayed >= 10 && subjectAccuracy >= 85 && !this.hasAchievement(`${subject.charAt(0).toUpperCase() + subject.slice(1)} Master`)) {
                achievements.push(`${subject.charAt(0).toUpperCase() + subject.slice(1)} Master`);
            }
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
            sessions: this.data.sessions.slice(-7), // Last 7 sessions
            subjects: this.getAllSubjectsStats()
        };
    }

    resetAllData() {
        if (confirm('Are you sure you want to reset all analytics data? This cannot be undone.')) {
            localStorage.removeItem('mathsimAnalytics');
            localStorage.removeItem('mathsimSubjects');
            localStorage.removeItem('mathsimDaily');
            localStorage.removeItem('sessionId');
            
            // Reset all properties
            this.data = this.loadData();
            this.subjectData = this.loadSubjectData();
            this.dailyData = this.loadDailyData();
            this.startTime = Date.now();
            this.sessionStart = new Date();
            
            console.log('All analytics data has been reset');
            return true;
        }
        return false;
    }
}

// Enhanced Analytics for additional tracking
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
        console.log(` Event: ${category} - ${action}${label ? ' - ' + label : ''}`);
        // Send to your analytics service if needed
    }
    
    trackError(error, context) {
        console.error(` Error in ${context}:`, error);
        // Send to error tracking service if needed
    }
}

// Initialize analytics
const analytics = new MathSimAnalytics();
const enhancedAnalytics = new EnhancedAnalytics();

// Save time when user leaves
window.addEventListener("beforeunload", () => {
    analytics.endSession();
});

// Make available globally
window.analytics = analytics;
window.enhancedAnalytics = enhancedAnalytics;

// Example usage:
// Track a subject visit
// analytics.trackSubjectVisit('algebra');

// Track a subject game
// analytics.trackSubjectGame('calculus', 95, 19, 20);

// Track time spent on a subject
// analytics.trackSubjectTime('geometry', 120);

// Get subject-specific accuracy
// const algebraAccuracy = analytics.getSubjectAccuracy('algebra');

// Get all subjects stats
// const allStats = analytics.getAllSubjectsStats();