// necessary imports
import './styles.css'
// import magnify from './assets/light-theme-magnify.svg'
// import theme from './assets/theme-light-dark.svg'
import gameData from './gameData.json'
import playNewGame from './playNewGame.js'

// main index.js content
document.querySelector('#game-interface').innerHTML = `
  <h1>Word Hunter</h1>
  <p id="game-tagline">Hunt the words, complete the sentence!</p>
  <p id="win-message" class="hidden">You won the round!</p>

  <div role="region" id="target-sentence" aria-live="polite"></div>
  <div id="dummy-words-group"></div>
  
  <button id="play-game-btn">Play</button>
  <button id="reset-game-btn" class="hidden">Return to start</button>
`

// a light/dark theme toggle
// <div id="toggle-theme"><img id="theme-icon" src=${theme} alt="A sun and crescent moon divided by a diagonal line" width="50px" height="50px"></div>

// dom elements
const gameTagline = document.querySelector("#game-tagline");
const winMessage = document.querySelector("#win-message");
const targetSentence = document.querySelector("#target-sentence");
const dummyWordsGroup = document.querySelector("#dummy-words-group");
const playGameBtn = document.querySelector("#play-game-btn");
const resetGameBtn = document.querySelector("#reset-game-btn");

// gameplay
playGameBtn.addEventListener("click", () => {
    // hide the tagline and play button
    gameTagline.classList.add("hidden");
    playGameBtn.classList.add("hidden");
    // pick a random index to access the JSON array with
    const randomIndex = Math.floor(Math.random() * (gameData.length - 1 - 0 + 1) + 0);
    // call function to play a new game
    playNewGame(randomIndex, targetSentence, dummyWordsGroup);
})

// attach event listener to reset game interface
resetGameBtn.addEventListener("click", () => {
  // hide the winMessage
  winMessage.classList.toggle("hidden");
  // reset the containers
  targetSentence.innerHTML = "";
  dummyWordsGroup.innerHTML = "";
  // hide the reset btn
  resetGameBtn.classList.toggle("hidden");
  // make tagline and play btn visible
  gameTagline.classList.toggle("hidden");
  playGameBtn.classList.toggle("hidden");
})