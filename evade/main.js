let boid;
let target;
let allowTargetPlacement = true;
const fleeDist = 100;

function setup () {
  createCanvas(windowWidth, windowHeight);

  boid = new Boid(width/2, height/2, 1);
  boid.vel = createVector(random(width), random(height))
  boid.renderPursuit = true;
  boid.invertAccel = -1;
  boid.maxspeed = 7;
  boid.maxforce = 0.21;

  target = new Boid(50, 50, 2);
  target.vel = createVector(target.maxspeed, 0);
  target.invertAccel = -1;
  target.renderPursuit = true;
  target.circleRadius = 100;
  target.maxforce = target.maxforce * 4;
  target.maxspeed *= 4;

  renderUI();
}

function draw () {
  background(255);

  const steer = boid.pursuit(target);
  boid.applyForce(steer);
  boid.update();
  boid.bounceBorders();
  boid.render();

  const d = target.pos.dist(boid.pos);
  if (d > fleeDist) {
    const s = target.wander();
    target.applyForce(s);
  }
  else {
    const s = target.evade(boid);
    target.applyForce(s);
  }

  target.update();
  target.bounceBorders();
  target.render();

  renderFleeDist(target.pos);
}

function renderFleeDist(c) {
  push();

  translate(c.x, c.y);

  stroke(0);
  fill(200, 0, 0, 50);
  const size = fleeDist*2;
  ellipse(0, 0, size, size);

  pop();
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed () {
  if (allowTargetPlacement) {
  }
}

function disableTargetPlacement () {
  allowTargetPlacement = false;
}

function enableTargetPlacement () {
  allowTargetPlacement = true;
}