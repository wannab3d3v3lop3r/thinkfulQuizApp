'use strict';

let currentQuestion = 0, //initialize variable to know which question the user is on 
  score = 0, //points out of total score
  i = 0, //iterate
  correct = 0,
  incorrect = 0;

const rickImg = 'rickSanchez.jpg',
      mortyImg = 'Morty.png',
      jerryImg = 'jerry.jpg';

//create an array that contains all the questions and answers
const QUIZ = [
  {
    question: "What duo created Rick & Morty?",
    multipleChoice: ["Dan Harmon and Dan Schnider", "Dan Harmon and Justin Roiland","Justin Roiland and Tom Kenny", "Jack Black and Rob Schrab", "Harmon Dan and Roilan Justin"],
    correctAnswer: "Dan Harmon and Justin Roiland"
  },
  {
    question: "What move does Rick and Morty draw influence from?",
    multipleChoice: ["Allen", "Back to the Future", "Starship Troopers", "Willy Wonka & The Chocolate Factory", "Star Wars"],
    correctAnswer: "Back to the Future"
  },
  {
    question: "What does Beth do for a living?",
    multipleChoice: ["Security Officer", "Astronomer", "Horse Surgeon", "Embalmer", "Playboy"],
    correctAnswer: "Horse Surgeon"
  },
  {
    question: "What is Rick's \"Universal Number\"?",
    multipleChoice: ["C-137","C-138","C-142","C-133", "C-136"],
    correctAnswer: "C-137"
  },
  {
    question: "What item helps Rick travel between universes?",
    multipleChoice: ["Portal Disc","Portal Wand","Plumbus","Portal Gun", "Morty"],
    correctAnswer: "Portal Gun"
  },
  {
    question: "Which actress voices Summer Smith?",
    multipleChoice: ["Spencer Grammer","Tara Strong","Laura Baily", "Kari Wahlgren", "Rihanna"],
    correctAnswer: "Spencer Grammer"
  },
  {
    question: "Rick and Morty appeared in the opening scene for what popular cartoon??",
    multipleChoice: ["The Simpsons","Bob's Burgers","Family Guy","American Dad", "South Park"],
    correctAnswer: "The Simpsons"
  },
  {
    question: "What is the name of Rick's half-avian half-human best friend??",
    multipleChoice: ["Bird Person","Bird Man","Hawk Guy","Falcon Dude", "Falcon Punch"],
    correctAnswer: "Bird Person"
  },
  {
    question: "Beth Smith is originally from what town?",
    multipleChoice: ["Chicago, Illinois", "Salt Lake City, Utah", "Pocatello, Idaho", "Muskegon, Michigan", "Columbus, Ohio"],
    correctAnswer: "Muskegon, Michigan"
  },
  {
    question: "What is Rick Sancez's famous song?",
    multipleChoice: ["Wubbalubbadubdub!","And that's the way the news goes!","Get Schwifty", "None of the Above", "All of the above"],
    correctAnswer: "Get Schwifty"
  }
  ];

function startGame(){
    //listens to the users click
    $('.enterGame').on('click',() => {
        $('.startPage').addClass('hidden');
        $('.generateQuiz').removeClass('hidden');
        $('.currentQuestion').removeClass('hidden');
        createRows();
        generateQuiz();
        scoreBoard();
    });
    console.log("startGame renders");
}

function createRows(){
    let rowIndex = 0;

    //creates col-sm-12 rows
    for(let rows = 0; rows < QUIZ[i].multipleChoice.length + 1; rows++){
        $('#userForm').append(`<div class="col-sm-12 col-xs-12 row${rows}">`);
    }

    //from the col-sm-12 rows, append the containers where the questions will be
    for(rowIndex; rowIndex < QUIZ[i].multipleChoice.length; rowIndex++){
        $('.row' + rowIndex).append(`<div class="inputContainer">
        <input type="radio" name="answer" class="guess" id="question${rowIndex}">
        <label for="question${rowIndex}" class="inputOptions${rowIndex}"></label>
    </div>`)
    }

    //appends scoreboard inside the form element
    $('.row' + rowIndex).append(`<div class="correctBoard"></div><div class="scoreBoard"></div><div class="incorrectBoard"></div>
    <button type="submit" form="userForm" class="checkAnswer hidden" required>Check Answer</button>
    <button type="button" name="nextQuestion" class="nextQuestion hidden">Next Question</button>`);
    $('#userForm').append(`<div class="correctAnswer"></div>`);
}

function generateQuiz(){
    //create the quiz
    $('.question').text(QUIZ[i].question);
    for(let quizIndex = 0; quizIndex < QUIZ[i].multipleChoice.length; quizIndex++){
        $('.row' + quizIndex).find('.inputOptions' + quizIndex).text(QUIZ[i].multipleChoice[quizIndex]);
    }
    console.log("generateQuiz renders");
}

function getUsersAnswer(){
    //listens to the users val and see what it is
    $('#userForm').submit(function(event){
        event.preventDefault();
    
        let selected = $('input[type="radio"]:checked').parent('.inputContainer').find('label').text();
        
        console.log(selected);

        checkUsersAnswer(selected);
    });
    console.log("checkUsersAnswer renders");
}

//check to see if the users answer is correct
function checkUsersAnswer(guess){

    if(guess === QUIZ[i].correctAnswer){
        console.log("it works");
        score++;
        correct++;
        scoreBoard();
        $('.checkAnswer').hide();
        $('.correctAnswer').show();
        $('.correctAnswer').text(guess + " is correct!");
        $('.nextQuestion').show();
        }
    else{
        score++;
        incorrect++;
        scoreBoard();
        $('.checkAnswer').hide();
        $('.correctAnswer').show();
        $('.correctAnswer').text("The correct answer was: " + QUIZ[i].correctAnswer);
        $('.nextQuestion').show();
        }
}

function nextQuestion(){
    $('#userForm').on('click','.nextQuestion',function(){
        $('.correctAnswer').hide();
        $('.nextQuestion').hide();
        $('.checkAnswer').show();
        i++;
        console.log(i);
        if(i === 10){
            finalPage();
        }
        else{
            generateQuiz();
        }   
    })
}

function scoreBoard(){
    $('.scoreBoard').html(score + " out of 10");
    $('.correctBoard').html(correct + " correct");
    $('.incorrectBoard').html(incorrect + " incorrect");
    console.log("scoreBoard renders");
}

function currentScore(){
    console.log("CurrentScore renders");
}

function finalPage(){
    console.log("finalPage renders");

    $('.currentQuestion').addClass('hidden');
    $('.generateQuiz').addClass('hidden');
    $('.finalPage').removeClass('hidden');

    if(correct >= 8){
        $('.finalPic').attr('src',rickImg);
        $('.finalStatement').text("I see you're a genius just like Rick");
      }
      else if(correct >= 6){
        $('.finalPic').attr('src',mortyImg);
        $('.finalStatement').text("Not as smart as Rick, but you're good enough to be the sidekick");
      }
      else{
        $('.finalPic').attr('src',jerryImg);
        $('.finalStatement').text("The Picture explains itself");
      }

      reset();

}


//resets all variables and starts the page again
function reset(){
    $('.reset').on('click',function(){
        $('.startPage').removeClass('hidden');
        $('.generateQuiz').addClass('hidden');
        $('.currentQuestion').addClass('hidden');
        $('.finalPage').addClass('hidden');
        $('#userForm').empty();
        i = 0;
        score = 0;
        incorrect = 0;
        correct = 0;
    });
}

function renderFunctions(){
    //TO DO
    $(startGame);
    $(generateQuiz);
    $(getUsersAnswer);
    $(nextQuestion);
    $(scoreBoard);
    $(currentScore);
    console.log("renderFunctions renders");
}

$(renderFunctions);