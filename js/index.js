import { canCross } from './algorithm.js';
import { createRiverWithStones } from './river.js';
import { getSelectedStones,updateViewBasedOnFormParams,showInfo} from './params.js';


let currentJumpIndex = 0;
let stones = [0, 1, 3, 5, 6, 8, 12, 17];
let stoneWidth = (4.5 / 100) * window.innerWidth + 10;
let riverWidth = 18;
let position = [];

const urlParams = new URLSearchParams(window.location.search);

const imgOptions = urlParams.get('img-options');

const colorOptions = urlParams.get('color-options');

const image = imgOptions + '-' + colorOptions;

const selectedStonesParam = urlParams.get('stone-options');

if (selectedStonesParam) {
    const selectedStones = getSelectedStones(selectedStonesParam);
    generateRiver(selectedStones);
}
else {
    generateRiver(river);
}

function clearRiver() {
    const riverElements = document.getElementsByClassName('river');
    const riverArray = Array.from(riverElements);

    riverArray.forEach((riverElement) => {
        while (riverElement.firstChild) {
            riverElement.removeChild(riverElement.firstChild);
        }
    });
}

function generateRiver(selectedStones) {
    stones = selectedStones;
    stoneWidth = (4.5 / 100) * window.innerWidth + 10;
    riverWidth = stones[stones.length - 1] - stones[0] + 2;
    position = [];

    const result = canCross(stones, position);

    if (result) {
        position.unshift(stones[stones.length - 1]);
        position = position.slice().reverse();
        clearRiver();

        for (let i = 0; i < position.length; i++) {
            createRiverWithStones(i, stones, riverWidth);
        }

        updateFrogClones(0, 7, image);
    }
}

function updateFrogClones(currentJumpIndex, newLeft, image) {
    const river = document.getElementById('river_' + currentJumpIndex);

    if (river) {
        const clone = document.createElement('div');
        clone.className = 'frog-clone';
        clone.style.backgroundImage = `url('./images/${image}.png')`;
        const relativeTop = river.offsetTop;
        const relativetTopp = relativeTop - 10;
        clone.style.left = newLeft + 'px';
        clone.style.top = relativetTopp + 'px';
        river.appendChild(clone);
    } else {
        console.error('River not found for id: ' + currentJumpIndex);
    }
}

function jumpFrog() {
    if (currentJumpIndex <= position.length - 1) {
        const newPosition = position[currentJumpIndex];

        if (newPosition >= 0 && newPosition < riverWidth) {
            const newLeft = (newPosition * stoneWidth) + 4;
            updateFrogClones(currentJumpIndex, newLeft, image);
            currentJumpIndex++;
        } else {
            currentJumpIndex++;
            alert("Invalid jump position!");
        }
        
    } else {
        currentJumpIndex++;
        console.log('landed');
        document.getElementById('popup').style.display = 'block';
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' && currentJumpIndex <= position.length) {
        jumpFrog();
    }
});

document.addEventListener('wheel', (event) => {
    console.log('Wheel event triggered');
    if (event.deltaY > 0 && currentJumpIndex < position.length) {
        jumpFrog();
    }
});


window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search);
    document.getElementById('stone-options').value = urlParams.get('stone-options');
    document.getElementById('fill-options').value = urlParams.get('fill-options');
    document.getElementById('img-options').value = urlParams.get('img-options');
    document.getElementById('color-options').value = urlParams.get('color-options');
    document.getElementById('space-options').value = urlParams.get('space-options');
showInfo();
    updateViewBasedOnFormParams();

}