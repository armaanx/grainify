self.onmessage = (e) => {
  const { imageData } = e.data;
  const data = new Uint8ClampedArray(imageData.data);
  const length = data.length;

  // Convert the image to grayscale
  for (let i = 0; i < length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    // Using the luminance formula to convert to grayscale
    const grayscale = 0.299 * red + 0.587 * green + 0.114 * blue;

    // Set the RGB channels to the grayscale value
    data[i] = grayscale; // Red
    data[i + 1] = grayscale; // Green
    data[i + 2] = grayscale; // Blue
  }

  self.postMessage({
    processedData: new ImageData(data, imageData.width, imageData.height),
  });
};
