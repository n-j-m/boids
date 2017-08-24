// This is a test
let boid
let allowTargetPlacement = true

function setup() {
  createCanvas(windowWidth, windowHeight)

  boid = new Boid(width / 2, height / 2, 1)
  boid.vel = createVector(random(width), random(height))

  renderUI()
}

function draw() {
  background(255)

  const steer = boid.wander()
  boid.applyForce(steer)
  boid.update()
  boid.borders()
  boid.render()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function mousePressed() {
  if (allowTargetPlacement) {
  }
}

function disableTargetPlacement() {
  allowTargetPlacement = false
}

function enableTargetPlacement() {
  allowTargetPlacement = true
}
