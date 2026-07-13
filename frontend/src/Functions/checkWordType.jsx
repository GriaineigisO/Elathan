  function checkWordType(word) {

    
    if (word.word_type === "suffix" || word.word_type === "enclitic") {
      return `-${word.word}`;
    } else if (word.word_type === "prefix" || word.word_type === "proclitic") {
      return `${word.word}-`;
    } else {
      return word.word;
    }
  }

  export default checkWordType;