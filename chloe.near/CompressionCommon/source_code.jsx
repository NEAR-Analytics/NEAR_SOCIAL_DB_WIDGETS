const CompressionCommon = {
  getCroppedBuffer: (array, start, length, capacity) => {
    capacity = capacity || length;
    const cropped = new Uint8Array(capacity);
    cropped.set(array.subarray(start, start + length));
    return cropped;
  },
};
