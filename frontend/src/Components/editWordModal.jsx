import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import MyEditor from "../vendor/ckEditor-build/App.jsx";
import { PopulateThesaurusList } from "../Functions/thesaurusList.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import { deleteWord, editWord, getWord } from "../services/languageService.js";
import { IPAkeyboard } from "./IPAkeyboard.jsx";
import { Keyboard } from "./keyboard.jsx";


const EditWordModal = ({ show, setShow, wordData, onSuccess, convertIPA, spelling }) => {
  const { translate } = useTranslate();
  const [showWordWarning, setShowWordWarning] = useState(false);
  const [word, setWord] = useState();
  const [shownParts, setShownParts] = useState({});
  const [meaningStrings, setMeaningStrings] = useState({});
  const [overrideWord, setOverrideWord] = useState(false);

  const [selectedOption, setSelectedOption] = useState("none");
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
  const [tagInputs, setTagInputs] = useState([]);
  const [wordType, setWordType] = useState();
  const [pronunciation, setPronunciation] = useState();
  const languageId = wordData.language_id;
  const [note, setNote] = useState();
  const [language, setLanguage] = useState();

  const [nounWordForms, setNounWordForms] = useState([]);
  const [numWordForms, setNumWordForms] = useState([]);
  const [verbWordForms, setVerbWordForms] = useState([]);
  const [adjWordForms, setAdjWordForms] = useState([]);
  const [advWordForms, setAdvWordForms] = useState([]);
  const [adpWordForms, setAdpWordForms] = useState([]);
  const [conjWordForms, setConjWordForms] = useState([]);
  const [interjWordForms, setInterjWordForms] = useState([]);
  const [pronWordForms, setPronWordForms] = useState([]);
  const [partWordForms, setPartWordForms] = useState([]);
  const [affixWordForms, setAffixWordForms] = useState([]);
  const [cliticWordForms, setCliticWordForms] = useState([]);

  const [nounWordCategories, setNounWordCategories] = useState([]);
  const [numWordCategories, setNumWordCategories] = useState([]);
  const [verbWordCategories, setVerbWordCategories] = useState([]);
  const [adjWordCategories, setAdjWordCategories] = useState([]);
  const [advWordCategories, setAdvWordCategories] = useState([]);
  const [adpWordCategories, setAdpWordCategories] = useState([]);
  const [conjWordCategories, setConjWordCategories] = useState([]);
  const [interjWordCategories, setInterjWordCategories] = useState([]);
  const [pronWordCategories, setPronWordCategories] = useState([]);
  const [partWordCategories, setPartWordCategories] = useState([]);
  const [affixWordCategories, setAffixWordCategories] = useState([]);
  const [cliticWordCategories, setCliticWordCategories] = useState([]);

  const [tagGroups, setTagGroups] = useState([]);

  const [nounSentenceExampleInputs, setNounSentenceExampleInputs] = useState(
    [],
  );
  const [numSentenceExampleInputs, setNumSentenceExampleInputs] = useState([]);
  const [verbSentenceExampleInputs, setVerbSentenceExampleInputs] = useState(
    [],
  );
  const [adjSentenceExampleInputs, setAdjSentenceExampleInputs] = useState([]);
  const [advSentenceExampleInputs, setAdvSentenceExampleInputs] = useState([]);
  const [adpSentenceExampleInputs, setAdpSentenceExampleInputs] = useState([]);
  const [conjSentenceExampleInputs, setConjSentenceExampleInputs] = useState(
    [],
  );
  const [partSentenceExampleInputs, setPartSentenceExampleInputs] = useState(
    [],
  );
  const [interjSentenceExampleInputs, setInterjSentenceExampleInputs] =
    useState([]);
  const [pronSentenceExampleInputs, setPronSentenceExampleInputs] = useState(
    [],
  );

  const [nounSentenceExamples, setNounSentenceExamples] = useState([]);
  const [numSentenceExamples, setNumSentenceExamples] = useState([]);
  const [verbSentenceExamples, setVerbSentenceExamples] = useState([]);
  const [adjSentenceExamples, setAdjSentenceExamples] = useState([]);
  const [advSentenceExamples, setAdvSentenceExamples] = useState([]);
  const [adpSentenceExamples, setAdpSentenceExamples] = useState([]);
  const [conjSentenceExamples, setConjSentenceExamples] = useState([]);
  const [partSentenceExamples, setPartSentenceExamples] = useState([]);
  const [interjSentenceExamples, setInterjSentenceExamples] = useState([]);
  const [pronSentenceExamples, setPronSentenceExamples] = useState([]);
  const [initializedGroups, setInitializedGroups] = useState([]);
  const [inflection, setInflection] = useState();
  const [variants, setVariants] = useState();
  const [selectedTerms, setSelectedTerms] = useState({});

  useEffect(() => {
    if (!wordData) return;

    const defaultShownParts = {};
    const defaultMeaningStrings = {};

    if (wordData.noun_meaning?.length > 0) {
      defaultShownParts["noun"] = true;
      defaultMeaningStrings["noun"] = wordData.noun_meaning.join(", ");
    }
    if (wordData.num_meaning?.length > 0) {
      defaultShownParts["num"] = true;
      defaultMeaningStrings["num"] = wordData.num_meaning.join(", ");
    }
    if (wordData.verb_meaning?.length > 0) {
      defaultShownParts["verb"] = true;
      defaultMeaningStrings["verb"] = wordData.verb_meaning.join(", ");
    }
    if (wordData.adj_meaning?.length > 0) {
      defaultShownParts["adj"] = true;
      defaultMeaningStrings["adj"] = wordData.adj_meaning.join(", ");
    }
    if (wordData.adv_meaning?.length > 0) {
      defaultShownParts["adv"] = true;
      defaultMeaningStrings["adv"] = wordData.adv_meaning.join(", ");
    }
    if (wordData.adp_meaning?.length > 0) {
      defaultShownParts["adp"] = true;
      defaultMeaningStrings["adp"] = wordData.adp_meaning.join(", ");
    }
    if (wordData.part_meaning?.length > 0) {
      defaultShownParts["part"] = true;
      defaultMeaningStrings["part"] = wordData.part_meaning.join(", ");
    }
    if (wordData.conj_meaning?.length > 0) {
      defaultShownParts["conj"] = true;
      defaultMeaningStrings["conj"] = wordData.conj_meaning.join(", ");
    }
    if (wordData.interj_meaning?.length > 0) {
      defaultShownParts["interj"] = true;
      defaultMeaningStrings["interj"] = wordData.interj_meaning.join(", ");
    }
    if (wordData.affix_meaning?.length > 0) {
      defaultShownParts["affix"] = true;
      defaultMeaningStrings["affix"] = wordData.affix_meaning.join(", ");
    }
    if (wordData.clitic_meaning?.length > 0) {
      defaultShownParts["clitic"] = true;
      defaultMeaningStrings["clitic"] = wordData.clitic_meaning.join(", ");
    }
    if (wordData.pron_meaning?.length > 0) {
      defaultShownParts["pron"] = true;
      defaultMeaningStrings["pron"] = wordData.pron_meaning.join(", ");
    }

    setShownParts(defaultShownParts);
    setMeaningStrings(defaultMeaningStrings);
  }, [wordData]);

  const [partsOfSpeech, setPartsOfSpeech] = useState([
    { id: "noun", label: "Noun" },
    { id: "verb", label: "Verb" },
    { id: "adj", label: "Adjective" },
    { id: "num", label: "Number" },
    { id: "adv", label: "Adverb" },
    { id: "adp", label: "Adposition" },
    { id: "conj", label: "Conjunction" },
    { id: "part", label: "Particle" },
    { id: "interj", label: "Interjection" },
    { id: "pron", label: "Pronoun" },
  ]);

  const getWrd = async () => {
    const data = await window.electron.getWord(wordData.word_id)
    setWord(data.word);
    setPronunciation(data.ipa);
    setWordType(data.word_type);
    setNote(data.word_note);
    setLanguage(data.language_id);
    setInflection(data.inflection);

    data.thesaurus && setSelectedTerms(data.thesaurus);

    if (
      data.word_type === "enclitic" ||
      data.word_type === "proclitic"
    ) {
      setPartsOfSpeech((prev) => [...prev, { id: "clitic", label: "Clitic" }]);
    }

    if (
      data.word_type === "prefix" ||
      data.word_type === "suffix"
    ) {
      setPartsOfSpeech((prev) => [...prev, { id: "affix", label: "Affix" }]);
    }

    setNounWordForms((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.noun_word_forms ?? []),
    );
    setNumWordForms((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.num_word_forms ?? []),
    );
    setVerbWordForms((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.verb_word_forms ?? []),
    );
    setAdjWordForms((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.adj_word_forms ?? []),
    );
    setAdvWordForms((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.adv_word_forms ?? []),
    );
    setAdpWordForms((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.adp_word_forms ?? []),
    );
    setConjWordForms((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.conj_word_forms ?? []),
    );
    setInterjWordForms((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.interj_word_forms ?? []),
    );
    setPronWordForms((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.pron_word_forms ?? []),
    );
    setPartWordForms((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.part_word_forms ?? []),
    );
    setAffixWordForms((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.affix_word_forms ?? []),
    );
    setCliticWordForms((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.clitic_word_forms ?? []),
    );

    setNounWordCategories((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.noun_word_categories ?? []),
    );



    setNumWordCategories((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.num_word_categories ?? []),
    );

    setVerbWordCategories((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.verb_word_categories ?? []),
    );
    setAdjWordCategories((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.adj_word_categories ?? []),
    );
    setAdvWordCategories((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.adv_word_categories ?? []),
    );
    setAdpWordCategories((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.adp_word_categories ?? []),
    );
    setConjWordCategories((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.conj_word_categories ?? []),
    );
    setInterjWordCategories((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.interj_word_categories ?? []),
    );
    setPronWordCategories((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.pron_word_categories ?? []),
    );
    setPartWordCategories((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.part_word_categories ?? []),
    );
    setAffixWordCategories((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.affix_word_categories ?? []),
    );
    setCliticWordCategories((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.clitic_word_categories ?? []),
    );

    setNounSentenceExamples((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.noun_sentence_examples ?? []),
    );

    setNumSentenceExamples((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.num_sentence_examples ?? []),
    );

    setVerbSentenceExamples((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.verb_sentence_examples ?? []),
    );

    setAdjSentenceExamples((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.adj_sentence_examples ?? []),
    );

    setAdvSentenceExamples((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.adv_sentence_examples ?? []),
    );

    setAdpSentenceExamples((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.adp_sentence_examples ?? []),
    );

    setConjSentenceExamples((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.conj_sentence_examples ?? []),
    );

    setInterjSentenceExamples((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.interj_sentence_examples ?? []),
    );

    setPartSentenceExamples((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.part_sentence_examples ?? []),
    );

    setPronSentenceExamples((prev) =>
      Array.isArray(prev) && prev.length > 0
        ? prev
        : (wordData.pron_sentence_examples ?? []),
    );
  };

  useEffect(() => {
    getWrd();
  }, []);

  const setPartShown = (id, isShown) => {
    setShownParts((prev) => ({ ...prev, [id]: isShown }));
  };

  const handleMeaningChange = (id, value) => {
    setMeaningStrings((prev) => ({ ...prev, [id]: value }));
  };

  const handleWordTypeToggle = (value) => {
    setWordType(value);
    if (value === "prefix" || value === "suffix") {
      setPartShown("affix", true);
      setPartShown("clitic", false);
      setPartsOfSpeech((prev) => {
        const withoutClitic = prev.filter((item) => item.label !== "Clitic");
        const hasAffix = withoutClitic.some((item) => item.label === "Affix");
        if (!hasAffix) {
          return [...withoutClitic, { id: "affix", label: "Affix" }];
        }
        return withoutClitic;
      });
    } else if (value === "proclitic" || value === "enclitic") {
      setPartShown("clitic", true);
      setPartShown("affix", false);
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
        (part) => part.id !== "clitic" || part.id !== "affix",
      );
      setPartShown(value, true);
      setPartShown("affix", false);
      setPartShown("clitic", false);
      setPartsOfSpeech(filtered);
    }
  };

  const handleWordType = (event) => {
    handleWordTypeToggle(event.target.value);
  };

  const removeDuplicatesById = (arr) => {
    const seen = new Set();
    return arr.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
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

  const getWrdForms = async () => {

    const data = await window.electron.getWordForms(languageId)
    const unique = data.filter(
      (item, index, self) =>
        index ===
        self.findIndex((t) => t.name === item.name && t.type === item.type),
    );

    setWordForms(unique);
  };

  useEffect(() => {
    getWrdForms();
  }, []);

  const fetchWordCategories = async () => {
    const data = await window.electron.getWordCategories(languageId);
    setWordCategories(data);
  };

  useEffect(() => {
    fetchWordCategories();
  }, []);

  const fetchTags = async () => {
   
    const data = await window.electron.getTags(languageId)
    setTagGroups(data[0].tags);
  };

  useEffect(() => {
    fetchTags();
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

  const save = async () => {
    if (!word) {
      setShowWordWarning(true);
      return;
    }

    
console.log(nounWordCategories)
    const data = await window.electron.editWord(
          wordData.word_id,
          wordData.language_id,
          word,
          makeMeaningArrays(),
          wordType,
          pronunciation,
          note,
          adjWordForms,
          nounWordForms,
          numWordForms,
          verbWordForms,
          advWordForms,
          adpWordForms,
          partWordForms,
          conjWordForms,
          interjWordForms,
          affixWordForms,
          cliticWordForms,
          pronWordForms,

          adjWordCategories,
          nounWordCategories,
          numWordCategories,
          verbWordCategories,
          advWordCategories,
          adpWordCategories,
          partWordCategories,
          conjWordCategories,
          interjWordCategories,
          affixWordCategories,
          cliticWordCategories,
          pronWordCategories,

          tagInputs,
          variants,
          selectedTerms)



    if (!data.success) {
      console.error(`Error editing word`);
    }

    if (data.success) {
      showToast("Changes saved ✅");
      if (onSuccess) onSuccess(); // trigger parent's refresh
      close();
      setSelectedOption("none");
    }
  };

  const close = () => {
    setShow(false);
  };

  const handleWordFormInput = (e, name, type, ipa) => {
    const value = e.target.value;

    const setMap = {
      noun: setNounWordForms,
      verb: setVerbWordForms,
      adj: setAdjWordForms,
      num: setNumWordForms,
      adv: setAdvWordForms,
      adp: setAdpWordForms,
      conj: setConjWordForms,
      part: setPartWordForms,
      interj: setInterjWordForms,
      pron: setPronWordForms,
      affix: setAffixWordForms,
      clitic: setCliticWordForms,
    };

    const updater = setMap[type];
    if (!updater) return;

    updater((prev) => {
      const existingIndex = prev.findIndex((f) => f && f.name === name);

      if (ipa) {
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            ipa: value,
          };
          return updated;
        }
      } else {
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            word: value,
          };
          return updated;
        }
      }

      // If it's a new entry
      if (ipa) {
        return [...prev, { name, ipa: value, type }];
      } else {
        return [...prev, { name, word: value, type }];
      }
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
      verb: setVerbWordCategoryInputs,
      adj: setAdjWordCategoryInputs,
      num: setNumWordCategoryInputs,
      adv: setAdvWordCategoryInputs,
      adp: setAdpWordCategoryInputs,
      conj: setConjWordCategoryInputs,
      part: setPartWordCategoryInputs,
      interj: setInterjWordCategoryInputs,
      pron: setPronWordCategoryInputs,
      affix: setAffixWordCategoryInputs,
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

  const delWord = async () => {
    const data = await window.electron.deleteWord(wordData.word_id);

    if (!data.success) {
      console.error(`Error deleting word`);
    } else {
      if (onSuccess)
       window.location.href = `/dictionary/${wordData.language_id}`
      showToast("Word deleted ✅");
    }
  };

  const handleWordCategorySelect = (selectedValue, cat, setCategoryState) => {
    setCategoryState((prev) => {
      const updated = [...prev];
      const existingIndex = updated.findIndex(
        (entry) => entry.category_name === cat.name,
      );

      const abbreviation =
        cat.categories.abbreviation[cat.categories.name.indexOf(selectedValue)];

      const newEntry = {
        category_name: cat.name,
        category_type: selectedValue,
        abbreviation,
      };

      if (existingIndex !== -1) {
        updated[existingIndex] = { ...updated[existingIndex], ...newEntry };
      } else {
        updated.push(newEntry);
      }

      return updated;
    });
  };

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

  const addSentenceExample = (setArr) => {
    setArr((prev) => [...prev, { id: Date.now() }]);
  };

  const removeExample = (num, arr, setArr) => {
    let filteredArr = arr.filter((index) => index.id !== num);
    setArr(filteredArr);
  };

  const updateSentenceValue = (id, field, value, arr, setArr) => {
    const index = arr.findIndex((item) => item.id === id);
    if (index === -1) {
      // Not found: insert new
      setArr([...arr, { id, [field]: value }]);
    } else {
      // Found: update existing
      const updated = [...arr];
      updated[index] = { ...updated[index], [field]: value };
      setArr(updated);
    }
  };

  useEffect(() => {
    if (!tagGroups) return;
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
        <Modal.Title>
          Edit <i>{wordData.word}</i>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="thin-white-border">
          <h4>Word Type</h4>
          <select value={wordType} onChange={handleWordType}>
            <option value="word">word</option>
            <option value="prefix">prefix</option>
            <option value="suffix">suffix</option>
            <option value="proclitic">proclitic</option>
            <option value="enclitic">enclitic</option>
            <option value="place_name">{translate("place name")}</option>
            <option value="personal_name">{translate("personal name")}</option>
          </select>
        </div>

        <div className="thin-white-border">
          <h4>Enter Word</h4>
          {/* <input
            type="text"
            className="modal-input"
            placeholder="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                save();
              }
            }}
          /> */}


          <div className="keyboard">
                      <Keyboard
                        inputVal={
                          convertIPA && !overrideWord
                            ? spell(pronunciation, spelling)
                            : word
                        }
                        setInputVal={setWord}
                        setOverrideWord={setOverrideWord}
                        setWord={setWord}
                      />
                    </div>
        </div>

        {showWordWarning && !word && (
          <p className="warning">Please enter a word</p>
        )}

        <div className="thin-white-border">


           <IPAkeyboard inputVal={pronunciation} setInputVal={setPronunciation} />
        </div>

        <div className="thin-white-border">
          <h4>Word Categories</h4>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {shownParts["noun"] && wordCategories &&
              wordCategories.map((wordCategory, index) =>
                wordCategory.word_categories.map((cat) =>
                  cat.type === "noun" ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <span style={{ marginRight: "10px" }}>{cat.name}: </span>

                      <select
                        key={index}
                        value={
                          nounWordCategories.find(
                            (entry) => entry.category_name === cat.name,
                          )?.category_type ||
                          cat.categories.name[0] ||
                          ""
                        }
                        onChange={(e) => {
                          const selectedIndex = e.target.selectedIndex;
                          const selectedName =
                            cat.categories.name[selectedIndex];
                          const selectedAbbreviation =
                            wordCategory.word_categories[0].categories
                              .abbreviation[selectedIndex];
                          handleWordCategorySelect(
                            e.target.value,
                            cat,
                            setNounWordCategories,
                          );
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
                        {wordCategory.word_categories[0].categories.name.map(
                          (name, index) => (
                            <option key={index} value={name}>
                              {name}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                  ) : null,
                ),
              )}

            {shownParts["verb"] && wordCategories &&
              wordCategories.map((wordCategory, index) =>
                wordCategory.word_categories.map((cat) =>
                  cat.type === "verb" ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                      <select
                        key={index}
                        value={
                          verbWordCategories.find(
                            (entry) => entry.category_name === cat.name,
                          )?.category_type ||
                          cat.categories.name[0] ||
                          ""
                        }
                        onChange={(e) => {
                          const selectedIndex = e.target.selectedIndex;
                          const selectedName =
                            cat.categories.name[selectedIndex];
                          const selectedAbbreviation =
                            cat.categories.abbreviation[selectedIndex];

                          handleWordCategorySelect(
                            e.target.value,
                            cat,
                            setVerbWordCategories,
                          );
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
                        {cat.categories.name.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null,
                ),
              )}

            {shownParts["adj"]  && wordCategories&&
              wordCategories.map((wordCategory, index) =>
                wordCategory.word_categories.map((cat) =>
                  cat.type === "adj" ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                      <select
                        key={index}
                        value={
                          adjWordCategories.find(
                            (entry) => entry.category_name === cat.name,
                          )?.category_type ||
                          cat.categories.name[0] ||
                          ""
                        }
                        onChange={(e) => {
                          const selectedIndex = e.target.selectedIndex;
                          const selectedName =
                            cat.categories.name[selectedIndex];
                          const selectedAbbreviation =
                            cat.categories.abbreviation[selectedIndex];
                          handleWordCategorySelect(
                            e.target.value,
                            cat,
                            setAdjWordCategories,
                          );
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
                        {cat.categories.name.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null,
                ),
              )}

            {shownParts["num"]  && wordCategories&&
              wordCategories.map((wordCategory, index) =>
                wordCategory.word_categories.map((cat) =>
                  cat.type === "num" ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <span style={{ marginRight: "10px" }}>{cat.name}: </span>

                      <select
                        key={index}
                        value={
                          numWordCategories.find(
                            (entry) => entry.category_name === cat.name,
                          )?.category_type ||
                          cat.categories.name[0] ||
                          ""
                        }
                        onChange={(e) => {
                          const selectedIndex = e.target.selectedIndex;
                          const selectedName =
                            cat.categories.name[selectedIndex];
                          const selectedAbbreviation =
                            wordCategory.word_categories[0].categories
                              .abbreviation[selectedIndex];
                          handleWordCategorySelect(
                            e.target.value,
                            cat,
                            setNumWordCategories,
                          );
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
                        {wordCategory.word_categories[0].categories.name.map(
                          (name, index) => (
                            <option key={index} value={name}>
                              {name}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                  ) : null,
                ),
              )}

            {shownParts["adv"]  && wordCategories&&
              wordCategories.map((wordCategory, index) =>
                wordCategory.word_categories.map((cat) =>
                  cat.type === "adv" ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                      <select
                        key={index}
                        value={
                          advWordCategories.find(
                            (entry) => entry.category_name === cat.name,
                          )?.category_type ||
                          cat.categories.name[0] ||
                          ""
                        }
                        onChange={(e) => {
                          const selectedIndex = e.target.selectedIndex;
                          const selectedName =
                            cat.categories.name[selectedIndex];
                          const selectedAbbreviation =
                            cat.categories.abbreviation[selectedIndex];
                          handleWordCategorySelect(
                            e.target.value,
                            cat,
                            setAdvWordCategories,
                          );
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
                        {cat.categories.name.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null,
                ),
              )}

            {shownParts["adp"]  && wordCategories&&
              wordCategories.map((wordCategory, index) =>
                wordCategory.word_categories.map((cat) =>
                  cat.type === "adp" ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                      <select
                        key={index}
                        value={
                          adpWordCategories.find(
                            (entry) => entry.category_name === cat.name,
                          )?.category_type ||
                          cat.categories.name[0] ||
                          ""
                        }
                        onChange={(e) => {
                          const selectedIndex = e.target.selectedIndex;
                          const selectedName =
                            cat.categories.name[selectedIndex];
                          const selectedAbbreviation =
                            cat.categories.abbreviation[selectedIndex];
                          handleWordCategorySelect(
                            e.target.value,
                            cat,
                            setAdpWordCategories,
                          );
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
                        {cat.categories.name.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null,
                ),
              )}

            {shownParts["part"]  && wordCategories&&
              wordCategories.map((wordCategory, index) =>
                wordCategory.word_categories.map((cat) =>
                  cat.type === "part" ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                      <select
                        key={index}
                        value={
                          partWordCategories.find(
                            (entry) => entry.category_name === cat.name,
                          )?.category_type ||
                          cat.categories.name[0] ||
                          ""
                        }
                        onChange={(e) => {
                          const selectedIndex = e.target.selectedIndex;
                          const selectedName =
                            cat.categories.name[selectedIndex];
                          const selectedAbbreviation =
                            cat.categories.abbreviation[selectedIndex];
                          handleWordCategorySelect(
                            e.target.value,
                            cat,
                            setPartWordCategories,
                          );
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
                        {cat.categories.name.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null,
                ),
              )}

            {shownParts["interj"]  && wordCategories&&
              wordCategories.map((wordCategory, index) =>
                wordCategory.word_categories.map((cat) =>
                  cat.type === "interj" ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                      <select
                        key={index}
                        value={
                          interjWordCategories.find(
                            (entry) => entry.category_name === cat.name,
                          )?.category_type ||
                          cat.categories.name[0] ||
                          ""
                        }
                        onChange={(e) => {
                          const selectedIndex = e.target.selectedIndex;
                          const selectedName =
                            cat.categories.name[selectedIndex];
                          const selectedAbbreviation =
                            cat.categories.abbreviation[selectedIndex];
                          handleWordCategorySelect(
                            e.target.value,
                            cat,
                            setInterjWordCategories,
                          );
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
                        {cat.categories.name.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null,
                ),
              )}

            {shownParts["conj"]  && wordCategories&&
              wordCategories.map((wordCategory, index) =>
                wordCategory.word_categories.map((cat) =>
                  cat.type === "conj" ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                      <select
                        key={index}
                        value={
                          conjWordCategories.find(
                            (entry) => entry.category_name === cat.name,
                          )?.category_type ||
                          cat.categories.name[0] ||
                          ""
                        }
                        onChange={(e) => {
                          const selectedIndex = e.target.selectedIndex;
                          const selectedName =
                            cat.categories.name[selectedIndex];
                          const selectedAbbreviation =
                            cat.categories.abbreviation[selectedIndex];
                          handleWordCategorySelect(
                            e.target.value,
                            cat,
                            setConjWordCategories,
                          );
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
                        {cat.categories.name.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null,
                ),
              )}

            {shownParts["affix"]  && wordCategories&&
              wordCategories.map((wordCategory, index) =>
                wordCategory.word_categories.map((cat) =>
                  cat.type === "affix" ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                      <select
                        key={index}
                        value={
                          affixWordCategories.find(
                            (entry) => entry.category_name === cat.name,
                          )?.category_type ||
                          cat.categories.name[0] ||
                          ""
                        }
                        onChange={(e) => {
                          const selectedIndex = e.target.selectedIndex;
                          const selectedName =
                            cat.categories.name[selectedIndex];
                          const selectedAbbreviation =
                            cat.categories.abbreviation[selectedIndex];
                          handleWordCategorySelect(
                            e.target.value,
                            cat,
                            setAffixWordCategories,
                          );
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
                        {cat.categories.name.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null,
                ),
              )}

            {shownParts["clitic"]  && wordCategories&&
              wordCategories.map((wordCategory, index) =>
                wordCategory.word_categories.map((cat) =>
                  cat.type === "clitic" ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                      <select
                        key={index}
                        value={
                          cliticWordCategories.find(
                            (entry) => entry.category_name === cat.name,
                          )?.category_type ||
                          cat.categories.name[0] ||
                          ""
                        }
                        onChange={(e) => {
                          const selectedIndex = e.target.selectedIndex;
                          const selectedName =
                            cat.categories.name[selectedIndex];
                          const selectedAbbreviation =
                            cat.categories.abbreviation[selectedIndex];
                          handleWordCategorySelect(
                            e.target.value,
                            cat,
                            setCliticWordCategories,
                          );
                          handleWordCategoryInput(
                            e,
                            cat.name,
                            "clitic",
                            index,
                            selectedName,
                            selectedAbbreviation,
                          );
                        }}
                      >
                        {cat.categories.name.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null,
                ),
              )}

            {shownParts["pron"] && wordCategories &&
              wordCategories.map((wordCategory, index) =>
                wordCategory.word_categories.map((cat) =>
                  cat.type === "pron" ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <span style={{ marginRight: "10px" }}>{cat.name}: </span>
                      <select
                        key={index}
                        value={
                          pronWordCategories.find(
                            (entry) => entry.category_name === cat.name,
                          )?.category_type ||
                          cat.categories.name[0] ||
                          ""
                        }
                        onChange={(e) => {
                          const selectedIndex = e.target.selectedIndex;
                          const selectedName =
                            cat.categories.name[selectedIndex];
                          const selectedAbbreviation =
                            cat.categories.abbreviation[selectedIndex];
                          handleWordCategorySelect(
                            e.target.value,
                            cat,
                            setPronWordCategories,
                          );
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
                        {cat.categories.name.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null,
                ),
              )}
          </div>
        </div>

        <div className="thin-white-border">
          <h4>Tags</h4>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {tagGroups && tagGroups.map((group, index) => {
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
          <h4>Meaning</h4>
          <p style={{ marginTop: "20px" }}>
            <i>Separate each meaning with a comma</i>
          </p>

          {removeDuplicatesById(partsOfSpeech).map((part) =>
            wordType === "word" ? (
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
                      setPartShown(part.id, !(shownParts[part.id] ?? false))
                    }
                    checked={shownParts[part.id] || false}
                  />
                  <label htmlFor={part.id}>{part.label}</label>
                </div>

                {shownParts[part.id] &&
                part.id !== "verb" &&
                part.id !== "noun" ? (
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
                        Do not write "to" before each verb, this will be
                        inserted automatically
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
                        To specify specific usage e.g (of animals), enter the
                        usage in brackets followed by a comma
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
                  {part.id === "affix" || part.id === "clitic" ? (
                    <>
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
                    </>
                  ) : null}
                </>
              </div>
            ),
          )}
        </div>

        <div className="thin-white-border">
          <h4>Variants</h4>

          <input
            placeholder="enter variants"
            onChange={(e) => handleVariants(e.target.value)}
          />
          <p style={{ marginLeft: "5px", fontSize: "12px" }}>
            <i>Divide each variant with a comma</i>
          </p>
        </div>

        <div className="thin-white-border">
          <h4>Word Forms</h4>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {shownParts["noun"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "noun" ? (
                  <div key={index}>
                    <>
                      <input
                        placeholder={wordForm.name}
                        value={
                          nounWordForms.find((f) => f && f.name === wordForm.name)
                            ?.word ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "noun")
                        }
                      />

                      <input
                        placeholder={`${wordForm.name} IPA`}
                        value={
                          nounWordForms.find((f) => f && f.name === wordForm.name)
                            ?.ipa ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "noun", "ipa")
                        }
                      />
                    </>
                  </div>
                ) : null,
              )}

            {shownParts["verb"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "verb" ? (
                  <div key={index}>
                    <>
                      <input
                        placeholder={wordForm.name}
                        value={
                          verbWordForms.find((f) => f && f.name === wordForm.name)
                            ?.word ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "verb")
                        }
                      />

                      <input
                        placeholder={`${wordForm.name} IPA`}
                        value={
                          verbWordForms.find((f) =>  f && f.name === wordForm.name)
                            ?.ipa ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "verb", "ipa")
                        }
                      />
                    </>
                  </div>
                ) : null,
              )}

            {shownParts["adj"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "adjective" ? (
                  <div key={index}>
                    <>
                      <input
                        placeholder={wordForm.name}
                        value={
                          adjWordForms.find((f) => f && f.name === wordForm.name)
                            ?.word ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "adjective")
                        }
                      />

                      <input
                        placeholder={`${wordForm.name} IPA`}
                        value={
                          adjWordForms.find((f) => f && f.name === wordForm.name)
                            ?.ipa ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(
                            e,
                            wordForm.name,
                            "adjective",
                            "ipa",
                          )
                        }
                      />
                    </>
                  </div>
                ) : null,
              )}

            {shownParts["num"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "number" ? (
                  <div key={index}>
                    <>
                      <input
                        placeholder={wordForm.name}
                        value={
                          numWordForms.find((f) => f && f.name === wordForm.name)
                            ?.word ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "number")
                        }
                      />

                      <input
                        placeholder={`${wordForm.name} IPA`}
                        value={
                          numWordForms.find((f) => f && f.name === wordForm.name)
                            ?.ipa ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "number", "ipa")
                        }
                      />
                    </>
                  </div>
                ) : null,
              )}

            {shownParts["adv"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "adverb" ? (
                  <div key={index}>
                    <>
                      <input
                        placeholder={wordForm.name}
                        value={
                          advWordForms.find((f) => f && f.name === wordForm.name)
                            ?.word ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "adverb")
                        }
                      />

                      <input
                        placeholder={`${wordForm.name} IPA`}
                        value={
                          advWordForms.find((f) => f && f.name === wordForm.name)
                            ?.ipa ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "adverb", "ipa")
                        }
                      />
                    </>
                  </div>
                ) : null,
              )}

            {shownParts["adp"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "adposition" ? (
                  <div key={index}>
                    <>
                      <input
                        placeholder={wordForm.name}
                        value={
                          adpWordForms.find((f) => f && f.name === wordForm.name)
                            ?.word ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "adposition")
                        }
                      />

                      <input
                        placeholder={`${wordForm.name} IPA`}
                        value={
                          adpWordForms.find((f) => f && f.name === wordForm.name)
                            ?.ipa ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(
                            e,
                            wordForm.name,
                            "adposition",
                            "ipa",
                          )
                        }
                      />
                    </>
                  </div>
                ) : null,
              )}

            {shownParts["part"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "particle" ? (
                  <div key={index}>
                    <>
                      <input
                        placeholder={wordForm.name}
                        value={
                          partWordForms.find((f) => f && f.name === wordForm.name)
                            ?.word ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "particle")
                        }
                      />

                      <input
                        placeholder={`${wordForm.name} IPA`}
                        value={
                          partWordForms.find((f) => f && f.name === wordForm.name)
                            ?.ipa ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(
                            e,
                            wordForm.name,
                            "particle",
                            "ipa",
                          )
                        }
                      />
                    </>
                  </div>
                ) : null,
              )}

            {shownParts["interj"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "interjection" ? (
                  <div key={index}>
                    <>
                      <input
                        placeholder={wordForm.name}
                        value={
                          interjWordForms.find((f) => f && f.name === wordForm.name)
                            ?.word ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "interjection")
                        }
                      />

                      <input
                        placeholder={`${wordForm.name} IPA`}
                        value={
                          interjWordForms.find((f) => f && f.name === wordForm.name)
                            ?.ipa ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(
                            e,
                            wordForm.name,
                            "interjection",
                            "ipa",
                          )
                        }
                      />
                    </>
                  </div>
                ) : null,
              )}

            {shownParts["conj"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "conjunction" ? (
                  <div key={index}>
                    <>
                      <input
                        placeholder={wordForm.name}
                        value={
                          conjWordForms.find((f) => f && f.name === wordForm.name)
                            ?.word ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "conjunction")
                        }
                      />

                      <input
                        placeholder={`${wordForm.name} IPA`}
                        value={
                          conjWordForms.find((f) => f && f.name === wordForm.name)
                            ?.ipa ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(
                            e,
                            wordForm.name,
                            "conjunction",
                            "ipa",
                          )
                        }
                      />
                    </>
                  </div>
                ) : null,
              )}

            {shownParts["affix"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "affix" ? (
                  <div key={index}>
                    <>
                      <input
                        placeholder={wordForm.name}
                        value={
                          affixWordForms.find((f) => f && f.name === wordForm.name)
                            ?.word ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "affix")
                        }
                      />

                      <input
                        placeholder={`${wordForm.name} IPA`}
                        value={
                          affixWordForms.find((f) => f && f.name === wordForm.name)
                            ?.ipa ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "affix", "ipa")
                        }
                      />
                    </>
                  </div>
                ) : null,
              )}

            {shownParts["clitic"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "clitic" ? (
                  <div key={index}>
                    <>
                      <input
                        placeholder={wordForm.name}
                        value={
                          cliticWordForms.find((f) => f && f.name === wordForm.name)
                            ?.word ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "clitic")
                        }
                      />

                      <input
                        placeholder={`${wordForm.name} IPA`}
                        value={
                          cliticWordForms.find((f) => f && f.name === wordForm.name)
                            ?.ipa ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "clitic", "ipa")
                        }
                      />
                    </>
                  </div>
                ) : null,
              )}

            {shownParts["pron"] &&
              wordForms.map((wordForm, index) =>
                wordForm.type === "pronoun" ? (
                  <div key={index}>
                    <>
                      <input
                        placeholder={wordForm.name}
                        value={
                          pronWordForms.find((f) => f && f.name === wordForm.name)
                            ?.word ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(e, wordForm.name, "pronoun")
                        }
                      />

                      <input
                        placeholder={`${wordForm.name} IPA`}
                        value={
                          pronWordForms.find((f) => f && f.name === wordForm.name)
                            ?.ipa ?? ""
                        }
                        onChange={(e) =>
                          handleWordFormInput(
                            e,
                            wordForm.name,
                            "pronoun",
                            "ipa",
                          )
                        }
                      />
                    </>
                  </div>
                ) : null,
              )}
          </div>
        </div>

        <div className="thin-white-border">
          <h4>Thesaurus</h4>
          <p>
            Assign <i>{wordData.word}</i> to a semantic domain within the
            thesaurus.
          </p>

          <ul style={{ listStyle: "none" }}>
            {
              <PopulateThesaurusList
                selectedTerms={selectedTerms}
                setSelectedTerms={setSelectedTerms}
              />
            }
          </ul>
        </div>

        <div className="thin-white-border">
          <h4>Note</h4>
          <p>Enter any additional notes about this word here</p>

          <MyEditor
            value={note || ""}
            onChange={(content) => setNote(content)}
          />
        </div>

        <div className="thin-white-border">
          <h4>Inflection</h4>
          <MyEditor
            value={inflection || ""}
            onChange={(content) => setInflection(content)}
          />
        </div>

        <div className="thin-white-border">
          <h4>Example Sentences</h4>

          {shownParts["noun"] && (
            <div>
              {nounSentenceExampleInputs.map((example) => (
                <div className="example-and-x-button" key={example.id}>
                  <div className="sentence-example-input thin-white-border">
                    <input
                      placeholder="enter example sentence"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "sentence",
                          e.target.value,
                          nounSentenceExamples,
                          setNounSentenceExamples,
                        )
                      }
                    />
                    <input
                      placeholder="enter translation"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "translation",
                          e.target.value,
                          nounSentenceExamples,
                          setNounSentenceExamples,
                        )
                      }
                    />
                  </div>
                  <button
                    className="btn-close btn-close-white small-x-button"
                    aria-label="Close"
                    onClick={() =>
                      removeExample(
                        example.id,
                        nounSentenceExampleInputs,
                        setNounSentenceExampleInputs,
                      )
                    }
                  ></button>
                </div>
              ))}
              <button
                style={{ marginBottom: "10px" }}
                onClick={() => addSentenceExample(setNounSentenceExampleInputs)}
              >
                Add Example Sentence (Noun)
              </button>
            </div>
          )}

          {shownParts["verb"] && (
            <div>
              {verbSentenceExampleInputs.map((example) => (
                <div className="example-and-x-button" key={example.id}>
                  <div className="sentence-example-input thin-white-border">
                    <input
                      placeholder="enter example sentence"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "sentence",
                          e.target.value,
                          verbSentenceExamples,
                          setVerbSentenceExamples,
                        )
                      }
                    />
                    <input
                      placeholder="enter translation"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "translation",
                          e.target.value,
                          verbSentenceExamples,
                          setVerbSentenceExamples,
                        )
                      }
                    />
                  </div>
                  <button
                    className="btn-close btn-close-white small-x-button"
                    aria-label="Close"
                    onClick={() =>
                      removeExample(
                        example.id,
                        verbSentenceExampleInputs,
                        setVerbSentenceExampleInputs,
                      )
                    }
                  ></button>
                </div>
              ))}
              <button
                style={{ marginBottom: "10px" }}
                onClick={() => addSentenceExample(setVerbSentenceExampleInputs)}
              >
                Add Example Sentence (Verb)
              </button>
            </div>
          )}

          {shownParts["adj"] && (
            <div>
              {adjSentenceExampleInputs.map((example) => (
                <div className="example-and-x-button" key={example.id}>
                  <div className="sentence-example-input thin-white-border">
                    <input
                      placeholder="enter example sentence"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "sentence",
                          e.target.value,
                          adjSentenceExamples,
                          setAdjSentenceExamples,
                        )
                      }
                    />
                    <input
                      placeholder="enter translation"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "translation",
                          e.target.value,
                          adjSentenceExamples,
                          setAdjSentenceExamples,
                        )
                      }
                    />
                  </div>
                  <button
                    className="btn-close btn-close-white small-x-button"
                    aria-label="Close"
                    onClick={() =>
                      removeExample(
                        example.id,
                        adjSentenceExampleInputs,
                        setAdjSentenceExampleInputs,
                      )
                    }
                  ></button>
                </div>
              ))}
              <button
                style={{ marginBottom: "10px" }}
                onClick={() => addSentenceExample(setAdjSentenceExampleInputs)}
              >
                Add Example Sentence (Adjective)
              </button>
            </div>
          )}

          {shownParts["num"] && (
            <div>
              {numSentenceExampleInputs.map((example) => (
                <div className="example-and-x-button" key={example.id}>
                  <div className="sentence-example-input thin-white-border">
                    <input
                      placeholder="enter example sentence"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "sentence",
                          e.target.value,
                          numSentenceExamples,
                          setNumSentenceExamples,
                        )
                      }
                    />
                    <input
                      placeholder="enter translation"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "translation",
                          e.target.value,
                          numSentenceExamples,
                          setNumSentenceExamples,
                        )
                      }
                    />
                  </div>
                  <button
                    className="btn-close btn-close-white small-x-button"
                    aria-label="Close"
                    onClick={() =>
                      removeExample(
                        example.id,
                        numSentenceExampleInputs,
                        setNumSentenceExampleInputs,
                      )
                    }
                  ></button>
                </div>
              ))}
              <button
                style={{ marginBottom: "10px" }}
                onClick={() => addSentenceExample(setNumSentenceExampleInputs)}
              >
                Add Example Sentence (Num)
              </button>
            </div>
          )}

          {shownParts["adv"] && (
            <div>
              {advSentenceExampleInputs.map((example) => (
                <div className="example-and-x-button" key={example.id}>
                  <div className="sentence-example-input thin-white-border">
                    <input
                      placeholder="enter example sentence"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "sentence",
                          e.target.value,
                          advSentenceExamples,
                          setAdvSentenceExamples,
                        )
                      }
                    />
                    <input
                      placeholder="enter translation"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "translation",
                          e.target.value,
                          advSentenceExamples,
                          setAdvSentenceExamples,
                        )
                      }
                    />
                  </div>
                  <button
                    className="btn-close btn-close-white small-x-button"
                    aria-label="Close"
                    onClick={() =>
                      removeExample(
                        example.id,
                        advSentenceExampleInputs,
                        setAdvSentenceExampleInputs,
                      )
                    }
                  ></button>
                </div>
              ))}
              <button
                style={{ marginBottom: "10px" }}
                onClick={() => addSentenceExample(setAdvSentenceExampleInputs)}
              >
                Add Example Sentence (Adverb)
              </button>
            </div>
          )}

          {shownParts["adp"] && (
            <div>
              {adpSentenceExampleInputs.map((example) => (
                <div className="example-and-x-button" key={example.id}>
                  <div className="sentence-example-input thin-white-border">
                    <input
                      placeholder="enter example sentence"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "sentence",
                          e.target.value,
                          adpSentenceExamples,
                          setAdpSentenceExamples,
                        )
                      }
                    />
                    <input
                      placeholder="enter translation"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "translation",
                          e.target.value,
                          adpSentenceExamples,
                          setAdpSentenceExamples,
                        )
                      }
                    />
                  </div>
                  <button
                    className="btn-close btn-close-white small-x-button"
                    aria-label="Close"
                    onClick={() =>
                      removeExample(
                        example.id,
                        adpSentenceExampleInputs,
                        setAdpSentenceExampleInputs,
                      )
                    }
                  ></button>
                </div>
              ))}
              <button
                style={{ marginBottom: "10px" }}
                onClick={() => addSentenceExample(setAdpSentenceExampleInputs)}
              >
                Add Example Sentence (Adposition)
              </button>
            </div>
          )}

          {shownParts["part"] && (
            <div>
              {partSentenceExampleInputs.map((example) => (
                <div className="example-and-x-button" key={example.id}>
                  <div className="sentence-example-input thin-white-border">
                    <input
                      placeholder="enter example sentence"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "sentence",
                          e.target.value,
                          partSentenceExamples,
                          setPartSentenceExamples,
                        )
                      }
                    />
                    <input
                      placeholder="enter translation"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "translation",
                          e.target.value,
                          partSentenceExamples,
                          setPartSentenceExamples,
                        )
                      }
                    />
                  </div>
                  <button
                    className="btn-close btn-close-white small-x-button"
                    aria-label="Close"
                    onClick={() =>
                      removeExample(
                        example.id,
                        partSentenceExampleInputs,
                        setPartSentenceExampleInputs,
                      )
                    }
                  ></button>
                </div>
              ))}
              <button
                style={{ marginBottom: "10px" }}
                onClick={() => addSentenceExample(setPartSentenceExampleInputs)}
              >
                Add Example Sentence (Particle)
              </button>
            </div>
          )}

          {shownParts["interj"] && (
            <div>
              {interjSentenceExampleInputs.map((example) => (
                <div className="example-and-x-button" key={example.id}>
                  <div className="sentence-example-input thin-white-border">
                    <input
                      placeholder="enter example sentence"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "sentence",
                          e.target.value,
                          interjSentenceExamples,
                          setInterjSentenceExamples,
                        )
                      }
                    />
                    <input
                      placeholder="enter translation"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "translation",
                          e.target.value,
                          interjSentenceExamples,
                          setInterjSentenceExamples,
                        )
                      }
                    />
                  </div>
                  <button
                    className="btn-close btn-close-white small-x-button"
                    aria-label="Close"
                    onClick={() =>
                      removeExample(
                        example.id,
                        interjSentenceExampleInputs,
                        setInterjSentenceExampleInputs,
                      )
                    }
                  ></button>
                </div>
              ))}
              <button
                style={{ marginBottom: "10px" }}
                onClick={() =>
                  addSentenceExample(setInterjSentenceExampleInputs)
                }
              >
                Add Example Sentence (Interjection)
              </button>
            </div>
          )}

          {shownParts["conj"] && (
            <div>
              {conjSentenceExampleInputs.map((example) => (
                <div className="example-and-x-button" key={example.id}>
                  <div className="sentence-example-input thin-white-border">
                    <input
                      placeholder="enter example sentence"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "sentence",
                          e.target.value,
                          conjSentenceExamples,
                          setConjSentenceExamples,
                        )
                      }
                    />
                    <input
                      placeholder="enter translation"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "translation",
                          e.target.value,
                          conjSentenceExamples,
                          setConjSentenceExamples,
                        )
                      }
                    />
                  </div>
                  <button
                    className="btn-close btn-close-white small-x-button"
                    aria-label="Close"
                    onClick={() =>
                      removeExample(
                        example.id,
                        conjSentenceExampleInputs,
                        setConjSentenceExampleInputs,
                      )
                    }
                  ></button>
                </div>
              ))}
              <button
                style={{ marginBottom: "10px" }}
                onClick={() => addSentenceExample(setConjSentenceExampleInputs)}
              >
                Add Example Sentence (Conjunction)
              </button>
            </div>
          )}

          {shownParts["pron"] && (
            <div>
              {pronSentenceExampleInputs.map((example) => (
                <div className="example-and-x-button" key={example.id}>
                  <div className="sentence-example-input thin-white-border">
                    <input
                      placeholder="enter example sentence"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "sentence",
                          e.target.value,
                          pronSentenceExamples,
                          setPronSentenceExamples,
                        )
                      }
                    />
                    <input
                      placeholder="enter translation"
                      onChange={(e) =>
                        updateSentenceValue(
                          example.id,
                          "translation",
                          e.target.value,
                          pronSentenceExamples,
                          setPronSentenceExamples,
                        )
                      }
                    />
                  </div>
                  <button
                    className="btn-close btn-close-white small-x-button"
                    aria-label="Close"
                    onClick={() =>
                      removeExample(
                        example.id,
                        pronSentenceExampleInputs,
                        setPronSentenceExampleInputs,
                      )
                    }
                  ></button>
                </div>
              ))}
              <button
                style={{ marginBottom: "10px" }}
                onClick={() => addSentenceExample(setPronSentenceExampleInputs)}
              >
                Add Example Sentence (Pronoun)
              </button>
            </div>
          )}
        </div>

        <button className="delete-button" onClick={delWord}>
          Delete <i>{wordData.word}</i>
        </button>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-footer-buttons">
          <div className="non-delete-buttons">
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button variant="primary" onClick={save}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditWordModal;
