let gridSize = 64;
let pixelSize = (425) / gridSize;
let drawing = false;
let color = "black";
let lastTool = "pencil";

let row = document.createElement('div');
let pixel = document.createElement('div');
let canvas = document.querySelector('#canvas');



// color picker
let selectColor = document.querySelector('[type="color"]');
selectColor.value = 'black'
selectColor.addEventListener('input', (e) => {color = e.target.value});

// tool selection
document.querySelector('#pencil').addEventListener('click', () => {lastTool = "pencil"});
document.querySelector('#rainbow').addEventListener('click', () => {lastTool = "rainbow"});
document.querySelector('#eraser').addEventListener('click', () => {lastTool = "eraser"});

// determine color based on active tool
function getColor() {
    if (lastTool === "eraser") {
        return "white";
    } else if (lastTool === "rainbow") {
        return `rgba(${Math.round(Math.random()*255)}, 
                    ${Math.round(Math.random()*255)}, 
                    ${Math.round(Math.random()*255)}, 1)`;
    } else {
        return color;
    }
}

// canvas grid construction
for (i=0; i<gridSize; i++) {
    row.className = "row";
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

// canvas drawing
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
document.querySelectorAll('.pixel').forEach( (node) => {
    node.addEventListener('click', onClick);
    node.addEventListener('mousedown', onDown);
    node.addEventListener('mouseover', onHover);
    node.addEventListener('drag', onDrag);
});
document.querySelector('html').addEventListener('mouseup', onUp);

// window hiding via taskbar
let tab = document.querySelector('.tab');
let windowOpen = true;
function windowResize() {
    if (windowOpen === true) {
        document.querySelector('#border').style.opacity = "0";
        document.querySelector('#border').style.transform = "scale(1, 0) ";
        tab.style.webkitFilter = "brightness(100%)";
        tab.style.borderBottom = "2px solid black";
        tab.style.borderRight = "2px solid black";
        tab.style.borderTop = "2px solid white";
        tab.style.borderLeft = "2px solid white";
        windowOpen = false;
    } else {
        document.getElementById('border').style.opacity = "100";
        document.querySelector('#border').style.transform = "scale(1, 1)";
        tab.style.webkitFilter = "";
        tab.style.borderBottom = "";
        tab.style.borderRight = "";
        tab.style.borderTop = "";
        tab.style.borderLeft = "";
        windowOpen = true;
    }
}
tab = document.querySelector('.tab');
tab.addEventListener('click', windowResize);


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