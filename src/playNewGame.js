import gameData from './gameData.json'
import Game from './gameClass.js'

export default function playNewGame(targetSentenceContainer, dummyWordsContainer, message, resetBtn) {
    // make a new Game object
    const gameInstance = new Game();
    
    // call the Game instance's methods to populate the target sentence and dummy words containers
    gameInstance.populateTargetSentenceContainer(gameData, gameInstance.currentRound, targetSentenceContainer);
    gameInstance.populateDummyWordsContainer(gameData, gameInstance.currentRound, dummyWordsContainer);

    // allow for interactability with dummy words container
    dummyWordsContainer.addEventListener("click", (event) => {
        console.log(gameInstance.currentRound);
        // check if the clicked word is a missing one for the JSON object for the current round
        if (gameInstance.isWordIsAMissingWord(event, gameData, gameInstance.currentRound)) {
            gameInstance.displayFoundMissingWord(event, gameData, targetSentenceContainer, gameInstance.currentRound);
        }
        // check if all words have been found for the round
        if (targetSentenceContainer.innerText === gameData[gameInstance.currentRound]["complete sentence"]) {
            // toggle win status message
            message.classList.toggle("hidden");

            if (gameInstance.currentRound < gameData.length - 1) {
                // update current round
                gameInstance.roundCount = 1;
                // call container population methods after a delay to progress to the next round
                setTimeout(() => {
                    message.classList.toggle("hidden");
                    gameInstance.populateTargetSentenceContainer(gameData, gameInstance.currentRound, targetSentenceContainer);
                    gameInstance.populateDummyWordsContainer(gameData, gameInstance.currentRound, dummyWordsContainer);
                }, 1500)
            } else if (gameInstance.currentRound === gameData.length - 1) {
                // make the "return to start" btn visible
                resetBtn.classList.toggle("hidden");
            }
        }
    })
}