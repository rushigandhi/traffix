class Point {
  constructor(vector, strength, colour = "white", isObstacle = false) {
    this.vector = vector;
    this.strength = strength;
    this.colour = colour;
    this.isObstacle = isObstacle;
  }
}

class Path {
  constructor(path) {
    this.path = path;
  }
}
