//export { c };

const quizQuestions = [
    {
        question: "Which language runs in a browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d", 
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    }, 
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "Commonly used data types DO NOT include",
        a: "strings",
        b: "booleans",
        c: "alerts",
        d: "none of the above",
        correct: "c",
    },
    {
        question: "Arrays in JavaScript can be used to store",
        a: "numbers and strings",
        b: "other arrays",
        c: "booleans",
        d: "all of the above",
        correct: "d",
    },
    {
        question: "The condition in an if/else statement is enclosed within",
        a: "quotes",
        b: "curly brackets",
        c: "parenthesis",
        d: "square brackets",
        correct: "b",
    },
    {
        question: "A pack of lions is called a",
        a: "group",
        b: "package",
        c: "pride",
        d: "flock",
        correct: "c",
    },
]

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

//timer related
// var c = 200;

//index for the current question
let currentQuestion = 0
let score = 0

loadQuiz()

//initializing the timer counter
c = 100;

function loadQuiz() {
    //to deselect any selected answer that might remain selected after we reload the web app.
    //the deselectAnswers() function clears any selected answer after reloading the browser.
    deselectAnswers();

    // this is one of the objects in the area.
    const currentQuizQuestion = quizQuestions[currentQuestion];
    
    // getting the question values out of the quizData array.  
    //alert("line 67: " + currentQuizQuestion);
    questionEl.innerText = currentQuizQuestion.question;
    //alert("line 69: " +  questionEl.innerText)

    //getting the a,b,c, and d values for each answer and putting
    //them into the a_text ID, the b_text ID, and so on.
    a_text.innerText = currentQuizQuestion.a;
    b_text.innerText = currentQuizQuestion.b;
    c_text.innerText = currentQuizQuestion.c;
    d_text.innerText = currentQuizQuestion.d;
} 

function deselectAnswers() {
    // we want to loop through each answer element, and for each particular
    // answer element, set the check value to false to remove any checks or any 
    // answer selections. 
    answerEls.forEach(answerEl => answerEl.checked = false)
}

//this function returns the answer that is selected.
function getSelected() {
    let answer;

    //for each answer element, see which one is checked.
    answerEls.forEach(answerEl => {
        //if this particular answer element is checked, which gives us a true 
        //or false, then answer is equal to the answer element dot ID.
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer;
}

//this event listener listens to a click event.
//this event listener calls the getSelected() function when it is clicked. 
submitBtn.addEventListener('click', () => {

    //this gives the selected answer of a question
    const answer = getSelected();
    //console.log(answer);

    //match the selected answer with the correct answer.
    //if(answer) => if there is an answer,
    if(answer) {
        //then check if that answer is equal to the correct answer.
        //the correct answer is in the quizData array having correct as key.
        if(answer === quizQuestions[currentQuestion].correct) {   
            //so, increment the score by 1 point.
            score++
        } else {

        // if(answer !== quizQuestions[currentQuestion].correct) {
            //take five seconds off, if answer to question is wrong.
            c = c - 10;
        }

        //then go on from the current question to the next question.
        currentQuestion++

        //check if we are not at the end of the quiz, if not, then
        //call loadQuiz().
        if(currentQuestion < quizQuestions.length) {
            loadQuiz()
        } else { //else, if we are at the end, we answered the last question,
        //then take the quiz element, which is the entire wrapper, and set the
        //entire HTML to what is inside the backticks ``.

        // source:
        // https://stackoverflow.com/questions/27765666/passing-variable-through-javascript-from-one-html-page-to-another-page
        localStorage.setItem("cValue",c);
        quiz.innerHTML = `  
            <h2>You answered ${score}/${quizQuestions.length} questions.<br/>
            Your score is ${c} points</h2>
            <a href="../html/finalScore.html">
            <button>Enter initials...</button></a>
            `
        } //<button onclick="location.reload() ==> this button reloads the quiz app to start over.
    } //closing if(currentQuiz < quizData.length) {

})

//timer
function timer() {
    if (c > 0) {
    c = c - 1;
    } 

    if (c < 100) {
        time.innerHTML = c;
    }
    
    if (c <= 0) {
        window.clearInterval(update);
        //keeps timer from counting down into negative numbers.
        c = "-";
        localStorage.setItem("cValue",0);
        quiz.innerHTML = `  
        <h2 id="timeUp">Your time is up!<br/>
        <h2>You answered ${score}/${quizQuestions.length} questions.<br/>
            Your score is 0 points</h2>
            <a href="../html/finalScore.html">
            <button>Enter initials...</button></a>
        `
    }
} //closes time() function

//Source: https://www.sitepoint.com/community/t/want-timer-to-start-on-button-click-always-starts-on-load-why/291783/3
// function startTimer() {
//     update = setInterval(function(){timer()}, 1000);
// 
// }
update = setInterval("timer()", 1000);


// window.onload = function() {
//     var getInput = prompt("Hey type something here: ");
//     localStorage.setItem("cValue",c);
//  }
