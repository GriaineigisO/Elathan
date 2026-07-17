import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import MyEditor from "../vendor/ckEditor-build/App.jsx";
import { PopulateThesaurusList } from "../Functions/thesaurusList.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import WordSelector from "./wordSelector";
import LanguageSelector from "./languageSelector";
import React from "react";
import Collapsible from "./collapsable.jsx";
import meaningKeys from "../assets/meaningKeys.jsx";
import SemanticDriftModal from "./semanticDriftModal.jsx";
import applySoundChange from "../Functions/soundChange.jsx";
import spell from "../Components/orthography.jsx";
import { IconPaperClip } from "ckeditor5";

const AddDescendantModal = ({
  show,
  setShow,
  languageId,
  onSuccess,
  word,
  name,
}) => {
  const { translate } = useTranslate();
  const [newWord, setNewWord] = useState();
  const [pronunciationOverride, setPronunciationOverride] = useState(null);

  const [newWordOverride, setNewWordOverride] = useState(null);
  const [descendant, setDescendant] = useState({});
  const [showWordWarning, setShowWordWarning] = useState(false);
  const [shownParts, setShownParts] = useState({});
  const [showSemanticDriftModal, setShowSemanticDriftModal] = useState(false);
  const [etymNote, setEtymNote] = useState();
  const [selectedSoundChanges, setSelectedSoundChanges] = useState([]);
  const [spellings, setSpellings] = useState([]);
  const [meaningStrings, setMeaningStrings] = useState({});
  const [descendantWordType, setDescendantWordType] = useState();
  const [descendantLanguage, setDescendantLanguage] = useState();
  const [descendantType, setDescendantType] = useState("fromMother");
  const [selectedOption, setSelectedOption] = useState("none");
  const [selectedDescendantType, setSelectedDescendantType] =
    useState("fromMother");
  const [languageSelected, setLanguageSelected] = useState(false);
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

  const [selectedParentLanguage, setSelectedParentLanguage] = useState(null);
  const [selectedEtymOption, setSelectedEtymOption] = useState();
  const [selectedMotherLanguageWord, setSelectedMotherLanguageWord] =
    useState(word);
  const [loanWord, setLoanWord] = useState();
  const [showLoanWordWarning, setShowLoanWordWarning] = useState(false);
  const [allCategoryValues, setAllCategoryValues] = useState({});

  useEffect(() => {
    setDescendant(word);
    setNewWord(word.word);
    setDescendantWordType(word.word_type);
    setPronunciation(word.ipa);

    const newMeaningStrings = {};
    const newShownParts = {};

    meaningKeys.forEach((key) => {
      if (word[key.meaning]) {
        newMeaningStrings[key.type] = word[key.meaning].join(", ");
        newShownParts[key.abbr] = true;
      }
    });

    setMeaningStrings(newMeaningStrings);
    setShownParts(newShownParts);

    setNounWordFormInputs([...(descendant.noun_word_forms ?? [])]);
    setVerbWordFormInputs([...(descendant.verb_word_forms ?? [])]);
    setAdjWordFormInputs([...(descendant.adj_word_forms ?? [])]);
    setAdvWordFormInputs([...(descendant.adv_word_forms ?? [])]);
    setAdpWordFormInputs([...(descendant.adp_word_forms ?? [])]);
    setConjWordFormInputs([...(descendant.conj_word_forms ?? [])]);
    setPartWordFormInputs([...(descendant.part_word_forms ?? [])]);
    setPronWordFormInputs([...(descendant.pron_word_forms ?? [])]);
    setNumWordFormInputs([...(descendant.num_word_forms ?? [])]);
    setInterjWordFormInputs([...(descendant.interj_word_forms ?? [])]);
    setAffixWordFormInputs([...(descendant.affix_word_forms ?? [])]);
    setCliticWordFormInputs([...(descendant.clitic_word_forms ?? [])]);
  }, [word]);

  const displayedIpa =
    pronunciationOverride ??
    applySoundChange(pronunciation, selectedSoundChanges, allCategoryValues);

  const handleLoanWord = (word) => {
    setLoanWord(word);
  };

  const handleOptionChange = (e) => {
    setSelectedEtymOption(e.target.value);
  };

  const removeDescendantLanguage = () => {
    setDescendantLanguage(null);
    setLanguageSelected(false);
  };

  //END-ETYMOLOGY

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

  const togglePart = (id) => {
    //show or hide input
    setShownParts((prev) => ({ ...prev, [id]: !prev[id] }));

    //delete any inputted text if input is hidden
    const key = meaningKeys.find((k) => k.abbr === id);

    setMeaningStrings((prev) => ({
      ...prev,
      [key.type]: "",
    }));
  };

  const handleMeaningChange = (id, value) => {
    setMeaningStrings((prev) => ({ ...prev, [id]: value }));
  };

  const handleWordType = (event) => {
    setDescendantWordType(event.target.value);
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
        (part) => key.abbr !== "clitic" || key.abbr !== "clitic",
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
        body: JSON.stringify({ languageId: Number(languageId) }),
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

  const getSoundChanges = async () => {
    if (!descendantLanguage) return;

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getLanguage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: Number(descendantLanguage.language_id) }),
      },
    );
    const data = await response.json();
    setSelectedSoundChanges(data[0].sound_changes ?? []);
    setAllCategoryValues(data[0].category_values ?? []);
    setSpellings(data[0].spelling ?? []);
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
        body: JSON.stringify({ languageId: Number(languageId) }),
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
      noun: [
        setNounCategorySelections,
        setNounWordCategoryInputs,
        word.noun_word_categories,
      ],
      verb: [
        setVerbCategorySelections,
        setVerbWordCategoryInputs,
        word.verb_word_categories,
      ],
      adj: [
        setAdjCategorySelections,
        setAdjWordCategoryInputs,
        word.adj_word_categories,
      ],
      num: [
        setNumCategorySelections,
        setNumWordCategoryInputs,
        word.num_word_categories,
      ],
      adv: [
        setAdvCategorySelections,
        setAdvWordCategoryInputs,
        word.adv_word_categories,
      ],
      adp: [
        setAdpCategorySelections,
        setAdpWordCategoryInputs,
        word.adp_word_categories,
      ],
      conj: [
        setConjCategorySelections,
        setConjWordCategoryInputs,
        word.conj_word_categories,
      ],
      part: [
        setPartCategorySelections,
        setPartWordCategoryInputs,
        word.part_word_categories,
      ],
      interj: [
        setInterjCategorySelections,
        setInterjWordCategoryInputs,
        word.interj_word_categories,
      ],
      pron: [
        setPronCategorySelections,
        setPronWordCategoryInputs,
        word.pron_word_categories,
      ],
      affix: [
        setAffixCategorySelections,
        setAffixWordCategoryInputs,
        word.affix_word_categories,
      ],
      clitic: [
        setCliticCategorySelections,
        setCliticWordCategoryInputs,
        word.clitic_word_categories,
      ],
    };

    Object.entries(setterMap).forEach(
      ([type, [setSelections, setInputs, parentCategories]]) => {
        const filtered = wordCategories
          .flatMap((wordCategory) => wordCategory.word_categories)
          .filter((cat) => cat.type === type);          

        const parentLookup = new Map(
          (parentCategories ?? []).map((cat) => [cat.category_name, cat]),
        );

        const initialSelections = filtered.map((cat) => {
          const fromMother = parentLookup.get(cat.name);

          return fromMother ? fromMother.category_type : cat.categories.name[0];
        });

        setSelections(initialSelections);
      },
    );
  }, [word, wordCategories]);

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
    const nounFormsToSave = nounWordFormInputs.map((form) => ({
      ...form,
      ipa:
        form.ipaOverride ??
        applySoundChange(
          form.ipaOverride ?? form.ipa,
          selectedSoundChanges,
          allCategoryValues,
        ),
      word:
        form.wordOverride ??
        spell(
          applySoundChange(
            form.ipaOverride ?? form.ipa,
            selectedSoundChanges,
            allCategoryValues,
          ),
          spellings,
        ),
    }));

     const verbFormsToSave = verbWordFormInputs.map((form) => ({
      ...form,
      ipa:
        form.ipaOverride ??
        applySoundChange(
          form.ipaOverride ?? form.ipa,
          selectedSoundChanges,
          allCategoryValues,
        ),
      word:
        form.wordOverride ??
        spell(
          applySoundChange(
            form.ipaOverride ?? form.ipa,
            selectedSoundChanges,
            allCategoryValues,
          ),
          spellings,
        ),
    }));

     const adjFormsToSave = adjWordFormInputs.map((form) => ({
      ...form,
      ipa:
        form.ipaOverride ??
        applySoundChange(
          form.ipaOverride ?? form.ipa,
          selectedSoundChanges,
          allCategoryValues,
        ),
      word:
        form.wordOverride ??
        spell(
          applySoundChange(
            form.ipaOverride ?? form.ipa,
            selectedSoundChanges,
            allCategoryValues,
          ),
          spellings,
        ),
    }));

     const advFormsToSave = advWordFormInputs.map((form) => ({
      ...form,
      ipa:
        form.ipaOverride ??
        applySoundChange(
          form.ipaOverride ?? form.ipa,
          selectedSoundChanges,
          allCategoryValues,
        ),
      word:
        form.wordOverride ??
        spell(
          applySoundChange(
            form.ipaOverride ?? form.ipa,
            selectedSoundChanges,
            allCategoryValues,
          ),
          spellings,
        ),
    }));

     const adpFormsToSave = adpWordFormInputs.map((form) => ({
      ...form,
      ipa:
        form.ipaOverride ??
        applySoundChange(
          form.ipaOverride ?? form.ipa,
          selectedSoundChanges,
          allCategoryValues,
        ),
      word:
        form.wordOverride ??
        spell(
          applySoundChange(
            form.ipaOverride ?? form.ipa,
            selectedSoundChanges,
            allCategoryValues,
          ),
          spellings,
        ),
    }));

     const partFormsToSave = partWordFormInputs.map((form) => ({
      ...form,
      ipa:
        form.ipaOverride ??
        applySoundChange(
          form.ipaOverride ?? form.ipa,
          selectedSoundChanges,
          allCategoryValues,
        ),
      word:
        form.wordOverride ??
        spell(
          applySoundChange(
            form.ipaOverride ?? form.ipa,
            selectedSoundChanges,
            allCategoryValues,
          ),
          spellings,
        ),
    }));

     const pronFormsToSave = pronWordFormInputs.map((form) => ({
      ...form,
      ipa:
        form.ipaOverride ??
        applySoundChange(
          form.ipaOverride ?? form.ipa,
          selectedSoundChanges,
          allCategoryValues,
        ),
      word:
        form.wordOverride ??
        spell(
          applySoundChange(
            form.ipaOverride ?? form.ipa,
            selectedSoundChanges,
            allCategoryValues,
          ),
          spellings,
        ),
    }));

     const conjFormsToSave = conjWordFormInputs.map((form) => ({
      ...form,
      ipa:
        form.ipaOverride ??
        applySoundChange(
          form.ipaOverride ?? form.ipa,
          selectedSoundChanges,
          allCategoryValues,
        ),
      word:
        form.wordOverride ??
        spell(
          applySoundChange(
            form.ipaOverride ?? form.ipa,
            selectedSoundChanges,
            allCategoryValues,
          ),
          spellings,
        ),
    }));

     const interjFormsToSave = interjWordFormInputs.map((form) => ({
      ...form,
      ipa:
        form.ipaOverride ??
        applySoundChange(
          form.ipaOverride ?? form.ipa,
          selectedSoundChanges,
          allCategoryValues,
        ),
      word:
        form.wordOverride ??
        spell(
          applySoundChange(
            form.ipaOverride ?? form.ipa,
            selectedSoundChanges,
            allCategoryValues,
          ),
          spellings,
        ),
    }));

     const affixFormsToSave = affixWordFormInputs.map((form) => ({
      ...form,
      ipa:
        form.ipaOverride ??
        applySoundChange(
          form.ipaOverride ?? form.ipa,
          selectedSoundChanges,
          allCategoryValues,
        ),
      word:
        form.wordOverride ??
        spell(
          applySoundChange(
            form.ipaOverride ?? form.ipa,
            selectedSoundChanges,
            allCategoryValues,
          ),
          spellings,
        ),
    }));

     const cliticFormsToSave = cliticWordFormInputs.map((form) => ({
      ...form,
      ipa:
        form.ipaOverride ??
        applySoundChange(
          form.ipaOverride ?? form.ipa,
          selectedSoundChanges,
          allCategoryValues,
        ),
      word:
        form.wordOverride ??
        spell(
          applySoundChange(
            form.ipaOverride ?? form.ipa,
            selectedSoundChanges,
            allCategoryValues,
          ),
          spellings,
        ),
    }));

     const numFormsToSave = numWordFormInputs.map((form) => ({
      ...form,
      ipa:
        form.ipaOverride ??
        applySoundChange(
          form.ipaOverride ?? form.ipa,
          selectedSoundChanges,
          allCategoryValues,
        ),
      word:
        form.wordOverride ??
        spell(
          applySoundChange(
            form.ipaOverride ?? form.ipa,
            selectedSoundChanges,
            allCategoryValues,
          ),
          spellings,
        ),
    }));

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
          languageId: descendantLanguage.language_id,
          word:
            newWord === word.word
              ? spell(
                  applySoundChange(
                    word.ipa,
                    selectedSoundChanges,
                    allCategoryValues,
                  ),
                  spellings,
                )
              : newWord,
          meanings: makeMeaningArrays(),
          wordType: descendantWordType,
          note: note,
          pronunciation:
            pronunciation === word.ipa
              ? applySoundChange(
                  word.ipa,
                  selectedSoundChanges,
                  allCategoryValues,
                )
              : pronunciation,
          adjWordFormInputs,
          nounWordFormInputs: nounFormsToSave,
          numWordFormInputs: numFormsToSave,
          verbWordFormInputs: verbFormsToSave,
          advWordFormInputs: advFormsToSave,
          adpWordFormInputs: adpFormsToSave,
          partWordFormInputs: partFormsToSave,
          conjWordFormInputs: conjFormsToSave,
          interjWordFormInputs: interjFormsToSave,
          affixWordFormInputs: affixFormsToSave,
          cliticWordFormInputs: cliticFormsToSave,
          pronWordFormInputs: pronFormsToSave,

          adjWordCategoryInputs: adjCategorySelections,
          nounWordCategoryInputs: nounCategorySelections,
          numWordCategoryInputs: numCategorySelections,
          verbWordCategoryInputs: verbCategorySelections,
          advWordCategoryInputs: advCategorySelections,
          adpWordCategoryInputs: adpCategorySelections,
          partWordCategoryInputs: partCategorySelections,
          conjWordCategoryInputs: conjCategorySelections,
          interjWordCategoryInputs: interjCategorySelections,
          affixWordCategoryInputs: affixCategorySelections,
          cliticWordCategoryInputs: cliticCategorySelections,
          pronWordCategoryInputs: pronCategorySelections,
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
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/addEtymology`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              languageId: descendant.language_id,
              word_id: wordId,
              etymologyType: descendantType,
              motherWord: selectedMotherLanguageWord,
              firstElementId: null,
              secondElementId: null,
              thirdElementId: null,
              loanWordId: selectedMotherLanguageWord.word_id,
              note: etymNote,
            }),
          },
        );

        const data = await response.json();

        if (response.ok) {
          showToast("Changes saved ✅");
          if (onSuccess) onSuccess(); // trigger parent's refresh
          close();
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    }
  };

  const close = () => {
    setShow(false);
    setLanguageSelected(false);
    setDescendantLanguage();
  };

  const handleWordFormInput = (setForms, name, value, field) => {
    setForms((prev) =>
      prev.map((form) => {
        if (form.name !== name) return form;

        if (field === "ipa") {
          return {
            ...form,
            ipaOverride: value,
          };
        }

        return {
          ...form,
          wordOverride: value,
        };
      }),
    );
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
        body: JSON.stringify({ languageId: Number(languageId) }),
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

  function handleDescendantType(e) {
    setDescendantType(e.target.value);
  }

  const handleDescendantLanguage = (lang) => {
    setDescendantLanguage(lang);
    setLanguageSelected(true);
  };

  useEffect(() => {
    if (descendantLanguage) {
      getSoundChanges();
    }
  }, [descendantLanguage]);

  function getWordFormValue(partOfSpeech, name) {
    const word = descendant[partOfSpeech].filter((form) => form.name === name);
    if (word[0] && word[0].word) {
      return word[0].word;
    } else {
      return;
    }
  }

  return (
    <>
      <SemanticDriftModal
        show={showSemanticDriftModal}
        setShow={setShowSemanticDriftModal}
        meaningStrings={meaningStrings}
        setMeaningStrings={setMeaningStrings}
        setShownParts={setShownParts}
      />
      <Modal
        show={show}
        onHide={close}
        size="lg"
        backdrop={true}
        dialogClassName="custom-modal-width"
      >
        <Modal.Header closeButton>
          <Modal.Title>{translate("Add New Descendant")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="thin-white-border">
            <h4>{translate("Descendant Type")}</h4>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <input
                  type="radio"
                  id={"fromMother"}
                  name="descendant-type"
                  value={"fromMother"}
                  onChange={handleDescendantType}
                  checked={descendantType === "fromMother"}
                />
                <label htmlFor={"fromMother"}>
                  {translate("Derive into a descendant language of {name}", {
                    name: name,
                  })}
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id={"loaned"}
                  name="descendant-type"
                  value={"loaned"}
                  onChange={handleDescendantType}
                  checked={descendantType === "loaned"}
                />
                <label htmlFor={"loaned"}>
                  {translate("Loan into another language")}
                </label>
              </div>
            </div>
          </div>

          {!descendantLanguage && (
            <div className="thin-white-border">
              <LanguageSelector
                id={languageId}
                onLanguageSelect={handleDescendantLanguage}
                descendantLanguage={setDescendantLanguage}
                loanOrInherit={descendantType}
              />
            </div>
          )}

          {descendantLanguage && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span>
                <span style={{ fontWeight: "600" }}>
                  {translate("Descendant Language")}
                </span>
                : {descendantLanguage.language_name}
              </span>{" "}
              <button
                className="btn-close btn-close-white small-x-button"
                aria-label="Close"
                onClick={removeDescendantLanguage}
              ></button>
            </div>
          )}

          {languageSelected && (
            <>
              <div className="thin-white-border">
                <h4>{translate("Word Type")}</h4>
                <select value={descendantWordType} onChange={handleWordType}>
                  <option value="word">{translate("word")}</option>
                  <option value="prefix">{translate("prefix")}</option>
                  <option value="suffix">{translate("suffix")}</option>
                  <option value="proclitic">{translate("proclitic")}</option>
                  <option value="enclitic">{translate("enclitic")}</option>
                  <option value="place_name">{translate("place name")}</option>
                  <option value="personal_name">
                    {translate("personal name")}
                  </option>
                </select>
              </div>

              <div className="thin-white-border">
                <h4>{translate("Enter Word")}</h4>
                <input
                  type="text"
                  className="modal-input"
                  placeholder={translate("word")}
                  value={newWordOverride ?? spell(displayedIpa, spellings)}
                  onChange={(e) => setNewWordOverride(e.target.value)}
                />
              </div>

              {showWordWarning && !descendant && (
                <p className="warning">
                  {translate("Please enter a descendant word")}
                </p>
              )}

              <div className="thin-white-border">
                <h4>{translate("Pronunciation")}</h4>
                <input
                  type="text"
                  className="modal-input"
                  placeholder={translate("IPA")}
                  value={displayedIpa}
                  onChange={(e) => setNewWordOverride(e.target.value)}
                />
              </div>

              <div className="thin-white-border">
                <h4>{translate("Word Categories")}</h4>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {shownParts["n"] &&
                    wordCategories
                      .flatMap((wc) => wc.word_categories ?? [])
                      .filter((cat) => cat.type === "noun")
                      .map((cat, index) => (
                        <div
                          key={`${cat.name}-${index}`}
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <span style={{ marginRight: "10px" }}>
                            {cat.name}:{" "}
                          </span>
                          <select
                            value={
                              nounCategorySelections[index] ??
                              cat.categories.name[0]
                            }
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const selectedIndex = e.target.selectedIndex;
                              const selectedName =
                                cat.categories.name[selectedIndex];
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

                  {shownParts["v"] &&
                    wordCategories
                      .flatMap((wc) => wc.word_categories ?? [])
                      .filter((cat) => cat.type === "verb")
                      .map((cat, index) => (
                        <div
                          key={`${cat.name}-${index}`}
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <span style={{ marginRight: "10px" }}>
                            {cat.name}:{" "}
                          </span>
                          <select
                            value={
                              verbCategorySelections[index] ??
                              cat.categories.name[0]
                            }
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const selectedIndex = e.target.selectedIndex;
                              const selectedName =
                                cat.categories.name[selectedIndex];
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
                      .flatMap((wc) => wc.word_categories ?? [])
                      .filter((cat) => cat.type === "adjective")
                      .map((cat, index) => (
                        <div
                          key={`${cat.name}-${index}`}
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <span style={{ marginRight: "10px" }}>
                            {cat.name}:{" "}
                          </span>
                          <select
                            value={
                              adjCategorySelections[index] ??
                              cat.categories.name[0]
                            }
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const selectedIndex = e.target.selectedIndex;
                              const selectedName =
                                cat.categories.name[selectedIndex];
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
                                "adjective",
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
                      .flatMap((wc) => wc.word_categories ?? [])
                      .filter((cat) => cat.type === "number")
                      .map((cat, index) => (
                        <div
                          key={`${cat.name}-${index}`}
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <span style={{ marginRight: "10px" }}>
                            {cat.name}:{" "}
                          </span>
                          <select
                            value={
                              numCategorySelections[index] ??
                              cat.categories.name[0]
                            }
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const selectedIndex = e.target.selectedIndex;
                              const selectedName =
                                cat.categories.name[selectedIndex];
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
                                "number",
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
                      .flatMap((wc) => wc.word_categories ?? [])
                      .filter((cat) => cat.type === "adverb")
                      .map((cat, index) => (
                        <div
                          key={`${cat.name}-${index}`}
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <span style={{ marginRight: "10px" }}>
                            {cat.name}:{" "}
                          </span>
                          <select
                            value={
                              advCategorySelections[index] ??
                              cat.categories.name[0]
                            }
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const selectedIndex = e.target.selectedIndex;
                              const selectedName =
                                cat.categories.name[selectedIndex];
                              const selectedAbbreviation =
                                cat.categories.abbreviation[selectedIndex];

                              setAdverbCategorySelections((prev) => {
                                const updated = [...prev];
                                updated[index] = selectedValue;
                                return updated;
                              });

                              handleWordCategoryInput(
                                e,
                                cat.name,
                                "adverb",
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
                      .flatMap((wc) => wc.word_categories ?? [])
                      .filter((cat) => cat.type === "adposition")
                      .map((cat, index) => (
                        <div
                          key={`${cat.name}-${index}`}
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <span style={{ marginRight: "10px" }}>
                            {cat.name}:{" "}
                          </span>
                          <select
                            value={
                              adpCategorySelections[index] ??
                              cat.categories.name[0]
                            }
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const selectedIndex = e.target.selectedIndex;
                              const selectedName =
                                cat.categories.name[selectedIndex];
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
                                "adposition",
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
                      .flatMap((wc) => wc.word_categories ?? [])
                      .filter((cat) => cat.type === "particle")
                      .map((cat, index) => (
                        <div
                          key={`${cat.name}-${index}`}
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <span style={{ marginRight: "10px" }}>
                            {cat.name}:{" "}
                          </span>
                          <select
                            value={
                              partCategorySelections[index] ??
                              cat.categories.name[0]
                            }
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const selectedIndex = e.target.selectedIndex;
                              const selectedName =
                                cat.categories.name[selectedIndex];
                              const selectedAbbreviation =
                                cat.categories.abbreviation[selectedIndex];

                              setParticleCategorySelections((prev) => {
                                const updated = [...prev];
                                updated[index] = selectedValue;
                                return updated;
                              });

                              handleWordCategoryInput(
                                e,
                                cat.name,
                                "particle",
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
                      .flatMap((wc) => wc.word_categories ?? [])
                      .filter((cat) => cat.type === "interjection")
                      .map((cat, index) => (
                        <div
                          key={`${cat.name}-${index}`}
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <span style={{ marginRight: "10px" }}>
                            {cat.name}:{" "}
                          </span>
                          <select
                            value={
                              interjCategorySelections[index] ??
                              cat.categories.name[0]
                            }
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const selectedIndex = e.target.selectedIndex;
                              const selectedName =
                                cat.categories.name[selectedIndex];
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
                                "interjection",
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
                      .flatMap((wc) => wc.word_categories ?? [])
                      .filter((cat) => cat.type === "conjunction")
                      .map((cat, index) => (
                        <div
                          key={`${cat.name}-${index}`}
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <span style={{ marginRight: "10px" }}>
                            {cat.name}:{" "}
                          </span>
                          <select
                            value={
                              conjCategorySelections[index] ??
                              cat.categories.name[0]
                            }
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const selectedIndex = e.target.selectedIndex;
                              const selectedName =
                                cat.categories.name[selectedIndex];
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
                                "conjection",
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
                      .flatMap((wc) => wc.word_categories ?? [])
                      .filter((cat) => cat.type === "affix")
                      .map((cat, index) => (
                        <div
                          key={`${cat.name}-${index}`}
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <span style={{ marginRight: "10px" }}>
                            {cat.name}:{" "}
                          </span>
                          <select
                            value={
                              affixCategorySelections[index] ??
                              cat.categories.name[0]
                            }
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const selectedIndex = e.target.selectedIndex;
                              const selectedName =
                                cat.categories.name[selectedIndex];
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

                  {shownParts["v"] &&
                    wordCategories
                      .flatMap((wc) => wc.word_categories ?? [])
                      .filter((cat) => cat.type === "pronoun")
                      .map((cat, index) => (
                        <div
                          key={`${cat.name}-${index}`}
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <span style={{ marginRight: "10px" }}>
                            {cat.name}:{" "}
                          </span>
                          <select
                            value={
                              pronCategorySelections[index] ??
                              cat.categories.name[0]
                            }
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const selectedIndex = e.target.selectedIndex;
                              const selectedName =
                                cat.categories.name[selectedIndex];
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
                                "pronoun",
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
                        <span style={{ marginRight: "10px" }}>
                          {group.name}:
                        </span>
                        <select
                          value={selectedValue}
                          onChange={(e) => {
                            const selectedIndex = e.target.selectedIndex;
                            const selectedTag = group.tags[selectedIndex];

                            handleTagSelect(
                              e.target.value,
                              group,
                              setTagGroups,
                            );
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

                <button
                  onClick={() => {
                    setShowSemanticDriftModal(true);
                  }}
                >
                  {translate("Apply Semantic Drift")}
                </button>

                {meaningKeys.map((key) =>
                  descendantWordType === "word" ||
                  descendantWordType === "personal_name" ||
                  descendantWordType === "place_name" ? (
                    <div
                      key={key.abbr}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div className="radio-and-button">
                        <input
                          type="checkbox"
                          id={key.abbr}
                          onChange={() =>
                            togglePart(key.abbr, meaningStrings[key.abbr])
                          }
                          checked={shownParts[key.abbr] || false}
                        />
                        <label htmlFor={key.abbr}>{translate(key.type)}</label>
                      </div>

                      {shownParts[key.abbr] &&
                      key.abbr !== "v" &&
                      key.abbr !== "n" &&
                      key.abbr !== "affix" ? (
                        <div className="toggled-meaning-input-div">
                          <input
                            type="text"
                            className="modal-input"
                            placeholder={`${key.type.toLowerCase()} meaning(s)`}
                            value={meaningStrings[key.type] || ""}
                            onChange={(e) =>
                              handleMeaningChange(key.type, e.target.value)
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

                      {shownParts[key.abbr] && key.abbr === "v" ? (
                        <div className="toggled-meaning-input-div">
                          <input
                            type="text"
                            className="modal-input"
                            placeholder={`${key.type.toLowerCase()} meaning(s)`}
                            value={meaningStrings[key.type] || ""}
                            onChange={(e) =>
                              handleMeaningChange(key.type, e.target.value)
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

                      {shownParts[key.abbr] && key.abbr === "n" ? (
                        <div className="toggled-meaning-input-div">
                          <input
                            type="text"
                            className="modal-input"
                            placeholder={translate("{label} meaning(s)", {
                              label: key.type.toLowerCase(),
                            })}
                            value={meaningStrings[key.type] || ""}
                            onChange={(e) =>
                              handleMeaningChange(key.type, e.target.value)
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
                      key={key.abbr}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <>
                        {key.abbr === "affix" ? (
                          <>
                            <div className="toggled-meaning-input-div">
                              <input
                                type="text"
                                className="modal-input"
                                placeholder={translate("{label} meaning(s)", {
                                  label: key.type.toLowerCase(),
                                })}
                                value={meaningStrings[key.type] || ""}
                                onChange={(e) =>
                                  handleMeaningChange(key.type, e.target.value)
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
                        {key.abbr === "clitic" ? (
                          <>
                            <div className="toggled-meaning-input-div">
                              <input
                                type="text"
                                className="modal-input"
                                placeholder={translate("{label} meaning(s)", {
                                  label: key.type.toLowerCase(),
                                })}
                                value={meaningStrings[key.type] || ""}
                                onChange={(e) =>
                                  handleMeaningChange(key.type, e.target.value)
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
                </Collapsible>{" "}
              </div>

              <div className="thin-white-border">
                <Collapsible title={translate("Word Forms")}>
                  <h4>{translate("Word Forms")}</h4>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {shownParts["n"] &&
                      wordForms.map((wordForm, index) => {
                        const form = nounWordFormInputs.find(
                          (f) => f.name === wordForm.name,
                        );

                        const ipa = form
                          ? (form.ipaOverride ??
                            applySoundChange(
                              form.ipa,
                              selectedSoundChanges,
                              allCategoryValues,
                            ))
                          : "";

                        return wordForm.type === "noun" ? (
                          <div key={index}>
                            <>
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={wordForm.name}
                                value={
                                  form
                                    ? (form.wordOverride ??
                                      spell(ipa, spellings))
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setNounWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "word",
                                  )
                                }
                              />
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={`${wordForm.name} IPA`}
                                value={
                                  form
                                    ? form.wordEdited
                                      ? form.word
                                      : ipa
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setNounWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "ipa",
                                  )
                                }
                              />
                            </>
                          </div>
                        ) : null;
                      })}

                    {shownParts["v"] &&
                      wordForms.map((wordForm, index) => {
                        const form = verbWordFormInputs.find(
                          (f) => f.name === wordForm.name,
                        );

                        const ipa = form
                          ? (form.ipaOverride ??
                            applySoundChange(
                              form.ipa,
                              selectedSoundChanges,
                              allCategoryValues,
                            ))
                          : "";

                        return wordForm.type === "verb" ? (
                          <div key={index}>
                            <>
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={wordForm.name}
                                value={
                                  form
                                    ? (form.wordOverride ??
                                      spell(ipa, spellings))
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setVerbWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "word",
                                  )
                                }
                              />
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={`${wordForm.name} IPA`}
                                value={
                                  form
                                    ? form.wordEdited
                                      ? form.word
                                      : ipa
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setVerbWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "ipa",
                                  )
                                }
                              />
                            </>
                          </div>
                        ) : null;
                      })}

                    {shownParts["adj"] &&
                      wordForms.map((wordForm, index) => {
                        const form = adjWordFormInputs.find(
                          (f) => f.name === wordForm.name,
                        );

                        const ipa = form
                          ? (form.ipaOverride ??
                            applySoundChange(
                              form.ipa,
                              selectedSoundChanges,
                              allCategoryValues,
                            ))
                          : "";

                        return wordForm.type === "adjective" ? (
                          <div key={index}>
                            <>
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={wordForm.name}
                                value={
                                  form
                                    ? (form.wordOverride ??
                                      spell(ipa, spellings))
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setAdjWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "word",
                                  )
                                }
                              />
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={`${wordForm.name} IPA`}
                                value={
                                  form
                                    ? form.wordEdited
                                      ? form.word
                                      : ipa
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setAdjWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "ipa",
                                  )
                                }
                              />
                            </>
                          </div>
                        ) : null;
                      })}

                   {shownParts["num"] &&
                      wordForms.map((wordForm, index) => {
                        const form = numWordFormInputs.find(
                          (f) => f.name === wordForm.name,
                        );

                        const ipa = form
                          ? (form.ipaOverride ??
                            applySoundChange(
                              form.ipa,
                              selectedSoundChanges,
                              allCategoryValues,
                            ))
                          : "";

                        return wordForm.type === "number" ? (
                          <div key={index}>
                            <>
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={wordForm.name}
                                value={
                                  form
                                    ? (form.wordOverride ??
                                      spell(ipa, spellings))
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setNumWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "word",
                                  )
                                }
                              />
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={`${wordForm.name} IPA`}
                                value={
                                  form
                                    ? form.wordEdited
                                      ? form.word
                                      : ipa
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setNumWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "ipa",
                                  )
                                }
                              />
                            </>
                          </div>
                        ) : null;
                      })}

                   {shownParts["adv"] &&
                      wordForms.map((wordForm, index) => {
                        const form = advWordFormInputs.find(
                          (f) => f.name === wordForm.name,
                        );

                        const ipa = form
                          ? (form.ipaOverride ??
                            applySoundChange(
                              form.ipa,
                              selectedSoundChanges,
                              allCategoryValues,
                            ))
                          : "";

                        return wordForm.type === "adverb" ? (
                          <div key={index}>
                            <>
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={wordForm.name}
                                value={
                                  form
                                    ? (form.wordOverride ??
                                      spell(ipa, spellings))
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setAdvWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "word",
                                  )
                                }
                              />
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={`${wordForm.name} IPA`}
                                value={
                                  form
                                    ? form.wordEdited
                                      ? form.word
                                      : ipa
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setAdvWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "ipa",
                                  )
                                }
                              />
                            </>
                          </div>
                        ) : null;
                      })}

                   {shownParts["adp"] &&
                      wordForms.map((wordForm, index) => {
                        const form = adpWordFormInputs.find(
                          (f) => f.name === wordForm.name,
                        );

                        const ipa = form
                          ? (form.ipaOverride ??
                            applySoundChange(
                              form.ipa,
                              selectedSoundChanges,
                              allCategoryValues,
                            ))
                          : "";

                        return wordForm.type === "adposition" ? (
                          <div key={index}>
                            <>
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={wordForm.name}
                                value={
                                  form
                                    ? (form.wordOverride ??
                                      spell(ipa, spellings))
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setAdvWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "word",
                                  )
                                }
                              />
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={`${wordForm.name} IPA`}
                                value={
                                  form
                                    ? form.wordEdited
                                      ? form.word
                                      : ipa
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setAdpWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "ipa",
                                  )
                                }
                              />
                            </>
                          </div>
                        ) : null;
                      })}

                    {shownParts["part"] &&
                      wordForms.map((wordForm, index) => {
                        const form = partWordFormInputs.find(
                          (f) => f.name === wordForm.name,
                        );

                        const ipa = form
                          ? (form.ipaOverride ??
                            applySoundChange(
                              form.ipa,
                              selectedSoundChanges,
                              allCategoryValues,
                            ))
                          : "";

                        return wordForm.type === "particle" ? (
                          <div key={index}>
                            <>
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={wordForm.name}
                                value={
                                  form
                                    ? (form.wordOverride ??
                                      spell(ipa, spellings))
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setPartWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "word",
                                  )
                                }
                              />
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={`${wordForm.name} IPA`}
                                value={
                                  form
                                    ? form.wordEdited
                                      ? form.word
                                      : ipa
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setPartWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "ipa",
                                  )
                                }
                              />
                            </>
                          </div>
                        ) : null;
                      })}

                    {shownParts["interj"] &&
                      wordForms.map((wordForm, index) => {
                        const form = interjWordFormInputs.find(
                          (f) => f.name === wordForm.name,
                        );

                        const ipa = form
                          ? (form.ipaOverride ??
                            applySoundChange(
                              form.ipa,
                              selectedSoundChanges,
                              allCategoryValues,
                            ))
                          : "";

                        return wordForm.type === "interjection" ? (
                          <div key={index}>
                            <>
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={wordForm.name}
                                value={
                                  form
                                    ? (form.wordOverride ??
                                      spell(ipa, spellings))
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setInterjWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "word",
                                  )
                                }
                              />
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={`${wordForm.name} IPA`}
                                value={
                                  form
                                    ? form.wordEdited
                                      ? form.word
                                      : ipa
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setInterjWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "ipa",
                                  )
                                }
                              />
                            </>
                          </div>
                        ) : null;
                      })}

                   {shownParts["conj"] &&
                      wordForms.map((wordForm, index) => {
                        const form = conjWordFormInputs.find(
                          (f) => f.name === wordForm.name,
                        );

                        const ipa = form
                          ? (form.ipaOverride ??
                            applySoundChange(
                              form.ipa,
                              selectedSoundChanges,
                              allCategoryValues,
                            ))
                          : "";

                        return wordForm.type === "conjunction" ? (
                          <div key={index}>
                            <>
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={wordForm.name}
                                value={
                                  form
                                    ? (form.wordOverride ??
                                      spell(ipa, spellings))
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setConjWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "word",
                                  )
                                }
                              />
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={`${wordForm.name} IPA`}
                                value={
                                  form
                                    ? form.wordEdited
                                      ? form.word
                                      : ipa
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setConjWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "ipa",
                                  )
                                }
                              />
                            </>
                          </div>
                        ) : null;
                      })}

                   {shownParts["affix"] &&
                      wordForms.map((wordForm, index) => {
                        const form = affixWordFormInputs.find(
                          (f) => f.name === wordForm.name,
                        );

                        const ipa = form
                          ? (form.ipaOverride ??
                            applySoundChange(
                              form.ipa,
                              selectedSoundChanges,
                              allCategoryValues,
                            ))
                          : "";

                        return wordForm.type === "affix" ? (
                          <div key={index}>
                            <>
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={wordForm.name}
                                value={
                                  form
                                    ? (form.wordOverride ??
                                      spell(ipa, spellings))
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setAffixWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "word",
                                  )
                                }
                              />
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={`${wordForm.name} IPA`}
                                value={
                                  form
                                    ? form.wordEdited
                                      ? form.word
                                      : ipa
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setAffixWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "ipa",
                                  )
                                }
                              />
                            </>
                          </div>
                        ) : null;
                      })}

                    {shownParts["clitic"] &&
                      wordForms.map((wordForm, index) => {
                        const form = cliticWordFormInputs.find(
                          (f) => f.name === wordForm.name,
                        );

                        const ipa = form
                          ? (form.ipaOverride ??
                            applySoundChange(
                              form.ipa,
                              selectedSoundChanges,
                              allCategoryValues,
                            ))
                          : "";

                        return wordForm.type === "clitic" ? (
                          <div key={index}>
                            <>
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={wordForm.name}
                                value={
                                  form
                                    ? (form.wordOverride ??
                                      spell(ipa, spellings))
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setCliticWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "word",
                                  )
                                }
                              />
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={`${wordForm.name} IPA`}
                                value={
                                  form
                                    ? form.wordEdited
                                      ? form.word
                                      : ipa
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setCliticWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "ipa",
                                  )
                                }
                              />
                            </>
                          </div>
                        ) : null;
                      })}

                   {shownParts["pron"] &&
                      wordForms.map((wordForm, index) => {
                        const form = pronWordFormInputs.find(
                          (f) => f.name === wordForm.name,
                        );

                        const ipa = form
                          ? (form.ipaOverride ??
                            applySoundChange(
                              form.ipa,
                              selectedSoundChanges,
                              allCategoryValues,
                            ))
                          : "";

                        return wordForm.type === "pronoun" ? (
                          <div key={index}>
                            <>
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={wordForm.name}
                                value={
                                  form
                                    ? (form.wordOverride ??
                                      spell(ipa, spellings))
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setPronWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "word",
                                  )
                                }
                              />
                              <input
                                key={index}
                                style={{ marginBottom: "10px", width: "300px" }}
                                placeholder={`${wordForm.name} IPA`}
                                value={
                                  form
                                    ? form.wordEdited
                                      ? form.word
                                      : ipa
                                    : ""
                                }
                                onChange={(e) =>
                                  handleWordFormInput(
                                    setPronWordFormInputs,
                                    wordForm.name,
                                    e.target.value,
                                    "ipa",
                                  )
                                }
                              />
                            </>
                          </div>
                        ) : null;
                      })}
                  </div>
                </Collapsible>
              </div>

              <div className="thin-white-border">
                <Collapsible title={translate("Thesaurus")}>
                  <p>
                    {translate(
                      "Assign <i>{word}</i> to a semantic domain within the thesaurus.",
                      { descendant },
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
                <Collapsible title={translate("Etymology Note")}>
                  <MyEditor
                    value={note || ""}
                    onChange={(content) => setEtymNote(content)}
                  />
                </Collapsible>
              </div>
            </>
          )}
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
    </>
  );
};

export default AddDescendantModal;
