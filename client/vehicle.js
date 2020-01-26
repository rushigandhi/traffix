class Vehicle {
    constructor(x, y, dna) {
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(0, -2);
      this.position = createVector(x, y);
      this.r = 6;
      this.maxspeed = 8;
      this.maxforce = 0.2;
      if (dna === undefined) {
        this.dna = []
        this.dna[0] = random(-2,2) // Food
        this.dna[1] = random(-2,2) // Poison
        this.dna[2] = random(10,100) // Food Perception
        this.dna[3] = random(10,100) // Poison Perception
      } else {
          this.dna = dna
      }
      
      this.health = 1
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
      this.health -= 0.005;
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }

    behaviours(good, bad) {
        var foodSteer = this.eat(good, 0.2, this.dna[2]);
        var poisonSteer = this.eat(bad, -0.5, this.dna[3 ]);
        foodSteer.mult(this.dna[0])
        poisonSteer.mult(this.dna[1])
        this.applyForce(foodSteer)
        this.applyForce(poisonSteer)
    }

    retired() {
        return this.health < 0
    }

    reproduce(){
        if (random(1)<0.001){
            return new Vehicle(this.position.x,this.position.y,this.dna)
        }
    }

    eat(list, nutrition, perception) {
        var record = Infinity
        var closest = null
        for (var i = list.length-1; i >= 0; i--){
            var d = this.position.dist(list[i])
            if (d < this.maxspeed) {
                list.splice(i, 1)
                this.health += nutrition
            } else if (d<record  && d < perception) {
                record = d
                closest = list[i]
            }
        }
        if (closest != null){
            return this.seek(closest);
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
      
      push();
      translate(this.position.x, this.position.y);
      rotate(theta);
    // Direction vector
    stroke(0,255,0);
    noFill();
    line(0,0,0,-this.dna[0]*20);
    ellipse(0,0,-this.dna[2]*2);
    stroke(255,0,0);
    line(0,0,0,this.dna[1]*20);
    ellipse(0,0,this.dna[3]*2);

    var green = color(0,255,0)
    var red = color(255,0,0)
    var carColor = lerpColor(red, green, this.health)

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