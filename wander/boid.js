const MASS_SCALE = 16; // pixels per unit mass

class Boid {
  constructor (x, y, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();

    this.mass = mass;
    this.size = mass * MASS_SCALE;
    this.r = this.size / 2;

    this.maxspeed = 2;
    this.maxforce = 0.03;
  }

  applyForce (force) {
    this.acc.add(p5.Vector.div(force, this.mass));
  }

  update () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.renderAcceleration();
    this.acc.mult(0);
  }

  // rendering

  renderVelocity () {
    push();

    translate(this.pos.x, this.pos.y);

    stroke(0, 255, 0);
    strokeWeight(1);

    const scaled = p5.Vector.mult(this.vel, 10);
    line(0, 0, scaled.x, scaled.y);

    pop();
  }

  renderAcceleration () {
    push();

    translate(this.pos.x, this.pos.y);

    stroke(255, 0, 0);
    strokeWeight(1);

    const scaled = p5.Vector.mult(this.acc, 300);
    line(0, 0, scaled.x, scaled.y);

    pop();
  }

  renderBody () {
    push();

    translate(this.pos.x, this.pos.y);

    stroke(0);
    strokeWeight(1);
    fill(10, 170, 100, 70);
    ellipse(0, 0, this.size, this.size);

    pop();
  }

  render () {
    this.renderBody();
    this.renderVelocity();
  }

  // behavior

  borders () {
    if (this.pos.x < -this.size) this.pos.x = this.size + width;
    if (this.pos.y < -this.size) this.pos.y = this.size + height;
    if (this.pos.x > this.size + width) this.pos.x = -this.size;
    if (this.pos.y > this.size + height) this.pos.y = -this.size;
  }

  seek (target) {
    const desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxspeed);
    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  arrive (target, slowingRange) {
    const desired = p5.Vector.sub(target, this.pos);
    const d = desired.mag();
    let speed = this.maxspeed;
    if (d < slowingRange) {
      speed = this.maxspeed * (d / slowingRange);
    }
    desired.setMag(speed);
    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }
}