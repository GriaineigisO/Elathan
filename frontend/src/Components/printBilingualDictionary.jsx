import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import React from "react";
import meaningKeys from "../assets/meaningKeys";
import { useTranslate } from "../Functions/TranslateUI";
import DerivationalAffixBlock from "./getDerivationRoots";
import ExtractExampleSentencesFromCorpus from "./ExtractExampleSentencesFromCorpus";
import { getAllWordsForPrint } from "../services/dictionaryService";
import DictionaryTitle from "./DictionaryTitle";

export function PrintBilingualDictionary({
  visibleWords,
  pageSize,
  isProto,
  showPrintedDictionary,
  setShowPrintedDictionary,
  openWord,
  setLoadingBilingual,
  allEnglishWords,
  languageName,
  fixPhrases,
  resolvedAffixes,
  id,
  dictionaryType,
  authorName,
}) {
  const { translate } = useTranslate();
  const [allWords, setAllWords] = useState([]);
  const [shouldPrint, setShouldPrint] = useState(false);

  const contentRef = useRef(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
  });


  async function printDict() {
    setLoadingBilingual(true);
    const data = await window.electron.getAllWordsForPrint(id);

    setAllWords(structuredClone(data));

    setShouldPrint(true);
  }
  useEffect(() => {
    if (!shouldPrint) return;
    if (allWords.length === 0) return;
    requestAnimationFrame(() => {
      reactToPrintFn();
      setShouldPrint(false);
      setLoadingBilingual(false);
    });
  }, [allWords, shouldPrint]);


  return (
    <div>
      <button className="hide-for-printing" onClick={printDict}>
        Print
      </button>
      <div ref={contentRef}>
        <div className="show-for-printing" style={{ textAlign: "center" }}>
          <DictionaryTitle
            languageName={languageName}
            dictionaryType={dictionaryType}
            authorName={authorName}
          />
          {translate("{wordCount} words.", {
            wordCount: visibleWords.length.toLocaleString(),
          })}
        </div>
        <p className="show-for-printing" style={{textAlign:"center", marginTop:"20px"}}>{translate("by {authorName}", {authorName})}</p>
        <div
          className={`dictionary-table page-break two-cols show-for-printing`}
        >
          {allWords.map((word, index) => (
            <div key={index} className="dictionary-entry">
              <div>
                <span>
                  <b style={{ fontWeight: "bolder" }}>
                    {isProto ? <span>*</span> : <></>}
                    {word.word_type === "suffix" ||
                    word.word_type === "enclitic" ? (
                      <span>-</span>
                    ) : (
                      <></>
                    )}
                    <span className="headword">{word.word}</span>
                    {word.word_type === "prefix" ||
                    word.word_type === "proclitic" ? (
                      <span>-</span>
                    ) : (
                      <></>
                    )}
                  </b>
                </span>
                {!word.variant_of && word.ipa ? (
                  <span>/{word.ipa}/</span>
                ) : (
                  <></>
                )}

                {word.variant_of && (
                  <span>
                    {" "}
                    {translate("variant of {word}", {
                      word: `{word}`,
                    })
                      .split("{word}")
                      .map((part, index, arr) => (
                        <React.Fragment key={index}>
                          {part}
                          {index < arr.length - 1 && (
                            <i>
                              <b>
                                {isProto ? <span>*</span> : <></>}
                                {word.variant_of.word}
                              </b>
                            </i>
                          )}
                        </React.Fragment>
                      ))}
                  </span>
                )}

                {word.noun_meaning ? (
                  Array.isArray(word.noun_word_categories) &&
                  word.noun_word_categories.length > 0 ? (
                    <>
                      <span>
                        {" "}
                        <i>
                          {translate("n")}
                          {word.noun_word_categories.map((category, index) => (
                            <span key={index}>
                              {category && category.category_type !== "none" ? (
                                <i>.{category.abbreviation}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))}
                          ;
                        </i>{" "}
                        {word.noun_word_forms &&
                        word.noun_word_forms.length > 0 ? (
                          word.noun_word_forms.map((wordForm, index) =>
                            wordForm ? (
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              )
                            ) : (
                              <></>
                            ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.noun_meaning.join(", ")}"
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {" "}
                        <i>{translate("n")};</i>{" "}
                        {word.noun_word_forms ? (
                          word.noun_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.noun_meaning.join(", ")}"
                      </span>
                    </>
                  )
                ) : (
                  <></>
                )}
                {word.adj_meaning ? (
                  Array.isArray(word.adj_word_categories) &&
                  word.adj_word_categories.length > 0 ? (
                    <>
                      <span>
                        {" "}
                        <i>
                          {translate("adj")}
                          {word.adj_word_categories.map((category, index) => (
                            <span key={index}>
                              .
                              {category.category_type !== "none" ? (
                                <i>{category.abbreviation}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))}
                          ;
                        </i>{" "}
                        {word.adj_word_forms ? (
                          word.adj_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span>"{word.adj_meaning.join(", ")}"</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {" "}
                        <i>{translate("adj")};</i>{" "}
                        {word.adj_word_forms ? (
                          word.adj_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.adj_meaning.join(", ")}"
                      </span>
                    </>
                  )
                ) : (
                  <></>
                )}
                {word.verb_meaning ? (
                  Array.isArray(word.verb_word_categories) &&
                  word.verb_word_categories.length > 0 ? (
                    <>
                      <span>
                        {" "}
                        <i>
                          {translate("v")}
                          {word.verb_word_categories.map((category, index) => (
                            <span key={index}>
                              .
                              {category.category_type !== "none" ? (
                                <i>{category.abbreviation}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))}
                          ;
                        </i>{" "}
                        {word.verb_word_forms ? (
                          word.verb_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.verb_meaning.join(", ")}"
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {" "}
                        <i>{translate("v")};</i>{" "}
                        {word.verb_word_forms ? (
                          word.verb_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.verb_meaning.join(", ")}"
                      </span>
                    </>
                  )
                ) : (
                  <></>
                )}
                {word.num_meaning ? (
                  Array.isArray(word.num_word_categories) &&
                  word.num_word_categories.length > 0 ? (
                    <>
                      <span>
                        {" "}
                        <i>
                          {translate("num")}
                          {word.num_word_categories.map((category, index) => (
                            <span key={index}>
                              {category.category_type !== "none" ? (
                                <i>.{category.abbreviation}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))}
                          ;
                        </i>{" "}
                        {word.num_word_forms &&
                        word.num_word_forms.length > 0 ? (
                          word.num_word_forms.map((wordForm, index) =>
                            wordForm ? (
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              )
                            ) : (
                              <></>
                            ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.num_meaning.join(", ")}"
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {" "}
                        <i>{translate("num")};</i>{" "}
                        {word.num_word_forms ? (
                          word.num_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.num_meaning.join(", ")}"
                      </span>
                    </>
                  )
                ) : (
                  <></>
                )}
                {word.adv_meaning ? (
                  Array.isArray(word.advn_word_categories) &&
                  word.adv_word_categories.length > 0 ? (
                    <>
                      <span>
                        {" "}
                        <i>
                          {translate("adv")}
                          {word.adv_word_categories.map((category, index) => (
                            <span key={index}>
                              .
                              {category.category_type !== "none" ? (
                                <i>{category.abbreviation}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))}{" "}
                          ;
                        </i>{" "}
                        {word.adv_word_forms ? (
                          word.adv_word_forms.map((wordForm, index) => (
                            <div className="wordForm-print">
                              <span className="languageName">
                                {wordForm.name}:{" "}
                              </span>
                              {isProto ? <span>*</span> : <></>}
                              {word.word_type === "suffix" ||
                              word.word_type === "enclitic" ? (
                                <span>-</span>
                              ) : (
                                <></>
                              )}
                              {word.word_type === "prefix" ||
                              word.word_type === "proclitic" ? (
                                <span>-</span>
                              ) : (
                                <></>
                              )}
                              <i>{wordForm.word}</i>;{" "}
                            </div>
                          ))
                        ) : (
                          <></>
                        )}
                      </span>
                      <span>"{word.adv_meaning.join(", ")}"</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {" "}
                        <i>{translate("adv")};</i>{" "}
                        {word.adv_word_forms ? (
                          word.adv_word_forms.map((wordForm, index) => (
                            <div className="wordForm-print">
                              <span className="languageName">
                                {wordForm.name}:{" "}
                              </span>
                              {isProto ? <span>*</span> : <></>}
                              {word.word_type === "suffix" ||
                              word.word_type === "enclitic" ? (
                                <span>-</span>
                              ) : (
                                <></>
                              )}
                              {word.word_type === "prefix" ||
                              word.word_type === "proclitic" ? (
                                <span>-</span>
                              ) : (
                                <></>
                              )}
                              <i>{wordForm.word}</i>;{" "}
                            </div>
                          ))
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.adv_meaning.join(", ")}"
                      </span>
                    </>
                  )
                ) : (
                  <></>
                )}
                {word.adp_meaning ? (
                  Array.isArray(word.adp_word_categories) &&
                  word.adp_word_categories.length > 0 ? (
                    <>
                      <span>
                        {" "}
                        <i>
                          {translate("adp")}
                          {word.adp_word_categories.map((category, index) => (
                            <span key={index}>
                              .
                              {category.category_type !== "none" ? (
                                <i>{category.abbreviation}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))}
                          ;
                        </i>{" "}
                        {showPrintedDictionary && word.adp_word_forms ? (
                          word.adp_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span>"{word.adp_meaning.join(", ")}"</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {" "}
                        <i>{translate("adp")};</i>{" "}
                        {showPrintedDictionary && word.adp_word_forms ? (
                          word.adp_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.adp_meaning.join(", ")}"
                      </span>
                    </>
                  )
                ) : (
                  <></>
                )}
                {word.affix_meaning ? (
                  Array.isArray(word.affix_word_categories) &&
                  word.affix_word_categories.length > 0 ? (
                    <>
                      <span>
                        {" "}
                        <i>
                          {word.word_type === "suffix" ||
                            (word.word_type === "prefix" && (
                              <span>{translate("affix")}</span>
                            ))}
                          {word.word_type === "enclitic" ||
                            (word.word_type === "proclitic" && (
                              <span>{translate("clitic")}</span>
                            ))}
                          {word.affix_word_categories.map((category, index) => (
                            <span key={index}>
                              .
                              {category.category_type !== "none" ? (
                                <i>{category.abbreviation}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))}{" "}
                          ;
                        </i>{" "}
                        {showPrintedDictionary && word.affix_word_forms ? (
                          word.affix_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.affix_meaning.join(", ")}"
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {" "}
                        <i>
                          {(word.word_type === "suffix" ||
                            word.word_type === "prefix") && (
                            <span>{translate("affix")}</span>
                          )}
                          {(word.word_type === "enclitic" ||
                            word.word_type === "proclitic") && (
                            <span>{translate("clitic")}</span>
                          )}
                        </i>{" "}
                        {showPrintedDictionary && word.affix_word_forms ? (
                          word.affix_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.affix_meaning.join(", ")}"
                      </span>
                    </>
                  )
                ) : (
                  <></>
                )}
                {word.pron_meaning ? (
                  Array.isArray(word.pron_word_categories) &&
                  word.pron_word_categories.length > 0 ? (
                    <>
                      <span>
                        {" "}
                        <i>
                          {translate("pron")}
                          {word.pron_word_categories.map((category, index) => (
                            <span key={index}>
                              .
                              {category.category_type !== "none" ? (
                                <i>{category.abbreviation}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))}
                          ;
                        </i>{" "}
                        {showPrintedDictionary && word.pron_word_forms ? (
                          word.pron_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.pron_meaning.join(", ")}"
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {" "}
                        <i>{translate("pron")};</i>{" "}
                        {showPrintedDictionary && word.pronoun_word_forms ? (
                          word.pronoun_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.pron_meaning.join(", ")}"
                      </span>
                    </>
                  )
                ) : (
                  <></>
                )}
                {word.part_meaning ? (
                  Array.isArray(word.part_word_categories) &&
                  word.part_word_categories.length > 0 ? (
                    <>
                      <span>
                        {" "}
                        <i>
                          {translate("part")}
                          {word.part_word_categories.map((category, index) => (
                            <span key={index}>
                              .
                              {category.category_type !== "none" ? (
                                <i>{category.abbreviation}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))}
                          ;
                        </i>{" "}
                        {showPrintedDictionary && word.part_word_forms ? (
                          word.part_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.part_meaning.join(", ")}"
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {" "}
                        <i>{translate("part")};</i>{" "}
                        {showPrintedDictionary && word.part_word_forms ? (
                          word.part_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.part_meaning.join(", ")}"
                      </span>
                    </>
                  )
                ) : (
                  <></>
                )}
                {word.interj_meaning ? (
                  Array.isArray(word.interj_word_categories) &&
                  word.interj_word_categories.length > 0 ? (
                    <>
                      <span>
                        {" "}
                        <i>
                          {translate("interj")}
                          {word.interj_word_categories.map(
                            (category, index) => (
                              <span key={index}>
                                .
                                {category.category_type !== "none" ? (
                                  <i>{category.abbreviation}</i>
                                ) : (
                                  <></>
                                )}
                              </span>
                            ),
                          )}
                          ;
                        </i>{" "}
                        {showPrintedDictionary && word.interj_word_forms ? (
                          word.interj_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.interj_meaning.join(", ")}"
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {" "}
                        <i>{translate("interj")};</i>{" "}
                        {showPrintedDictionary && word.interj_word_forms ? (
                          word.interj_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.interj_meaning.join(", ")}"
                      </span>
                    </>
                  )
                ) : (
                  <></>
                )}
                {word.conj_meaning ? (
                  Array.isArray(word.conj_word_categories) &&
                  word.conj_word_categories.length > 0 ? (
                    <>
                      <span>
                        {" "}
                        <i>
                          {translate("conj")}
                          {word.conj_word_categories.map((category, index) => (
                            <span key={index}>
                              .
                              {category.category_type !== "none" ? (
                                <i>{category.abbreviation}</i>
                              ) : (
                                <></>
                              )}
                            </span>
                          ))}
                          ;
                        </i>{" "}
                        {showPrintedDictionary && word.conj_word_forms ? (
                          word.conj_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.conj_meaning.join(", ")}"
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {" "}
                        <i>{translate("conj")};</i>{" "}
                        {showPrintedDictionary && word.conj_word_forms ? (
                          word.conj_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.conj_meaning.join(", ")}"
                      </span>
                    </>
                  )
                ) : (
                  <></>
                )}
                {word.clitic_meaning ? (
                  Array.isArray(word.clitic_word_categories) &&
                  word.clitic_word_categories.length > 0 ? (
                    <>
                      <span>
                        {" "}
                        <i>
                          {translate("clitic")}
                          {word.clitic_word_categories.map(
                            (category, index) => (
                              <span key={index}>
                                .
                                {category.category_type !== "none" ? (
                                  <i>{category.abbreviation}</i>
                                ) : (
                                  <></>
                                )}
                              </span>
                            ),
                          )}
                          ;
                        </i>{" "}
                        {showPrintedDictionary && word.conj_word_forms ? (
                          wordForm.word &&
                          word.clitic_word_forms.map((wordForm, index) => (
                            <div className="wordForm-print">
                              <span className="languageName">
                                {wordForm.name}:{" "}
                              </span>
                              {isProto ? <span>*</span> : <></>}
                              {word.word_type === "suffix" ||
                              word.word_type === "enclitic" ? (
                                <span>-</span>
                              ) : (
                                <></>
                              )}
                              {word.word_type === "prefix" ||
                              word.word_type === "proclitic" ? (
                                <span>-</span>
                              ) : (
                                <></>
                              )}
                              <i>{wordForm.word}</i>;{" "}
                            </div>
                          ))
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.clitic_meaning.join(", ")}"
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {" "}
                        <i>{translate("clitic")};</i>{" "}
                        {showPrintedDictionary && word.clitic_word_forms ? (
                          word.clitic_word_forms.map(
                            (wordForm, index) =>
                              wordForm.word && (
                                <div className="wordForm-print">
                                  <span className="languageName">
                                    {wordForm.name}:{" "}
                                  </span>
                                  {isProto ? <span>*</span> : <></>}
                                  {word.word_type === "suffix" ||
                                  word.word_type === "enclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  {word.word_type === "prefix" ||
                                  word.word_type === "proclitic" ? (
                                    <span>-</span>
                                  ) : (
                                    <></>
                                  )}
                                  <i>{wordForm.word}</i>;{" "}
                                </div>
                              ),
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="meaning">
                        "{word.clitic_meaning.join(", ")}"
                      </span>
                    </>
                  )
                ) : (
                  <></>
                )}

                {word.phrases && (
                  <div className="phrase-print">
                    {word.phrases.map((phrase) => (
                      <>
                        <span>
                          <i>
                            <b>{phrase.word}</b>
                          </i>
                        </span>
                        <span> "{phrase.meaning}"</span>
                      </>
                    ))}
                  </div>
                )}

                

                <span className="descendants-print">
                  {word.descendants && word.descendants.length > 0 ? (
                    <span>
                      {" "}
                      {translate("Ancestor of:")}
                      <>
                        {word.descendants.map((descendant, index) => (
                          <React.Fragment key={index}>
                            {" "}
                            <span className="languageName">
                              {descendant.language_name}
                            </span>{" "}
                            {descendant.etymology_type === "loaned" && (
                              <span>({translate("loan")})</span>
                            )}{" "}
                            {descendant.is_proto && <span>*</span>}
                            {(descendant.word_type === "suffix" ||
                              word.word_type === "enclitic") && <span>-</span>}
                            <i>{descendant.word}</i>
                            {(descendant.word_type === "prefix" ||
                              word.word_type === "proclitic") && (
                              <span>-</span>
                            )}{" "}
                            "<span>{descendant.meaning}</span>"
                            {index < word.descendants.length - 1 ? ", " : ""}
                          </React.Fragment>
                        ))}
                      </>
                    </span>
                  ) : (
                    <></>
                  )}
                </span>

                {word.word_note ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: `${word.word_note}`,
                    }}
                  ></p>
                ) : (
                  <></>
                )}

                <ExtractExampleSentencesFromCorpus
                  languageId={word.language_id}
                  entryWord={word.word}
                  wordId={word.word_id}
                />

                <div className="etymology-border">
                  <span className="etymology-print">
                    {showPrintedDictionary &&
                    word.etymology &&
                    word.etymology.length > 1 ? (
                      <>
                        <span>
                          {translate(
                            "The various possible etymologies for {languageName} are",
                            {
                              languageName: languageName,
                            },
                          )}{" "}
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
                          </i>{" "}
                        </span>
                        <ol>
                          {word.etymology
                            .filter(
                              (etym) => etym.etymology_type === "fromMother",
                            )
                            .map((etym, index) => (
                              <li key={index}>
                                {translate("From {languageName}", {
                                  languageName: languageName,
                                })}
                                <span className="languageName">
                                  {etym.mother_language_name}{" "}
                                </span>
                                <a
                                  className="word-link"
                                  href={`${
                                    import.meta.env.VITE_FRONTEND_URL
                                  }/word/${etym.mother_word_id}`}
                                >
                                  <b>
                                    <i>
                                      {etym.mother_language_is_proto ? (
                                        <span>*</span>
                                      ) : (
                                        <></>
                                      )}
                                      {etym.mother_word_type === "suffix" ||
                                      word.word_type === "enclitic" ? (
                                        <span>-</span>
                                      ) : (
                                        <></>
                                      )}
                                      {etym.mother_word}
                                      {etym.mother_word_type === "prefix" ||
                                      word.word_type === "proclitic" ? (
                                        <span>-</span>
                                      ) : (
                                        <></>
                                      )}
                                    </i>
                                  </b>{" "}
                                  "{etym.mother_word_meaning}".
                                </a>{" "}
                                {etym.etymology_note ? (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: `. ${word.etymology[0].note}`,
                                    }}
                                  />
                                ) : (
                                  <></>
                                )}
                              </li>
                            ))}

                          {/*{word.etymology
                            .filter((etym) => etym.etymology_type === "derived")
                            .map((etym, index) => (
                              <li key={index}>
                                From {languageName}{" "}
                                  <b>
                                    <i>
                                      {isProto ? <span>*</span> : <></>}
                                      {etym.first_element_word_type === "suffix"  || word_type === "enclitic" ?  (
                                        <span>-</span>
                                      ) : (
                                        <></>
                                      )}
                                      {etym.first_element_word}
                                      {etym.first_element_word_type === "prefix" || _word_type === "proclitic" ? (
                                        <span>-</span>
                                      ) : (
                                        <></>
                                      )}
                                    </i>
                                  </b>{" "}
                                  "{etym.first_element_word_meaning}"
                                {etymology[0].second_element_word_id ? (
                                  <>
                                    <span> and </span>
                                    <a
                                      className="word-link"
                                      href={`${
                                        import.meta.env.VITE_FRONTEND_URL
                                      }/word/${etym.second_element_word_id}`}
                                    >
                                      <b>
                                        <i>
                                          {isProto ? <span>*</span> : <></>}
                                          {etym.second_element_word_type ===
                                          "suffix" ? (
                                            <span>-</span>
                                          ) : (
                                            <></>
                                          )}
                                          {etym.second_element_word}
                                          {etym.second_element_word_type ===
                                          "prefix" ? (
                                            <span>-</span>
                                          ) : (
                                            <></>
                                          )}
                                        </i>
                                      </b>{" "}
                                      "{etym.second_element_word_meaning}".
                                    </a>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {etymology[0].note ? (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: `. ${etymology[0].note}`,
                                    }}
                                  />
                                ) : (
                                  <></>
                                )}
                              </li>
                            ))}
    
                          {etymology
                            .filter((etym) => etym.etymology_type === "loaned")
                            .map((etym, index) => (
                              <li key={index}>
                                Loaned from {loanerLanguageName}{" "}
                                <a
                                  className="word-link"
                                  href={`${
                                    import.meta.env.VITE_FRONTEND_URL
                                  }/word/${etym.loanword_id}`}
                                >
                                  <b>
                                    <i>
                                      {loanerLanguageIsProto ? (
                                        <span>*</span>
                                      ) : (
                                        <></>
                                      )}
                                      {etym.loanword_type === "suffix"  || word_type === "enclitic" ?  (
                                        <span>-</span>
                                      ) : (
                                        <></>
                                      )}
                                      {etym.loanword}
                                      {etym.loantype === "prefix" ? (
                                        <span>-</span>
                                      ) : (
                                        <></>
                                      )}
                                    </i>
                                  </b>{" "}
                                  "{etym.loanword_meaning}"
                                </a>
                                {etymology[0].note ? (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: `. ${etymology[0].note}`,
                                    }}
                                  />
                                ) : (
                                  <></>
                                )}
                              </li>
                            ))}*/}
                        </ol>
                      </>
                    ) : (
                      <></>
                    )}

                    {word.etymology &&
                    word.etymology.length === 1 &&
                    word.etymology[0].etymology_type === "fromMother" ? (
                      <p>
                        <span>
                          {/* {translate("From {languageName}", {
                            languageName: languageName,})} */}
                          <>
                            {" "}
                            {word.etymology_chain?.length > 0 &&
                              word.etymology_chain.map((etym, index) => {
                                const prev = word.etymology_chain[index - 1];

                                let connector = "";
                                if (index === 0) {
                                  connector = "";
                                } else if (
                                  prev?.etymology_type === "derived" &&
                                  etym.etymology_type === "derived"
                                ) {
                                  connector = " + ";
                                } else if (etym.etymology_type === "loaned") {
                                  connector = " loaned from ";
                                } else {
                                  connector = " < ";
                                }

                                return (
                                  <span key={index}>
                                    {connector}
                                    <span className="languageName">
                                      {etym.language_name}{" "}
                                    </span>
                                    <i>
                                      {etym.is_proto && "*"}
                                      {(etym.word_type === "suffix" ||
                                        word.word_type === "enclitic") &&
                                        "-"}
                                      {etym.word}
                                      {(etym.word_type === "prefix" ||
                                        word.word_type === "proclitic") &&
                                        "-"}
                                    </i>
                                    {etym.meaning ? ` "${etym.meaning}"` : ""}
                                  </span>
                                );
                              })}
                          </>
                        </span>

                        {word.cognates && word.cognates.length > 0 && (
                          <span>
                            .{" "}
                            {translate("Cognate with {word}", {
                              word: word,
                            })}
                            <span>
                              . {translate("Cognate with ")}
                              <>
                                {word.cognates.map((cognate, index) => (
                                  <span key={index}>
                                    <span className="languageName">
                                      {cognate.language_name}{" "}
                                    </span>
                                    <i>
                                      {cognate.is_proto && <span>*</span>}
                                      {(cognate.word_type === "suffix" ||
                                        word.word_type === "enclitic") && (
                                        <span>-</span>
                                      )}
                                      {cognate.word}
                                      {(cognate.word_type === "prefix" ||
                                        word.word_type === "proclitic") && (
                                        <span>-</span>
                                      )}
                                    </i>{" "}
                                    "{cognate.meaning.join(", ")}"
                                    {index < word.cognates.length - 1
                                      ? ", "
                                      : ""}
                                  </span>
                                ))}
                              </>
                            </span>
                          </span>
                        )}
                        {word.etymology[0].etymology_note ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `. ${word.etymology[0].etymology_note}`,
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </p>
                    ) : (
                      <></>
                    )}

                    {word.etymology &&
                    word.etymology.length === 1 &&
                    word.etymology[0].etymology_type === "derived" ? (
                      <span>
                        {translate("From {languageName}", {
                          languageName: languageName,
                        })}{" "}
                        <i>
                          {isProto ? <span>*</span> : null}
                          {(word.etymology[0].first_element_word_type ===
                            "suffix" ||
                            word.word_type === "enclitic") && <span>-</span>}
                          <b>{word.etymology[0].first_element}</b>
                          {(word.etymology[0].first_element_word_type ===
                            "prefix" ||
                            word.word_type === "proclitic") && <span>-</span>}
                        </i>
                        <i>
                          {isProto ? <span>*</span> : null}
                          {/* {(word.etymology[0].first_element_word_type ===
                            "suffix" ||
                            word.word_type === "enclitic") && <span>-</span>}
                          <b>{word.etymology[0].first_element}</b>
                          {(word.etymology[0].first_element_word_type ===
                            "prefix" ||
                            word.word_type === "proclitic") && <span>-</span>} */}
                        </i>{" "}
                        "{word.etymology[0].first_element_meaning}"
                        {word.etymology[0].second_element ? (
                          <>
                            <span> and </span>
                            <i>
                              {isProto ? <span>*</span> : null}
                              {(word.etymology[0].second_element_word_type ===
                                "suffix" ||
                                word.etymology[0].second_element_word_type ===
                                  "enclitic") && <span>-</span>}
                              <b>{word.etymology[0].second_element}</b>
                              {(word.etymology[0].second_element_word_type ===
                                "prefix" ||
                                word.etymology[0].second_element_word_type ===
                                  "proclitic") && <span>-</span>}
                            </i>{" "}
                            "{word.etymology[0].second_element_meaning}"
                          </>
                        ) : null}
                        {word.etymology[0].third_element ? (
                          <>
                            <span> and </span>
                            <i>
                              {isProto ? <span>*</span> : null}
                              {(word.etymology[0].third_element_word_type ===
                                "suffix" ||
                                word.etymology[0].third_element_word_type ===
                                  "enclitic") && <span>-</span>}
                              <b>{word.etymology[0].third_element}</b>
                              {(word.etymology[0].third_element_word_type ===
                                "prefix" ||
                                word.etymology[0].third_element_word_type ===
                                  "proclitic") && <span>-</span>}
                            </i>{" "}
                            "{word.etymology[0].third_element_meaning}"
                          </>
                        ) : null}
                        {word.etymology[0].etymology_note ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `. ${word.etymology[0].etymology_note}`,
                            }}
                          />
                        ) : null}
                      </span>
                    ) : (
                      <></>
                    )}
                    {word.etymology &&
                    word.etymology.length === 1 &&
                    word.etymology[0].etymology_type === "loaned" ? (
                      <p>
                        {word.etymology_chain?.length > 0 &&
                          word.etymology_chain.map((etym, index) => (
                            <span key={index}>
                              {index === 0 ? (
                                <span>{translate("Loaned from")} </span>
                              ) : etym.etymology_type === "loaned" ? (
                                <span> {translate("Loaned from")} </span>
                              ) : index > 0 &&
                                word.etymology_chain[index - 1]
                                  .etymology_type === "derived" &&
                                etym.etymology_type === "derived" ? (
                                <span> + </span>
                              ) : (
                                <span> {"<"} </span>
                              )}

                              <span className="languageName">
                                {etym.language_name}{" "}
                              </span>
                              <i>
                                {etym.is_proto && "*"}
                                {etym.word_type === "suffix" ||
                                  (etym.word_type === "enclitic" && "-")}
                                {etym.word}
                                {etym.word_type === "prefix" ||
                                  (etym.word_type === "proclitic" && "-")}
                              </i>
                              {etym.meaning ? ` "${etym.meaning}"` : ""}
                            </span>
                          ))}

                        {word.cognates && word.cognates.length > 0 && (
                          <span>
                            . {translate("Cognate with ")}
                            <>
                              {" "}
                              {word.cognates.map((cognate, index) => (
                                <span key={index}>
                                  <span className="languageName">
                                    {cognate.language_name}{" "}
                                  </span>
                                  <i>
                                    {cognate.is_proto && "*"}
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
                                  {index < word.cognates.length - 1 ? ", " : ""}
                                </span>
                              ))}
                            </>
                          </span>
                        )}

                        {word.etymology[0].etymology_note && (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `. ${word.etymology[0].etymology_note}`,
                            }}
                          />
                        )}
                      </p>
                    ) : null}

                    {word.etymology &&
                    word.etymology.length === 1 &&
                    word.etymology[0].etymology_type === "other" ? (
                      <p>
                        {word.etymology[0].etymology_note ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `${word.etymology[0].etymology_note}`,
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </p>
                    ) : (
                      <></>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <>
          {resolvedAffixes?.length > 0 && (
            <DerivationalAffixBlock resolvedAffixes={resolvedAffixes} />
          )}

          <div className="show-for-printing page-break">
            <h2 className="dictionary-title" style={{ textAlign: "center" }}>
              {translate("English - {languageName}", { languageName })}
            </h2>

            <div className="dictionary-table two-cols show-for-printing`}">
              {allEnglishWords.map((word, index) => (
                <div key={index} className="dictionary-entry">
                  <span className="headword">
                    <b style={{ fontWeight: "bolder" }}>{word.english_word}</b>
                  </span>

                  <span style={{ marginLeft: "3px" }}>
                    <i>{word.part_of_speech}</i>
                  </span>
                  {[
                    "n",
                    "adj",
                    "v",
                    "adv",
                    "conj",
                    "part",
                    "pron",
                    "interj",
                    "affix",
                    "adp",
                  ].map((pos) => {
                    const entriesForPos = word.language_entries?.filter(
                      (entry) => entry.part_of_speech === pos,
                    );

                    return entriesForPos?.length > 0 ? (
                      <span key={pos} style={{ marginLeft: "3px" }}>
                        <i>{pos}</i>{" "}
                        <span className="meaning">
                          {entriesForPos
                            .map((e) => fixPhrases(e.word))
                            .join(", ")}{" "}
                        </span>
                      </span>
                    ) : null;
                  })}

                  {word.phrases.length > 0 ? (
                    word.phrases.map((phrase, index) => (
                      <>
                        <span>
                          ; <b>{phrase.english}</b>
                        </span>
                        <span style={{ marginLeft: "3px" }}>
                          <i>{phrase.part_of_speech}</i>
                        </span>
                        <span style={{ marginLeft: "3px" }}>
                          {fixPhrases(phrase.language_word)}
                        </span>
                      </>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>

        {showPrintedDictionary && (
          <div className="page-break-wrapper">
            <h1 className="page-break">
              {translate("{languageName} Thesaurus", { languageName })}
            </h1>
            {Object.entries(thesaurusJson).map(
              ([classification, categories], index) => (
                <div>
                  <h4>
                    {translate("Class {number}", { number: index + 1 })}: <br />
                    {translate("Words Expressing {classification}", {
                      classification: classification.toUpperCase(),
                    })}
                  </h4>
                  {Object.entries(categories).map(
                    ([category, domains], index) => (
                      <div>
                        <h5 style={{ marginTop: "10px" }}>
                          {translate("Section {number}. {category}", {
                            number: index + 1,
                            category: category.toUpperCase(),
                          })}
                        </h5>

                        {Object.entries(domains).map(
                          ([domain, types], index) => (
                            <div style={{ marginTop: "30px" }}>
                              <p>
                                {index + 1}°. {translate(domain.toUpperCase())}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  textAlign: "left",
                                  gap: "20px",
                                  marginLeft: "10%",
                                }}
                              >
                                {types.map((type, index) => {
                                  const matchingWords =
                                    allWordsForThesaurus?.filter(
                                      (word) =>
                                        word.thesaurus &&
                                        word.thesaurus[type.name],
                                    );

                                  if (
                                    !matchingWords ||
                                    matchingWords.length === 0
                                  ) {
                                    return null; // Don't render this type if no matches
                                  }

                                  return (
                                    <div
                                      key={type.name}
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        maxWidth: "50%",
                                      }}
                                    >
                                      <span>
                                        <span
                                          style={{
                                            fontWeight: "bold",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {type.number}. {translate(type.name)}:
                                        </span>
                                        <span>
                                          {sortByPOS(
                                            matchingWords,
                                            "noun",
                                            type.name,
                                          )}
                                          {sortByPOS(
                                            matchingWords,
                                            "num",
                                            type.name,
                                          )}
                                          {sortByPOS(
                                            matchingWords,
                                            "verb",
                                            type.name,
                                          )}
                                          {sortByPOS(
                                            matchingWords,
                                            "adj",
                                            type.name,
                                          )}
                                          {sortByPOS(
                                            matchingWords,
                                            "adv",
                                            type.name,
                                          )}
                                          {sortByPOS(
                                            matchingWords,
                                            "adp",
                                            type.name,
                                          )}
                                          {sortByPOS(
                                            matchingWords,
                                            "conj",
                                            type.name,
                                          )}
                                          {sortByPOS(
                                            matchingWords,
                                            "part",
                                            type.name,
                                          )}
                                          {sortByPOS(
                                            matchingWords,
                                            "injert",
                                            type.name,
                                          )}
                                          {sortByPOS(
                                            matchingWords,
                                            "pron",
                                            type.name,
                                          )}
                                        </span>
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    ),
                  )}
                </div>
              ),
            )}

            <h1 className="page-break">{translate("Thesaurus Index")}</h1>
            <div style={{ columnCount: "4" }}>
              <ul style={{ listStyle: "none" }}>
                {allWords.map(
                  (word, index) =>
                    word.thesaurus && (
                      <li style={{ textAlign: "left" }} key={index}>
                        <b>{word.word}</b>{" "}
                        {Object.entries(word.thesaurus).map(
                          ([typeKey, typeVal], index, array) => (
                            <span key={typeKey}>
                              <i>{typeVal.name} </i>
                              {typeVal.number}
                              {index < array.length - 1 && ", "}
                            </span>
                          ),
                        )}
                      </li>
                    ),
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
