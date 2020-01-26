let vehicles = [];
var food = [];
var poison = [];

function randomCoords(num) {
  list = [];
  for (var i = 0; i < num; i++) {
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

function plotBasicIntersection(yPos, xPos) {
  list = [];
  separation = 10;
  for (var i = 0; i < 640; i += separation) {
    var x = i;
    if (xPos) list.push(createVector(xPos, yPos));
    else list.push(createVector(x, yPos));
  }
  return list;
}

function setupEntities() {
  food = randomCoords(0);
  poison = randomCoords(0);

  for (var j = 0; j < 100; j += 10) {
    const z = plotBasicIntersection(j);
    z.forEach(a => poison.push(a));
  }

  for (var j = 110; j < 290; j += 10) {
    const z = plotBasicIntersection(j, 635);
    z.forEach(a => food.push(a));
  }

  for (var j = 300; j < 640; j += 10) {
    const z = plotBasicIntersection(j);
    z.forEach(a => poison.push(a));
  }
}

function setup() {
  createCanvas(640, 360);
  for (var i = 0; i < 10; i++) {
    var y = random(115, 285);
    var x = 0;
    vehicles[i] = new Vehicle(x, y);
  }
  setupEntities();
}
function addNewFood() {
  if (random(1) < 0.5) {
    var y = random(115, 285);
    var x = random(0, 640);
    food.push(createVector(x, y));
  }
}
function draw() {
  background(0);

  // addNewFood();
  let mouse = createVector(mouseX, mouseY);

  // Mouse
  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 48, 48);

  plotCoords(food, "green");
  plotCoords(poison, "red");

  // Steering
  for (var i = vehicles.length - 1; i >= 0; i--) {
    vehicles[i].behaviours(food, poison);
    vehicles[i].boundaries();
    vehicles[i].update();
    vehicles[i].display();
    var newVehicle = vehicles[i].reproduce();
    if (newVehicle != null) {
      vehicles.push(newVehicle);
    }
    if (vehicles[i].retired()) {
      var x = vehicles[i].position.x;
      var y = vehicles[i].position.y;
      vehicles.splice(i, 1);
    }
  }
}
