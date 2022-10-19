const canvasSketch = require("canvas-sketch");

const settings = {
  // Enable an animation loop
  animate: true,
  // Set loop duration to 3
  duration: 1,
  // Use a small size for better GIF file size
  dimensions: [500, 500],
  // Optionally specify a frame rate, defaults to 30
  fps: 30,
};

// assumes range is 0-1
const mapRange1 = (x, y, t) => {
  return x + t * (y - x);
};

const BLUE = "#2E4CEA";
const BLACK = "#101010";

const movingEye = (context, x, y, t) => {
  context.fillStyle = "white";
  context.beginPath();
  context.ellipse(50 + 100 * x, 50 + 100 * y, 25, 25, 0, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = BLUE;
  context.beginPath();
  context.ellipse(
    mapRange1(50, 32, t) + 100 * x,
    50 + 100 * y,
    mapRange1(15, 7, t),
    15,
    0,
    0,
    Math.PI * 2
  );
  context.fill();

  context.fillStyle = BLACK;
  context.beginPath();
  context.ellipse(
    mapRange1(50, 30, t) + 100 * x,
    50 + 100 * y,
    mapRange1(8, 5, t),
    8,
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
        x % 2 == 0
          ? eyeLeft(context, x, y)
          : movingEye(context, x, y, playhead);
      }
    }
  };
}, settings);
