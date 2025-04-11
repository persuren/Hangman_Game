export const wordEl = document.getElementById('word');
export const popup = document.getElementById('popup-container');
export const messageEl = document.getElementById('message');
export const successMessageEl = document.getElementById('success-message');
export const wrongLettersEl = document.getElementById('wrong-letters');
export const items = document.querySelectorAll('.item');
export const playAgainBtn = document.getElementById('play-again');

export function displayMessage() {
  messageEl.classList.add('show');
  setTimeout(() => messageEl.classList.remove('show'), 2000);
}

export function showPopup(success = true) {
  popup.style.display = 'flex';
  successMessageEl.innerText = success ? "Tebrikler kazandınız." : "Maalesef kaybettiniz.";
}

export function hidePopup() {
  popup.style.display = 'none';
}

const correctSound = new Audio('./sounds/correct.mp3');
const wrongSound = new Audio('./sounds/wrong.mp3');
const gameOverSound = new Audio('./sounds/gameover.mp3');

export function playCorrectSound() {
    correctSound.currentTime = 0;
    correctSound.play();
  }
  
  export function playWrongSound() {
    wrongSound.currentTime = 0;
    wrongSound.play();
  }
  
  export function playGameOverSound() {
    gameOverSound.currentTime = 0;
    gameOverSound.play();
  }
