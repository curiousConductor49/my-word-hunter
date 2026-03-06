// to be split into separate modules following ESM and SOLID principles

// necessary imports
import './styles.css'
import magnify from './assets/magnify.svg'
import theme from './assets/theme-light-dark.svg'

// game data array
const gameDataArr = [
    {
        "complete sentence": "Happiness can be found in the depths of chocolate pudding",
        "missing words": ["happiness", "found", "depths", "pudding"],
        "word group": ["Duis", "ac", "velit", "ac", "dui", "bibendum", "rhoncus", "eu", "nec", "urna"],
    },
    {
        "complete sentence": "The fish listened intently to what the frogs had to say",
        "missing words": ["fish", "what", "frogs", "say"],
        "word group": ["Praesent", "eget", "elementum", "risus", "nec", "condimentum", "sapien", "Praesent", "dignissim", "augue"],
    },
    {
        "complete sentence": "She dreamed of leaving her law firm to open a portable dog wash",
        "missing words": ["dreamed", "law", "portable", "wash"],
        "word group": ["Duis", "ut", "magna", "vitae", "diam", "feugiat", "auctor", "vel", "et", "turpis"],
    },
    {
        "complete sentence": "He was sitting in a trash can with high street class",
        "missing words": ["sitting", "trash", "high", "class"],
        "word group": ["In", "rhoncus", "sapien", "a", "mattis", "imperdiet", "erat", "dui", "tincidunt", "magna"],
    },
    {
        "complete sentence": "The bug was having an excellent day until it hit the windshield",
        "missing words": ["bug", "excellent", "hit", "windshield"],
        "word group": ["Ut", "finibus", "tincidunt", "lorem", "sed","faucibus", "Donec", "luctus", "feugiat", "enim"],
    }
]

// main index.js content
document.querySelector('#game-interface').innerHTML = `
  <h1>Word Hunter</h1>
  <p id="game-tagline">Hunt the words, complete the sentence!</p>

  <div role="region" id="target-sentence" aria-live="polite"></div>
  <div id="word-group"></div>
  
  <button id="play-game-round-btn">Play</button>

  <dialog class="game-round-completion-box"></dialog>
`

// some conditional logic here for the modal
// depending on game round (aka last round or not), content of dialog box will be either
/* <form>
  <p id="end-of-round-choice">Would you like to quit or play another round?</p>
  <div id="round-choices">
    <label for="yes"><input type="radio" id="yes" value="yes" name="choice">Yes</label>
    <label for="no"><input type="radio" id="no" value="no" name="choice">No</label>
  </div>
</form>
OR
<p id="end-of-game-message">Congratulations, you completed all the rounds!</p>
<button class="return-to-start-btn">Return to start</button> */

// a light/dark theme toggle
// <div id="toggle-theme"><img id="theme-icon" src=${theme} alt="A sun and crescent moon divided by a diagonal line" width="50px" height="50px"></div>

// dom elements
const gameTagline = document.querySelector("#game-tagline");
const targetSentence = document.querySelector("#target-sentence");
const wordGroup = document.querySelector("#word-group");
const playGameRndBtn =  document.querySelector("#play-game-round-btn");
const gameRoundCompletionBox = document.querySelector("#game-round-completion-box");

// function definitions
function populateDivsWithData(wordGroupDiv, targetSentenceDiv, arrOfRounds, currentRound) {
    // populate empty dom container for target sentence
    const completeSentenceStr = arrOfRounds[currentRound]["missing words"].join("|");
    const missingWordsRegex = new RegExp(completeSentenceStr, "gi");
    targetSentenceDiv.innerHTML = arrOfRounds[currentRound]["complete sentence"].replaceAll(missingWordsRegex, "_");
    
    // populate empty dom container for word group
    const wordGroupContent = arrOfRounds[currentRound]["word group"]
    .map((word) => `<span tabindex="0" class="word-group-item">${word}</span>`);
    const finalContent = arrOfRounds[currentRound]["missing words"].reduce((accumulator, currentValue) => {
        const minIndex = 1;
        const maxIndex = wordGroupContent.length - 1;
        const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1) + minIndex);
        accumulator.splice(randomIndex, 0, `<span tabindex="0" class="word-group-item">${currentValue}</span>`);
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
// populateDivsWithData(wordGroup, targetSentence, gameDataArr, 1);

// wordGroup.addEventListener("click", (event) => {
//   findMissingWord(event, targetSentence, gameDataArr, 1);
// })

// floating pseudocode
// Use a counter to track the rounds of the game, incremented per round via a loop that walks over the array of objects. Inside each iteration, call the populating function and the click checker function and pass them the appropriate parameters for that round.

// For each iteration, if the round is completed (i.e. all missing words have been found) and the loop index is NOT one less than the array length...
  // Display a modal telling the user they’ve won the round and provide them w/ 2 choices:
    // - end the game (if so, then close the modal, remove the event listeners, and clear the divs, essentially restoring things back to how they were prior to the play button click) OR
    // - continue to the next round (if so, then close the modal, and proceed as normal to the next loop iteration)
// Else if the round is complete and the index counter IS one less than the array length
  // Display a different modal to inform the user they’ve completed all the rounds, with the singular button option to return to the start
  // When the button is clicked, empty the divs and make the start-to-play button's clickable and visible again