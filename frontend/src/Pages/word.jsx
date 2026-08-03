import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import editIcon from "../assets/pencil-square.svg";
import deleteIcon from "../assets/trash-bin.svg";
import AddEtymologyModal from "../Components/addEtymologyModal";
import EditEtymologyModal from "../Components/editEtymologyModal";
import DeleteEtymologyModal from "../Components/deleteEtymologyModal";
import EditWordModal from "../Components/editWordModal.jsx";
import { format, parseISO } from "date-fns";
import ExtractExampleSentencesFromCorpus from "../Components/ExtractExampleSentencesFromCorpus.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import formatMeaning from "../Functions/formatMeaning";
import AddDescendantModal from "../Components/addDescendantModal.jsx";
import { AddDerivationModal } from "../Components/addDerivationModal.jsx";
import { getWordData } from "../services/dictionaryService.js";
import { getEtymology } from "../services/etymologyService.js";
import { getLanguage } from "../services/languageService.js";

const Word = () => {
  const [version, setVersion] = useState(0);
  const [derivationVersion, setDerivationVersion] = useState(0);
  const { id } = useParams();
  const { translate } = useTranslate();
  const [canView, setCanView] = useState(false);
  const [word, setWord] = useState(null);
  const [languageName, setLanguageName] = useState();
  const [showAddDescendantModal, setShowAddDescendantModal] = useState(false);
  const [showAddDerivationModal, setShowAddDerivationModal] = useState(false);
  const [showAddEtymologyModal, setShowAddEtymologyModal] = useState(false);
  const [showEditEtymologyModal, setShowEditEtymologyModal] = useState(false);
  const [showDeleteEtymologyModal, setShowDeleteEtymologyModal] =
    useState(false);
  const [etymology, setEtymology] = useState([]);
  const [derivations, setDerivations] = useState([]);
  const [descendants, setDescendants] = useState([]);
  const [spelling, setSpelling] = useState({});
  const [isProto, setIsProto] = useState();
  const [motherLanguage, setMotherLanguage] = useState();
  const [languageId, setLanguageId] = useState();
  const [loanerLanguageName, setLoanerLanguageName] = useState();
  const [loanerLanguageIsProto, setLoanerLanguageIsProto] = useState();
  const [loanerLanguageId, setLoanerLanguageId] = useState();
  const [loanWord, setLoanWord] = useState();
  const [nounMeanings, setNounMeanings] = useState([]);
  const [numMeanings, setNumMeanings] = useState([]);
  const [adjMeanings, setAdjMeanings] = useState([]);
  const [advMeanings, setAdvMeanings] = useState([]);
  const [verbMeanings, setVerbMeanings] = useState([]);
  const [adpMeanings, setAdpMeanings] = useState([]);
  const [pronMeanings, setPronMeanings] = useState([]);
  const [conjMeanings, setConjMeanings] = useState([]);
  const [interjMeanings, setInterjMeanings] = useState([]);
  const [affixMeanings, setAffixMeanings] = useState([]);
  const [cliticMeanings, setCliticMeanings] = useState([]);
  const [partMeanings, setPartMeanings] = useState([]);
  const [cognates, setCognates] = useState([]);
  const [showEditWordModal, setShowEditWordModal] = useState(false);
  const [synonyms, setsynonyms] = useState([]);
  const [authorUsername, setAuthorUsername] = useState();
  const [editorUsername, setEditorUsername] = useState();
  const [madeDate, setMadeDate] = useState();
  const [editedDate, setEditedDate] = useState();
  const [showPermissionMessage, setShowPermissionMessage] = useState(false);
  const [etymologyToEdit, setEtymologyToEdit] = useState();
  const [etymologyToDelete, setEtymologyToDelete] = useState();
  const [phrases, setPhrases] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [tags, setTags] = useState([]);
  const [convertIPA, setConvertIPA] = useState(false);

  ////////////////////////////////////////////////

  const getWordData = async () => {
    let data = await window.electron.getWordData(id);
    setWord(data.word.wordData);
    setTags(
      typeof data.word.wordData.tags === "object"
        ? data.word.wordData.tags
        : [],
    );
    setLanguageName(data.word.languageData.language_name);
    setIsProto(data.word.languageData.is_proto);
    setLanguageId(data.word.languageData.language_id);
    setAllWords(data.allWords);
    setMotherLanguage(data.motherLanguage);
    setCognates(data.cognates);
    setDerivations(data.derivations);
    setDescendants(data.descendants);
    setsynonyms(data.synonyms);
  };

  useEffect(() => {
    if (id) {
      getWordData();
      setCanView(true);
    }
  }, [id]);

  /////////////////////////////////////////////////////

  const handleEtymologyAdded = () => {
    fetchEtymology(); // refresh updated etymology
    //getWord(id, setWord); // optional: refresh word in case anything changed
  };

  const handleWordEdited = () => {
    fetchEtymology(); // refresh updated etymology
    getWordData();
  };

  const handleDescendantAdded = () => {
    getWordData();
  };

  const getLoanerLanguageName = async (
    languageId,
    setName,
    setProto,
    setId,
  ) => {
    let data = await window.electron.getLanguage(languageId);
    setName(data.language_name);
    setProto(data.is_proto);
    setId(data.language_id);
    setConvertIPA(data.convert_ipa === 1 ? true : false);
    setSpelling(data.spelling);
  };

  async function getWord(id, setWord) {
    const data = await window.electron.getWordData(id);
    setLoanWord(data);
    setLoanerLanguageName(data.language.language_name);
    setLoanerLanguageIsProto(data.language.is_proto);
    setLoanerLanguageId(data.language.language_id);
  }

  const fetchEtymology = async () => {
    let data = await window.electron.getEtymology(id);
    setEtymology(data);
    //gets the loanword's details
    if (data[0] && data[0].etymology_type === "loaned") {
      getWord(data[0].loanword_id, setLoanWord);
    }
  };

  useEffect(() => {
    fetchEtymology();
  }, []);

  useEffect(() => {
    if (word) {
      const sortMeanings = (unsortedMeaning, setSortedMeaning) => {
        if (unsortedMeaning) {
          let unsortedMeanings = unsortedMeaning;
          let sortedMeanings = [];
          let checkedWords = [];

          for (let i = 0; i < unsortedMeanings.length; i++) {
            if (unsortedMeanings[i].startsWith("(")) {
              let contextArr = [];
              let submeanings = [];

              contextArr.push(unsortedMeanings[i]);
              contextArr.push(submeanings);
              sortedMeanings.push(contextArr);

              let j = i + 1;
              while (
                j < unsortedMeanings.length &&
                !unsortedMeanings[j].startsWith("(")
              ) {
                submeanings.push(unsortedMeanings[j]);
                checkedWords.push(unsortedMeanings[j]);
                j++;
              }

              i = j - 1; // Move i forward to skip already-processed items
            } else if (!checkedWords.includes(unsortedMeanings[i])) {
              sortedMeanings.push(unsortedMeanings[i]);
            }
          }

          setSortedMeaning(sortedMeanings);
        }
      };

      sortMeanings(word.noun_meaning, setNounMeanings);
      sortMeanings(word.num_meaning, setNumMeanings);
      sortMeanings(word.adj_meaning, setAdjMeanings);
      sortMeanings(word.adv_meaning, setAdvMeanings);
      sortMeanings(word.adp_meaning, setAdpMeanings);
      sortMeanings(word.verb_meaning, setVerbMeanings);
      sortMeanings(word.part_meaning, setPartMeanings);
      sortMeanings(word.pron_meaning, setPronMeanings);
      sortMeanings(word.affix_meaning, setAffixMeanings);
      sortMeanings(word.clitic_meaning, setCliticMeanings);
      sortMeanings(word.interj_meaning, setInterjMeanings);
      sortMeanings(word.conj_meaning, setConjMeanings);
    }
  }, [word]);

  const DisplayMeaning = ({ meanings, type }) => {
    return (
      <ol>
        {meanings.map((meaning, index) =>
          typeof meaning !== "string" ? (
            <li key={index}>
              <i>{meaning[0]}</i>
              <ol>
                {meaning[1].map((submeaning, subIndex) => (
                  <li key={subIndex}>
                    {type === "verb" ? <span>to </span> : <></>}
                    {submeaning}
                  </li>
                ))}
              </ol>
            </li>
          ) : (
            <li key={index}>
              {type === "verb" ? <span>to </span> : <></>}
              {meaning}
            </li>
          ),
        )}
      </ol>
    );
  };

  const DisplayWordForms = ({ forms, type }) => {
    return (
      <ul>
        {forms.map((form, index) =>
          form && form.type === type && form.word ? (
            <li key={index}>
              {form.name}:{" "}
              <>
                <b>
                  {isProto ? <span>*</span> : <></>}
                  <i>{form.word}</i>
                </b>
              </>
            </li>
          ) : (
            <></>
          ),
        )}
      </ul>
    );
  };

  const handleOpenUser = (id) => {
    window.open(`${import.meta.env.VITE_FRONTEND_URL}/user/${id}`, "_blank");
  };

  const handleEditEtymology = (etymology) => {
    setEtymologyToEdit(etymology);
    setShowEditEtymologyModal(true);
  };

  const handleDeleteEtymology = (etymology) => {
    setEtymologyToDelete(etymology);
    setShowDeleteEtymologyModal(true);
  };

  const removeEqual = (phrase, form) => {
    if (phrase.includes("=")) {
      return phrase
        .split(" ")
        .map((w) => {
          if (w.includes("=")) {
            return form === "dictionary-form"
              ? w.split("=")[1]
              : w.split("=")[0]; // Keep only the phrase word
          }
          return w;
        })
        .join(" ");
    } else {
      return phrase;
    }
  };

  //Now to detect any phrases that the word is in
  useEffect(() => {
    const getPhrases = async () => {
      if (allWords) {
        allWords.forEach((entry) => {
          const phrase = entry.word.trim().split(/\s+/); //split string by whitespace incase the entry consists of multiple words divided by a whitespace i.e a phrase

          const hasMultipleWords = phrase.length > 1;

          //if true, entry has been detected as a phrase
          if (hasMultipleWords) {
            phrase.forEach((splitWord) => {
              let lowerSplit = splitWord.toLowerCase();

              if (lowerSplit.includes("=")) {
                lowerSplit = removeEqual(lowerSplit, "dictionary-form");
              }

              if (lowerSplit === word.word) {
                const obj = {
                  phrase: removeEqual(entry.word, "phrase-form"),
                  meaning: formatMeaning(entry),
                };

                const alreadyExists = phrases.some(
                  (item) =>
                    item.phrase === obj.phrase && item.meaning === obj.meaning,
                );

                if (!alreadyExists) {
                  setPhrases((prev) => [...prev, obj]);
                }
              }
            });
          }
        });
      }
    };
    getPhrases();
  }, [allWords]);

  const removeDuplicates = (arr) => {
    const seen = new Set();
    return arr.filter((obj) => {
      const str = JSON.stringify(obj);
      if (seen.has(str)) {
        return false;
      }
      seen.add(str);
      return true;
    });
  };

  const handleOpenWord = (word_id) => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/word/${word_id}`,
      "_blank",
    );
  };

  return (
    <>
      <div style={{ textAlign: "left", marginLeft: "100px" }}>
        {word ? (
          <>
            {canView ? (
              <>
                <AddEtymologyModal
                  show={showAddEtymologyModal}
                  setShow={setShowAddEtymologyModal}
                  id={word.language_id}
                  word={word}
                  name={languageName}
                  onSuccess={handleEtymologyAdded}
                />

                <EditEtymologyModal
                  show={showEditEtymologyModal}
                  setShow={setShowEditEtymologyModal}
                  id={word.language_id}
                  word={word}
                  etymology={etymologyToEdit}
                  onSuccess={handleEtymologyAdded}
                />

                <DeleteEtymologyModal
                  show={showDeleteEtymologyModal}
                  setShow={setShowDeleteEtymologyModal}
                  etymology={etymologyToDelete}
                  onSuccess={handleEtymologyAdded}
                />

                <EditWordModal
                  show={showEditWordModal}
                  setShow={setShowEditWordModal}
                  wordData={word}
                  onSuccess={handleWordEdited}
                  convertIPA={convertIPA}
                  spelling={spelling}
                />

                <AddDescendantModal
                  key={version}
                  setVersion={setVersion}
                  show={showAddDescendantModal}
                  setShow={setShowAddDescendantModal}
                  languageId={word.language_id}
                  word={word}
                  name={languageName}
                  onSuccess={handleDescendantAdded}
                  languageName={languageName}
                />

                <AddDerivationModal
                  key={derivationVersion}
                  setVersion={setDerivationVersion}
                  show={showAddDerivationModal}
                  setShow={setShowAddDerivationModal}
                  languageId={word.language_id}
                  word={word}
                  name={languageName}
                  onSuccess={handleDescendantAdded}
                  languageName={languageName}
                />

                <h1 style={{ fontSize: "70px" }}>
                  {isProto ? <span>*</span> : <></>}
                  {word.word_type === "suffix" ||
                  word.word_type === "enclitic" ? (
                    <span>-</span>
                  ) : (
                    <></>
                  )}
                  {word.word}
                  {word.word_type === "prefix" ||
                  word.word_type === "proclitic" ? (
                    <span>-</span>
                  ) : (
                    <></>
                  )}

                  <img
                    style={{ marginLeft: "10px" }}
                    src={editIcon}
                    className="edit-button"
                    onClick={() => {
                      setShowEditWordModal(true);
                    }}
                  ></img>
                </h1>

                <h2>{languageName}</h2>

                <div>
                  <hr />
                  <div className="title-and-edit-button-div">
                    <h3>{translate("Etymology")}</h3>

                    <img
                      src={editIcon}
                      className="edit-button"
                      onClick={() => {
                        setShowAddEtymologyModal(true);
                      }}
                    ></img>
                  </div>

                  {etymology.length > 1 ? (
                    <>
                      <p>
                        {translate(
                          "The various possible etymologies for {word} are:",
                          {
                            word: "{word}",
                          },
                        )
                          .split("{word}")
                          .map((part, index, arr) => (
                            <React.Fragment key={index}>
                              {part}
                              {index < arr.length - 1 && (
                                <i>
                                  {isProto && <span>*</span>}
                                  {(word.word_type === "suffix" ||
                                    word.word_type === "enclitic") && (
                                    <span>-</span>
                                  )}
                                  {word.word}
                                  {(word.word_type === "prefix" ||
                                    word.word_type === "proclitic") && (
                                    <span>-</span>
                                  )}
                                </i>
                              )}
                            </React.Fragment>
                          ))}
                      </p>

                      <ol>
                        {etymology
                          .filter(
                            (etym) =>
                              etym.etymology_type === "fromMother" &&
                              motherLanguage,
                          )
                          .map((etym, index) => (
                            <li key={index}>
                              <React.Fragment>
                                {translate("From {languageName} {word}", {
                                  languageName: "{languageName}",
                                  word: "{word}",
                                })
                                  .replace(/\{languageName\}/g, "§LANG§")
                                  .replace(/\{word\}/g, "§WORD§")
                                  .split(/(§LANG§|§WORD§)/)
                                  .map((part, i) => {
                                    if (part === "§LANG§") {
                                      return (
                                        <span key={i} className="languageName">
                                          {motherLanguage.language_name}{" "}
                                        </span>
                                      );
                                    }

                                    if (part === "§WORD§") {
                                      return (
                                        <a
                                          key={i}
                                          className="word-link"
                                          href={`${
                                            import.meta.env.VITE_FRONTEND_URL
                                          }/word/${etym.mother_word_id}`}
                                        >
                                          <b>
                                            <i>
                                              {motherLanguage.is_proto && (
                                                <span>*</span>
                                              )}
                                              {(etym.mother_word_type ===
                                                "suffix" ||
                                                etym.mother_word_type ===
                                                  "enclitic") && <span>-</span>}
                                              {etym.mother_word}
                                              {(etym.mother_word_type ===
                                                "prefix" ||
                                                etym.mother_word_type ===
                                                  "proclitic") && (
                                                <span>-</span>
                                              )}
                                            </i>
                                          </b>{" "}
                                          {`"${etym.mother_word_meaning}".`}
                                        </a>
                                      );
                                    }

                                    return (
                                      <React.Fragment key={i}>
                                        {part}
                                      </React.Fragment>
                                    );
                                  })}
                              </React.Fragment>

                              {etymology[0].note && (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: `. ${etymology[0].note}`,
                                  }}
                                />
                              )}
                            </li>
                          ))}

                        {etymology
                          .filter((etym) => etym.etymology_type === "derived")
                          .map((etym, index) => (
                            <li key={index}>
                              {translate("From {wordList}", {
                                wordList: "{wordList}",
                              })
                                .replace(/\{wordList\}/g, "§WORDS§")
                                .split(/(§WORDS§)/)
                                .map((part, i) => {
                                  if (part === "§WORDS§") {
                                    return (
                                      <React.Fragment key={i}>
                                        <a
                                          className="word-link"
                                          href={`${
                                            import.meta.env.VITE_FRONTEND_URL
                                          }/word/${
                                            etymology[0].mother_word_id
                                          }`}
                                        >
                                          <b>
                                            <i>
                                              {isProto && <span>*</span>}
                                              {(etym.first_element_word_type ===
                                                "suffix" ||
                                                etym.first_element_word_type ===
                                                  "enclitic") && <span>-</span>}
                                              {etym.first_element_word}
                                              {(etym.first_element_word_type ===
                                                "prefix" ||
                                                etym.first_element_word_type ===
                                                  "proclitic") && (
                                                <span>-</span>
                                              )}
                                            </i>
                                          </b>{" "}
                                          "{etym.first_element_word_meaning}"
                                        </a>
                                        {etymology[0]
                                          .second_element_word_id && (
                                          <>
                                            <span> and </span>
                                            <a
                                              className="word-link"
                                              href={`${
                                                import.meta.env
                                                  .VITE_FRONTEND_URL
                                              }/word/${
                                                etym.second_element_word_id
                                              }`}
                                            >
                                              <b>
                                                <i>
                                                  {isProto && <span>*</span>}
                                                  {(etym.second_element_word_type ===
                                                    "suffix" ||
                                                    etym.second_element_word_type ===
                                                      "enclitic") && (
                                                    <span>-</span>
                                                  )}
                                                  {etym.second_element_word}
                                                  {(etym.second_element_word_type ===
                                                    "prefix" ||
                                                    etym.second_element_word_type ===
                                                      "proclitic") && (
                                                    <span>-</span>
                                                  )}
                                                </i>
                                              </b>{" "}
                                              "
                                              {etym.second_element_word_meaning}
                                              ".
                                            </a>
                                          </>
                                        )}
                                        {etymology[0].third_element_word_id && (
                                          <>
                                            <span> and </span>
                                            <a
                                              className="word-link"
                                              href={`${
                                                import.meta.env
                                                  .VITE_FRONTEND_URL
                                              }/word/${
                                                etym.third_element_word_id
                                              }`}
                                            >
                                              <b>
                                                <i>
                                                  {isProto && <span>*</span>}
                                                  {(etym.third_element_word_type ===
                                                    "suffix" ||
                                                    etym.third_element_word_type ===
                                                      "enclitic") && (
                                                    <span>-</span>
                                                  )}
                                                  {etym.third_element_word}
                                                  {(etym.third_element_word_type ===
                                                    "prefix" ||
                                                    etym.third_element_word_type ===
                                                      "proclitic") && (
                                                    <span>-</span>
                                                  )}
                                                </i>
                                              </b>{" "}
                                              "{etym.third_element_word_meaning}
                                              ".
                                            </a>
                                          </>
                                        )}
                                      </React.Fragment>
                                    );
                                  }

                                  return (
                                    <React.Fragment key={i}>
                                      {part}
                                    </React.Fragment>
                                  );
                                })}
                              {etymology[0].note && (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: `. ${etymology[0].note}`,
                                  }}
                                />
                              )}

                              <>
                                <img
                                  style={{ marginLeft: "10px" }}
                                  src={editIcon}
                                  className="edit-button"
                                  onClick={() =>
                                    handleEditEtymology(etymology[0])
                                  }
                                />
                                <img
                                  style={{ marginLeft: "10px" }}
                                  src={deleteIcon}
                                  className="delete-button-with-icon"
                                  onClick={() =>
                                    handleDeleteEtymology(etymology[0])
                                  }
                                />
                              </>
                            </li>
                          ))}

                        {etymology
                          .filter((etym) => etym.etymology_type === "loaned")
                          .map((etym, index) => (
                            <li key={index}>
                              {translate("Loaned from {word}", {
                                word: (
                                  <React.Fragment>
                                    <span className="languageName">
                                      {loanerLanguageName}{" "}
                                    </span>
                                    <a
                                      className="word-link"
                                      href={`${
                                        import.meta.env.VITE_FRONTEND_URL
                                      }/word/${etym.loanword_id}`}
                                    >
                                      <b>
                                        <i>
                                          {loanerLanguageIsProto && (
                                            <span>*</span>
                                          )}
                                          {(etym.loanword_type === "suffix" ||
                                            etym.loanword_type ===
                                              "prefix") && <span>-</span>}
                                          {etym.loanword}
                                          {(etym.loantype === "prefix" ||
                                            etym.loantype === "proclitic") && (
                                            <span>-</span>
                                          )}
                                        </i>
                                      </b>{" "}
                                      "{etym.loanword_meaning}"
                                    </a>
                                  </React.Fragment>
                                ),
                              })}

                              {etymology[0].note && (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: `. ${etymology[0].note}`,
                                  }}
                                />
                              )}

                              <img
                                style={{ marginLeft: "10px" }}
                                src={editIcon}
                                className="edit-button"
                                onClick={() =>
                                  handleEditEtymology(etymology[0])
                                }
                              />
                            </li>
                          ))}
                      </ol>
                    </>
                  ) : (
                    <></>
                  )}

                  {etymology.length === 1 &&
                  etymology[0].etymology_type === "fromMother" &&
                  motherLanguage ? (
                    <p>
                      {translate("From {word}. ", { word: "__WORD__" })
                        .split("__WORD__")
                        .map((part, i) => (
                          <React.Fragment key={i}>
                            {i === 0 ? (
                              <>
                                {/* JSX element goes here */}
                                <span className="languageName">
                                  {motherLanguage.language_name}{" "}
                                </span>
                                <a
                                  className="word-link"
                                  href={`${
                                    import.meta.env.VITE_FRONTEND_URL
                                  }/word/${etymology[0].mother_word_id}`}
                                >
                                  <b>
                                    <i>
                                      {motherLanguage.is_proto && (
                                        <span>*</span>
                                      )}
                                      {(etymology[0].mother_word_type ===
                                        "suffix" ||
                                        etymology[0].mother_word_type ===
                                          "enclitic") && <span>-</span>}
                                      {etymology[0].mother_word}
                                      {(etymology[0].mother_word_type ===
                                        "prefix" ||
                                        etymology[0].mother_word_type ===
                                          "proclitic") && <span>-</span>}
                                    </i>
                                  </b>{" "}
                                  "{etymology[0].mother_word_meaning}"
                                </a>
                              </>
                            ) : (
                              part
                            )}
                          </React.Fragment>
                        ))}

                      {cognates && cognates.length > 0 && (
                        <>
                          {translate("Cognate with {wordList}", {
                            wordList: "__PLACEHOLDER__",
                          })
                            .split("__PLACEHOLDER__")
                            .map((part, index) => (
                              <React.Fragment key={index}>
                                {part}
                                {index === 0 &&
                                  cognates.map((cognate, i) => (
                                    <React.Fragment key={cognate.word_id}>
                                      <a
                                        className="word-link"
                                        href={`${
                                          import.meta.env.VITE_FRONTEND_URL
                                        }/word/${cognate.word_id}`}
                                      >
                                        <span className="languageName">
                                          {cognate.language_name}{" "}
                                        </span>
                                        <i>
                                          {cognate.is_proto && <span>*</span>}
                                          {(cognate.word_type === "suffix" ||
                                            cognate.word_type ===
                                              "enclitic") && <span>-</span>}
                                          {cognate.word}
                                          {(cognate.word_type === "prefix" ||
                                            cognate.word_type ===
                                              "proclitic") && <span>-</span>}
                                        </i>{" "}
                                        "{cognate.meaning.join(", ")}"
                                      </a>
                                      {i < cognates.length - 1 && ", "}
                                    </React.Fragment>
                                  ))}
                              </React.Fragment>
                            ))}
                        </>
                      )}

                      {etymology[0].note && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: `${etymology[0].note}`,
                          }}
                        />
                      )}

                      <>
                        <img
                          style={{ marginLeft: "10px" }}
                          src={editIcon}
                          className="edit-button"
                          onClick={() => handleEditEtymology(etymology[0])}
                        />
                        <img
                          style={{ marginLeft: "10px" }}
                          src={deleteIcon}
                          className="delete-button-with-icon"
                          onClick={() => handleDeleteEtymology(etymology[0])}
                        />
                      </>
                    </p>
                  ) : (
                    <></>
                  )}

                  {etymology.length === 1 &&
                  etymology[0].etymology_type === "derived" ? (
                    <p>
                      <>
                        {/* "From" manually */}
                        {translate("From")}{" "}
                        <a
                          className="word-link"
                          href={`${import.meta.env.VITE_FRONTEND_URL}/word/${
                            etymology[0].first_element_word_id
                          }`}
                        >
                          <b>
                            <i>
                              {isProto && <span>*</span>}
                              {(etymology[0].first_element_word_type ===
                                "suffix" ||
                                etymology[0].first_element_word_type ===
                                  "enclitic") && <span>-</span>}
                              {etymology[0].first_element_word}
                              {(etymology[0].first_element_word_type ===
                                "prefix" ||
                                etymology[0].first_element_word_type ===
                                  "proclitic") && <span>-</span>}
                            </i>
                          </b>{" "}
                          "{etymology[0].first_element_word_meaning}"
                        </a>
                        {/* Second element with "and" */}
                        {etymology[0].second_element_word_id && (
                          <>
                            {" "}
                            {translate("and")}{" "}
                            <a
                              className="word-link"
                              href={`${
                                import.meta.env.VITE_FRONTEND_URL
                              }/word/${etymology[0].second_element_word_id}`}
                            >
                              <b>
                                <i>
                                  {isProto && <span>*</span>}
                                  {(etymology[0].second_element_word_type ===
                                    "suffix" ||
                                    etymology[0].second_element_word_type ===
                                      "enclitic") && <span>-</span>}
                                  {etymology[0].second_element_word}
                                  {(etymology[0].second_element_word_type ===
                                    "prefix" ||
                                    etymology[0].second_element_word_type ===
                                      "proclitic") && <span>-</span>}
                                </i>
                              </b>{" "}
                              "{etymology[0].second_element_word_meaning}"
                            </a>
                          </>
                        )}
                        {/* Third element with "and" */}
                        {etymology[0].third_element_word_id && (
                          <>
                            {" "}
                            {translate("and")}{" "}
                            <a
                              className="word-link"
                              href={`${
                                import.meta.env.VITE_FRONTEND_URL
                              }/word/${etymology[0].third_element_word_id}`}
                            >
                              <b>
                                <i>
                                  {isProto && <span>*</span>}
                                  {(etymology[0].third_element_word_type ===
                                    "suffix" ||
                                    etymology[0].third_element_word_type ===
                                      "enclitic") && <span>-</span>}
                                  {etymology[0].third_element_word}
                                  {(etymology[0].third_element_word_type ===
                                    "prefix" ||
                                    etymology[0].third_element_word_type ===
                                      "proclitic") && <span>-</span>}
                                </i>
                              </b>{" "}
                              "{etymology[0].third_element_word_meaning}"
                            </a>
                          </>
                        )}
                      </>

                      {/* Note */}
                      {etymology[0].note && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: `. ${etymology[0].note}`,
                          }}
                        />
                      )}

                      {/* Edit/Delete buttons */}

                      <>
                        <img
                          style={{ marginLeft: "10px" }}
                          src={editIcon}
                          className="edit-button"
                          onClick={() => handleEditEtymology(etymology[0])}
                        />
                        <img
                          style={{ marginLeft: "10px" }}
                          src={deleteIcon}
                          className="delete-button-with-icon"
                          onClick={() => handleDeleteEtymology(etymology[0])}
                        />
                      </>
                    </p>
                  ) : (
                    <></>
                  )}

                  {etymology.length === 1 &&
                  etymology[0].etymology_type === "loaned" ? (
                    <p>
                      <>
                        {translate("Loaned from {word}", {
                          word: "__PLACEHOLDER__",
                        })
                          .split("__PLACEHOLDER__")
                          .map((part, index) => (
                            <React.Fragment key={index}>
                              {part}
                              {index === 0 && (
                                <React.Fragment>
                                  {/* Loanword */}
                                  <span className="languageName">
                                    {loanerLanguageName}{" "}
                                  </span>
                                  <a
                                    className="word-link"
                                    href={`${
                                      import.meta.env.VITE_FRONTEND_URL
                                    }/word/${etymology[0].loanword_id}`}
                                  >
                                    <b>
                                      <i>
                                        {loanerLanguageIsProto && (
                                          <span>*</span>
                                        )}
                                        {(etymology[0].loanword_type ===
                                          "suffix" ||
                                          etymology[0].loanword_type ===
                                            "enclitic") && <span>-</span>}
                                        {etymology[0].loanword}
                                        {(etymology[0].loanword_type ===
                                          "prefix" ||
                                          etymology[0].loanword_type ===
                                            "proclitic") && <span>-</span>}
                                      </i>
                                    </b>{" "}
                                    "{etymology[0].loanword_meaning}"
                                  </a>
                                </React.Fragment>
                              )}
                            </React.Fragment>
                          ))}
                      </>

                      {/* Cognates */}
                      {cognates && cognates.length > 0 && (
                        <span>
                          {translate("Cognate with")}{" "}
                          {cognates.map((cognate, index) => (
                            <React.Fragment key={cognate.word_id}>
                              <a
                                className="word-link"
                                href={`${
                                  import.meta.env.VITE_FRONTEND_URL
                                }/word/${cognate.word_id}`}
                              >
                                <span className="languageName">
                                  {cognate.language_name}{" "}
                                </span>
                                <i>
                                  {cognate.is_proto && <span>*</span>}
                                  {(cognate.word_type === "suffix" ||
                                    cognate.word_type === "enclitic") && (
                                    <span>-</span>
                                  )}
                                  {cognate.word}
                                  {(cognate.word_type === "prefix" ||
                                    cognate.word_type === "proclitic") && (
                                    <span>-</span>
                                  )}
                                </i>{" "}
                                "{cognate.meaning.join(", ")}"
                              </a>
                              {index < cognates.length - 1 && ", "}
                            </React.Fragment>
                          ))}
                        </span>
                      )}

                      {/* Note */}
                      {etymology[0].note && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: `. ${etymology[0].note}`,
                          }}
                        />
                      )}

                      {/* Edit/Delete buttons */}

                      <>
                        <img
                          style={{ marginLeft: "10px" }}
                          src={editIcon}
                          className="edit-button"
                          onClick={() => handleEditEtymology(etymology[0])}
                        />
                        <img
                          style={{ marginLeft: "10px" }}
                          src={deleteIcon}
                          className="delete-button-with-icon"
                          onClick={() => handleDeleteEtymology(etymology[0])}
                        />
                      </>
                    </p>
                  ) : (
                    <></>
                  )}

                  {etymology.length === 1 &&
                  etymology[0].etymology_type === "other" ? (
                    <span>
                      {etymology[0].note ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: `${etymology[0].note}`,
                          }}
                        />
                      ) : (
                        <></>
                      )}

                      <>
                        <img
                          style={{ marginLeft: "10px" }}
                          src={editIcon}
                          className="edit-button"
                          onClick={() => handleEditEtymology(etymology[0])}
                        ></img>
                        <img
                          style={{ marginLeft: "10px" }}
                          src={deleteIcon}
                          className="delete-button-with-icon"
                          onClick={() => handleDeleteEtymology(etymology[0])}
                        ></img>
                      </>
                    </span>
                  ) : (
                    <></>
                  )}

                  {word.variant_of && (
                    <div>
                      <hr />
                      <p>
                        {translate("Variant of {word}", {
                          word: `{word}`,
                        })
                          .split("{word}")
                          .map((part, index, arr) => (
                            <React.Fragment key={index}>
                              {part}
                              {index < arr.length - 1 && (
                                <i>
                                  <a
                                    className="word-link"
                                    href={`${
                                      import.meta.env.VITE_FRONTEND_URL
                                    }/word/${word.variant_of.word_id}`}
                                  >
                                    {word.variant_of.word}
                                  </a>
                                </i>
                              )}
                            </React.Fragment>
                          ))}
                      </p>
                    </div>
                  )}

                  <hr />
                  <div className="title-and-edit-button-div">
                    <h3>{translate("Definition")}</h3>
                  </div>
                  <b>
                    <i>
                      {isProto ? <span>*</span> : <></>}
                      {word.word_type === "suffix" ||
                      word.word_type === "enclitic" ? (
                        <span>-</span>
                      ) : (
                        <></>
                      )}
                      {word.word}
                      {word.word_type === "prefix" ||
                      word.word_type === "proclitic" ? (
                        <span>-</span>
                      ) : (
                        <></>
                      )}
                    </i>
                  </b>
                  {word.ipa ? (
                    <span style={{ marginLeft: "10px" }}>/{word.ipa}/</span>
                  ) : (
                    <></>
                  )}

                  {word.noun_meaning ? (
                    <>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h4>{translate("Noun")}</h4>
                        {Array.isArray(word.noun_word_categories) &&
                        word.noun_word_categories.length > 0 ? (
                          word.noun_word_categories.map((category, index) => (
                            <span style={{ marginLeft: "10px" }}>
                              {category.category_type !== "none" ? (
                                <i>{category.category_type}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>

                      {word.noun_word_forms ? (
                        <DisplayWordForms
                          forms={word.noun_word_forms}
                          type={"noun"}
                        />
                      ) : (
                        <></>
                      )}
                      <DisplayMeaning meanings={nounMeanings} type={"noun"} />
                    </>
                  ) : (
                    <></>
                  )}

                  {word.adj_meaning ? (
                    <>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h4>{translate("Adj")}</h4>
                        {Array.isArray(word.adj_word_categories) &&
                        word.adj_word_categories.length > 0 ? (
                          word.adj_word_categories.map((category, index) => (
                            <span style={{ marginLeft: "10px" }}>
                              {category.category_type !== "none" ? (
                                <i>{category.category_type}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>

                      {word.adj_word_forms ? (
                        <DisplayWordForms
                          forms={word.adj_word_forms}
                          type={"adj"}
                        />
                      ) : (
                        <></>
                      )}
                      <DisplayMeaning meanings={adjMeanings} type={"adj"} />
                    </>
                  ) : (
                    <></>
                  )}

                  {word.num_meaning ? (
                    <>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h4>{translate("Number")}</h4>
                        {Array.isArray(word.num_word_categories) &&
                        word.num_word_categories.length > 0 ? (
                          word.num_word_categories.map((category, index) => (
                            <span style={{ marginLeft: "10px" }}>
                              {category.category_type !== "none" ? (
                                <i>{category.category_type}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>

                      {word.num_word_forms ? (
                        <DisplayWordForms
                          forms={word.num_word_forms}
                          type={"num"}
                        />
                      ) : (
                        <></>
                      )}
                      <DisplayMeaning meanings={numMeanings} type={"num"} />
                    </>
                  ) : (
                    <></>
                  )}

                  {word.verb_meaning ? (
                    <>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h4>{translate("Verb")}</h4>
                        {Array.isArray(word.verb_word_categories) &&
                        word.verb_word_categories.length > 0 ? (
                          word.verb_word_categories.map((category, index) => (
                            <span key={index} style={{ marginLeft: "10px" }}>
                              {category.category_type !== "none" ? (
                                <i>{category.category_type}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                      {word.verb_word_forms ? (
                        <DisplayWordForms
                          forms={word.verb_word_forms}
                          type={"verb"}
                        />
                      ) : (
                        <></>
                      )}

                      <DisplayMeaning meanings={verbMeanings} type={"verb"} />
                    </>
                  ) : (
                    <></>
                  )}

                  {word.adv_meaning ? (
                    <>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h3>{translate("Adverb")}</h3>
                        {Array.isArray(word.adv_word_categories) &&
                        word.adv_word_categories.length > 0 ? (
                          word.adv_word_categories.map((category, index) => (
                            <span style={{ marginLeft: "10px" }}>
                              {category.category_type !== "none" ? (
                                <i>{category.category_type}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                      {word.adv_word_forms ? (
                        <DisplayWordForms
                          forms={word.adv_word_forms}
                          type={"adv"}
                        />
                      ) : (
                        <></>
                      )}

                      <DisplayMeaning meanings={advMeanings} type={"adv"} />
                    </>
                  ) : (
                    <></>
                  )}

                  {word.adp_meaning ? (
                    <>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h3>{translate("Adposition")}</h3>
                        {Array.isArray(word.adp_word_categories) &&
                        word.adp_word_categories.length > 0 ? (
                          word.adp_word_categories.map((category, index) => (
                            <span style={{ marginLeft: "10px" }}>
                              {category.category_type !== "none" ? (
                                <i>{category.category_type}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                      {word.adp_word_forms ? (
                        <DisplayWordForms
                          forms={word.adp_word_forms}
                          type={"adp"}
                        />
                      ) : (
                        <></>
                      )}

                      <DisplayMeaning meanings={adpMeanings} type={"adp"} />
                    </>
                  ) : (
                    <></>
                  )}

                  {word.pron_meaning ? (
                    <>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h3>{translate("Pronoun")}</h3>
                        {Array.isArray(word.pron_word_categories) &&
                        word.pron_word_categories.length > 0 ? (
                          word.pron_word_categories.map((category, index) => (
                            <span style={{ marginLeft: "10px" }}>
                              {category.category_type !== "none" ? (
                                <i>{category.category_type}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                      {word.pron_word_forms ? (
                        <DisplayWordForms
                          forms={word.pron_word_forms}
                          type={"pron"}
                        />
                      ) : (
                        <></>
                      )}

                      <DisplayMeaning meanings={pronMeanings} type={"pron"} />
                    </>
                  ) : (
                    <></>
                  )}

                  {word.conj_meaning ? (
                    <>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h3>{translate("Conjunction")}</h3>
                        {Array.isArray(word.conj_word_categories) &&
                        word.conj_word_categories.length > 0 ? (
                          word.conj_word_categories.map((category, index) => (
                            <span style={{ marginLeft: "10px" }}>
                              {category.category_type !== "none" ? (
                                <i>{category.category_type}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                      {word.conj_word_forms ? (
                        <DisplayWordForms
                          forms={word.conj_word_forms}
                          type={"conj"}
                        />
                      ) : (
                        <></>
                      )}

                      <DisplayMeaning meanings={conjMeanings} type={"conj"} />
                    </>
                  ) : (
                    <></>
                  )}

                  {word.part_meaning ? (
                    <>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h3>{translate("Particle")}</h3>
                        {Array.isArray(word.part_word_categories) &&
                        word.part_word_categories.length > 0 ? (
                          word.part_word_categories.map((category, index) => (
                            <span style={{ marginLeft: "10px" }}>
                              {category.category_type !== "none" ? (
                                <i>{category.category_type}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                      {word.part_word_forms ? (
                        <DisplayWordForms
                          forms={word.part_word_forms}
                          type={"part"}
                        />
                      ) : (
                        <></>
                      )}

                      <DisplayMeaning meanings={partMeanings} type={"part"} />
                    </>
                  ) : (
                    <></>
                  )}

                  {word.interj_meaning ? (
                    <>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h3>{translate("Interjection")}</h3>
                        {Array.isArray(word.interj_word_categories) &&
                        word.interj_word_categories.length > 0 ? (
                          word.interj_word_categories.map((category, index) => (
                            <span style={{ marginLeft: "10px" }}>
                              {category.category_type !== "none" ? (
                                <i>{category.category_type}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                      {word.interj_word_forms ? (
                        <DisplayWordForms
                          forms={word.interj_word_forms}
                          type={"interj"}
                        />
                      ) : (
                        <></>
                      )}

                      <DisplayMeaning
                        meanings={interjMeanings}
                        type={"interj"}
                      />
                    </>
                  ) : (
                    <></>
                  )}

                  {word.affix_meaning ? (
                    <>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h3>{translate("Affix")}</h3>

                        {Array.isArray(word.affix_word_categories) &&
                        word.affix_word_categories.length > 0 ? (
                          word.affix_word_categories.map((category, index) => (
                            <span style={{ marginLeft: "10px" }}>
                              {category.category_type !== "none" ? (
                                <i>{category.category_type}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                      {word.affix_word_forms ? (
                        <DisplayWordForms
                          forms={word.affix_word_forms}
                          type={"affix"}
                        />
                      ) : (
                        <></>
                      )}

                      <DisplayMeaning meanings={affixMeanings} type={"affix"} />
                    </>
                  ) : (
                    <></>
                  )}

                  {word.clitic_meaning ? (
                    <>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h3>{translate("Clitic")}</h3>

                        {Array.isArray(word.clitic_word_categories) &&
                        word.clitic_word_categories.length > 0 ? (
                          word.clitic_word_categories.map((category, index) => (
                            <span style={{ marginLeft: "10px" }}>
                              {category.category_type !== "none" ? (
                                <i>{category.category_type}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                      {word.clitic_word_forms ? (
                        <DisplayWordForms
                          forms={word.clitic_word_forms}
                          type={"clitic"}
                        />
                      ) : (
                        <></>
                      )}

                      <DisplayMeaning
                        meanings={cliticMeanings}
                        type={"clitic"}
                      />
                    </>
                  ) : (
                    <></>
                  )}

                  {word.variants && word.variants.length > 0 && (
                    <div>
                      <p>
                        {translate("Variants")}:&nbsp;
                        {word.variants.map((variant, index) => (
                          <span key={variant.word_id}>
                            <a
                              className="word-link"
                              href={`${
                                import.meta.env.VITE_FRONTEND_URL
                              }/word/${variant.word_id}`}
                            >
                              <i>{variant.word}</i>
                            </a>
                            {index < word.variants.length - 1 && ", "}
                          </span>
                        ))}
                      </p>
                    </div>
                  )}

                  <div>
                    {
                      <ExtractExampleSentencesFromCorpus
                        languageId={languageId}
                        entryWord={word.word}
                        wordId={word.word_id}
                      />
                    }

                    {/* Noun */}
                    {word.noun_sentence_examples?.length > 0 &&
                      word.noun_sentence_examples.map((sentence, index) => (
                        <div key={`noun-${index}`}>
                          <p>
                            <i
                              dangerouslySetInnerHTML={{
                                __html: sentence.sentence,
                              }}
                            ></i>{" "}
                            "
                            <span
                              dangerouslySetInnerHTML={{
                                __html: sentence.translation,
                              }}
                            ></span>
                            "
                          </p>
                        </div>
                      ))}

                    {/* Verb */}
                    {word.verb_sentence_examples?.length > 0 &&
                      word.verb_sentence_examples.map((sentence, index) => (
                        <div key={`verb-${index}`}>
                          <p>
                            <i
                              dangerouslySetInnerHTML={{
                                __html: sentence.sentence,
                              }}
                            ></i>{" "}
                            "
                            <span
                              dangerouslySetInnerHTML={{
                                __html: sentence.translation,
                              }}
                            ></span>
                            "
                          </p>
                        </div>
                      ))}

                    {/* Num */}
                    {word.num_sentence_examples?.length > 0 &&
                      word.num_sentence_examples.map((sentence, index) => (
                        <div key={`num-${index}`}>
                          <p>
                            <i
                              dangerouslySetInnerHTML={{
                                __html: sentence.sentence,
                              }}
                            ></i>{" "}
                            "
                            <span
                              dangerouslySetInnerHTML={{
                                __html: sentence.translation,
                              }}
                            ></span>
                            "
                          </p>
                        </div>
                      ))}

                    {/* Adjective */}
                    {word.adj_sentence_examples?.length > 0 &&
                      word.adj_sentence_examples.map((sentence, index) => (
                        <div key={`adj-${index}`}>
                          <p>
                            <i
                              dangerouslySetInnerHTML={{
                                __html: sentence.sentence,
                              }}
                            ></i>{" "}
                            "
                            <span
                              dangerouslySetInnerHTML={{
                                __html: sentence.translation,
                              }}
                            ></span>
                            "
                          </p>
                        </div>
                      ))}

                    {/* Adverb */}
                    {word.adv_sentence_examples?.length > 0 &&
                      word.adv_sentence_examples.map((sentence, index) => (
                        <div key={`adv-${index}`}>
                          <p>
                            <i
                              dangerouslySetInnerHTML={{
                                __html: sentence.sentence,
                              }}
                            ></i>{" "}
                            "
                            <span
                              dangerouslySetInnerHTML={{
                                __html: sentence.translation,
                              }}
                            ></span>
                            "
                          </p>
                        </div>
                      ))}

                    {/* Adposition */}
                    {word.adp_sentence_examples?.length > 0 &&
                      word.adp_sentence_examples.map((sentence, index) => (
                        <div key={`adp-${index}`}>
                          <p>
                            <i
                              dangerouslySetInnerHTML={{
                                __html: sentence.sentence,
                              }}
                            ></i>{" "}
                            "
                            <span
                              dangerouslySetInnerHTML={{
                                __html: sentence.translation,
                              }}
                            ></span>
                            "
                          </p>
                        </div>
                      ))}

                    {/* Conjunction */}
                    {word.conj_sentence_examples?.length > 0 &&
                      word.conj_sentence_examples.map((sentence, index) => (
                        <div key={`conj-${index}`}>
                          <p>
                            <i
                              dangerouslySetInnerHTML={{
                                __html: sentence.sentence,
                              }}
                            ></i>{" "}
                            "
                            <span
                              dangerouslySetInnerHTML={{
                                __html: sentence.translation,
                              }}
                            ></span>
                            "
                          </p>
                        </div>
                      ))}

                    {/* Particle */}
                    {word.part_sentence_examples?.length > 0 &&
                      word.part_sentence_examples.map((sentence, index) => (
                        <div key={`part-${index}`}>
                          <p>
                            <i
                              dangerouslySetInnerHTML={{
                                __html: sentence.sentence,
                              }}
                            ></i>{" "}
                            "
                            <span
                              dangerouslySetInnerHTML={{
                                __html: sentence.translation,
                              }}
                            ></span>
                            "
                          </p>
                        </div>
                      ))}

                    {/* Interjection */}
                    {word.interj_sentence_examples?.length > 0 &&
                      word.interj_sentence_examples.map((sentence, index) => (
                        <div key={`interj-${index}`}>
                          <p>
                            <i
                              dangerouslySetInnerHTML={{
                                __html: sentence.sentence,
                              }}
                            ></i>{" "}
                            "
                            <span
                              dangerouslySetInnerHTML={{
                                __html: sentence.translation,
                              }}
                            ></span>
                            "
                          </p>
                        </div>
                      ))}

                    {/* Pronoun */}
                    {word.pron_sentence_examples?.length > 0 &&
                      word.pron_sentence_examples.map((sentence, index) => (
                        <div key={`pron-${index}`}>
                          <p>
                            <i
                              dangerouslySetInnerHTML={{
                                __html: sentence.sentence,
                              }}
                            ></i>{" "}
                            "
                            <span
                              dangerouslySetInnerHTML={{
                                __html: sentence.translation,
                              }}
                            ></span>
                            "
                          </p>
                        </div>
                      ))}
                  </div>

                  {word.word_note ? (
                    <>
                      <hr />
                      <h5>Note</h5>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: `${word.word_note}`,
                        }}
                      ></p>
                    </>
                  ) : (
                    <></>
                  )}

                  {phrases.length > 0 && (
                    <div
                      className="title-and-edit-button-div"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      {" "}
                      <hr />
                      <h3>{translate("Phrases")}</h3>
                      <div>
                        {removeDuplicates(phrases).map((phrase) => (
                          <p>
                            <span>
                              <i>{phrase.phrase}</i>
                            </span>
                            <span> "{phrase.meaning}"</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {word.inflection ? (
                    <>
                      <hr />
                      <h5>{translate("Inflection")}</h5>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: `${word.inflection}`,
                        }}
                      ></p>
                    </>
                  ) : (
                    <></>
                  )}
                  <hr />

                  <div className="title-and-edit-button-div">
                    <h3>{translate("Derivations")}</h3>

                    <img
                      src={editIcon}
                      className="edit-button"
                      onClick={() => {
                        setShowAddDerivationModal(true);
                      }}
                    ></img>
                  </div>

                  {derivations.length > 0 && (
                    <div>
                      <ol>
                        {derivations.map((derivation, index) => (
                          <li key={index}>
                            <a
                              className="word-link"
                              href={`${
                                import.meta.env.VITE_FRONTEND_URL
                              }/word/${derivation.derived_word_id}`}
                            >
                              <b>
                                <i>
                                  {isProto ? <span>*</span> : <></>}
                                  {derivation.word}
                                </i>
                              </b>{" "}
                              "{derivation.meaning}"
                            </a>
                          </li>
                        ))}
                      </ol>
                      <hr />
                    </div>
                  )}

                  <hr />

                  <div>
                    <div className="title-and-edit-button-div">
                      <h3>{translate("Descendant Terms")}</h3>

                      <img
                        src={editIcon}
                        className="edit-button"
                        onClick={() => {
                          setShowAddDescendantModal(true);
                        }}
                      ></img>
                    </div>
                    {descendants.length > 0 && (
                      <ol>
                        {descendants.map((descendant, index) => (
                          <li key={index}>
                            {descendant.etymology_type === "loaned" ? (
                              <span>
                                <i>({translate("loan")})</i>{" "}
                                <span className="languageName">
                                  {descendant.language_name}
                                </span>
                                :{" "}
                              </span>
                            ) : (
                              <span>
                                <span className="languageName">
                                  {descendant.language_name}
                                </span>
                                :{" "}
                              </span>
                            )}

                            <a
                              className="word-link"
                              href={`${
                                import.meta.env.VITE_FRONTEND_URL
                              }/word/${descendant.descendant_word_id}`}
                            >
                              <b>
                                <i>
                                  {descendant.is_proto ? <span>*</span> : <></>}
                                  {descendant.word_type === "suffix" ||
                                  descendant.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {descendant.word}
                                  {descendant.word_type === "prefix" ||
                                  descendant.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                </i>
                              </b>{" "}
                              "{descendant.meaning}"
                            </a>
                          </li>
                        ))}
                      </ol>
                    )}
                    <hr />
                  </div>

                  {synonyms.length > 0 && (
                    <div>
                      <div className="title-and-edit-button-div">
                        <h3>{translate("Synonyms")}</h3>
                      </div>
                      <ol>
                        {synonyms.map((synonym, index) => (
                          <li key={index}>
                            <a
                              className="word-link"
                              href={`${
                                import.meta.env.VITE_FRONTEND_URL
                              }/word/${synonym.word_id}`}
                            >
                              <b>
                                <i>
                                  {isProto ? <span>*</span> : <></>}
                                  {synonym.word_type === "suffix" ||
                                  synonym.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {synonym.word}
                                  {synonym.word_type === "prefix" ||
                                  synonym.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                </i>
                              </b>{" "}
                              "{synonym.meaning.join(", ")}"
                            </a>
                          </li>
                        ))}
                      </ol>{" "}
                      <hr />
                    </div>
                  )}

                  <div>
                    {tags.length > 0 && (
                      <>
                        <h3>{translate("Tags")}</h3>
                        <ul>
                          {tags.map((tag, index) => (
                            <li
                              className="word-form-list"
                              style={{ display: "inline" }}
                              key={index}
                            >
                              <b>{tag.name}</b>: <i>{tag.tag}</i>
                            </li>
                          ))}
                        </ul>
                        <hr />
                      </>
                    )}

                    {word.thesaurus && <h3>{translate("Thesaurus")}</h3>}
                    {word.thesaurus &&
                      Object.entries(word.thesaurus).map(([domain, val]) => {
                        if (!val.bool) return;

                        const matchingWords = allWords?.filter(
                          (matchingWord) =>
                            matchingWord.thesaurus &&
                            matchingWord.thesaurus[domain],
                        );

                        if (!matchingWords || matchingWords.length === 0) {
                          return null; // Don't render this type if no matches
                        }

                        return (
                          <div>
                            <div
                              key={domain}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    textDecoration: "underline",
                                  }}
                                >
                                  {domain}
                                </span>
                                :
                                {matchingWords.map((matchedWord, index) => (
                                  <span
                                    key={matchedWord.word_id}
                                    style={{
                                      display: "inline",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    <div
                                      className="word-link"
                                      style={{ display: "inline" }}
                                      onClick={() =>
                                        handleOpenWord(matchedWord.word_id)
                                      }
                                    >
                                      <span>
                                        <i>{matchedWord.word}</i>
                                      </span>
                                      <span style={{ marginLeft: "5px" }}>
                                        "{formatMeaning(matchedWord)}"
                                      </span>
                                    </div>
                                    {index < matchingWords.length - 1
                                      ? ","
                                      : "."}
                                  </span>
                                ))}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    <hr />
                  </div>

                  <div className="title-and-edit-button-div">
                    <h3>{translate("Sources")}</h3>

                    <img src={editIcon} className="edit-button"></img>
                  </div>

                  <hr />
                </div>

                {authorUsername ? (
                  <p>
                    {translate("Added by")}{" "}
                    <span
                      className="word-link"
                      onClick={() => handleOpenUser(word.made_by)}
                    >
                      {authorUsername}
                    </span>{" "}
                    {translate("at")} {madeDate}.{" "}
                    {editorUsername ? (
                      <span>
                        {" "}
                        {translate("Edited by")}{" "}
                        <span
                          className="word-link"
                          onClick={() => handleOpenUser(word.edited_by)}
                        >
                          {editorUsername} {translate("at")} {editedDate}.
                        </span>
                      </span>
                    ) : (
                      <></>
                    )}
                  </p>
                ) : (
                  <h1>{translate("Loading...")}</h1>
                )}
              </>
            ) : (
              <>
                {showPermissionMessage ? (
                  <h2>
                    {translate(
                      "You do not have permission to view this dictionary",
                    )}
                  </h2>
                ) : (
                  <h1>{translate("Loading...")}</h1>
                )}
              </>
            )}
          </>
        ) : (
          <h1>{translate("Loading...")}</h1>
        )}
      </div>
    </>
  );
};

export default Word;
