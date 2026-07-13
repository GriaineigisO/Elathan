import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import formatMeaning from "../Functions/formatMeaning";
import { thesaurusJson } from "../Functions/thesaurusList";

const Thesaurus = () => {
  const { id } = useParams();
  const [language, setLanguage] = useState();
  const [expandedSections, setExpandedSections] = useState({});
  const [allWords, setAllWords] = useState();

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
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

      let data = await response.json();
      setLanguage(data[0]);
    };
    getLanguage();
  }, [id]);

  useEffect(() => {
    const getThesaurus = async () => {
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
      const data = await response.json();
      setAllWords(data);
    };
    getThesaurus();
  }, []);

  const handleOpenWord = (word_id) => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/word/${word_id}`,
      "_blank"
    );
  };

  const sortByPOS = (matchingWords, POS, type) => {
    const returnMatchedWord = (word, index, meaning) => {
      if (POS === "verb" && Array.isArray(meaning)) {
        meaning = meaning.map((verb) =>
          !verb.startsWith("(") ? `to ${verb}` : verb
        );
      }

      meaning = Array.isArray(meaning) ? meaning.join(", ") : meaning;

      return (
        <span
          key={word.word_id}
          style={{ display: "inline", marginLeft: "5px" }}
        >
          <div
            className="word-link"
            style={{ display: "inline" }}
            onClick={() => handleOpenWord(word.word_id)}
          >
            <span>
              <i>{word.word}</i>
            </span>
            <span style={{ marginLeft: "5px" }}>"{meaning}"</span>
          </div>
          {index < matchingWords.length - 1 ? "," : "."}
        </span>
      );
    };

    let filteredWords = [];

    switch (POS) {
      case "adj":
        filteredWords = matchingWords.filter(
          (word) => word.adj_meaning && word.thesaurus?.[type]?.bool === true
        );

        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>Adj.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.adj_meaning)
            )}
            <br />
          </>
        );
      case "verb":
        filteredWords = matchingWords.filter(
          (word) => word.verb_meaning && word.thesaurus?.[type]?.bool === true
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>V.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.verb_meaning)
            )}
            <br />
          </>
        );
      case "noun":
        filteredWords = matchingWords.filter(
          (word) => word.noun_meaning && word.thesaurus?.[type]?.bool === true
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>N.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.noun_meaning)
            )}
            <br />
          </>
        );
      case "adv":
        filteredWords = matchingWords.filter(
          (word) => word.adv_meaning && word.thesaurus?.[type]?.bool === true
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>Adv.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.adv_meaning)
            )}
            <br />
          </>
        );
      case "adp":
        filteredWords = matchingWords.filter(
          (word) => word.adp_meaning && word.thesaurus?.[type]?.bool === true
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>Adp.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.adp_meaning)
            )}
            <br />
          </>
        );
       case "num":
        filteredWords = matchingWords.filter(
          (word) => word.num_meaning && word.thesaurus?.[type]?.bool === true
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>N.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.num_meaning)
            )}
            <br />
          </>
        );
        case "conj":
        filteredWords = matchingWords.filter(
          (word) => word.conj_meaning && word.thesaurus?.[type]?.bool === true
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>COnj.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.conj_meaning)
            )}
            <br />
          </>
        );
      case "interj":
        filteredWords = matchingWords.filter((word) => word.interj_meaning);
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>Interj.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.interj_meaning)
            )}
            <br />
          </>
        );
      case "part":
        filteredWords = matchingWords.filter(
          (word) => word.part_meaning && word.thesaurus?.[type]?.bool === true
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>Part.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.part_meaning)
            )}
            <br />
          </>
        );
      case "pron":
        filteredWords = matchingWords.filter(
          (word) => word.pron_meaning && word.thesaurus?.[type]?.bool === true
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>Pron.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.pron_meaning)
            )}
            <br />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {language && (
        <div>
          <h1 style={{ textAlign: "center" }}>
            {language.language_name} Thesaurus
          </h1>
          {Object.entries(thesaurusJson).map(([classification, categories]) => (
            <div key={classification} style={{ marginLeft: "20%" }}>
              {Object.entries(categories).map(([category, domains]) => (
                <div style={{ margin: "10px" }} key={category}>
                  {Object.entries(domains).map(([domain, types]) =>

                    types.map((obj) => {
                      const matchingWords = allWords?.filter(
                        (word) =>
                          word.thesaurus &&
                          Object.keys(word.thesaurus).includes(obj.name)
                      );

                      if (!matchingWords || matchingWords.length === 0) {
                        return null;
                      }

                      return (
                        <div
                          key={obj.name}
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span style={{marginBottom:"20px"}}>
                            {obj.name}:
                            {sortByPOS(matchingWords, "noun", obj.name)}
                            {sortByPOS(matchingWords, "num", obj.name)}
                            {sortByPOS(matchingWords, "verb", obj.name)}
                            {sortByPOS(matchingWords, "adj", obj.name)}
                            {sortByPOS(matchingWords, "adv", obj.name)}
                            {sortByPOS(matchingWords, "adp", obj.name)}
                            {sortByPOS(matchingWords, "conj", obj.name)}
                            {sortByPOS(matchingWords, "part", obj.name)}
                            {sortByPOS(matchingWords, "injert", obj.name)}
                            {sortByPOS(matchingWords, "pron", obj.name)}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Thesaurus;
