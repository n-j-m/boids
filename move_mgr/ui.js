let maxForceLabel, maxForceSlider;
let maxSpeedLabel, maxSpeedSlider;
let invertAccelLabel, invertAccelCheckbox;
let renderPursuitLabel, renderPursuitCheckbox;

function renderUI () {
  renderPursuitLabel = createP('Render Pursuit').position(25, 10);
  renderPursuitCheckbox = createCheckbox().position(25, 50);
  renderPursuitCheckbox.checked(boid.renderPursuit);
  renderPursuitCheckbox.changed(() => boid.renderPursuit = renderPursuitCheckbox.checked());

  invertAccelLabel = createP('Invert Acceleration').position(25, 60);
  invertAccelCheckbox = createCheckbox().position(25, 100);
  invertAccelCheckbox.checked(boid.invertAccel < 0);
  invertAccelCheckbox.changed(() => boid.invertAccel *= -1);
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