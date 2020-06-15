//variables for the board definition

var rows = 3;
var cols = 3;
var rowWidth = 100;
var colWidth = 100;

//X variables


//O variables


function drawCircle(rad, xPos, yPos, color){
    let canvas = document.getElementById('canvas');
    if (canvas.getContext){
        let ctx = canvas.getContext('2d'); 
        ctx.beginPath();
        ctx.arc(xPos, yPos, rad, 0, 2 * Math.PI, false);
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.moveTo(0,0);
    }
}

function drawLine(sX, sY, eX, eY, width, color){
    let canvas = document.getElementById('canvas');
    if (canvas.getContext){
        let ctx = canvas.getContext('2d'); 
        
        ctx.beginPath();
        ctx.moveTo(sX, sY);
        ctx.lineTo(eX, eY);
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.moveTo(0,0);
    }
}

function start(){
    draw();
    drawBoard();
}

function draw(){

}

function drawBoard(){
    //draw the lines for the columns
    drawLine(100, 0, 100, 300, 2, "#000000");
    drawLine(200, 0, 200, 300, 2, "#000000");

    //draw the lines for the rows
    drawLine(0, 100, 300, 100, 2, "#000000");
    drawLine(0, 200, 300, 200, 2, "#000000");
}