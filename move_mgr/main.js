let hunter;
let prey;
let allowTargetPlacement = true;

let g = new Game();

g.setting('fleeDist', 100);

function setup () {
  createCanvas(windowWidth, windowHeight);

  hunter = new Hunter(width/2, height/2, 1);
  hunter.vel = createVector(random(width), random(height))
  hunter.renderPursuit = true;
  hunter.invertAccel = -1;
  hunter.maxspeed = 7;
  hunter.maxforce = 0.21;

  g.add('hunter', hunter);

  prey = new Prey(50, 50, 2);
  prey.vel = createVector(prey.maxspeed, 0);
  prey.invertAccel = -1;
  prey.renderPursuit = true;
  prey.circleRadius = 100;
  prey.maxforce = prey.maxforce * 4;
  prey.maxspeed *= 4;

  g.add('prey', prey);

  //renderUI();
}

function draw () {
  background(255);

  prey.update();
  hunter.update();
  
  prey.bounceBorders();
  hunter.bounceBorders();

  prey.render();
  hunter.render();
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