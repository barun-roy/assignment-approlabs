const dotenv = require('dotenv');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

dotenv.config({path: './config/config.env'})

async function combineImages() {
  // Set the size of the canvas and images
  const width = 800;
  const height = 800;

  // Load the two images to combine
  const image1 = await loadImage(process.env.IMAGE1);
  const image2 = await loadImage(process.env.IMAGE1);

  // Create a new canvas element with the desired size
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Draw the first image on the top left corner of the canvas
  context.drawImage(image1, 0, 0);

  // Draw the second image on the bottom right corner of the canvas
  context.drawImage(image2, width - image2.width, height - image2.height);

  // Apply a grayscale filter to the combined image
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }

  context.putImageData(imageData, 0, 0);

  // Save the resulting image as a new file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(process.env.FINAL_IMAGE, buffer);
}

combineImages();