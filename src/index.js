// to be split into separate modules following ESM and SOLID principles

// necessary imports
import './styles.css'
import magnify from './assets/light-theme-magnify.svg'
import gameData from './gameData.json'
// import theme from './assets/theme-light-dark.svg'

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

// function definitions
function populateDivsWithData(wordGroupDiv, targetSentenceDiv, arrOfRounds, currentRound) {
    // populate empty dom container for target sentence
    const completeSentenceStr = arrOfRounds[currentRound]["missing words"].join("|");
    const missingWordsRegex = new RegExp(completeSentenceStr, "gi");
    targetSentenceDiv.innerHTML = arrOfRounds[currentRound]["complete sentence"].replaceAll(missingWordsRegex, "_");
    
    // populate empty dom container for word group
    const wordGroupContent = arrOfRounds[currentRound]["word group"]
    .map((word) => `<span tabindex="0" class="dummy-word">${word}</span>`);
    const finalContent = arrOfRounds[currentRound]["missing words"].reduce((accumulator, currentValue) => {
        const minIndex = 1;
        const maxIndex = wordGroupContent.length - 1;
        const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1) + minIndex);
        accumulator.splice(randomIndex, 0, `<span tabindex="0" class="target-word">${currentValue}</span>`);
        return accumulator;
    }, wordGroupContent);
    wordGroupDiv.innerHTML = finalContent.join(" ");
}

function findMissingWord(event, targetSentenceDiv, arrOfRounds, currentRound) {
    if (arrOfRounds[currentRound]["missing words"].includes(event.target.innerText)) {

        // would be good to implement a check to see if the clicked word has already been "found", so the replacement doesn't run unnecessarily
        const wordIndex = arrOfRounds[currentRound]["complete sentence"]
        .split(" ")
        .findIndex((word) => word === event.target.innerText);
        
        const currentSentenceContent = targetSentenceDiv.textContent;
        targetSentenceDiv.textContent = currentSentenceContent
        .split(" ")
        .toSpliced(wordIndex, 1, event.target.textContent)
        .join(" ");

        console.log(targetSentenceDiv.textContent.split(" ").toSpliced(wordIndex, 1, event.target.textContent).join(" "));
    }
}

// test function calls
// populateDivsWithData(dummyWordsGroup, targetSentence, gameData, 1);

// wordGroup.addEventListener("click", (event) => {
//   findMissingWord(event, targetSentence, gameData, 1);
// })