function removeProsody(word) {
  let wordArr = Array.from(word);

  const filtered = wordArr.filter(
    (letter) =>
      letter !== "." && letter !== "ˈ" && letter !== "ˌ" && letter !== "\u0301"
  );

  word = filtered.join("");

  return word;
}

export default removeProsody;
