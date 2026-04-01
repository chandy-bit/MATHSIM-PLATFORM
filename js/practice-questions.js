
const practiceQuestions = {
    quadratic: [
        { text: "Solve: x² + 5x + 6 = 0", answer: [-2, -3] },
        { text: "Find the vertex: y = x² - 4x + 3", answer: [2, -1] },
        { text: "What is the y-intercept? y = 2x² - 3x + 4", answer: 4 }
    ],
    linear: [
        { text: "Solve: 2x + 5 = 13", answer: 4 },
        { text: "Find slope: (2,3) and (5,9)", answer: 2 }
    ]
};

function getRandomQuestion(subject) {
    const questions = practiceQuestions[subject] || practiceQuestions.quadratic;
    return questions[Math.floor(Math.random() * questions.length)];
}

function checkPracticeAnswer(question, userAnswer) {
    const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(question.answer);
    if (isCorrect) {
        showNotification(' Correct! Great job!', 'success');
        if (typeof analytics !== 'undefined') {
            analytics.answer(true);
        }
    } else {
        showNotification(` Try again. Hint: ${question.hint || 'Review the concept'}`, 'error');
        if (typeof analytics !== 'undefined') {
            analytics.answer(false);
        }
    }
    return isCorrect;
}