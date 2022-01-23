
//Define a quiz array to contain question objects.


var quizObject = [
    //Q1
    {
        question: 'What DOM traversal method moves laterally to the next child node?',
        responses: ["previousSibling", "nextSibling", "parentNode", "children"]
    },
    //Q2
    {
        question: 'Placing an event listener on a parent node to minimize the active listeners is called ___.',
        responses: ["Entrapment", "Capturing", "Delegation", "Forking"]
    },
    //Q3
    {
        question: 'Change, input, and focus event listeners should be preferred over click listeners to enhance ___.',
        responses: ["Combatability", "Reasonableness", "Functionalness", "Assessibilty"]
    },
    //Q4
    {
        question: 'JavaScript will execute a function if it reads ____.',
        responses: ["~", "()", "{", "function"]
    },
    //Q5
    {
        question: 'API is an acronymn that stands for ______.',
        responses: ["Anonymous Pillage Instrument", "Accelerated Phallic Interlude",
            "Application Programmer Interface", "Ape Pincer Integument"]
    }

]

//Capture DOM elements in variable references (UI)

var startButton = document.querySelector('#start-button');
var gameRules = document.querySelector('p#rules');
var mainWindow = document.querySelector('main');
var timerDisplay = document.querySelector('h2#timer');
var highScoresLink = document.querySelector('a');

var quizFinishedHeadline = document.createElement('h2');            //Headline for the quiz ending
quizFinishedHeadline.setAttribute('class', '.question-header');
quizFinishedHeadline.textContent = 'Quiz Finished!';

var quizScoreDisplay = document.createElement('p');

var quizIntitialsInputLabel = document.createElement('label');
quizIntitialsInputLabel.innerText = 'Enter intitials below:'
var quizIntitialsInput = document.createElement('input');  //Input bar for quiz-taker's initials
quizIntitialsInput.maxLength = 3;

var quizHighscoreSubmission = document.createElement('button');  //Button to submit initials and score
quizHighscoreSubmission.setAttribute('type', 'submit');
quizHighscoreSubmission.innerText = 'Submit';

var highScoreHeadline = document.createElement('h2');         //Headline for high scores
highScoreHeadline.setAttribute('class', '.question-header');
highScoreHeadline.textContent = 'High Scores:';

var highScoreList = document.createElement('ol');           //list to hold high score items

var goBackButton = document.createElement('button');  //button to return to quiz rules
goBackButton.innerText = "Go Back";

var clearScoresButton = document.createElement('button'); //button to clear the high scores
clearScoresButton.innerText = 'Clear Scores';

var responseFeedbackNode = document.createElement('p');
responseFeedbackNode.setAttribute('id', '#feedbackNode');

//Globla variables (UI)

var questionNode = []; // An array to hold question variables
var responseList = []; // An array to hold response list variables
var responseItemNode = []; //An array to hold response item variables

//Global variables  (Business End)
var numQuestions = 5;
var numReponses = 4;
var correctReponses;
var currentQuestion;
var timeLeft;
var timeout = null;

var userScores = [];   //Must be initialized from localStorage whenever processed

//Assign the quiz elements to DOM nodes (UI)
function generateQuizUIElements() {

    for (let i = 0; i < quizObject.length; i++) {
        questionNode[i] = document.createElement('h2');            //Question Nodes 0 ... i
        questionNode[i].setAttribute('class', '.question-header');
        questionNode[i].textContent = `${quizObject[i].question}`

        responseList[i] = document.createElement('ol');            //Response List Nodes 0 ... i
        responseList[i].setAttribute('class', '.question-list');

        responseItemNode[i] = [];
        for (let j = 0; j < quizObject[i].responses.length; j++) {
            responseItemNode[i][j] = document.createElement('li');           //Response list items
            responseItemNode[i][j].setAttribute('class', '.question-item');
            responseItemNode[i][j].setAttribute('data-true', 'false');

            responseItemNode[i][j].textContent = quizObject[i].responses[j];
            responseList[i].appendChild(responseItemNode[i][j]);
        }

    }



}


//Mark correct answers  (Business End)
function markCorrectAnswers() {
    responseItemNode[0][1].dataset.true = 'true';
    responseItemNode[1][2].dataset.true = 'true';
    responseItemNode[2][3].dataset.true = 'true';
    responseItemNode[3][1].dataset.true = 'true';
    responseItemNode[4][2].dataset.true = 'true';
}




//Displays feedback for 1.5 seconds on the next rendered page

function giveFeedback(feedback) {


    if (feedback === 'correct') {   // Write the correct feedback
        responseFeedbackNode.innerText = "Correct!";
    } else {
        responseFeedbackNode.innerText = "Incorrect!";
    }

    mainWindow.appendChild(responseFeedbackNode);  // Append the feedback node to the new question.


    var timeout = setTimeout(() => {  // Delcare a new timer to control feedback removal
        if (mainWindow.querySelector('#feedbackNode') !== 'null') {
            mainWindow.removeChild(responseFeedbackNode);
        }
    }, 1500);


    return timeout;

}

//Clears the main window
function clearMainWindow() {
    var numMainWindowElements = mainWindow.childElementCount;
    for (let i = 0; i < numMainWindowElements; i++) {
        mainWindow.removeChild(mainWindow.children[0]);
    }
}

//Loads highscores
function renderHighScores() {

    clearMainWindow();

    var numScores = highScoreList.childElementCount;  // Clear the high score list
    if (numScores !== 0) {
        for (let i = 0; i < numScores; i++) {
            highScoreList.removeChild(highScoreList.children[0]);
        }
    }

    if (localStorage.getItem('highScores') != 'null') {
        userScores = JSON.parse(localStorage.getItem('highScores'));  //Get the scores from local storage
    }

    for (let i = 0; i < userScores.length; i++) {          //Write the scores into list items
        var scoreRecordListItem = document.createElement('li');
        scoreRecordListItem.innerText = `${userScores[i].userInitials} : ${userScores[i].quizScore}`;
        highScoreList.appendChild(scoreRecordListItem);  // , and append them to the high score list
    }


    function renderHighScorePageElements() {
        mainWindow.appendChild(highScoreHeadline);
        mainWindow.appendChild(highScoreList);
        mainWindow.appendChild(goBackButton);
        mainWindow.appendChild(clearScoresButton);
    };

    renderHighScorePageElements();   //Displays the highscores

    function clearScores(e) {     //Clears the scores in local storage and in memory
        e.preventDefault();
        userScores = [];
        localStorage.setItem('highScores', null);
        renderHighScores();
    }

    function goBack(e) {      //Returns to the rules
        e.preventDefault();

        clearMainWindow();

        mainWindow.appendChild(gameRules);
        mainWindow.appendChild(startButton);

        goBackButton.removeEventListener('click', goBack, false);
        clearScoresButton.removeEventListener('click', clearScores, false);
    }

    clearScoresButton.addEventListener('click', clearScores, false);
    goBackButton.addEventListener('click', goBack, false);



}

//Records the score in localstorage
function recordScore(e) {
    //Mem. If there's time, pass the score variable from the score entry function

    e.preventDefault();
    if (localStorage.getItem('highScores') != 'null') {
        userScores = JSON.parse(localStorage.getItem('highScores'));
    }


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
        timeLeft = 0;
        timerDisplay.innerText = "Time Left: 0";
        quizScoreEntry();
    }

    else {
        mainWindow.appendChild(questionNode[currentQuestion]);
        mainWindow.appendChild(responseList[currentQuestion]);
        mainWindow.firstElementChild.nextElementSibling.addEventListener('click', evaluateResponse, false);
    }
}

/* 
//Removes the current question
function removeQuestion() {
 
    var questionHeader = mainWindow.firstElementChild;
    var questionList = mainWindow.lastElementChild;
 
    if (currentQuestion !== numQuestions) {
        questionList.removeEventListener('click', evaluateResponse);
    }
    mainWindow.removeChild(questionHeader);
    mainWindow.removeChild(questionList);
} */

//Processes response selection
function evaluateResponse(e) {
    var target
    target = e.target;
    console.log(target);

    if (target.getAttribute('class') == '.question-list') {
        return '';
    }

    if (target.dataset.true === 'true') {
        correctReponses++;
        clearMainWindow();
        currentQuestion++;
        renderQuestion(currentQuestion);
        console.log(timeout);
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = giveFeedback('correct');
    }
    else {
        clearMainWindow();
        timeLeft--;
        currentQuestion++;
        renderQuestion(currentQuestion);
        console.log(timeout);
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = giveFeedback();
    }
}


//Loads the quiz into the main window
function startQuiz(e) {

    e.preventDefault();
    generateQuizUIElements();
    markCorrectAnswers();

    currentQuestion = 0;
    correctReponses = 0;
    timeLeft = 75;

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
            timerDisplay.innerText = "Time Left: 0";
            clearInterval(timerVariable);

            if (currentQuestion !== numQuestions) {
                quizScoreEntry();
            }
        }
    }, 1000);


}

//Add event listener to start button
startButton.addEventListener('click', startQuiz, false)
highScoresLink.addEventListener('click', renderHighScores, false);
