import { Graphics, Point } from "pixi.js";

export class Stars extends Graphics {
  constructor(canvasWidth, maxHeight) {
    super();
    this.x = 0;
    this.y = 0;
    this.width = canvasWidth;

    const starCoordinates = [];
    for (let i = 0; i < 200; i++) {
      const newCoordinate = new Point(
        Math.floor(Math.random() * canvasWidth),
        Math.floor((Math.random() * maxHeight))
      );
      this.lineStyle(1, 0xffffff).drawStar(
        newCoordinate.x,
        newCoordinate.y,
        5,
        2
      );
      starCoordinates.push(newCoordinate);
    }
  }
}
