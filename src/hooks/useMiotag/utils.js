// @flow

const unwrapBase64Value = (input) => {
  const b = Buffer.from(input, 'base64');
  let value;
  switch (b.length) {
    case 1:
      value = b.readInt8();
      break;
    case 4:
      value = b.readInt32LE();
      break;
    default:
      value = input;
  }
  return value;
};

export { unwrapBase64Value };
