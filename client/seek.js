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

function plotCoords(list) {
  for (var i = 0; i < list.length; i++) {
    list[i].colour === "green" ? fill(255, 0, 0) : fill(0, 0, 255);
    ellipse(list[i].vector.x, list[i].vector.y, 8, 8);
  }
}

function plotBasicIntersection(xStart, xEnd, yStart, yEnd) {
  list = [];
  separation = 10;
  for (var i = xStart; i < xEnd; i += separation) {
    for (var j = yStart; j < yEnd; j += separation) {
      list.push(createVector(i, j));
    }
  }
  return list;
}

function setupEntities() {
  food = randomCoords(0);
  poison = randomCoords(0);

  let z = plotBasicIntersection(0, 650, 0, 75);
  z.forEach(a => poison.push(a));

  z = plotBasicIntersection(500, 650, 150, 360);
  z.forEach(a => poison.push(a));

  z = plotBasicIntersection(0, 430, 150, 500);
  z.forEach(a => poison.push(a));

  z = plotBasicIntersection(0, 650, 80, 150);
  z.forEach(a => food.push(new Food(a, 0.1, "green")));

  z = plotBasicIntersection(430, 500, 150, 370);
  z.forEach(a => food.push(new Food(a, 0.95, "blue")));

  // let z = plotBasicIntersection(0, 640, 0, 75);
  // z.forEach(a => poison.push(a));
}

function setup() {
  createCanvas(640, 360);
  for (var i = 0; i < 50; i++) {
    var y = random(115, 125);
    var x = 0;
    vehicles[i] = new Vehicle(x, y);
  }
  setupEntities();
}
// function addNewFood() {
//   if (random(1) < 0.5) {
//     var y = random(115, 285);
//     var x = random(0, 640);
//     food.push(createVector(x, y));
//   }
// }
function draw() {
  background(0);

  // addNewFood();
  let mouse = createVector(mouseX, mouseY);

  // Mouse
  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 48, 48);

  plotCoords(food);
  // plotCoords(poison, "red");

  // Steering
  for (var i = vehicles.length - 1; i >= 0; i--) {
    vehicles[i].behaviours(food, poison);
    vehicles[i].boundaries();
    vehicles[i].update();
    vehicles[i].display();
    if (vehicles[i].retired()) {
      var x = vehicles[i].position.x;
      var y = vehicles[i].position.y;
      vehicles.splice(i, 1);
    }
  }
}
