let vehicles = [];
var food = [];
var poison = [];

function randomCoords() {
  list = [];
  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    list.push(createVector(x, y));
  }
  return list;
}
function plotCoords(list, colour) {
  for (var i = 0; i < list.length; i++) {
    colour == "red" ? fill(255, 0, 0) : fill(0, 255, 0);
    ellipse(list[i].x, list[i].y, 8, 8);
  }
}

function plotBasicIntersection() {
  list = [];
  separation = 10;
  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    list.push(createVector(x, y));
  }
  return list;
}

function setupEntities() {
  food = randomCoords();
  poison = plotBasicIntersection();
}

function setup() {
  createCanvas(640, 360);
  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    vehicles[i] = new Vehicle(x,y);
  }
  setupEntities();
}

function draw() {
  background(0);

  let mouse = createVector(mouseX, mouseY);

  // Mouse
  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 48, 48);

  plotCoords(food, "green");
  plotCoords(poison, "red");

  // Steering
  for (var i = 0; i < 10; i++) {
    vehicles[i].behaviours(food, poison);
    vehicles[i].update();
    vehicles[i].display();
  }
  
}
