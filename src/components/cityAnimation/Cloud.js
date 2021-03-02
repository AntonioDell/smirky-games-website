import { Graphics, Point } from "pixi.js";

const maxCloudPartHeight = 50;
const maxCloudPartWidth = 100;
const white = 0xffffff;

const cloudConfigurations = [
  new Point(100, 25),

];

export class Cloud extends Graphics {
  constructor(speed, canvasHeight) {
    super();
    this.tmpVelovcity = 0;
    this.speed = speed;

    const config1 =
      cloudConfigurations[
      Math.floor(Math.random() * cloudConfigurations.length)
      ];
    const config2 =
      cloudConfigurations[
      Math.floor(Math.random() * cloudConfigurations.length)
      ];

    const offset = new Point(
      0.5 * config1.x,
      (Math.round(Math.random()) == 1 ? -1 : 1) * 0.5 * config1.y
    );

    const minY = Math.floor(canvasHeight / 3);

    this.y = Math.floor(Math.random() * minY) + minY;
    this.x -= config1.x * 0.5 + config2.x;

    this.beginFill(white)
      .drawRect(0, 0, config1.x, config1.y)
      .drawRect(offset.x, offset.y, config2.x, config2.y);
  }

  onUpdate(delta, parent) {
    if (this.x > this.canvasWidth) {
      parent.removeChild(this);
      this.destroy();
      return;
    }
    this.tmpVelovcity += this.speed * delta;
    if (Math.floor(this.tmpVelovcity) > 0) {
      this.x += Math.floor(this.tmpVelovcity);
      this.tmpVelovcity = 0;
    }
  }
}

export class CloudBuilder {
  constructor(scrollingSpeed, maxBuildOffset, canvasHeight) {
    this.scrollingSpeed = scrollingSpeed;
    this.maxBuildOffset = maxBuildOffset;
    this.canvasHeight = canvasHeight;
  }
  /**
   * @returns {Cloud} if one was built, undefined otherwise
   */
  buildIfPossible() {
    if (this.lastCloud == null || this.lastCloud.x > 0 + this.buildOffset) {
      const newCloud = new Cloud(this.scrollingSpeed, this.canvasHeight);
      this.lastCloud = newCloud;
      this.randomizeBuildOffset();
      return newCloud;
    }

    return undefined;
  }

  randomizeBuildOffset() {
    this.buildOffset = Math.floor(Math.random() * this.maxBuildOffset);
  }
}
