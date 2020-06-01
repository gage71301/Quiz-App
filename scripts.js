$(initializeApp);


const STORE = [

    {
       question: 'What do you call a male Duck?' ,
       answers: [ 

            'Duckling',
           'Goose',
           'Mallard',
           'Drake' 
       ],
       correctAnswer: 'Mallard'
    },

    {
        question: 'How fast can Ducks fly?' ,
        answers: [

            '40 - 60mph',
            '25 - 40mph',
            '80 - 90mph',
            '10 - 20mph'
        ],
        correctAnswer: '40 - 60mph'
    },

    {
        question: 'What helps Ducks fly after swimming?' ,
        answers: [

            'They float',
            'Waterproof feathers',
            'Long wings',
            'Aerodynamic body'
        ],
        correctAnswer: 'Waterproof feathers'
    },

    {
        question: 'How many species of Ducks are there?' ,
        answers: [
            '200',
            '78',
            '150',
            '250'
        ],
        correctAnswer: '150'
    },

    {
        question: 'What age do young Ducks usually start flying?' ,
        answers: [
            '50 - 60 days',
            '20 - 40 days',
            '80 - 100 days',
            '70 - 80 days'
        ],
        correctAnswer: '50 - 60 days'
    },



]

let currentQuestion = 0;
let correctAnswers = 0;


function initializeApp() {
    resetStats();
    startQuiz();
    restartQuiz();
}

function resetStats() {
    $("#quizScore").hide();
    $(".quizContainer").hide();
    currentQuestion = 0;
    correctAnswers = 0;
    console.log(currentQuestion, correctAnswers);
}

function restartQuiz() {
    console.log("restartQuiz");
    $("#questionContainer").on("click", "#restartQuiz", function() {
        resetStats();
        startQuiz();
        $(".questionResult").hide();
        $(".correctAnswerFB").hide()
        $("#quizBegin").show();
    });
}

function gradeAnswer() {
    $("#questionContainer").on("submit", "#questionForm", function(event) {
        event.preventDefault();

        const userChoice = $(event.currentTarget).find("input[type=radio]:checked").val();

        console.log('test', userChoice, currentQuestion, correctAnswers);


        if (currentQuestion < STORE.length) {

            const questionObject = STORE[currentQuestion];

            if (userChoice === questionObject.correctAnswer) {
                let correctFeedBack = `<h1>Good Job!</h1> 
                                <p>Answer: ${questionObject.correctAnswer}</p>`
                correctAnswers++;
                updateScore(currentQuestion, correctAnswers);


                $(".questionResult").hide();
                $(".correctAnswerFB").html(correctFeedBack).addClass("greenbox").show();      

            }else{
                showCorrect();
            }




            if (!userChoice) {
                alert("No Answer Selected");
            } else {
                currentQuestion++;
                const question = STORE[currentQuestion];
                if (question) {
                    renderQuestion(question);


                }  
            }   
            

        }

        if (currentQuestion === STORE.length) {
            console.log('RESTART');
    
            const restart = `<button id="restartQuiz">Retry?</button>`
            const amountRight = `<p>amount correct: ${correctAnswers}</p>`;
            $("#questionContainer").html(amountRight);
            $("#questionContainer").append(restart);
        }
    });
}

function startQuiz() {
    console.log("startQuiz");
    $('#mainApp').on('click', '#quizBegin', function(event) {
        event.preventDefault();

        const question = STORE[currentQuestion];

        renderQuestion(question);

        $("#quizBegin").hide();

        $("#quizScore").show();

        $(".quizContainer").show();

        gradeAnswer();

        updateScore(currentQuestion, correctAnswers);

    });
}

function updateScore(currentQuestion, correctAnswers) {
    console.log('updateScore', currentQuestion);
    const currentCorrect = correctAnswers;
    $('#questionIndex').text(currentQuestion + 1);

    $('.questionTotal').text(STORE.length);

    $('.rightAnsIndex').text(correctAnswers);

}

function renderAnswers(question) {
    return question.answers.map(currentAnswer => {
        return `<li>
                    <input type="radio" name="answer" value="${currentAnswer}" />
                    <label for="answer">${currentAnswer}</label>
               </li>`
    }).join("");

}

function renderQuestion(question) {
    const questionAnswers = renderAnswers(question);

    const questionNode = `<form id="questionForm"><h3>
                            ${question.question}
                        </h3>
                        <ul id="answerList">${questionAnswers}</ul>
                        <button> Submit </button></form>
                        `;


    $('#questionContainer').html(questionNode);
}

function showCorrect() {
    console.log("Show Correct");

    let questionObject = STORE[currentQuestion];
    let currentCorrectAnswer = questionObject.correctAnswer;

    const questionResultbox = `<h1>Incorrect</h1>
                            <h2>Correct Answer: ${currentCorrectAnswer}</h2>
                            `
    $(".correctAnswerFB").hide();
    $(".questionResult").html(questionResultbox).addClass("resultStyle");
    $(".questionResult").show();
}




