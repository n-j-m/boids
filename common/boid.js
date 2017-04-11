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

    this.invertAccel = 1;

    this.renderWander = false;
    this.circleCenter = null;
    this.circleDistance = 50;
    this.circleRadius = 20;
    this.wanderAngle = radians(5);
    this.angleChange = radians(60);

    this.renderPursuit = false;
    this.pursuitTime = 5;
    this.futurePos = null;
  }

  applyForce (force) {
    this.acc.add(p5.Vector.div(force, this.mass));
  }

  update () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.renderVelocity();
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

    const scaled = p5.Vector.mult(this.acc, this.invertAccel * 300);
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

  renderWanderCircle () {
    if (!this.circleCenter) return;

    push();

    const circlePos = p5.Vector.add(this.pos, this.circleCenter);

    translate(circlePos.x, circlePos.y);

    stroke(0);
    strokeWeight(0.5);
    noFill();
    const size = this.circleRadius * 2;
    ellipse(0, 0, size, size);

    pop();
  }

  renderDisplacement () {
    if (!this.displacement) return;

    push();

    const distPos = p5.Vector.add(this.pos, this.circleCenter);

    translate(distPos.x, distPos.y);

    stroke(255, 0, 0);
    strokeWeight(0.5);
    line(0, 0, this.displacement.x, this.displacement.y);

    pop();
  }

  renderWanderForce () {
    if (!this.wanderForce) return;

    push();

    translate(this.pos.x, this.pos.y);

    stroke(0, 0, 255);
    strokeWeight(0.5);
    line(0, 0, this.wanderForce.x, this.wanderForce.y);

    pop();
  }

  renderFuturePos () {
    if (!this.futurePos) return;

    push();

    stroke(0, 0, 255);
    strokeWeight(0.5);
    line(this.pos.x, this.pos.y, this.futurePos.x, this.futurePos.y);

    pop();
  }

  render () {
    this.renderBody();
  }

  // behavior

  borders () {
    if (this.pos.x < -this.size) this.pos.x = this.size + width;
    if (this.pos.y < -this.size) this.pos.y = this.size + height;
    if (this.pos.x > this.size + width) this.pos.x = -this.size;
    if (this.pos.y > this.size + height) this.pos.y = -this.size;
  }

  bounceBorders () {
    if (this.pos.x < this.r) this.vel.x *= -1;
    if (this.pos.y < this.r) this.vel.y *= -1;
    if (this.pos.x > width-this.r) this.vel.x *= -1;
    if (this.pos.y > height-this.r) this.vel.y *= -1;
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

  wander () {
    // calc wander circle
    this.circleCenter = this.vel.copy()
      .setMag(this.circleDistance);

    if (this.renderWander) this.renderWanderCircle();

    this.displacement = p5.Vector.random2D();
    this.displacement.setMag(this.circleRadius);

    setAngle(this.displacement, this.wanderAngle);
    
    this.wanderAngle += newAngle(this.wanderAngle, this.angleChange);

    if (this.renderWander) this.renderDisplacement();

    this.wanderForce = p5.Vector.add(this.circleCenter, this.displacement);
    if (this.renderWander) this.renderWanderForce();
    this.wanderForce.limit(this.maxforce);


    return this.wanderForce;
  }

  pursuit (other) {
    const distance = p5.Vector.sub(this.pos, other.pos);
    const pTime = distance.mag() / other.maxspeed;
    const futureVel = p5.Vector.mult(other.vel, pTime);
    this.futurePos = p5.Vector.add(other.pos, futureVel);
    if (this.renderPursuit) this.renderFuturePos();
    this.futurePos = this.seek(this.futurePos);
    return this.futurePos;
  }
}

function newAngle (angle, angleChange) {
  return (random() * angleChange) - (angleChange * 0.5);
}

function setAngle (vector, angle) {
  const len = vector.mag();
  vector.x = cos(angle) * len;
  vector.y = sin(angle) * len;
}