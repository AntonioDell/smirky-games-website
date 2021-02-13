import { Application } from "@pixi/app";
import { Graphics, GraphicsGeometry, Rectangle } from "pixi.js";
import { HouseBuilder } from "./House";

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
    this.houseBuilder = new HouseBuilder(
      1,
      350,
      window.innerWidth,
      window.innerHeight
    );
    this.houseList = [];

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

    this.stage.addChild(this.background);

    this.ticker.add(this.onUpdate.bind(this));
  }

  onUpdate(delta) {
    const house = this.houseBuilder.buildIfPossible();
    if (house) {
      this.houseList.push(house);
      this.stage.addChild(house);
    }

    this.houseList.forEach((house) => house.onUpdate(delta, this.stage));

    /*
    this.ground.onUpdate(delta);
    this.clouds.onUpdate(delta);
    */
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
