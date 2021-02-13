import { Graphics, Sprite } from "pixi.js";

const outlineWidth = 2;
const outlineColor = 0xffffff;

/** Milliseconds until an update will happen. */
const windowUpdateRate = 75;

const windowWidth = 16;
const windowHeight = 32;
const rowGap = 8;
const columnGap = 8;
/** Gap between light toggles in same hose in pixel (min distance the house has to travel between two light toggles). */
const windowToggleGap = 50;

const darkColor = 0x000000;
const litWindowColor = 0xffffff;

export class HouseWindow extends Graphics {
  constructor(toggleDistance) {
    super();
    this.isLit = false;
    this.onceToggled = false;
    this.toggleDistance = toggleDistance;
    this.lastUpdate = 0;

    this.lineStyle(outlineWidth, outlineColor)
      .beginFill(darkColor)
      .drawRect(0, 0, windowWidth, windowHeight)
      .endFill();
  }

  toggleLight() {
    this.isLit = !this.isLit;

    if (this.isLit) {
      this.clear()
        .lineStyle(outlineWidth, outlineColor)
        .beginFill(litWindowColor)
        .drawRect(0, 0, windowWidth, windowHeight)
        .endFill();
    } else {
      this.clear()
        .lineStyle(outlineWidth, outlineColor)
        .beginFill(darkColor)
        .drawRect(0, 0, windowWidth, windowHeight)
        .endFill();
    }
  }

  onUpdate(delta) {
    if (this.onceToggled || !this.toggleDistance) {
      return;
    }
    if (!this.parent) {
      throw new Error(`onUpdate failed. HouseWindow not connected to parent.`);
    }
    this.lastUpdate += delta;
    if (
      this.lastUpdate >= windowUpdateRate &&
      this.parent.x >= this.toggleDistance
    ) {
      this.toggleLight();
      this.onceToggled = true;
    }
  }
}

export class House extends Graphics {
  constructor(
    windowList,
    windowsPerColumn,
    windowsPerRow,
    speed,
    canvasWidth,
    canvasHeight
  ) {
    super();
    this.speed = speed;
    this.windows = windowList;
    this.canvasWidth = canvasWidth;
    this.initWindowPositions(windowsPerColumn, windowsPerRow);
    this.addChild(...this.windows);

    const width =
      windowsPerColumn * windowWidth + (windowsPerColumn + 2) * columnGap;
    const height = windowsPerRow * windowHeight + (windowsPerRow + 2) * rowGap;
    this.x = -width;
    this.y = canvasHeight - height;

    this.lineStyle(outlineWidth, outlineColor)
      .beginFill(darkColor)
      .drawRect(0, 0, width, height);
  }

  initWindowPositions(windowsPerColumn, windowsPerRow) {
    if (this.windows.length != windowsPerColumn * windowsPerRow) {
      throw new Error(
        `initWindowPositions failed. windows.length != windowsPerColumn * windowsPerRow is false! windowList.length is ${
          this.windows.length
        } but should be ${windowsPerColumn * windowsPerRow}`
      );
    }
    for (let row = 0; row < windowsPerRow; row++) {
      for (let column = 0; column < windowsPerColumn; column++) {
        const indexOffset = row * windowsPerColumn;
        const currentWindow = this.windows[indexOffset + column];
        currentWindow.x = (column + 1) * rowGap + column * windowWidth;
        currentWindow.y = (row + 1) * columnGap + row * windowHeight;
      }
    }
  }

  onUpdate(delta, parent) {
    if (this.x > this.canvasWidth) {
      parent.removeChild(this);
    }
    this.x += Math.floor(this.speed * delta);
    this.windows.forEach((window) => window.onUpdate(delta));
  }
}

export class HouseBuilder {
  constructor(scrollingSpeed, maxBuildOffset, canvasWidth, canvasHeight) {
    this.scrollingSpeed = scrollingSpeed;
    this.buildOffset = 0;
    this.maxBuildOffset = maxBuildOffset;
    this.lastHouse = null;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.maxWindowRows = Math.floor((canvasHeight / windowHeight) * 0.3);
    this.minWindowRows = Math.max(3, Math.floor(this.maxWindowRows / 3));
    this.maxWindowColumns = 4;
    this.minWindowColumns = 2;
  }

  /**
   * @returns {House} if one was built, undefined otherwise
   */
  buildIfPossible() {
    if (this.lastHouse == null || this.lastHouse.x > 0 + this.buildOffset) {
      const newHouse = this.randomizeHouse();
      this.lastHouse = newHouse;
      this.randomizeBuildOffset();
      return newHouse;
    }

    return undefined;
  }

  randomizeHouse() {
    const houseHeight =
      Math.floor(Math.random() * this.maxWindowRows) + this.minWindowRows;
    const houseWidth =
      Math.floor(Math.random() * this.maxWindowColumns) + this.minWindowColumns;

    const windowCount = houseHeight * houseWidth;

    const windowList = [];
    for (let i = 0; i < windowCount; i++) {
      windowList.push(new HouseWindow(this.getRandomToggleDistance()));
    }

    const litWindowCount = Math.round(Math.random() * 0.5 * windowCount);
    getRandom(windowList, litWindowCount).forEach((window) => {
      window.toggleLight();
    });

    return new House(
      windowList,
      houseWidth,
      houseHeight,
      this.scrollingSpeed,
      this.canvasWidth,
      this.canvasHeight
    );
  }

  randomizeBuildOffset() {
    this.buildOffset = Math.floor(Math.random() * this.maxBuildOffset);
  }

  getRandomToggleDistance() {
    const willToggle = Math.round(Math.random()) === 1;
    if (!willToggle) {
      return null;
    }

    let toggleDistance = Math.floor(Math.random() * this.canvasWidth);

    return toggleDistance;
  }
}

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
