var wordBlank = document.querySelector("#word");
var win = document.querySelector("#wins");
var lose = document.querySelector("#losses");
var timerElement = document.querySelector("#seconds");
var startButton = document.querySelector("#start");

var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

// Arrays used to create blanks and letters on screen
var lettersInChosenWord = [];
var blanksLetters = [];

// Array of words the user will guess
var words = [
  "variable",
  "array",
  "modulus",
  "object",
  "function",
  "string",
  "boolean",
  "abstract",
  "const",
  "return",
  "typeof",
  "confirm",
];

// The init function is called when the page loads
function init() {
  getWins();
  getlosses();
}

// The startGame function is called when the start button is clicked
function startGame() {
  // set your initial isWin variable
  isWin = false;
  timerCount = 10;
  startButton.disabled = true;
  // update your timerCount variable
  renderBlanks();
  startTimer();
}

// The winGame function is called when the win condition is met
function winGame() {
  startButton.disabled = false;
  // tell the user they won
  document.querySelector("#word").textContent = "You won!";
  // update the wins counter
  setWins(winCounter++);  
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  startButton.disabled = false;
  // tell the user they lost
  document.querySelector("#word").textContent = "You lost!";
  // update the lose counter
  setLosses(loseCounter++);  
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {

  var timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      if (isWin && timerCount > 0) {
        clearInterval(timer);
        winGame();
      }
    }
  

    if(timerCount === 0) {
      clearInterval(timer);
      loseGame();
    }

  }, 1000);

}

// Creates blanks on screen
function renderBlanks() {
  // pick random word from the words array
  chosenWord = words[Math.floor(Math.random() * words.length)];
  // split the random word into an array of letters
  lettersInChosenWord = chosenWord.split("");
  // loop through the to push blank underscores into the blanksLetters array
  numBlanks = lettersInChosenWord.length;
  blanksLetters = []
  for (var i = 0; i < numBlanks; i++) {
    blanksLetters.push("_");
  }
  // convert the blanksLetters array into a sring and render to the screen
  wordBlank.textContent = blanksLetters.join(" ");
}

// Updates win count on screen and sets win count to client storage
function setWins() {
  // render the win counter to the screen
  document.querySelector("#wins").textContent = winCounter;
  // set the win count to storage
  localStorage.setItem("Wins", winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  // render the lose counter to the screen

  document.querySelector("#losses").textContent = loseCounter;
  // set the lose count to storage
  localStorage.setItem("losses", loseCounter);
}

// These functions are used by init
function getWins() {
  // get stored value from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  // if stored value doesn't exist set counter to 0 else set the winCounter to that value
  if (storedWins === null) {
    winCounter = 0;
  } else {
    winCounter = storedWins;
  }
  // render win count to page
  win.textContent = winCounter;
}

function getlosses() {
  // get stored value from client storage, if it exists
  var storedLosses = localStorage.getItem("loseCount");
  // if stored value doesn't exist set counter to 0 else set the loseCounter to that value
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  // render lose count to page
  lose.textContent = loseCounter;
}

function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) {
    
  
  // This value is used in the timer function to test if win condition is met
  isWin = true;
  }
}

// Tests if guessed letter is in word and renders it to the screen.
// This one is done for you but please really try to figure out how this works.
function checkLetters(letter) {
  var letterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (chosenWord[j] === letter) {
        blanksLetters[j] = letter;
      }
    }
    wordBlank.textContent = blanksLetters.join(" ");
  }
}

// Attach event listener to document to listen for key event
document.addEventListener("keydown", function (event) {
  // If the count is zero, exit function
if (timerCount === 0) {
  return;
}
  // set the event.key to a variable and make it lower case.
  var key = event.key.toLocaleLowerCase();

  // set a variable with an array of all the lowercased letters and numbers. This is done for you here.
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");

  // Test if key pushed is in the alphabetNumericCharacters array and if so fire the checkLetters() function and then () function
  if (alphabetNumericCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetters(letterGuessed);
    checkWin();
  }
});

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button event that fires a function to reset the win/loss counter and starts the game over
var resetButton = document.querySelector(".reset-button");
function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);