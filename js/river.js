
export function createRiverWithStones(frogPosition, stones, riverWidth) {
    const newRiver = river.cloneNode(true);
    newRiver.innerHTML = "";


    for (let i = 0; i < riverWidth; i++) {
        const unit = document.createElement("div");
        if (stones.includes(i)) {
            unit.className = "stone";
            unit.style.backgroundImage = "url('./images/stone.png')";
        } else {
            unit.className = "empty-space";
        }


        newRiver.appendChild(unit);
    }

    newRiver.id = "river_" + frogPosition;

    document.body.appendChild(newRiver);

    console.log(newRiver.id);
}

