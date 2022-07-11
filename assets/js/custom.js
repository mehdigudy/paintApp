let draw_color = "black";
let drawwidth = "2";
let is_drawing = false;
let startBackgroundColor = '#fff';
let restoreArray = []
let index = -1;
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 60;
canvas.height = 400;

ctx = canvas.getContext('2d');
ctx.fillStyle = startBackgroundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);


const start = (e) => {
    is_drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    // e.preventDefault();
}

const draw = (e) => {
    if (is_drawing) {
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.strokeStyle = draw_color;
        ctx.lineWidth = drawwidth;
        ctx.lineCap = "round";
        ctx.lineWidth = drawwidth;
        ctx.stroke()
    }
}

const stop = (e) => {
    if (is_drawing) {
        ctx.stroke();
        ctx.closePath();
        is_drawing = false;
    }
    if (e.type !== "mouseout") {
        restoreArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

    }
    e.preventDefault()
}
const changeColor = (el) => {
    draw_color = document.defaultView.getComputedStyle(el).backgroundColor

}
const clearCanvas = () => {
    ctx.fillStyle = startBackgroundColor;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    restoreArray = [];
    index = -1;
}

const undoCanvas = () => {
    if (index <= 0) {
        clearCanvas()

    } else {
        index--;
        restoreArray.pop();
        ctx.putImageData(restoreArray[index], 0, 0);
    }
}


canvas.addEventListener("touchstart ", start, false)
canvas.addEventListener("touchmove", draw, false)
canvas.addEventListener("touchend", stop, false)
canvas.addEventListener("mousedown", start, false)
canvas.addEventListener("mousemove", draw, false)
canvas.addEventListener("mouseup", stop, false)
canvas.addEventListener("mouseout", stop, false)



