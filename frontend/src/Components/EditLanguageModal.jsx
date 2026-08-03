import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import LanguageSelector from "./languageSelector";
import GroupSelector from "./groupSelector";
import MyEditor from "../vendor/ckEditor-build/App.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import SoundChangeMaker from "./soundChangeMaker";
import Collapsible from "./collapsable.jsx";
import SpellingCreator from "./spellingCreator.jsx";
import { IPAkeyboard } from "./IPAkeyboard.jsx";
import {
  getDaughterLanguages,
  getMotherLanguage,
  getLanguage,
  getWordForms,
  deleteLanguage
} from "../services/languageService.js";

const EditLanguageModal = ({
  show,
  setShow,
  name,
  id,
  triggerRefresh,
  is_proto,
  onSuccess,
}) => {
  const { translate } = useTranslate();

  const [languageName, setLanguageName] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const [daughterLanguages, setDaughterLanguages] = useState([]);
  const [selectedParentLanguage, setSelectedParentLanguage] = useState(null);
  const [removedDaughterLanguages, setRemovedDaughterLanguages] = useState([]);
  const [isProto, setIsProto] = useState();
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
  const [showCliticForms, setShowCliticForms] = useState(false);
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
  const [cliticWordFormName, setCliticWordFormName] = useState();
  const [addedGroups, setAddedGroups] = useState([]);
  const [language, setLanguage] = useState();
  const [preexistingGroups, setPreexistingGroups] = useState([]);
  const [groupsToBeRemoved, setGroupsToBeRemoved] = useState([]);
  const [newGroups, setNewGroups] = useState([]);
  const [owner, setOwner] = useState();
  const [userSearch, setUserSearch] = useState();
  const [userSearchError, setUserSearchError] = useState(false);
  const [noMatchingUsername, setNoMatchingUsername] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [tagGroupName, setTagGroupName] = useState();
  const [tagName, setTagName] = useState();
  const [tags, setTags] = useState([]);
  const [tagGroup, setTagGroup] = useState([]);
  const [addedTagGroups, setAddedTagGroups] = useState([]);
  const [motherSpellings, setMotherSpellings] = useState({})
  const [defaultTag, setDefaultTag] = useState(0);

  const [convertIPA, setConvertIPA] = useState(false);

  const [spellings, setSpellings] = useState([]);
  const [selectedSoundChanges, setSelectedSoundChanges] = useState([]);
  const [allCategoryValues, setAllCategoryValues] = useState({});
  const [prosodyType, setProsodyType] = useState("stress");
  const page = "languageModal";

  

  useEffect(() => {
    setIsProto(is_proto);
  }, [is_proto]);

  useEffect(() => {
    const getLanguages = async () => {
      const data = await window.electron.getDaughterLanguages(id);
      setDaughterLanguages(data);
    };
    getLanguages();
  }, [id]);

  

  useEffect(() => {
    const fetchLanguage = async () => {


        
      const Motherdata = await window.electron.getMotherLanguage(id);
      setSelectedParentLanguage(Motherdata[0]);
      setMotherSpellings(Motherdata[0].spelling)
    


      const data = await window.electron.getLanguage(id);

      setLanguage(data[0]);
      setSelectedSoundChanges(data[0].sound_changes ?? []);
      setSpellings(data[0].spelling ? data[0].spelling : Motherdata[0].spelling ? Motherdata[0].spelling : []);
      setOwner(data[0].user_id);
      setAddedTagGroups(data[0].tags ? data[0].tags : []);
      setConvertIPA(data[0].convert_ipa === 1 ? true : false)
      if (data[0].groups) {
        setAddedGroups(data[0].groups);
        setPreexistingGroups(data[0].groups);
      }
    };
    fetchLanguage();
  }, [id]);

  useEffect(() => {
    setLanguageName(name);
  }, [name]);

  const getWordForms = async () => {
    const data = await window.electron.getWordForms();
    setWordForms(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    getWordForms();
  }, [id]);

  const showToast = (message) => {
    const toastContainer = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className =
      "toast align-items-center text-white bg-success border-0 show";
    toast.role = "alert";
    toast.ariaLive = "assertive";
    toast.ariaAtomic = "true";

    toast.innerHTML = `
      <div className="d-flex">
        <div className="toast-body">
          ${message}
        </div>
        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
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
    if (!languageName) {
      setShowWarning(true);
      return;
    }

    try {

      const motherLanguageId = selectedParentLanguage ? selectedParentLanguage.language_id : null;
      const daughterLanguageIds = daughterLanguages.map((lang) => lang.language_id);
      const soundChanges = selectedSoundChanges ? selectedSoundChanges : null;
      

      const data = await window.electron.editLanguage(
        id,
        languageName,
        JSON.stringify(motherLanguageId),
        JSON.stringify(daughterLanguageIds),
        JSON.stringify(removedDaughterLanguages),
        JSON.stringify(isProto),
        JSON.stringify(wordForms),
        JSON.stringify(addedGroups),
        JSON.stringify(groupsToBeRemoved),
        JSON.stringify(newGroups),
        JSON.stringify(addedTagGroups),
        JSON.stringify(spellings),
        JSON.stringify(selectedSoundChanges),
        JSON.stringify(allCategoryValues),
        convertIPA
      );

      
      if (!data.success) {
        console.error(`Errorediting language`);
      } else {
        if (typeof onSuccess === "function") {
          await onSuccess();
        }

        if (typeof triggerRefresh === "function") {
          triggerRefresh();
        }
        close();

        showToast("Changes saved ✅");
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  const close = () => {
    setShow(false);
  };

  const handleParentLanguageSelect = (language) => {
    setSelectedParentLanguage(language);
  };

  const removeParentLanguage = () => {
    setSelectedParentLanguage(null);
  };

  const handleDaughterLanguageSelect = (language) => {
    setDaughterLanguages((prev) => [...prev, language]);
  };

  const removeDaughterLanguage = (id) => {
    const temp = daughterLanguages.filter(
      (language) => language.language_id !== id,
    );
    setDaughterLanguages(temp);
    setRemovedDaughterLanguages((prev) => [...prev, id]);
  };

  const toggleProto = () => {
    if (isProto) {
      setIsProto(false);
    } else {
      setIsProto(true);
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

  const removeCollaborator = (indexToRemove) => {
    setCollaborators((prevForms) =>
      prevForms.filter((_, i) => i !== indexToRemove),
    );
  };

  const handleGroupSelect = (group) => {
    // Ensure group.languages is an array (even if it's null or undefined)
    if (!Array.isArray(group.languages)) {
      group.languages = [];
    }

    // Add the language object to the array
    group.languages.push(language);

    // Add the updated group to addedGroups
    setAddedGroups((prev) => [...prev, group]);

    //if group is not in preExistingGroup, add to newgroups
    if (!preexistingGroups.includes(group)) {
      setNewGroups((prev) => [...prev, group]);
    }
  };

  const clearAddedGroups = () => {
    setAddedGroups([]);
  };

  const removeGroup = (id) => {
    const tempGroups = addedGroups.filter((grp) => grp.group_id !== id);
    const tempGroups2 = preexistingGroups.filter((grp) => grp.group_id === id);
    setAddedGroups(tempGroups);
    setGroupsToBeRemoved(tempGroups2);
  };


  const deleteLang = async () => {
    const data = await window.electron.deleteLanguage(language.language_id)

    if (data.success) {
      if (typeof triggerRefresh === "function") {
        triggerRefresh();
      }
      close();
      showDeleteToast("Language deleted ✅");
    }
  };

  const addTagGroup = () => {

    if (tagGroupName) {
      const tag = {
        name: tagGroupName,
        tags: tags,
        defaultTag: defaultTag
      };
      setAddedTagGroups((prev) => [...prev, tag]);
      setTagGroupName("");
      setTagGroup([]);
      setTags([]);
    }
  };

  const addTag = (setTags) => {
    setTags((prev) => [...prev, ""]);
  };

  const handleTagChange = (index, value, tags, setTags) => {
    const updated = [...tags];
    updated[index] = value;
    setTags(updated);
  };

  const removeTag = (setTag, indexToRemove) => {
    setTag((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const removeTagGroup = (indexToRemove) => {
    setAddedTagGroups((prevForms) =>
      prevForms.filter((_, i) => i !== indexToRemove),
    );
  };

  /***FOR SOUND CHANGE MAKER */

  const handleCategoryValuesChange = (values, setValues) => {
    setAllCategoryValues(values);
  };

  /*************************** */

  function handleConvertIPA() {
    if (convertIPA) {
      setConvertIPA(false)
    } else {
      setConvertIPA(true)
    }
  }

  return (
    <Modal show={show} onHide={close} backdrop={true}>
      <Modal.Header closeButton>
        <Modal.Title>
          {translate("Edit {languageName}", { languageName })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-modal">
          <div>
            <input
              type="text"
              className="thin-white-border"
              placeholder={translate("Language Name")}
              value={languageName}
              style={{ padding: "5px" }}
              onChange={(e) => setLanguageName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  save();
                }
              }}
            ></input>
            {showWarning && !languageName ? (
              <p className="warning">
                {translate("Please enter the language's name!")}
              </p>
            ) : (
              <></>
            )}

            {!selectedParentLanguage ? (
              <div
                style={{
                  marginTop: "10px",
                }}
                className="thin-white-border"
              >
                <span style={{ marginRight: "5px", fontWeight: "600" }}>
                  {translate("Assign Parent Language")}
                </span>
                <LanguageSelector
                  id={id}
                  onLanguageSelect={handleParentLanguageSelect}
                />
              </div>
            ) : (
              <></>
            )}

            {selectedParentLanguage ? (
              <>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignContent: "center",
                  }}
                  className="thin-white-border"
                >
                  <span>
                    <span style={{ fontWeight: "600" }}>
                      {translate("Parent Language")}
                    </span>
                    : {selectedParentLanguage.language_name}
                  </span>{" "}
                  <button
                    className="btn-close btn-close-white small-x-button"
                    aria-label="Close"
                    onClick={removeParentLanguage}
                  ></button>
                </div>

                <Collapsible title={translate("Orthography")}>
                  <div className="thin-white-border">
                    <SpellingCreator
                      spellings={spellings}
                      setSpellings={setSpellings}
                    />
                  </div>
                </Collapsible>

                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignContent: "center",
                  }}
                >
                  <Collapsible title={"Sound Changes Applier"}>
                    <SoundChangeMaker
                      handleCategoryValuesChange={handleCategoryValuesChange}
                      soundChangeOrPhonotactic={"sound-change"}
                      spellings={spellings}
                      selectedSoundChanges={selectedSoundChanges}
                      setSelectedSoundChanges={setSelectedSoundChanges}
                      allCategoryValues={allCategoryValues}
                      prosodyType={prosodyType}
                      setProsodyType={setProsodyType}
                      page={page}
                    />
                  </Collapsible>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="thin-white-border">
              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <span style={{ marginRight: "5px", fontWeight: "600" }}>
                  {translate("Assign New Daughter Language")}
                </span>
                <LanguageSelector
                  id={id}
                  onLanguageSelect={handleDaughterLanguageSelect}
                />
              </div>

              <p
                style={{
                  marginTop: "20px",
                  marginBottom: "-3px",
                  fontWeight: "600",
                }}
              >
                {translate("Daughter Languages")}
              </p>
              <ol>
                {daughterLanguages.map((language, index) => (
                  <div style={{ display: "flex", alignContent: "center" }}>
                    <li key={index}>{language.language_name} </li>
                    <button
                      className="btn-close btn-close-white small-x-button"
                      aria-label="Close"
                      onClick={() =>
                        removeDaughterLanguage(language.language_id)
                      }
                    ></button>
                  </div>
                ))}
              </ol>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="thin-white-border">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <label style={{ marginRight: "5px", fontWeight: "600" }}>
                    {translate("{name} is a proto-language", { name })}
                  </label>
                  <input
                    type="checkbox"
                    id="proto"
                    onChange={toggleProto}
                    checked={isProto}
                  ></input>
                </div>
                <p>
                  <i>
                    {translate(
                      "This will automatically prefix * before all words in {name}",
                    )}
                  </i>
                </p>
              </div>

              <div className="thin-white-border">
                    <label style={{ marginRight: "5px", fontWeight: "600" }}>
                    {translate("IPA Conversion")}
                  </label>
                    <input
                    type="checkbox"
                    id="convert_ipa"
                    onChange={handleConvertIPA}
                    checked={convertIPA}
                  ></input>
                    <p>{translate("Automatically convert IPA transcriptions into spelled headwords")}</p>
              </div>

              <div className="thin-white-border">
                <b>{translate("Groups")}</b>
                <p>
                  <i>
                    {translate(
                      "Assign {languageName} to a language family, sprachbund etc",
                      { languageName },
                    )}
                  </i>
                </p>
                <div className="thin-white-border">
                  <span style={{ marginRight: "5px", fontWeight: "600" }}>
                    {translate("Assign Group")}
                  </span>
                  <GroupSelector id={id} onGroupSelect={handleGroupSelect} />
                </div>

                <div className="thin-white-border" style={{ height: "200px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        lineHeight: "1",
                      }}
                    >
                      {translate("Assigned Groups")}
                    </span>
                    <button
                      style={{
                        marginLeft: "10px",
                        padding: "4px 8px",
                        fontSize: "16px",
                        lineHeight: "1",
                        borderRadius: "5px",
                      }}
                      onClick={clearAddedGroups}
                    >
                      {translate("Clear All")}
                    </button>
                  </div>

                  <div className="word-form-container">
                    {addedGroups.map((group, index) => (
                      <div
                        className="word-form-list"
                        style={{ display: "flex", alignContent: "center" }}
                      >
                        <div key={index}>{group.group_name} </div>
                        <button
                          className="btn-close btn-close-white small-x-button"
                          aria-label="Close"
                          onClick={() => removeGroup(group.group_id)}
                        ></button>
                      </div>
                    ))}
                  </div>
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
                        placeholder={translate(
                          "add word form for conjunctions",
                        )}
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
                        placeholder={translate(
                          "add word form for interjections",
                        )}
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
                      <label htmlFor="clitic" style={{ marginRight: "5px" }}>
                        {translate("Clitic")}
                      </label>
                      <input
                        type="checkbox"
                        id="affix"
                        onChange={() =>
                          handleShowForms(showCliticForms, setShowCliticForms)
                        }
                      ></input>
                    </>
                  </div>

                  {showCliticForms ? (
                    <>
                      <input
                        type="text"
                        placeholder={translate("add word form for clitics")}
                        value={cliticWordFormName}
                        onChange={(e) =>
                          handleWordFormName(e, setCliticWordFormName)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // prevents accidental form submission or page reload
                            addWordForm(
                              cliticWordFormName,
                              setCliticWordFormName,
                              "clitic",
                            );
                          }
                        }}
                      />

                      <div className="button-container">
                        <button
                          className="word-form-input-button"
                          onClick={() =>
                            addWordForm(
                              cliticWordFormName,
                              setCliticWordFormName,
                              "clitic",
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

                {wordForms && wordForms.length > 0 ? (
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
                <b>{translate("Tags")}</b>

                <br />

                <p>{translate("A tag can be assigned to a word for a variety of purposes, such a tracking which percentage of a language's vocabulary comes from loans of various sources.")}</p>

                <div style={{display:"flex", flexDirection:"column"}}>
                  <input
                    type="text"
                    placeholder={translate("Enter tag group name")}
                    style={{ marginTop: "10px" }}
                    value={tagGroupName}
                    onChange={(e) => setTagGroupName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // prevents accidental form submission or page reload
                        addTag(setTags);
                      }
                    }}
                  />

                  <button
                    style={{ height: "40px", width: "200px" }}
                    onClick={() => addTag(setTags)}
                  >
                    {translate("Add Tag")}
                  </button>
                </div>

                <div className="button-container">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      {tags.map((tag, index) => (
                        <div key={index}>
                          <input
                            type="text"
                            placeholder={translate("Tag {number}", {
                              number: index + 1,
                            })}
                            value={tag}
                            style={{ marginTop: "10px" }}
                            onChange={(e) =>
                              handleTagChange(
                                index,
                                e.target.value,
                                tags,
                                setTags,
                              )
                            }
                          />

                          <input 
                          style={{marginLeft:"5px"}}
                          type="radio" 
                          value={translate("set as default tag")}
                          onChange={() => setDefaultTag(index)}
                          checked={index === defaultTag ? true : false}
                          />

                          <span style={{marginLeft:"5px"}}>{translate("default tag")}</span>

                          <button
                            onClick={() => removeTag(setTags, index)}
                            className="btn-close btn-close-white extra-small-x-button"
                          ></button>
                        </div>
                      ))}
                    </div>

                    <button
                      className="word-form-input-button"
                      style={{ marginTop: "10px", width: "fit-content" }}
                      onClick={() =>
                        addTagGroup(tagName, setTagName, tags, setTags, defaultTag)
                      }
                    >
                      {translate("Submit Tag Group")}
                    </button>
                  </div>
                </div>

                {addedTagGroups.length > 0 ? (
                  <div className="thin-white-border">
                    <p>{translate("Added Tag Groups")}</p>

                    <div className="word-form-container">
                      {addedTagGroups.map((tagGroup, index) => (
                        <div className="word-form-list" key={index}>
                          <b>{tagGroup.name}</b>: {tagGroup.tags.join(", ")}
                          <button
                            onClick={() => removeTagGroup(index)}
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
                <button onClick={deleteLang} className="delete-button">
                  {translate("Delete {name}", { name })}
                </button>
             
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

export default EditLanguageModal;
