let vehicles = [];
var poison = [];
let path1 = [];
let path2 = [];

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

function applyGradient(xStart, xEnd, yStart, yEnd, orientation) {
  var separation = 10;
  list = [];
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
  let z = plotBasicIntersection(0, 200, 0, 100);
  z.forEach(a => poison.push(new Point(a, -1, "red", true)));

  z = plotBasicIntersection(360, 650, 200, 360);
  z.forEach(a => poison.push(new Point(a, -1, "red", true)));

  z = plotBasicIntersection(360, 650, 0, 100);
  z.forEach(a => poison.push(new Point(a, -1, "red", true)));

  z = plotBasicIntersection(0, 200, 200, 360);
  z.forEach(a => poison.push(new Point(a, -1, "red", true)));

  // Lines
  z = plotBasicIntersection(0, 200, 150, 160);
  z.forEach(a => poison.push(new Point(a, -1, "yellow", true)));

  z = plotBasicIntersection(360, 650, 150, 160);
  z.forEach(a => poison.push(new Point(a, -1, "yellow", true)));

  z = plotBasicIntersection(280, 290, 200, 360);
  z.forEach(a => poison.push(new Point(a, -1, "yellow", true)));

  z = plotBasicIntersection(280, 290, 0, 100);
  z.forEach(a => poison.push(new Point(a, -1, "yellow", true)));

  path1 = applyGradient(0, 650, 100, 200, "vertical");
  path2 = applyGradient(200, 360, 0, 360, "horizontal");
}

function setup() {
  createCanvas(640, 360);
  for (var i = 0; i < 50; i++) {
    var y = random(115, 125);
    var x = 0;
    if (i % 2) {
      vehicles[i] = new Vehicle(x, y, "green", path1, 640, "x-right");
    } else {
      vehicles[i] = new Vehicle(x, y, "yellow", path2, 360, "y-down");
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

  plotCoords(path1, color(1, 1, 1));
  plotCoords(path2, color(112, 31, 113));
  plotCoords(poison, color(255, 0, 0));

  // Steering
  for (var i = vehicles.length - 1; i >= 0; i--) {
    if (i % 2) {
      vehicles[i].behaviours(path1, poison);
    } else {
      vehicles[i].behaviours(path2, poison);
    }
    vehicles[i].boundaries();
    vehicles[i].update();
    vehicles[i].display();
    if (vehicles[i].retired()) {
      vehicles.splice(i, 1);
    }
  }
}
