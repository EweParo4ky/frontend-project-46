import stylish from "./stylish.js";

const formatter = (diff, formatType) => {
  if (formatType === 'stylish') {
    return stylish(diff)
  }
  throw new Error (`'${formatType}' this format is not supported`);
}

export default formatter;