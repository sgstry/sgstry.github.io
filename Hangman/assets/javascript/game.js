
var words = ["ferrari", "lamborghini", "bugatti", "kia", "mazda", "porsche",
 "mercedes", "volkswagen", "bmw", "toyota", "ford", "maserati", "audi", "opel", "fiat",
  "acura", "honda", "infiniti", "lexus", "mitsubishi", "nissan", "suzuki", "subaru", "hyundai",
  "volvo", "bentley", "jaguar", "lotus", "mclaren", "buick", "chrysler", "chevrolet", "cadillac","dodge", "jeep", "lincoln", "tesla"];
var wordToGuess = words[Math.floor(Math.random() * words.length)];
var wordLength = wordToGuess.length;
var numGuesses = 6;
document.getElementById("numberOfGuesses").textContent = ""+numGuesses;
var guessesRemaining = numGuesses;
var lettersGuessed = "";
var guessedWordSoFar = "";
var numCharsLeftToGuess = 0;
var newRoundMode = false;

var wins = 0;
var losses = 0;

var spaces = "";
for(var i = 0;i < wordLength;i++)
{
   spaces += "_ ";
}
document.getElementById("word").textContent = spaces.trim();
document.getElementById("hangman").src = "assets/images/Hangman-6.png";


document.onkeyup = function(event) {
   if(document.getElementById("guess") !== document.activeElement) {
      if(newRoundMode) {
      newRound();
      } else {
         var userGuess = event.key;
         var code = event.keyCode;
         var valid = validateInput(code);
         var alreadyGuessed = checkAlreadyGuessed(userGuess.toLowerCase());

         if(!valid) {
      	    alert("Please enter only letters.");
         }
         else if(alreadyGuessed) {
            alert("You already guessed this letter! Please choose another!")
         }
         else {
      	    userGuess = userGuess.toLowerCase();
            lettersGuessed += userGuess;
            var indexOfGuess = wordToGuess.indexOf(userGuess);
            if(indexOfGuess > -1) {
               updateCorrectGuessedSoFar(userGuess);
               document.getElementById("word").textContent = guessedWordSoFar;
               numCharsLeftToGuess = (guessedWordSoFar.match(/_/g) || []).length;
            }
            else {
      	       //Updated a visual of hangman with a new body part added
      	       guessesRemaining--;
      	       document.getElementById("numberOfGuesses").textContent = "" + guessesRemaining;
               document.getElementById("hangman").src = "assets/images/Hangman-"+guessesRemaining+".png";
            }

            updateLettersGuessed(userGuess);
            if(roundOver()) {
               roundFinished();
            }
         }
      }
   }

};

//A helper method that replaces a character in a string at a given index
function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

//Checks to see if the user has already guessed this letter
function checkAlreadyGuessed(l) {
	return lettersGuessed.indexOf(l) > -1 ? true : false;
}

//Checks to see if the player's guess is a letter
function validateInput(code) {
	var allowedInput;
	if(code >= 65 && code <= 90) {
		allowedInput = true;
	} else {
		allowedInput = false;
	}
	return allowedInput;
}

//Updated the string that keeps track of the player's correct guesses
function updateCorrectGuessedSoFar(userGuess) {
	guessedWordSoFar = document.getElementById("word").textContent;
	for(var i=0; i<wordToGuess.length;i++) {
       if(wordToGuess[i] === userGuess) {
          guessedWordSoFar = replaceAt(guessedWordSoFar, i*2, userGuess);
       }
    }
}

//Updates the lettersGuessed variable and element to show the player the guesses they've made
function updateLettersGuessed(userGuess) {
   var guesses = document.getElementById("lettersGuessed").textContent;
   guesses = guesses.substring(1,guesses.length-1).trim();
   if(guesses.length === 0) {
      guesses = "["+userGuess+"]";
   } else {
      guesses = "["+guesses+","+userGuess+"]";
   }
   document.getElementById("lettersGuessed").textContent = guesses;
}

//Checks to see if the player has finished the round
function roundOver() {
   var over;
   if(guessesRemaining === 0 || guessedWordSoFar.replace(/ /g,'') === wordToGuess) {
      over = true;
   }
   else {
      over = false;
   }
   return over;
}

//Presents an updated screen to the user that shows that the round is over
function roundFinished() {
	//Win
	if(guessedWordSoFar.replace(/ /g,'') === wordToGuess) {
       wins++;
       document.getElementById("wins").textContent = "" + wins;
       document.getElementById("message").textContent = "Congratulations! Press any key to play another round!";
       document.getElementById("submitGuess").disabled = true;
	}
	//Loss
	else {
	   losses++;
	   document.getElementById("losses").textContent = "" + losses;
	   document.getElementById("message").textContent = "Better luck next time! Press any key to play another round!";
     document.getElementById("word").textContent = generateSpacedWord();
	   document.getElementById("submitGuess").disabled = true;
	}
	newRoundMode = true;

}

//Resets the game so the user can play another round
function newRound() {
   wordToGuess = words[Math.floor(Math.random() * words.length)];
   wordLength = wordToGuess.length;
   guessesRemaining = numGuesses;
   lettersGuessed = "";
   guessedWordSoFar = "";
   numCharsLeftToGuess = 0;
   spaces = "";
   for(var i = 0;i < wordLength;i++)
   {
      spaces += "_ ";
   }

   document.getElementById("message").textContent = "Hello! Please guess a letter!";
   document.getElementById("word").textContent = spaces.trim();
   document.getElementById("lettersGuessed").textContent = "[ ]";
   document.getElementById("numberOfGuesses").textContent = ""+numGuesses;
   document.getElementById("guess").value = "";
   document.getElementById("submitGuess").disabled = false;
   document.getElementById("hangman").src = "assets/images/Hangman-6.png";

   newRoundMode = false;
}


function generateSpacedWord() {
	var completedWord = "";
	for(var i = 0;i < wordLength;i++)
	{
		completedWord += wordToGuess[i] + " ";
	}
	completedWord.trim();

	return completedWord;
}


function makeGuess() {
	var guess = document.getElementById("guess").value;
  guess = guess.toLowerCase();
	if(guess === wordToGuess) {
		guessedWordSoFar = guess;
		roundFinished();
		document.getElementById("word").textContent = generateSpacedWord();

	} else {
      	guessesRemaining--;
      	document.getElementById("numberOfGuesses").textContent = "" + guessesRemaining;
        document.getElementById("hangman").src = "assets/images/Hangman-"+guessesRemaining+".png";
      	if(roundOver()) {
           roundFinished();
        }
	}
}

