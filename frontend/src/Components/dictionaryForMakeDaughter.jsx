import React from "react";

const DictionaryEntry = React.memo(function DictionaryEntry({ word, checked, setChecked, transformed, posKeys, translate, selectedParent, selectedParentLanguage, daughterLanguageName, meaningsChanged}) {
  
              const isChecked = checked[word.word_id];
              return (
                <div
                  className={
                    isChecked ? "dictionary-entry" : "unCheckedDaughter"
                  }
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() =>
                        setChecked((prev) => ({
                          ...prev,
                          [word.word_id]: !prev[word.word_id],
                        }))
                      }
                    />
                    <span>{daughterLanguageName}</span>
                    <span style={{ marginLeft: "5px" }}>
                      <b style={{ fontWeight: "bolder" }}>
                        {word.word_type === "suffix" ||
                        word.word_type === "enclitic" ? (
                          <span>-</span>
                        ) : (
                          <></>
                        )}
                        <span className="headword">
                          {transformed ? transformed.spelled : word.word}

                        </span>

                        {word.word_type === "prefix" ||
                        word.word_type === "proclitic" ? (
                          <span>-</span>
                        ) : (
                          <></>
                        )}
                      </b>
                    </span>

                    <span style={{ marginLeft: "5px" }}>
                      /{transformed ? transformed.ipa : word.ipa}/
                    </span>

                    {word.new_meaning &&
                      Object.keys(posKeys).map((key) => {
                        const value = posKeys[key];
                        return (
                          word.new_meaning[key] && (
                            <React.Fragment key={key}>
                              <span style={{ marginLeft: "5px" }}>
                                <i>{translate("{value}", { value })};</i>{" "}
                              </span>
                              <span className="meaning">
                                "{word.new_meaning[key].join(", ")}"
                              </span>
                            </React.Fragment>
                          )
                        );
                      })}

                    <span>&lt; {selectedParentLanguage.language_name}</span>

                    <span style={{ marginLeft: "5px" }}>
                      <b style={{ fontWeight: "bolder" }}>
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

                    <span style={{ marginLeft: "5px" }}>/{word.ipa}/</span>

                    {word.noun_meaning ? (
                      Array.isArray(word.noun_word_categories) &&
                      word.noun_word_categories.length > 0 ? (
                        <>
                          <span>
                            {" "}
                            <i>
                              {translate("n")}
                              {word.noun_word_categories.map(
                                (category, index) => (
                                  <span key={index}>
                                    {category.category_type !== "none" ? (
                                      <i>.{category.abbreviation}</i>
                                    ) : (
                                      <></>
                                    )}
                                  </span>
                                )
                              )}
                              ;
                            </i>{" "}
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
                              {word.adj_word_categories.map(
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
                          </span>
                          <span>"{word.adj_meaning.join(", ")}"</span>
                        </>
                      ) : (
                        <>
                          <span>
                            {" "}
                            <i>{translate("adj")};</i>{" "}
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
                              {word.verb_word_categories.map(
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
                          </span>
                          <span className="meaning">
                            "{word.verb_meaning.join(", ")}"
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
                              {word.adv_word_categories.map(
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
                              )}{" "}
                              ;
                            </i>{" "}
                          </span>
                          <span>"{word.adv_meaning.join(", ")}"</span>
                        </>
                      ) : (
                        <>
                          <span>
                            {" "}
                            <i>{translate("adv")};</i>{" "}
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
                              {word.adp_word_categories.map(
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
                          </span>
                          <span>"{word.adp_meaning.join(", ")}"</span>
                        </>
                      ) : (
                        <>
                          <span>
                            {" "}
                            <i>{translate("adp")};</i>{" "}
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
                              {word.affix_word_categories.map(
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
                              )}{" "}
                              ;
                            </i>{" "}
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
                              {word.pron_word_categories.map(
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
                              {word.part_word_categories.map(
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
                              {word.conj_word_categories.map(
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
                          </span>
                          <span className="meaning">
                            "{word.clitic_meaning.join(", ")}"
                          </span>
                        </>
                      )
                    ) : (
                      <></>
                    )}

                    {meaningsChanged(word, word.new_meaning, posKeys) && (
                      <span style={{ marginLeft: "20px", fontStyle: "italic" }}>
                        {translate("Semantic shift occurred")}
                      </span>
                    )}
                  </div>
                </div>
              );
            })


export default DictionaryEntry;
