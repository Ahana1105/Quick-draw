var draw_score= 0;
var draw_timer= 0;
var timer_check="";
var answer_holder="";
var drawn_sketch ="";

function setup() {
    canvas = createCanvas(280, 240)
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}


function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function clear_canvas() {
    background("white");
    random_number=Math.floor((Math.random() * quick_draw_data_set[random_number]))
    sketch="quick_draw_data_set[random_number];"
    document.getElementById('sketch_drawn').innerHTML = 'Sketch To be Drawn: ' + sketch;
}


function draw() {
    strokeWeight(10);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}
function gotResult(error, results) {
    if (error) {
      console.error(error);
    }
    console.log(results);
    drawn_sketch = results[0].label;
    document.getElementById('your_sketch').innerHTML = 'Your Sketch: ' + drawn_sketch;
  
    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';
  }

 



function check_sketch()
{
  draw_timer++;
  document.getElementById('timer').innerHTML = 'Timer: ' + draw_timer;
  console.log(draw_timer)
  if(draw_timer > 400)
    {
      draw_timer = 0;
      timer_check = "completed"
    }
    if(timer_check =="completed" || answer_holder == "set")
    {
      timer_check = "";
      answer_holder = "";
      updateCanvas();
    }

}


