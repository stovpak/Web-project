export const range = (fromIndex, toIndex) => {
  let i = fromIndex;
  return new Array(toIndex - fromIndex + 1).fill(null).map(() => i++);
};
