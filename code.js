let gridSize = 64;
let pixelSize = (550) / gridSize;
let drawing = false;
let color = "black";


let row = document.createElement('div');
let pixel = document.createElement('div');
let canvas = document.querySelector('#canvas');


function onClick(e) {
    e.currentTarget.style.backgroundColor = "black";

};
function onDown(e) {
    e.currentTarget.style.backgroundColor = "black";
    drawing = true;
};

function onHover(e) {
    if (drawing === true) {
        e.currentTarget.style.backgroundColor = "black";
}};
function onUp() {
    drawing = false;
};
function onDrag() {
    drawing = true;
};


for (i=0; i<gridSize; i++) {
    row.className = "row";
    // row.setAttribute("draggable", false);
    canvas.appendChild(row.cloneNode(true));
}

// function draw(child, parent) {
//     varToString = Object.keys({child})[0];
//     for (i=0; i<gridSize; i++) {
//         child.className = `${varToString}`;
//         parent.appendChild(child.cloneNode(true));
//     }
// }

allRows = document.querySelectorAll('.row');
allRows.forEach((node) => {
    for (i=0; i<gridSize; i++) {
        pixel.className = "pixel";
        pixel.style.minHeight = `${pixelSize}px`; 
        pixel.style.minWidth = `${pixelSize}px`; 
        pixel.style.maxHeight = `${pixelSize}px`; 
        pixel.style.maxWidth = `${pixelSize}px`;
        // pixel.setAttribute("draggable", false);
        node.appendChild(pixel.cloneNode(true));
}});

document.querySelectorAll('.pixel').forEach( (node) => {
    node.addEventListener('click', onClick);
    node.addEventListener('mousedown', onDown);
    node.addEventListener('mouseover', onHover);
    node.addEventListener('drag', onDrag);
});
document.querySelector('html').addEventListener('mouseup', onUp);


// // row.appendChild(pixel.cloneNode(true));
// canvas.appendChild(row.cloneNode(true));
// row.appendChild(pixel.cloneNode(true));