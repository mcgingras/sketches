const canvasSketch = require("canvas-sketch");

const settings = {
  animate: true,
  duration: 1,
  dimensions: [500, 500],
  fps: 30,
};

// assumes range is 0-1
const mapRange1 = (x, y, t) => {
  return x + t * (y - x);
};

const BLUE = "#2E4CEA";
const BLACK = "#101010";

const directionMap = {
  LEFT: {
    blueXPos: 32,
    blueYPos: 50,
    blueWidth: 7,
    blueHeight: 15,
    blackXPos: 30,
    blackYPos: 50,
    blackWidth: 5,
    blackHeight: 8,
  },
  RIGHT: {
    blueXPos: 68,
    blueYPos: 50,
    blueWidth: 7,
    blueHeight: 15,
    blackXPos: 70,
    blackYPos: 50,
    blackWidth: 5,
    blackHeight: 8,
  },
  BOTTOM: {
    blueXPos: 50,
    blueYPos: 68,
    blueWidth: 15,
    blueHeight: 7,
    blackXPos: 50,
    blackYPos: 70,
    blackWidth: 8,
    blackHeight: 5,
  },
};

const movingEye = (context, x, y, td, direction) => {
  const config = directionMap[direction];
  // 0, 25, 50, 75, 100
  // 0, 25, 50, 25, 0
  // t goes from 0 -> 1
  let t;
  if (td > 0.5) {
    t = 1 - td;
  } else {
    t = td;
  }
  t = t * 2;

  context.fillStyle = "white";
  context.beginPath();
  context.ellipse(50 + 100 * x, 50 + 100 * y, 25, 25, 0, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = BLUE;
  context.beginPath();
  context.ellipse(
    mapRange1(50, config.blueXPos, t) + 100 * x,
    mapRange1(50, config.blueYPos, t) + 100 * y,
    mapRange1(15, config.blueWidth, t),
    mapRange1(15, config.blueHeight, t),
    0,
    0,
    Math.PI * 2
  );
  context.fill();

  context.fillStyle = BLACK;
  context.beginPath();
  context.ellipse(
    mapRange1(50, config.blackXPos, t) + 100 * x,
    mapRange1(50, config.blackYPos, t) + 100 * y,
    mapRange1(8, config.blackWidth, t),
    mapRange1(8, config.blackHeight, t),
    0,
    0,
    Math.PI * 2
  );
  context.fill();
};

const eye = (context, x, y) => {
  context.fillStyle = "white";
  context.beginPath();
  context.ellipse(50 + 100 * x, 50 + 100 * y, 25, 25, 0, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = BLUE;
  context.beginPath();
  context.ellipse(50 + 100 * x, 50 + 100 * y, 15, 15, 0, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = BLACK;
  context.beginPath();
  context.ellipse(50 + 100 * x, 50 + 100 * y, 8, 8, 0, 0, Math.PI * 2);
  context.fill();
};

const eyeLeft = (context, x, y) => {
  context.fillStyle = "white";
  context.beginPath();
  context.ellipse(50 + 100 * x, 50 + 100 * y, 25, 25, 0, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = BLUE;
  context.beginPath();
  context.ellipse(32 + 100 * x, 50 + 100 * y, 7, 15, 0, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = BLACK;
  context.beginPath();
  context.ellipse(30 + 100 * x, 50 + 100 * y, 5, 8, 0, 0, Math.PI * 2);
  context.fill();
};

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, playhead }) => {
    context.fillStyle = "#EB4548";
    context.fillRect(0, 0, width, height);

    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        let rem = x % 3;
        switch (rem) {
          case 0:
            movingEye(context, x, y, playhead, "LEFT");
            break;
          case 1:
            movingEye(context, x, y, playhead, "RIGHT");
            break;
          case 2:
            movingEye(context, x, y, playhead, "BOTTOM");
            break;
        }
      }
    }
  };
}, settings);
