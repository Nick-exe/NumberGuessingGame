/* 
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1, 
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    //Validate Input
    if(isNaN(guess) || guess < min || guess > max ){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //Check if won
    if(guess === winningNum){
        //GameOver - Won
        gameOver(true,`${winningNum} is correct, YOU WIN!`);
    }else{
        //Wrong Number
        guessesLeft--;
        
        if(guessesLeft == 0){
            //GameOver - Lost
           gameOver(false,`${winningNum} was the correct number, Game Over`);
        }else{
            //Game continues, answer wrong

            //Make border red
            guessInput.style.borderColor = 'red';

            //Clear input
            guessInput.value = '';

            // Tell User Answer is wrong
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

//Game Over
function gameOver(didWin, msg){
    let color;
    didWin === true? color = 'green' : color = 'red';
    //Disable input
    guessInput.disabled = true;
    //Make border green
    guessInput.style.borderColor = color;
    //Set Text Color
    message.style.color = color;
    //Set Message
    setMessage(msg);

    //Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Get Winning number function
function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min);
}

//set Message function
function setMessage(msg, color){
    message.textContent = msg; 
    message.style.color = color;
}
