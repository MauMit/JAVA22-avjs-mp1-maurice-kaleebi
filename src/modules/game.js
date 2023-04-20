import { getFirebase } from "./highscore.js";
import { putToFireBase } from "./highscore.js";

const arr = ['Rock', 'Paper', 'Scissors'];
const winnerH1 = document.querySelector('h1'); // Texten som visar vem som vann matchen
const playerChoiceH2 = document.querySelector('h2'); // ger ett namn till min h2-text som visar användares val
const h3 = document.querySelectorAll('h3');
const h4 = document.querySelectorAll('h4');
const endGameResultH5 = document.querySelector('h5');
const usernameInput = document.querySelector('input');
const button = document.querySelectorAll('button');
const rock = arr[0]; // döper arr[0] till rock för enklare läsning av kod
const paper = arr[1]; // döper arr[1] till paper för enklare läsning av kod
const scissors = arr[2]; // döper arr[2] till scissors för enklare läsning av kod

const userNameSubmitButton = button[0];
const rockButton = button[1];
const paperButton = button[2];
const scissorsButton = button[3];

let userName;

usernameInput.value = '';  // gör så att texten försvinner från sökrutan
let computerChoice = h4[1]; // ger ett namn till min h4[1]-text som visar datorns val
let winnerOfRoundResultH4 = h4[0]; // Visar resultat av ronden på skärmen, om användare väljer sten och datorn väljer på så visar den att datorn vann

let playerScore = 0; // poäng för spelaren när de väljer rätt
let computerScore = 0; // poäng för datorn när de väljer rätt

// let random = Math.floor(Math.random() * arr.length);
let random = 0;
let computerGuess = `${arr[random]}`;


function gameOver() { // funktion körs när datorn vinner
    if (computerScore == 1) {
        putToFireBase(userName, playerScore)
        getFirebase(userName, playerScore)
        winnerH1.innerText = 'Computer Won the game';
        endGameResultH5.innerText = 'Game over, Select Rock, Paper or Scissors to play again OR hit refresh for new player';
        endGameResultH5.style.color = 'white';
        endGameResultH5.style.background = 'black'
        winnerOfRoundResultH4.innerText = '';
        h3[0].innerText = `Player Points: ${playerScore}`;
        computerScore = 0;
        playerScore = 0;
    }
}

function playerWins() { // function körs när spelaren vinner ett poäng
    playerScore++;
    winnerOfRoundResultH4.innerText = 'Player Wins';
    computerChoice.innerText = `Computer selected ${computerGuess}`;
    h3[0].innerText = `Player Points: ${playerScore}`;
    h3[0].style.color = 'blue';
}


export function playGame() { // lägger spelet i en function och kallar på den i main
    userNameSubmitButton.addEventListener('click', event => {
        getFirebase(userName, playerScore)
        event.preventDefault(); // gör så att det vi skriver är kvar på sidan
        userName = usernameInput.value;

        if (userName != '') { // Gör så att man inte kan skriva in en tom sträng i input
            const usernameH1 = document.createElement('h1');
            usernameH1.innerText = `Welcome ${userName}`;
            usernameH1.style.textShadow = '2px 2px red';
            usernameH1.style.marginLeft = '600px'
            document.body.append(usernameH1);
            const form = document.querySelector("form");
            form.remove();
        }
    });

    rockButton.addEventListener('click', () => {

        random = Math.floor(Math.random() * arr.length);
        computerGuess = `${arr[random]}`;
        playerChoiceH2.innerText = 'You Selected Rock';
        winnerH1.innerText = '';
        endGameResultH5.innerText = '';

        if (computerGuess == rock) {

            winnerOfRoundResultH4.innerText = 'Tie';
            computerChoice.innerText = `Computer selected ${computerGuess}`;

        } else if (computerGuess == paper) {
            computerScore++;
            computerChoice.innerText = `Computer selected ${computerGuess}`;
            h3[1].style.color = 'red';


        } else if (computerGuess == scissors) {

            playerWins();

        }
        gameOver();


    });

    paperButton.addEventListener('click', () => {

        random = Math.floor(Math.random() * arr.length);
        computerGuess = `${arr[random]}`;
        playerChoiceH2.innerText = 'You Selected Paper';
        winnerH1.innerText = '';
        endGameResultH5.innerText = '';

        if (computerGuess == rock) {

            playerWins();

        } else if (computerGuess == paper) {

            winnerOfRoundResultH4.innerText = 'Tie';
            computerChoice.innerText = `Computer selected ${computerGuess}`;

        } else if (computerGuess == scissors) {

            computerScore++;
            computerChoice.innerText = `Computer selected ${computerGuess}`;
            h3[1].style.color = 'red';
        }

        gameOver();
    });


    scissorsButton.addEventListener('click', event => {

        winnerH1.innerText = '';
        endGameResultH5.innerText = '';
        playerChoiceH2.innerText = 'You Selected Scissors';
        random = Math.floor(Math.random() * arr.length);
        computerGuess = `${arr[random]}`;

        if (computerGuess == rock) {
            computerScore++;
            computerChoice.innerText = `Computer selected ${computerGuess}`;
            h3[1].style.color = 'red';

        } else if (computerGuess == scissors) {
            winnerOfRoundResultH4.innerText = 'Tie';
            computerChoice.innerText = `Computer selected ${computerGuess}`;

        } else if (computerGuess == paper) {

            playerWins();
        }

        gameOver();

    });
}