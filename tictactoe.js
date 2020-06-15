//variables for the board definition

var rows = 3;
var cols = 3;
var rowWidth = 100;
var colWidth = 100;

//X variables
var xLen = 45;

//O variables
var oRad = 45;

//game variables
var move = 1;

/* TO DO:
    record position of mouse clicks
    record what object is in what position
    center x and o in grid space
    reposition game over to be over canvas if possible
    resize canvas
    add start screen where you can choose x or o first

*/

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
    var canvas = document.getElementById("canvas");
    canvas.addEventListener('mousedown', e=>{
        if(move < 10){
            if(move % 2){//if the number of moves is even, let's say for now x's turn
                drawX(e);
                move++;
            }else{
                drawO(e);
                move++;
            }
        }
    });
    canvas.addEventListener("mouseup", e=>{
        if(move > 9){
            document.getElementById("gameover").innerHTML = "Game Over";
        }
    });

    
}

function drawBoard(){
    //draw the lines for the columns
    drawLine(125, 25, 125, 325, 2, "#000000");
    drawLine(225, 25, 225, 325, 2, "#000000");

    //draw the lines for the rows
    drawLine(25, 125, 325, 125, 2, "#000000");
    drawLine(25, 225, 325, 225, 2, "#000000");
}

function drawX(e){
    drawLine(e.offsetX, e.offsetY, e.offsetX - xLen, e.offsetY - xLen, 2, "#000000");
    drawLine(e.offsetX, e.offsetY, e.offsetX - xLen, e.offsetY + xLen, 2, "#000000");
    drawLine(e.offsetX, e.offsetY, e.offsetX + xLen, e.offsetY - xLen, 2, "#000000");
    drawLine(e.offsetX, e.offsetY, e.offsetX + xLen, e.offsetY + xLen, 2, "#000000");
}

function drawO(e){
    drawCircle(oRad, e.offsetX, e.offsetY, "#000000");
}