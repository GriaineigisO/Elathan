import ipaChars from "../assets/ipaChars";

const spell = (ipa, spellingGuide) => {
  if (!ipa) return ipa;

  // turn string into array
  const arr = Array.from(ipa);

  for (let i = 0; i < arr.length; i++) {

    // remove combining marks
    if (arr[i] === "\u032F") {
      arr.splice(i, 1);
      i--;
    }

    // join any IPA modifier chars
    else if (ipaChars.includes(arr[i]) && i > 0) {
      arr[i - 1] += arr[i];
      arr.splice(i, 1);
      i--;
    }

    // tʃ
    else if (arr[i] === "ʃ" && arr[i - 1] === "t") {
      arr[i - 1] += arr[i];
      arr.splice(i, 1);
      i--;
    }

    // dʒ
    else if (arr[i] === "ʒ" && arr[i - 1] === "d") {
      arr[i - 1] += arr[i];
      arr.splice(i, 1);
      i--;
    }

    // remove prosody markers
    else if (arr[i] === "." || arr[i] === "ˈ" || arr[i] === "ˌ") {
      arr.splice(i, 1);
      i--;
    }
  }

  // ---- NEW MULTI-CHARACTER REPLACEMENT ----
  let spelledWord = arr.join("");


  // Sort keys by longest first so "xe" > "x"
  const sortedKeys = Object.keys(spellingGuide).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    const replacement = spellingGuide[key];
    spelledWord = spelledWord.split(key).join(replacement);
  }


  return spelledWord;
};

export default spell;
