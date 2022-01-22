//Questions and question responses (hand-written)
// Mark correct answers on line ... 

//Q1
var question1 = 'What DOM traversal method moves laterally to the next child node?'
var responseQ1R1 = "previousSibling";
var responseQ1R2 = "nextSibling";
var responseQ1R3 = "parentNode";
var responseQ1R4 = "children";

//Q2
var question2 = 'Placing an event listener on a parent node to minimize the active listeners is called ___.'
var responseQ2R1 = "Entrapment";
var responseQ2R2 = "Capturing";
var responseQ2R3 = "Delegation";
var responseQ2R4 = "Forking";

//Q3
var question3 = 'Change, input, and focus event listeners should be preferred over click listeners to enhance ___.'
var responseQ3R1 = "Combatability";
var responseQ3R2 = "Reasonableness";
var responseQ3R3 = "Functionalness";
var responseQ3R4 = "Assessibilty";

//Q4
var question4 = 'JavaScript will execute a function if it reads ____.'
var responseQ4R1 = "~";
var responseQ4R2 = "()";
var responseQ4R3 = "{";
var responseQ4R4 = "function";

//Q5
var question5 = 'API is an acronymn that stands for ______.'
var responseQ5R1 = "Anonymous Pillage Instrument";
var responseQ5R2 = "Accelerated Phallic Interlude";
var responseQ5R3 = "Application Programmer Interface";
var responseQ5R4 = "Ape Pincer Integument";


//Capture DOM elements in variable references

var startButton = document.querySelector('#start-button');
var gameRules = document.querySelector('p#rules');
var mainWindow = document.querySelector('main');
var timerDisplay = document.querySelector('h2#timer');

//Global variables

var questionNode = []; // An array to hold question variables
var responseList = []; // An array to hold response list variables
var responseItemNode = []; //An array to hold response item variables
var responseFeedbackNode = []; //An array to hold response feedback

var numQuestions = 5;
var numReponses = 4;
var correctReponses;
var currentQuestion;
var timeLeft;

var userScores = [];   //Must be initialized from localStorage whenever processed

//Assign the quiz elements to DOM nodes

for (let i = 0; i < numQuestions; i++) {
    questionNode[i] = document.createElement('h2');            //Question Nodes 0 ... i
    questionNode[i].setAttribute('class', '.question-header');
    questionNode[i].textContent = eval(`question${i + 1}`);

    responseList[i] = document.createElement('ol');            //Response List Nodes 0 ... i
    responseList[i].setAttribute('class', '.question-list');

    responseItemNode[i] = [];
    for (let j = 0; j < numReponses; j++) {
        responseItemNode[i][j] = document.createElement('li');           //Response list items
        responseItemNode[i][j].setAttribute('class', '.question-item');
        responseItemNode[i][j].setAttribute('data-true', 'false');
        responseItemNode[i][j].textContent = eval(`responseQ${i + 1}R${j + 1}`);
        responseList[i].appendChild(responseItemNode[i][j]);
    }

    responseFeedbackNode[i] = document.createElement('p');      //Feedback Nodes 0 ... i
    responseFeedbackNode[i].innerText = '<hr>';
}

var quizFinishedHeadline = document.createElement('h2');            //Headline for the quiz ending
quizFinishedHeadline.setAttribute('class', '.question-header');
quizFinishedHeadline.textContent = 'Quiz Finished!';

var quizScoreDisplay = document.createElement('p');    // Element to hold the quiz score

var quizIntitialsInputLabel = document.createElement('label');
quizIntitialsInputLabel.innerText = 'Enter intitials below:'
var quizIntitialsInput = document.createElement('input');  //Input bar for quiz-taker's initials


var quizHighscoreSubmission = document.createElement('button');  //Button to submit initials and score
quizHighscoreSubmission.setAttribute('type', 'submit');
quizHighscoreSubmission.innerText = 'Submit';

var highScoreHeadline = document.createElement('h2');
    highScoreHeadline.setAttribute('class', '.question-header');
    highScoreHeadline.textContent = 'High Scores:';

var highScoreList = document.createElement('ol');

//Mark correct answers
responseItemNode[0][1].dataset.true = 'true';
responseItemNode[1][2].dataset.true = 'true';
responseItemNode[2][3].dataset.true = 'true';
responseItemNode[3][1].dataset.true = 'true';
responseItemNode[4][2].dataset.true = 'true';

//Loads highscores
function renderHighScores() {

    if(localStorage.getItem('highScores') !== null){
        userScores = localStorage.getItem(JSON.parse('highScores'));
    }
    mainWindow.appendChild(highScoreHeadline);

}

//Records the score in localstorage
function recordScore(e) {
    //Mem. If there's time, pass the score variable from the score entry function
    e.preventDefault();

    var score = (correctReponses / numQuestions) * 100;
    var initials = quizIntitialsInput.value.trim();

    var userScore = {
        quizScore: score,
        userInitials: initials
    };

    userScores.push(userScore);

    localStorage.setItem('highScores', JSON.stringify(userScores));

    quizHighscoreSubmission.removeEventListener('click', recordScore, false);
    mainWindow.removeChild(quizFinishedHeadline);
    mainWindow.removeChild(quizScoreDisplay);
    mainWindow.removeChild(quizIntitialsInputLabel);
    mainWindow.removeChild(quizIntitialsInput);
    mainWindow.removeChild(quizHighscoreSubmission);

    renderHighScores();
}

//Loads the highscore entry form
function quizScoreEntry() {

    mainWindow.appendChild(quizFinishedHeadline);

    var score = (correctReponses / numQuestions) * 100;
    quizScoreDisplay.innerText = "Your score is: " + score + "%."
    quizScoreDisplay.setAttribute('class', '.question-header');

    mainWindow.appendChild(quizScoreDisplay);
    mainWindow.appendChild(quizIntitialsInputLabel);
    mainWindow.appendChild(quizIntitialsInput);
    mainWindow.appendChild(quizHighscoreSubmission);

    quizHighscoreSubmission.addEventListener('click', recordScore, false)
}


//Loads the current question
function renderQuestion(currentQuestion) {

    if (currentQuestion === numQuestions) {  
        console.log('quiz finished');
        quizScoreEntry();
    }

    else {
        mainWindow.appendChild(questionNode[currentQuestion]);
        mainWindow.appendChild(responseList[currentQuestion]);
        mainWindow.firstElementChild.nextElementSibling.addEventListener('click', evaluateResponse, false);
    }
}

//Removes the current question
function removeQuestion() {

    var questionHeader = mainWindow.firstElementChild;
    var questionList = mainWindow.lastElementChild;

    if (currentQuestion !== numQuestions) {
        questionList.removeEventListener('click', evaluateResponse);
    }
    mainWindow.removeChild(questionHeader);
    mainWindow.removeChild(questionList);
}

//Processes response selection
function evaluateResponse(e) {

    var target
    target = e.target;

    if (target.dataset.true === 'true') {
        correctReponses++;
        removeQuestion();
        currentQuestion++;
        renderQuestion(currentQuestion);
    }
    else {
        removeQuestion();
        timeLeft--;
        currentQuestion++;
        renderQuestion(currentQuestion);
    }
}


//Loads the quiz into the main window
function startQuiz(e) {

    e.preventDefault();

    currentQuestion = 0;
    correctReponses = 0;
    timeLeft = 1000;

    timerDisplay.innerText = "Time Left: " + timeLeft;

    //Clear the quiz cover
    mainWindow.removeChild(gameRules);
    mainWindow.removeChild(startButton);


    renderQuestion(currentQuestion);


    //Start the quiz timer
    var timerVariable = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = "Time Left: " + timeLeft;

        if (timeLeft < 1) {
            clearInterval(timerVariable);
            removeQuestion();
            quizScoreEntry();
        }
    }, 1000);


}

//Add event listener to start button
startButton.addEventListener('click', startQuiz, false)

