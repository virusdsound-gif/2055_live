class Runtime {
  constructor() {
    this.live = false;
    this.viewers = 0;
    this.burnedESS = 0;
    this.streamTitle = "2055_live";
  }

  start() {
    this.live = true;
    console.log("🔴 Stream started");
  }

  stop() {
    this.live = false;
    console.log("⏹ Stream stopped");
  }

  join() {
    this.viewers++;
    console.log(`👤 Viewer joined (${this.viewers})`);
  }

  burn(amount) {
    this.burnedESS += amount;
    console.log(`🔥 Burned ${amount} ESS`);
  }

  status() {
    return {
      live: this.live,
      viewers: this.viewers,
      burnedESS: this.burnedESS,
      title: this.streamTitle
    };
  }
}

module.exports = Runtime;
