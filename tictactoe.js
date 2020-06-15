//variables for the board definition
var rows = 3;
var cols = 3;
var rowWidth = 100;
var colWidth = 100;
var boardOffset = 25;

/*////////////////////////////////////////
			Board Positions
			0 | 1 | 2
			---------
			3 | 4 | 5
			---------
			6 | 7 | 8

	guide for winConditions arr
////////////////////////////////////////*/

//X variables
var xLen = 45;

//O variables
var oRad = 45;

//game variables
var move = 1;
var movePos = new Map();
var win = false;
var winConditions = ["012", "036", "048", "147", "258", "246", "345"];

//variables for testing
var testCondition;

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
		if(move < 10 && win == false){
			if(move % 2){//if the number of moves is even, let's say for now x's turn
				//drawX(e);
				recordMoveandPos(e);
				move++;
			}else{
				//drawO(e);
				recordMoveandPos(e);
				move++;
			}
		}
	});
	canvas.addEventListener("mouseup", e=>{
		testForWin();
		if(move > 9){
			document.getElementById("gameover").innerHTML = "Tie";
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

function drawXOnClickPos(e){
	drawLine(e.offsetX, e.offsetY, e.offsetX - xLen, e.offsetY - xLen, 2, "#000000");
	drawLine(e.offsetX, e.offsetY, e.offsetX - xLen, e.offsetY + xLen, 2, "#000000");
	drawLine(e.offsetX, e.offsetY, e.offsetX + xLen, e.offsetY - xLen, 2, "#000000");
	drawLine(e.offsetX, e.offsetY, e.offsetX + xLen, e.offsetY + xLen, 2, "#000000");
}

function drawOOnClickPos(e){
	drawCircle(oRad, e.offsetX, e.offsetY, "#000000");
}

function drawX(xPos, yPos){
	drawLine(xPos, yPos, xPos - xLen, yPos - xLen, 2, "#000000");
	drawLine(xPos, yPos, xPos - xLen, yPos + xLen, 2, "#000000");
	drawLine(xPos, yPos, xPos + xLen, yPos - xLen, 2, "#000000");
	drawLine(xPos, yPos, xPos + xLen, yPos + xLen, 2, "#000000");
}

function drawO(xPos, yPos){
	drawCircle(oRad, xPos, yPos, "#000000");
}

function recordMoveandPos(e){
	let lastPos = 0
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < cols; j++){
			if(e.offsetX > colWidth * j + boardOffset && e.offsetX < colWidth + colWidth * j + boardOffset){
				if(e.offsetY > rowWidth * i + boardOffset && e.offsetY < rowWidth + rowWidth * i + boardOffset){
					if(move % 2){
						lastPos = i*3+j;
						drawX((((colWidth * j + boardOffset) + (colWidth + colWidth * j + boardOffset)) / 2), (((rowWidth * i + boardOffset) + (rowWidth + rowWidth * i + boardOffset)) / 2));
						movePos.set(lastPos, "X");
					}else{
						lastPos = i*3+j;
						drawO((((colWidth * j + boardOffset) + (colWidth + colWidth * j + boardOffset)) / 2), (((rowWidth * i + boardOffset) + (rowWidth + rowWidth * i + boardOffset)) / 2));
						movePos.set(lastPos, "O");
					}
				}
			}
		}
	}
}

function testForWin(){
	if(move >= 6){
			for(var i = 0; i < winConditions.length; i++){
				testCondition = winConditions[i];
			if(movePos.get(parseInt(testCondition.charAt(0))) != undefined && movePos.get(parseInt(testCondition.charAt(1))) != undefined && movePos.get(parseInt(testCondition.charAt(2))) != undefined){
				if(movePos.get(parseInt(testCondition.charAt(0))) == movePos.get(parseInt(testCondition.charAt(1))) && movePos.get(parseInt(testCondition.charAt(1))) == movePos.get(parseInt(testCondition.charAt(2)))){
					document.getElementById("gameover").innerHTML = movePos.get(parseInt(testCondition.charAt(0))) + " Wins";
					win = true
				}
			}
		}
	}
}