import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useTranslate } from "../Functions/TranslateUI";


const PrintOptionsModal = ({ show, setShow,  setLoading, allWords, setAllEnglishWords, id, showPrintedDictionary, setShowPrintedDictionary, setVisibleWords, addPhrasesToWords, dictionaryType, setDictionaryType}) => {
      const { translate } = useTranslate();

    const [showClassicBilingualExplanation, setShowClassicBilingualExplanation] = useState(true);
    const [showEtymologicalExplanation, setShowEtymologicalExplanation] = useState(false);
  const print = () => {
    setShow(false);
    getAllWordsForPrint();
    
    if (dictionaryType === "classic-bilingual") {
        PrintClassicBilingual();
    }

    if (dictionaryType === "etymological") {
        PrintEtymological();
        
    }
  };

  const handleDictionaryType = (e) => {
    setDictionaryType(e.target.value);

    if (dictionaryType === "classic-bilingual") {
        setShowClassicBilingualExplanation(false);
        setShowEtymologicalExplanation(true);
    }

    if (dictionaryType === "etymological") {
        setShowClassicBilingualExplanation(true);
        setShowEtymologicalExplanation(false);
    }


  }

  const getAllWordsForPrint = async () => {
    setLoading(true);

    //prepare arrays to display the english > language part of the dictionary
    let addedEnglishWords = []; //all English words happened upon are stored in this array, so we can check if an english word has already been entered e.g in the case of synonyms

    let fromEnglishDictionary = [];

    const skipWords = [
      "a",
      "-",
      "/",
      "an",
      "the",
      "has",
      "you",
      "I",
      "us",
      "him",
      "her",
      "them",
    ];
    const skipIfMultipleWords = [
      "who",
      "that",
      "which",
      "or",
      "of",
      "is",
      "to",
      "at",
      "for",
      "be",
      "you",
      "one",
      "was",
      "we",
      "you",
      "I",
      "us",
      "he",
      "she",
      "it",
      "him",
      "her",
      "they",
      "them",
      "where",
      "and",
    ];

    const manageFromEnglishDictionary = (posMeaning, pos, word) => {
      posMeaning.forEach((rawEnglishWord) => {
        let englishWord = rawEnglishWord.trim();

        // Special case: remove "to " if it's a verb meaning
        if (pos === "v" && englishWord.toLowerCase().startsWith("to ")) {
          englishWord = englishWord.slice(3).trim(); // remove "to "
        }

        if (englishWord.startsWith("(")) return; //skip if the word is something like "(of rivers)"

        if (!addedEnglishWords.includes(englishWord.toLowerCase())) {
          const words = englishWord.trim().split(/\s+/); //split string by whitespace incase the translation is made of several english words e.g "inhospitable place"

          const hasMultipleWords = words.length > 1;

          if (hasMultipleWords) {
            words.forEach((splitWord) => {
              const lowerSplit = splitWord.toLowerCase();

              if (
                skipWords.includes(splitWord) ||
                skipIfMultipleWords.includes(splitWord)
              )
                return;

              if (!addedEnglishWords.includes(lowerSplit)) {
                addedEnglishWords.push(lowerSplit);

                let obj = {
                  english_word: lowerSplit,
                  language_entries: [],
                  phrases: [],
                };

                let phrase = {
                  english: rawEnglishWord
                    .replace(splitWord, "~")
                    .replace(/^to\s+/i, ""),
                  language_word: word.word,
                  part_of_speech: [pos],
                };

                obj.phrases.push(phrase);
                fromEnglishDictionary.push(obj);
              } else {
                // If already exists, update existing entry
                fromEnglishDictionary.forEach((obj) => {
                  if (obj.english_word === lowerSplit) {
                    let phrase = {
                      english: rawEnglishWord
                        .replace(splitWord, "~")
                        .replace(/^to\s+/i, ""),
                      language_word: word.word,
                      part_of_speech: [pos],
                    };
                    obj.phrases.push(phrase);
                  }
                });
              }
            });
          } else {
            if (skipWords.includes(englishWord.toLowerCase())) return;

            addedEnglishWords.push(englishWord.toLowerCase());

            let obj = {
              english_word: englishWord.toLowerCase(),
              language_entries: [{ part_of_speech: pos, word: word.word }],
              phrases: [],
            };

            fromEnglishDictionary.push(obj);
          }
        } else {
          const words = englishWord.trim().split(/\s+/); //split string by whitespace incase the translation is made of several english words e.g "inhospitable place"
          const hasMultipleWords = words.length > 1;

          if (hasMultipleWords) {
            //find the object which already has the english word, add the language word to the phrases

            words.forEach((splitWord) => {
              if (
                skipWords.includes(splitWord) ||
                skipIfMultipleWords.includes(splitWord)
              )
                return;

              fromEnglishDictionary.forEach((obj) => {
                if (obj.english_word === splitWord.toLowerCase()) {
                  let phrase = {
                    english: rawEnglishWord
                      .replace(splitWord, "~")
                      .replace(/^to\s+/i, ""),
                    language_word: word.word,
                    part_of_speech: [pos],
                  };

                  obj.phrases.push(phrase);
                  obj.part_of_speech.push(pos);
                }
              });
            });
          } else {
            //find the object which already has the english word, add the language_word to the translation
            fromEnglishDictionary.forEach((obj) => {
              if (skipWords.includes(englishWord.toLowerCase())) return;

              if (obj.english_word === englishWord.toLowerCase()) {
                obj.language_entries.push({
                  part_of_speech: pos,
                  word: word.word,
                });

                //obj.part_of_speech.push("n");
              }
            });
          }
        }
      });
    };

    let affixesArr = [];

    allWords.forEach((word) => {
      if (word.word_type === "word") {
        if (word.noun_meaning) {
          manageFromEnglishDictionary(word.noun_meaning, "n", word);
        }
        if (word.adj_meaning) {
          manageFromEnglishDictionary(word.adj_meaning, "adj", word);
        }
        if (word.num_meaning) {
          manageFromEnglishDictionary(word.num_meaning, "num", word);
        }
        if (word.adv_meaning) {
          manageFromEnglishDictionary(word.adv_meaning, "adv", word);
        }
        if (word.adp_meaning) {
          manageFromEnglishDictionary(word.adp_meaning, "adp", word);
        }
        if (word.conj_meaning) {
          manageFromEnglishDictionary(word.conj_meaning, "conj", word);
        }
        if (word.interj_meaning) {
          manageFromEnglishDictionary(word.interj_meaning, "interj", word);
        }
        if (word.pron_meaning) {
          manageFromEnglishDictionary(word.pron_meaning, "pron", word);
        }
        if (word.part_meaning) {
          manageFromEnglishDictionary(word.part_meaning, "part", word);
        }
        if (word.affix_meaning) {
          manageFromEnglishDictionary(word.affix_meaning, "affix", word);
        }
        if (word.verb_meaning) {
          manageFromEnglishDictionary(word.verb_meaning, "v", word);
        }
      } else {
        affixesArr.push(word);
      }
    });

    fromEnglishDictionary.sort((a, b) =>
      a.english_word.localeCompare(b.english_word)
    );
    

    setAllEnglishWords(fromEnglishDictionary);

    console.log("getting all words for print")

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getAllWordsForPrint`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    console.log(data)

    let data = await response.json();
    
    if (data) {
      setLoading(false);
      if (showPrintedDictionary) {
        setShowPrintedDictionary(false);
      } else {
        setShowPrintedDictionary(true);
      }
    }

    //add "to " before each verb's translation
    data = data.map((word) => {
      if (word.verb_meaning) {
        return {
          ...word,
          verb_meaning: word.verb_meaning.map((verb) => {
            // Only add 'to ' if it doesn't already start with it
            return verb.startsWith("to ") || verb.startsWith("(")
              ? verb
              : `to ${verb}`;
          }),
        };
      }
      return word;
    });

    const affixes = data.filter(
      (word) => word.word_type === "suffix" || word.word_type === "prefix"
    );

    const words = data.filter((word) => word.word_type === "word");

    const processed = addPhrasesToWords(data);
    setVisibleWords(processed);

    setShowPrintedDictionary(true);
    setLoading(false);
  };

  const PrintClassicBilingual = () => {

  }

  const PrintEtymological = () => {
    setLoading(true);
  }

  const close = () => {
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={close}
      size="lg"
      backdrop={true}
      dialogClassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>{translate("Print Options")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="thin-white-border">
            <p>{translate("Dictionary Type")}</p>
          <select value={dictionaryType} onChange={handleDictionaryType}>
            <option value="classic-bilingual">{translate("Classic Bilingual Dictionary")}</option>
            <option value="etymological">{translate("Etymological Dictionary")}</option>
          </select>
        </div>

        {showClassicBilingualExplanation ? (
  <p>{translate("A professionally formatted bilingual dictionary")}</p>
) : null}

        {showEtymologicalExplanation ? (
            <p>{translate("A root-based dictionary of the target languages, each entry complete with a full list of each roots descendant words across all daughter languages. Perfect for proto-languages. Complete with bilingual index for easy lookup.")}</p>
        ): null}
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-footer-buttons">
          <div className="non-delete-buttons">
            <Button variant="secondary" onClick={close}>
              {translate("Cancel")}
            </Button>
            <Button variant="primary" onClick={print}>
              {translate("Print")}
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PrintOptionsModal;
