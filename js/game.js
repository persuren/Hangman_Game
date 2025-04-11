import { getRandomWord } from './data.js';
import {
  wordEl,
  popup,
  messageEl,
  successMessageEl,
  wrongLettersEl,
  items,
  displayMessage,
  showPopup,
  hidePopup,
  playCorrectSound,
  playWrongSound,
  playGameOverSound
} from './ui.js';
//let selectedWord = getRandomWord();
let maxErrors = 6; // varsayılan: orta
let selectedWord;

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = selectedWord
    .split('')
    .map(letter => `
      <div class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
      </div>
    `).join('');

  const w = wordEl.innerText.replace(/\n/g, '');
  if (w === selectedWord) {
    showPopup(true);
  }
}

function updateWrongLetters() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<h3>Hatalı harfler:</h3>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
  `;

  items.forEach((item, index) => {
    if (index < wrongLetters.length && index < maxErrors) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  if (wrongLetters.length >= maxErrors) {
    showPopup(false);
    playGameOverSound();
  }
}

function resetGame() {
  correctLetters.length = 0;
  wrongLetters.length = 0;
  selectedWord = getRandomWord();
  hidePopup();
  displayWord();
  updateWrongLetters();
}

function handleKeydown(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key.toLowerCase();

    if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          playCorrectSound();  // ✅ burası yeni
          displayWord();
        } else {
          displayMessage();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          playWrongSound();  // ✅ burası yeni
          updateWrongLetters();
        } else {
          displayMessage();
        }
      }
    }
  }
  export async function initializeGame() {
    setDifficulty(); // zorluk ayarla
  
    selectedWord = await getRandomWord();
    displayWord();
    updateWrongLetters();
    window.addEventListener('keydown', handleKeydown);
    document.getElementById('play-again').addEventListener('click', resetGame);
    document.getElementById('difficulty').addEventListener('change', changeDifficulty);
  }
  function setDifficulty() {
    const difficulty = document.getElementById('difficulty').value;
  
    if (difficulty === 'easy') maxErrors = 8;
    else if (difficulty === 'medium') maxErrors = 6;
    else if (difficulty === 'hard') maxErrors = 4;
  }
  function changeDifficulty() {
    setDifficulty();
    resetGame(); // oyunu yeni zorlukla başlat
  }
