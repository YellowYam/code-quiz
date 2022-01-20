//Capture DOM elements in variable references
var startButton = document.querySelector('#start-button');
var gameRules = document.querySelector('p#rules');
var mainWindow = document.querySelector('main');

//Global variables



//Create elements to display when the user begins the quiz
var questionHeader = document.createElement('h2');
questionHeader.setAttribute('class', '.question-header');

var questionList = document.createElement('ol');
questionList.setAttribute('class', '.question-list');

var questionItem = document.createElement('li');
questionItem.setAttribute('class', '.question-item');

var questionFeedback = document.createElement('p');
questionFeedback.innerHTML = '<hr>';




//Loads the quiz into the main window
function startQuiz(e) {

    e.preventDefault();

    var timeLeft = 300;

    mainWindow.removeChild(gameRules);
    mainWindow.removeChild(startButton);

    //Start the quiz timer
    setInterval(() => {
        timeLeft--;
    }, 1000);

}

//Add event listener to start button
startButton.addEventListener('click', startQuiz, false)

