'use strict';
// main quiz object
const STORE = {
  // question list
    questions: [
        {//1
        question: "The highest mountain on earth is?",
        options: [
          "Kangchenjunga", 
          "Chomolungma", 
          "Manaslu", 
          "Nanga Parbat"
        ],
        answer: "Chomolungma",
        // answer's corresponding image source
        imageSrc: "A1-Chomolungma.jpg"
        },
        {//2
          question: "The world's longest river is?",
          options: [
            "Congo–Chambeshi",
            "Yangtze", 
            "Nile",
            "Lena"
          ],
          answer: "Nile",
          imageSrc: "A2-Nile.jpg"
        },
        {//3
          question: "The Greatest Lakes in the world is?",
          options: [
            "Caspian Sea",
            "Huron", 
            "Superior",
            "Victoria"
          ],
          answer: "Caspian Sea",
          imageSrc: "A3-Caspian-Sea.jpg"
        },
        {//4
          question: "Which state of the U.S. has the largest population?",
          options: [
            "Maine", 
            "California", 
            "Nebraska", 
            "Texas"
          ],
          answer: "California",
          imageSrc: "A4-California.jpg"
        },
        {//5
          question: "The biggest country in Europe is?",
          options: [
            "Sweden",
            "Norway", 
            "Spain",
            "Russia"
          ],
          answer: "Russia",
          imageSrc: "A5-Russia.jpg"
        },
        {//6
          question: "Which one is the biggest volcano in Africa?",
          options: [
             "Mauna Loa", 
             "Arenal Volcano", 
             "Mount Kilimanjaro", 
             "Mount Fuji"
          ],
          answer: "Mount Kilimanjaro",
          imageSrc: "A6-Kilimanjaro.jpg"
        }
    ],
    //  current question index
      currentQuestion: 0,
    // current score
      score: 0,
    };

// each option's corresponding index
const OPTION = ['A', 'B', 'C', 'D'];

// generate a new div including selection element
function generateSelectionItemElement(option, optionCount){
  optionCount++;
  return `<div class='option'>
            ${OPTION[optionCount-1]} <input name="options" type="radio" value="${option}">
            <label for="opt_${optionCount}">${option}</label><br>
            <p class="hint"></p>
          </div>`
}

// generate total element, including question and selection
function generateQuizItemElement(item){
  const quizQuestion = `<h3>${item.question}</h3>`;
  let optionCount = 0;
  const quizSelection = item.options.map((option, optionCount) => generateSelectionItemElement(option, optionCount));
  return quizQuestion + quizSelection.join('');
}

function generateQuizItemsString(){
  const items = generateQuizItemElement(STORE.questions[STORE.currentQuestion]);
  return items;
}

// only called by clicking start, next or restart button
function renderQuizList(){
    // hide the next button
    $('.next').hide();
    // show the current question number
    $('.questionNumber').html(STORE.currentQuestion+1)
    const quizListItemsString = generateQuizItemsString();
    // show the question and option
    $('.question-field').html(quizListItemsString);
}

// get right answer's corresponding index
function rightAnswerIndex(){
  let index = STORE.questions[STORE.currentQuestion].options.findIndex(val => val == STORE.questions[STORE.currentQuestion].answer);
  return OPTION[index]
}

// check result of each question
function resultCheck(){
  $('.result').show();
  $('.result').find('img').attr('src',`images/${STORE.questions[STORE.currentQuestion-1].imageSrc}`)
  $('.result').find('img').attr('alt',`${STORE.questions[STORE.currentQuestion-1].answer}`)
  // if current question is not the last one, go to next
  if (STORE.currentQuestion < STORE.questions.length){
    $('.next').show();
    }
    // if current question is the last one, show the final evaluation and restart button
  else{
    $('.restart').show();
    $('.final').show()
    // three final evaluation depends on the score
    if (STORE.score === STORE.questions.length){
      $('.final').text('Perfect!')
      $('.final').css('color','green');

    }
    else if (STORE.score >= (STORE.questions.length)/2 ){
      $('.final').text('Good!');
      $('.final').css('color','blue');
    }
    else{
      $('.final').text('You can do better next time!')
      $('.final').css('color','red');
    }
  }
}

function submitOption(){
 
  $('.submit').on('click', function(event){
    event.preventDefault();
    
    let selectedOption = $("input[name=options]:checked").val()
    // if no option is selected 
    if (!selectedOption) {
      alert("Choose an option");
      return;
    } 
    // the hint of each option
    const hint = $("input[name=options]:checked").closest('div').find('.hint');
    // if the option is correct
    if (selectedOption === STORE.questions[STORE.currentQuestion].answer){
      hint.text('Good job!');
      hint.show();
      hint.css('border','1px solid green');
      STORE.score++;
    }
    // if the option is incorrect.
    else{
      hint.html(`Oops! The right answer is <span class="red">${rightAnswerIndex()}</span>, ${STORE.questions[STORE.currentQuestion].answer}.`);
      hint.show();
      hint.css('border','1px solid red');
    }
    // if a option is selected, disable all of them
    $('input[type=radio]').attr("disabled", true);
    // show the current score
    $('.score').html(STORE.score);
    $('.submit').hide()
    // the current question number pluses one, global scope!!!!
    STORE.currentQuestion++;
    resultCheck()
  })
}

function startQuiz(){
  // when click start button
  $('.start').on('click', function(event){
    event.preventDefault();
    renderQuizList();
    // hide the start button
    $(this).hide();
    $('.score-bar').css('visibility','visible');
    $('.button-field').css('text-align','right');
    // show the submit button
    $('.submit').show();
    $('.totalQuestion').text(STORE.questions.length);
    
  })
}

function nextQuiz(){
  // when click next button
  $('.next').on('click', function(event){
    event.preventDefault();
    // hide the result's image
    $('.result').hide();
    // show the submit button
    $('.submit').show();
    renderQuizList();
  })
}

function restartQuiz(){
  // when click restart button
  $('.restart').on('click', function(event){
    event.preventDefault();
    // show the start button
    $('.start').show();
    // hide the final evaluation
    ('.final').hide()
    renderQuizList();
  })
}

// main function
function handleQuizApp(){
  startQuiz()
  submitOption()
  nextQuiz()
}

$(handleQuizApp)