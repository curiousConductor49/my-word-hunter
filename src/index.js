// necessary imports
import './styles.css'
import magnify from './assets/light-theme-magnify.svg'
// import theme from './assets/theme-light-dark.svg'
import gameData from './gameData.json'
import Game from './gameClass.js'

// main index.js content
document.querySelector('#game-interface').innerHTML = `
  <h1>Word Hunter</h1>
  <p id="game-tagline">Hunt the words, complete the sentence!</p>
  <p id="win-status-message"></p>

  <div role="region" id="target-sentence" aria-live="polite"></div>
  <div id="dummy-words-group"></div>
  
  <button id="play-game-btn">Play</button>
`

// a light/dark theme toggle
// <div id="toggle-theme"><img id="theme-icon" src=${theme} alt="A sun and crescent moon divided by a diagonal line" width="50px" height="50px"></div>

// dom elements
const gameTagline = document.querySelector("#game-tagline");
const targetSentence = document.querySelector("#target-sentence");
const dummyWordsGroup = document.querySelector("#dummy-words-group");
const playGameBtn =  document.querySelector("#play-game-btn");

// gameplay
playGameBtn.addEventListener("click", (event) => {
    // make a new Game object
    const gameInstance = new Game();
    gameTagline.classList.add("hidden");
    playGameBtn.classList.add("hidden");
    // call its methods to populate the sentence and dummy words containers
    // NOTE: the current round of the loop is supplied as 1 for testing
    gameInstance.populateTargetSentenceContainer(gameData, 1, targetSentence);
    gameInstance.populateDummyWordsContainer(gameData, 1, dummyWordsGroup);
    // allow for interactability with dummy words container
    dummyWordsGroup.addEventListener("click", (event) => {
        if (gameInstance.isWordIsAMissingWord(event, gameData, 1)) {
            gameInstance.displayFoundMissingWord(event, gameData, targetSentence, 1);
        }
    })
})