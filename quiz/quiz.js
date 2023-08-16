const gameScreen = document.querySelector('.game');
const resultScreen = document.querySelector('.result');
const question = document.querySelector('.question');
const answersContainer = document.querySelector('.answers');
const submit = document.querySelector('.submit');
const play = document.querySelector('.play');
const errormessage = document.querySelector('.error');

let data;

let quesNum = 0;
let correctAns = 0;
let wrongAns = 0;
let total = 0;
let selectedAns;

submit.addEventListener('click', onSubmit);
play.addEventListener('click', playAgain);

fetch('./quiz.json')
  .then(jsonFile => jsonFile.json())
  .then(object => getData(object))
  .catch(error =>
    console.error('somthing went while fetching the questions: ', error)
  );

function getData(object) {
  data = object;
  askQuestions(quesNum);
}

function askQuestions(qNumber) {
  selectedAns = null;

  if (qNumber < 3) {
    // console.log(data[qNumber]);
    question.textContent = data[qNumber].question;
    answersContainer.innerHTML = data[qNumber].answers
      .map(
        (item, index) =>
          `
      <div class = "answer">
        <input name="answer" type="radio" id ="${index}" value="${item.isCorrect}">
        <label for = "${index}">${item.answer}</label>
      </div>
          `
      )
      .join('');
    selectAnswer();
  } else showResult();
}

function selectAnswer() {
  answersContainer.querySelectorAll('input').forEach(el =>
    el.addEventListener('click', event => {
      selectedAns = event.target.value;
    })
  );
}

function onSubmit() {
  if (selectedAns !== null) {
    errormessage.style.display = 'none';
    console.log('before ', selectedAns, correctAns, wrongAns);
    // selectedAns ? ++correctAns : ++wrongAns;
    selectedAns === 'true' ? ++correctAns : ++wrongAns;
    console.log('after ', selectedAns, correctAns, wrongAns);
    ++quesNum;
    askQuestions(quesNum);
  } else {
    errormessage.style.display = 'block';
  }
}

function showResult() {
  gameScreen.style.display = 'none';
  resultScreen.style.display = 'block';

  resultScreen.querySelector(
    '.correct'
  ).textContent = `Correct Answers: ${correctAns}`;
  resultScreen.querySelector(
    '.wrong'
  ).textContent = `Wrong Answers: ${wrongAns}`;
  total = wrongAns === 0 ? correctAns * 10 : correctAns * 10 - wrongAns * 5;
  resultScreen.querySelector('.score').textContent = `Score: ${total}`;
}

function playAgain() {
  quesNum = 0;
  correctAns = 0;
  wrongAns = 0;
  total = 0;
  askQuestions(quesNum);
  gameScreen.style.display = 'block';
  resultScreen.style.display = 'none';
}
