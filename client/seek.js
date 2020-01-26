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

function setupEntities() {
  food = randomCoords(50);
  poison = randomCoords(10);
  plotBasicIntersection();
}

function plotBasicIntersection() {}

function setup() {
  createCanvas(640, 360);
  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    vehicles[i] = new Vehicle(x,y);
  }
  setupEntities();
}
function addNewFood(){
    if (random(1) < 0.05) {
        var x = random(width);
        var y = random(height);
        food.push(createVector(x, y));
    }
}
function draw() {
  background(0);

  addNewFood()
  let mouse = createVector(mouseX, mouseY);

  // Mouse
  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 48, 48);

  plotCoords(food, "green");
  plotCoords(poison, "red");

  // Steering
  for (var i = vehicles.length-1; i >= 0; i--) {
    vehicles[i].behaviours(food, poison);
    vehicles[i].boundaries();
    vehicles[i].update();
    vehicles[i].display();
    var newVehicle = vehicles[i].reproduce()
    if (newVehicle != null){
        vehicles.push(newVehicle)
    }
    if (vehicles[i].retired()) {
        vehicles.splice(i,1)
    }
  }
  
}
