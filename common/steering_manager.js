const SteeringManager = (function () {
  const LIMITED_FORCE = Symbol('LIMITED_FORCE');
  const UNLIMITED_FORCE = Symbol('UNLIMITED_FORCE');

  class SteeringManager {
    constructor (boid) {
      this.host = boid;
      this.steering = createVector(0, 0);
      this.forces = [];
    }

    seek (target /* Vector */) {
      const v = doSeek(this.host, target);
      this.forces.push({ type: LIMITED_FORCE, force: v });
    }

    arrive (target /* Vector */, slowingRadius) {
      const v = doArrive(this.host, target, slowingRadius);
      this.forces.push({ type: LIMITED_FORCE, force: v });
    }

    flee (target /* Vector */) {
      const v = doFlee(this.host, target);
      this.forces.push({ type: LIMITED_FORCE, force: v });
    }

    wander () {
      const v = doWander(this.host);
      this.forces.push({ type: LIMITED_FORCE, force: v });
    }

    evade (target /* Boid */) {
      const v = doEvade(this.host, target);
      this.forces.push({ type: UNLIMITED_FORCE, force: v });
    }

    pursuit (target /* Boid */) {
      const v = doPursuit(this.host, target);
      this.forces.push({ type: LIMITED_FORCE, force: v });
    }

    update () {
      const limitedForces = this.forces.filter((f) => f.type === LIMITED_FORCE);
      for (let f of limitedForces) {
        this.steering.add(f.force);
      }
      this.steering.limit(this.host.maxforce);

      const unlimitedForces = this.forces.filter((f) => f.type === UNLIMITED_FORCE);
      for (let f of unlimitedForces) {
        this.steering.add(f.force);
      }

      this.host.applyForce(this.steering);

      this.reset();
    }

    reset () {
      this.steering.mult(0);
      this.forces = [];
    }
  }

  function doSeek (host /* Boid */, target /* Vector */) /* Vector */ {
    const desired = p5.Vector.sub(target, host.pos);
    desired.setMag(host.maxspeed);
    const steer = p5.Vector.sub(desired, host.vel);
    return steer;
  }

  function doArrive (host /* Boid */, target /* Vector */, slowingRadius) /* Vector */ {
    const desired = p5.Vector.sub(target, host.pos);
    const d = desired.mag();
    let speed = host.maxspeed;
    if (d < slowingRadius) {
      speed = host.maxspeed * (d / slowingRadius);
    }
    desired.setMag(speed);
    const steer = p5.Vector.sub(desired, host.vel);
    return steer;
  }

  function doFlee (host /* Boid */, target /* Vector */) /* Vector */ {
    const desired = p5.Vector.sub(host.pos, target);
    desired.setMag(host.maxspeed);
    const steer = p5.Vector.sub(desired, host.vel);
    return steer;
  }

  function doWander (host /* Boid */) /* Vector */ {
    // calc wander circle
    host.circleCenter = host.vel.copy()
      .setMag(host.circleDistance);

    if (host.renderWander) host.renderWanderCircle();

    host.displacement = p5.Vector.random2D();
    host.displacement.setMag(host.circleRadius);

    setAngle(host.displacement, host.wanderAngle);
    
    host.wanderAngle += newAngle(host.wanderAngle, host.angleChange);

    if (host.renderWander) host.renderDisplacement();

    host.wanderForce = p5.Vector.add(host.circleCenter, host.displacement);
    if (host.renderWander) host.renderWanderForce();


    return host.wanderForce;
  }

  function doEvade (host /* Boid */, target /* Boid */) /* Vector */ {
    const distance = p5.Vector.sub(host.pos, target.pos);
    const pTime = distance.mag() / target.maxspeed;
    const futureVel = p5.Vector.mult(target.vel, pTime);
    host.futurePos = p5.Vector.add(target.pos, futureVel);
    if (host.renderPursuit) host.renderFuturePos();
    host.futurePos = doFlee(host, host.futurePos).limit(host.maxforce).mult(5);
    return host.futurePos;
  }

  function doPursuit (host /* Boid */, target /* Boid */) /* Vector */ {
    const distance = p5.Vector.sub(host.pos, target.pos);
    const pTime = distance.mag() / target.maxspeed;
    const futureVel = p5.Vector.mult(target.vel, pTime);
    host.futurePos = p5.Vector.add(target.pos, futureVel);
    if (host.renderPursuit) host.renderFuturePos();
    host.futurePos = doSeek(host, host.futurePos);
    return host.futurePos;
  }

  function newAngle (angle, angleChange) {
    return (random() * angleChange) - (angleChange * 0.5);
  }

  function setAngle (vector, angle) {
    const len = vector.mag();
    vector.x = cos(angle) * len;
    vector.y = sin(angle) * len;
  }

  return SteeringManager;
})();
