import { useState } from "react";
import { useTranslate } from "../Functions/TranslateUI";
import meaningKeys from "../assets/meaningKeys";

function PaginatedGeneratedLanguage({ words }) {
  const { translate } = useTranslate();
  const [page, setPage] = useState(1);

  const pageSize = 100;

  const totalPages = Math.ceil(words.length / pageSize);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = pageSize ? words.slice(start, end) : words;

  pageItems.forEach((item) => {
    if (item.verb_meaning) {
      item.verb_meaning = item.verb_meaning.map((meaning) => {
        meaning = meaning.trim();

        // Prevent "to to ..." duplication
        if (meaning.startsWith("to ")) return meaning;

        return `to ${meaning}`;
      });
    }
  });

  return (
    <>
      {pageItems.map((word, index) => (
        <div key={index} className="dictionary-entry">
          <div>
            <span>
              <b style={{ fontWeight: "bolder" }}>
                {word.word_type === "suffix" ||
                word.word_type === "enclitic" ? (
                  <span>-</span>
                ) : (
                  <></>
                )}
                <span className="headword">{word.translation}</span>

                {word.word_type === "prefix" ||
                word.word_type === "proclitic" ? (
                  <span>-</span>
                ) : (
                  <></>
                )}
              </b>
            </span>

            <span
              style={{ marginLeft: "5px", marginRight: "10px" }}
              className="headword"
            >
              /{word.ipa}/
            </span>

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

                    {typeof word[partOfSpeech.meaning] === "string" ? (
                      <span style={{ marginLeft: "5px" }} className="meaning">
                        "{word[partOfSpeech.meaning]}"
                      </span>
                    ) : (
                      <span style={{ marginLeft: "5px" }} className="meaning">
                        "{word[partOfSpeech.meaning].join(", ")}"
                      </span>
                    )}

                    {Array.isArray(word[partOfSpeech.forms]) &&
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
                      )}
                  </>
                )
            )}

            {word.hasOwnProperty("isAffixedDerived") && (
              <span style={{ marginLeft: "5px"}}>
                ← <span style={{fontStyle:"italic"}}>-{word.etymology.second_element_word}</span>
                <span style={{marginLeft:"5px"}}>"{word.etymology.second_element_meaning}"</span>
              </span>
            )}

            {word.hasOwnProperty("isCompound") && (
              <span style={{ marginLeft: "5px"}}>
                ← <span style={{fontStyle:"italic"}}>{word.etymology.second_element_word}</span>
                <span style={{marginLeft:"5px"}}>"{word.etymology.second_word_meaning}"</span>
              </span>
            )}

             

            {word.hasOwnProperty("isAffixedDerived") && (
              <span style={{ marginLeft: "5px", fontStyle: "italic" }}>
                - {translate("derived with an affix")}
              </span>
            )}

            {word.hasOwnProperty("isCompound") && (
              <span style={{ marginLeft: "5px", fontStyle: "italic" }}>
                - {translate("is a compound")}
              </span>
            )}
          </div>
        </div>
      ))}
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
    </>
  );
}

export default PaginatedGeneratedLanguage;
