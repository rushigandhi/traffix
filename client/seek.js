let vehicles = [];
var points = [];
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

function plotCoords(list, c) {
  for (var i = 0; i < list.length; i++) {
    var pathColor = lerpColor(c, color(255, 255, 255), list[i].strength);
    fill(pathColor);
    ellipse(list[i].vector.x, list[i].vector.y, 8, 8);
  }
}

function plotBasicIntersection(xStart, xEnd, yStart, yEnd) {
  var list = [];
  var separation = 10;
  for (var i = xStart; i < xEnd; i += separation) {
    for (var j = yStart; j < yEnd; j += separation) {
      list.push(createVector(i, j));
    }
  }
  return list;
}

function applyGradient(list, xStart, xEnd, yStart, yEnd, orientation) {
  var separation = 10;
  if (orientation == "horizontal") {
    for (var i = xStart; i < xEnd; i += separation) {
      for (var j = yStart; j < yEnd; j += separation) {
        list.push(new Point(createVector(i, j), j / yEnd, "green", false));
      }
    }
  } else {
    for (var i = xStart; i < xEnd; i += separation) {
      for (var j = yStart; j < yEnd; j += separation) {
        list.push(new Point(createVector(i, j), i / xEnd, "green", false));
      }
    }
  }
  return list;
}

function setupEntities() {
  let z = plotBasicIntersection(0, 650, 0, 75);
  z.forEach(a => poison.push(new Point(a, -1, "red", true)));

  z = plotBasicIntersection(0, 650, 150, 360);
  z.forEach(a => poison.push(new Point(a, -1, "red", true)));

  points = applyGradient(points, 0, 650, 80, 150, "vertical");

  // z = plotBasicIntersection(0, 650, 80, 150);
  // z.forEach(a => points.push(new Point(a, 0.1, "blue")));

  // z = plotBasicIntersection(430, 500, 150, 370);
  // z.forEach(a => points.push(new Point(a, 0.95, "blue")));

  // let z = plotBasicIntersection(0, 640, 0, 75);
  // z.forEach(a => poison.push(a));
}

function setup() {
  createCanvas(640, 360);
  for (var i = 0; i < 50; i++) {
    var y = random(115, 125);
    var x = 0;
    if (i % 2) {
      vehicles[i] = new Vehicle(x, y, "green", points, 640, "x-right");
    } else {
      vehicles[i] = new Vehicle(x, y, "yellow", points, 640, "x-right");
    }
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

  plotCoords(points, color(255, 0, 255));
  plotCoords(poison, color(255, 0, 0));

  // Steering
  for (var i = vehicles.length - 1; i >= 0; i--) {
    vehicles[i].behaviours(points, poison);
    vehicles[i].boundaries();
    vehicles[i].update();
    vehicles[i].display();
    if (vehicles[i].retired()) {
      vehicles.splice(i, 1);
    }
  }
}
