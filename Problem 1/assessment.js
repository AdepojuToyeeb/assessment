function countLetters(str) {
  let letters = str.split("");
  return letters.reduce(
    (acc, curr) => {
      acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
      return acc;
    },
    { word: letters }
  );

  return str;
}

console.log(countLetters("javascript"));
