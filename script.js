let playersGuess = null;
let pastGuesses = [];
let winningNumber = generateWinningNumber();
let numLeft = 5;

function generateWinningNumber() {
    return Math.ceil(Math.random() * 100);
}

function on() {
    document.getElementById("overlay").style.display = "block";
}

function finOn() {
    document.getElementById("finOverlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById('pickNum').focus();
}

function finOff() {
    document.getElementById("finOverlay").style.display = "none";
    document.getElementById('pickNum').focus();
}

function difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
}

function isLower() {
    if (playersGuess < winningNumber) {
        document.getElementById('lowerOrHigher').classList = '';
        document.getElementById('lowerOrHigher').className = 'UParrow_box';
    } else {
        document.getElementById('lowerOrHigher').classList = '';
        document.getElementById('lowerOrHigher').className = 'DOWNarrow_box';
    }
    return (playersGuess < winningNumber) ? 'Guess higher!' : 'Guess lower!';
}
function playersGuessSubmission(guess) {
    console.log('playersGuessSubmission', guess)
    document.querySelector('input').value = '';
    let feedback = document.getElementById('guess-feedback');
    if (guess < 1 || guess > 100 || !guess) {
        console.log('guess feedback', guess, typeof guess)
        feedback.style.visibility = 'visible';
        feedback.innerHTML = `Invalid guess.<br>Try again!`;
    } else {
        playersGuess = guess;
        document.getElementById('guess-feedback').style.visibility = 'hidden';
        feedback.innerHTML = '';
        checkGuess();
    }
}
function checkGuess() {
    let result = '';
    let feedback = document.getElementById('guess-feedback');
    if (playersGuess === winningNumber) {
        finOn();
        document.getElementById('winOrLose').innerHTML = `Brilliant!<br>The number was: ${winningNumber}`;
        document.getElementById('numLeft').innerHTML = '';
        document.getElementById('lowerOrHigher').innerHTML = '';
        document.getElementById('lowerOrHigher').classList = '';
    } else if (pastGuesses.includes(playersGuess)) {
        result = 'You already guessed that, silly!';
        document.getElementById('lowerOrHigher').classList = '';
        document.getElementById('lowerOrHigher').innerHTML = '';
    } else {
        numLeft--;
        if (numLeft > 1) {
            document.getElementById('numLeft').innerHTML = `You have ${numLeft} guesses left.`;
        } else {
            document.getElementById('numLeft').innerHTML = `You have ${numLeft} guess left!`;
        }
        let diff = difference();
        if (pastGuesses.length < 4) {
            document.getElementById('lowerOrHigher').innerHTML = isLower();
            document.getElementById('lowerOrHigher').style.visibility = 'visible';
            console.log(pastGuesses);
            if (diff < 10) {
                document.getElementById('guess-feedback').className = 'burningUp';
                result = `You\'re burning up!`;
            } else if (diff < 25) {
                document.getElementById('guess-feedback').className = 'lukewarm';
                result = `You\'re lukewarm.`;
            } else if (diff < 50) {
                document.getElementById('guess-feedback').className = 'chilly';
                result = `You\'re a bit chilly.`;
            } else if (diff < 100) {
                document.getElementById('guess-feedback').className = 'cold';
                result = `You\'re ice cold!`;
            }
            document.getElementById('pickNum').focus();
        } else {
            document.getElementById('winOrLose').innerHTML = `Nice try!<br>The number was: ${winningNumber}`;
            document.getElementById('lowerOrHigher').style.visibility = 'hidden';
            document.getElementById('numLeft').style.visibility = 'hidden';
            document.getElementById('guess-feedback').style.visibility = 'hidden';
            finOn();
            pastGuesses = [];
        }
    }
    feedback.innerHTML = result;
    pastGuesses.push(playersGuess);
    document.querySelector(`#prevGuess p:nth-child(${pastGuesses.length})`).innerHTML = playersGuess;
    //return result;
}

// function shuffle(array) {
//     var m = array.length,
//         t, i;
//     while (m) {
//         i = Math.floor(Math.random() * m--);
//         t = array[m];
//         array[m] = array[i];
//         array[i] = t;
//     }
//     return array;
// }

/* class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
        this.numLeft = 5;
    }
    difference() {
        return Math.abs(this.playersGuess - this.winningNumber);
    }
    isLower() {
        if (this.playersGuess < this.winningNumber) {
            document.getElementById('lowerOrHigher').classList = '';
            document.getElementById('lowerOrHigher').className = 'UParrow_box';
        } else {
            document.getElementById('lowerOrHigher').classList = '';
            document.getElementById('lowerOrHigher').className = 'DOWNarrow_box';
        }
        return (this.playersGuess < this.winningNumber) ? 'Guess higher!' : 'Guess lower!';
    }
    playersGuessSubmission(guess) {
        let feedback = document.getElementById('guess-feedback');
        if (guess < 1 || guess > 100 || isNaN(guess)) {
            feedback.innerHTML = `Invalid guess.<br>Try again!`;
        } else {
            this.playersGuess = guess;
            return this.checkGuess();
        }
    }
    checkGuess() {
        let result = '';
        let feedback = document.getElementById('guess-feedback');
        if (this.playersGuess === this.winningNumber) {
            finOn();
            document.getElementById('winOrLose').innerHTML = `Brilliant!<br>The number was: ${this.winningNumber}`;
            document.getElementById('numLeft').innerHTML = '';
            document.getElementById('lowerOrHigher').innerHTML = '';
            document.getElementById('lowerOrHigher').classList = '';
        } else if (this.pastGuesses.includes(this.playersGuess)) {
            result = 'You already guessed that, silly!';
            document.getElementById('lowerOrHigher').classList = '';
            document.getElementById('lowerOrHigher').innerHTML = '';
        } else {
            this.numLeft--;
            if (this.numLeft > 1) {
                document.getElementById('numLeft').innerHTML = `You have ${this.numLeft} guesses left.`;
            } else {
                document.getElementById('numLeft').innerHTML = `You have ${this.numLeft} guess left!`;
            }
            let diff = this.difference();
            if (this.pastGuesses.length < 4) {
                document.getElementById('lowerOrHigher').innerHTML = this.isLower();
                console.log(this.pastGuesses);
                if (diff < 10) {
                    document.getElementById('guess-feedback').className = 'burningUp';
                    result = `You\'re burning up!`;
                } else if (diff < 25) {
                    document.getElementById('guess-feedback').className = 'lukewarm';
                    result = `You\'re lukewarm.`;
                } else if (diff < 50) {
                    document.getElementById('guess-feedback').className = 'chilly';
                    result = `You\'re a bit chilly.`;
                } else if (diff < 100) {
                    document.getElementById('guess-feedback').className = 'cold';
                    result = `You\'re ice cold!`;
                }
                document.getElementById('pickNum').focus();
            } else {
                document.getElementById('winOrLose').innerHTML = `Nice try!<br>The number was: ${this.winningNumber}`;
                document.getElementById('lowerOrHigher').style.visibility = 'hidden';
                document.getElementById('numLeft').style.visibility = 'hidden';
                document.getElementById('guess-feedback').style.visibility = 'hidden';
                finOn();
                this.pastGuesses = [];
            }
        }
        feedback.innerHTML = result;
        this.pastGuesses.push(this.playersGuess);
        document.querySelector(`#prevGuess p:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess;
        //return result;
    }
    // provideHint() {
    //     let arr = [];
    //     arr.push(generateWinningNumber());
    //     arr.push(generateWinningNumber());
    //     return shuffle(arr);
    // }
} */

function newGame() {
    on();
    // this.playersGuess = null;
    // this.pastGuesses = [];
    // this.winningNumber = generateWinningNumber();
    // this.numLeft = 5;
    for(let i = 0; i < 5; i++){
        document.getElementsByClassName('guess')[i].innerHTML = '';
    }
    document.getElementById('numLeft').style.visibility = 'visible';
    playGame();
}

function playGame() {
    playersGuess = null;
    pastGuesses = [];
    winningNumber = generateWinningNumber();
    numLeft = 5;
    document.getElementById('guess-feedback').style.visibility = 'hidden';
    document.getElementById('pickNum').focus();
    document.getElementById('numLeft').innerHTML = `You have ${numLeft} guesses left.`;
    console.log('winningNumber', winningNumber);
    const submit = document.getElementById('submit');
    document.querySelector('input').addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            document.getElementById('pick').style.visibility = 'hidden';
            console.log('document.querySelector(input).value', document.querySelector('input').value, parseInt(document.querySelector('input').value), typeof parseInt(document.querySelector('input').value))
            playersGuessSubmission(parseInt(document.querySelector('input').value));
            // document.querySelector('input').value = '';
        }
    });
    submit.addEventListener('click', function () {
        document.getElementById('pick').style.visibility = 'hidden';
        playersGuessSubmission(parseInt(document.querySelector('input').value));
        // document.querySelector('input').value = '';
    });
}

let start = document.getElementById('start');
start.addEventListener('click', newGame());

// let playAgain = document.getElementById('newGame');
// newGame.addEventListener('click', newGame());
