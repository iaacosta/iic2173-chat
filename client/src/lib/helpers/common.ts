export const hyphenate = (str: string, max: number) => {
  const newString: string[] = [];

  Array.from(str).forEach((char, i) => {
    if (i % (max - 1) !== 0 || i === 0) newString.push(char);
    else {
      newString.push('-\n');
      newString.push(char);
    }
  });

  return newString.join('');
};
