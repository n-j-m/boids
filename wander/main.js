let boid;
let target;

function setup () {
  createCanvas(windowWidth, windowHeight);

  boid = new Boid(width/2, height/2, 1);
  boid.vel = createVector(random(width), random(height))

  target = new Target(random(width), random(height));
}

function draw () {
  background(255);

  const steer = boid.arrive(target.pos, target.slowingRange);
  boid.applyForce(steer);
  boid.update();
  boid.borders();
  boid.render();

  target.render();
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}