const ArrayTools = {
  convertToUint8ArrayIfNeeded: (input) => {
    if (input.constructor === Uint8Array) {
      return input;
    }
    return new Uint8Array(input);
  },
  doubleByteArrayCapacity: (array) => {
    const newArray = new Uint8Array(array.length * 2);
    newArray.set(array);
    return newArray;
  },
};
