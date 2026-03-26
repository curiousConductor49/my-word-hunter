export default class Game {
    populateTargetSentenceContainer(gameData, currentRound, sentenceContainer) {
        // populate container for target sentence
        const missingWords = gameData[currentRound]["missing words"].join("|");
        const missingWordsRegex = new RegExp(missingWords, "gi");
        sentenceContainer.innerHTML = gameData[currentRound]["complete sentence"].replaceAll(missingWordsRegex, "...");
    }

    populateDummyWordsContainer(gameData, currentRound, dummyWordsContainer) {
        // populate container for dummy words group
        const dummyWordEls = gameData[currentRound]["dummy words"].map(word => `<span tabindex="0" class="dummy-word">${word}</span>`);
        const dummyWordsContent = gameData[currentRound]["missing words"].reduce((accumulator, currentValue) => {
            // randomize where the missing words appear
            const minIndex = 1;
            const maxIndex = dummyWordEls.length - 1;
            const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1) + minIndex);
            accumulator.splice(randomIndex, 0, `<span tabindex="0" class="target-word">${currentValue}</span>`);
            return accumulator;
        }, dummyWordEls);
        dummyWordsContainer.innerHTML = dummyWordsContent.join(" ");
    }

    isWordIsAMissingWord(event, gameData, currentRound) {
        return gameData[currentRound]["missing words"].includes(event.target.innerText) ? true : false;
    }

    displayFoundMissingWord(event, gameData, targetSentenceContainer, currentRound) {
        // find and replace the missing word with its placeholder in the sentence
        const wordIndex = gameData[currentRound]["complete sentence"]
        .split(" ")
        .findIndex((word) => word === event.target.innerText);
        const newSentenceContent = targetSentenceContainer.textContent
        .split(" ")
        .toSpliced(wordIndex, 1, event.target.textContent)
        .join(" ");
        // update the displayed sentence
        targetSentenceContainer.textContent = newSentenceContent;

        console.log(newSentenceContent);
    }

    toggleBtnVisibility(btn) {
        btn.classList.toggle("hidden");
    }

    resetGameInterface() {}
}