// const { start } = require("repl");

const buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;

start();
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userChosenColour);
  playSound(userChosenColour);
  animatePress($(this));
  //userClickedPattern.length-1
  if (gamePattern.length == userClickedPattern.length) {
    checkAnswer($(this)); 
  }
});

function start() {
  
  level = 0;
  var started = false;
  userClickedPattern = [];
  gamePattern = [];
  setTimeout(function () {
    $("#level-title").text("Press A Key to Start");
  }, 2000);
  
  $(document).keypress(function (event) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }   
  });
}


function nextSequence() {
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    return randomNumber;
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function playSoundIncorrect() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
}
function animatePress(currentColour) {
  currentColour.addClass("pressed");
  setTimeout(function () {
    currentColour.removeClass("pressed");
  }, 100);
}
function animateWrong(currentColour) {
  currentColour.addClass("game-over");
  setTimeout(function () {
    currentColour.removeClass("game-over");
  }, 100);
}
function checkAnswer(currentColour) {
  console.log(userClickedPattern);
  console.log(gamePattern);
  var flag = userClickedPattern.length == gamePattern.length && userClickedPattern.every(function (element,index) {
    return element === gamePattern[index];
  });
    
  if(flag){
    console.log("success");
    userClickedPattern = [];
    setTimeout(function () {
      nextSequence();
    }, 1000);
  
  }
  
  else {
    console.log("wrong");
    animateWrong(currentColour);
    playSoundIncorrect();
    $("#level-title").text("Game Over");
    start();
  }
  
}

