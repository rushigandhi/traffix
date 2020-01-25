class Vehicle {
    constructor(x, y) {
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(0, -2);
      this.position = createVector(x, y);
      this.r = 6;
      this.maxspeed = 8;
      this.maxforce = 0.2;
      this.dna = []
      this.dna[0] = random(-5,5)
      this.dna[1] = random(-5,5)
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }

    behaviours(good, bad) {
        var foodSteer = this.eat(good);
        var poisonSteer = this.eat(bad);
        foodSteer.mult(this.dna[0])
        poisonSteer.mult(this.dna[1])
        this.applyForce(foodSteer)
        this.applyForce(poisonSteer)
    }

    eat(list) {
        var record = Infinity
        var closest = null
        for (var i = 0; i < list.length; i++){
            var d = this.position.dist(list[i])
            if (d<record) {
                record = d
                closest = i
            }
        }
        if (record < 5) {
            food.splice(closest, 1)
        } else if (closest > -1){
            return this.seek(list[closest]);
        }
        return createVector(0,0)
     }
  
    seek(target) {
  
      var desired = p5.Vector.sub(target, this.position);
  
      desired.setMag(this.maxspeed);
  
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
  
      // this.applyForce(steer);
      return steer
    }
  
    display() {
      let theta = this.velocity.heading() + PI / 2;
      fill(127);
      stroke(200);
      strokeWeight(1);
      push();
      translate(this.position.x, this.position.y);
      rotate(theta);
      beginShape();
      vertex(0, -this.r * 2);
      vertex(-this.r, this.r * 2);
      vertex(this.r, this.r * 2);
      endShape(CLOSE);
      pop();
    }
  }