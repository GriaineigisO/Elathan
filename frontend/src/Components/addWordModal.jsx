import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import MyEditor from "../vendor/ckEditor-build/App.jsx";
import { PopulateThesaurusList } from "../Functions/thesaurusList.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import WordSelector from "./wordSelector";
import LanguageSelector from "./languageSelector";
import React from "react";
import Collapsible from "./collapsable.jsx";

const AddWordModal = ({ show, setShow, languageId, onSuccess }) => {
  const { translate } = useTranslate();
  const [word, setWord] = useState("");
  const [showWordWarning, setShowWordWarning] = useState(false);

  const [shownParts, setShownParts] = useState({});
  const [meaningStrings, setMeaningStrings] = useState({});

  const [selectedOption, setSelectedOption] = useState("none");
  const [wordType, setWordType] = useState("word");
  const [wordForms, setWordForms] = useState([]);
  const [wordFormInputs, setWordFormInputs] = useState();
  const [adjWordFormInputs, setAdjWordFormInputs] = useState([]);
  const [nounWordFormInputs, setNounWordFormInputs] = useState([]);
  const [numWordFormInputs, setNumWordFormInputs] = useState([]);
  const [verbWordFormInputs, setVerbWordFormInputs] = useState([]);
  const [advWordFormInputs, setAdvWordFormInputs] = useState([]);
  const [adpWordFormInputs, setAdpWordFormInputs] = useState([]);
  const [partWordFormInputs, setPartWordFormInputs] = useState([]);
  const [conjWordFormInputs, setConjWordFormInputs] = useState([]);
  const [interjWordFormInputs, setInterjWordFormInputs] = useState([]);
  const [affixWordFormInputs, setAffixWordFormInputs] = useState([]);
  const [cliticWordFormInputs, setCliticWordFormInputs] = useState([]);
  const [pronWordFormInputs, setPronWordFormInputs] = useState([]);

  const [wordCategories, setWordCategories] = useState([]);
  const [wordCategoryInputs, setWordCategoryInputs] = useState();
  const [adjWordCategoryInputs, setAdjWordCategoryInputs] = useState([]);
  const [nounWordCategoryInputs, setNounWordCategoryInputs] = useState([]);
  const [numWordCategoryInputs, setNumWordCategoryInputs] = useState([]);
  const [verbWordCategoryInputs, setVerbWordCategoryInputs] = useState([]);
  const [advWordCategoryInputs, setAdvWordCategoryInputs] = useState([]);
  const [adpWordCategoryInputs, setAdpWordCategoryInputs] = useState([]);
  const [partWordCategoryInputs, setPartWordCategoryInputs] = useState([]);
  const [conjWordCategoryInputs, setConjWordCategoryInputs] = useState([]);
  const [interjWordCategoryInputs, setInterjWordCategoryInputs] = useState([]);
  const [affixWordCategoryInputs, setAffixWordCategoryInputs] = useState([]);
  const [cliticWordCategoryInputs, setCliticWordCategoryInputs] = useState([]);
  const [pronWordCategoryInputs, setPronWordCategoryInputs] = useState([]);

  const [nounCategorySelections, setNounCategorySelections] = useState([]);
  const [numCategorySelections, setNumCategorySelections] = useState([]);
  const [verbCategorySelections, setVerbCategorySelections] = useState([]);
  const [adjCategorySelections, setAdjCategorySelections] = useState([]);
  const [advCategorySelections, setAdvCategorySelections] = useState([]);
  const [adpCategorySelections, setAdpCategorySelections] = useState([]);
  const [conjCategorySelections, setConjCategorySelections] = useState([]);
  const [partCategorySelections, setPartCategorySelections] = useState([]);
  const [interjCategorySelections, setInterjCategorySelections] = useState([]);
  const [pronCategorySelections, setPronCategorySelections] = useState([]);
  const [affixCategorySelections, setAffixCategorySelections] = useState([]);
  const [cliticCategorySelections, setCliticCategorySelections] = useState([]);

  const [tagGroups, setTagGroups] = useState([]);
  const [tagInputs, setTagInputs] = useState([]);
  const [initializedGroups, setInitializedGroups] = useState([]);

  const [pronunciation, setPronunciation] = useState();
  const [note, setNote] = useState();
  const [variants, setVariants] = useState();
  const [selectedTerms, setSelectedTerms] = useState({});

  const [partsOfSpeech, setPartsOfSpeech] = useState([
    { id: "noun", label: translate("Noun") },
    { id: "verb", label: translate("Verb") },
    { id: "adj", label: translate("Adjective") },
    { id: "num", label: translate("Number") },
    { id: "adv", label: translate("Adverb") },
    { id: "adp", label: translate("Adposition") },
    { id: "conj", label: translate("Conjunction") },
    { id: "part", label: translate("Particle") },
    { id: "interj", label: translate("Interjection") },
    { id: "pron", label: translate("Pronoun") },
  ]);

  const [languageName, setLanguageName] = useState();
  const [selectedParentLanguage, setSelectedParentLanguage] = useState(null);
  const [selectedEtymOption, setSelectedEtymOption] = useState();
  const [selectedMotherLanguageWord, setSelectedMotherLanguageWord] =
    useState();
  const [etymNote, setEtymNote] = useState();
  const [firstElementId, setFirstElementId] = useState();
  const [secondElementId, setSecondElementId] = useState();
  const [thirdElementId, setThirdElementId] = useState();
  const [loanerLanguage, setLoanerLanguage] = useState();
  const [loanWord, setLoanWord] = useState();
  const [showLoanWordWarning, setShowLoanWordWarning] = useState(false);

  useEffect(() => {
    if (!languageId) return;

    const load = async () => {
      const [languageRes, motherRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getLanguageName`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ languageId: Number(languageId) }),
        }),
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getMotherLanguage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: Number(languageId) }),
        }),
      ]);

      const languageData = await languageRes.json();
      const motherData = await motherRes.json();

      setLanguageName(languageData.language_name);
      setSelectedParentLanguage(motherData[0] ?? null);
    };

    load();
  }, [languageId]);

  const handleMotherLanguageWordSelect = (word) => {
    setSelectedMotherLanguageWord(word);
  };

  const handleLoanerLanguage = (word) => {
    setLoanerLanguage(word);
  };

  const handleFirstElement = (word) => {
    setFirstElementId(word.word_id);
  };

  const handleSecondElement = (word) => {
    setSecondElementId(word.word_id);
  };

  const handleThirdElement = (word) => {
    setThirdElementId(word.word_id);
  };

  const handleLoanWord = (word) => {
    setLoanWord(word);
  };

  const handleOptionChange = (e) => {
    setSelectedEtymOption(e.target.value);
  };

  const removeLoanerLanguage = () => {
    setLoanerLanguage(null);
  };

  //END-ETYMOLOGY

  const resetState = () => {
    setWord("");
    setShowWordWarning(false);
    setShownParts({});
    setMeaningStrings({});
    setSelectedOption("none");
    setWordType("word");

    setWordFormInputs(undefined);
    setAdjWordFormInputs([]);
    setNounWordFormInputs([]);
    setNumWordFormInputs([]);
    setVerbWordFormInputs([]);
    setAdvWordFormInputs([]);
    setAdpWordFormInputs([]);
    setPartWordFormInputs([]);
    setConjWordFormInputs([]);
    setInterjWordFormInputs([]);
    setAffixWordFormInputs([]);
    setCliticWordFormInputs([]);
    setPronWordFormInputs([]);

    setWordCategoryInputs(undefined);
    setAdjWordCategoryInputs([]);
    setNounWordCategoryInputs([]);
    setNumWordCategoryInputs([]);
    setVerbWordCategoryInputs([]);
    setAdvWordCategoryInputs([]);
    setAdpWordCategoryInputs([]);
    setPartWordCategoryInputs([]);
    setConjWordCategoryInputs([]);
    setInterjWordCategoryInputs([]);
    setAffixWordCategoryInputs([]);
    setCliticWordCategoryInputs([]);
    setPronWordCategoryInputs([]);

    setNounCategorySelections([]);
    setNumCategorySelections([]);
    setVerbCategorySelections([]);
    setAdjCategorySelections([]);
    setAdvCategorySelections([]);
    setAdpCategorySelections([]);
    setConjCategorySelections([]);
    setPartCategorySelections([]);
    setInterjCategorySelections([]);
    setPronCategorySelections([]);
    setAffixCategorySelections([]);
    setCliticCategorySelections([]);

    setTagInputs([]);
    setInitializedGroups([]);
    setPronunciation("");
    setNote("");
    setVariants("");
  };

  const togglePart = (id) => {
    //show or hide input
    setShownParts((prev) => ({ ...prev, [id]: !prev[id] }));

    //delete any inputted text if input is hidden
    setMeaningStrings((prev) => ({ ...prev, [id]: "" }));
  };

  const handleMeaningChange = (id, value) => {
    
    setMeaningStrings((prev) => ({ ...prev, [id]: value }));
  };

  const handleWordType = (event) => {
    setWordType(event.target.value);
    if (event.target.value === "prefix" || event.target.value === "suffix") {
      togglePart("affix");
      setPartsOfSpeech((prev) => {
        const withoutClitic = prev.filter((item) => item.label !== "Clitic");
        const hasAffix = withoutClitic.some((item) => item.label === "Affix");
        if (!hasAffix) {
          return [...withoutClitic, { id: "affix", label: "Affix" }];
        }
        return withoutClitic;
      });
    } else if (
      event.target.value === "proclitic" ||
      event.target.value === "enclitic"
    ) {
      togglePart("clitic");
      setPartsOfSpeech((prev) => {
        const withoutAffix = prev.filter((item) => item.label !== "Affix");
        const hasClitic = withoutAffix.some((item) => item.label === "Clitic");
        if (!hasClitic) {
          return [...withoutAffix, { id: "clitic", label: "Clitic" }];
        }
        return withoutAffix;
      });
    } else {
      const filtered = partsOfSpeech.filter(
        (part) => part.id !== "clitic" || part.id !== "clitic",
      );
      setPartsOfSpeech(filtered);
    }
  };

  const makeMeaningArrays = () => {
    const result = {};
    for (const part of partsOfSpeech) {
      const str = meaningStrings[part.id];
      if (str) {
        result[part.id] = str.split(",").map((w) => w.trim());
      }
    }
    return result;
  };

  const getWordForms = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getWordForms`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ languageId }),
      },
    );
    const data = await response.json();

    const unique = data.filter(
      (item, index, self) =>
        index ===
        self.findIndex((t) => t.name === item.name && t.type === item.type),
    );
    setWordForms(unique);
  };

  useEffect(() => {
    getWordForms();
  }, []);

  const getWordCategories = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getWordCategories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ languageId }),
      },
    );
    const data = await response.json();
    setWordCategories(data);
  };

  useEffect(() => {
    getWordCategories();
  }, []);

  useEffect(() => {
    if (!wordCategories || wordCategories.length === 0) return;

    const setterMap = {
      noun: [setNounCategorySelections, setNounWordCategoryInputs],
      verb: [setVerbCategorySelections, setVerbWordCategoryInputs],
      adj: [setAdjCategorySelections, setAdjWordCategoryInputs],
      num: [setNumCategorySelections, setNumWordCategoryInputs],
      adv: [setAdvCategorySelections, setAdvWordCategoryInputs],
      adp: [setAdpCategorySelections, setAdpWordCategoryInputs],
      conj: [setConjCategorySelections, setConjWordCategoryInputs],
      part: [setPartCategorySelections, setPartWordCategoryInputs],
      interj: [setInterjCategorySelections, setInterjWordCategoryInputs],
      pron: [setPronCategorySelections, setPronWordCategoryInputs],
      affix: [setAffixCategorySelections, setAffixWordCategoryInputs],
      clitic: [setCliticCategorySelections, setCliticWordCategoryInputs],
    };

    Object.entries(setterMap).forEach(([type, [setSelections, setInputs]]) => {
      const filtered = wordCategories
        .flatMap((wc) => wc.word_categories)
        .filter((cat) => cat.type === type);

      const initialSelections = filtered.map((cat) => cat.categories.name[0]);
      const initialInputs = filtered.map((cat) => ({
        category_name: cat.name,
        category_type: cat.categories.name[0],
        abbreviation: cat.categories.abbreviation[0],
      }));

      setSelections(initialSelections);
      setInputs(initialInputs);
    });
  }, [wordCategories]);

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
    if (!word) {
      setShowWordWarning(true);
      return;
    }

    if (selectedOption === "loaned" && !loanWord) {
      setShowLoanWordWarning(true); // trigger render
      return;
    }

    setShowLoanWordWarning(false); // clear warning if proceeding

    const userId = localStorage.getItem("userId");

    const date = new Date();
    const wordId = Date.now();

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/addWord`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          wordId,
          userId,
          languageId,
          word,
          meanings: makeMeaningArrays(),
          wordType: wordType,
          note: note,
          pronunciation: pronunciation,
          adjWordFormInputs: adjWordFormInputs,
          nounWordFormInputs: nounWordFormInputs,
          numWordFormInputs: numWordFormInputs,
          verbWordFormInputs: verbWordFormInputs,
          advWordFormInputs: advWordFormInputs,
          adpWordFormInputs: adpWordFormInputs,
          partWordFormInputs: partWordFormInputs,
          conjWordFormInputs: conjWordFormInputs,
          interjWordFormInputs: interjWordFormInputs,
          affixWordFormInputs: affixWordFormInputs,
          cliticWordFormInputs: cliticWordFormInputs,
          pronWordFormInputs: pronWordFormInputs,

          adjWordCategoryInputs: adjWordCategoryInputs,
          nounWordCategoryInputs: nounWordCategoryInputs,
          numWordCategoryInputs: numWordCategoryInputs,
          verbWordCategoryInputs: verbWordCategoryInputs,
          advWordCategoryInputs: advWordCategoryInputs,
          adpWordCategoryInputs: adpWordCategoryInputs,
          partWordCategoryInputs: partWordCategoryInputs,
          conjWordCategoryInputs: conjWordCategoryInputs,
          interjWordCategoryInputs: interjWordCategoryInputs,
          affixWordCategoryInputs: affixWordCategoryInputs,
          cliticWordCategoryInputs: cliticWordCategoryInputs,
          pronWordCategoryInputs: pronWordCategoryInputs,
          tagInputs: tagInputs,
          variants,
          thesaurusDomains: selectedTerms,
        }),
      },
    );

    if (response.status !== 200) {
      console.error(`Error ${response.status}`);
    }

    if (response.ok) {
      if (selectedEtymOption) {
        try {
          
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/addEtymology`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                languageId,
                word_id: wordId,
                etymologyType: selectedEtymOption,
                motherWord: selectedMotherLanguageWord,
                firstElementId: firstElementId,
                secondElementId: secondElementId,
                thirdElementId: thirdElementId,
                loanWordId: loanWord ? loanWord.word_id : null,
                note: etymNote,
              }),
            },
          );

          const data = await response.json();

          if (response.ok) {
            showToast("Changes saved ✅");
            if (onSuccess) onSuccess(); // trigger parent's refresh
            close();
            //now reset all input values
            resetState();
          }
        } catch (error) {
          console.error("Fetch failed:", error);
        }
      } else {
        showToast(translate("Changes saved"));
        if (onSuccess) onSuccess(); // trigger parent's refresh
        close();
        //now reset all input values
        resetState();
      }
    }
  };

  const close = () => {
    setShow(false);
  };

  const handleWordFormInput = (e, name, type, index) => {
    const value = e.target.value || "";

    const setMap = {
      noun: setNounWordFormInputs,
      num: setNumWordFormInputs,
      verb: setVerbWordFormInputs,
      adj: setAdjWordFormInputs,
      adv: setAdvWordFormInputs,
      adp: setAdpWordFormInputs,
      conj: setConjWordFormInputs,
      part: setPartWordFormInputs,
      interj: setInterjWordFormInputs,
      pron: setPronWordFormInputs,
      affix: setAffixWordFormInputs,
      clitic: setCliticWordFormInputs,
    };

    const updater = setMap[type];
    if (!updater) return;

    updater((prev) => {
      const updated = [...prev];
      updated[index] = { name, word: value, type };
      return updated;
    });
  };

  const handleWordCategoryInput = (
    e,
    categoryName,
    type,
    index,
    selectedName,
    abbreviation,
  ) => {
    const setMap = {
      noun: setNounWordCategoryInputs,
      num: setNumWordCategoryInputs,
      verb: setVerbWordCategoryInputs,
      adj: setAdjWordCategoryInputs,
      adv: setAdvWordCategoryInputs,
      adp: setAdpWordCategoryInputs,
      conj: setConjWordCategoryInputs,
      part: setPartWordCategoryInputs,
      interj: setInterjWordCategoryInputs,
      pron: setPronWordCategoryInputs,
      affix: setAffixWordCategoryInputs,
      clitic: setCliticWordCategoryInputs,
    };

    const updater = setMap[type];
    if (!updater) return;

    updater((prev) => {
      const updated = [...prev];
      updated[index] = {
        category_name: categoryName,
        category_type: selectedName,
        abbreviation: abbreviation,
      };
      return updated;
    });
  };

  const getTags = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getTags`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ languageId }),
      },
    );
    const data = await response.json();
    setTagGroups(data[0].tags);
  };

  useEffect(() => {
    getTags();
  }, [languageId]);

  const handleTagSelect = (selectedValue, group, setTagState) => {
    setTagState((prev) => {
      const updated = [...prev];
      const existingIndex = updated.findIndex(
        (entry) => entry.name === group.name,
      );

      const newEntry = {
        category_name: group.name,
        category_type: selectedValue,
      };

      if (existingIndex !== -1) {
        updated[existingIndex] = { ...updated[existingIndex], ...newEntry };
      } else {
        updated.push(newEntry);
      }

      return updated;
    });
  };

  const handleTagInput = (tagName, index, selectedTag) => {
    setTagInputs((prev) => {
      const updated = [...prev];
      updated[index] = {
        name: tagName,
        tag: selectedTag,
      };
      return updated;
    });
  };

  useEffect(() => {
    tagGroups.forEach((group, index) => {
      const alreadyInitialized = initializedGroups.includes(group.name);
      const hasStoredValue = !!group.category_type;

      if (!hasStoredValue && !alreadyInitialized && group.tags.length > 0) {
        const defaultTag = group.tags[0];

        handleTagSelect(defaultTag, group, setTagGroups);
        handleTagInput(group.name, index, defaultTag);

        // Prevent re-initializing on future re-renders
        setInitializedGroups((prev) => [...prev, group.name]);
      }
    });
  }, [tagGroups]);

  const handleVariants = (vars) => {
    setVariants(vars);
  };

  return (
    <Modal
      show={show}
      onHide={close}
      size="lg"
      backdrop={true}
      dialogClassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>{translate("Add New Word")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="thin-white-border">
          <h4>{translate("Word Type")}</h4>
          <select value={wordType} onChange={handleWordType}>
            <option value="word">{translate("word")}</option>
            <option value="prefix">{translate("prefix")}</option>
            <option value="suffix">{translate("suffix")}</option>
            <option value="proclitic">{translate("proclitic")}</option>
            <option value="enclitic">{translate("enclitic")}</option>
             <option value="place_name">{translate("place name")}</option>
              <option value="personal_name">{translate("personal name")}</option>
          </select>
        </div>

        <div className="thin-white-border">
          <h4>{translate("Enter Word")}</h4>
          <input
            type="text"
            className="modal-input"
            placeholder={translate("word")}
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                save();
              }
            }}
          />
        </div>

        {showWordWarning && !word && (
          <p className="warning">{translate("Please enter a word")}</p>
        )}

        <div className="thin-white-border">
          <h4>{translate("Pronunciation")}</h4>
          <input onChange={(e) => setPronunciation(e.target.value)}></input>
        </div>

        <div className="thin-white-border">
          <h4>{translate("Word Categories")}</h4>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {shownParts["noun"] &&
              wordCategories
                .flatMap((wordCategory) => wordCategory.word_categories)
                .filter((cat) => cat.type === "noun")
                .map((cat, index) => (
                  <div
                    key={`${cat.name}-${index}`}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                    <select
                      value={
                        nounCategorySelections[index] ?? cat.categories.name[0]
                      }
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedIndex = e.target.selectedIndex;
                        const selectedName = cat.categories.name[selectedIndex];
                        const selectedAbbreviation =
                          cat.categories.abbreviation[selectedIndex];

                        setNounCategorySelections((prev) => {
                          const updated = [...prev];
                          updated[index] = selectedValue;
                          return updated;
                        });

                        handleWordCategoryInput(
                          e,
                          cat.name,
                          "noun",
                          index,
                          selectedName,
                          selectedAbbreviation,
                        );
                      }}
                    >
                      {cat.categories.name.map((name, idx) => (
                        <option key={idx} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

            {shownParts["verb"] &&
              wordCategories
                .flatMap((wordCategory) => wordCategory.word_categories)
                .filter((cat) => cat.type === "verb")
                .map((cat, index) => (
                  <div
                    key={`${cat.name}-${index}`}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                    <select
                      value={
                        nounCategorySelections[index] ?? cat.categories.name[0]
                      }
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedIndex = e.target.selectedIndex;
                        const selectedName = cat.categories.name[selectedIndex];
                        const selectedAbbreviation =
                          cat.categories.abbreviation[selectedIndex];

                        setVerbCategorySelections((prev) => {
                          const updated = [...prev];
                          updated[index] = selectedValue;
                          return updated;
                        });

                        handleWordCategoryInput(
                          e,
                          cat.name,
                          "verb",
                          index,
                          selectedName,
                          selectedAbbreviation,
                        );
                      }}
                    >
                      {cat.categories.name.map((name, idx) => (
                        <option key={idx} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

            {shownParts["adj"] &&
              wordCategories
                .flatMap((wordCategory) => wordCategory.word_categories)
                .filter((cat) => cat.type === "adj")
                .map((cat, index) => (
                  <div
                    key={`${cat.name}-${index}`}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                    <select
                      value={
                        nounCategorySelections[index] ?? cat.categories.name[0]
                      }
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedIndex = e.target.selectedIndex;
                        const selectedName = cat.categories.name[selectedIndex];
                        const selectedAbbreviation =
                          cat.categories.abbreviation[selectedIndex];

                        setAdjCategorySelections((prev) => {
                          const updated = [...prev];
                          updated[index] = selectedValue;
                          return updated;
                        });

                        handleWordCategoryInput(
                          e,
                          cat.name,
                          "adj",
                          index,
                          selectedName,
                          selectedAbbreviation,
                        );
                      }}
                    >
                      {cat.categories.name.map((name, idx) => (
                        <option key={idx} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

            {shownParts["num"] &&
              wordCategories
                .flatMap((wordCategory) => wordCategory.word_categories)
                .filter((cat) => cat.type === "num")
                .map((cat, index) => (
                  <div
                    key={`${cat.name}-${index}`}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                    <select
                      value={
                        numCategorySelections[index] ?? cat.categories.name[0]
                      }
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedIndex = e.target.selectedIndex;
                        const selectedName = cat.categories.name[selectedIndex];
                        const selectedAbbreviation =
                          cat.categories.abbreviation[selectedIndex];

                        setNumCategorySelections((prev) => {
                          const updated = [...prev];
                          updated[index] = selectedValue;
                          return updated;
                        });

                        handleWordCategoryInput(
                          e,
                          cat.name,
                          "num",
                          index,
                          selectedName,
                          selectedAbbreviation,
                        );
                      }}
                    >
                      {cat.categories.name.map((name, idx) => (
                        <option key={idx} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

            {shownParts["adv"] &&
              wordCategories
                .flatMap((wordCategory) => wordCategory.word_categories)
                .filter((cat) => cat.type === "adv")
                .map((cat, index) => (
                  <div
                    key={`${cat.name}-${index}`}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                    <select
                      value={
                        advCategorySelections[index] ?? cat.categories.name[0]
                      }
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedIndex = e.target.selectedIndex;
                        const selectedName = cat.categories.name[selectedIndex];
                        const selectedAbbreviation =
                          cat.categories.abbreviation[selectedIndex];

                        setAdvCategorySelections((prev) => {
                          const updated = [...prev];
                          updated[index] = selectedValue;
                          return updated;
                        });

                        handleWordCategoryInput(
                          e,
                          cat.name,
                          "adv",
                          index,
                          selectedName,
                          selectedAbbreviation,
                        );
                      }}
                    >
                      {cat.categories.name.map((name, idx) => (
                        <option key={idx} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

            {shownParts["adp"] &&
              wordCategories
                .flatMap((wordCategory) => wordCategory.word_categories)
                .filter((cat) => cat.type === "adp")
                .map((cat, index) => (
                  <div
                    key={`${cat.name}-${index}`}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                    <select
                      value={
                        adpCategorySelections[index] ?? cat.categories.name[0]
                      }
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedIndex = e.target.selectedIndex;
                        const selectedName = cat.categories.name[selectedIndex];
                        const selectedAbbreviation =
                          cat.categories.abbreviation[selectedIndex];

                        setAdpCategorySelections((prev) => {
                          const updated = [...prev];
                          updated[index] = selectedValue;
                          return updated;
                        });

                        handleWordCategoryInput(
                          e,
                          cat.name,
                          "adp",
                          index,
                          selectedName,
                          selectedAbbreviation,
                        );
                      }}
                    >
                      {cat.categories.name.map((name, idx) => (
                        <option key={idx} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

            {shownParts["part"] &&
              wordCategories
                .flatMap((wordCategory) => wordCategory.word_categories)
                .filter((cat) => cat.type === "part")
                .map((cat, index) => (
                  <div
                    key={`${cat.name}-${index}`}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                    <select
                      value={
                        partCategorySelections[index] ?? cat.categories.name[0]
                      }
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedIndex = e.target.selectedIndex;
                        const selectedName = cat.categories.name[selectedIndex];
                        const selectedAbbreviation =
                          cat.categories.abbreviation[selectedIndex];

                        setPartCategorySelections((prev) => {
                          const updated = [...prev];
                          updated[index] = selectedValue;
                          return updated;
                        });

                        handleWordCategoryInput(
                          e,
                          cat.name,
                          "part",
                          index,
                          selectedName,
                          selectedAbbreviation,
                        );
                      }}
                    >
                      {cat.categories.name.map((name, idx) => (
                        <option key={idx} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

            {shownParts["interj"] &&
              wordCategories
                .flatMap((wordCategory) => wordCategory.word_categories)
                .filter((cat) => cat.type === "interj")
                .map((cat, index) => (
                  <div
                    key={`${cat.name}-${index}`}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                    <select
                      value={
                        nounCategorySelections[index] ?? cat.categories.name[0]
                      }
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedIndex = e.target.selectedIndex;
                        const selectedName = cat.categories.name[selectedIndex];
                        const selectedAbbreviation =
                          cat.categories.abbreviation[selectedIndex];

                        setInterjCategorySelections((prev) => {
                          const updated = [...prev];
                          updated[index] = selectedValue;
                          return updated;
                        });

                        handleWordCategoryInput(
                          e,
                          cat.name,
                          "interj",
                          index,
                          selectedName,
                          selectedAbbreviation,
                        );
                      }}
                    >
                      {cat.categories.name.map((name, idx) => (
                        <option key={idx} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

            {shownParts["conj"] &&
              wordCategories
                .flatMap((wordCategory) => wordCategory.word_categories)
                .filter((cat) => cat.type === "conj")
                .map((cat, index) => (
                  <div
                    key={`${cat.name}-${index}`}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                    <select
                      value={
                        conjCategorySelections[index] ?? cat.categories.name[0]
                      }
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedIndex = e.target.selectedIndex;
                        const selectedName = cat.categories.name[selectedIndex];
                        const selectedAbbreviation =
                          cat.categories.abbreviation[selectedIndex];

                        setConjCategorySelections((prev) => {
                          const updated = [...prev];
                          updated[index] = selectedValue;
                          return updated;
                        });

                        handleWordCategoryInput(
                          e,
                          cat.name,
                          "conj",
                          index,
                          selectedName,
                          selectedAbbreviation,
                        );
                      }}
                    >
                      {cat.categories.name.map((name, idx) => (
                        <option key={idx} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

            {shownParts["affix"] &&
              wordCategories
                .flatMap((wordCategory) => wordCategory.word_categories)
                .filter((cat) => cat.type === "affix")
                .map((cat, index) => (
                  <div
                    key={`${cat.name}-${index}`}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                    <select
                      value={
                        affixCategorySelections[index] ?? cat.categories.name[0]
                      }
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedIndex = e.target.selectedIndex;
                        const selectedName = cat.categories.name[selectedIndex];
                        const selectedAbbreviation =
                          cat.categories.abbreviation[selectedIndex];

                        setAffixCategorySelections((prev) => {
                          const updated = [...prev];
                          updated[index] = selectedValue;
                          return updated;
                        });

                        handleWordCategoryInput(
                          e,
                          cat.name,
                          "affix",
                          index,
                          selectedName,
                          selectedAbbreviation,
                        );
                      }}
                    >
                      {cat.categories.name.map((name, idx) => (
                        <option key={idx} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

            {shownParts["pron"] &&
              wordCategories
                .flatMap((wordCategory) => wordCategory.word_categories)
                .filter((cat) => cat.type === "pron")
                .map((cat, index) => (
                  <div
                    key={`${cat.name}-${index}`}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                    <select
                      value={
                        pronCategorySelections[index] ?? cat.categories.name[0]
                      }
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedIndex = e.target.selectedIndex;
                        const selectedName = cat.categories.name[selectedIndex];
                        const selectedAbbreviation =
                          cat.categories.abbreviation[selectedIndex];

                        setPronCategorySelections((prev) => {
                          const updated = [...prev];
                          updated[index] = selectedValue;
                          return updated;
                        });

                        handleWordCategoryInput(
                          e,
                          cat.name,
                          "pron",
                          index,
                          selectedName,
                          selectedAbbreviation,
                        );
                      }}
                    >
                      {cat.categories.name.map((name, idx) => (
                        <option key={idx} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
          </div>
        </div>

        <div className="thin-white-border">
          <h4>{translate("Tags")}</h4>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {tagGroups.map((group, index) => {
              const selectedValue = group.category_type || group.tags[0];

              return (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <span style={{ marginRight: "10px" }}>{group.name}:</span>
                  <select
                    value={selectedValue}
                    onChange={(e) => {
                      const selectedIndex = e.target.selectedIndex;
                      const selectedTag = group.tags[selectedIndex];

                      handleTagSelect(e.target.value, group, setTagGroups);
                      handleTagInput(group.name, index, selectedTag);
                    }}
                  >
                    {group.tags.map((tag, tagIndex) => (
                      <option key={tagIndex} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        </div>


        <div className="thin-white-border">
          <h4>{translate("Meaning")}</h4>
          <p style={{ marginTop: "20px" }}>
            <i>{translate("Separate each meaning with a comma")}</i>
          </p>

          {partsOfSpeech.map((part) =>
            (wordType === "word" || wordType === "personal_name" || wordType === "place_name")  ? (
              <div
                key={part.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div className="radio-and-button">
                  <input
                    type="checkbox"
                    id={part.id}
                    onChange={() =>
                      togglePart(part.id, meaningStrings[part.id])
                    }
                    checked={shownParts[part.id] || false}
                  />
                  <label htmlFor={part.id}>{translate(part.label)}</label>
                </div>

                {shownParts[part.id] &&
                part.id !== "verb" &&
                part.id !== "noun" &&
                part.id !== "affix" ? (
                  <div className="toggled-meaning-input-div">
                    <input
                      type="text"
                      className="modal-input"
                      placeholder={`${part.label.toLowerCase()} meaning(s)`}
                      value={meaningStrings[part.id] || ""}
                      onChange={(e) =>
                        handleMeaningChange(part.id, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          save();
                        }
                      }}
                    />
                  </div>
                ) : (
                  <></>
                )}

                {shownParts[part.id] && part.id === "verb" ? (
                  <div className="toggled-meaning-input-div">
                    <input
                      type="text"
                      className="modal-input"
                      placeholder={`${part.label.toLowerCase()} meaning(s)`}
                      value={meaningStrings[part.id] || ""}
                      onChange={(e) =>
                        handleMeaningChange(part.id, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          save();
                        }
                      }}
                    />
                    <p style={{ marginLeft: "5px", fontSize: "12px" }}>
                      <i>
                        {translate(
                          "Do not write 'to' before each verb, this will be inserted automatically",
                        )}
                      </i>
                    </p>
                  </div>
                ) : (
                  <></>
                )}

                {shownParts[part.id] && part.id === "noun" ? (
                  <div className="toggled-meaning-input-div">
                    <input
                      type="text"
                      className="modal-input"
                      placeholder={translate("{label} meaning(s)", {
                        label: part.label.toLowerCase(),
                      })}
                      value={meaningStrings[part.id] || ""}
                      onChange={(e) =>
                        handleMeaningChange(part.id, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          save();
                        }
                      }}
                    />
                    <p style={{ marginLeft: "5px", fontSize: "12px" }}>
                      <i>
                        {translate(
                          "To specify specific usage e.g (of animals), enter the usage in brackets followed by a comma",
                        )}
                      </i>
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <div
                key={part.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <>
                  {part.id === "affix" ? (
                    <>
                      <div className="toggled-meaning-input-div">
                        <input
                          type="text"
                          className="modal-input"
                          placeholder={translate("{label} meaning(s)", {
                            label: part.label.toLowerCase(),
                          })}
                          value={
                            meaningStrings[part.id] ||
                            ""
                          }
                          onChange={(e) =>
                            handleMeaningChange(part.id, e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              save();
                            }
                          }}
                        />
                      </div>
                    </>
                  ) : null}
                  {part.id === "clitic" ? (
                    <>
                      <div className="toggled-meaning-input-div">
                        <input
                          type="text"
                          className="modal-input"
                          placeholder={translate("{label} meaning(s)", {
                            label: part.label.toLowerCase(),
                          })}
                          value={meaningStrings[part.id] || ""}
                          onChange={(e) =>
                            handleMeaningChange(part.id, e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              save();
                            }
                          }}
                        />
                      </div>
                    </>
                  ) : null}
                </>
              </div>
            ),
          )}
        </div>

        <div className="thin-white-border">
           <Collapsible title={translate("Variants")}>
           
         

          <input
            placeholder={translate("enter variants")}
            onChange={(e) => handleVariants(e.target.value)}
          />
          <p style={{ marginLeft: "5px", fontSize: "12px" }}>
            <i>{translate("Divide each variant with a comma")}</i>
          </p>
       </Collapsible> </div>

        <div className="thin-white-border">
           <Collapsible title={translate("Word Forms")}>
          <h4>{translate("Word Forms")}</h4>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {shownParts["noun"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "noun" ? (
                  <input
                    key={index}
                    style={{ marginBottom: "10px", width: "300px" }}
                    placeholder={wordForm.name}
                    onChange={(e) =>
                      handleWordFormInput(e, wordForm.name, "noun", index)
                    }
                  />
                ) : null,
              )}

            {shownParts["verb"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "verb" ? (
                  <input
                    key={index}
                    style={{ marginBottom: "10px", width: "300px" }}
                    placeholder={wordForm.name}
                    onChange={(e) =>
                      handleWordFormInput(e, wordForm.name, "verb", index)
                    }
                  />
                ) : null,
              )}

            {shownParts["adj"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "adj" ? (
                  <input
                    key={index}
                    style={{ marginBottom: "10px", width: "300px" }}
                    placeholder={wordForm.name}
                    onChange={(e) =>
                      handleWordFormInput(e, wordForm.name, "adj", index)
                    }
                  />
                ) : null,
              )}

            {shownParts["num"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "num" ? (
                  <input
                    key={index}
                    style={{ marginBottom: "10px", width: "300px" }}
                    placeholder={wordForm.name}
                    onChange={(e) =>
                      handleWordFormInput(e, wordForm.name, "num", index)
                    }
                  />
                ) : null,
              )}

            {shownParts["adv"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "adv" ? (
                  <input
                    key={index}
                    style={{ marginBottom: "10px", width: "300px" }}
                    placeholder={wordForm.name}
                    onChange={(e) =>
                      handleWordFormInput(e, wordForm.name, "adv", index)
                    }
                  />
                ) : null,
              )}

            {shownParts["adp"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "adp" ? (
                  <input
                    key={index}
                    style={{ marginBottom: "10px", width: "300px" }}
                    placeholder={wordForm.name}
                    onChange={(e) =>
                      handleWordFormInput(e, wordForm.name, "adp", index)
                    }
                  />
                ) : null,
              )}

            {shownParts["part"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "part" ? (
                  <input
                    key={index}
                    style={{ marginBottom: "10px", width: "300px" }}
                    placeholder={wordForm.name}
                    onChange={(e) =>
                      handleWordFormInput(e, wordForm.name, "part", index)
                    }
                  />
                ) : null,
              )}

            {shownParts["interj"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "interj" ? (
                  <input
                    key={index}
                    style={{ marginBottom: "10px", width: "300px" }}
                    placeholder={wordForm.name}
                    onChange={(e) =>
                      handleWordFormInput(e, wordForm.name, "interj", index)
                    }
                  />
                ) : null,
              )}

            {shownParts["conj"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "conj" ? (
                  <input
                    key={index}
                    style={{ marginBottom: "10px", width: "300px" }}
                    placeholder={wordForm.name}
                    onChange={(e) =>
                      handleWordFormInput(e, wordForm.name, "conj", index)
                    }
                  />
                ) : null,
              )}

            {shownParts["affix"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "affix" ? (
                  <input
                    key={index}
                    style={{ marginBottom: "10px", width: "300px" }}
                    placeholder={wordForm.name}
                    onChange={(e) =>
                      handleWordFormInput(e, wordForm.name, "affix", index)
                    }
                  />
                ) : null,
              )}

            {shownParts["clitic"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "clitic" ? (
                  <input
                    key={index}
                    style={{ marginBottom: "10px", width: "300px" }}
                    placeholder={wordForm.name}
                    onChange={(e) =>
                      handleWordFormInput(e, wordForm.name, "clitic", index)
                    }
                  />
                ) : null,
              )}

            {shownParts["pron"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "pron" ? (
                  <input
                    key={index}
                    style={{ marginBottom: "10px", width: "300px" }}
                    placeholder={wordForm.name}
                    onChange={(e) =>
                      handleWordFormInput(e, wordForm.name, "pron", index)
                    }
                  />
                ) : null,
              )}
          </div>
        </Collapsible></div>

          <div className="thin-white-border">
          <Collapsible title={translate("Etymology")}>
            <div className="etymology-checklist">
              {[
                {
                  id: "fromMother",
                  label: translate("From {selectedParentLanguage}", {
                    selectedParentLanguage:
                      selectedParentLanguage?.language_name,
                  }),
                },
                {
                  id: "derived",
                  label: translate("Derived Within {languageName}", {
                    languageName,
                  }),
                },
                { id: "loaned", label: translate("Loaned") },
                {
                  id: "other",
                  label: translate("Other (elaborate in the etymology note)"),
                },
              ].map((option) =>
                option.id === "fromMother" ? (
                  option.label !== "From Parent Language" ? (
                    <div key={option.id}>
                      <input
                        type="radio"
                        id={option.id}
                        name="etymology"
                        value={option.id}
                        onChange={handleOptionChange}
                        checked={selectedEtymOption === option.id}
                      />
                      <label htmlFor={option.id}>{option.label}</label>
                    </div>
                  ) : (
                    <></>
                  )
                ) : (
                  <div key={option.id}>
                    <input
                      type="radio"
                      id={option.id}
                      name="etymology"
                      value={option.id}
                      onChange={handleOptionChange}
                      checked={selectedEtymOption === option.id}
                    />
                    <label htmlFor={option.id}>{option.label}</label>
                  </div>
                ),
              )}

              {selectedEtymOption === "fromMother" ? (
                <>
                  <span style={{ marginRight: "5px", fontWeight: 600 }}>
                    {selectedParentLanguage
                      ? translate("From {parentLanguage}", {
                          parentLanguage: "__LANG__",
                        })
                          .split("__LANG__")
                          .map((part, i) => (
                            <React.Fragment key={i}>
                              {part}
                              {i === 0 && (
                                <span className="languageName">
                                  {selectedParentLanguage.language_name}
                                </span>
                              )}
                            </React.Fragment>
                          ))
                      : translate("Parent Language")}
                  </span>

                  <WordSelector
                    id={languageId}
                    onWordSelect={handleMotherLanguageWordSelect}
                    motherLanguageName={selectedParentLanguage.language_name}
                    motherLanguageId={selectedParentLanguage.language_id}
                    motherLanguageIsProto={selectedParentLanguage.is_proto}
                  />
                </>
              ) : (
                <></>
              )}

              {selectedEtymOption === "derived" ? (
                <>
                  <span style={{ marginRight: "5px", fontWeight: "600" }}>
                    {translate("Select First Element")}
                  </span>
                  <WordSelector
                    id={languageId}
                    onWordSelect={handleFirstElement}
                    motherLanguageName={name}
                    motherLanguageId={languageId}
                  />
                  <span style={{ marginRight: "5px", fontWeight: "600" }}>
                    {translate("Select Second Element")}
                  </span>
                  <WordSelector
                    id={languageId}
                    onWordSelect={handleSecondElement}
                    motherLanguageName={name}
                    motherLanguageId={languageId}
                  />
                  <span style={{ marginRight: "5px", fontWeight: "600" }}>
                    {translate("Select Third Element")}
                  </span>
                  <WordSelector
                    id={languageId}
                    onWordSelect={handleThirdElement}
                    motherLanguageName={name}
                    motherLanguageId={languageId}
                  />
                </>
              ) : (
                <></>
              )}

              {selectedEtymOption === "loaned" && !loanerLanguage ? (
                <>
                  <span style={{ marginRight: "5px", fontWeight: "600" }}>
                    {translate("Select Loan Origin")}
                  </span>
                  <LanguageSelector
                    id={languageId}
                    onWordSelect={handleLoanerLanguage}
                    loanerLanguage={setLoanerLanguage}
                  />
                </>
              ) : (
                <></>
              )}

              {selectedEtymOption === "loaned" && loanerLanguage ? (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignContent: "center",
                  }}
                  className="thin-white-border"
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <span>
                        <span style={{ fontWeight: "600" }}>
                          {translate("Loaner Language")}
                        </span>
                        : {loanerLanguage.language_name}
                      </span>{" "}
                      <button
                        className="btn-close btn-close-white small-x-button"
                        aria-label="Close"
                        onClick={removeLoanerLanguage}
                      ></button>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}

              {showLoanWordWarning && (
                <p className="warning">
                  {translate("Please select a loanword before saving")}
                </p>
              )}
            </div>

            {loanerLanguage && (
              
            <WordSelector
              id={languageId}
              onWordSelect={handleLoanWord}
              motherLanguageName={loanerLanguage.language_name}
              motherLanguageId={loanerLanguage.language_id}
            />)}

            <div className="thin-white-border">
              <Collapsible title={translate("Etymology Note")}>
          

              <MyEditor
                value={note || ""}
                onChange={(content) => setEtymNote(content)}
              />
              </Collapsible>
              
            </div>
          </Collapsible>
        </div>

              
        <div className="thin-white-border">
               <Collapsible title={translate("Thesaurus")}>

         
          <p>
            {translate(
              "Assign <i>{word}</i> to a semantic domain within the thesaurus.",
              { word },
            )}
          </p>

          <ul style={{ listStyle: "none" }}>
            {
              <PopulateThesaurusList
                selectedTerms={selectedTerms}
                setSelectedTerms={setSelectedTerms}
              />
            }
          </ul>
        </Collapsible>
        </div>

        <div className="thin-white-border">
           <Collapsible title={translate("Note")}>
          <h4>{translate("Note")}</h4>
          <p>{translate("Enter any additional notes about this word here")}</p>

          <MyEditor
            value={etymNote || ""}
            onChange={(content) => setEtymNote(content)}
          />
       </Collapsible>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-footer-buttons">
          <div className="non-delete-buttons">
            <Button variant="secondary" onClick={close}>
              {translate("Cancel")}
            </Button>
            <Button variant="primary" onClick={save}>
              {translate("Add Word")}
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddWordModal;
