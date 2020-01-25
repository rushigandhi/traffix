const { Cell } = require("./cell");

const Map = class Map {
  constructor() {
    this.WIDTH = 10;
    this.HEIGHT = 10;

    this.grid = [];

    for (let i = 0; i < this.HEIGHT; i++) {
      let temp = [];
      for (let j = 0; j < this.WIDTH; j++) {
        temp.push(new Cell());
      }
      this.grid.push(temp);
    }
  }

  debug() {
    for (let i = 0; i < this.HEIGHT; i++) {
      let str = "";
      for (let j = 0; j < this.WIDTH; j++) {
        str += this.grid[i][j];
      }
    }
  }
};

module.exports = {
  Map
};
