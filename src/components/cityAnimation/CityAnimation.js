import { Application } from "@pixi/app";
import { Graphics, GraphicsGeometry, Rectangle } from "pixi.js";
import { CloudBuilder } from "./Cloud";
import { HouseBuilder } from "./House";
import { Stars } from "./Stars";

const assetsDir = "../../assets/";

export default class CityAnimation extends Application {
  constructor(parentElem) {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      resolution: window.devicePixelRatio || 1,
      autoResize: true,
    });
    parentElem.appendChild(this.view); // Create Canvas tag in the body

    this.init();
    window.addEventListener("resize", this.onResize.bind(this));
  }

  init() {
    // Load the logo
    /*
    this.loader.add("bg", assetsDir + "bg.png");
    this.loader.add("ground", assetsDir + "ground.png");
    this.loader.add("player", assetsDir + "player.png");
    this.loader.add("clouds", assetsDir + "clouds.png");
*/
    const baseSpeed = 1;
    this.houseBuilder = new HouseBuilder(
      baseSpeed,
      350,
      window.innerWidth,
      window.innerHeight
    );
    this.houseList = [];

    this.cloudBuilder = new CloudBuilder(baseSpeed / 3, 200, window.innerHeight);
    this.cloudList = [];

    this.loader.load(this.draw.bind(this));
  }

  draw() {
    /*
    this.background = new Background();
    this.ground = new Ground();
    this.clouds = new Clouds();
    this.player = new Player();

    this.stage.addChild(this.background, this.ground, this.clouds, this.player);

    this.onResize();

    // Create an update loop
    */
    const white = 0xffffff;
    const black = 0x000000;
    const bgRect = new Rectangle(0, 0, window.innerWidth, window.innerHeight);
    this.background = new Graphics();
    this.background
      .beginFill(black)
      .drawRect(bgRect.x, bgRect.y, bgRect.width, bgRect.height)
      .endFill();

    this.stars = new Stars(window.innerWidth, window.innerHeight / 3);

    this.stage.addChild(this.background, this.stars);

    this.ticker.add(this.onUpdate.bind(this));
  }

  onUpdate(delta) {
    this.buildScollElements();

    this.houseList.forEach((house) => house.onUpdate(delta, this.stage));
    this.cloudList.forEach((cloud) => cloud.onUpdate(delta, this.stage));

    this.houseList = this.houseList.filter(house => !house._destroyed)
    this.cloudList = this.cloudList.filter(cloud => !cloud._destroyed)
    /*
    this.ground.onUpdate(delta);
    this.clouds.onUpdate(delta);
    */
  }
  buildScollElements() {
    const house = this.houseBuilder.buildIfPossible();
    if (house) {
      this.houseList.push(house);
      this.stage.addChild(house);
    }

    const cloud = this.cloudBuilder.buildIfPossible();
    if (cloud) {
      this.cloudList.push(cloud);
      this.stage.addChild(cloud);
    }
  }

  onResize() {
    this.renderer.resize(window.innerWidth, window.innerHeight);
    const width = this.renderer.width,
      height = this.renderer.height;
    /*
    this.background.onResize(width, height);
    this.ground.onResize(width, height);
    this.clouds.onResize(width, height);
    this.player.onResize(width, height);
    */
  }
}
