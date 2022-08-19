let gridSize = 32;
let canvasWidth = 425;
let pixelSize = canvasWidth / gridSize;
let drawing = false;
let color = "black";
let lastTool = "pencil";

let row = document.createElement('div');
let pixel = document.createElement('div');
let canvas = document.querySelector('#canvas');

function buttonUp(button) {
    button.style.webkitFilter = "brightness(100%)";
    button.style.borderBottom = "2px solid black";
    button.style.borderRight = "2px solid black";
    button.style.borderTop = "2px solid white";
    button.style.borderLeft = "2px solid white";
}
function buttonDown(button) {
    button.style.webkitFilter = "brightness(110%)";
    button.style.borderBottom = "2px solid white";
    button.style.borderRight = "2px solid white";
    button.style.borderTop = "2px solid black";
    button.style.borderLeft = "2px solid black";
}

// color picker
let selectColor = document.querySelector('[type="color"]');
selectColor.value = '#000000';
selectColor.addEventListener('input', (e) => {color = e.target.value});

// tool selection
pencil = document.querySelector('.pencil');
pencil.addEventListener('click', () => {
    lastTool = "pencil";
    buttonDown(pencil);
    buttonUp(rainbow);
    buttonUp(eraser);
});
rainbow = document.querySelector('.rainbow')
rainbow.addEventListener('click', (e) => {
    lastTool = "rainbow";
    buttonDown(rainbow);
    buttonUp(pencil);
    buttonUp(eraser);
});
eraser = document.querySelector('.eraser');
eraser.addEventListener('click', (e) => {
    lastTool = "eraser";
    buttonDown(eraser);
    buttonUp(rainbow);
    buttonUp(pencil);
});


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
function constructCanvas(){
    canvas.innerHTML = "";
    pixelSize = canvasWidth / gridSize;

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
}})};
constructCanvas();

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
function addCanvasListeners() {
    document.querySelectorAll('.pixel').forEach( (node) => {
        node.addEventListener('click', onClick);
        node.addEventListener('mousedown', onDown);
        node.addEventListener('mouseover', onHover);
        node.addEventListener('drag', onDrag);
    });
    document.querySelector('html').addEventListener('mouseup', onUp);
};
addCanvasListeners()

// grid slider
slider = document.querySelector('.slider');
num = document.querySelector('#num');
num.innerHTML = slider.value;
slider.addEventListener('click', () => {
    num.innerHTML = slider.value; 
    gridSize = slider.value; 
    constructCanvas();
    addCanvasListeners();
})

// window hiding 
let tab = document.querySelector('.tab');
let minimize = document.querySelector('#min');
let windowOpen = true;
function windowResize() {
    if (windowOpen === true) {
        document.querySelector('#border').style.opacity = "0";
        document.querySelector('#border').style.transform = "scale(1, 0) ";
        buttonUp(tab);
        windowOpen = false;
    } else {
        document.getElementById('border').style.opacity = "100";
        document.querySelector('#border').style.transform = "scale(1, 1)";
        buttonDown(tab);
        windowOpen = true;
    }
}
tab = document.querySelector('.tab');
tab.addEventListener('click', windowResize);
minimize.addEventListener('click', windowResize);

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