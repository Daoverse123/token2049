export function limitCharacters(sentence: string, maxLength: number) {
  if (sentence.length > maxLength) {
    // Trim the sentence to the maximum length and add an ellipsis
    return sentence.substring(0, maxLength - 3) + "...";
  } else {
    // Return the original sentence if it doesn't exceed the limit
    return sentence;
  }
}
