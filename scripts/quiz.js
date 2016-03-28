"use strict";

//creating the object type: Task   
function Task(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}

var questionWrapper = document.getElementById("question-wrapper");
var feedback = document.getElementById("feedback");
var answersWrapper = document.getElementById("answers-wrapper");

//setting the starting task number and score to 0
var currentTask = 0;
var score = 0;

// store user answers in an array
var userAnswers = new Array();

// creating an Array of tasks
var allTheTasks = new Array();
allTheTasks.push(new Task("In which year did Queen Victoria die?", ["1911", "1901", "1898", "1900"], 2));
allTheTasks.push(new Task("Of which country is Canberra the capital?", ["South Africa", "Australia", "Canada", "Venezuela"], 2));
allTheTasks.push(new Task("In which year did Britney Spears shave her head?", ["2010", "2009", "2008", "2007"], 4));
allTheTasks.push(new Task("How many kcals are in a Cadbury Creme Egg?", ["150", "200", "250", "40"], 1));
allTheTasks.push(new Task("True or false: A slug's blood is blue.", ["True", "False"], 2));

// making the current task appear on the page, ensuring neither box is pre-selected
function setTask(taskNumber) {

    while (answersWrapper.hasChildNodes()) {
        answersWrapper.removeChild(answersWrapper.lastChild);
    }

    var questionDiv = document.getElementById("question");
    questionDiv.innerHTML = allTheTasks[taskNumber].question;

    // ATTEMPT TO LOOP OVER EACH ANSWER WITHIN THE ANSWERS ARRAY AND DISPLAY AS MANY LABELS AND RADIO BUTTONS AS NECESSARY

    // Store all the answers associated with the current task as taskAllAnswers    
    var taskAllAnswers = allTheTasks[taskNumber].answers;

    // var taskAnswerValue = allTheTasks[i].answers[i] - 1;
    // var taskAnswerText = allTheTasks[i].answers[taskAnswerValue];

    //Loop through the answers one by one    
    for (var i = 1; i <= taskAllAnswers.length; i++) {

        var answerDiv = document.createElement('div');

        var quizRadio = document.createElement('input');
        quizRadio.type = 'radio';
        quizRadio.name = 'answer';
        quizRadio.className = 'quiz-radio';
        quizRadio.id = 'answer' + i;

        var quizRadioLabel = document.createElement('label');
        quizRadioLabel.className = 'quiz-label';
        quizRadioLabel.htmlFor = 'answer' + i;
        quizRadioLabel.id = 'answer' + i + 'label';
        quizRadioLabel.innerText = taskAllAnswers[i - 1];

        answerDiv.appendChild(quizRadio);
        answerDiv.appendChild(quizRadioLabel);
        answersWrapper.appendChild(answerDiv);

    }

    // if we're on the last question, change the next button text
    if (currentTask === allTheTasks.length - 1) {
        document.getElementById("next-button").value = "Show me my score!";
    }
}

// change task function 
function displayNewTask(taskNumber) {
    // look at again when more alert
    $("#question-wrapper").fadeOut("slow", function() {
        setTask(taskNumber);
        $("#question-wrapper").fadeIn("slow");
    });
}

// setting up the check answers function, which is triggered every time the user clicks the Next Question button
function checkAnswer() {
    // the first is a local variable, the second correctAnswer is a property on the Task object
    var correctAnswer = allTheTasks[currentTask].correctAnswer;

    var correctAnswerSelected = document.getElementById('answer' + correctAnswer).checked;

    userAnswers.push(correctAnswerSelected);

    if (correctAnswerSelected) {
        score++;

        // feedback.innerHTML = "You correctly selected answer. Your score is now " + score;

    }
}

// revealing the final score
function showFinalScore() {
    questionWrapper.innerHTML = " ";
    feedback.innerHTML = "You scored " + ((score / allTheTasks.length) * 100) + "%";

    for (var i = 0; i < allTheTasks.length; i++) {

        var response = document.createElement('div');
        response.className = 'response';
        response.innerText = 'You answered question ' + (i + 1) + ' ';

        var answer_span = document.createElement('span');

        if (userAnswers[i]) {
            answer_span.className = 'quiz-correct-answer';
            answer_span.innerText = 'correctly';
            response.appendChild(answer_span);
            response.appendChild(document.createTextNode('.'));
        }
        else {
            var correctAnswerValue = allTheTasks[i].correctAnswer - 1;
            var correctAnswerText = allTheTasks[i].answers[correctAnswerValue];
            answer_span.className = 'quiz-incorrect-answer';
            answer_span.innerText = 'incorrectly';
            response.appendChild(answer_span);
            response.appendChild(document.createTextNode('.'))
            var correctAnswerReveal = document.createTextNode(' The correct answer is ' + correctAnswerText);
            response.appendChild(correctAnswerReveal);
        }

        feedback.appendChild(response);
    }
}

function hasUserSelectedAnAnswer() {

    var numberofAnswers = allTheTasks[currentTask].answers.length;

    for (var i = 1; i <= numberofAnswers; i++) {
        if (document.getElementById('answer' + i).checked) {
            // if false, doesn't return ANYTHING. Moves on to next answer radio button
            // when the statement evaluates to true, evaluates hasUserSelectedAnAnswer as true in this instance and stops running the loop. Done!
            return true;
        }
    }
    // By this point, the loop has looked at every radio button and still not found one that has been checked. Therefore, the statement must be false.
    return false;
}

function nextQuestion() {

    if (!hasUserSelectedAnAnswer()) {
        return;
    }

    checkAnswer();

    // if there are any more questions to be shown to the user, set the next question, then exit
    if (currentTask < allTheTasks.length - 1) {
        currentTask++;
        displayNewTask(currentTask);
        return;
    }

    // if we're on the last question, show final score when they click the next button
    if (currentTask === allTheTasks.length - 1) {
        showFinalScore();
    }

}

displayNewTask(0);