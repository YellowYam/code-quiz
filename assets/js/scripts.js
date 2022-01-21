//Questions and question responses (hand-written)

//Q1
var question1 = 'What DOM traversal method moves laterally to the next child node?'
var responseQ1R1 = "";
var responseQ1R2 = "";
var responseQ1R3 = "";
var responseQ1R4 = "";

//Q2
var question2 = 'Placing an event listener on a parent node to minimize the active listeners is called ___.'
var responseQ2R1 = "";
var responseQ2R2 = "";
var responseQ2R3 = "";
var responseQ2R4 = "";

//Q3
var question3 = 'Change, input, and focus event listeners should be preferred over click listeners to enhance ___.'
var responseQ3R1 = "";
var responseQ3R2 = "";
var responseQ3R3 = "";
var responseQ3R4 = "";

//Q4
var question4  = 'JavaScript will execute a function if it reads ____.'
var responseQ4R1 = "";
var responseQ4R2 = "";
var responseQ4R3 = "";
var responseQ4R4 = "";

//Q5
var question5 = 'API is an acronymn that stands for ______.'
var responseQ5R1 = "";
var responseQ5R2 = "";
var responseQ5R3 = "";
var responseQ5R4 = "";


//Capture DOM elements in variable references

var startButton = document.querySelector('#start-button');
var gameRules = document.querySelector('p#rules');
var mainWindow = document.querySelector('main');

//Global variables

var questionNode = []; // An array to hold question variables
var responseList = []; // An array to hold response list variables
var responseItemNode = []; //An array to hold response item variables
var responseFeedbackNode = []; //An array to hold response feedback

var numQuestions = 5;
var numReponses = 4;
var correctReponses;
var currentQuestion;

//Assign the quiz elements to DOM nodes

for(let i = 0; i < numQuestions; i++){
    questionNode[i] = document.createElement('h2');            //Question Nodes 0 ... i
    questionNode[i].setAttribute('class', '.question-header');
    questionNode[i].textContent = eval(`question${i + 1}`);

    responseList[i] = document.createElement('ol');            //Response List Nodes 0 ... i
    responseList[i].setAttribute('class', '.question-list');

    responseItemNode[i] = [];
    for(let j = 0; j < numReponses; j++){                            
        responseItemNode[i][j] = document.createElement('li');           //Response list items
        responseItemNode[i][j].setAttribute('class', '.question-item');
        responseItemNode[i][j].textContent = eval(`responseQ${i + 1}R${j + 1}`);  
        responseList[i].appendChild(responseItemNode[i][j]); 
    }

    responseFeedbackNode[i] = document.createElement('p');      //Feedback Nodes 0 ... i
    responseFeedbackNode[i].innerText = '<hr>';
}

//Loads the next question
function renderQuestion(currentQuestion){

    if(!currentQuestion){
        currentQuestion = 1;
    }
    
    
}


//Loads the quiz into the main window
function startQuiz(e) {

    e.preventDefault();

    var timeLeft = 300;

    //Clear the quiz cover
    mainWindow.removeChild(gameRules);
    mainWindow.removeChild(startButton);

    //Start the quiz timer
    setInterval(() => {
        timeLeft--;
    }, 1000);

}

//Add event listener to start button
startButton.addEventListener('click', startQuiz, false)

