import React, { useState, useEffect } from "react";
import removeTags from "../Functions/removeTags";
import { getLanguage } from "../services/languageService";

const ExtractExampleSentencesFromCorpus = ({
  languageId,
  entryWord,
  wordId,
}) => {
  const [corpus, setCorpus] = useState();
  const [exampleSentences, setExampleSentences] = useState([]);

  //first, fetch the corpus
  useEffect(() => {
    const getCorpus = async () => {
      if (languageId) {

      let data = await window.electron.getLanguage(languageId);
      setCorpus(data[0].corpus);
    };
  }
    getCorpus();
  }, [languageId]);

  const saveExampleSentence = (
    word,
    sentence,
    text,
    textArray,
    translationArray
  ) => {
    if (word === entryWord) {
      //find the corresponding sentence in the translation
      let sentenceIndex = textArray.indexOf(sentence);
      let translatedSentence = translationArray[sentenceIndex];

      //detect the word in the sentence and wrap it in <span> tags
      let words = sentence.trim().split(/\s+/);

      const highlightedWords = words.map((word) => {
        if (word.includes("=")) {
          let [inflectedWord, headWord] = word.split("=");
          if (headWord.includes("~")) {
            headWord = headWord.split("~")[0];
          }

          if (headWord === entryWord) {
            return `<span style="font-weight:bold">${inflectedWord}</span>`;
          } else {
            return inflectedWord;
          }
        } else {
          return word === entryWord
            ? `<span style="font-weight:bold">${word}</span>`
            : word;
        }
      });

      const newSentence = highlightedWords.join(" ");

      //save sentence in translation in an object and push object to exampleSentences array
      let obj = {
        sentence: newSentence,
        translation: translatedSentence,
        textId: text.id,
        textTitle: text.title,
      };

      //prevent the same sentence being added more than once
      const alreadyExists = exampleSentences.some(
        (item) => item.textId === obj.textId
      );

      if (!alreadyExists) {
        setExampleSentences((prev) => [...prev, obj]);
      }
    }
  };

  const splitParagraphs = (html) => {
  const container = document.createElement("div");
  container.innerHTML = html;
  return Array.from(container.querySelectorAll("p")).map(p => p.textContent.trim());
};


  const removeComma = (word) => {

        if (word.includes(",")) {
            word = word.split(",")[0];
        }
        if (word.includes(".")) {
            word = word.split(".")[0];
        }
    return word;
  }

  //next, iterate through the corpus to find each text
  useEffect(() => {
  if (!corpus) return;

  const newExamples = [];

  corpus.forEach((text) => {
    const textArray = removeTags(text.text)
      .split(/(?<=[.!?])(?=\s|$)/)
      .filter(Boolean);

    const translationArray = removeTags(text.translation)
      .split(/(?<=[.!?])(?=\s|$)/)
      .filter(Boolean);

    textArray.forEach((sentence, index) => {
      const words = sentence.trim().split(/\s+/);

      for (let word of words) {
        let headWord = word;

        removeComma(headWord)


        if (word.includes("=")) {
          let [inflected, rest] = word.split("=");
          if (rest.includes("~")) {
            headWord = rest.split("~")[0];
          } else {
            headWord = rest;
          }
        }


        if (removeComma(headWord) === entryWord) {
          // Highlight the word
          const highlightedWords = words.map((w) => {
            if (w.includes("=")) {
              let [inflected, rest] = w.split("=");
              let hw = rest.includes("~") ? rest.split("~")[0] : rest;
              return hw === entryWord
                ? `<span style="font-weight:bold">${inflected}</span>`
                : inflected;
            } else {
              return removeComma(w) === entryWord
                ? `<span style="font-weight:bold">${w}</span>`
                : w;
            }
          });

          const newSentence = highlightedWords.join(" ");
          const translation = translationArray[index] || "";

          // Prevent duplicates (same sentence and text ID)
          if (
            !newExamples.some(
              (item) =>
                item.sentence === newSentence && item.textId === text.id
            )
          ) {
            newExamples.push({
              sentence: newSentence,
              translation,
              textId: text.id,
              textTitle: text.title,
            });
          }

          break; // Only one example per sentence
        }
      }
    });
  });

  setExampleSentences(newExamples);
}, [corpus, entryWord]);


  //prepare the sentence to be shown to the screen by removing any notation added to it
  const removeNotation = (sentence) => {
    const words = sentence.trim().split(/\s+/);
    const fixedWords = words.map((word) => {
      if (word.includes("=")) {
        return word.split("=")[0];
      }
      return word;
    });

    // Join words with a space, then add a space after full stops if missing
    return fixedWords.join(" ").replace(/([.!?])(?=\S)/g, "$1 "); // Ensure space after punctuation
  };

  const handleOpenTextLink = (textId) => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/corpus/${languageId}/${textId}`,
      "_blank"
    );
  };

  return (
    <div>
      
      {exampleSentences.length > 0 &&
        exampleSentences.map((exampleSentence, idx) => (
            //limit examples to a max of ten per word
            <div>
            <h4>Example Sentences</h4>
            {idx < 10 && (
          <div key={idx}>
            <span
              dangerouslySetInnerHTML={{
                __html: `<i>${exampleSentence.sentence}</i>`,
              }}
            ></span>

            <br />
            <span>"{removeNotation(exampleSentence.translation)}"</span>
            <br />
            <span>
              -{" "}
              <i
                className="word-link"
                onClick={() => handleOpenTextLink(exampleSentence.textId)}
              >
                {exampleSentence.textTitle}
              </i>
            </span>
            <hr />
          </div>
        )}
        </div>
        ))}
    </div>
  );
};

export default ExtractExampleSentencesFromCorpus;
