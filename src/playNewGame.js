import gameData from './gameData.json'
import Game from './gameClass.js'

export default function playNewGame(gameDataObjectIndex, targetSentenceContainer, dummyWordsContainer) {
    // call the Game class's methods to populate the target sentence and dummy words containers
    Game.populateTargetSentenceContainer(gameData, gameDataObjectIndex, targetSentenceContainer);
    Game.populateDummyWordsContainer(gameData, gameDataObjectIndex, dummyWordsContainer);

    // allow for interactability with dummy words container
    dummyWordsContainer.addEventListener("click", (event) => {
      // check if the clicked word is a missing one for the JSON object for the current round
        if (Game.isWordIsAMissingWord(event, gameData, gameDataObjectIndex)) {
          Game.displayFoundMissingWord(event, gameData, targetSentenceContainer, gameDataObjectIndex);
          console.log("nanabear");
      }

      // check for all missing words found
        if (targetSentenceContainer.textContent === gameData[gameDataObjectIndex]["complete sentence"]) {
            console.log("haibunny");
            // toggle win status message
            // message.classList.toggle("hidden");
            // make the "return to start" btn visible
            // resetBtn.classList.toggle("hidden");
        }
    })
}