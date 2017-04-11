const TARGET_SIZE = 20;
const DEFAULT_SLOWING_RANGE = 200;

class Target {
  constructor (x, y) {
    this.pos = createVector(x, y);

    this.r = TARGET_SIZE / 2;

    this.slowingRange = DEFAULT_SLOWING_RANGE/2;
  }

  renderSlowingRange () {
    push();

    translate(this.pos.x, this.pos.y);

    stroke(0);
    strokeWeight(1);
    fill(150, 150, 150, 25);

    const size = this.slowingRange*2;
    ellipse(0, 0, size, size);

    pop();
  }

  renderBody () {
    push();

    translate(this.pos.x, this.pos.y);

    stroke(0);
    strokeWeight(1);
    fill(190, 15, 10, 100);

    ellipse(0, 0, this.r, this.r);

    pop();
  }

  render () {
    this.renderBody();
    this.renderSlowingRange();
  }
}