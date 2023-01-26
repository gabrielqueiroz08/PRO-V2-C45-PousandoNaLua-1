let ground;
let lander;
var lander_img;
var bg_img;
var bg_inicial;


var vx = 0;
var g = 0.05;
var vy = 0;

function preload() {
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  bg_inicial = loadImage("bg_inicial.jpg")
}

function setup() {
  createCanvas(1000, 700);
  frameRate(80);

  lander = createSprite(100, 50, 30, 30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.setCollider("rectangle", 100, 100, 200, 200)

  database = firebase.database();

  form = new Form();
  form.display();


  ground = createSprite(100, 600, 2800, 20)

  rectMode(CENTER);
  textSize(15);
}

function draw() {
  background(51);
  image(bg_inicial, 0,0);
  

  push()
  fill(255);
  text("Você é um astronauta em 2154. Você está em uma missão pára colonizar Saturno,\n" + "porém, no caminho sua nave é interceptada por um buraco de minhoca, que leva \n" + "você e sua nave para um universo alternativo" +
  " : ", 200, 75)
  pop();

  if(keyCode = "C") {
    bg_image();
    push()
    fill(255);
    text("Velocidade Vertical: " + round(vy), 800, 75);
    pop();
  }
  

  //descida
  vy += g;
  lander.position.y += vy;

  drawSprites();
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    up();
    lander.changeAnimation("thrusting");
    thrust.nextFrame();
  }
}

function up() {
  vy = -3
}

function bg_image() {
      image(bg_img, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}