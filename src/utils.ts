
export function removeLastWord(sentence: string) {
  return sentence.substring(0, sentence.lastIndexOf(' '));
}

export function repeat<T>(times: number, callback: (index: number) => T): T[] {
  const array = Array(times).fill(0);
  return array.map((_, index) => callback(index));
}
