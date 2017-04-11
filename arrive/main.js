let boid;
let target;
let allowTargetPlacement = true;
let maxForceLabel, maxForceSlider;
let maxSpeedLabel, maxSpeedSlider;
let slowingRangeLabel, slowingRangeSlider;

function setup () {
  createCanvas(windowWidth, windowHeight);

  boid = new Boid(width/2, height/2, 1);
  boid.vel = createVector(random(width), random(height))

  target = new Target(random(width), random(height));

  renderUI();
}

function renderUI () {
  slowingRangeLabel = createP(`Slowing Range: ${target.slowingRange}`).position(25, 60);
  slowingRangeSlider = createSlider(0, 200, target.slowingRange, 10);
  slowingRangeSlider.position(25, 100);
  slowingRangeSlider.input(() => {
    target.slowingRange = slowingRangeSlider.value();
    slowingRangeLabel.html(`Slowing Range: ${target.slowingRange}`);
  });
  slowingRangeSlider.mouseOver(disableTargetPlacement);
  slowingRangeSlider.mouseOut(enableTargetPlacement);

  maxSpeedLabel = createP(`Max Speed: ${boid.maxspeed}`).position(25, 110);
  maxSpeedSlider = createSlider(0, 10, boid.maxspeed, 0.25);
  maxSpeedSlider.position(25, 150);
  maxSpeedSlider.input(() => {
    boid.maxspeed = maxSpeedSlider.value();
    maxSpeedLabel.html(`Max Speed: ${boid.maxspeed}`);
  });
  maxSpeedSlider.mouseOver(disableTargetPlacement);
  maxSpeedSlider.mouseOut(enableTargetPlacement);

  maxForceLabel = createP(`Max Force: ${boid.maxforce}`).position(25, 160);
  maxForceSlider = createSlider(0, 1, boid.maxforce, 0.015);
  maxForceSlider.position(25, 200);
  maxForceSlider.input(() => {
    boid.maxforce = maxForceSlider.value();
    maxForceLabel.html(`Max Force: ${boid.maxforce}`);
  });
  maxForceSlider.mouseOver(disableTargetPlacement);
  maxForceSlider.mouseOut(enableTargetPlacement);

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

function mousePressed () {
  if (allowTargetPlacement) {
    target = new Target(mouseX, mouseY);
    target.slowingRange = slowingRangeSlider.value();
  }
}

function disableTargetPlacement () {
  allowTargetPlacement = false;
}

function enableTargetPlacement () {
  allowTargetPlacement = true;
}