let maxForceLabel, maxForceSlider;
let maxSpeedLabel, maxSpeedSlider;
let circleDistLabel, circleDistSlider;
let circleRadiusLabel, circleRadiusSlider;
let renderWanderLabel, renderWanderCheckbox;

function renderUI () {
  const initialValues = {
    circleDistance: boid.circleDistance,
    circleRadius: boid.circleRadius,
    maxspeed: boid.maxspeed,
    maxforce: boid.maxforce,
    renderWander: boid.renderWander
  };
  const resetButton = createButton('Reset').position(25, 50);
  resetButton.mouseClicked(() => {
    Object.keys(initialValues).forEach((key) => {
      boid[key] = initialValues[key]
    });
    circleDistSlider.value(boid.circleDistance);
    circleRadiusSlider.value(boid.circleRadius);
    maxSpeedSlider.value(boid.maxspeed);
    maxForceSlider.value(boid.maxforce);
    circleDistLabel.html(`Circle Distance: ${boid.circleDistance}`);
    circleRadiusLabel.html(`Circle Radius: ${boid.circleRadius}`);
    maxSpeedLabel.html(`Max Speed: ${boid.maxspeed}`);
    maxForceLabel.html(`Max Force: ${boid.maxforce}`);
    renderWanderCheckbox.checked(boid.renderWander);
  });

  renderWanderLabel = createP('Render Wander:').position(80, 38);
  renderWanderCheckbox = createCheckbox().position(182, 55);
  renderWanderCheckbox.changed(() => boid.renderWander = renderWanderCheckbox.checked());

  circleDistLabel = createP(`Circle Distance: ${boid.circleDistance}`).position(25, 60);
  circleDistSlider = createSlider(0, 200, boid.circleDistance, 1)
    .position(25, 100);
  circleDistSlider.input(() => {
    boid.circleDistance = circleDistSlider.value();
    circleDistLabel.html(`Circle Distance: ${boid.circleDistance}`);
  });
  circleDistSlider.mouseOver(disableTargetPlacement);
  circleDistSlider.mouseOut(enableTargetPlacement);

  circleRadiusLabel = createP(`Circle Radius: ${boid.circleRadius}`).position(25, 110);
  circleRadiusSlider = createSlider(0, 100, boid.circleRadius, 1)
    .position(25, 150);
  circleRadiusSlider.input(() => {
    boid.circleRadius = circleRadiusSlider.value();
    circleRadiusLabel.html(`Circle Radius: ${boid.circleRadius}`);
  });
  circleRadiusSlider.mouseOver(disableTargetPlacement);
  circleRadiusSlider.mouseOut(enableTargetPlacement);

  maxSpeedLabel = createP(`Max Speed: ${boid.maxspeed}`).position(25, 160);
  maxSpeedSlider = createSlider(0, 10, boid.maxspeed, 0.25);
  maxSpeedSlider.position(25, 200);
  maxSpeedSlider.input(() => {
    boid.maxspeed = maxSpeedSlider.value();
    maxSpeedLabel.html(`Max Speed: ${boid.maxspeed}`);
  });
  maxSpeedSlider.mouseOver(disableTargetPlacement);
  maxSpeedSlider.mouseOut(enableTargetPlacement);

  maxForceLabel = createP(`Max Force: ${boid.maxforce}`).position(25, 210);
  maxForceSlider = createSlider(0, 1, boid.maxforce, 0.015);
  maxForceSlider.position(25, 250);
  maxForceSlider.input(() => {
    boid.maxforce = maxForceSlider.value();
    maxForceLabel.html(`Max Force: ${boid.maxforce}`);
  });
  maxForceSlider.mouseOver(disableTargetPlacement);
  maxForceSlider.mouseOut(enableTargetPlacement);
}