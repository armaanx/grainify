self.onmessage = (e) => {
  const { imageData, amount, grainType, grayscale } = e.data;
  const data = new Uint8ClampedArray(imageData.data);
  const length = data.length;
  const halfAmount = amount / 2;

  if (grayscale) {
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
    if (amount == 0) {
      self.postMessage({
        processedData: new ImageData(data, imageData.width, imageData.height),
      });
      return;
    }
  }

  if (grainType === "monochrome" && amount > 0) {
    for (let i = 0; i < length; i += 4) {
      const grain = Math.random() * amount - halfAmount;
      data[i] = Math.min(255, Math.max(0, data[i] + grain)); // Red
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain)); // Green
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain)); // Blue
    }
  } else if (grainType === "color" && amount > 0) {
    for (let i = 0; i < length; i += 4) {
      const redGrain = Math.random() * amount - halfAmount;
      const greenGrain = Math.random() * amount - halfAmount;
      const blueGrain = Math.random() * amount - halfAmount;
      data[i] = Math.min(255, Math.max(0, data[i] + redGrain)); // Red
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + greenGrain)); // Green
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + blueGrain)); // Blue
    }
  }

  self.postMessage({
    processedData: new ImageData(data, imageData.width, imageData.height),
  });
};
