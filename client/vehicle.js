var mr = 0.5;
class Vehicle {
  constructor(x, y, dna) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -1);
    this.position = createVector(x, y);
    this.r = 6;
    this.deathByCompletion = 0;
    this.maxspeed = 8;
    this.maxforce = 0.2;
    this.dna = [];
    if (dna === undefined) {
      this.dna[0] = random(-2, 2); // Food
      this.dna[1] = -10; // Poison
      this.dna[2] = random(0, 100); // Food Perception
      this.dna[3] = random(0, 100); // Poison Perception
      this.dna[4] = random(10, 160); // Desired Seperation
      this.dna[5] = random(0, 8); // Seperation force
    } else {
      this.dna[0] = dna[0];
      if (random(1) < mr) this.dna[0] += random(-0.1, 0.1);
      this.dna[1] = dna[1];
      if (random(1) < mr) this.dna[1] += random(-0.1, 0.1);
      this.dna[2] = dna[2];
      if (random(1) < mr) this.dna[2] += random(-10, 10);
      this.dna[3] = dna[3];
      if (random(1) < mr) this.dna[3] += random(-10, 10);
      this.dna[4] = dna[4];
      if (random(1) < mr) this.dna[4] += random(-8, 8);
      this.dna[5] = dna[5];
      if (random(1) < mr) this.dna[5] += random(-1, 1);
    }
    this.health = 1;
  }

  boundaries() {
    var d = 25;

    let desired = null;

    if (this.position.x < d) {
      desired = createVector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > width - d) {
      desired = createVector(-this.maxspeed, this.velocity.y);
    }

    if (this.position.y < d) {
      desired = createVector(this.velocity.x, this.maxspeed);
    } else if (this.position.y > height - d) {
      desired = createVector(this.velocity.x, -this.maxspeed);
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  update() {
    this.health -= 0;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  behaviours(good, bad) {
    let separateForce = this.separate(vehicles);
    var foodSteer = this.eat(good, 0.2, this.dna[2]);
    var poisonSteer = this.eat(bad, -5, this.dna[3]);
    foodSteer.mult(this.dna[0]);
    poisonSteer.mult(this.dna[1]);
    separateForce.mult(5);
    this.applyForce(foodSteer);
    this.applyForce(separateForce);
    this.applyForce(poisonSteer);
  }

  retired() {
    if (this.health < 0) {
      return true;
    } else if (this.position.x >= 640 || this.position.y >= 360) {
      this.reproduce();
      return true;
    }
    return false;
  }

  reproduce() {
    vehicles.push(new Vehicle(5, random(110, 290), this.dna));
  }

  eat(list, nutrition, perception) {
    var record = Infinity;
    var closest = null;
    for (var i = list.length - 1; i >= 0; i--) {
      var d = this.position.dist(list[i]);
      if (d < this.maxspeed) {
        this.health += nutrition;
      } else if (d < record && d < perception) {
        record = d;
        closest = list[i];
      }
    }
    if (closest != null) {
      return this.seek(closest);
    }
    return createVector(0, 0);
  }

  seek(target) {
    var desired = p5.Vector.sub(target, this.position);

    desired.setMag(this.maxspeed);

    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);

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
      sum.mult(this.maxspeed);
      // Implement Reynolds: Steering = Desired - Velocity
      sum.sub(this.velocity);
      sum.limit(this.maxforce);
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
    noFill();
    line(0, 0, 0, -this.dna[0] * 20);
    ellipse(0, 0, -this.dna[2] * 2);
    stroke(255, 0, 0);
    line(0, 0, 0, this.dna[1] * 20);
    ellipse(0, 0, this.dna[3] * 2);

    var green = color(0, 255, 0);
    var red = color(255, 0, 0);
    var carColor = lerpColor(red, green, this.health);

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
