class Game {
  constructor () {
    this.objects = {};
    this.settings = {};
  }

  add (key, obj) {
    this.objects[key] = obj;
    obj.game = this;
  }

  object (key) {
    return this.objects[key];
  }

  setting (key, val) {
    if (arguments.length > 1) {
      this.settings[key] = val;
    }
    return this.settings[key];
  }
}