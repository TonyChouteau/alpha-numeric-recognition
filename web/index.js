//====================================================
// Define
//====================================================

/*
([0-9].*.png)
"$1",
*/

let fileList = [
	"0_2020-6-15-2-26-33-3155.png",
	"0_2020-6-15-2-26-52-21522.png",
	"0_2020-6-15-2-27-10-39482.png",
	"0_2020-6-15-2-27-31-60903.png",
	"0_2020-6-15-3-5-53-8242.png",
	"0_2020-6-15-3-6-57-2251.png",
	"0_2020-6-15-3-7-10-15387.png",
	"1_2020-6-15-2-26-35-4628.png",
	"1_2020-6-15-2-26-53-22627.png",
	"1_2020-6-15-2-27-11-40555.png",
	"1_2020-6-15-2-27-32-61844.png",
	"1_2020-6-15-3-6-59-4339.png",
	"1_2020-6-15-3-7-11-16385.png",
	"1_2020-6-15-3-7-32-36469.png",
	"2_2020-6-15-2-26-36-5985.png",
	"2_2020-6-15-2-26-54-23748.png",
	"2_2020-6-15-2-27-12-41674.png",
	"2_2020-6-15-2-27-33-62929.png",
	"2_2020-6-15-3-7-1-5468.png",
	"2_2020-6-15-3-7-12-17394.png",
	"2_2020-6-15-3-7-32-37380.png",
	"3_2020-6-15-2-26-37-7274.png",
	"3_2020-6-15-2-26-55-24769.png",
	"3_2020-6-15-2-27-13-42829.png",
	"3_2020-6-15-2-27-34-63966.png",
	"3_2020-6-15-3-7-13-18261.png",
	"3_2020-6-15-3-7-2-6495.png",
	"3_2020-6-15-3-7-33-38237.png",
	"4_2020-6-15-2-26-39-8693.png",
	"4_2020-6-15-2-26-56-26373.png",
	"4_2020-6-15-2-27-14-44131.png",
	"4_2020-6-15-2-27-35-65221.png",
	"4_2020-6-15-3-7-14-19259 - Copie.png",
	"4_2020-6-15-3-7-14-19259.png",
	"4_2020-6-15-3-7-3-7764.png",
	"5_2020-6-15-2-26-40-9963.png",
	"5_2020-6-15-2-26-58-27946.png",
	"5_2020-6-15-2-27-23-53017.png",
	"5_2020-6-15-2-27-36-66324.png",
	"5_2020-6-15-3-7-15-20325.png",
	"5_2020-6-15-3-7-4-8944 - Copie.png",
	"5_2020-6-15-3-7-4-8944.png",
	"6_2020-6-15-2-26-41-11317.png",
	"6_2020-6-15-2-27-2-31984.png",
	"6_2020-6-15-2-27-25-54639.png",
	"6_2020-6-15-2-27-38-67528.png",
	"6_2020-6-15-3-7-20-24598.png",
	"6_2020-6-15-3-7-36-41364 - Copie.png",
	"6_2020-6-15-3-7-5-9955.png",
	"7_2020-6-15-2-26-44-13622.png",
	"7_2020-6-15-2-27-27-57111 - Copie.png",
	"7_2020-6-15-2-27-27-57111.png",
	"7_2020-6-15-2-27-40-69768.png",
	"7_2020-6-15-2-27-5-34689.png",
	"7_2020-6-15-3-7-24-28876.png",
	"7_2020-6-15-3-7-6-11388.png",
	"8_2020-6-15-2-27-29-58492 - Copie.png",
	"8_2020-6-15-2-27-29-58492.png",
	"8_2020-6-15-2-27-6-36291.png",
	"8_2020-6-15-3-7-25-30036 - Copie - Copie (2).png",
	"8_2020-6-15-3-7-25-30036 - Copie - Copie.png",
	"8_2020-6-15-3-7-25-30036 - Copie.png",
	"8_2020-6-15-3-7-8-12713.png",
	"9_2020-6-15-3-20-19-34506.png",
	"9_2020-6-15-3-20-32-48037.png",
	"9_2020-6-15-3-20-7-22638.png",
	"9_2020-6-15-3-7-40-44859.png",
	"9_2020-6-15-3-7-58-62433.png",
	"9_2020-6-15-3-8-13-77472.png",
	"9_2020-6-15-3-8-24-88587.png",
	];

const PATH = "./processed-images/";

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

	//console.log(trainingDatas);

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