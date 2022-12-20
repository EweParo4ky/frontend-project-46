import stylish from "./stylish.js";
import plain from "./plain.js";

const formatter = (diff, formatType) => {
  if (formatType === 'stylish') {
    return stylish(diff);
  }
  if (formatType === 'plain') {
    return plain(diff);
  }
  throw new Error (`'${formatType}' this format is not supported`);
}

export default formatter;