let socket = io.connect("/");

let prev = {};
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let pointerContainer = document.getElementById("pointers");
let pointer = document.createElement("div");pointer.setAttribute("class", "pointer");
let drawing = false;let clients = {};
let pointers = {};
function drawLine(fromx, fromy, tox, toy) {
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);  context.stroke();
}
function now(){
    return new Date().getTime();
}
let lastEmit = now();

canvas.onmouseup = 
    canvas.onmousemove = 
    canvas.onmousedown = 
        function(e) {
            switch(e.type) {
                case "mouseup":
                    drawing = false;
                    break;
                case "mousemove":
                    if(now() - lastEmit > 50) {
                        socket.emit('mousemove', {'x' : e.pageX, 'y' : e.pageY, 'drawing' : drawing});
                        lastEmit = now();
                    }
                    if(drawing) {
                        drawLine(prev.x, prev.y, e.pageX, e.pageY);
                        rev.x = e.pageX;        prev.y = e.pageY;
                    }
                    break;
                case "mousedown":
                    drawing = true;
                    prev.x = e.page.X;
                    prev.y = e.page.Y;
                    break;
                default:
                    break;
            };
        };