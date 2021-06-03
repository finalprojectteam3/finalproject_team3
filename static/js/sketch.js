var options = {
    version: 1,
    alpha: 0.0,
    topk: 3,
  };

// The video
let video;

// For displaying the label
let label = "waiting...";
let Prediction= 0.00;

// The classifier
let selectedOption="Test Model";
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/XQKyP5naQ/';
console.log(selectedOption);
console.log(modelURL);

//Load the model
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json', options);
  console.log(selectedOption);
}

// List of groups (here I have one group per column)
var modelset = ["Test Model", "Own Model"]

// add the options to the button
d3.select("#selectButton")
  .selectAll('myOptions')
   .data(modelset)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button


// When the button is changed, change the link to the dataset
d3.select("#selectButton").on("change", function(d) {
  // recover the option that has been chosen
  selectedOption = d3.select(this).property("value")
  console.log(selectedOption)
  changeUrl(selectedOption)
})

// Function to change the URL of the model set
function changeUrl (selectedOption) {
  label = "waiting...";
  Prediction= 0.00;
  if (selectedOption === "Test Model") {
    modelURL = 'https://teachablemachine.withgoogle.com/models/XQKyP5naQ/';
    preload();
  }else {
    modelURL = 'https://teachablemachine.withgoogle.com/models/tLaj0gCrw/';
    preload();
  }
  console.log(modelURL);
}

function setup() {
  createCanvas(640, 500);
  // Init video
  video = createCapture(VIDEO);
  video.size(48,48);
  video.hide();
  // Start classifying
  classifyVideo();
}

// classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(200);
  // Draw the video
  image(video, 0, 0,300, 300);
  if (selectedOption === "Test Model"){
    filter(GRAY);
  }
  // label
  textSize(32);
  textAlign(CENTER);
  fill('blue');
  text(label, width / 2, height - 100);
  perc= Prediction;
  textSize(32);
  textAlign(CENTER);
  fill('yellow');
  text(Prediction, width / 2, height- 50);
  // Pick an emoji
  let emoji = "";
  if (label === "angry") {
    emoji = "🤬";
  } else if (label === "happy") {
    emoji = "😄";
  } else if (label === "sad") {
    emoji = "😿";
  } else if (label === "disgust") {
    emoji = "🤢";
  } else if (label === "fear") {
    emoji = "😱";
  } else if (label === "neutral") {
    emoji = "🤖";
  } else if (label === "suprised") {
    emoji = "🙀";
  }
   
  // Draw the emoji
  textSize(250);
  text(emoji, 485, height / 2);
}

// Get the classification
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  Prediction=(results[0].confidence*100).toFixed(2);
  /*console.log(Prediction);*/
  classifyVideo();
}
