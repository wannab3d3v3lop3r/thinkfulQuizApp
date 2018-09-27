'use strict';

let currentQuestion = 0, //initialize variable to know which question the user is on 
  score = 0, //points out of total score
  i = 0, //iterate
  gameStarted = false,
  gameOver = false;

  //make this cleaner
  //listeners into ready function
  //

const RICK = 'rickSanchez.jpg',
      MORTY = 'Morty.png',
      JERRY = 'jerry.jpg';

//create an array that contains all the questions and answers
const QUIZ = [
  {
    question: "What duo created Rick & Morty?",
    multipleChoice: ["Dan Harmon and Dan Schnider", "Dan Harmon and Justin Roiland","Justin Roiland and Tom Kenny", "Jack Black and Rob Schrab"],
    correctAnswer: "Dan Harmon and Justin Roiland"
  },
  {
    question: "What move does Rick and Morty draw influence from?",
    multipleChoice: ["Allen", "Back to the Future", "Starship Troopers", "Willy Wonka & The Chocolate Factory"],
    correctAnswer: "Back to the Future"
  },
  {
    question: "What does Beth do for a living?",
    multipleChoice: ["Security Officer", "Astronomer", "Horse Surgeon", "Embalmer"],
    correctAnswer: "Horse Surgeon"
  },
  {
    question: "What is Rick's \"Universal Number\"?",
    multipleChoice: ["C-137","C-138","C-142","C-133"],
    correctAnswer: "C-137"
  },
  {
    question: "What item helps Rick travel between universes?",
    multipleChoice: ["Portal Disc","Portal Wand","Plumbus","Portal Gun"],
    correctAnswer: "Portal Gun"
  },
  {
    question: "Which actress voices Summer Smith?",
    multipleChoice: ["Spencer Grammer","Tara Strong","Laura Baily", "Kari Wahlgren"],
    correctAnswer: "Spencer Grammer"
  },
  {
    question: "Rick and Morty appeared in the opening scene for what popular cartoon??",
    multipleChoice: ["The Simpsons","Bob's Burgers","Family Guy","American Dad"],
    correctAnswer: "The Simpsons"
  },
  {
    question: "What is the name of Rick's half-avian half-human best friend??",
    multipleChoice: ["Bird Person","Bird Man","Hawk Guy","Falcon Dude"],
    correctAnswer: "Bird Person"
  },
  {
    question: "Beth Smith is originally from what town?",
    multipleChoice: ["Chicago, Illinois", "Salt Lake City, Utah", "Pocatello, Idaho", "Muskegon, Michigan"],
    correctAnswer: "Muskegon, Michigan"
  },
  {
    question: "What is Rick Sancez's famous song?",
    multipleChoice: ["Wubbalubbadubdub!","And that's the way the news goes!","Get Schwifty", "None of the Above"],
    correctAnswer: "Get Schwifty"
  }
  ]

  //shows the front page and hides everything else
  function startPage(){
    $('.startPage').show();
    $('.generateQuiz').hide();
    $('.finalPage').hide();

    //when user clicks, generate Quiz
    $('.enterGame').on('click',function(){
      $('.startPage').hide();
      $('.generateQuiz').show();
      $('.checkAnswer').show();
      generateQuiz();
    })
  }

  // function createHTMLQuiz()
  //   for(let index = 0; index < 4; i++){
  //     $('#userForm').append(`<div class="inputContainer">
  //     <input type="radio" name="answer" class="guess" id="question${index}">
  //     <label for="question${index}" class="inputOptions${index}"></label>
  // </div>`)
  //   }
  //   $('#userForm').append()
  // }
  
  //Generate Quiz
  function generateQuiz(){
    $('.nextQuestion').hide();
    $('.toLastPage').hide();
    $('.question').text(QUIZ[i].question);
    for(let j = 0 ; j < QUIZ[i].multipleChoice.length; j++){
      $('.inputOptions' + j).text(QUIZ[i].multipleChoice[j]);
      $('#question' + j).text(QUIZ[i].multipleChoice[j]).attr('value',QUIZ[i].multipleChoice[j]);
    }
    //calls this function to show the score
    updateScore();
  }

  function updateScore(){
    $('.scoreBoard').html(score + " out of 10");
  }

  function finalScore(){
    if(score >= 8){
      $('.finalPic').attr('src',RICK);
      $('.finalStatement').text("I see you're a genius just like Rick");
    }
    else if(score >= 6){
      $('.finalPic').attr('src',MORTY);
      $('.finalStatement').text("Not as smart as Rick, but you're good enough to be the sidekick");
    }
    else{
      $('.finalPic').attr('src',JERRY);
      $('.finalStatement').text("The Picture explains itself");
    }
  }

  function render(){
    startPage();
  }

  $(render);

  $('#userForm').submit(function(event){
    event.preventDefault();

    let selected = $('input[type="radio"]:checked').val();

    console.log(selected);


  if(selected === QUIZ[i].correctAnswer){
    console.log("it works");
    score++;
    updateScore();
    $('.correctAnswer').show();
    $('.correctAnswer').text(selected + " is correct!");
    $('.nextQuestion').show();
    }
    else{
      $('.correctAnswer').show();
      $('.correctAnswer').text("The correct answer was: " + QUIZ[i].correctAnswer);
      $('.nextQuestion').show();
    }

  })

  $('.checkAnswer').on('click',function(){
    $(this).hide();
  });


  $('.nextQuestion').on('click',function(){
    i++;
    $('.checkAnswer').show();
    $('.correctAnswer').hide();

    if(i === 10){
      $('.checkAnswer').hide();
      $('.nextQuestion').hide();
      $('.toLastPage').show();
    }else{
      generateQuiz();
    }
  });

  $('.toLastPage').on('click',function(){
    $('.generateQuiz').hide();
    $('.finalPage').show();
    finalScore();
  })

  $('.reset').on('click',function(){
    i = 0;
    score = 0;
    startPage();
  })