import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import LanguageSelector from "./languageSelector";
import { useTranslate } from "../Functions/TranslateUI";
import { addGroup} from "../services/languageService.js";

const AddGroupModal = ({ show, setShow, onSuccess }) => {
  const { translate } = useTranslate();
  const [addedLanguages, setAddedLanguages] = useState([]);
  const [groupName, setGroupName] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const [showNounForms, setShowNounForms] = useState(false);
  const [showNumForms, setShowNumForms] = useState(false);
  const [showVerbForms, setShowVerbForms] = useState(false);
  const [showAdjForms, setShowAdjForms] = useState(false);
  const [showAdvForms, setShowAdvForms] = useState(false);
  const [showAdpForms, setShowAdpForms] = useState(false);
  const [showPartForms, setShowPartForms] = useState(false);
  const [showInterjForms, setShowInterjForms] = useState(false);
  const [showConjForms, setShowConjForms] = useState(false);
  const [showPronForms, setShowPronForms] = useState(false);
  const [showAffixForms, setShowAffixForms] = useState(false);
  const [wordForms, setWordForms] = useState([]);
  const [nounWordFormName, setNounWordFormName] = useState();
  const [numWordFormName, setNumWordFormName] = useState();
  const [verbWordFormName, setVerbWordFormName] = useState();
  const [adjWordFormName, setAdjWordFormName] = useState();
  const [advWordFormName, setAdvWordFormName] = useState();
  const [adpWordFormName, setAdpWordFormName] = useState();
  const [partWordFormName, setPartWordFormName] = useState();
  const [interjWordFormName, setInterjWordFormName] = useState();
  const [conjWordFormName, setConjWordFormName] = useState();
  const [pronWordFormName, setPronWordFormName] = useState();
  const [affixWordFormName, setAffixWordFormName] = useState();

  const id = Date.now();

  const showToast = (message) => {
    const toastContainer = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className =
      "toast align-items-center text-white bg-success border-0 show";
    toast.role = "alert";
    toast.ariaLive = "assertive";
    toast.ariaAtomic = "true";

    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const save = async () => {
    if (!groupName) {
      setShowWarning(true);
      return;
    }
    try {
      const data = await window.electron.addGroup(groupName, JSON.stringify(wordForms), JSON.stringify(addedLanguages));

      if (!data.success) {
        console.error(`Error adding group`);
      } else {
        showToast("Changes saved ✅");
        if (onSuccess) onSuccess(); // trigger parent's refresh
        close();
      }

      //reset values
      setAddedLanguages([]);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  const close = () => {
    setShow(false);
  };

  const handleShowForms = (showForm, setShowForm) => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const handleWordFormName = (e, setWordFormName) => {
    setWordFormName(e.target.value);
  };

  const addWordForm = (wordFormName, setWordFormName, type) => {
    if (wordFormName) {
      const wordForm = {
        name: wordFormName,
        type: type,
      };

      setWordForms((prev) => [...prev, wordForm]);
      setWordFormName("");
    }
  };

  const removeWordForm = (indexToRemove) => {
    setWordForms((prevForms) =>
      prevForms.filter((_, i) => i !== indexToRemove)
    );
  };

  const handleLanguageSelect = (language) => {
    setAddedLanguages((prev) => [...prev, language]);
  };

  const removeLanguage = (id) => {
    const temp = addedLanguages.filter(
      (language) => language.language_id !== id
    );
    setAddedLanguages(temp);
  };

  const clearAddedLanguages = () => {
    setAddedLanguages([]);
  };

  return (
    <Modal show={show} onHide={close} backdrop={true}>
      <Modal.Header closeButton>
        <Modal.Title>{translate("Add New Group")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-modal">
          <div>
            <input
              type="text"
              className="thin-white-border"
              placeholder={translate("Group Name")}
              value={groupName}
              style={{ padding: "5px" }}
              onChange={(e) => setGroupName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  save();
                }
              }}
            ></input>
            {showWarning && !groupName ? (
              <p className="warning">{translate("Please enter the group's name!")}</p>
            ) : (
              <></>
            )}
            <div className="thin-white-border">
              <div className="thin-white-border">
                <span style={{ marginRight: "5px", fontWeight: "600" }}>
                  {translate("Assign Languages")}
                </span>
                <LanguageSelector
                  id={id}
                  onLanguageSelect={handleLanguageSelect}
                />
              </div>

              <div className="thin-white-border">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "1",
                    }}
                  >
                    {translate("Assigned Languages")}
                  </span>
                  <button
                    style={{
                      marginLeft: "10px",
                      padding: "4px 8px",
                      fontSize: "16px",
                      lineHeight: "1",
                      borderRadius: "5px",
                    }}
                    onClick={clearAddedLanguages}
                  >
                    {translate("Clear All")}
                  </button>
                </div>

                <ol className="added-languages">
                  {addedLanguages.map((language, index) => (
                    <div style={{ display: "flex", alignContent: "center" }}>
                      <li key={index}>{language.language_name} </li>
                      <button
                        className="btn-close btn-close-white small-x-button"
                        aria-label="Close"
                        onClick={() => removeLanguage(language.language_id)}
                      ></button>
                    </div>
                  ))}
                </ol>
              </div>
            </div>

            <div className="thin-white-border">
              <p>
                <b>{translate("Word Forms")}</b>
              </p>
              <p>
                <i>
                  {translate("Specify specific forms of a word in the dictionary entries")}
                </i>
              </p>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <>
                    <label htmlFor="noun" style={{ marginRight: "5px" }}>
                      {translate("Noun")}
                    </label>
                    <input
                      type="checkbox"
                      id="noun"
                      onChange={() =>
                        handleShowForms(showNounForms, setShowNounForms)
                      }
                    ></input>
                  </>
                </div>

                {showNounForms ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for nouns")}
                      value={nounWordFormName}
                      onChange={(e) =>
                        handleWordFormName(e, setNounWordFormName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordForm(
                            nounWordFormName,
                            setNounWordFormName,
                            "noun"
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <button
                        className="word-form-input-button"
                        onClick={() =>
                          addWordForm(
                            nounWordFormName,
                            setNounWordFormName,
                            "noun"
                          )
                        }
                      >
                        {translate("Add Word Form")}
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <>
                    <label htmlFor="num" style={{ marginRight: "5px" }}>
                      {translate("Number")}
                    </label>
                    <input
                      type="checkbox"
                      id="num"
                      onChange={() =>
                        handleShowForms(showNumForms, setShowNumForms)
                      }
                    ></input>
                  </>
                </div>

                {showNumForms ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for numbers")}
                      value={numWordFormName}
                      onChange={(e) =>
                        handleWordFormName(e, setNumWordFormName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordForm(
                            numWordFormName,
                            setNumWordFormName,
                            "num"
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <button
                        className="word-form-input-button"
                        onClick={() =>
                          addWordForm(
                            numWordFormName,
                            setNumWordFormName,
                            "num"
                          )
                        }
                      >
                        {translate("Add Word Form")}
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <>
                    <label htmlFor="verb" style={{ marginRight: "5px" }}>
                      {translate("Verb")}
                    </label>
                    <input
                      type="checkbox"
                      id="verb"
                      onChange={() =>
                        handleShowForms(showVerbForms, setShowVerbForms)
                      }
                    ></input>
                  </>
                </div>

                {showVerbForms ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for nouns")}
                      value={verbWordFormName}
                      onChange={(e) =>
                        handleWordFormName(e, setVerbWordFormName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordForm(
                            verbWordFormName,
                            setVerbWordFormName,
                            "verb"
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <button
                        className="word-form-input-button"
                        onClick={() =>
                          addWordForm(
                            verbWordFormName,
                            setVerbWordFormName,
                            "verb"
                          )
                        }
                      >
                        {translate("Add Word Form")}
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <>
                    <label htmlFor="adj" style={{ marginRight: "5px" }}>
                      {translate("Adjective")}
                    </label>
                    <input
                      type="checkbox"
                      id="adj"
                      onChange={() =>
                        handleShowForms(showAdjForms, setShowAdjForms)
                      }
                    ></input>
                  </>
                </div>

                {showAdjForms ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for adjectives")}
                      value={adjWordFormName}
                      onChange={(e) =>
                        handleWordFormName(e, setAdjWordFormName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordForm(
                            adjWordFormName,
                            setAdjWordFormName,
                            "adj"
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <button
                        className="word-form-input-button"
                        onClick={() =>
                          addWordForm(
                            adjWordFormName,
                            setAdjWordFormName,
                            "adj"
                          )
                        }
                      >
                        {translate("Add Word Form")}
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <>
                    <label htmlFor="adv" style={{ marginRight: "5px" }}>
                      {translate("Adverb")}
                    </label>
                    <input
                      type="checkbox"
                      id="adv"
                      onChange={() =>
                        handleShowForms(showAdvForms, setShowAdvForms)
                      }
                    ></input>
                  </>
                </div>

                {showAdvForms ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for adverbs")}
                      value={advWordFormName}
                      onChange={(e) =>
                        handleWordFormName(e, setAdvWordFormName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordForm(
                            advWordFormName,
                            setAdvWordFormName,
                            "adv"
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <button
                        className="word-form-input-button"
                        onClick={() =>
                          addWordForm(
                            advWordFormName,
                            setAdvWordFormName,
                            "adv"
                          )
                        }
                      >
                        {translate("Add Word Form")}
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <>
                    <label htmlFor="adp" style={{ marginRight: "5px" }}>
                      {translate("Adposition")}
                    </label>
                    <input
                      type="checkbox"
                      id="adp"
                      onChange={() =>
                        handleShowForms(showAdpForms, setShowAdpForms)
                      }
                    ></input>
                  </>
                </div>

                {showAdpForms ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for adpositions")}
                      value={adpWordFormName}
                      onChange={(e) =>
                        handleWordFormName(e, setAdpWordFormName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordForm(
                            adpWordFormName,
                            setAdpWordFormName,
                            "adp"
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <button
                        className="word-form-input-button"
                        onClick={() =>
                          addWordForm(
                            adpWordFormName,
                            setAdpWordFormName,
                            "adp"
                          )
                        }
                      >
                        {translate("Add Word Form")}
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <>
                    <label htmlFor="conj" style={{ marginRight: "5px" }}>
                      {translate("Conjunction")}
                    </label>
                    <input
                      type="checkbox"
                      id="conj"
                      onChange={() =>
                        handleShowForms(showConjForms, setShowConjForms)
                      }
                    ></input>
                  </>
                </div>

                {showConjForms ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for conjunctions")}
                      value={conjWordFormName}
                      onChange={(e) =>
                        handleWordFormName(e, setConjWordFormName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordForm(
                            conjWordFormName,
                            setConjWordFormName,
                            "conj"
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <button
                        className="word-form-input-button"
                        onClick={() =>
                          addWordForm(
                            conjWordFormName,
                            setConjWordFormName,
                            "conj"
                          )
                        }
                      >
                        {translate("Add Word Form")}
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <>
                    <label htmlFor="interj" style={{ marginRight: "5px" }}>
                      {translate("Interjection")}
                    </label>
                    <input
                      type="checkbox"
                      id="interj"
                      onChange={() =>
                        handleShowForms(showInterjForms, setShowInterjForms)
                      }
                    ></input>
                  </>
                </div>

                {showInterjForms ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for interjections")}
                      value={interjWordFormName}
                      onChange={(e) =>
                        handleWordFormName(e, setInterjWordFormName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordForm(
                            interjWordFormName,
                            setInterjWordFormName,
                            "interj"
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <button
                        className="word-form-input-button"
                        onClick={() =>
                          addWordForm(
                            interjWordFormName,
                            setInterjWordFormName,
                            "interj"
                          )
                        }
                      >
                        {translate("Add Word Form")}
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <>
                    <label htmlFor="part" style={{ marginRight: "5px" }}>
                      {translate("Particle")}
                    </label>
                    <input
                      type="checkbox"
                      id="part"
                      onChange={() =>
                        handleShowForms(showPartForms, setShowPartForms)
                      }
                    ></input>
                  </>
                </div>

                {showPartForms ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for particles")}
                      value={partWordFormName}
                      onChange={(e) =>
                        handleWordFormName(e, setPartWordFormName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordForm(
                            partWordFormName,
                            setPartWordFormName,
                            "part"
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <button
                        className="word-form-input-button"
                        onClick={() =>
                          addWordForm(
                            partWordFormName,
                            setPartWordFormName,
                            "part"
                          )
                        }
                      >
                        {translate("Add Word Form")}
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <>
                    <label htmlFor="affix" style={{ marginRight: "5px" }}>
                      {translate("Affix")}
                    </label>
                    <input
                      type="checkbox"
                      id="affix"
                      onChange={() =>
                        handleShowForms(showAffixForms, setShowAffixForms)
                      }
                    ></input>
                  </>
                </div>

                {showAffixForms ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for affixes")}
                      value={affixWordFormName}
                      onChange={(e) =>
                        handleWordFormName(e, setAffixWordFormName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordForm(
                            affixWordFormName,
                            setAffixWordFormName,
                            "affix"
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <button
                        className="word-form-input-button"
                        onClick={() =>
                          addWordForm(
                            affixWordFormName,
                            setAffixWordFormName,
                            "affix"
                          )
                        }
                      >
                       {translate("Add Word Form")}
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <>
                    <label htmlFor="pronoun" style={{ marginRight: "5px" }}>
                      {translate("Pronoun")}
                    </label>
                    <input
                      type="checkbox"
                      id="pronoun"
                      onChange={() =>
                        handleShowForms(showPronForms, setShowPronForms)
                      }
                    ></input>
                  </>
                </div>

                {showPronForms ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for pronouns")}
                      value={pronWordFormName}
                      onChange={(e) =>
                        handleWordFormName(e, setPronWordFormName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordForm(
                            pronWordFormName,
                            setPronWordFormName,
                            "pron"
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <button
                        className="word-form-input-button"
                        onClick={() =>
                          addWordForm(
                            pronWordFormName,
                            setPronWordFormName,
                            "pron"
                          )
                        }
                      >
                        {translate("Add Word Form")}
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              {wordForms.length > 0 ? (
                <div className="thin-white-border">
                  <p>{translate("Added Word Forms")}</p>

                  <div className="word-form-container">
                    {wordForms.map((wordForm, index) => (
                      <div className="word-form-list" key={index}>
                        {wordForm.name}
                        <button
                          onClick={() => removeWordForm(index)}
                          className="btn-close btn-close-white extra-small-x-button"
                        ></button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-footer-buttons">
          <div className="non-delete-buttons">
            <Button variant="secondary" onClick={close}>
              {translate("Cancel")}
            </Button>
            <Button variant="primary" onClick={save}>
              {translate("Save Changes")}
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddGroupModal;
