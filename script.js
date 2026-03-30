let quizData = [];
let currentQuestionIndex = 0;
let score = 0;

async function loadQuizData() {
    try {
        const response = await fetch('questions.json');
        quizData = await response.json();
        loadQuestion();
    } catch (error) {
        document.getElementById('question').innerText = "Error, bitch!";
        console.error("Oh god, oh fugg")
    }
}

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        document.getElementById('quiz').innerHTML = `<h2>Quiz Complete, Walnut! I will make more questions soon</h2><p>You got ${score} out of ${quizData.length}</p>`;
        return;
    }

    const currentQ = quizData[currentQuestionIndex];
    document.getElementById('question').innerText = currentQ.question;

    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = "";

    currentQ.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerText = choice;
        btn.onclick = () => checkAnswer(choice, currentQ.correct);
        choicesDiv.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    const resultText = document.getElementById('result')

    if (selected === correct) {
        score++;
        resultText.innerText = "Correct!";
        resultText.style.color = "green";
    } else {
        resultText.innerText = `Oops! It was actually ${correct}`;
        resultText.style.color = "red";
    }

    currentQuestionIndex++;

    setTimeout(() => {
        resultText.innerText = "";
        loadQuestion();
    }, 1500);
}

loadQuizData();