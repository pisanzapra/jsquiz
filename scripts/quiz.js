"use strict";

//creating the object type: Task   
function Task(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}

var questionWrapper = document.getElementById("question-wrapper");
var feedback = document.getElementById("feedback");

//setting the starting task number and score to 0
var currentTask = 0;
var score = 0;

// store user answers in an array
var userAnswers = new Array();

// creating an Array of tasks
var allTheTasks = new Array();
allTheTasks.push(new Task("In which year did Queen Victoria die?", ["1911", "1901"], 2));
allTheTasks.push(new Task("Of which country is Canberra the capital?", ["South Africa", "Australia"], 2));
allTheTasks.push(new Task("In which year did Britney Spears shave her head?", ["2007", "2010"], 1));
allTheTasks.push(new Task("What is the meaning of life?", ["Apples", "42"], 2));

// making the current task appear on the page, ensuring neither box is pre-selected
function setTask(taskNumber) {
    var questionDiv = document.getElementById("question");
    questionDiv.innerHTML = allTheTasks[taskNumber].question;
    var answer1 = document.getElementById("answer1label");
    answer1.innerHTML = allTheTasks[taskNumber].answers[0];
    var answer2 = document.getElementById("answer2label");
    answer2.innerHTML = allTheTasks[taskNumber].answers[1];
    document.getElementById('answer1').checked = false;
    document.getElementById('answer2').checked = false;

    // if we're on the last question, change the next button text
    if (currentTask === allTheTasks.length - 1) {
        document.getElementById("next-button").value = "Show me my score!";
    }
}

// change task function 
function changeTask(taskNumber) {
    // look at again when more alert
    $("#question-wrapper").fadeOut("slow", function() {
        setTask(taskNumber);
        $("#question-wrapper").fadeIn("slow");
    });
}

// setting up the check answers function, which is triggered every time the user clicks the Next Question button
function checkAnswers() {
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
    feedback.innerHTML = "All done. You scored " + ((score / allTheTasks.length) * 100) + "%";

    for (var i = 0; i < allTheTasks.length; i++) {

        var response = document.createElement('div');
        response.className = 'response';

        if (userAnswers[i]) {
            response.innerHTML = 'You answered question ' + (i + 1) + ' <span class="quiz-correct-answer">correctly</span>';
        }
        else {
            var correctAnswerValue = allTheTasks[i].correctAnswer - 1;
            var correctAnswerText = allTheTasks[i].answers[correctAnswerValue];
            response.innerHTML = 'You answered question ' + (i + 1) + ' <span class="quiz-incorrect-answer">incorrectly</span>. The correct answer is ' + correctAnswerText;
        }

        feedback.appendChild(response);
    }
}

function nextQuestion() {
    if (!document.getElementById('answer1').checked
        && !document.getElementById('answer2').checked)
        return;

    checkAnswers();

    // if there are any more questions to be shown to the user, set the next question, then exit
    if (currentTask < allTheTasks.length - 1) {
        currentTask++;
        changeTask(currentTask);
        return;
    }

    // if we're on the last question, show final score when they click the next button
    if (currentTask === allTheTasks.length - 1) {
        showFinalScore();
    }

}

changeTask(0);