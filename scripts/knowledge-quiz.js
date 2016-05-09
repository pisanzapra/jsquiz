"use strict";

//creating the object type: Question  
function Question(questionText, answers, correctAnswer) {
    this.questionText = questionText;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}

// storing the HTML elements as variables
var questionWrapper = document.getElementById("question-wrapper");
var feedback = document.getElementById("feedback");
var responsesWrapper = document.getElementById("responses-wrapper");
var answersWrapper = document.getElementById("answers");
var startAgainWrapper = document.getElementById("start-again-wrapper");

// setting the starting Question number and score to 0
var currentQuestion = 0;
var score = 0;

// creating an array for user answers to be stored in
var userAnswers = new Array();

// creating an array of Questions
var allTheQuestions = new Array();
allTheQuestions.push(
    new Question(
        "When did the last execution in the Tower of London take place?",
        [
            "1541",
            "1841",
            "1641",
            "1941"
        ],
        4));
allTheQuestions.push(
    new Question(
        "Which of Henry VIII's wives died shortly after child birth?",
        [
            "Anne of Cleves",
            "Catherine Howard",
            "Jane Seymour",
            "Anne Boleyn"
        ],
        3));
allTheQuestions.push(
    new Question(
        "In which year did the Great Plague occur?",
        [
            "1665",
            "1810",
            "1901",
            "1712"
        ],
        1));
allTheQuestions.push(
    new Question(
        "Which of these was not a writer of the Renaissance period?",
        [
            "William Shakespeare",
            "Jane Austen",
            "Thomas Middleton",
            "Edmund Spenser"
        ],
        2));
allTheQuestions.push(
    new Question(
        "True or false: Colchester was the capital of Roman Britain for a time.", [
            "True",
            "False"
        ],
        1));

// making the current Question appear on the page, ensuring neither box is pre-selected
function setQuestion(QuestionNumber) {

    while (answersWrapper.hasChildNodes()) {
        answersWrapper.removeChild(answersWrapper.lastChild);
    }

    var questionDiv = document.getElementById("question");
    questionDiv.innerHTML = allTheQuestions[QuestionNumber].questionText;

    // Store all the answers associated with the current Question as QuestionAllAnswers    
    var QuestionAllAnswers = allTheQuestions[QuestionNumber].answers;

    // Loop through the answers one by one and display them
    for (var i = 1; i <= QuestionAllAnswers.length; i++) {

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
        quizRadioLabel.innerText = QuestionAllAnswers[i - 1];

        answerDiv.appendChild(quizRadio);
        answerDiv.appendChild(quizRadioLabel);
        answersWrapper.appendChild(answerDiv);

    }

    /* if we're on any Question other than Question 1, show the start again button    
    if (currentQuestion >= allTheQuestions.length - 4) {

    while (startAgainWrapper.hasChildNodes()) {
        startAgainWrapper.removeChild(startAgainWrapper.lastChild);
        }        

        var startAgainButton = document.createElement("input");
        startAgainButton.type = 'button';
        startAgainButton.className = 'quiz-button';
        startAgainButton.id = 'start-again-button'
        startAgainButton.value = "Start again \u203a\u203a"
        startAgainButton.onclick = function() {
            userAnswers.length = 0;
            score = 0;
            displayNewQuestion(0);
        };

        startAgainWrapper.appendChild(startAgainButton);

    }
*/

    // if we're on the last question, change the next button text
    if (currentQuestion === allTheQuestions.length - 1) {
        document.getElementById("next-button").value = "Show me my score!";
    }
}

// change Question function with fade in/fade out effect
function displayNewQuestion(QuestionNumber) {
    $("#question-wrapper").fadeOut("slow", function () {
        setQuestion(QuestionNumber);
        $("#question-wrapper").fadeIn("slow");
    });
}

// setting up the check answers function, which is triggered every time the user clicks the Next Question button
function checkAnswer() {
    // the first is a local variable, the second correctAnswer is a property on the Question object
    var correctAnswer = allTheQuestions[currentQuestion].correctAnswer;

    var correctAnswerSelected = document.getElementById('answer' + correctAnswer).checked;

    userAnswers.push(correctAnswerSelected);

    if (correctAnswerSelected) {
        score++;
    }
}

function shareToFacebook() {


    var scoreNumber = ((score / allTheQuestions.length) * 100);
    feedDialog(scoreNumber);
}


// revealing the final score
function showFinalScore() {
    questionWrapper.innerHTML = " ";
    var scoreText = document.getElementById("score-text");
    var scoreNumber = document.getElementById("score-number");
    scoreText.innerHTML = "You scored ";
    scoreNumber.innerHTML = ((score / allTheQuestions.length) * 100) + "%";

    for (var i = 0; i < allTheQuestions.length; i++) {

        var response = document.createElement('div');
        response.className = 'response';
        response.innerHTML = 'You answered question ' + (i + 1) + ' ';

        var answer_span = document.createElement('span');

        if (userAnswers[i]) {
            answer_span.className = 'quiz-correct-answer';
            answer_span.innerHTML = 'correctly';
            response.appendChild(answer_span);
            response.appendChild(document.createTextNode('.'));
        }
        else {
            var correctAnswerValue = allTheQuestions[i].correctAnswer - 1;
            var correctAnswerText = allTheQuestions[i].answers[correctAnswerValue];
            answer_span.className = 'quiz-incorrect-answer';
            answer_span.innerHTML = 'incorrectly';
            response.appendChild(answer_span);
            response.appendChild(document.createTextNode('.'))
            var correctAnswerReveal = document.createTextNode(' The correct answer is ' + correctAnswerText);
            response.appendChild(correctAnswerReveal);
        }

        responsesWrapper.appendChild(response);
    }

    $("#feedback").show();
}

function hasUserSelectedAnAnswer() {

    var numberofAnswers = allTheQuestions[currentQuestion].answers.length;

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
    if (currentQuestion < allTheQuestions.length - 1) {

        currentQuestion++;
        displayNewQuestion(currentQuestion);
        return;
    }

    // if we're on the last question, show final score when they click the next button
    if (currentQuestion === allTheQuestions.length - 1) {
        showFinalScore();
    }

}



displayNewQuestion(0);

window.fbAsyncInit = function () {
    FB.init({
        appId: '1722679911277589',
        xfbml: true,
        version: 'v2.6'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));


function feedDialog(scoreNumber) {
    FB.ui(
        {
            method: 'feed',
            name: "I got " + scoreNumber + "%! How well do you know English history?",
            link: window.location.href,
            description: "Click here to take the quiz and find out!",
            caption: "Caption",
            picture: window.location.href + "images/westminster.jpg",
            /*display: 'popup'*/
        },
        function (response, show_error) {
            if (response && response.post_id) {
                console.log('Post was published.');
            } else {
                console.log('Post was not published.');
            }
        }
    );
}