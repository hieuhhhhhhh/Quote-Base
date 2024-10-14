function Shuffle(array) {
  let current = array.length,
    random;

  // iterate every element:
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    // swap current with random
    [array[current], array[random]] = [array[random], array[current]];
  }
}

export default Shuffle;
