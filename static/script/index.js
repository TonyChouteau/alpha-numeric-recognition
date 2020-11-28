const pointSize = 70; //px
let lastPoint = undefined;

const SIZE = 700;
let BACKGROUND_COLOR = 0;
let DRAWING_COLOR = 255;

function setup() {
	let canvas = createCanvas(SIZE, SIZE);
	canvas.parent("canvas_container");
	background(BACKGROUND_COLOR);
	frameRate(120);
	noLoop();
	fill(DRAWING_COLOR);

	initMatrix();
}

function initMatrix() {
	for (let i = 0; i < G_MATRIX_SIZE; i++) {
		let line = [];
		for (let j = 0; j < G_MATRIX_SIZE; j++) {
			line.push(0);
		}
		g_matrix.push(line);
	}
}

function resetMatrixValues() {
	for (let i = 0; i < G_MATRIX_SIZE; i++) {
		for (let j = 0; j < G_MATRIX_SIZE; j++) {
			g_matrix[i][j] = 0;
		}
	}
}

function mouseReleased() {
	lastPoint = undefined;
	g_isDrawing = false;
	g_refreshPrediction();
}

function drawInMatrix(x, y) {
	let x_index = Math.floor(x/25);
	let y_index = Math.floor(y/25);

	g_matrix[y_index][x_index] = 1;

	g_matrix[y_index+1][x_index] = min(1, g_matrix[y_index+1][x_index]+0.6);
	g_matrix[y_index][x_index+1] = min(1, g_matrix[y_index][x_index+1]+0.6);
	g_matrix[y_index-1][x_index] = min(1, g_matrix[y_index-1][x_index]+0.6);
	g_matrix[y_index][x_index-1] = min(1, g_matrix[y_index][x_index-1]+0.6); 
	
	g_matrix[y_index+1][x_index+1] = min(1, g_matrix[y_index+1][x_index+1]+0.2);
	g_matrix[y_index+1][x_index-1] = min(1, g_matrix[y_index+1][x_index-1]+0.2); 
	g_matrix[y_index-1][x_index+1] = min(1, g_matrix[y_index-1][x_index+1]+0.2);
	g_matrix[y_index-1][x_index-1] = min(1, g_matrix[y_index-1][x_index-1]+0.2);
}

function mousePressed() {
	noStroke();
	ellipse(mouseX, mouseY, pointSize, pointSize);
	drawInMatrix(mouseX, mouseY);
}

function keyPressed() {
	resetMatrixValues();
	background(BACKGROUND_COLOR);
}

function mouseDragged() {
	if (lastPoint) {
		stroke(DRAWING_COLOR);
		strokeWeight(pointSize);
		line(lastPoint.x, lastPoint.y, mouseX, mouseY);
	}
	lastPoint = {
		x: mouseX, 
		y: mouseY 
	};
	g_isDrawing = true;

	drawInMatrix(mouseX, mouseY);
}

function draw() {
	/*const cell = SIZE/G_MATRIX_SIZE;
	for (let i = 0; i < G_MATRIX_SIZE; i++) {
		for (let j = 0; j < G_MATRIX_SIZE; j++) {
			fill(g_matrix[i][j]*255);
			noStroke();
			rect(cell*j, cell*i, cell, cell);
		}
	}*/
}
