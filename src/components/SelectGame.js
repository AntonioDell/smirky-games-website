import * as PIXI from "pixi.js";
import canonHeadImg from "../assets/canon_head.png";
import canonBodyImg from "../assets/canon_body.png";
import * as WebFont from "webfontloader";

const HIGH_SCORE_MULTIPLYER = 50;
const MAX_HIGH_SCORE = 999999999;
export class SelectGame {
  /**
   *
   * @param {HTMLElement} div
   * @param {number} width
   * @param {number} height
   * @param {Array} selectableGames
   */
  constructor(div, width, height, selectableGames, initialGameIdSelected) {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    //PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;
    PIXI.settings.RESOLUTION = window.devicePixelRatio;

    const app = new PIXI.Application({
      width,
      height,
      resolution: window.devicePixelRatio || 1,
      autoResize: true,
    });
    div.appendChild(app.view);

    const highScoreY = app.screen.height - 40;
    // Highscore
    const highScoreLabelText = new PIXI.Text(
      "Highscore:",
      new PIXI.TextStyle({
        fontFamily: "Architects Daughter",
        fill: "white",
      })
    );
    highScoreLabelText.x = 10;
    highScoreLabelText.y = highScoreY;
    highScoreLabelText.scale.set(0.5);
    highScoreLabelText.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    const highScoreCounterText = new PIXI.Text(
      "".padStart(9, "0"),
      new PIXI.TextStyle({
        fontFamily: "Architects Daughter",
        fill: "white",
        fontWeight: "bold",
        letterSpacing: 5,
      })
    );
    highScoreCounterText.x = 10;
    highScoreCounterText.y = highScoreY + 15;
    highScoreCounterText.scale.set(0.5);
    highScoreCounterText.anchor.set(0);
    highScoreCounterText.texture.baseTexture.scaleMode =
      PIXI.SCALE_MODES.NEAREST;

    // Canon
    const bodyHeight = 16;
    const canonHead = PIXI.Sprite.from(canonHeadImg);
    canonHead.x = app.screen.width / 2;
    canonHead.y = app.screen.height - bodyHeight * 2;
    canonHead.anchor.set(0.5);
    const canonBody = PIXI.Sprite.from(canonBodyImg);
    canonBody.x = app.screen.width / 2;
    canonBody.y = app.screen.height - 16;
    canonBody.anchor.set(0.5);

    app.renderer.plugins.interaction.cursorStyles.crosshair = {
      cursor: "crosshair",
    };

    const background = new PIXI.Sprite(PIXI.Texture.WHITE);
    background.width = app.screen.width;
    background.height = app.screen.height;
    background.tint = 0x000;

    const border = new PIXI.Graphics();
    border
      .lineStyle(10, 0xffffff)
      .drawRect(0, 0, app.screen.width, app.screen.height);

    const gameContainer = new PIXI.Container();
    gameContainer.interactive = true;
    gameContainer.cursor = "crosshair";
    gameContainer.on("pointerdown", (event) => {
      const bullet = new Bullet(canonHead.position, event.data.global);
      this.bullets.push(bullet);
      gameContainer.addChild(bullet);
      this.followPoint(event.data.global);
    });
    gameContainer.on("touchmove", (event) => {
      this.followPoint(event.data.global);
    });
    gameContainer.addChild(
      background,
      highScoreLabelText,
      highScoreCounterText,
      canonBody,
      canonHead,
      border
    );
    const shootablePosition = { x: 50, y: 50 };
    const shootableTexts = selectableGames.map((game) => {
      const shootableGameText = new ShootableGameText(game, shootablePosition);
      shootablePosition.x += 100;
      gameContainer.addChild(shootableGameText);
      return shootableGameText;
    });
    app.stage.addChild(gameContainer);

    this.screenRect = app.screen;
    this.app = app;
    this.canonHead = canonHead;
    this.shootableTexts = shootableTexts;
    this.highScoreCounterText = highScoreCounterText;
    this.highScore = 0;
    this.gameContainer = gameContainer;
    this.bullets = [];
    this.selectedGame = {
      gameId: initialGameIdSelected,
      animationHandled: false,
      shootableText: shootableTexts.find(
        (text) => text.gameId === initialGameIdSelected
      ),
    };
    this.unselectedGame = {
      gameId: null,
      animationHandled: true,
      shootableText: null,
    };
  }

  start() {
    this.app.ticker.add((delta) => {
      this.followPoint(this.app.renderer.plugins.interaction.mouse.global);
      this.moveBullets(delta);
      this.handleBulletHits();
      this.handleSelectedGame(delta);
      this.handleUnselectedGame(delta);
    });
  }

  followPoint(point) {
    if (
      this.app.screen.width > point.x &&
      point.x > 0 &&
      this.app.screen.height > point.y &&
      point.y > 0
    ) {
      this.canonHead.rotation = radiansBetween(this.canonHead.position, point);
    }
  }
  moveBullets(delta) {
    const bulletsToRemove = [];
    for (const bullet of this.bullets) {
      const removeBullet = bullet.followDirection(delta, this.screenRect);
      if (removeBullet) {
        bulletsToRemove.push(bullet);
      }
    }
    this.removeBullets(bulletsToRemove);
  }

  handleBulletHits() {
    let firstHitFound = false;
    for (const text of this.shootableTexts) {
      const hittingBullets = this.bullets.filter((bullet) =>
        checkCollision(text, bullet)
      );
      if (hittingBullets.length > 0) {
        if (!firstHitFound) {
          this.setSelectedGame(text);
          firstHitFound = true;
        }
        this.addToHighScore(hittingBullets.length);
        this.removeBullets(hittingBullets);
      }
    }
  }

  handleSelectedGame(delta) {
    if (this.selectedGame.animationHandled) {
      return;
    }

    const text = this.selectedGame.shootableText;
    text.style.fill = "yellow";

    this.app.view.dispatchEvent(
      new CustomEvent("gameSelected", {
        bubbles: true,
        detail: { gameId: text.gameId },
      })
    );

    this.selectedGame.animationHandled = true;
  }

  handleUnselectedGame(delta) {
    if (this.unselectedGame.animationHandled) {
      return;
    }

    const text = this.unselectedGame.shootableText;
    text.style.fill = "white";
    this.unselectedGame.animationHandled = true;
  }

  removeBullets(bulletsToRemove) {
    if (bulletsToRemove.length === 0) {
      return;
    }
    console.log("bulletsToRemove are", bulletsToRemove);
    this.bullets = this.bullets.filter(
      (bullet) => bulletsToRemove.indexOf(bullet) == -1
    );
    bulletsToRemove.forEach((bullet) => this.gameContainer.removeChild(bullet));
  }

  /**
   *
   * @param {number} hits
   */
  addToHighScore(hits) {
    if (hits === 0) {
      return;
    }
    this.highScore += hits * HIGH_SCORE_MULTIPLYER;
    if (this.highScore >= MAX_HIGH_SCORE) {
      this.highScore = MAX_HIGH_SCORE;
    }
    this.highScoreCounterText.text = `${this.highScore}`.padStart(9, "0");
  }

  /**
   *
   * @param {ShootableGameText} text
   */
  setSelectedGame(text) {
    if (this.selectedGame.gameId === text.gameId) {
      return;
    }

    this.unselectedGame = {
      gameId: text.gameId,
      animationHandled: false,
      shootableText: this.selectedGame.shootableText,
    };
    this.selectedGame = {
      gameId: text.gameId,
      animationHandled: false,
      shootableText: text,
    };
  }
}

/**
 *
 * @param  {...String} fonts
 */
export function loadFonts(...fonts) {
  return new Promise((resolve, reject) => {
    WebFont.load({
      google: {
        //api: "https://fonts.googleapis.com/css2",
        families: fonts,
      },
      fontactive: (name, fvd) => {
        console.log(`Loading font files ${name}:${fvd}`);
      },
      active: () => {
        resolve();
      },
      inactive: () => {
        console.error("Error loading fonts");
        reject("Error loading fonts");
      },
    });
  });
}

/**
 *
 * @param {Point} from
 * @param {Point} to
 */
function radiansBetween(from, to) {
  let deltaX = from.x - to.x;
  let deltaY = from.y - to.y;
  return Math.atan2(deltaY, deltaX) - Math.PI * 0.5;
}

function checkCollision(object1, object2) {
  const bounds1 = object1.getBounds();
  const bounds2 = object2.getBounds();

  return (
    bounds1.x < bounds2.x + bounds2.width &&
    bounds1.x + bounds1.width > bounds2.x &&
    bounds1.y < bounds2.y + bounds2.height &&
    bounds1.y + bounds1.height > bounds2.y
  );
}

class Line extends PIXI.Graphics {
  constructor(points, lineSize, lineColor) {
    super();

    var s = (this.lineWidth = lineSize || 5);
    var c = (this.lineColor = lineColor || "0x000000");

    this.points = points;

    this.lineStyle(s, c);

    this.moveTo(points[0], points[1]);
    this.lineTo(points[2], points[3]);
  }

  updatePoints(p) {
    var points = (this.points = p.map(
      (val, index) => val || this.points[index]
    ));

    var s = this.lineWidth,
      c = this.lineColor;

    this.clear();
    this.lineStyle(s, c);
    this.moveTo(points[0], points[1]);
    this.lineTo(points[2], points[3]);
  }
}

class Bullet extends PIXI.Graphics {
  size = 10;
  color = 0xffffff;
  speed = 5;
  constructor(basePosition, trajectory) {
    super();

    this.direction = {
      x: trajectory.x - basePosition.x,
      y: trajectory.y - basePosition.y,
    };
    const distance = Math.sqrt(
      this.direction.x * this.direction.x + this.direction.y * this.direction.y
    );

    this.direction.x = this.direction.x / distance;
    this.direction.y = this.direction.y / distance;

    this.rect = new PIXI.Rectangle(
      basePosition.x - this.size / 2,
      basePosition.y - this.size / 2,
      this.size,
      this.size
    );

    this.beginFill(this.color)
      .drawRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
      .endFill();
  }

  /**
   *
   * @param {number} delta
   * @param {PIXI.Rectangle} screenRect
   */
  followDirection(delta, screenRect) {
    this.rect.x = this.rect.x + this.speed * delta * this.direction.x;
    this.rect.y = this.rect.y + this.speed * delta * this.direction.y;

    this.clear()
      .beginFill(this.color)
      .drawRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
      .endFill();

    const xDistance = screenRect.width - Math.abs(this.rect.x);
    const yDistance = screenRect.height - Math.abs(this.rect.y);

    return yDistance <= 0 || xDistance <= 0;
  }
}
class ShootableGameText extends PIXI.Text {
  constructor({ id, name }, position) {
    super(
      name,
      new PIXI.TextStyle({
        fontFamily: "Architects Daughter",
        fill: "white",
      })
    );

    this.gameId = id;
    this.position = position;
    this.anchor.set(0.5);
    this.scale.set(0.5);
    this.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  }
}
