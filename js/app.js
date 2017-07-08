
$(init);

var base;
var level = [Math.floor((Math.random() * level))];
var counter = 0;
var score = 10;
var bonusPoints = 0;
var bomb = 10;
var dataId;
var time;
var timerInt;


function init() {
  console.log('init');
  reset();
  modeSelection();
  $('button.home').hide();
  $('#easyMode').hide();
  $('#mediumMode').hide();
  $('#hardMode').hide();
  $('#audio').hide();
  $('div.rules').fadeOut(100);
  $('div.rules').fadeIn(5000);
  $('.Timer').hide();
  $('div#instructions-1').hide();
}

function timer() {
  if (time === 0) {
    console.log("cleared");
    $('.hideBomb').removeClass('hideBomb').addClass('bomb');
    $('li').addClass("path")
    $('.reset').show();
    $('select').hide();
    $('span.score').show();
    $('li').off('click');
    // var bombScore = parseInt(score) - parseInt(bomb) * level;
    // $('span.score').text("Score: "+ bombScore);
  }
   else {
    time--;
    console.log(time);
    $('.Timer').text(time);
  }
}

function reset(){
  $('.reset').hide();
  $('span.score').hide();
}

function gameOver(){
  createBoard = null;
  addBomb = null;
  mediumMode = null;
  hardMode = null;
  location.reload();
}

function createBoard() {
  base = 5;
  level = 4;
  $('.Timer').text(time);
  $('.gameBoard').css('width', `${base * 200}px`);
  for (var i = 0; i < base * base; i++) {
    dataId = $(`<li data-id="${i}"></li>`).appendTo($('.gameBoard'));
  }
  $('.reset').css('margin-left', `30px`);
  $('.gameBoard').css('margin-left', `70px`);
  $('span.score').removeClass('col-md-offset-5').addClass('col-md-offset-6');
  $('span.score').css('margin-left', `590px`);
  addBomb()
}

function addBomb() {
  // ADVANCED: Ensure that the bombs are only created in spaces that allow a valid route from start to finish to be clicked on
  for (var i = 0; i < level; i++) {
    var item = $('li')[Math.floor(Math.random()*$('li').length)];
    $(item).addClass('bomb');
    setTimeout(function(){
      $('.bomb').removeClass('bomb').addClass('hideBomb');
    }, 1000);
  }
  addEventListeners();
}

function mediumMode(){
  base = 5.9;
  level = 8;

  for (var i = 0; i < base * base; i++) {
    dataId = $(`<li data-id="${i}"></li>`).appendTo($('.gameBoard'));
  }
  $('.gameBoard').css('margin-left', `70px`);
  $('.gameBoard').css('display', 'inline-block');
  $('.gameBoard').css('width', `900px`);
  $('.reset').css('margin-top', `50px`);
  $('span.score').css('margin-left', `590px`);
  $('li').css('width', '75px');
  $('button#startgame').css("margin-left","10px");

  mediumBomb();
}

function mediumBomb() {
  // ADVANCED: Ensure that the bombs are only created in spaces that allow a valid route from start to finish to be clicked on
  for (var i = 0; i < level; i++) {
    var item = $('li')[Math.floor(Math.random()*$('li').length)];
    $(item).addClass('bomb');
    setTimeout(function(){
    $('.bomb').removeClass('bomb').addClass('hideBomb');
    }, 500);
  }
  addEventListeners();
}

function hardMode(){

  base = 6.9;
  level = 12;

  for (var i = 0; i < base * base; i++) {
    dataId = $(`<li data-id="${i}"></li>`).appendTo($('.gameBoard'));
    $('.gameBoard').css('margin-left','60px');
    $('.gameBoard').css('display', 'inline-block');
    $('.gameBoard').css('width', `910px`);
    $('li').css('width', '70px');
    $('span.score').css('margin-left', '-2px');
    $('span.score').css('margin-top', '-470px');
    $('span.score').removeClass('col-md-5').addClass('col-md-4');
    $('span.score').removeClass('col-md-offset-5').addClass('col-md-offset-0');
    $('.reset').css('margin-top', '35px');
    $('.reset').css('margin-left', '35px');
  }

  hardBomb();
}

function hardBomb() {

  // ADVANCED: Ensure that the bombs are only created in spaces that allow a valid route from start to finish to be clicked on
  for (var i = 0; i < level; i++) {
    var item = $('li')[Math.floor(Math.random()*$('li').length)];
    $(item).addClass('bomb');
    setTimeout(function(){
      $('.bomb').removeClass('bomb').addClass('hideBomb');
    }, 200);
  }
  addEventListeners();
}

function addEventListeners(event){
  $('li').one('click', checkSquare);
  $('.reset').on('click',gameOver);
}

function checkSquare() {
  console.log((event.target.classList.contains("hideBomb")));
  if ($(this).hasClass("hideBomb")) {
  // if (event.target.classList.contains("hideBomb")) {
    alert("You Lost");
    var bombAudio = new Audio();
    bombAudio.src='sounds/Bomb1.wav';
    bombAudio.play(5000);
    $('.hideBomb').removeClass('hideBomb').addClass('bomb');
    $('li').addClass("path")
    $('.reset').show();
    $('select').hide();
    $('span.score').show();
    $('li').off('click');
    time = -0;
    var bombScore = parseInt(score) - parseInt(bomb) * level;
    checkScore();
    $('span.score').text("Score: "+ bombScore);
  } else if (!(event.target.classList.contains("hideBomb"))) {
    $(this).addClass("path")
    $('span.score').show();
    $('span.score').text("Score: "+ score);
    checkScore();
  }
}

function checkScore(){
  counter++;
  score += 10;
  console.log(`COUNTER *******${counter}`);
  console.log(`SCORE *******${score}`);
  bonusPoints = 50;
  totalScore = score + bonusPoints;
  if(counter === Math.round(parseFloat(base * base - level))){
    time = -0;
    $('span.score').show();
    $('span.score').text("Score: "+ totalScore);
    $('.reset').show();
    $('select').hide();
    console.log(totalScore);
    alert("You Win");
    $('.hideBomb').removeClass('hideBomb').addClass('bomb');

  }

}

function modeSelection(){

  $('select').on('change',(event) =>{

    switch($(event.target).val()){

      case 'easy':
      time = 60;
      $('select').hide();
      $('div.rules').hide();
      $('#easyMode').show();
      $('.Timer').show();
      $('div#instructions-1').show();
      $("#startgame").on('click',() =>{
      setInterval(timer, 1000);
      createBoard();
      $('div#instructions-1').hide();

    });
      break;

      case 'medium':
      time = 30;
      $('select').hide();
      $('div.rules').hide();
      $('#easyMode').hide();
      $('#mediumMode').show();
      $('.Timer').show();
      $('div#instructions-1').show();
      $("#startgame").on('click',() =>{
      setInterval(timer, 1000);
      mediumMode();
      $('div#instructions-1').hide();
    });
      break;

      case 'hard':

      time = 15;
      $('select').hide();
      $('div.rules').hide();
      $('#easyMode').hide();
      $('#mediumMode').hide();
      $('#hardMode').show();
      $('.Timer').show();
      $('div#instructions-1').show();
      $("#startgame").on('click',() =>{
      setInterval(timer, 1000);
      hardMode();
      $('div#instructions-1').hide();
    });

      break;
    }

  });
}
