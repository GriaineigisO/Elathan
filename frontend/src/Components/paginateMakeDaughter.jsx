import { useState } from "react";
import React from "react";
import { useTranslate } from "../Functions/TranslateUI";
import meaningKeys from "../assets/meaningKeys";

function PaginateMakeDaughter({
  words,
  checked,
  setChecked,
  transformedWords,
  posKeys,
  selectedParentLanguage,
  daughterLanguageName,
  meaningsChanged,
  loading
}) {
  const { translate } = useTranslate();
  const [page, setPage] = useState(1);

  const pageSize = 100;

  const totalPages = Math.ceil(words.length / pageSize);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = pageSize ? words.slice(start, end) : words;

  return (
    <div>
      {!loading &&
        pageItems.map((word, index) => {
          const isChecked = checked[word.word_id];
          return (
            <div
              key={index}
              className={isChecked ? "dictionary-entry" : "unCheckedDaughter"}
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
                    {word.daughter_word_type === "suffix" ||
                    word.daughter_word_type === "enclitic" ? (
                      <span>-</span>
                    ) : (
                      <></>
                    )}
                    <span className="headword">
                      {transformedWords[word.word_id]
                        ? transformedWords[word.word_id].spelled
                        : word.word}
                    </span>

                    {word.daughter_word_type === "prefix" ||
                    word.daughter_word_type === "proclitic" ? (
                      <span>-</span>
                    ) : (
                      <></>
                    )}
                  </b>
                </span>

                <span style={{ marginLeft: "5px" }}>
                  /{transformedWords[word.word_id]?.ipa || word.ipa}/
                </span>

                {meaningKeys.map((pos) => {
                  const hasMeaning =
                    word.new_meaning?.[pos.meaning] != null &&
                    Array.isArray(word.new_meaning[pos.meaning]) &&
                    word.new_meaning[pos.meaning].length > 0;

                  if (!hasMeaning) return null; // skip entirely

                  const categories = word[pos.categories];
                  const hasCategories =
                    Array.isArray(categories) && categories.length > 0;

                  return hasCategories ? (
                    <span key={pos.meaning}>
                      {translate(pos.abbr)}
                      {categories.map((category, i) => (
                        <span key={i}>
                          .
                          {category.category_type !== "none" && (
                            <>
                              <i style={{ marginLeft: "5px" }}>
                                {category.abbreviation}
                              </i>
                              <span
                                style={{ marginLeft: "5px" }}
                                className="meaning"
                              >
                                "{word.new_meaning[pos.meaning].join(", ")}"
                              </span>
                            </>
                          )}
                        </span>
                      ))}
                      ;{" "}
                    </span>
                  ) : (
                    <>
                      <span key={pos.meaning}>
                        <i style={{ marginLeft: "5px" }}>
                          {translate(pos.abbr)};
                        </i>
                        <span style={{ marginLeft: "5px" }} className="meaning">
                          "{word.new_meaning[pos.meaning].join(", ")}"
                        </span>
                      </span>
                    </>
                  );
                })}

                {/* {meaningKeys.map((partOfSpeech) => {
                  const wordForms =
                    transformedWords[word.word_id]?.[partOfSpeech.forms];

                  //Determine fallback wordForms if transformedWords are not available
                  const fallbackForms =
                    Array.isArray(word[partOfSpeech.forms]) &&
                    word[partOfSpeech.forms].length > 0
                      ? word[partOfSpeech.forms]
                      : null;

                  const formsToRender = wordForms || fallbackForms;

                  return formsToRender
                    ? formsToRender.map((form, index) => {
                        const formName = form.name;
                        const formWord =
                          form.word ||
                          word[key.form]?.[index]?.word ||
                          wordForm.word;
                        const formIPA =
                          form.ipa ||
                          word[key.form]?.[index]?.ipa ||
                          wordForm.ipa;

                        const isSuffixOrEnclitic =
                          word.word_type === "suffix" ||
                          word.word_type === "enclitic";
                        const isPrefixOrProclitic =
                          word.word_type === "prefix" ||
                          word.word_type === "proclitic";

                        return (
                          <span key={index} style={{ marginLeft: "10px" }}>
                            <span>{formName}: </span>
                            {isPrefixOrProclitic && <span>-</span>}
                            <i>{formWord}</i>
                            {isSuffixOrEnclitic && <span>-</span>}{" "}
                            {formIPA && <span>/{formIPA}/</span>};{" "}
                          </span>
                        );
                      })
                    : null;
                })} */}

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

                {meaningKeys.map(
                  (partOfSpeech) =>
                    word[partOfSpeech.meaning] && (
                      <>
                        {Array.isArray(word[partOfSpeech.categories]) &&
                        word[partOfSpeech.categories].length > 0 ? (
                          <span>
                            <i>
                              {translate(partOfSpeech.abbr)}
                              {word[partOfSpeech.categories].map(
                                (category, index) => (
                                  <span key={index}>
                                    .
                                    {category.category_type !== "none" && (
                                      <i>{category.abbreviation}</i>
                                    )}
                                  </span>
                                )
                              )}
                              ;
                            </i>{" "}
                          </span>
                        ) : (
                          <span>
                            <i>{translate(partOfSpeech.abbr)};</i>
                          </span>
                        )}

                        <span style={{ marginLeft: "5px" }} className="meaning">
                          "{word[partOfSpeech.meaning].join(", ")}"
                        </span>

                        {/* {Array.isArray(word[partOfSpeech.forms]) &&
                          word[partOfSpeech.forms].length > 0 && (
                            <>
                              {word[partOfSpeech.forms].map(
                                (wordForm, index) =>
                                  wordForm.word && (
                                    <span style={{ marginLeft: "10px" }}>
                                      <span>{wordForm.name}: </span>
                                      {(word.word_type === "suffix" ||
                                        word.word_type === "enclitic") && (
                                        <span>-</span>
                                      )}
                                      {(word.word_type === "prefix" ||
                                        word.word_type === "proclitic") && (
                                        <span>-</span>
                                      )}
                                      <i>{wordForm.word}</i>{" "}
                                      <span>/{wordForm.ipa}/</span>;{" "}
                                    </span>
                                  )
                              )}
                            </>
                          )} */}
                      </>
                    )
                )}

                {!word.grammaticalised_word &&
                  meaningsChanged(word, word.new_meaning, posKeys) && (
                    <span style={{ marginLeft: "20px", fontStyle: "italic" }}>
                      {translate("Semantic shift occurred")}
                    </span>
                  )}
                {word.grammaticalised_word && (
                  <span style={{ marginLeft: "20px", fontStyle: "italic" }}>
                    {translate("Grammaticalisation occurred")}
                  </span>
                )}
              </div>

              <div style={{ backgroundColor: "#ab6b67", borderRadius:"10px" }}>
                {meaningKeys.map((partOfSpeech) => {
                  const daughterForms =
                    transformedWords[word.word_id]?.[partOfSpeech.forms];

                  const fallbackForms =
                    Array.isArray(word[partOfSpeech.forms]) &&
                    word[partOfSpeech.forms].length > 0
                      ? word[partOfSpeech.forms]
                      : null;

                  const formsToRender = daughterForms || fallbackForms;

                  // parent-language original forms (same array used in your old block)
                  const parentForms =
                    Array.isArray(word[partOfSpeech.forms]) &&
                    word[partOfSpeech.forms].length > 0
                      ? word[partOfSpeech.forms]
                      : [];

                  return formsToRender
                    ? formsToRender.map((form, index) => {
                        const daughterWord = form.word;
                        const daughterIPA = form.ipa;

                        const parentForm = parentForms[index]; // <-- MATCH BY INDEX
                        const parentWord = parentForm?.word;
                        const parentIPA = parentForm?.ipa;

                        const isSuffixOrEnclitic =
                          word.word_type === "suffix" ||
                          word.word_type === "enclitic";
                        const isPrefixOrProclitic =
                          word.word_type === "prefix" ||
                          word.word_type === "proclitic";

                        return (
                          <p key={index} style={{marginLeft:"40px"}}>
                            {/* Daughter language */}
                            <span>{form.name}: </span>
                            {isPrefixOrProclitic && <span>-</span>}
                            <i>{daughterWord}</i>
                            {isSuffixOrEnclitic && <span>-</span>}
                            {daughterIPA && <span> /{daughterIPA}/ </span>}

                            {/* Separator */}
                            <span>&lt; </span>

                            {/* Parent language */}
                            {parentWord && (
                              <>
                                {isPrefixOrProclitic && <span>-</span>}
                                <i>{parentWord}</i>
                                {isSuffixOrEnclitic && <span>-</span>}
                                {parentIPA && <span> /{parentIPA}/</span>}
                              </>
                            )}
                          </p>
                        );
                      })
                    : null;
                })}
              </div>
            </div>
          );
        })}
      <div
        style={{
          marginTop: "0.75rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
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
    </div>
  );
}

export default PaginateMakeDaughter;
