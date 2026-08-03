import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTranslate } from "../Functions/TranslateUI";
import meaningKeys from "../assets/meaningKeys";
import Collapsible from "../Components/collapsable";
import themes from "../assets/themes";
import capitaliseFirstLetter from "../Functions/capitaliseFirstLetter.jsx";
import affixArray from "../assets/affixArray";
import potentialAffixArray from "../assets/potentialAffixArray";
import WordViewer from "../Components/wordViewer.jsx";
import compoundDerivations from "../assets/compoundDerivations";
import semanticDrifts from "../assets/semanticDrifts.jsx";

const DevTools = () => {
  const { translate } = useTranslate();
  const activeCompoundRowRef = useRef(null);
  const activeDerivationRowRef = useRef(null);
  const activeSemanticShiftRowRef = useRef(null);
  const [lists, setLists] = useState({});
  const [viewedListCompound, setViewedListCompound] = useState([]);
  const [viewedListSemanticShift, setViewedListSemanticShift] = useState([]);
  const [viewedListDerivation, setViewedListDerivation] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [firstWordPartofSpeech, setFirstWordPartofSpeech] =
    useState("noun_meaning");
  const [secondWordPartofSpeech, setSecondWordPartofSpeech] =
    useState("noun_meaning");
  const [compoundPartofSpeech, setCompoundPartofSpeech] =
    useState("noun_meaning");

  const [firstWordMeaning, setFirstWordMeaning] = useState();
  const [secondWordMeaning, setSecondWordMeaning] = useState();
  const [compoundMeaning, setCompoundMeaning] = useState();

  const [selectedAffixName, setSelectedAffixName] = useState();
  const [selectedAffixDescription, setSelectedAffixDescription] = useState();

  const [compounds, setCompounds] = useState([]);
  const [chosenInput, setChosenInput] = useState();
  const [compoundProgress, setCompoundProgress] = useState();
  const [derivationProgress, setDerivationProgress] = useState();
  const [semanticShiftProgress, setSemanticShiftProgress] = useState();

  const [newWordPartOfSpeech, setNewWordPartOfSpeech] =
    useState("noun_meaning");
  const [newWordPartOfSpeechCheck, setNewWordPartOfSpeechCheck] =
    useState("noun");
  const [allWordsAdded, setAllWordsAdded] = useState(false);
  const [newWord, setNewWord] = useState();
  const [newWords, setNewWords] = useState([]);
  const [chosenThemes, setChosenThemes] = useState([]);
  const [newWordsDisplay, setNewWordsDisplay] = useState([]);
  const [newWordType, setNewWordType] = useState("word");
  const [existantWord, setExistantWord] = useState();
  const [wordExistsWarning, setWordExistsWarning] = useState(false);
  const [originalPartofSpeech, setOriginalPartofSpeech] =
    useState("noun_meaning");
  const [derivedPartofSpeech, setDerivedPartofSpeech] =
    useState("noun_meaning");
  const [originalMeaning, setOriginalMeaning] = useState();
  const [derivedMeaning, setDerivedMeaning] = useState();
  const [derivations, setDerivations] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [derivedThemes, setDerivedThemes] = useState([]);
  const [unshiftedMeaning, setUnshiftedMeaning] = useState();
  const [unshiftedPartofSpeech, setUnshiftedPartofSpeech] =
    useState("noun_meaning");
  const [shiftedMeaning, setShiftedMeaning] = useState();
  const [shiftedPartofSpeech, setShiftedPartofSpeech] =
    useState("noun_meaning");
  const [shiftedThemes, setShiftedThemes] = useState([]);
  const [pendingSemanticShifts, setPendingSemanticShifts] = useState([]);
  const [semanticData, setSemanticData] = useState(semanticDrifts);
  const [coreEnglishWords, setCoreEnglishWords] = useState([]);
  const [allAffixes, setAllAffixes] = useState([]);
  const [allDerivations, setAllDerivations] = useState([]);

  const getData = async () => {
    const derivationsResponse = await fetch("/affixDerivations.json");
    const derivs = await derivationsResponse.json();
    setDerivations(derivs);
    setAllDerivations(derivs)

    const coreEnglishWordsResponse = await fetch("/coreEnglishWords.json");
    const coreEng = await coreEnglishWordsResponse.json();
    setCoreEnglishWords(coreEng);

    const affixes = affixArray.concat(potentialAffixArray);

    affixes.sort((a, b) => a.affixName.localeCompare(b.affixName));

    setAllAffixes(affixes);

setSelectedAffixName(affixes[0].affixName);
setSelectedAffixDescription(affixes[0].affixDescription);

  };

  useEffect(() => {
    getData();
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

  useEffect(() => {
    const next = [];

    coreEnglishWords.forEach((word) => {
      if (!next.includes(word)) {
        next.push(word);
      }
    });

    allDerivations.forEach((d) => {
      const key = d.derivedPartOfSpeech;
      let value = d.derivedMeanings;

      value.forEach((val) => {
        if (!next.some((item) => item[key] && item[key][0] === val)) {
          next.push({
            word_type: "word",
            [key]: [val],
          });
        }
      });
    });

    compoundDerivations.forEach((d) => {
      const key = d[1].pos;
      let value = d[1].meaning;

      value.forEach((val) => {
        if (!next.some((item) => item[key] && item[key][0] === val)) {
          next.push({
            word_type: "word",
            [key]: [val],
          });
        }
      });
    });

    setAllWords(next);
    setAllWordsAdded(true);
  }, []);

  function splitByPartOfSpeech(partOfSpeech) {
    const filteredByPartofSpeech = allWords.filter(
      (word) => word[partOfSpeech],
    );

    filteredByPartofSpeech.sort((a, b) =>
      a[partOfSpeech][0].localeCompare(b[partOfSpeech][0]),
    );

    return filteredByPartofSpeech;
  }

  useEffect(() => {
    if (allWordsAdded) {
      meaningKeys.forEach((key) => {
        lists[key.type] = splitByPartOfSpeech(key.meaning);
      });

      setViewedListSemanticShift(lists["noun"]);
      const rawShift = localStorage.getItem("semanticShiftProgress");
      const shiftProgress = rawShift
        ? JSON.parse(rawShift)
        : { partOfSpeech: "noun", index: 0 };

      setSemanticShiftProgress(shiftProgress);

      if (activeSemanticShiftRowRef.current) {
        activeSemanticShiftRowRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      setViewedListCompound(lists["noun"]);
      const raw = localStorage.getItem("compoundProgress");
      const compProgress = raw
        ? JSON.parse(raw)
        : { partOfSpeech: "noun", index: 0 };

      setCompoundProgress(compProgress);

      if (activeCompoundRowRef.current) {
        activeCompoundRowRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      setViewedListDerivation(lists["noun"]);
      const rawDerivation = localStorage.getItem("derivationProgress");
      const compProgressDerivation = rawDerivation
        ? JSON.parse(rawDerivation)
        : { partOfSpeech: "noun", index: 0 };

      setDerivationProgress(compProgressDerivation);

      if (activeDerivationRowRef.current) {
        activeDerivationRowRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [allWordsAdded]);

  function viewPartOfSpeech(type) {
    setViewedListCompound(lists[type]);
    setViewedListDerivation(lists[type]);
    setViewedListSemanticShift(lists[type]);
  }

  function submitCompound() {
    const firstMeaning = firstWordMeaning.includes(",")
      ? firstWordMeaning.replace(", ", "").split(",")
      : [firstWordMeaning];
    const secondMeaning = secondWordMeaning.includes(",")
      ? secondWordMeaning.replace(", ", ",").split(",")
      : [secondWordMeaning];
    const compMeaning = compoundMeaning.includes(",")
      ? compoundMeaning.replace(", ", ",").split(",")
      : [compoundMeaning];

    const compound = [
      { meaning: firstMeaning, pos: firstWordPartofSpeech },
      { meaning: secondMeaning, pos: secondWordPartofSpeech },
      {
        meaning: compMeaning,
        pos: compoundPartofSpeech,
        themes: [],
      },
    ];

    setCompounds((prev) => [...prev, compound]);
  }

  function submitDerivation() {
    setChosenInput("original");

    const original = originalMeaning.includes(",")
      ? originalMeaning.replace(", ", ",").split(",")
      : [originalMeaning];

    const derived = derivedMeaning.includes(",")
      ? derivedMeaning.replace(", ", ",").split(",")
      : [derivedMeaning];

    const derivation = {
      chance: 50,
      affix: selectedAffixName,
      originalPartOfSpeech: originalPartofSpeech,
      originalMeanings: original,
      derivedPartOfSpeech: derivedPartofSpeech,
      derivedMeanings: derived,
      themes: derivedThemes,
    };

    setDerivations((prev) => [...prev, derivation]);
  }

  function addShiftedTheme(theme) {
    if (!shiftedThemes.includes(theme))
      setShiftedThemes((prev) => [...prev, theme]);
  }

  function submitSemanticShift() {
    setChosenInput("unshifted");

    const shifted = shiftedMeaning.includes(",")
      ? [
          shiftedMeaning
            .split(",")
            .map((m) => `"${m.trim()}"`)
            .join(", "),
        ]
      : [shiftedMeaning];

    const obj = {
      [unshiftedPartofSpeech]: unshiftedMeaning,
      shifted_meanings: shifted.map((newMeaning) => {
        return { [shiftedPartofSpeech]: newMeaning };
      }),
      themes: shiftedThemes.map((theme) => {
        return theme;
      }),
    };

    setPendingSemanticShifts((prev) => [...prev, obj]);
  }

  function buildSemanticDisplay(data) {
    return `
const semanticDrifts = [
${data
  .map((shift) => {
    const key = meaningKeys.find((k) => shift[k.meaning]);
    if (!key) return "";

    return `{
    "${key.meaning}": "${shift[key.meaning]}",
    "shifted_meanings": [
      ${shift.shifted_meanings
        .map((meaning) => {
          const innerKey = meaningKeys.find((k) => meaning[k.meaning]);
          if (!innerKey) return "";

          return `{
          "${innerKey.meaning}": "${meaning[innerKey.meaning]}"
        }`;
        })
        .join(",\n")}
    ]
  }`;
  })
  .join(",\n")}
];

export default semanticDrifts;
`;
  }

  function applySemanticShifts() {
    const driftIndex = new Map();
    // key: `${partOfSpeech}:${meaning}` → shift object

    semanticDrifts.forEach((shift) => {
      const keyEntry = meaningKeys.find((k) => shift[k.meaning]);
      if (!keyEntry) return;

      const key = `${keyEntry.meaning}:${shift[keyEntry.meaning]}`;
      driftIndex.set(key, shift);
    });

    pendingSemanticShifts.forEach((pending) => {
      const key = `${Object.keys(pending)[0]}:${Object.values(pending)[0]}`;
      const existing = driftIndex.get(key);

      if (existing) {
        // merge into existing entry
        pending.shifted_meanings.forEach((newMeaningObj) => {
          const pos = Object.keys(newMeaningObj)[0];
          const val = newMeaningObj[pos];

          const alreadyExists = existing.shifted_meanings.some(
            (m) => m[pos] === val,
          );

          if (!alreadyExists) {
            existing.shifted_meanings.push({ [pos]: val });
          }
        });
      } else {
        // add new entry
        const newEntry = {
          ...pending,
          shifted_meanings: [...pending.shifted_meanings],
        };

        semanticDrifts.push(newEntry);

        driftIndex.set(key, newEntry);
      }
    });

    const meaningKeySet = new Set(meaningKeys.map((k) => k.meaning));

    const updated = [...semanticData];
    setSemanticData(updated);
    const text = buildSemanticDisplay(updated);
    navigator.clipboard.writeText(text);

    showToast(translate("Semantic shifts copied to clipboard"));

    setPendingSemanticShifts([]);
  }

  useEffect(() => {
    setNewWordsDisplay(newWords.join(" "));
  }, [newWords]);

  function selectInput(choice) {
    setChosenInput(choice);
  }

  function submitNewWord() {
    setWordExistsWarning(false);

    let bool = wordExistsWarning;
    //first, check if word is already in the dictionary
    lists[newWordPartOfSpeechCheck].forEach((word) => {
      if (word[newWordPartOfSpeech].includes(newWord)) {
        bool = true;
        setWordExistsWarning(true);
        setExistantWord(word[newWordPartOfSpeech]);
        return;
      }
    });

    if (!bool) {
      const joined = chosenThemes.join(", ");
      const finalThemes = joined.includes(",")
        ? `[${joined
            .split(",")
            .map((m) => `"${m.trim()}"`)
            .join(", ")}]`
        : `["${joined}"]`;

      const newWordJoined = newWord.includes(",")
        ? `[${newWord
            .split(",")
            .map((m) => `"${m.trim()}"`)
            .join(", ")}]`
        : `["${newWord}"]`;

      setNewWords((prev) => [
        ...prev,
        `
        { word_type: "${newWordType}", 
     ${newWordPartOfSpeech}: ${newWordJoined},
     themes: ${finalThemes}
     },`,
      ]);
    }
  }

  function clear(setArr) {
    setArr([]);
  }

  function selectWordFromViewer(wordmeaning, partOfSpeech, index) {
    setSelectedIndex(index);

    if (chosenInput === "first") {
      setFirstWordMeaning(wordmeaning);
      setFirstWordPartofSpeech(partOfSpeech);
    } else if (chosenInput === "second") {
      setSecondWordMeaning(wordmeaning);
      setSecondWordPartofSpeech(partOfSpeech);
    } else if (chosenInput === "original") {
      setOriginalMeaning(wordmeaning);
      setOriginalPartofSpeech(partOfSpeech);
    } else if (chosenInput === "derived") {
      setDerivedMeaning(wordmeaning);
      setDerivedPartofSpeech(partOfSpeech);
    } else if (chosenInput === "shifted") {
      setShiftedMeaning(wordmeaning);
      setShiftedPartofSpeech(partOfSpeech);
    } else if (chosenInput === "unshifted") {
      setUnshiftedMeaning(wordmeaning);
      setUnshiftedPartofSpeech(partOfSpeech);
    } else {
      setCompoundMeaning(wordmeaning);
      setCompoundPartofSpeech(partOfSpeech);
    }
  }

  function saveCompoundProgress(partOfSpeech, index) {
    localStorage.setItem(
      "compoundProgress",
      JSON.stringify({
        partOfSpeech,
        index,
      }),
    );

    setCompoundProgress({ partOfSpeech: partOfSpeech, index: index });
  }

  function saveDerivationProgress(partOfSpeech, index) {
    localStorage.setItem(
      "derivationProgress",
      JSON.stringify({
        partOfSpeech,
        index,
      }),
    );

    setDerivationProgress({ partOfSpeech: partOfSpeech, index: index });
  }

  function saveSemanticShiftProgress(partOfSpeech, index) {
    localStorage.setItem(
      "semanticShiftProgress",
      JSON.stringify({
        partOfSpeech,
        index,
      }),
    );

    setSemanticShiftProgress({ partOfSpeech: partOfSpeech, index: index });
  }

  function addNewTheme(theme) {
    setChosenThemes((prev) => [...prev, theme]);
  }

  function addDerivedTheme(theme) {
    setDerivedThemes((prev) => [...prev, theme]);
  }

  function removeTheme(theme, setThemes) {
    setThemes((prev) => prev.filter((t) => t !== theme));
  }

  function handleNewWordPartOfSpeech(value) {
    setNewWordPartOfSpeech(value);
    meaningKeys.forEach((key) => {
      if (value === key.meaning) {
        setNewWordPartOfSpeechCheck(key.type);
      }
    });
  }

  function toggleAffix(name) {
    const selectedAffix = allAffixes.filter(
      (affix) => affix.affixName === name,
    );
    setSelectedAffixName(selectedAffix[0].affixName);
    setSelectedAffixDescription(selectedAffix[0].affixDescription);
  }


  return (
    <div>
      <Collapsible title={translate("Add Words")}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <select
            value={newWordType}
            onChange={(e) => setNewWordType(e.target.value)}
            style={{ marginRight: "5px" }}
          >
            <option value="word">{translate("word")}</option>
            <option value="prefix">{translate("prefix")}</option>
            <option value="suffix">{translate("suffix")}</option>
            <option value="proclitic">{translate("proclitic")}</option>
            <option value="enclitic">{translate("enclitic")}</option>
          </select>

          <select
            value={newWordPartOfSpeech}
            onChange={(e) => handleNewWordPartOfSpeech(e.target.value)}
            style={{ marginRight: "5px" }}
          >
            {meaningKeys.map((key, index) => (
              <option key={index} value={key.meaning}>
                {translate(key.type)}
              </option>
            ))}
          </select>

          <input
            value={newWord}
            placeholder={translate("enter new word")}
            onChange={(e) => setNewWord(e.target.value)}
            style={{ marginRight: "5px" }}
          />

          <select
            onChange={(e) => addNewTheme(e.target.value)}
            style={{ marginRight: "5px" }}
          >
            {Object.entries(themes).map(([key, value]) => (
              <optgroup key={key} label={capitaliseFirstLetter(translate(key))}>
                {value
                  .slice()
                  .sort()
                  .map((theme) => (
                    <option key={theme} value={theme}>
                      {capitaliseFirstLetter(translate(theme))}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>

          <button onClick={submitNewWord}>{translate("submit")}</button>
          <button
            style={{ marginLeft: "20px" }}
            onClick={() => clear(setNewWords)}
          >
            {translate("clear")}
          </button>
        </div>
        <div style={{ marginTop: "10px" }} className="word-form-container">
          {chosenThemes.map((theme, index) => (
            <div className="word-form-list" key={index}>
              {theme}
              <button
                onClick={() => removeTheme(theme, setChosenThemes)}
                className="btn-close btn-close-white extra-small-x-button"
              ></button>
            </div>
          ))}
        </div>

        {wordExistsWarning && (
          <p className="warning">
            <span>{translate("Word is already in dictionary: ")}</span>
            {existantWord}
          </p>
        )}

        <button
          onClick={() => {
            navigator.clipboard.writeText(newWordsDisplay);
          }}
          style={{ marginBottom: "10px", padding: "5px" }}
        >
          <img src="/src/assets/clipboard.svg" alt="" width={16} height={16} />
        </button>

        <div>
          <textarea
            style={{ width: "100%", height: "300px" }}
            value={newWordsDisplay}
            onChange={(e) => setNewWordsDisplay(e.target.value)}
          />
        </div>
      </Collapsible>

      <Collapsible title={translate("Add Compounds")}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/*COMPOUND ENTRY*/}
          <div className="thin-white-border compoundEntryDiv">
            <div className="compound-input">
              <span>{translate("First Word")}</span>
              <select
                value={firstWordPartofSpeech}
                onChange={(e) => setFirstWordPartofSpeech(e.target.value)}
              >
                {meaningKeys.map((key) => (
                  <option value={key.meaning}>{translate(key.type)}</option>
                ))}
              </select>

              <input
                placeholder={translate("enter first word")}
                onClick={() => selectInput("first")}
                value={firstWordMeaning}
                onChange={(e) => setFirstWordMeaning(e.target.value)}
              />
            </div>

            <div className="compound-input">
              <span>{translate("Second Word")}</span>
              <select
                value={secondWordPartofSpeech}
                onChange={(e) => setSecondWordPartofSpeech(e.target.value)}
              >
                {meaningKeys.map((key) => (
                  <option value={key.meaning}>{translate(key.type)}</option>
                ))}
              </select>
              <input
                value={secondWordMeaning}
                placeholder={translate("enter second word")}
                onClick={() => selectInput("second")}
                onChange={(e) => setSecondWordMeaning(e.target.value)}
              />
            </div>
            <div className="compound-input">
              <span>{translate("Compound Word")}</span>
              <select
                value={compoundPartofSpeech}
                onChange={(e) => setCompoundPartofSpeech(e.target.value)}
              >
                {meaningKeys.map((key) => (
                  <option value={key.meaning}>{translate(key.type)}</option>
                ))}
              </select>
              <input
                value={compoundMeaning}
                placeholder={translate("enter compound word")}
                onClick={() => selectInput("compound")}
                onChange={(e) => setCompoundMeaning(e.target.value)}
              />
            </div>

            <div className="shift-theme-container thin-white-border">
              {compounds.map((compound, index) => (
                <div className="word-form-list" key={index}>
                  <span>{compound[0].meaning.join(", ")}</span>
                  <span>+</span>
                  <span>{compound[1].meaning.join(", ")}</span>

                  <span>→</span>
                  <span>{compound[2].meaning.join(", ")}</span>

                  <span style={{ marginLeft: "10px", fontStyle: "italic" }}>
                    {compound[2].themes.join(", ")}
                  </span>

                  <button
                    onClick={() =>
                      setCompounds((prev) => prev.filter((_, i) => i !== index))
                    }
                    className="btn-close btn-close-white extra-small-x-button"
                  />
                </div>
              ))}
            </div>

            <button style={{ marginLeft: "100px" }} onClick={submitCompound}>
              {translate("Submit")}
            </button>
            <button
              style={{ marginLeft: "20px" }}
              onClick={() => {
                const text = compounds
                  .map((c) => JSON.stringify(c, null, 2) + ",")
                  .join(",\n\n");

                navigator.clipboard.writeText(text);
                showToast(translate("Compounds copied to clipboard"));
                setCompounds([]);
              }}
            >
              {translate("Copy New Compounds")}
            </button>
          </div>

          {/*WORD VIWER*/}
          <WordViewer
            viewPartOfSpeech={viewPartOfSpeech}
            viewedList={viewedListCompound}
            progress={compoundProgress}
            saveProgress={saveCompoundProgress}
            activeRowRef={activeCompoundRowRef}
            selectWordFromViewer={selectWordFromViewer}
            selectedIndex={selectedIndex}
          />
        </div>
      </Collapsible>

      <Collapsible title={translate("Add Derivations")}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/*COMPOUND ENTRY*/}
          <div className="thin-white-border compoundEntryDiv">
            <div className="compound-input">
              <span>{translate("Select Affix")}</span>
              <select
                value={selectedAffixName}
                onChange={(e) => toggleAffix(e.target.value)}
              >
                {allAffixes.map((affix) => (
                  <option value={affix.affixName}>
                    {translate(affix.affixName)}
                  </option>
                ))}
              </select>
            </div>
            <div className="compound-input">
              {selectedAffixDescription && (
                <p style={{ fontStyle: "italic" }}>
                  {selectedAffixDescription}
                </p>
              )}
            </div>
            <div className="compound-input">
              <span>{translate("Original Meaning")}</span>
              <select
                value={originalPartofSpeech}
                onChange={(e) => setOriginalPartofSpeech(e.target.value)}
              >
                {meaningKeys.map((key) => (
                  <option value={key.meaning}>{translate(key.type)}</option>
                ))}
              </select>
              <input
                value={originalMeaning}
                placeholder={translate("enter original meaning")}
                onClick={() => selectInput("original")}
                onChange={(e) => setOriginalMeaning(e.target.value)}
              />
            </div>
            <div className="compound-input">
              <span>{translate("Derived Meaning")}</span>
              <select
                value={derivedPartofSpeech}
                onChange={(e) => setDerivedPartofSpeech(e.target.value)}
              >
                {meaningKeys.map((key) => (
                  <option value={key.meaning}>{translate(key.type)}</option>
                ))}
              </select>
              <input
                value={derivedMeaning}
                onClick={() => selectInput("derived")}
                placeholder={translate("enter derived meaning")}
                onChange={(e) => setDerivedMeaning(e.target.value)}
              />
            </div>
            <div className="compound-input">
              <span>{translate("Derived theme")}</span>
              <select
                onChange={(e) => addDerivedTheme(e.target.value)}
                style={{ marginRight: "5px" }}
              >
                {Object.entries(themes).map(([key, value]) => (
                  <optgroup
                    key={key}
                    label={capitaliseFirstLetter(translate(key))}
                  >
                    {value
                      .slice()
                      .sort()
                      .map((theme) => (
                        <option key={theme} value={theme}>
                          {capitaliseFirstLetter(translate(theme))}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div style={{ marginTop: "10px" }} className="word-form-container">
              {derivedThemes.map((theme, index) => (
                <div className="word-form-list" key={index}>
                  {theme}
                  <button
                    onClick={() => removeTheme(theme, setDerivedThemes)}
                    className="btn-close btn-close-white extra-small-x-button"
                  ></button>
                </div>
              ))}
            </div>

            <div className="shift-theme-container thin-white-border">
              {derivations.map((derivation, index) => (
                <div className="word-form-list" key={index}>
                
                  <span>{derivation?.originalMeanings?.join(", ") ?? ""}</span>

                  <span>+</span>

                  <span>{derivation.affix}</span>

                  <span>→</span>

                  <span>{derivation.derivedMeanings.join(", ")}</span>

                  <button
                    onClick={() =>
                      setDerivations((prev) =>
                        prev.filter((_, i) => i !== index),
                      )
                    }
                    className="btn-close btn-close-white extra-small-x-button"
                  />
                </div>
              ))}
            </div>

            <button style={{ marginLeft: "500px" }} onClick={submitDerivation}>
              {translate("Submit")}
            </button>

            <button
              style={{ marginLeft: "20px" }}
              onClick={() => {
                const text = derivations
                  .map((obj) => JSON.stringify(obj, null, 2) + ",")
                  .join("\n\n");

                navigator.clipboard.writeText(text);

                showToast(translate("Derivations copied to clipboard"));
                setDerivations([]);
              }}
            >
              {translate("Copy New Derivations")}
            </button>
          </div>

          <WordViewer
            viewPartOfSpeech={viewPartOfSpeech}
            viewedList={viewedListDerivation}
            progress={derivationProgress}
            saveProgress={saveDerivationProgress}
            activeRowRef={activeDerivationRowRef}
            selectWordFromViewer={selectWordFromViewer}
            selectedIndex={selectedIndex}
          />
        </div>
      </Collapsible>

      <Collapsible title={translate("Add Semantic Shift")}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="thin-white-border compoundEntryDiv">
            <div className="compound-input">
              <span>{translate("Original Meaning")}</span>
              <select
                value={unshiftedPartofSpeech}
                onChange={(e) => setUnshiftedPartofSpeech(e.target.value)}
              >
                {meaningKeys.map((key) => (
                  <option value={key.meaning}>{translate(key.type)}</option>
                ))}
              </select>
              <input
                value={unshiftedMeaning}
                placeholder={translate("enter original meaning")}
                onClick={() => selectInput("unshifted")}
                onChange={(e) => setUnshiftedMeaning(e.target.value)}
              />
            </div>
            <div className="compound-input">
              <span>{translate("Shifted Meaning")}</span>
              <select
                value={shiftedPartofSpeech}
                onChange={(e) => setShiftedPartofSpeech(e.target.value)}
              >
                {meaningKeys.map((key) => (
                  <option value={key.meaning}>{translate(key.type)}</option>
                ))}
              </select>
              <input
                value={shiftedMeaning}
                onClick={() => selectInput("shifted")}
                placeholder={translate("enter derived meaning")}
                onChange={(e) => setShiftedMeaning(e.target.value)}
              />
            </div>
            <div className="compound-input">
              <span>{translate("Shifted Meaning theme")}</span>
              <select
                onChange={(e) => addShiftedTheme(e.target.value)}
                style={{ marginRight: "5px" }}
              >
                {Object.entries(themes).map(([key, value]) => (
                  <optgroup
                    key={key}
                    label={capitaliseFirstLetter(translate(key))}
                  >
                    {value
                      .slice()
                      .sort()
                      .map((theme) => (
                        <option key={theme} value={theme}>
                          {capitaliseFirstLetter(translate(theme))}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div
              style={{
                marginTop: "10px",
                maxHeight: "140px",
                height: "fit-content",
              }}
              className="word-form-container"
            >
              {shiftedThemes.map((theme, index) => (
                <div className="word-form-list" key={index}>
                  {theme}
                  <button
                    onClick={() => removeTheme(theme, setShiftedThemes)}
                    className="btn-close btn-close-white extra-small-x-button"
                  ></button>
                </div>
              ))}
            </div>

            <div className="shift-theme-container thin-white-border">
              {pendingSemanticShifts.map((shift, index) => (
                <div className="word-form-list" key={index}>
                  {meaningKeys.map(
                    (key) =>
                      shift[key.meaning] && <span>{shift[key.meaning]}</span>,
                  )}
                  <span>→</span>
                  <span>
                    {shift.shifted_meanings.map((shifted) =>
                      meaningKeys.map(
                        (key) =>
                          shifted[key.meaning] && (
                            <span>{shifted[key.meaning]}</span>
                          ),
                      ),
                    )}
                  </span>
                  <span style={{ marginLeft: "10px", fontStyle: "italic" }}>
                    {shift.themes && shift.themes.join(", ")}
                  </span>

                  <button
                    onClick={() =>
                      setPendingSemanticShifts((prev) =>
                        prev.filter((_, i) => i !== index),
                      )
                    }
                    className="btn-close btn-close-white extra-small-x-button"
                  />
                </div>
              ))}
            </div>

            <button
              style={{ marginLeft: "500px" }}
              onClick={submitSemanticShift}
            >
              {translate("Submit")}
            </button>
            <button
              style={{ marginLeft: "20px" }}
              onClick={applySemanticShifts}
            >
              {translate("Apply Semantic Shifts")}
            </button>
          </div>

          <WordViewer
            viewPartOfSpeech={viewPartOfSpeech}
            viewedList={viewedListSemanticShift}
            progress={semanticShiftProgress}
            saveProgress={saveSemanticShiftProgress}
            activeRowRef={activeSemanticShiftRowRef}
            selectWordFromViewer={selectWordFromViewer}
            selectedIndex={selectedIndex}
          />
        </div>
      </Collapsible>
    </div>
  );
};

export default DevTools;
