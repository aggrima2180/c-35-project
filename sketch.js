var database ;
var balloon;
var bg;
//var height;

function preload(){
  bg = loadImage("background.png")
 bImage = loadImage("balloon.png")

}

function setup() {
  createCanvas(1500,700);
  database = firebase.database();
  balloon=createSprite(250, 500, 100, 100);
  balloon.addImage(bImage)
  balloon.scale= 0.6;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  textSize(20); 

}

function draw() {
  background(bg);  

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
  // balloon.x = balloon.x -10;
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(+10,0);
    //balloon.x = balloon.x +10;
  }
  else if(keyDown(UP_ARROW)){
    balloon.scale=balloon.scale - 0.01;
    updateHeight(0,-10);
   // balloon.y = balloon.y -10;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.scale=balloon.scale + 0.02;
   // balloon.y = balloon.y +10;
  }
  

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}

