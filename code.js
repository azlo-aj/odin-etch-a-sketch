let gridSize = 64;
let pixelSize = (550) / gridSize;
let drawing = false;
let color = "black";
let lastTool = "pencil";


let row = document.createElement('div');
let pixel = document.createElement('div');
let canvas = document.querySelector('#canvas');

function getColor() {
    if (lastTool === "eraser") {
        return "white";
    } else if (lastTool === "rainbow") {
        return `rgba(${Math.round(Math.random()*255)}, 
                    ${Math.round(Math.random()*255)}, 
                    ${Math.round(Math.random()*255, 1)})`;
    } else {
        return color;
    }
}

function onClick(e) {
    e.currentTarget.style.backgroundColor = getColor();

};
function onDown(e) {
    e.currentTarget.style.backgroundColor = getColor();
    drawing = true;
};

function onHover(e) {
    if (drawing === true) {
        e.currentTarget.style.backgroundColor = getColor();
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

document.querySelector('#pencil').addEventListener('click', () => {lastTool = "pencil"});
document.querySelector('#rainbow').addEventListener('click', () => {lastTool = "rainbow"});
document.querySelector('#eraser').addEventListener('click', () => {lastTool = "eraser"});


// clock
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    if (h > 12) {
        h -= 12;
    }
    document.getElementById('clock').innerHTML =  h + ":" + m;
    setTimeout(startTime, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}