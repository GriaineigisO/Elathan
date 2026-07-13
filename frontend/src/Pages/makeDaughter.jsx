import { useTranslate } from "../Functions/TranslateUI";
import ParentLanguageModal from "../Components/parentLanguageModal";
import { useState, useEffect, useTransition, useRef } from "react";
import pLimit from "p-limit";
import applySoundChange from "../Functions/soundChange";
import CategoryManager from "../Components/syllableCategories.jsx";
import SpellingCreator from "../Components/spellingCreator.jsx";
import spell from "../Components/orthography.jsx";
import semanticDrift from "../Functions/semanticShift.jsx";
import React from "react";
import Collapsible from "../Components/collapsable.jsx";
import DictionaryEntry from "../Components/DictionaryForMakeDaughter.jsx";
import applyProsody from "../Functions/prosody/applyProsody.jsx";
import { List } from "react-window";
import PaginateMakeDaughter from "../Components/PaginateMakeDaughter.jsx";
import meaningKeys from "../assets/meaningKeys.jsx";
import grammaticalise from "../Functions/grammaticalise.jsx";
import grammaticalisations from "../assets/grammaticalisations.jsx";
import semanticDriftRules from "../assets/semanticDrifts.jsx";
import ThemeSelection from "../Components/themeSelection.jsx";
import SoundChangeMaker from "../Components/soundChangeMaker.jsx";


const MakeDaughter = () => {
  const { translate } = useTranslate();
  const parentWasSelected = useRef(false);
  const [trigger, setTrigger] = useState(0);
  const [chosenThemes, setChosenThemes] = useState([]);
  const [transformedWords, setTransformedWords] = useState({});
  const [parentThemes, setParentThemes] = useState([]);
  const [showParentLanguageModal, setShowParentLanguageModal] = useState(false);
  const [selectedParentLanguage, setSelectedParentLanguage] = useState(null);
  const [words, setWords] = useState([]);
  const [daughterLanguageName, setDaughterLanguageName] = useState("?");
  // const [applyingSoundChanges, setApplyingSoundChanges] = useState(false);
  // const [appliedSoundChanges, setAppliedSoundChanges] = useState(false);
  const [isPending, startTransition] = useTransition();
  // const [environmentOptions, setEnvironmentOptions] = useState("unconditional");
  const [selectedSoundChanges, setSelectedSoundChanges] = useState([]);
  // const [originalSound, setOriginalSound] = useState();
  // const [resultingSound, setResultingSound] = useState();
  // const [environmentSound1, setEnvironmentSound1] = useState();
  // const [environmentSound2, setEnvironmentSound2] = useState();
  const [loading, setLoading] = useState(false);
  const [allCategoryValues, setAllCategoryValues] = useState({});
  const [spellings, setSpellings] = useState([]);
  const [daughterLanguageId, setDaughterLanguageId] = useState();
  const [motherLanguageId, setMotherLanguageId] = useState();
  const [languageId, setLanguageId] = useState();
  const [showLanguageSavedMessage, setShowLanguageSavedMessage] =
    useState(false);
  const [prosodyType, setProsodyType] = useState("stress");
  // const [primaryStressPlacement, setPrimaryStressPlacement] = useState("first");
  // const [whenNoHeavySyllable, setWhenNoHeavySyllable] = useState("first");
  const [loadingWords, setLoadingWords] = useState(false);


  const openSelectParentLanguageModal = () => {
    setShowParentLanguageModal(true);
  };

  const removeSelectedParentLanguage = () => {
    setSelectedParentLanguage(null);
  };

  const getAllWords = async (id) => {
    setLoadingWords(true);
    try {
      // 1️⃣ Fetch all words
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getAllWords`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );

      let data = await response.json();

      // 3️⃣ Separate affixes
      const affixes = data.filter((word) =>
        ["suffix", "prefix", "proclitic", "enclitic"].includes(word.word_type)
      );
      // 4️⃣ Fetch derivations in batches (limit concurrency)
      const limit = pLimit(10); // adjust concurrency as needed
      const MAX_DERIVATIONS = 300; // or whatever seems reasonable

      const affixesWithDerivations = await Promise.all(
        affixes.map((affix) =>
          limit(async () => {
            try {
              const derivations = await withTimeout(
                getDerivations(affix),
                5000
              );
              const trimmed = derivations.slice(0, MAX_DERIVATIONS);
              if (derivations.length > MAX_DERIVATIONS)
                return { ...affix, derivations: trimmed };
            } catch (err) {
              return { ...affix, derivations: [] };
            }
          })
        )
      );

      // 5️⃣ Merge derivations back into main word array
      const dataWithDerivations = data.map((word) => {
        if (
          ["suffix", "prefix", "proclitic", "enclitic"].includes(word.word_type)
        ) {
          const match = affixesWithDerivations.find((a) => a.id === word.id);
          return match || word; // use derivations if found
        }
        return word;
      });

      // 6️⃣ Update state
      //setAllAffixes(affixesWithDerivations);

      elimateRandomWords();

      setWords(data);
    } catch (err) {
      console.error("Error fetching or processing words:", err);
    }
  };

  useEffect(() => {
    if (selectedParentLanguage) {
      getAllWords(selectedParentLanguage.language_id);
      setSpellings(selectedParentLanguage.spellings);
      setChosenThemes(selectedParentLanguage.themes);
      setParentThemes(selectedParentLanguage.themes);
    }
  }, [selectedParentLanguage]);

  const handleLanguageName = (name) => {
    setDaughterLanguageName(name);
  };

  // const handleOriginalSound = (value) => {
  //   setOriginalSound(value);
  // };

  // const handleResultingSound = (value) => {
  //   setResultingSound(value);
  // };

  // const handleFirstEnvironmentSound = (value) => {
  //   setEnvironmentSound1(value);
  // };

  // const handleSecondEnvironmentSound = (value) => {
  //   setEnvironmentSound2(value);
  // };

  // const submitSoundChange = (
  //   prosodyType,
  //   primaryStressPlacement,
  //   whenNoHeavySyllable,
  //   soundOrProsody
  // ) => {
  //   //store spellings in cache
  //   localStorage.setItem("spellingsCache", JSON.stringify(spellings));

  //   setAppliedSoundChanges(false);
  //   if (soundOrProsody === "sound") {
  //     //change is a sound change
  //     const newObj = {
  //       originalSound,
  //       resultingSound,
  //       environment: {
  //         type: environmentOptions,
  //         firstEnvironmentSound: environmentSound1 || null,
  //         secondEnvironmentSound: environmentSound2 || null,
  //       },
  //     };

  //     // Create the updated list of sound changes
  //     const updatedChanges = [...selectedSoundChanges, newObj];

  //     //Apply updatedChanges, NOT selectedSoundChanges
  //     const newTransformed = {};

  //     //Save both the new sound change and the transformed forms
  //     setSelectedSoundChanges(updatedChanges);
  //     localStorage.setItem("soundChangesCache", JSON.stringify(updatedChanges));
  //   } else {
  //     //change is a prosody change
  //     const newObj = {
  //       prosodyType: prosodyType,
  //       primaryStressPlacement: primaryStressPlacement,
  //       whenNoHeavySyllable: whenNoHeavySyllable,
  //     };
  //     // Create the updated list of sound changes
  //     const updatedChanges = [...selectedSoundChanges, newObj];

  //     //Apply updatedChanges, NOT selectedSoundChanges
  //     const newTransformed = {};

  //     //Save both the new sound change and the transformed forms
  //     setSelectedSoundChanges(updatedChanges);
  //     //save in cache to prevent losing long list of changes due to accidental reloading or closing of tab
  //     localStorage.setItem("soundChangesCache", JSON.stringify(updatedChanges));
  //   }
  // };

  useEffect(() => {
    const soundChangesCache = localStorage.getItem("soundChangesCache");
    if (soundChangesCache) {
      setSelectedSoundChanges(JSON.parse(soundChangesCache));
    }

    const parentCache = localStorage.getItem("parentCache");
    if (parentCache) {
      setSelectedParentLanguage(JSON.parse(parentCache));
    }

    const spellingsCache = localStorage.getItem("spellingsCache");
    if (spellingsCache) {
      setSpellings(JSON.parse(spellingsCache));
    }
  }, []);

  // const removeSoundChange = (indexToRemove) => {
  //   setSelectedSoundChanges((prevForms) =>
  //     prevForms.filter((_, i) => i !== indexToRemove)
  //   );
  //   setAppliedSoundChanges(false);
  // };

  // const moveChangeUp = (index) => {
  //   if (index === 0) return; // already at top

  //   setSelectedSoundChanges((prev) => {
  //     const updated = [...prev];
  //     const temp = updated[index - 1];
  //     updated[index - 1] = updated[index];
  //     updated[index] = temp;
  //     return updated;
  //   });
  //   setAppliedSoundChanges(false);
  // };

  // const moveChangeDown = (index) => {
  //   setSelectedSoundChanges((prev) => {
  //     if (index === prev.length - 1) return prev; // already at bottom

  //     const updated = [...prev];
  //     const temp = updated[index + 1];
  //     updated[index + 1] = updated[index];
  //     updated[index] = temp;
  //     return updated;
  //   });
  //   setAppliedSoundChanges(false);
  // };

  // const applySoundChanges = async () => {
  //   setLoading(true);
  //   await getAllWords();

  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // };

  // const toggleStressShiftWithAffix = (set) => {
  //   if (stressShiftWithAffix) {
  //     set(false);
  //   } else {
  //     set(true);
  //   }
  // };

  useEffect(() => {
    if (chosenThemes && chosenThemes.length > 0) {
      elimateRandomWords();
    }
  }, [chosenThemes]);

  const handleCategoryValuesChange = (values, setValues) => {
    setAllCategoryValues(values);
  };

  let lastGeneratedId = 0;
  function generateSafeId() {
    const base = Date.now() * 100;
    const randomPart = Math.floor(Math.random() * 100);
    let id = base + randomPart;
    if (id <= lastGeneratedId) id = lastGeneratedId + 1;
    lastGeneratedId = id;
    return id;
  }

  const handleOpenLanguage = () => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/dictionary/${languageId}`,
      "_blank"
    );
  };

  // const applyNewSoundChanges = () => {
  //   setShowLanguageSavedMessage(false);
  //   setApplyingSoundChanges(true);
  //   setAppliedSoundChanges(false);

  //   setTimeout(() => {
  //     const changes = selectedSoundChanges; // now guaranteed updated
  //     const newTransformed = {};

  //     words.forEach((word) => {
  //       let changed = "";


  //       if (word.grammaticalised_word) {
          
  //         changed = applySoundChange(
  //           word.grammaticalised_word,
  //           changes,
  //           allCategoryValues
  //         );
  //       } else {
  //         changed = applySoundChange(word.ipa, changes, allCategoryValues);
  //       }

  //       newTransformed[word.word_id] = {
  //         ipa: changed,
  //         spelled: spell(changed, spellings),
  //       };

  //       //now apply sound changes to word forms
  //       let changedWordForms = [];
  //       meaningKeys.forEach((key) => {
  //         if (word[key.forms]) {
  //           const wordForms = word[key.forms];
  //           const formArr = [];
  //           wordForms.forEach((form) => {
  //             const changedForm = applySoundChange(
  //               form.ipa,
  //               changes,
  //               allCategoryValues
  //             );
  //             const obj = {
  //               ipa: changedForm,
  //               name: form.name,
  //               type: form.type,
  //               word: spell(changedForm, spellings),
  //             };
  //             formArr.push(obj);
  //           });
  //           newTransformed[word.word_id][key.forms] = formArr;
  //         }
  //       });
  //     });

  //     setTransformedWords(newTransformed);
  //     setApplyingSoundChanges(false);
  //     setAppliedSoundChanges(true);
  //   }, 0);
  // };

  const saveLanguage = async () => {
    setLoading(true);

    setDaughterLanguageId(generateSafeId());

    //filter out words that were unchecked
    const checkedWords = words.filter((word) => checked[word.word_id]);

    const wordForms = [];
    const wordCategories = [];

    checkedWords.forEach((word) => {
      word.word = spell(
        applySoundChange(word.ipa, selectedSoundChanges, allCategoryValues),
        spellings
      );
      word.ipa = applySoundChange(
        word.ipa,
        selectedSoundChanges,
        allCategoryValues
      );
      (word.etymology = {
        etymology_type: "fromMother",
        mother_word_id: word.word_id,
        etymology_id: generateSafeId(),
      }),
        (word.id = generateSafeId());
      word.language_id = daughterLanguageId;

      meaningKeys.forEach((key) => {
        //word forms
        if (word[key.forms]) {
          word[key.forms].forEach((form) => {
            const obj = { name: form.name, type: form.type };

            if (
              !wordForms.some((o) => o.name === obj.name && o.type === obj.type)
            ) {
              wordForms.push(obj);
            }

            

            (form.ipa = applySoundChange(
              form.ipa,
              selectedSoundChanges,
              allCategoryValues
            )),
              (form.word = spell(
                applySoundChange(
                  form.ipa,
                  selectedSoundChanges,
                  allCategoryValues
                ),
                spellings
              ));
          });
        }
      });
    });

    const userId = localStorage.getItem("userId");

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/saveConlang`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          words: checkedWords,
          motherLanguageId: selectedParentLanguage.language_id,
          userId,
          nameToUse: daughterLanguageName,
          spellings,
          themes: chosenThemes,
          wordCategories: selectedParentLanguage.word_categories,
          wordForms,
        }),
      }
    );

    const data = await response.json();

    if (data) {
      setShowLanguageSavedMessage(true);
      setLanguageId(data.languageId);
      setLoading(false);
    }
  };

  const [checked, setChecked] = useState({});

  const elimateRandomWords = () => {
    setLoadingWords(true);
    if (!words || words.length === 0) return;
    const swadeshList = [
      "not",
      "all",
      "many",
      "some",
      "few",
      "other",
      "one",
      "two",
      "three",
      "four",
      "five",
      "big",
      "long",
      "wide",
      "thick",
      "heavy",
      "small",
      "short",
      "narrow",
      "thin",
      "woman",
      "man",
      "child",
      "wife",
      "husband",
      "mother",
      "father",
      "animal",
      "fish",
      "bird",
      "dog",
      "louse",
      "snake",
      "worm",
      "tree",
      "forest",
      "stick",
      "fruit",
      "seed",
      "leaf",
      "root",
      "bark",
      "flower",
      "grass",
      "rope",
      "skin",
      "meat",
      "blood",
      "bone",
      "fat",
      "egg",
      "horn",
      "tail",
      "feather",
      "hair",
      "head",
      "ear",
      "eye",
      "nose",
      "mouth",
      "tooth",
      "tongue",
      "fingernail",
      "foot",
      "leg",
      "knee",
      "hand",
      "wing",
      "belly",
      "guts",
      "neck",
      "back",
      "breast",
      "heart",
      "liver",
      "drink",
      "eat",
      "bite",
      "suck",
      "spit",
      "vomit",
      "blow",
      "breathe",
      "laugh",
      "see",
      "hear",
      "know",
      "think",
      "smell",
      "fear",
      "sleep",
      "live",
      "die",
      "kill",
      "fight",
      "hunt",
      "hit",
      "cut",
      "split",
      "stab",
      "scratch",
      "dig",
      "swim",
      "fly",
      "walk",
      "come",
      "lie",
      "sit",
      "stand",
      "turn",
      "fall",
      "give",
      "hold",
      "squeeze",
      "rub",
      "wash",
      "wipe",
      "pull",
      "push",
      "throw",
      "tie",
      "sew",
      "count",
      "say",
      "sing",
      "play",
      "float",
      "flow",
      "freeze",
      "swell",
      "sun",
      "moon",
      "star",
      "water",
      "rain",
      "river",
      "lake",
      "sea",
      "salt",
      "stone",
      "sand",
      "dust",
      "earth",
      "cloud",
      "fog",
      "sky",
      "wind",
      "snow",
      "ice",
      "smoke",
      "fire",
      "ash",
      "burn",
      "road",
      "mountain",
      "red",
      "green",
      "yellow",
      "white",
      "black",
      "night",
      "day",
      "year",
      "warm",
      "cold",
      "full",
      "new",
      "old",
      "good",
      "bad",
      "rotten",
      "dirty",
      "straight",
      "round",
      "sharp",
      "dull",
      "smooth",
      "wet",
      "dry",
      "correct",
      "near",
      "far",
      "right",
      "left",
      "at",
      "in",
      "with",
      "and",
      "if",
      "because",
      "name",
    ];

    const initial = {};
    let excludedWords = 0;
    words.forEach((word) => {
      //semantic drift
      word["new_meaning"] = semanticDrift(word, chosenThemes, parentThemes);

      grammaticalise(word, prosodyType);

      //if word has grammaticalised meaning, apply them here and remove previous meanings
      if ( word.grammaticalised_meaning) {
       
      word.new_meaning.affix_meaning = word.grammaticalised_meaning
        .affix_meaning
        ? word.grammaticalised_meaning.affix_meaning
        : null;
      word.new_meaning.part_meaning = word.grammaticalised_meaning.part_meaning
        ? word.grammaticalised_meaning.part_meaning
        : null;
        word.new_meaning.adp_meaning = word.grammaticalised_meaning.adp_meaning
        ? word.grammaticalised_meaning.adp_meaning
        : null;
         word.new_meaning.conj_meaning = word.grammaticalised_meaning.conj_meaning
        ? word.grammaticalised_meaning.conj_meaning
        : null;
         word.new_meaning.adv_meaning = word.grammaticalised_meaning.adv_meaning
        ? word.grammaticalised_meaning.adv_meaning
        : null;
        word.new_meaning.adj_meaning = word.grammaticalised_meaning.adj_meaning
        ? word.grammaticalised_meaning.adv_meaning
        : null;
         word.new_meaning.adj_meaning = word.grammaticalised_meaning.interj_meaning
        ? word.grammaticalised_meaning.interj_meaning
        : null;

         word.new_meaning.noun_meaning = word.grammaticalised_meaning.noun_meaning
        ? word.grammaticalised_meaning.noun_meaning
        : null;

         word.new_meaning.num_meaning = word.grammaticalised_meaning.num_meaning
        ? word.grammaticalised_meaning.num_meaning
        : null;

         word.new_meaning.verb_meaning = word.grammaticalised_meaning.verb_meaning
        ? word.grammaticalised_meaning.verb_meaning
        : null;

         word.new_meaning.pron_meaning = word.grammaticalised_meaning.pron_meaning
        ? word.grammaticalised_meaning.pron_meaning
        : null;

   

      if (word.new_meaning.affix_meaning) {
        word["daughter_word_type"] = word.grammaticalised_word_type;
      } else {
        word["daughter_word_type"] = "word";
      }
    }



      const isInSwadeshList =
        swadeshList.includes(word.noun_meaning) ||
        swadeshList.includes(word.num_meaning) ||
        swadeshList.includes(word.verb_meaning) ||
        swadeshList.includes(word.adj_meaning) ||
        swadeshList.includes(word.adv_meaning) ||
        swadeshList.includes(word.adp_meaning) ||
        swadeshList.includes(word.pron_meaning) ||
        swadeshList.includes(word.part_meaning) ||
        swadeshList.includes(word.interj_meaning) ||
        swadeshList.includes(word.pron_meaning) ||
        swadeshList.includes(word.conj_meaning);

        //ensure that no more than 30% of the vocab is excluded
        const limitReached = words.length / excludedWords * 100 === 30;

      if (!isInSwadeshList && !limitReached) {
        if (Math.floor(Math.random() * 10) < 7) {
          initial[word.word_id] = true;
          
        } else {
          initial[word.word_id] = false;
          excludedWords++;
        }
      } else {
        initial[word.word_id] = true;
      }
    });

    setChecked(initial);
    setLoadingWords(false);
  };

  useEffect(() => {
    if (selectedParentLanguage) {
      parentWasSelected.current = true;
      if (words) {
        elimateRandomWords();
      }
    }
  }, [selectedParentLanguage]);

  useEffect(() => {
    if (words && parentWasSelected.current) {
      elimateRandomWords();
    }
  }, [words]);

  const totalWords = words.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const uncheckedCount = totalWords - checkedCount;

  const posKeys = {
    noun_meaning: "n",
    num_meaning: "num",
    verb_meaning: "v",
    adj_meaning: "adj",
    adv_meaning: "adv",
    adp_meaning: "adp",
    pron_meaning: "pron",
    part_meaning: "part",
    conj_meaning: "conj",
    interj_meaning: "interj",
    affix_meaning: "affix",
  };

  function meaningsChanged(oldWord, newWord) {
    if (!newWord) return false;

    const posKeys = [
      "noun_meaning",
      "num_meaning",
      "verb_meaning",
      "adj_meaning",
      "adv_meaning",
      "adp_meaning",
      "pron_meaning",
      "part_meaning",
      "conj_meaning",
      "interj_meaning",
      "affix_meaning",
    ];

    return posKeys.some((pos) => {
      const oldVals = oldWord[pos] || [];
      const newVals = newWord[pos] || [];

      // Make sure we always compare arrays
      const oldArr = Array.isArray(oldVals) ? oldVals : [oldVals];
      const newArr = Array.isArray(newVals) ? newVals : [newVals];

      return JSON.stringify(oldArr) !== JSON.stringify(newArr);
    });
  }

  
  let semanticDriftCount = 0;

for (const arr of Object.values(semanticDriftRules)) {
  semanticDriftCount += arr.length;
}


  return (
    <div>
      <ParentLanguageModal
        show={showParentLanguageModal}
        setShow={setShowParentLanguageModal}
        selectedParentLanguage={selectedParentLanguage}
        setSelectedParentLanguage={setSelectedParentLanguage}
      />

      <span>{translate("{num} possible grammaticalisations and {num2} possible semantic shifts.", {
          num: grammaticalisations.length,
          num2: semanticDriftCount.toLocaleString()
        })}</span>

      <div className="thin-white-border">
        <input
          onChange={(e) => handleLanguageName(e.target.value)}
          placeholder={translate("Language Name")}
        />
      </div>

      <div className="thin-white-border">
        {!selectedParentLanguage ? (
          <button onClick={openSelectParentLanguageModal}>
            {translate("Select Parent Language")}
          </button>
        ) : (
          <div>
            <span>
              {translate("Selected parent language")}:{" "}
              {selectedParentLanguage.language_name}
            </span>
            <button
              className="btn-close btn-close-white small-x-button"
              aria-label="Close"
              onClick={removeSelectedParentLanguage}
            ></button>
          </div>
        )}
      </div>

      <Collapsible title={"Sound Changes Applier"}>
       <SoundChangeMaker handleCategoryValuesChange={handleCategoryValuesChange} words={words} soundChangeOrPhonotactic={"sound-change"} spellings={spellings} selectedSoundChanges={selectedSoundChanges} setSelectedSoundChanges={setSelectedSoundChanges} allCategoryValues={allCategoryValues} prosodyType={prosodyType} setProsodyType={setProsodyType}/>
      </Collapsible>

      <div
        id="sound-change-spelling"
        // style={{ display: "flex", flexDirection: "row" }}
      >
       

        <Collapsible title={translate("Create Spellings")}>
          <div className="thin-white-border">
            <SpellingCreator
              spellings={spellings}
              setSpellings={setSpellings}
            />
          </div>
        </Collapsible>
      </div>

      <Collapsible title={translate("Themes")}>
              <ThemeSelection chosenThemes={chosenThemes} setChosenThemes={setChosenThemes}/>      
            </Collapsible>

      <div className="thin-white-border">
        <button onClick={saveLanguage}>{translate("Save Language")}</button>
        
      </div>

      {showLanguageSavedMessage ? (
        <div>
          <p className="word-link" onClick={handleOpenLanguage}>
            {translate(
              "Your new language has been saved! Click here to view it"
            )}
          </p>
        </div>
      ) : (
        <></>
      )}

      {loadingWords && selectedParentLanguage && (
        <h2>
          {translate("Getting words from {parentLanguage}...", {
            parentLanguage: selectedParentLanguage.language_name,
          })}
        </h2>
      )}

      {!showLanguageSavedMessage && selectedParentLanguage && !loadingWords && (
        <div className="thin-white-border" style={{ marginTop: "30px" }}>
          <h2>{translate("Live Preview of Words")}</h2>
          <p>
            {translate("See in real time the affects of your sound changes")}
          </p>
          <p>
            {translate(
              "Toggle whether a word will be passed down to the daughter language. By default, 30% of words, chosen at random  though excluding words in the Swadesh list, will not be passed down"
            )}
          </p>

          <p>
            {translate(
              "{checkedCount} ({checkedCountPercent}%) words chosen to be passed down and {uncheckedCount} ({uncheckedCountPercent}%) words excluded.",
              {
                checkedCount: checkedCount,
                uncheckedCount: uncheckedCount,
                checkedCountPercent: (
                  (checkedCount / totalWords) *
                  100
                ).toFixed(2),
                uncheckedCountPercent: (
                  (uncheckedCount / totalWords) *
                  100
                ).toFixed(2),
              }
            )}
          </p>

          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
              }}
            >
              <div className="spinner"></div>
            </div>
          )}

          {!loadingWords && words && (
            <PaginateMakeDaughter
              words={words}
              checked={checked}
              setChecked={setChecked}
              transformedWords={transformedWords}
              posKeys={posKeys}
              selectedParentLanguage={selectedParentLanguage}
              daughterLanguageName={daughterLanguageName}
              meaningsChanged={meaningsChanged}
              loading={loading}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MakeDaughter;
