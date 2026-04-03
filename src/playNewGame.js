import gameData from './gameData.json'
import Game from './gameClass.js'

export default function playNewGame(gameDataObjectIndex, targetSentenceContainer, dummyWordsContainer) {
    // call the Game class's methods to populate the target sentence and dummy words containers
    Game.populateTargetSentenceContainer(gameData, gameDataObjectIndex, targetSentenceContainer);
    Game.populateDummyWordsContainer(gameData, gameDataObjectIndex, dummyWordsContainer);
}