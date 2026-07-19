import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import LanguageSelector from "./languageSelector";
import { useTranslate } from "../Functions/TranslateUI";
import { getGroup, deleteGroup } from "../services/languageService";

const EditGroupModal = ({
  id,
  name,
  show,
  group,
  setShow,
  onSuccess,
  triggerRefresh,
  assignedLanguages,
  assignedWordForms,
  assignedWordCategories,
}) => {
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

  const [showNounCategories, setShowNounCategories] = useState(false);
  const [showNumCategories, setShowNumCategories] = useState(false);
  const [showVerbCategories, setShowVerbCategories] = useState(false);
  const [showAdjCategories, setShowAdjCategories] = useState(false);
  const [showAdvCategories, setShowAdvCategories] = useState(false);
  const [showAdpCategories, setShowAdpCategories] = useState(false);
  const [showPartCategories, setShowPartCategories] = useState(false);
  const [showInterjCategories, setShowInterjCategories] = useState(false);
  const [showConjCategories, setShowConjCategories] = useState(false);
  const [showPronCategories, setShowPronCategories] = useState(false);
  const [showAffixCategories, setShowAffixCategories] = useState(false);
  const [wordCategories, setWordCategories] = useState([]);
  const [nounWordCategoryName, setNounWordCategoryName] = useState();
  const [numWordCategoryName, setNumWordCategoryName] = useState();
  const [verbWordCategoryName, setVerbWordCategoryName] = useState();
  const [adjWordCategoryName, setAdjWordCategoryName] = useState();
  const [advWordCategoryName, setAdvWordCategoryName] = useState();
  const [adpWordCategoryName, setAdpWordCategoryName] = useState();
  const [partWordCategoryName, setPartWordCategoryName] = useState();
  const [interjWordCategoryName, setInterjWordCategoryName] = useState();
  const [conjWordCategoryName, setConjWordCategoryName] = useState();
  const [pronWordCategoryName, setPronWordCategoryName] = useState();
  const [affixWordCategoryName, setAffixWordCategoryName] = useState();

  const [nounCategories, setNounCategories] = useState([]);
  const [nounCategoryAbbreviations, setNounCategoryAbbreviations] = useState(
    [],
  );

  const [numCategories, setNumCategories] = useState([]);
  const [numCategoryAbbreviations, setNumCategoryAbbreviations] = useState([]);

  const [verbCategories, setVerbCategories] = useState([]);
  const [verbCategoryAbbreviations, setVerbCategoryAbbreviations] = useState(
    [],
  );

  const [adjCategories, setAdjCategories] = useState([]);
  const [adjCategoryAbbreviations, setAdjCategoryAbbreviations] = useState([]);

  const [advCategories, setAdvCategories] = useState([]);
  const [advCategoryAbbreviations, setAdvCategoryAbbreviations] = useState([]);

  const [adpCategories, setAdpCategories] = useState([]);
  const [adpCategoryAbbreviations, setAdpCategoryAbbreviations] = useState([]);

  const [conjCategories, setConjCategories] = useState([]);
  const [conjCategoryAbbreviations, setConjCategoryAbbreviations] = useState(
    [],
  );

  const [interjCategories, setInterjCategories] = useState([]);
  const [interjCategoryAbbreviations, setInterjCategoryAbbreviations] =
    useState([]);

  const [pronCategories, setPronCategories] = useState([]);
  const [pronCategoryAbbreviations, setPronCategoryAbbreviations] = useState(
    [],
  );

  const [affixCategories, setAffixCategories] = useState([]);
  const [affixCategoryAbbreviations, setAffixCategoryAbbreviations] = useState(
    [],
  );

  const [partCategories, setPartCategories] = useState([]);
  const [partCategoryAbbreviations, setPartCategoryAbbreviations] = useState(
    [],
  );

  const [currentUser, setCurrentUser] = useState();
  const [userSearch, setUserSearch] = useState();
  const [userSearchError, setUserSearchError] = useState(false);

  useEffect(() => {
    setAddedLanguages(assignedLanguages || []);
    setWordForms(assignedWordForms || []);
    setWordCategories(assignedWordCategories || []);
  }, [assignedLanguages, assignedWordForms, assignedWordCategories]);

  useEffect(() => {
    const getGroup = async () => {
      if (group.group_id) {
        const data = await window.electron.getGroup(group.group_id);

        setAddedLanguages(JSON.parse(data[0].languages));
      }
    };
    getGroup();
  }, []);

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

  const showDeleteToast = (message) => {
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

    const data = await window.electron.editGroup(
      groupName,
      JSON.stringify(wordForms),
      JSON.stringify(wordCategories),
      JSON.stringify(addedLanguages),
      id,
    );

    if (!data.success) {
      console.error(`Error editing group`);
    } else {
      showToast("Changes saved ✅");
      if (typeof triggerRefresh === "function") {
        triggerRefresh();
      }
      close();
    }
  };

  const close = () => {
    setShow(false);
  };

  const deleteGroup = async () => {
    const data = await window.electron.deleteGroup(group.group_id);

    if (data.success) {
      if (typeof triggerRefresh === "function") {
        triggerRefresh();
      }
      close();
      showDeleteToast("Group deleted ✅");
    }
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
      prevForms.filter((_, i) => i !== indexToRemove),
    );
  };

  const handleShowCategories = (showCategory, setShowCategory) => {
    if (showCategory) {
      setShowCategory(false);
    } else {
      setShowCategory(true);
    }
  };

  const handleWordCategoryName = (e, setWordCategoryName) => {
    setWordCategoryName(e.target.value);
  };

  const addWordCategory = (
    wordCategoryName,
    setWordCategoryName,
    type,
    categories,
    setCategories,
    abbreviations,
    setAbbreviations,
  ) => {
    if (wordCategoryName) {
      const wordCategory = {
        name: wordCategoryName,
        type: type,
        categories: {
          name: categories,
          abbreviation: abbreviations,
        },
      };

      setWordCategories((prev) => [...prev, wordCategory]);
      setWordCategoryName("");
      setCategories([]);
      setAbbreviations([]);
    }
  };

  const removeWordCategory = (indexToRemove) => {
    setWordCategories((prevForms) =>
      prevForms.filter((_, i) => i !== indexToRemove),
    );
  };

  const handleLanguageSelect = (language) => {
    setAddedLanguages((prev) => [...prev, language]);
  };

  const removeLanguage = (language) => {
    const tempLanguages = addedLanguages.filter(
      (lang) => lang.language_id !== language.language_id,
    );

    setAddedLanguages(tempLanguages);
  };

  const clearAddedLanguages = () => {
    setAddedLanguages([]);
  };

  useEffect(() => {
    setGroupName(name);
  }, [name]);

  const addCategory = (setCategories) => {
    setCategories((prev) => [...prev, ""]);
  };

  const removeCategory = (setCategory, setCategoryAbb, indexToRemove) => {
    setCategory((prev) => prev.filter((_, index) => index !== indexToRemove));

    setCategoryAbb((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleCategoryChange = (index, value, categories, setCategories) => {
    const updated = [...categories];
    updated[index] = value;
    setCategories(updated);
  };

  return (
    <Modal show={show} onHide={close} backdrop={true}>
      <Modal.Header closeButton>
        <Modal.Title>{translate("Edit {name}", { name })}</Modal.Title>
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
              <p className="warning">
                {translate("Please enter the group's name!")}
              </p>
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
                        onClick={() => removeLanguage(language)}
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
                  {translate(
                    "Specify specific forms of a word in the dictionary entries",
                  )}
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
                            "noun",
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
                            "noun",
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
                      placeholder={translate("add word form for verbs")}
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
                            "verb",
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
                            "verb",
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
                            "adj",
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
                            "adj",
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
                      value={verbWordFormName}
                      onChange={(e) =>
                        handleWordFormName(e, setVerbWordFormName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordForm(
                            numWordFormName,
                            setNumWordFormName,
                            "num",
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
                            "num",
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
                            "adv",
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
                            "adv",
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
                            "adp",
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
                            "adp",
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
                            "conj",
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
                            "conj",
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
                            "interj",
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
                            "interj",
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
                            "part",
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
                            "part",
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
                            "affix",
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
                            "affix",
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
                            "pron",
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
                            "pron",
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

            <div className="thin-white-border">
              <p>
                <b>{translate("Word Categories")}</b>
              </p>
              <p>
                <i>
                  {translate(
                    "Specify specific categories of a word (e.g gender) in the dictionary entries",
                  )}
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
                        handleShowCategories(
                          showNounCategories,
                          setShowNounCategories,
                        )
                      }
                    ></input>
                  </>
                </div>

                {showNounCategories ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("Category name")}
                      value={nounWordCategoryName}
                      onChange={(e) =>
                        handleWordCategoryName(e, setNounWordCategoryName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordForm(
                            nounWordCategoryName,
                            setNounWordCategoryName,
                            "noun",
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <button
                            onClick={() => addCategory(setNounCategories)}
                          >
                            {translate("Add Category")}
                          </button>

                          {nounCategories.map((category, index) => (
                            <div key={index}>
                              <input
                                type="text"
                                placeholder={translate("Category {number}", {
                                  number: index + 1,
                                })}
                                value={category}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    nounCategories,
                                    setNounCategories,
                                  )
                                }
                              />
                              <input
                                type="text"
                                placeholder={translate("abbreviation")}
                                value={nounCategoryAbbreviations[index]}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    nounCategoryAbbreviations,
                                    setNounCategoryAbbreviations,
                                  )
                                }
                              />
                              <button
                                onClick={() =>
                                  removeCategory(
                                    setNounCategories,
                                    setNounCategoryAbbreviations,
                                    index,
                                  )
                                }
                                className="btn-close btn-close-white extra-small-x-button"
                              ></button>
                            </div>
                          ))}
                        </div>

                        <button
                          className="word-form-input-button"
                          style={{ marginTop: "10px" }}
                          onClick={() =>
                            addWordCategory(
                              nounWordCategoryName,
                              setNounWordCategoryName,
                              "noun",
                              nounCategories,
                              setNounCategories,
                              nounCategoryAbbreviations,
                              setNounCategoryAbbreviations,
                            )
                          }
                        >
                          {translate("Submit")}
                        </button>
                      </div>
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
                        handleShowCategories(
                          showVerbCategories,
                          setShowVerbCategories,
                        )
                      }
                    ></input>
                  </>
                </div>

                {showVerbCategories ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word category for verbs")}
                      value={verbWordCategoryName}
                      onChange={(e) =>
                        handleWordCategoryName(e, setVerbWordCategoryName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordCategory(
                            verbWordCategoryName,
                            setVerbWordCategoryName,
                            "verb",
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <button
                            onClick={() => addCategory(setVerbCategories)}
                          >
                            {translate("Add Category")}
                          </button>

                          {verbCategories.map((category, index) => (
                            <div key={index}>
                              <input
                                type="text"
                                placeholder={`Category ${index + 1}`}
                                value={category}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    verbCategories,
                                    setVerbCategories,
                                  )
                                }
                              />
                              <input
                                type="text"
                                placeholder={translate("abbreviation")}
                                value={verbCategoryAbbreviations[index]}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    verbCategoryAbbreviations,
                                    setVerbCategoryAbbreviations,
                                  )
                                }
                              />
                              <button
                                onClick={() =>
                                  removeCategory(
                                    setVerbCategories,
                                    setVerbCategoryAbbreviations,
                                    index,
                                  )
                                }
                                className="btn-close btn-close-white extra-small-x-button"
                              ></button>
                            </div>
                          ))}
                        </div>

                        <button
                          className="word-form-input-button"
                          style={{ marginTop: "10px" }}
                          onClick={() =>
                            addWordCategory(
                              verbWordCategoryName,
                              setVerbWordCategoryName,
                              "verb",
                              verbCategories,
                              setVerbCategories,
                              verbCategoryAbbreviations,
                              setVerbCategoryAbbreviations,
                            )
                          }
                        >
                          {translate("Submit")}
                        </button>
                      </div>
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
                        handleShowCategories(
                          showAdjCategories,
                          setShowAdjCategories,
                        )
                      }
                    ></input>
                  </>
                </div>

                {showAdjCategories ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate(
                        "add word category for adjectives",
                      )}
                      value={adjWordCategoryName}
                      onChange={(e) =>
                        handleWordCategoryName(e, setAdjWordCategoryName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordCategory(
                            adjWordCategoryName,
                            setAdjWordCategoryName,
                            "adj",
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <button onClick={() => addCategory(setAdjCategories)}>
                            Add Category
                          </button>

                          {adjCategories.map((category, index) => (
                            <div key={index}>
                              <input
                                type="text"
                                placeholder={translate("Category {number}", {
                                  number: index + 1,
                                })}
                                value={category}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    adjCategories,
                                    setAdjCategories,
                                  )
                                }
                              />
                              <input
                                type="text"
                                placeholder={translate("abbreviation")}
                                value={adjCategoryAbbreviations[index]}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    adjCategoryAbbreviations,
                                    setAdjCategoryAbbreviations,
                                  )
                                }
                              />
                              <button
                                onClick={() =>
                                  removeCategory(
                                    setAdjCategories,
                                    setAdjCategoryAbbreviations,
                                    index,
                                  )
                                }
                                className="btn-close btn-close-white extra-small-x-button"
                              ></button>
                            </div>
                          ))}
                        </div>

                        <button
                          className="word-form-input-button"
                          style={{ marginTop: "10px" }}
                          onClick={() =>
                            addWordCategory(
                              adjWordCategoryName,
                              setAdjWordCategoryName,
                              "adj",
                              adjCategories,
                              setAdjCategories,
                              adjCategoryAbbreviations,
                              setAdjCategoryAbbreviations,
                            )
                          }
                        >
                          {translate("Submit")}
                        </button>
                      </div>
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
                        handleShowCategories(
                          showNumCategories,
                          setShowNumCategories,
                        )
                      }
                    ></input>
                  </>
                </div>

                {showNumCategories ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("Category name")}
                      value={numWordCategoryName}
                      onChange={(e) =>
                        handleWordCategoryName(e, setNumWordCategoryName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordForm(
                            numWordCategoryName,
                            setNumWordCategoryName,
                            "num",
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <button onClick={() => addCategory(setNumCategories)}>
                            {translate("Add Category")}
                          </button>

                          {numCategories.map((category, index) => (
                            <div key={index}>
                              <input
                                type="text"
                                placeholder={translate("Category {number}", {
                                  number: index + 1,
                                })}
                                value={category}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    numCategories,
                                    setNumCategories,
                                  )
                                }
                              />
                              <input
                                type="text"
                                placeholder={translate("abbreviation")}
                                value={numCategoryAbbreviations[index]}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    numCategoryAbbreviations,
                                    setNumCategoryAbbreviations,
                                  )
                                }
                              />
                              <button
                                onClick={() =>
                                  removeCategory(
                                    setNumCategories,
                                    setNumCategoryAbbreviations,
                                    index,
                                  )
                                }
                                className="btn-close btn-close-white extra-small-x-button"
                              ></button>
                            </div>
                          ))}
                        </div>

                        <button
                          className="word-form-input-button"
                          style={{ marginTop: "10px" }}
                          onClick={() =>
                            addWordCategory(
                              numWordCategoryName,
                              setNumWordCategoryName,
                              "num",
                              numCategories,
                              setNumCategories,
                              numCategoryAbbreviations,
                              setNumCategoryAbbreviations,
                            )
                          }
                        >
                          {translate("Submit")}
                        </button>
                      </div>
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
                        handleShowCategories(
                          showAdvCategories,
                          setShowAdvCategories,
                        )
                      }
                    ></input>
                  </>
                </div>

                {showAdvCategories ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word category for adverbs")}
                      value={advWordCategoryName}
                      onChange={(e) =>
                        handleWordCategoryName(e, setAdvWordCategoryName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental form submission or page reload
                          addWordCategory(
                            advWordCategoryName,
                            setAdvWordCategoryName,
                            "adv",
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <button onClick={() => addCategory(setAdvCategories)}>
                            {translate("Add Category")}
                          </button>

                          {advCategories.map((category, index) => (
                            <div key={index}>
                              <input
                                type="text"
                                placeholder={translate("Category {number}", {
                                  number: index + 1,
                                })}
                                value={category}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    advCategories,
                                    setAdvCategories,
                                  )
                                }
                              />
                              <input
                                type="text"
                                placeholder={translate("abbreviation")}
                                value={advCategoryAbbreviations[index]}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    advCategoryAbbreviations,
                                    setAdvCategoryAbbreviations,
                                  )
                                }
                              />
                              <button
                                onClick={() =>
                                  removeCategory(
                                    setAdvCategories,
                                    setAdvCategoryAbbreviations,
                                    index,
                                  )
                                }
                                className="btn-close btn-close-white extra-small-x-button"
                              ></button>
                            </div>
                          ))}
                        </div>

                        <button
                          className="word-form-input-button"
                          style={{ marginTop: "10px" }}
                          onClick={() =>
                            addWordCategory(
                              advWordCategoryName,
                              setAdvWordCategoryName,
                              "adv",
                              advCategories,
                              setAdvCategories,
                              advCategoryAbbreviations,
                              setAdvCategoryAbbreviations,
                            )
                          }
                        >
                          {translate("Submit")}
                        </button>
                      </div>
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
                        handleShowCategories(
                          showAdpCategories,
                          setShowAdpCategories,
                        )
                      }
                    ></input>
                  </>
                </div>

                {showAdpCategories ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for adpositions")}
                      value={adpWordCategoryName}
                      onChange={(e) =>
                        handleWordCategoryName(e, setAdpWordCategoryName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental category submission or page reload
                          addWordCategory(
                            adpWordCategoryName,
                            setAdpWordCategoryName,
                            "adp",
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <button onClick={() => addCategory(setAdpCategories)}>
                            {translate("Add Category")}
                          </button>

                          {adpCategories.map((category, index) => (
                            <div key={index}>
                              <input
                                type="text"
                                placeholder={translate("Category {number}", {
                                  number: index + 1,
                                })}
                                value={category}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    adpCategories,
                                    setAdpCategories,
                                  )
                                }
                              />
                              <input
                                type="text"
                                placeholder={translate("abbreviation")}
                                value={adpCategoryAbbreviations[index]}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    adpCategoryAbbreviations,
                                    setAdpCategoryAbbreviations,
                                  )
                                }
                              />
                              <button
                                onClick={() =>
                                  removeCategory(
                                    setAdpCategories,
                                    setAdpCategoryAbbreviations,
                                    index,
                                  )
                                }
                                className="btn-close btn-close-white extra-small-x-button"
                              ></button>
                            </div>
                          ))}
                        </div>

                        <button
                          className="word-form-input-button"
                          style={{ marginTop: "10px" }}
                          onClick={() =>
                            addWordCategory(
                              adpWordCategoryName,
                              setAdpWordCategoryName,
                              "adp",
                              adpCategories,
                              setAdpCategories,
                              adpCategoryAbbreviations,
                              setAdpCategoryAbbreviations,
                            )
                          }
                        >
                          {translate("Submit")}
                        </button>
                      </div>
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
                        handleShowCategories(
                          showConjCategories,
                          setShowConjCategories,
                        )
                      }
                    ></input>
                  </>
                </div>

                {showConjCategories ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for conjunctions")}
                      value={conjWordCategoryName}
                      onChange={(e) =>
                        handleWordCategoryName(e, setConjWordCategoryName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental category submission or page reload
                          addWordCategory(
                            conjWordCategoryName,
                            setConjWordCategoryName,
                            "conj",
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <button
                            onClick={() => addCategory(setConjCategories)}
                          >
                            {translate("Add Category")}
                          </button>

                          {conjCategories.map((category, index) => (
                            <div key={index}>
                              <input
                                type="text"
                                placeholder={translate("Category {number}", {
                                  number: index + 1,
                                })}
                                value={category}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    conjCategories,
                                    setConjCategories,
                                  )
                                }
                              />
                              <input
                                type="text"
                                placeholder={translate("abbreviation")}
                                value={conjCategoryAbbreviations[index]}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    conjCategoryAbbreviations,
                                    setConjCategoryAbbreviations,
                                  )
                                }
                              />
                              <button
                                onClick={() =>
                                  removeCategory(
                                    setConjCategories,
                                    setConjCategoryAbbreviations,
                                    index,
                                  )
                                }
                                className="btn-close btn-close-white extra-small-x-button"
                              ></button>
                            </div>
                          ))}
                        </div>

                        <button
                          className="word-form-input-button"
                          style={{ marginTop: "10px" }}
                          onClick={() =>
                            addWordCategory(
                              conjWordCategoryName,
                              setConjWordCategoryName,
                              "conj",
                              conjCategories,
                              setConjCategories,
                              conjCategoryAbbreviations,
                              setConjCategoryAbbreviations,
                            )
                          }
                        >
                          {translate("Submit")}
                        </button>
                      </div>
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
                        handleShowCategories(
                          showInterjCategories,
                          setShowInterjCategories,
                        )
                      }
                    ></input>
                  </>
                </div>

                {showInterjCategories ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for interjections")}
                      value={interjWordCategoryName}
                      onChange={(e) =>
                        handleWordCategoryName(e, setInterjWordCategoryName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental category submission or page reload
                          addWordCategory(
                            interjWordCategoryName,
                            setInterjWordCategoryName,
                            "interj",
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <button
                            onClick={() => addCategory(setInterjCategories)}
                          >
                            {translate("Add Category")}
                          </button>

                          {interjCategories.map((category, index) => (
                            <div key={index}>
                              <input
                                type="text"
                                placeholder={translate("Category ${number}", {
                                  number: index + 1,
                                })}
                                value={category}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    interjCategories,
                                    setInterjCategories,
                                  )
                                }
                              />
                              <input
                                type="text"
                                placeholder={translate("abbreviation")}
                                value={interjCategoryAbbreviations[index]}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    interjCategoryAbbreviations,
                                    setInterjCategoryAbbreviations,
                                  )
                                }
                              />
                              <button
                                onClick={() =>
                                  removeCategory(
                                    setInterjCategories,
                                    setInterjCategoryAbbreviations,
                                    index,
                                  )
                                }
                                className="btn-close btn-close-white extra-small-x-button"
                              ></button>
                            </div>
                          ))}
                        </div>

                        <button
                          className="word-form-input-button"
                          style={{ marginTop: "10px" }}
                          onClick={() =>
                            addWordCategory(
                              interjWordCategoryName,
                              setInterjWordCategoryName,
                              "interj",
                              interjCategories,
                              setInterjCategories,
                              interjCategoryAbbreviations,
                              setInterjCategoryAbbreviations,
                            )
                          }
                        >
                          {translate("Submit")}
                        </button>
                      </div>
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
                        handleShowCategories(
                          showPartCategories,
                          setShowPartCategories,
                        )
                      }
                    ></input>
                  </>
                </div>

                {showPartCategories ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for interjections")}
                      value={partWordCategoryName}
                      onChange={(e) =>
                        handleWordCategoryName(e, setPartWordCategoryName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental category submission or page reload
                          addWordCategory(
                            partWordCategoryName,
                            setPartWordCategoryName,
                            "part",
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <button
                            onClick={() => addCategory(setPartCategories)}
                          >
                            {translate("Add Category")}
                          </button>

                          {partCategories.map((category, index) => (
                            <div key={index}>
                              <input
                                type="text"
                                placeholder={translate("Category {number}", {
                                  number: index + 1,
                                })}
                                value={category}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    partCategories,
                                    setPartCategories,
                                  )
                                }
                              />
                              <input
                                type="text"
                                placeholder={translate("abbreviation")}
                                value={partCategoryAbbreviations[index]}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    partCategoryAbbreviations,
                                    setPartCategoryAbbreviations,
                                  )
                                }
                              />
                              <button
                                onClick={() =>
                                  removeCategory(
                                    setPartCategories,
                                    setPartCategoryAbbreviations,
                                    index,
                                  )
                                }
                                className="btn-close btn-close-white extra-small-x-button"
                              ></button>
                            </div>
                          ))}
                        </div>

                        <button
                          className="word-form-input-button"
                          style={{ marginTop: "10px" }}
                          onClick={() =>
                            addWordCategory(
                              partWordCategoryName,
                              setInterjWordCategoryName,
                              "part",
                              partCategories,
                              setPartCategories,
                              partCategoryAbbreviations,
                              setPartCategoryAbbreviations,
                            )
                          }
                        >
                          {translate("Submit")}
                        </button>
                      </div>
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
                        handleShowCategories(
                          showAffixCategories,
                          setShowAffixCategories,
                        )
                      }
                    ></input>
                  </>
                </div>

                {showAffixCategories ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for affixes")}
                      value={affixWordCategoryName}
                      onChange={(e) =>
                        handleWordCategoryName(e, setAffixWordCategoryName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental category submission or page reload
                          addWordCategory(
                            affixWordCategoryName,
                            setAffixWordCategoryName,
                            "affix",
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <button
                            onClick={() => addCategory(setAffixCategories)}
                          >
                            {translate("Add Category")}
                          </button>

                          {affixCategories.map((category, index) => (
                            <div key={index}>
                              <input
                                type="text"
                                placeholder={translate("Category {number}", {
                                  number: index + 1,
                                })}
                                value={category}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    affixCategories,
                                    setAffixCategories,
                                  )
                                }
                              />
                              <input
                                type="text"
                                placeholder={translate("abbreviation")}
                                value={affixCategoryAbbreviations[index]}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    affixCategoryAbbreviations,
                                    setAffixCategoryAbbreviations,
                                  )
                                }
                              />
                              <button
                                onClick={() =>
                                  removeCategory(
                                    setAffixCategories,
                                    setAffixCategoryAbbreviations,
                                    index,
                                  )
                                }
                                className="btn-close btn-close-white extra-small-x-button"
                              ></button>
                            </div>
                          ))}
                        </div>

                        <button
                          className="word-form-input-button"
                          style={{ marginTop: "10px" }}
                          onClick={() =>
                            addWordCategory(
                              affixWordCategoryName,
                              setAffixWordCategoryName,
                              "part",
                              affixCategories,
                              setAffixCategories,
                              affixCategoryAbbreviations,
                              setAffixCategoryAbbreviations,
                            )
                          }
                        >
                          {translate("Submit")}
                        </button>
                      </div>
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
                        handleShowCategories(
                          showPronCategories,
                          setShowPronCategories,
                        )
                      }
                    ></input>
                  </>
                </div>

                {showPronCategories ? (
                  <>
                    <input
                      type="text"
                      placeholder={translate("add word form for pronouns")}
                      value={pronWordCategoryName}
                      onChange={(e) =>
                        handleWordCategoryName(e, setPronWordCategoryName)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // prevents accidental category submission or page reload
                          addWordCategory(
                            pronWordCategoryName,
                            setPronWordCategoryName,
                            "affix",
                          );
                        }
                      }}
                    />

                    <div className="button-container">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <button
                            onClick={() => addCategory(setPronCategories)}
                          >
                            Add Category
                          </button>

                          {pronCategories.map((category, index) => (
                            <div key={index}>
                              <input
                                type="text"
                                placeholder={translate("Category {number}", {
                                  number: index + 1,
                                })}
                                value={category}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    pronCategories,
                                    setPronCategories,
                                  )
                                }
                              />
                              <input
                                type="text"
                                placeholder={translate("abbreviation")}
                                value={pronCategoryAbbreviations[index]}
                                style={{ marginTop: "10px" }}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    index,
                                    e.target.value,
                                    pronCategoryAbbreviations,
                                    setPronCategoryAbbreviations,
                                  )
                                }
                              />
                              <button
                                onClick={() =>
                                  removeCategory(
                                    setPronCategories,
                                    setPronCategoryAbbreviations,
                                    index,
                                  )
                                }
                                className="btn-close btn-close-white extra-small-x-button"
                              ></button>
                            </div>
                          ))}
                        </div>

                        <button
                          className="word-form-input-button"
                          style={{ marginTop: "10px" }}
                          onClick={() =>
                            addWordCategory(
                              pronWordCategoryName,
                              setAffixWordCategoryName,
                              "pron",
                              pronCategories,
                              setPronCategories,
                              pronCategoryAbbreviations,
                              setPronCategoryAbbreviations,
                            )
                          }
                        >
                          {translate("Submit")}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              {wordCategories.length > 0 ? (
                <div className="thin-white-border">
                  <p>{translate("Added Word Categories")}</p>

                  <div className="word-form-container">
                    {wordCategories.map((wordCategory, index) => (
                      <div className="word-form-list" key={index}>
                        <b>{wordCategory.name}</b>:{" "}
                        {wordCategory.categories.abbreviation.join(", ")}
                        <button
                          onClick={() => removeWordCategory(index)}
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

        <button onClick={deleteGroup} className="delete-button">
          {translate("Delete {name}", { name })}
        </button>
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

export default EditGroupModal;
