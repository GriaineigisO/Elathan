import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import formatMeaning from "../Functions/formatMeaning.jsx";
import { useTranslate } from "../Functions/TranslateUI";


const CorpusFrequencyList = () => {
  const { id } = useParams();
    const { translate } = useTranslate();

  const [language, setLanguage] = useState();
  const [words, setWords] = useState([]);
  const [uniqueWords, setUniqueWords] = useState([]);
  const [corpus, setCorpus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allWords, setAllWords] = useState([]);
  

  const getLanguage = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getLanguage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const data = await response.json();
    if (data) {
      setLanguage(data[0]);
    } else {
      console.error("could not get language data");
    }
  };


   const getAllWords = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getAllWords`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
  
      let data = await response.json();
      setAllWords(data);
    };

  useEffect(() => {
    getLanguage();
    getAllWords();
  }, [id]);

  const getCorpus = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getCorpus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    let data = await response.json();
    setCorpus(data[0].corpus);
  };
  useEffect(() => {
    getCorpus();
  }, [id]);

  useEffect(() => {
    if (!corpus) return;

    const wordMap = new Map();

    for (let i = 0; i < corpus.length; i++) {
      const words = corpus[i].text.trim().split(/\s+/);

      for (let j = 0; j < words.length; j++) {
        let fixedWord = words[j];

        if (fixedWord.includes("=")) {
          fixedWord = fixedWord.split("=")[1];
        }
        if (fixedWord.includes("~")) {
          fixedWord = fixedWord.split("~")[0];
        }

        fixedWord = fixedWord.trim().toLowerCase(); // normalize

        if (wordMap.has(fixedWord)) {
          wordMap.set(fixedWord, wordMap.get(fixedWord) + 1);
        } else {
          wordMap.set(fixedWord, 1);
        }
      }
    }

    // Convert Map to array
    const uniqueWordArray = Array.from(wordMap.entries()).map(
      ([word, count]) => ({ word, count })
    );

    //sort by frequency descending
    uniqueWordArray.sort((a, b) => b.count - a.count);

    setUniqueWords(uniqueWordArray);
    setLoading(false);
  }, [corpus]);

 const getWordMeaning = (wordToFind) => {
  const found = allWords.find((word) => word.word === wordToFind && word.word_type === "word");
  if (found) {

    return (
      <span className="word-link" onClick={() => handleOpenWord(found.word_id)}>
        <b>
          <i>{found.word}</i>
        </b>{" "}
        <span>"{formatMeaning(found)}"</span>
      </span>
    );
  } 
};

const handleOpenWord = (id) => {
window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/word/${id}`,
      "_blank"
    );
}


  if (language) {
    if (!canView) return <h1>{translate("You do not have permission to view this page")}</h1>;

    return (
      <div style={{ textAlign: "center" }}>
        <h1>{translate("{languageName} Corpus-based Frequency List", {languageName: language.language_name})}</h1>

        <p>
          {translate("This is a frequency list automatically produced based on the corpus for {languageName} provided on this website. This list may or may not be representative of the genuine frequency of the words in the spoken language itself.", {languageName: language.language_name})}
        </p>

        <div className="thin-white-border">
          {!loading ? (
            <ol 
              style={{
                textAlign: "left",
                columnCount: "4",
                columnWidth:"300px",
                maxHeight: "500px",
                overflow: "scroll",
              }}
            >
              {uniqueWords.map((word, index) => (
                getWordMeaning(word.word) && (
                <li key={index} style={{maxWidth:"250px"}}>
                  {getWordMeaning(word.word)}: <span style={{color:"grey"}}><i>{word.count}</i></span>
                </li>)
              ))}
            </ol>
          ) : (
            <p>{translate("Loading...")}</p>
          )}
        </div>
      </div>
    );
  }
};

export default CorpusFrequencyList;
