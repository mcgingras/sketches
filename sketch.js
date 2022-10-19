const canvasSketch = require("canvas-sketch");

const settings = {
  // Enable an animation loop
  animate: true,
  // Set loop duration to 3
  duration: 3,
  // Use a small size for better GIF file size
  dimensions: [500, 500],
  // Optionally specify a frame rate, defaults to 30
  fps: 30,
};

const circle = (context, x, y) => {
  context.fillStyle = "white";
  context.beginPath();
  context.ellipse(50 + 100 * x, 50 + 100 * y, 25, 25, 0, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#2E4CEA";
  context.beginPath();
  context.ellipse(50 + 100 * x, 50 + 100 * y, 15, 15, 0, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#101010";
  context.beginPath();
  context.ellipse(50 + 100 * x, 50 + 100 * y, 8, 8, 0, 0, Math.PI * 2);
  context.fill();
};

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height }) => {
    context.fillStyle = "#EB4548";
    context.fillRect(0, 0, width, height);

    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        circle(context, x, y);
      }
    }
  };
}, settings);
