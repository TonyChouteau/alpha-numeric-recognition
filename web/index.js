//====================================================
// Define
//====================================================

//import fileList from "../dataListener/data";

const PATH = "";

let imgs = [];
const config = {
	hiddenLayers: [100,20], // array of ints for the sizes of the hidden layers in the network
};
const net = new brain.NeuralNetwork(config);
const size = 15;
const iter = 1000;

let graphicScreen = null;
let last = null;

//====================================================
// Functions
//====================================================

//

//====================================================
// Events Handlers
//====================================================

//

//====================================================
// Main
//====================================================

// let smallImgs = [];
// let pixels = [];

function preload(){
	for (let i in fileList){
		imgs.push(loadImage(PATH+fileList[i]));
	}
}

function setup(){
	createCanvas(900,900);
	background(0);

	graphicScreen = createGraphics(900,900);
	
	// for (let i in fileList){
	// 	//smallImgs.push(createGraphics(50,50));
	// 	//smallImgs[i].background(imgs[i]);
	// }

	//image(smallImgs[0], 0, 0, width, height);

	let trainingDatas = [];

	for (let i=0; i<fileList.length; i++){
		console.log("Training with "+fileList[i]+" => "+fileList[i][0])
		let p = createGraphics(size,size);
		p.background(imgs[i]);
		p.loadPixels();

		let out = {
			0:0,
			1:0,
			2:0,
			3:0,
			4:0,
			5:0,
			6:0,
			7:0,
			8:0,
			9:0,
		}
		out[fileList[i][0]] = 1;
		//console.log(out);

		trainingDatas.push({
			input: p.pixels,
			output: out
		});
	}

	console.log("Loading Done");

	console.log(trainingDatas);

	net.train(trainingDatas, {
		iterations: iter,
		log: detail => console.log(detail)
	});

	console.log("done");
	const json = net.toJSON();
	console.log(json);

	for (let i=0; i<fileList.length; i+=parseInt(fileList.length/10)){

		let n = createGraphics(size,size);
		n.background(imgs[i]);
		n.loadPixels();

		console.log("Current : "+ fileList[i][0])
		
		let result = net.run(n.pixels);
		console.log("Result : ");
		console.log(result);

		result = brain.likely(n.pixels, net);
		console.log("Result : "+result);
	}
}


function mousePressed(){
	if (mouseButton != "left"){
		graphicScreen.background(0);
		lastPoint = null;
	}
  }

function mouseDragged(){
	if (last == null){
		last = createVector(mouseX, mouseY);
	}
	
	let current = createVector(mouseX, mouseY);

	graphicScreen.strokeWeight(100);
	graphicScreen.stroke(255);
	graphicScreen.line(last.x, last.y, current.x, current.y);

	last = current;
}

function mouseReleased(){
	last = null;
}

function keyPressed(){

	if (keyCode === 27){
		graphicScreen.background(0);
		lastPoint = null;
		return;
	}

	lastPoint = null;
	
	let n = createGraphics(size,size);
	
	n.image(graphicScreen, 0, 0, n.width, n.height);
	
	n.loadPixels();
	
	let result = net.run(n.pixels);
	console.log("Result : ");
	console.log(result);

	result = brain.likely(n.pixels, net);
	console.log("Result : "+result);
}

function draw(){
	image(graphicScreen, 0, 0, width, height);
}

//====================================================
// End
//====================================================