let v;
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

function setupEntities() {
  food = randomCoords();
  poison = randomCoords();
  plotBasicIntersection();
}

function plotBasicIntersection() {}

function setup() {
  createCanvas(640, 360);
  v = new Vehicle(width / 2, height / 2);
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
  v.behaviours(food, poison);

  v.update();
  v.display();
}
