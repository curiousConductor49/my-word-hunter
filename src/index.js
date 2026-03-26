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
playGameBtn.addEventListener("click", (event) => {
    // make a new Game object
    const gameInstance = new Game();
    gameTagline.classList.add("hidden");
    playGameBtn.classList.add("hidden");
    // call its methods to populate the sentence and dummy words containers
    gameInstance.populateTargetSentenceContainer(gameData, gameInstance.currentRound, targetSentence);
    gameInstance.populateDummyWordsContainer(gameData, gameInstance.currentRound, dummyWordsGroup);

    // allow for interactability with dummy words container
    dummyWordsGroup.addEventListener("click", (event) => {
        if (gameInstance.isWordIsAMissingWord(event, gameData, gameInstance.currentRound)) {
            gameInstance.displayFoundMissingWord(event, gameData, targetSentence, gameInstance.currentRound);
        }
        if (targetSentence.innerText === gameData[gameInstance.currentRound]["complete sentence"]) {
            // toggle win status message
            winMessage.classList.toggle("hidden");

            // update current round
            gameInstance.roundCount = 1;

            if (gameInstance.currentRound < gameData.length) {
                // call container population methods after a delay to progress to the next round
                setTimeout(() => {
                    winMessage.classList.toggle("hidden");
                    gameInstance.populateTargetSentenceContainer(gameData, gameInstance.currentRound, targetSentence);
                    gameInstance.populateDummyWordsContainer(gameData, gameInstance.currentRound, dummyWordsGroup);
                }, 1500)
            } else if (gameInstance.currentRound === gameData.length) {
                // make the "return to start" btn visible
                resetGameBtn.classList.toggle("hidden");
                // attach event listener to it to call method to reset game interface
                resetGameBtn.addEventListener("click", () => {
                    winMessage.classList.toggle("hidden");
                    gameInstance.resetGameInterface(targetSentence, dummyWordsGroup);
                    resetGameBtn.classList.toggle("hidden");
                    gameTagline.classList.toggle("hidden");
                    playGameBtn.classList.toggle("hidden");
                });
            }
        }
    })
    
})