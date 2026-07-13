import checkWordType from "./checkWordType";

  function checkIfProto(id, word, languageData) {
    
    const chosenLanguage = languageData.filter(
      (language) => language.language_id === id,
    );

    if (chosenLanguage[0].is_proto) {
      return `*${checkWordType(word)}`;
    } else {
      return checkWordType(word);
    }
  }

  export default checkIfProto;