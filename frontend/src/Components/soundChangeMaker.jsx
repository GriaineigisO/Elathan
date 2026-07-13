import CategoryManager from "./syllableCategories";
import { useTranslate } from "../Functions/TranslateUI";
import { useState } from "react";
import Collapsible from "./collapsable.jsx";
import meaningKeys from "../assets/meaningKeys.jsx";
import applySoundChange from "../Functions/soundChange";

const SoundChangeMaker = ({
  handleCategoryValuesChange,
  words,
  soundChangeOrPhonotactic,
  spellings,
  selectedSoundChanges,
  setSelectedSoundChanges,
  allCategoryValues,
  prosodyType, setProsodyType,
  page
}) => {
  const { translate } = useTranslate();
  const [originalSound, setOriginalSound] = useState();
  const [resultingSound, setResultingSound] = useState();
  const [environmentSound1, setEnvironmentSound1] = useState();
  const [environmentSound2, setEnvironmentSound2] = useState();
  const [environmentOptions, setEnvironmentOptions] = useState("unconditional");
  const [applyingSoundChanges, setApplyingSoundChanges] = useState(false);
  const [appliedSoundChanges, setAppliedSoundChanges] = useState(false);
  const [primaryStressPlacement, setPrimaryStressPlacement] = useState("first");
  const [whenNoHeavySyllable, setWhenNoHeavySyllable] = useState("first");

  const handleFirstEnvironmentSound = (value) => {
    setEnvironmentSound1(value);
  };

  const handleSecondEnvironmentSound = (value) => {
    setEnvironmentSound2(value);
  };

  const handleOriginalSound = (value) => {
    setOriginalSound(value);
  };

  const handleResultingSound = (value) => {
    setResultingSound(value);
  };

  const moveChangeUp = (index) => {
    if (index === 0) return; // already at top

    setSelectedSoundChanges((prev) => {
      const updated = [...prev];
      const temp = updated[index - 1];
      updated[index - 1] = updated[index];
      updated[index] = temp;
      return updated;
    });
    setAppliedSoundChanges(false);
  };

  const applyNewSoundChanges = () => {
    setShowLanguageSavedMessage(false);
    setApplyingSoundChanges(true);
    setAppliedSoundChanges(false);

    setTimeout(() => {
      const changes = selectedSoundChanges; // now guaranteed updated
      const newTransformed = {};

      words.forEach((word) => {
        let changed = "";

        if (word.grammaticalised_word) {
          changed = applySoundChange(
            word.grammaticalised_word,
            changes,
            allCategoryValues
          );
        } else {
          changed = applySoundChange(word.ipa, changes, allCategoryValues);
        }

        newTransformed[word.word_id] = {
          ipa: changed,
          spelled: spell(changed, spellings),
        };

        //now apply sound changes to word forms
        let changedWordForms = [];
        meaningKeys.forEach((key) => {
          if (word[key.forms]) {
            const wordForms = word[key.forms];
            const formArr = [];
            wordForms.forEach((form) => {
              const changedForm = applySoundChange(
                form.ipa,
                changes,
                allCategoryValues
              );
              const obj = {
                ipa: changedForm,
                name: form.name,
                type: form.type,
                word: spell(changedForm, spellings),
              };
              formArr.push(obj);
            });
            newTransformed[word.word_id][key.forms] = formArr;
          }
        });
      });

      setTransformedWords(newTransformed);
      setApplyingSoundChanges(false);
      setAppliedSoundChanges(true);
    }, 0);
  };

  const moveChangeDown = (index) => {
    setSelectedSoundChanges((prev) => {
      if (index === prev.length - 1) return prev; // already at bottom

      const updated = [...prev];
      const temp = updated[index + 1];
      updated[index + 1] = updated[index];
      updated[index] = temp;
      return updated;
    });
    setAppliedSoundChanges(false);
  };

  const removeSoundChange = (indexToRemove) => {
    setSelectedSoundChanges((prevForms) =>
      prevForms.filter((_, i) => i !== indexToRemove)
    );
    setAppliedSoundChanges(false);
  };

  const applySoundChanges = async () => {
    setLoading(true);
    await getAllWords();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const toggleStressShiftWithAffix = (set) => {
    if (stressShiftWithAffix) {
      set(false);
    } else {
      set(true);
    }
  };

  const submitSoundChange = (
    prosodyType,
    primaryStressPlacement,
    whenNoHeavySyllable,
    soundOrProsody
  ) => {
    //store spellings in cache
    if (soundChangeOrPhonotactic === "sound-change") {
      localStorage.setItem("spellingsCache", JSON.stringify(spellings));
    }
    

    setAppliedSoundChanges(false);
    if (soundOrProsody === "sound") {
      //change is a sound change
      const newObj = {
        originalSound,
        resultingSound: resultingSound ? resultingSound : "",
        environment: {
          type: environmentOptions,
          firstEnvironmentSound: environmentSound1 || null,
          secondEnvironmentSound: environmentSound2 || null,
        },
        
      };
console.log(newObj)
      // Create the updated list of sound changes
      const updatedChanges = [...selectedSoundChanges, newObj];

      //Apply updatedChanges, NOT selectedSoundChanges
      const newTransformed = {};

      //Save both the new sound change and the transformed forms
      setSelectedSoundChanges(updatedChanges);
      
      if (soundChangeOrPhonotactic === "sound-change") {
      localStorage.setItem("soundChangesCache", JSON.stringify(updatedChanges));
    } else {
      localStorage.setItem("phonotacticsCache", JSON.stringify(updatedChanges));
    }
    } else {
      //change is a prosody change
      const newObj = {
        prosodyType: prosodyType,
        primaryStressPlacement: primaryStressPlacement,
        whenNoHeavySyllable: whenNoHeavySyllable,
      };
      // Create the updated list of sound changes
      const updatedChanges = [...selectedSoundChanges, newObj];

      //Apply updatedChanges, NOT selectedSoundChanges
      const newTransformed = {};

      //Save both the new sound change and the transformed forms
      setSelectedSoundChanges(updatedChanges);
      //save in cache to prevent losing long list of changes due to accidental reloading or closing of tab
      localStorage.setItem("soundChangesCache", JSON.stringify(updatedChanges));
    }
  };

  return (
    <div className="thin-white-border"  >
      <div>
        {soundChangeOrPhonotactic === "sound-change" && (
          <Collapsible title={translate("Prosody")}>
            <div style={{ width: "100%" }}>
              <select onChange={(e) => setProsodyType(e.target.value)}>
                <option value="stress">{translate("Stress-timed")}</option>
                <option value="syllable">{translate("Syllable-timed")}</option>
                <option value="pitch">{translate("Pitch Accent")}</option>
                <option value="tone">{translate("Tonal")}</option>
              </select>

              {prosodyType === "syllable" && (
                <p>
                  {translate(
                    "Syllable-timed: Each syllable in a word will have equal weight."
                  )}
                </p>
              )}

              {prosodyType === "stress" && (
                <div>
                  <br />
                  <span>{translate("Stress will fall on the:")}</span>
                  <select
                    value={primaryStressPlacement}
                    onChange={(e) => setPrimaryStressPlacement(e.target.value)}
                  >
                    <option value="first">{translate("First syllable")}</option>
                    <option value="second">
                      {translate("Second syllable")}
                    </option>
                    <option value="secondLast">
                      {translate("Second last syllable")}
                    </option>
                    <option value="last">{translate("Last syllable")}</option>
                    <option value="firstHeavy">
                      {translate("First heavy syllable")}
                    </option>
                    <option value="lastHeavy">
                      {translate("Last heavy syllable")}
                    </option>
                  </select>
                  <br />

                  {(primaryStressPlacement === "firstHeavy" ||
                    primaryStressPlacement === "lastHeavy") && (
                    <div>
                      <span>
                        {translate(
                          "When a word has no heavy syllables, the stressed syllable shall be:"
                        )}
                      </span>
                      <select
                        value={whenNoHeavySyllable}
                        onChange={(e) => setWhenNoHeavySyllable(e.target.value)}
                      >
                        <option value="first">
                          {translate("First syllable")}
                        </option>
                        <option value="second">
                          {translate("Second syllable")}
                        </option>
                        <option value="secondLast">
                          {translate("Second last syllable")}
                        </option>
                        <option value="last">
                          {translate("Last syllable")}
                        </option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() =>
                  submitSoundChange(
                    prosodyType,
                    primaryStressPlacement,
                    whenNoHeavySyllable,
                    "prosody"
                  )
                }
              >
                {translate("Submit Prosody Change")}
              </button>
            </div>
          </Collapsible>
        )}
        <CategoryManager
          translate={translate}
          onCategoryValuesChange={handleCategoryValuesChange}
        />

        <div id="sound-change-generator">
          <div className="sound-change-generator-option">
            <input
              type="text"
              id="start-sound"
              placeholder={translate("Original Sound")}
              onChange={(e) => handleOriginalSound(e.target.value)}
            />
          </div>

          <div className="sound-change-generator-option">
            <input
              type="text"
              id="end-sound"
              placeholder={translate("Resulting Sound")}
              onChange={(e) => handleResultingSound(e.target.value)}
            />
          </div>

          <div className="sound-change-generator-option">
            <label
              htmlFor="environment"
              className="sound-change-generator-label"
            >
              <strong>Environment</strong>
            </label>
            <div id="environment-form-and-text-field">
              <select
                id="environment"
                onChange={(e) => setEnvironmentOptions(e.target.value)}
              >
                <option value="unconditional">unconditionally</option>
                <option value="between">between</option>
                <option value="before">before</option>
                <option value="after">after</option>
                <option value="word-initially">word initially</option>
                <option value="word-initially-before">
                  word initially before
                </option>
                <option value="word-finally">word finally</option>
                <option value="word-finally-after">word finally after</option>
                <option value="stressed">{translate("stressed")}</option>
                <option value="secondary-stressed">
                  {translate("secondary stressed")}
                </option>
                <option value="unstressed">{translate("unstressed")}</option>
              </select>

              {environmentOptions === "between" && (
                <div className="between-environment">
                  <input
                    onChange={(e) =>
                      handleFirstEnvironmentSound(e.target.value)
                    }
                  />
                  <span className="between">and</span>{" "}
                  <input
                    onChange={(e) =>
                      handleSecondEnvironmentSound(e.target.value)
                    }
                  />
                </div>
              )}

              {environmentOptions !== "unconditional" &&
                environmentOptions !== "between" &&
                environmentOptions !== "word-initially" &&
                environmentOptions !== "word-finally" &&
                environmentOptions !== "stressed" &&
                environmentOptions !== "unstressed" && (
                  <div>
                    <input
                      onChange={(e) =>
                        handleFirstEnvironmentSound(e.target.value)
                      }
                    />
                  </div>
                )}
            </div>
          </div>
        </div>

        <button onClick={() => submitSoundChange(null, null, null, "sound")}>
          {translate("Submit Sound Change")}
        </button>

        
      </div>

      <div
        className="fullWidth"
        style={{
          marginTop: "20px",
          maxHeight: "300px",
          overflow: "scroll",
        }}
      >
        <ol className="fullWidth" style={{ width: "100%" }}>
          {selectedSoundChanges.length > 0 &&
            selectedSoundChanges.map((change, index) => {
              if (change.environment) {
                if (change.environment.type === "between") {
                  return (
                    <div
                      key={index}
                      className="fullWidth"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <button
                        className="btn-close btn-close-white small-x-button soundChangeButton"
                        aria-label="Close"
                        onClick={() => removeSoundChange(index)}
                      ></button>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeUp(index)}
                      >
                        ▲
                      </span>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeDown(index)}
                      >
                        ▼
                      </span>
                      <li className="fullWidth word-form-list">
                        {translate(
                          "/{originalSound}/ becomes /{resultingSound}/ between /{firstEnvironmentSound}/ and /{secondEnvironmentSound}/",
                          {
                            originalSound: change.originalSound,
                            resultingSound: change.resultingSound,
                            firstEnvironmentSound:
                              change.environment.firstEnvironmentSound,
                            secondEnvironmentSound:
                              change.environment.secondEnvironmentSound,
                          }
                        )}
                      </li>
                    </div>
                  );
                } else if (change.environment.type === "unconditional") {
                  return (
                    <div
                      key={index}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      {" "}
                      <button
                        className="btn-close btn-close-white small-x-button soundChangeButton"
                        aria-label="Close"
                        onClick={() => removeSoundChange(index)}
                      ></button>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeUp(index)}
                      >
                        ▲
                      </span>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeDown(index)}
                      >
                        ▼
                      </span>
                      <li className="word-form-list">
                        {translate(
                          "/{originalSound}/ becomes /{resultingSound}/ unconditionally",
                          {
                            originalSound: change.originalSound,
                            resultingSound: change.resultingSound,
                          }
                        )}
                      </li>
                    </div>
                  );
                } else if (change.environment.type === "before") {
                  console.log(change)
                  return (
                    <div
                      key={index}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <button
                        className="btn-close btn-close-white small-x-button soundChangeButton"
                        aria-label="Close"
                        onClick={() => removeSoundChange(index)}
                      ></button>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeUp(index)}
                      >
                        ▲
                      </span>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeDown(index)}
                      >
                        ▼
                      </span>
                      <li className="word-form-list">
                        {translate(
                          "/{originalSound}/ becomes /{resultingSound}/ before /{firstEnvironmentSound}/",
                          {
                            originalSound: change.originalSound,
                            resultingSound: change.resultingSound,
                            firstEnvironmentSound:
                              change.environment.firstEnvironmentSound,
                          }
                        )}
                      </li>
                    </div>
                  );
                } else if (change.environment.type === "after") {
                  return (
                    <div
                      key={index}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <button
                        className="btn-close btn-close-white small-x-button soundChangeButton"
                        aria-label="Close"
                        onClick={() => removeSoundChange(index)}
                      ></button>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeUp(index)}
                      >
                        ▲
                      </span>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeDown(index)}
                      >
                        ▼
                      </span>
                      <li className="word-form-list">
                        {translate(
                          "/{originalSound}/ becomes /{resultingSound}/ after /{firstEnvironmentSound}/",
                          {
                            originalSound: change.originalSound,
                            resultingSound: change.resultingSound,
                            firstEnvironmentSound:
                              change.environment.firstEnvironmentSound,
                          }
                        )}
                      </li>
                    </div>
                  );
                } else if (change.environment.type === "word-initially") {
                  return (
                    <div
                      key={index}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      {" "}
                      <button
                        className="btn-close btn-close-white small-x-button soundChangeButton"
                        aria-label="Close"
                        onClick={() => removeSoundChange(index)}
                      ></button>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeUp(index)}
                      >
                        ▲
                      </span>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeDown(index)}
                      >
                        ▼
                      </span>
                      <li className="word-form-list">
                        {translate(
                          "/{originalSound}/ becomes /{resultingSound}/ word initially",
                          {
                            originalSound: change.originalSound,
                            resultingSound: change.resultingSound,
                          }
                        )}
                      </li>
                    </div>
                  );
                } else if (
                  change.environment.type === "word-initially-before"
                ) {
                  return (
                    <div
                      key={index}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      {" "}
                      <button
                        className="btn-close btn-close-white small-x-button soundChangeButton"
                        aria-label="Close"
                        onClick={() => removeSoundChange(index)}
                      ></button>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeUp(index)}
                      >
                        ▲
                      </span>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeDown(index)}
                      >
                        ▼
                      </span>
                      <li className="word-form-list">
                        {translate(
                          "/{originalSound}/ becomes /{resultingSound}/ word initially before /{firstEnvironmentSound}/",
                          {
                            originalSound: change.originalSound,
                            resultingSound: change.resultingSound,
                            firstEnvironmentSound:
                              change.environment.firstEnvironmentSound,
                          }
                        )}
                      </li>
                    </div>
                  );
                } else if (change.environment.type === "word-finally") {
                  return (
                    <div
                      key={index}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      {" "}
                      <button
                        className="btn-close btn-close-white small-x-button soundChangeButton"
                        aria-label="Close"
                        onClick={() => removeSoundChange(index)}
                      ></button>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeUp(index)}
                      >
                        ▲
                      </span>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeDown(index)}
                      >
                        ▼
                      </span>
                      <li className="word-form-list">
                        {translate(
                          "/{originalSound}/ becomes /{resultingSound}/ word finally",
                          {
                            originalSound: change.originalSound,
                            resultingSound: change.resultingSound,
                          }
                        )}
                      </li>
                    </div>
                  );
                } else if (change.environment.type === "word-finally-after") {
                  return (
                    <div
                      key={index}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <button
                        className="btn-close btn-close-white small-x-button soundChangeButton"
                        aria-label="Close"
                        onClick={() => removeSoundChange(index)}
                      ></button>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeUp(index)}
                      >
                        ▲
                      </span>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeDown(index)}
                      >
                        ▼
                      </span>
                      <li className="word-form-list">
                        {translate(
                          "/{originalSound}/ becomes /{resultingSound}/ word finally after /{firstEnvironmentSound}/",
                          {
                            originalSound: change.originalSound,
                            resultingSound: change.resultingSound,
                            firstEnvironmentSound:
                              change.environment.firstEnvironmentSound,
                          }
                        )}
                      </li>
                    </div>
                  );
                } else if (change.environment.type === "stressed") {
                  return (
                    <div
                      key={index}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      {" "}
                      <button
                        className="btn-close btn-close-white small-x-button soundChangeButton"
                        aria-label="Close"
                        onClick={() => removeSoundChange(index)}
                      ></button>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeUp(index)}
                      >
                        ▲
                      </span>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeDown(index)}
                      >
                        ▼
                      </span>
                      <li className="word-form-list">
                        {translate(
                          "/{originalSound}/ becomes /{resultingSound}/when stressed",
                          {
                            originalSound: change.originalSound,
                            resultingSound: change.resultingSound,
                          }
                        )}
                      </li>
                    </div>
                  );
                } else if (change.environment.type === "unstressed") {
                  return (
                    <div
                      key={index}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      {" "}
                      <button
                        className="btn-close btn-close-white small-x-button soundChangeButton"
                        aria-label="Close"
                        onClick={() => removeSoundChange(index)}
                      ></button>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeUp(index)}
                      >
                        ▲
                      </span>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeDown(index)}
                      >
                        ▼
                      </span>
                      <li className="word-form-list">
                        {translate(
                          "/{originalSound}/ becomes /{resultingSound}/when unstressed",
                          {
                            originalSound: change.originalSound,
                            resultingSound: change.resultingSound,
                          }
                        )}
                      </li>
                    </div>
                  );
                }
              } else {
                //change is a prosody change
                if (change.prosodyType === "syllable") {
                  return (
                    <div
                      key={index}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <button
                        className="btn-close btn-close-white small-x-button soundChangeButton"
                        aria-label="Close"
                        onClick={() => removeSoundChange(index)}
                      ></button>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeUp(index)}
                      >
                        ▲
                      </span>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeDown(index)}
                      >
                        ▼
                      </span>
                      <li className="word-form-list">
                        {translate("Prosody becomes syllable-timed")}
                      </li>
                    </div>
                  );
                } else if (change.prosodyType === "stress") {
                  let stressedSyllable = "";
                  let ifNoheavy = "";

                  if (change.primaryStressPlacement === "secondLast") {
                    stressedSyllable = translate("second last");
                  } else if (change.primaryStressPlacement === "firstHeavy") {
                    stressedSyllable = translate("first heavy");
                  } else if (change.primaryStressPlacement === "lastHeavy") {
                    stressedSyllable = translate("last heavy");
                  } else {
                    stressedSyllable = change.primaryStressPlacement;
                  }

                  if (change.whenNoHeavySyllable === "secondLast") {
                    ifNoheavy = translate("second last");
                  } else if (change.whenNoHeavySyllable === "firstHeavy") {
                    ifNoheavy = translate("first heavy");
                  } else if (change.whenNoHeavySyllable === "lastHeavy") {
                    ifNoheavy = translate("last heavy");
                  } else {
                    ifNoheavy = change.whenNoHeavySyllable;
                  }

                  return (
                    <div
                      key={index}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      {" "}
                      <button
                        className="btn-close btn-close-white small-x-button soundChangeButton"
                        aria-label="Close"
                        onClick={() => removeSoundChange(index)}
                      ></button>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeUp(index)}
                      >
                        ▲
                      </span>
                      <span
                        className="arrow-button soundChangeButton"
                        onClick={() => moveChangeDown(index)}
                      >
                        ▼
                      </span>
                      <li className="word-form-list">
                        {translate(
                          "Prosody becomes stressed-timed with stress falling on the {stressedSyllable} syllable.",
                          { stressedSyllable }
                        )}

                        {(change.primaryStressPlacement === "firstHeavy" ||
                          change.primaryStressPlacement === "lastHeavy") && (
                          <>
                            {" "}
                            {translate(
                              "Words without heavy syllables put stress on the {ifNoheavy} syllable.",
                              { ifNoheavy }
                            )}
                          </>
                        )}
                      </li>
                    </div>
                  );
                }
              }
              return null; // fallback for types that don't match either condition
            })}
        </ol>
      </div>
      {soundChangeOrPhonotactic === "sound-change" && page !== "languageModal" && (
      <button onClick={applyNewSoundChanges}>
        {translate("Apply Sound Changes")}
      </button>)}
      {applyingSoundChanges && (
        <span>{translate("Applying sound changes...")}</span>
      )}
      {appliedSoundChanges && (
        <span>{translate("Sound changes applied!")}</span>
      )}
    </div>
  );
};

export default SoundChangeMaker;
