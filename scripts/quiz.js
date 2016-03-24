"use strict";

var questionWrapper = document.getElementById("question-wrapper");
var feedback = document.getElementById("feedback");
       
//creating a new object
        
function Task(question, answer1, answer2, correctAnswer) {
    this.question = question;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.correctAnswer = correctAnswer;
}

var currentTask = 0;
var score = 0;
        
//creating an Array of objects
var allTheTasks = new Array();
allTheTasks.push(new Task("In which year did Queen Victoria die?", "1911", "1901", 2));
allTheTasks.push(new Task("Of which country is Canberra the capital?", "South Africa", "Australia", 2));
allTheTasks.push(new Task("In which year did Britney Spears shave her head?", "2007", "2010", 1));
allTheTasks.push(new Task("What is the meaning of life?", "Apples", "42", 2));

function setTask(taskNumber) {
    var questionDiv = document.getElementById("question");
    questionDiv.innerHTML = allTheTasks[taskNumber].question;
    var answer1 = document.getElementById("answer1label");
    answer1.innerHTML = allTheTasks[taskNumber].answer1;
    var answer2 = document.getElementById("answer2label");
    answer2.innerHTML = allTheTasks[taskNumber].answer2;
    document.getElementById('answer1').checked = false;
    document.getElementById('answer2').checked = false;
}


function showFinalScore() {
    questionWrapper.innerHTML = " ";
    feedback.innerHTML = "All done. Your score is " + score;
}


function checkAnswers() {            
    // the first is a local variable, the second correctAnswer is a property on the Task object
    var correctAnswer = allTheTasks[currentTask].correctAnswer;

    var correctAnswerSelected = document.getElementById('answer' + correctAnswer).checked;

    if (correctAnswerSelected) {
        score++;
        // feedback.innerHTML = "You correctly selected answer. Your score is now " + score;
               
    }
    /*
    else  {
        // feedback.innerHTML = "Nope, you're wrong";
    }
    */
}


function nextQuestion() {
    if (!document.getElementById('answer1').checked
        && !document.getElementById('answer2').checked)
        return;

    checkAnswers();
    // if the current task position is less than the total length of the array
    if (currentTask < allTheTasks.length - 1) {
        currentTask++;
        setTask(currentTask);
        return;
    }
    if (currentTask === allTheTasks.length - 1) {
        showFinalScore();
    }

}

setTask(0);