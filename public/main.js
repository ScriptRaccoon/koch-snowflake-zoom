const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function adjustCanvas() {
    canvas.width = 0.95 * window.innerWidth;
    canvas.height = 0.95 * window.innerHeight;
    ctx.translate(0, canvas.height);
}

adjustCanvas();

window.addEventListener("resize", adjustCanvas);

let scale = 1;
let depth = 6;
const speed = 1.008;

drawLoop();

function drawLoop() {
    ctx.clearRect(0, -canvas.height, canvas.width, canvas.height);
    drawFlake(0, 0, canvas.width * scale, depth);
    scale *= speed;
    if (scale >= 3) {
        scale = 1;
    }
    requestAnimationFrame(drawLoop);
}

function drawFlake(x, y, size, iteration) {
    if (iteration == 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.stroke();
        ctx.closePath();
    } else {
        ctx.save();
        ctx.translate(x, y);
        drawFlake(0, 0, size / 3, iteration - 1);
        ctx.translate(size / 3, 0);
        ctx.rotate(-Math.PI / 3);
        drawFlake(0, 0, size / 3, iteration - 1);
        ctx.translate(size / 3, 0);
        ctx.rotate((2 * Math.PI) / 3);
        drawFlake(0, 0, size / 3, iteration - 1);
        ctx.translate(size / 3, 0);
        ctx.rotate(-Math.PI / 3);
        drawFlake(0, 0, size / 3, iteration - 1);
        ctx.restore();
    }
}
