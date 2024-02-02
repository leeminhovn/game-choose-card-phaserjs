export const handleAddUrlPathImageAndAudio = (arrayWord) => {
  return arrayWord.map((word) => {
    return {
      ...word,
      picture: word.picture
        ? `https://mochien3.1-api.mochidemy.com/public/images/question/${word.picture}`
        : word.picture,
      audio: `https://mochien3.1-api.mochidemy.com/public/audios/question/${word.audio}`,
    };
  });
};
export function getRandomNumberInRange(i, n) {
  return Math.floor(Math.random() * (n - i + 1)) + i;
}
export function shuffleArray(array) {
  return [...array]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
