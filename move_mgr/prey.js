class Prey extends Boid {
  constructor (x, y, mass) {
    super(x, y, mass);
  }

  update () {
    const hunter = this.game.object('hunter');

    if (this.pos.dist(hunter.pos) <= this.game.setting('fleeDist')) {
      this.steering.evade(hunter);
    }
    else {
      this.steering.wander();
    }

    super.update();
  }

  render () {
    super.render();
    this.renderFleeDist();
  }

  renderFleeDist () {
    push();

    translate(this.pos.x, this.pos.y);

    stroke(0);
    strokeWeight(0.5);
    fill(200, 0, 0, 50);
    const size = Game.fleeDist * 2;
    ellipse(0, 0, size, size);

    pop();
  }
}