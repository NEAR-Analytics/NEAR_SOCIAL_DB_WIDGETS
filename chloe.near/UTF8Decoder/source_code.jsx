const UTF8Decoder = {
  decodeUTF8: (input) => {
    let output = "";
    for (let i = 0; i < input.length; i++) {
      const value = input[i];
      if (value >>> 7 === 0) {
        output += String.fromCharCode(value);
      } else if (value >>> 5 === 6) {
        const value2 = input[++i];
        output += String.fromCharCode(((value & 0x1f) << 6) | (value2 & 0x3f));
      } else if (value >>> 4 === 14) {
        const value2 = input[++i];
        const value3 = input[++i];
        output += String.fromCharCode(
          ((value & 0x0f) << 12) | ((value2 & 0x3f) << 6) | (value3 & 0x3f)
        );
      } else {
        const value2 = input[++i];
        const value3 = input[++i];
        const value4 = input[++i];
        const codepoint =
          ((value & 0x07) << 18) |
          ((value2 & 0x3f) << 12) |
          ((value3 & 0x3f) << 6) |
          ((value4 & 0x3f) - 0x10000);
        output += String.fromCharCode(
          (codepoint >> 10) + 0xd800,
          (codepoint & 0x3ff) + 0xdc00
        );
      }
    }
    return output;
  },
};
