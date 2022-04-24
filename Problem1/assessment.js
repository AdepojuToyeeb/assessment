function countLetters(str) {
  let letters = str.toUpperCase().split("");
  return letters.reduce((acc, curr) => {
    acc[curr] = acc[curr] ? acc[curr] + 1 : 1;

    return acc;
  }, []);
}

console.log(countLetters("Chinmay Kulkarni"));
