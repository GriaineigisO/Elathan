import { useState } from "react";
import { useTranslate } from "../Functions/TranslateUI";
import FindWordsDescendants from "./findWOrdsDescendants.jsx";
import React from "react";

function PaginatedDictionary({
  visibleWords,
  pageSize,
  isProto,
  showPrintedDictionary,
  openWord,
  allWords
}) {
  const { translate } = useTranslate();
  const [page, setPage] = useState(1);


  const totalPages = Math.ceil(visibleWords.length / Number(pageSize));

  const start = (page - 1) * Number(pageSize);
  const end = start + Number(pageSize);
  const pageItems = Number(pageSize) ? visibleWords.slice(start, end) : visibleWords;

  return (
    <>
      {pageItems.map((word, index) => (
            <div
              key={index}
              onClick={() => openWord(word.word_id)}
              className="dictionary-entry"
            >
     
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
                {showPrintedDictionary && !word.variant_of && word.ipa ? (
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
                        {showPrintedDictionary &&
                        word.noun_word_forms &&
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
                            )
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
                        {showPrintedDictionary && word.noun_word_forms ? (
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
                              )
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
                        {showPrintedDictionary && word.adj_word_forms ? (
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
                              )
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
                        {showPrintedDictionary && word.adj_word_forms ? (
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
                              )
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
                        {showPrintedDictionary && word.verb_word_forms ? (
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
                              )
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
                        {showPrintedDictionary && word.verb_word_forms ? (
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
                              )
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
                        {showPrintedDictionary &&
                        word.num_word_forms &&
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
                            )
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
                        {showPrintedDictionary && word.num_word_forms ? (
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
                              )
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
                        {showPrintedDictionary && word.adv_word_forms ? (
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
                        {showPrintedDictionary && word.adv_word_forms ? (
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
                              )
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
                              )
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
                              )
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
                              )
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
                              )
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
                              )
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
                              )
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
                              )
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
                            )
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
                              )
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
                              )
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
                              )
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
                              )
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
                            )
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
                              )
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
                  {showPrintedDictionary &&
                  word.descendants &&
                  word.descendants.length > 0 ? (
                    <span>
                      {" "}
                      {translate("Ancestor of {words}", {
                        words: (
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
                                  word.word_type === "enclitic") && (
                                  <span>-</span>
                                )}
                                <i>{descendant.word}</i>
                                {(descendant.word_type === "prefix" ||
                                  word.word_type === "proclitic") && (
                                  <span>-</span>
                                )}{" "}
                                "<span>{descendant.meaning}</span>"
                                {index < word.descendants.length - 1
                                  ? ", "
                                  : ""}
                              </React.Fragment>
                            ))}
                          </>
                        ),
                      })}
                      )
                    </span>
                  ) : (
                    <></>
                  )}
                </span>

                {showPrintedDictionary && word.word_note ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: `${word.word_note}`,
                    }}
                  ></p>
                ) : (
                  <></>
                )}

                {showPrintedDictionary && (
                  <ExtractExampleSentencesFromCorpus
                    languageId={id}
                    entryWord={word.word}
                    wordId={word.word_id}
                  />
                )}

                {/* Noun */}
                {showPrintedDictionary &&
                  word.noun_sentence_examples?.length > 0 && (
                    <div>
                      {word.noun_sentence_examples.map((sentence, index) => (
                        <p key={`noun-${index}`}>
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
                      ))}
                    </div>
                  )}

                {/* Verb */}
                {showPrintedDictionary &&
                  word.verb_sentence_examples?.length > 0 && (
                    <div>
                      {word.verb_sentence_examples.map((sentence, index) => (
                        <p key={`verb-${index}`}>
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
                      ))}
                    </div>
                  )}

                {/* Adjective */}
                {showPrintedDictionary &&
                  word.adj_sentence_examples?.length > 0 && (
                    <div>
                      {word.adj_sentence_examples.map((sentence, index) => (
                        <p key={`adj-${index}`}>
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
                      ))}
                    </div>
                  )}

                {/* Adverb */}
                {showPrintedDictionary &&
                  word.adv_sentence_examples?.length > 0 && (
                    <div>
                      {word.adv_sentence_examples.map((sentence, index) => (
                        <p key={`adv-${index}`}>
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
                      ))}
                    </div>
                  )}

                {/* Adposition */}
                {showPrintedDictionary &&
                  word.adp_sentence_examples?.length > 0 && (
                    <div>
                      {word.adp_sentence_examples.map((sentence, index) => (
                        <p key={`adp-${index}`}>
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
                      ))}
                    </div>
                  )}

                {/* Conjunction */}
                {showPrintedDictionary &&
                  word.conj_sentence_examples?.length > 0 && (
                    <div>
                      {word.conj_sentence_examples.map((sentence, index) => (
                        <p key={`conj-${index}`}>
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
                      ))}
                    </div>
                  )}

                {/* Particle */}
                {showPrintedDictionary &&
                  word.part_sentence_examples?.length > 0 && (
                    <div>
                      {word.part_sentence_examples.map((sentence, index) => (
                        <p key={`part-${index}`}>
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
                      ))}
                    </div>
                  )}

                {/* Interjection */}
                {showPrintedDictionary &&
                  word.interj_sentence_examples?.length > 0 && (
                    <div>
                      {word.interj_sentence_examples.map((sentence, index) => (
                        <p key={`interj-${index}`}>
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
                      ))}
                    </div>
                  )}

                {/* Pronoun */}
                {showPrintedDictionary &&
                  word.pron_sentence_examples?.length > 0 && (
                    <div>
                      {word.pron_sentence_examples.map((sentence, index) => (
                        <p key={`pron-${index}`}>
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
                      ))}
                    </div>
                  )}

                <div className="etymology-border">
                  <span className="etymology-print">
                    {showPrintedDictionary && word.etymology.length > 1 ? (
                      <>
                        <span>
                          {translate(
                            "The various possible etymologies for {languageName} are",
                            {
                              languageName: (
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
                              ),
                            }
                          )}{" "}
                        </span>
                        <ol>
                          {word.etymology
                            .filter(
                              (etym) => etym.etymology_type === "fromMother"
                            )
                            .map((etym, index) => (
                              <li key={index}>
                                {translate("From {languageName}", {
                                  languageName: (
                                    <span className="languageName">
                                      {etym.mother_language_name}{" "}
                                    </span>
                                  ),
                                })}
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

                    {showPrintedDictionary &&
                    word.etymology &&
                    word.etymology.length === 1 &&
                    word.etymology[0].etymology_type === "fromMother" ? (
                      <p>
                        <span>
                          {translate("From {languageName}", {
                            languageName: (
                              <>
                                {word.etymology_chain?.length > 0 &&
                                  word.etymology_chain.map((etym, index) => {
                                    const prev =
                                      word.etymology_chain[index - 1];

                                    let connector = "";
                                    if (index === 0) {
                                      connector = "";
                                    } else if (
                                      prev?.etymology_type === "derived" &&
                                      etym.etymology_type === "derived"
                                    ) {
                                      connector = " + ";
                                    } else if (
                                      etym.etymology_type === "loaned"
                                    ) {
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
                                        {etym.meaning
                                          ? ` "${etym.meaning}"`
                                          : ""}
                                      </span>
                                    );
                                  })}
                              </>
                            ),
                          })}
                        </span>

                        {word.cognates && word.cognates.length > 0 && (
                          <span>
                            .{" "}
                            {translate("Cognate with {word}", {
                              word: (
                                <span>
                                  .{" "}
                                  {translate("Cognate with {word}", {
                                    word: (
                                      <>
                                        {word.cognates.map((cognate, index) => (
                                          <span key={index}>
                                            <span className="languageName">
                                              {cognate.language_name}{" "}
                                            </span>
                                            <i>
                                              {cognate.is_proto && (
                                                <span>*</span>
                                              )}
                                              {(cognate.word_type ===
                                                "suffix" ||
                                                word.word_type ===
                                                  "enclitic") && <span>-</span>}
                                              {cognate.word}
                                              {(cognate.word_type ===
                                                "prefix" ||
                                                word.word_type ===
                                                  "proclitic") && (
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
                                    ),
                                  })}
                                </span>
                              ),
                            })}
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
                    {showPrintedDictionary &&
                    word.etymology &&
                    word.etymology.length === 1 &&
                    word.etymology[0].etymology_type === "derived" ? (
                      <span>
                        {translate("From {languageName}", {
                          languageName: (
                            <i>
                              {isProto ? <span>*</span> : null}
                              {(word.etymology[0].first_element_word_type ===
                                "suffix" ||
                                word.word_type === "enclitic") && (
                                <span>-</span>
                              )}
                              <b>{word.etymology[0].first_element}</b>
                              {(word.etymology[0].first_element_word_type ===
                                "prefix" ||
                                word.word_type === "proclitic") && (
                                <span>-</span>
                              )}
                            </i>
                          ),
                        })}
                        <i>
                          {isProto ? <span>*</span> : null}
                          {(word.etymology[0].first_element_word_type ===
                            "suffix" ||
                            word.word_type === "enclitic") && <span>-</span>}
                          <b>{word.etymology[0].first_element}</b>
                          {(word.etymology[0].first_element_word_type ===
                            "prefix" ||
                            word.word_type === "proclitic") && <span>-</span>}
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
                    {showPrintedDictionary &&
                    word.etymology &&
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
                            .{" "}
                            {translate("Cognate with {word}", {
                              word: (
                                <>
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
                                          cognate.word_type ===
                                            "proclitic") && <span>-</span>}
                                      </i>{" "}
                                      "{cognate.meaning.join(", ")}"
                                      {index < word.cognates.length - 1
                                        ? ", "
                                        : ""}
                                    </span>
                                  ))}
                                </>
                              ),
                            })}
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

                    {showPrintedDictionary &&
                    word.etymology &&
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

     

        {/* Pagination controls */}
      <div style={{ marginTop: "0.75rem", display:"flex", justifyContent:"center" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 1rem" }}>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
        
    </>
  );
}

export default PaginatedDictionary;
