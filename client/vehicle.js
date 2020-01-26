var mr = 0.5;
class Vehicle {
  constructor(x, y, color, pathList, finishNumber, finishDirection, dna) {
    this.finishNumber = finishNumber;
    this.finishDirection = finishDirection;
    this.pathList = pathList;
    this.color = color;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -1);
    this.position = createVector(x, y);
    this.r = 6;
    this.deathByCompletion = 0;
    this.dna = [];
    if (dna === undefined) {
      this.dna[0] = random(-2, 2); // Food
      this.dna[1] = -10; // Poison
      this.dna[2] = random(0, 100); // Food Perception
      this.dna[3] = random(0, 50); // Poison Perception
      this.dna[4] = random(0, 100); // Desired Seperation
      this.dna[5] = random(0, 20); // Seperation force
      this.dna[6] = random(5, 15); // Speed
      this.dna[7] = random(0, 1); // Max Force
    } else {
      this.dna[0] = dna[0];
      if (random(1) < mr) this.dna[0] += random(-0.1, 0.1);
      this.dna[1] = dna[1];
      if (random(1) < mr) this.dna[1] += random(-0.1, 0.1);
      this.dna[2] = dna[2];
      if (random(1) < mr) this.dna[2] += random(-5, 5);
      this.dna[3] = dna[3];
      if (random(1) < mr) this.dna[3] += random(-5, 5);
      this.dna[4] = dna[4];
      if (random(1) < mr) this.dna[4] += random(-8, 8);
      this.dna[5] = dna[5];
      if (random(1) < mr) this.dna[5] += random(-1, 1);
      this.dna[6] = dna[6];
      if (random(1) < mr) this.dna[6] += random(-1, 1);
      this.dna[7] = dna[7];
      if (random(1) < mr) this.dna[7] += random(-0.1, 0.1);
    }
    this.health = 1;
  }

  boundaries() {
    var d = 25;
    let desired = null;

    if (this.position.x < d) {
      desired = createVector(this.dna[6], this.velocity.y);
    } else if (this.position.x > width - d) {
      desired = createVector(-this.dna[6], this.velocity.y);
    }

    if (this.position.y < d) {
      desired = createVector(this.velocity.x, this.dna[6]);
    } else if (this.position.y > height - d) {
      desired = createVector(this.velocity.x, -this.dna[6]);
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.dna[6]);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.dna[7]);
      this.applyForce(steer);
    }
  }

  update() {
    this.health -= 0.55;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.dna[6]);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  behaviours(good, bad) {
    let separateForce = this.separate(vehicles);
    var foodSteer = this.eatGood(good, 0.2, this.dna[2]);
    var poisonSteer = this.eatBad(bad, -Infinity, this.dna[3]);
    separateForce.mult(this.dna[5] * 5);
    foodSteer.mult(this.dna[0]);
    poisonSteer.mult(this.dna[1]);
    this.applyForce(separateForce);
    this.applyForce(foodSteer);
    this.applyForce(poisonSteer);
  }

  pastFinishLine() {
    if (this.finishDirection == "x-left") {
      return this.position.x <= this.finishNumber;
    } else if (this.finishDirection == "x-right") {
      return this.position.x >= this.finishNumber;
    } else if (this.finishDirection == "y-down") {
      return this.position.y >= this.finishNumber;
    } else if (this.finishDirection == "y-up") {
      return this.position.y <= this.finishNumber;
    }
    return false;
  }

  outOfBounds() {
    return (
      Math.abs(this.position.x) >= Math.abs(width) ||
      Math.abs(this.position.y) >= Math.abs(height)
    );
  }

  retired() {
    if (this.health < 0) {
      return true;
    } else if (this.pastFinishLine()) {
      this.reproduce();
      this.reproduce();
      this.reproduce();

      return true;
    } else if (this.outOfBounds()) {
      return true;
    } else {
      return false;
    }
  }

  reproduce() {
    if (vehicles.length < 50) {
      vehicles.push(
        new Vehicle(
          20,
          110,
          this.color,
          this.pathList,
          this.finishNumber,
          this.finishDirection,
          this.dna
        )
      );
    }
  }

  eatGood(list, nutrition, perception) {
    var closest = null;
    var maxReward = -Infinity;
    var index = 0;
    for (var i = list.length - 1; i >= 0; i--) {
      // console.log(list[i])
      var d = this.position.dist(list[i].vector);
      if (d < this.dna[6]) {
        this.health += nutrition;
      } else if (d < perception) {
        closest = list[i].vector;
        if (list[i].strength > maxReward) {
          maxReward = list[i].strength;
          index = i;
        }
      }
    }
    if (closest != null) {
      return this.seek(list[index].vector || list[index]);
    }
    return createVector(0, 0);
  }

  eatBad(list, nutrition, perception) {
    var record = Infinity;
    var closest = null;
    for (var i = list.length - 1; i >= 0; i--) {
      var d = this.position.dist(list[i].vector);
      if (d < this.dna[6]) {
        this.health += nutrition;
      } else if (d < record && d < perception) {
        record = d;
        closest = list[i].vector;
      }
    }
    if (closest != null) {
      return this.seek(closest);
    }
    return createVector(0, 0);
  }

  seek(target) {
    var desired = p5.Vector.sub(target, this.position);

    desired.setMag(this.dna[6]);

    var steer = p5.Vector.sub(desired, this.velocity);

    // steer.y = -Math.abs(steer.y);

    // steer.x = -Math.abs(steer.x);

    steer.limit(this.dna[7]);


    // this.applyForce(steer);
    return steer;
  }

  separate(vehicles) {
    let desiredseparation = this.dna[4];
    let sum = createVector();
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < vehicles.length; i++) {
      let d = p5.Vector.dist(this.position, vehicles[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (d > 0 && d < desiredseparation) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, vehicles[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        sum.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      sum.div(count);
      // Our desired vector is the average scaled to maximum speed
      sum.normalize();
      sum.mult(this.dna[6]);
      // Implement Reynolds: Steering = Desired - Velocity
      sum.sub(this.velocity);
      sum.limit(this.dna[7]);
    }
    return sum;
  }

  display() {
    let theta = this.velocity.heading() + PI / 2;

    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    // Direction vector
    stroke(0, 255, 0);
    // noFill();
    // line(0, 0, 0, -this.dna[0] * 20);
    // ellipse(0, 0, -this.dna[2] * 2);
    // stroke(255, 0, 0);
    // line(0, 0, 0, this.dna[1] * 20);
    // ellipse(0, 0, this.dna[3] * 2);

    var initialColor =
      this.color == "green" ? color(0, 255, 0) : color(255, 255, 0);
    var red = color(255, 0, 0);

    var carColor = lerpColor(red, initialColor, this.health);

    fill(carColor);
    stroke(carColor);
    strokeWeight(1);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);

    pop();
  }
}
