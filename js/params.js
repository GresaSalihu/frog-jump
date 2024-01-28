const urlParams = new URLSearchParams(window.location.search);
const imgOptions = urlParams.get('img-options');
const colorOptions = urlParams.get('color-options');
const image = imgOptions + '-' + colorOptions;

export function getSelectedStones(optionValue) {
    switch (optionValue) {
        case 'stones1':
            return [0, 1, 3, 5, 6, 8, 12, 17];
        case 'stones2':
            return [0, 1, 2, 3, 6, 10, 12, 14, 17];
        case 'stones3':
            return [0, 1, 3, 6, 8, 11, 15, 18];
        default:
            return [];
    }
}

export function showInfo() {
    var infoPopup = document.getElementById('info');
    infoPopup.style.display = 'block';
}

export function updateViewBasedOnFormParams() {

    const fillOptions = urlParams.get('fill-options');
    const spaceOptions = urlParams.get('space-options');

    if (imgOptions) {
        if (colorOptions) {
            const frogElements = document.querySelectorAll('.frog');
            frogElements.forEach((frog) => {
                frog.style.backgroundImage = `url('./images/${image}.png')`;
            });

        }
        if (fillOptions) {
            const stoneElements = document.querySelectorAll('.stone');
            stoneElements.forEach((stone) => {
                stone.style.backgroundImage = `url('./images/${fillOptions}.png')`;
            });
        }
        if (spaceOptions) {
            const emptyElements = document.querySelectorAll('.empty-space');
            switch (spaceOptions) {
                case 'leaf':
                    emptyElements.forEach((element) => {
                        element.style.width = '4.5%';
                        element.style.height = '300px';
                        element.style.backgroundImage = `url('./images/leaf.png')`;
                        element.style.backgroundSize = 'contain';
                        element.style.backgroundRepeat = 'no-repeat';
                        element.style.backgroundPosition = 'center center';
                        element.style.display = 'inline-block';
                        element.style.marginRight = '10px';
                    });
                    break;
                case 'bright-color':
                emptyElements.forEach((element) => {
                    element.style.width = '4.5%';
                    element.style.height = '80px';
                    element.style.backgroundColor = 'rgb(40, 138, 204)';
                    element.style.backgroundSize = 'contain';
                    element.style.backgroundRepeat = 'no-repeat';
                    element.style.backgroundPosition = 'center center';
                    element.style.display = 'inline-block';
                    element.style.marginRight = '10px';
                    element.style.marginBottom = '100px';

                });
                    break;
        
                case 'darker-color':
                    emptyElements.forEach((element) => {
                        element.style.width = '4.5%';
                        element.style.height = '80px';
                        element.style.backgroundColor = 'rgb(27, 101, 151)';
                        element.style.backgroundSize = 'contain';
                        element.style.backgroundRepeat = 'no-repeat';
                        element.style.backgroundPosition = 'center center';
                        element.style.display = 'inline-block';
                        element.style.marginRight = '10px';
                        element.style.marginBottom = '100px';
                    });
                    break;
                default:
                    emptyElements.forEach((element) => {
                        element.style.width = '4.5%';
                        element.style.height = '80px';
                        element.style.backgroundColor = 'rgb(156, 208, 243)';
                        element.style.backgroundSize = 'contain';
                        element.style.backgroundRepeat = 'no-repeat';
                        element.style.backgroundPosition = 'center center';
                        element.style.display = 'inline-block';
                        element.style.marginRight = '10px';
                        element.style.marginBottom = '100px';
                    });
            }
        }
    }
}