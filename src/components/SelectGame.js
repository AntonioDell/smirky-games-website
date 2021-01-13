import * as PIXI from "pixi.js";
import canonHeadImg from "../assets/canon_head.png";
import canonBodyImg from "../assets/canon_body.png";

export default async function setupGameCanvas(div, width, height) {
  const app = new PIXI.Application();
  div.appendChild(app.view);

  // // Load them google fonts before starting...!
  window.WebFontConfig = {
    google: {
      families: ["Snippet", "Arvo:700italic", "Podkova:700"],
    },

    active() {
      init(app);
    },
  };
  /* eslint-disable */
  // include the web-font loader script
  (function () {
    const wf = document.createElement("script");
    wf.src = `${
      document.location.protocol === "https:" ? "https" : "http"
    }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
    wf.type = "text/javascript";
    wf.async = "true";
    const s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(wf, s);
  })();
  /* eslint-enabled */
}
function init(app) {
  const style = new PIXI.TextStyle({
    fontFamily: "Snippet",
    fontSize: 18,
    fill: "white", // gradient
  });

  const text = new PIXI.Text("Hello world", style);
  text.x = 10;
  text.y = 10;
  const background = new PIXI.Sprite(PIXI.Texture.WHITE);
  background.width = app.screen.width;
  background.height = app.screen.height;
  background.tint = 0x000;

  const canonHead = PIXI.Sprite.from(canonHeadImg);
  canonHead.x = app.screen.width / 2;
  canonHead.y = app.screen.height - (25 + 5);
  canonHead.anchor.set(0.5);
  const canonBody = PIXI.Sprite.from(canonBodyImg);
  canonBody.x = app.screen.width / 2;
  canonBody.y = app.screen.height - 16;
  canonBody.anchor.set(0.5);

  // Line with length 0
  const lineToCursor = new Line(
    [canonHead.x, canonHead.y, canonHead.x, canonHead.y],
    1,
    0xfff
  );

  setupCursor(app, background);
  app.stage.addChild(background, text, canonBody, canonHead, lineToCursor);

  app.ticker.add((delta) => {
    const mouseCoords = app.renderer.plugins.interaction.mouse.global;
    if (
      app.screen.width > mouseCoords.x &&
      mouseCoords.x > 0 &&
      app.screen.height > mouseCoords.y &&
      mouseCoords.y > 0
    ) {
      canonHead.rotation = radiansBetween(
        canonHead.x,
        canonHead.y,
        mouseCoords.x,
        mouseCoords.y
      );
      lineToCursor.updatePoints([null, null, mouseCoords.x, mouseCoords.y]);
    }
  });
}

function setupCursor(app, container) {
  app.renderer.plugins.interaction.cursorStyles.crosshair = {
    cursor: "crosshair",
  };
  container.interactive = true;
  container.cursor = "crosshair";
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

function radiansBetween(fromX, fromY, toX, toY) {
  let deltaX = fromX - toX;
  let deltaY = fromY - toY;
  return Math.atan2(deltaY, deltaX) - Math.PI * 0.5;
}
