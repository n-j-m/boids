class Hunter extends Boid {
  constructor (x, y, mass) {
    super(x, y, mass);
  }

  update () {
    const p = this.game.object('prey');

    this.steering.pursuit(p);

    super.update();
  }
}
