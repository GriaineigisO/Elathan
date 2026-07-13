import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import React from "react";
import AddWordModal from "../Components/addWordModal.jsx";
import PrintOptionsModal from "../Components/printOptions.jsx";
import StatModal from "../Components/statModal.jsx";
import SourcesModal from "../Components/sourcesModal.jsx";
import DerivationalAffixBlock from "../Components/getDerivationRoots.jsx";
import formatMeaning from "../Functions/formatMeaning.jsx";
import ExtractExampleSentencesFromCorpus from "../Components/ExtractExampleSentencesFromCorpus.jsx";
import { thesaurusJson } from "../Functions/thesaurusList";
import FindWordsDescendants from "../Components/findWordsDescendants.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import pLimit from "p-limit";
import PaginatedDictionary from "../Components/paginateDictionary.jsx";
import EtymologyDictionaryPdf from "../Components/etymologyDictionaryPDF.jsx";
import { pdf } from "@react-pdf/renderer";
import DictionaryTitle from "./DictionaryTitle.jsx";

const DictionaryBuilder = ({id, dictionaryType}) => {

  
  const { translate } = useTranslate();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pageSize, setPageSize] = useState(200);
  const [gotEtymology, setGotEtymology] = useState(false);
  const [gotDerivations, setGotDerivation] = useState(false);
  const [etymologyTree, setEtymologyTree] = useState([]);
  const [showAddWordModal, setShowAddWordModal] = useState(false);
  const [languageData, setLanguageData] = useState([]);
  const [showPrintOptionsModal, setShowPrintOptionsModal] = useState(false);
  const [allWords, setAllWords] = useState([]);
  const [isProto, setIsProto] = useState();
  const [languageName, setLanguageName] = useState();
  const [wordType, setWordType] = useState();
  const [loanWord, setLoanWord] = useState();
  const [motherLanguage, setMotherLanguage] = useState();
  const [word, setWord] = useState();
  const [showPrintedDictionary, setShowPrintedDictionary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectSearch, setSelectSearch] = useState("match");
  const [searchTerm, setSearchTerm] = useState();
  const [searchEnglishTerm, setSearchEnglishTerm] = useState();
  const [visibleWords, setVisibleWords] = useState([]);
  const [allEnglishWords, setAllEnglishWords] = useState([]);
  const [allAffixes, setAllAffixes] = useState([]);
  const [synonyms, setsynonyms] = useState([]);
  const [creatorUsername, setCreatorUsername] = useState();
  const [creatorId, setCreatorId] = useState();
  const [collaborators, setCollaborators] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const [canView, setCanView] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [showPermissionMessage, setShowPermissionMessage] = useState(false);
  const [tagGroups, setTagGroups] = useState([]);
  const [showStatModal, setShowStatModal] = useState(false);
  const [showSourcesModal, setShowSourcesModal] = useState(false);
  const [resolvedAffixes, setResolvedAffixes] = useState([]);
  const [grammar, setGrammar] = useState();
  const [allWordsForThesaurus, setAllWordsForThesaurus] = useState([]);

  const rotatingMessages = [
    <div className="quote">
      <span>
        Grace upon <b className="ogma">Ogma son of Elatha</b> for his erudite
        gifts. May he imbue this dictionary with wisdom and learning.
      </span>
    </div>,
    <div className="quote">
      <span>
        <b className="ogma">Ogma son of Ethliu</b> made an attack on the host,
        and his track was marked by pools of crimson blood
      </span>
      <br />
      <span>
        - <i>Cath Maige Tuired</i> "The Battle of Moytura"
      </span>
    </div>,
    <div className="quote">
      <span>
        Great too was Dagda's power when he was king in the beginning and it was
        he who divided the <i>síde</i> among the Fir Dé ["men of the Gods"]; Lug
        son of Eithliu in Síd Rodrubán, <b className="ogma">Ogma</b> in Síd
        Aircheltrai, the Dagda himself however had Síd Lethet Lachtmaige...
      </span>
      <br />
      <span>
        - <i>De Gabáil in t-Sída</i> "The Taking of the Hollow Hill"
      </span>
    </div>,
    <div className="quote">
      <span>
        After a time Fuamnach came to visit Midir, and the three Gods of the
        Danaan came with her as safeguards: Lug, and the Dagda, and{" "}
        <b className="ogma">Ogma</b>.
      </span>
      <br />
      <span>
        - <i>Tochmarc Etaíne</i> "The Wooing of Étaín"
      </span>
    </div>,
    <div className="quote">
      <span>
        In that battle <b className="ogma">Ogma son of Elatha</b> son of Nét
        fell at the hand of Indech son of Dé Domnann king of the Fomoiri.
      </span>
      <br />
      <span>
        - <i>Lebor Gabála Érenn</i> "The Book of Invasions"
      </span>
    </div>,
    <div className="quote">
      <span>
        The battalions of the Tuatha De were straightway drawn up in the plain
        to the east; and the Fir Bolg came into the plain against them from the
        west. The chiefs who went out in front of the Tuatha De on that day were{" "}
        <b className="ogma">Ogma</b>, Midir, Bodb Derg, Diancecht, and Aengaba
        of Norway.
      </span>
      <br />
      <span>
        - <i>Cath Maige Tuired</i> "The Battle of Moytura"
      </span>
    </div>,
    <div className="quote">
      <span>
        The furies and monsters and hags of doom cried aloud so that their
        voices were heard in the rocks ‘and waterfalls and in the hollows of the
        earth. It was like the fearful agonising cry on the last dreadful day
        when the human race will part from all in this world. In the van of the
        Tuatha De advanced the Dagda, <b className="ogma">Ogma</b> [...]
      </span>
      <br />
      <span>
        - <i>Cath Maige Tuired</i> "The Battle of Moytura"
      </span>
    </div>,

    <div className="quote">
      <span>
        Before the fierceness of their fury and the weight of their blows,
        soldiers were thrown into confusion. At last Bres was slain by Eochaid;
        and the Dagda, <b className="ogma">Ogma</b>, Alla and Delbaeth attacked
        the latter to avenge their brother.
      </span>
      <br />
      <span>
        - <i>Cath Maige Tuired</i> "The Battle of Moytura"
      </span>
    </div>,
    <div className="quote">
      <span>
        He said: ‘Question me: I am a champion.’ The doorkeeper answered: ‘We
        need thee not. We have a champion already, even{" "}
        <b className="ogma">Ogma son of Ethliu</b>.’
      </span>
      <br />
      <span>
        - <i>Cath Maige Tuired</i> "The Battle of Moytura"
      </span>
    </div>,
    <div className="quote">
      <span>
        Then the great flag-stone, to move which required the effort of
        four-score yoke of oxen, <b className="ogma">Ogma</b> hurled through the
        house, so that it lay on the outside of Tara. This was a challenge to
        Lugh.
      </span>
      <br />
      <span>
        - <i>Cath Maige Tuired</i> "The Battle of Moytura"
      </span>
    </div>,
    <div className="quote">
      <span>
        ‘ And thou, <b className="ogma">O Ogma’</b>, saith Lugh to his champion,
        ‘what is thy power in the battle?’
        <br />
        ‘Not hard to say’, quoth he: ‘repelling the king and repelling three
        enneads of his friends, and capturing the battalion up to a third by the
        men of Ireland’.
      </span>
      <br />
      <span>
        - <i>Cath Maige Tuired</i> "The Battle of Moytura"
      </span>
    </div>,
    <div className="quote">
      <span>
        In that fight, then, <b className="ogma">Ogma</b> the champion found
        Orna the sword of Tethra, a king of the Fomorians.{" "}
        <b className="ogma">Ogma</b> unsheathed the sword and cleansed it. Then
        the sword related whatsoever had been done by it; for it was the custom
        of swords at that time, when unsheathed, to set forth the deeds that had
        been done by them.
      </span>
      <br />
      <span>
        - <i>Cath Maige Tuired</i> "The Battle of Moytura"
      </span>
    </div>,

    <div className="quote">
      <span>
        Now Lugh and the Dagdae and <b className="ogma">Ogma</b> pursued the
        Fomorians, for they had carried off the Dagdae's harper, whose name was
        Uaitne. Then they reached the banqueting-house in which were Bres son of
        Elatha and Elathan son of Delbaeth. There hung the harp on the wall.
      </span>
      <br />
      <span>
        - <i>Cath Maige Tuired</i> "The Battle of Moytura"
      </span>
    </div>,
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCurrentMessageIndex(
          (prevIndex) => (prevIndex + 1) % rotatingMessages.length,
        );
      }, 8000); // Change message every 2 seconds

      return () => clearInterval(interval); // cleanup on unmount or loading false
    }
  }, [loading]);

  const handleWordAdded = () => {
    getAllWords(); // refresh updated etymology
  };

  // Process large arrays without blocking the main thread
  const processWordsInChunks = async (words, chunkSize = 100) => {
    const result = [];

    for (let i = 0; i < words.length; i += chunkSize) {
      const chunk = words.slice(i, i + chunkSize);
      const processedChunk = addPhrasesToWords(chunk); // await if async
      result.push(...processedChunk);

      // Yield control to allow React to render
      await new Promise((r) => setTimeout(r, 0));
    }

    return result;
  };

  const getAllWords = async () => {
    try {
      // 1️⃣ Fetch all words
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getAllWords`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        },
      );

      let data = await response.json();

      //filter by dictionary type
      if (dictionaryType === "dictionary") {//normal dictionary

      

      // 2️⃣ Add "to " for verbs
      data = data.map((word) => {
        if (word.verb_meaning) {
          return {
            ...word,
            verb_meaning: word.verb_meaning.map((verb) =>
              verb.startsWith("to ") || verb.startsWith("(")
                ? verb
                : `to ${verb}`,
            ),
          };
        }
        return word;
      });

      // 3️⃣ Separate affixes
      const affixes = data.filter((word) =>
        ["suffix", "prefix", "proclitic", "enclitic"].includes(word.word_type),
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
                5000,
              );
              const trimmed = derivations.slice(0, MAX_DERIVATIONS);
              if (derivations.length > MAX_DERIVATIONS)
                return { ...affix, derivations: trimmed };
            } catch (err) {
              return { ...affix, derivations: [] };
            }
          }),
        ),
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
      setAllWordsForThesaurus(dataWithDerivations);
      setAllWords(dataWithDerivations);
      setAllAffixes(affixesWithDerivations);

      // 7️⃣ Generate phrases after derivations are ready
      const processed = addPhrasesToWords(data);
      setVisibleWords(processed);

      } else {

        const names = data.filter((word) => word.word_type === dictionaryType);
        setVisibleWords(names);

      }
    } catch (err) {
      console.error("Error fetching or processing words:", err);
    }
  };

  useEffect(() => {
    getAllWords();
  }, [id]);

  useEffect(() => {
    if (visibleWords.length > 0) {
      //getEtymologyGraph()
      addEtymInfo(); 
    }
  }, [visibleWords]);

  const addEtymInfo = async () => {

    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getAllEtymologies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, visibleWords  }),
        },
      );


      const data = await response.json();
      setVisibleWords(data)
    
    setGotEtymology(true);
  };

  const getDerivations = async (affix) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getDerivations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: affix.word_id }),
      },
    );
    const data = await response.json();
    setGotDerivation(true);
    return data;
  };



  const getEtymologyGraph = async () => {

    const rootIds = visibleWords
  .filter(word => word.etymology_type === "not_derived")
  .map(word => word.word_id);

     const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getEtymologyDictionaryGraph`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, rootIds  }),
        },
      );
      const data = await response.json();

      return data;
  }
 

  const checkPermission = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/checkPermission`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, userId }),
      },
    );
    const data = await response.json();
    setCanEdit(data);
  };

  useEffect(() => {
    checkPermission();
  }, [id]);

  const checkPrivacy = async () => {
    const userId = localStorage.getItem("userId");

    //if user is not logged in
    if (!userId && privacy === "private") {
      setCanView(false);
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/checkPrivacy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, userId }),
      },
    );
    const data = await response.json();
    setCanView(data);
  };

  useEffect(() => {
    checkPrivacy();
  }, [id]);

  useEffect(() => {
    const preloadResolvedAffixes = async () => {
      const affixes = allWords.filter(
        (word) =>
          word.word_type === "suffix" ||
          word.word_type === "prefix" ||
          word.word_type === "proclitic" ||
          word.word_type === "enclitic",
      );

      // Await all derivation fetches
      const affixesWithDerivations = await Promise.all(
        affixes.map(async (affix) => {
          const derivations = await getDerivations(affix);
          return { ...affix, derivations };
        }),
      );

      const resolved = await resolveRootWordsAndSetResolvedAffixes(
        affixesWithDerivations,
      );
      setResolvedAffixes(resolved);
    };

    if (allWords.length > 0) {
      preloadResolvedAffixes();
    }
  }, [allAffixes]);

  const fixPhrases = (word) => {
    //now handle cases where the translation into whatever language is a phrase not a single word
    const words = word.trim().split(/\s+/); //split string by whitespace incase the translation is made of several english words e.g "inhospitable place"

    const hasMultipleWords = words.length > 1;

    if (hasMultipleWords && word.includes("=")) {
      let updatedWords = word
        .split(" ")
        .map((w) => {
          if (w.includes("=")) {
            return w.split("=")[0]; // Keep only the phrase word
          }
          return w;
        })
        .join(" ");

      return updatedWords;
    } else {
      return word;
    }
  };

  function addPhrasesToWords(words) {
    const allWords = [...words]; // avoid mutating input
    let filtered = [...allWords];

    const managePhrases = (word, meaning) => {
      const splitWords = word.trim().split(/\s+/);
      const isPhrase = splitWords.length > 1;
      if (!isPhrase) return;

      filtered = filtered.filter((entry) => entry.word !== word);

      splitWords.forEach((sw) => {
        let headWord = "";
        let phraseWord = "";
        let isDifferent = false;

        if (sw.includes("=")) {
          [phraseWord, headWord] = sw.split("=");
          isDifferent = true;
        }

        const cleanedPhrase = word
          .split(" ")
          .map((w) => (w.includes("=") ? w.split("=")[0] : w))
          .join(" ");

        allWords.forEach((obj) => {
          const match =
            (!isDifferent && obj.word === sw.toLowerCase()) ||
            (isDifferent && obj.word === headWord.toLowerCase());

          if (match) {
            const phrase = {
              word: cleanedPhrase,
              meaning: meaning.join(", "),
            };

            if (!Array.isArray(obj.phrases)) obj.phrases = [];
            const exists = obj.phrases.some(
              (p) => p.word === phrase.word && p.meaning === phrase.meaning,
            );
            if (!exists) obj.phrases.push(phrase);
          }
        });
      });
    };

    for (const word of allWords) {
      if (word.word_type === "word") {
        if (word.noun_meaning) managePhrases(word.word, word.noun_meaning);
        if (word.num_meaning) managePhrases(word.word, word.num_meaning);
        if (word.adj_meaning) managePhrases(word.word, word.adj_meaning);
        if (word.adv_meaning) managePhrases(word.word, word.adv_meaning);
        if (word.adp_meaning) managePhrases(word.word, word.adp_meaning);
        if (word.conj_meaning) managePhrases(word.word, word.conj_meaning);
        if (word.interj_meaning) managePhrases(word.word, word.interj_meaning);
        if (word.pron_meaning) managePhrases(word.word, word.pron_meaning);
        if (word.part_meaning) managePhrases(word.word, word.part_meaning);
        if (word.verb_meaning) managePhrases(word.word, word.verb_meaning);
      }
    }

    return filtered;
  }

  useEffect(() => {
    if (showPrintedDictionary) {
      // Let React render first, then open the print dialog
      setTimeout(() => {
        window.print();
      }, 300);
    }
  }, [showPrintedDictionary]);

  const openWord = (word_id) => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/word/${word_id}`,
      "_blank",
    );
  };

  useEffect(() => {
    const checkIfProto = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getLanguage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        },
      );

      let data = await response.json();
      setPrivacy(data[0].privacy);
      setLanguageName(data[0].language_name);
      setIsProto(data[0].is_proto);
      setCreatorId(data[0].user_id);
      getUserInfo(data[0].user_id, setCreatorUsername);
      setGrammar(data[0].grammar);
    };
    checkIfProto();
  }, [id]);

  const hasFetchedCollaborators = useRef(false);

  useEffect(() => {
    if (hasFetchedCollaborators.current) return;
    hasFetchedCollaborators.current = true;

    const getCollaborators = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getLanguage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        },
      );

      const data = await response.json();

      if (!data[0]?.collaborators?.length) return;

      const newCollaborators = [];

      for (const collaborator of data[0].collaborators) {
        const username = await getUsername(collaborator);
        newCollaborators.push({
          username: collaborator.username,
          userId: collaborator.user_id,
        });
      }

      setCollaborators((prev) => {
        const existingIds = new Set(prev.map((c) => c.userId));
        const filtered = newCollaborators.filter(
          (c) => !existingIds.has(c.userId),
        );
        return [...prev, ...filtered];
      });
    };

    getCollaborators();
  }, [id]);

  const getUserInfo = async (id, setUsername) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getUserInfo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      },
    );
    const data = await response.json();

    if (setUsername === null) {
      return data.username;
    }

    setUsername(data.username);
  };

  const getUsername = (id) => {
    return getUserInfo(id, null);
  };

  useEffect(() => {
    if (id) {
      const getMotherLanguage = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/getMotherLanguage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          },
        );

        let data = await response.json();
        setMotherLanguage(data[0]);
      };
      getMotherLanguage();
    }
  }, [id]);

  const searchLanguage = (searchTerm, searchSelect) => {
    let results = [];

    if (searchSelect === "match") {
      results = visibleWords.filter(
        (word) =>
          word.word === searchTerm ||
          (word.phrases
            ? word.phrases.some((phrase) => phrase.word.includes(searchTerm))
            : false),
      );
    } else if (searchSelect === "startswith") {
      results = visibleWords.filter(
        (word) =>
          word.word.startsWith(searchTerm) ||
          (word.phrases &&
            word.phrases.some((phrase) =>
              phrase.meaning.startsWith(searchTerm),
            )),
      );
    } else if (searchSelect === "endswith") {
      results = visibleWords.filter((word) => word.word.endsWith(searchTerm));
    }

    setVisibleWords(results);
  };

  const searchEnglish = (searchTerm) => {
    const regex = new RegExp(`\\b${searchTerm}\\b`, "i"); // "i" for case-insensitive

    const results = visibleWords.filter(
      (word) =>
        [
          ...(word.noun_meaning || []),
          ...(word.phrases ? word.phrases.map((phrase) => phrase.meaning) : []),
        ].some((m) => regex.test(m)) ||
        [
          ...(word.num_meaning || []),
          ...(word.phrases ? word.phrases.map((phrase) => phrase.meaning) : []),
        ].some((m) => regex.test(m)) ||
        [
          ...(word.verb_meaning || []),
          ...(word.phrases ? word.phrases.map((phrase) => phrase.meaning) : []),
        ].some((m) => regex.test(m)) ||
        [
          ...(word.adj_meaning || []),
          ...(word.phrases ? word.phrases.map((phrase) => phrase.meaning) : []),
        ].some((m) => regex.test(m)) ||
        [
          ...(word.adv_meaning || []),
          ...(word.phrases ? word.phrases.map((phrase) => phrase.meaning) : []),
        ].some((m) => regex.test(m)) ||
        [
          ...(word.adv_meaning || []),
          ...(word.phrases ? word.phrases.map((phrase) => phrase.meaning) : []),
        ].some((m) => regex.test(m)) ||
        [
          ...(word.adp_meaning || []),
          ...(word.phrases ? word.phrases.map((phrase) => phrase.meaning) : []),
        ].some((m) => regex.test(m)) ||
        [
          ...(word.part_meaning || []),
          ...(word.phrases ? word.phrases.map((phrase) => phrase.meaning) : []),
        ].some((m) => regex.test(m)) ||
        [
          ...(word.pron_meaning || []),
          ...(word.phrases ? word.phrases.map((phrase) => phrase.meaning) : []),
        ].some((m) => regex.test(m)) ||
        [
          ...(word.conj_meaning || []),
          ...(word.phrases ? word.phrases.map((phrase) => phrase.meaning) : []),
        ].some((m) => regex.test(m)) ||
        [
          ...(word.interj_meaning || []),
          ...(word.phrases ? word.phrases.map((phrase) => phrase.meaning) : []),
        ].some((m) => regex.test(m)),
    );

    setVisibleWords(results);
  };

  const refreshResults = () => {
    setVisibleWords(allWords);
    setSearchTerm("");
    setSearchEnglishTerm("");
  };

  const filterByPOS = (value) => {
    let results = [];

    switch (value) {
      case "noun":
        results = allWords.filter((word) => word.noun_meaning);
        break;
      case "num":
        results = allWords.filter((word) => word.num_meaning);
        break;
      case "verb":
        results = allWords.filter((word) => word.verb_meaning);
        break;
      case "adj":
        results = allWords.filter((word) => word.adj_meaning);
        break;
      case "adv":
        results = allWords.filter((word) => word.adv_meaning);
        break;
      case "adp":
        results = allWords.filter((word) => word.adp_meaning);
        break;
      case "conj":
        results = allWords.filter((word) => word.conj_meaning);
        break;
      case "interj":
        results = allWords.filter((word) => word.interj_meaning);
        break;
      case "pron":
        results = allWords.filter((word) => word.pron_meaning);
        break;
      case "affix":
        results = allWords.filter(
          (word) => word.word_type === "prefix" || word.word_type === "suffix",
        );
        break;
      case "clitic":
        results = allWords.filter(
          (word) =>
            word.word_type === "proclitic" || word.word_type === "enclitic",
        );
        break;
      default:
        results = allWords.filter((word) => word.part_meaning);
        break;
    }
    setVisibleWords(results);
  };

  const handleOpenUser = (id) => {
    window.open(`${import.meta.env.VITE_FRONTEND_URL}/user/${id}`, "_blank");
  };

  const openGrammar = (id) => {
    window.open(`${import.meta.env.VITE_FRONTEND_URL}/grammar/${id}`, "_blank");
  };

   const openPlacenames = (id) => {
    window.open(`${import.meta.env.VITE_FRONTEND_URL}/placenames/${id}`, "_blank");
  };

   const openPersonalnames = (id) => {
    window.open(`${import.meta.env.VITE_FRONTEND_URL}/personalnames/${id}`, "_blank");
  };

  const openDictionary = (id) => {
    window.open(`${import.meta.env.VITE_FRONTEND_URL}/dictionary/${id}`, "_blank");
  };

  const openCorpus = (id) => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/corpusList/${id}`,
      "_blank",
    );
  };

  const openThesaurus = (id) => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/thesaurus/${id}`,
      "_blank",
    );
  };

  const openFrequencyList = (id) => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/frequency/${id}`,
      "_blank",
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPermissionMessage(true);
    }, 1000); // 3 seconds

    return () => clearTimeout(timer); // cleanup
  }, []);

  const getTags = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getTags`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ languageId: id }),
      },
    );
    const data = await response.json();
    setTagGroups(data[0].tags);
  };

  useEffect(() => {
    getTags();
  }, []);

  const limitConcurrency = async (items, worker, limit = 5) => {
    const results = [];
    let i = 0;

    const runWorker = async () => {
      while (i < items.length) {
        const index = i++;
        try {
          results[index] = await worker(items[index]);
        } catch (err) {
          results[index] = { error: err };
        }
      }
    };

    const workers = Array.from({ length: limit }, runWorker);
    await Promise.all(workers);

    return results;
  };

  const resolveRootWordsAndSetResolvedAffixes = async (affixes) => {
    const resolved = await limitConcurrency(
      affixes,
      async (affix) => {
        const derivationsWithRoots = await limitConcurrency(
          affix.derivations ?? [], // fallback in case derivations is undefined
          async (derivation) => {
            if (
              !derivation ||
              typeof derivation !== "object" ||
              typeof derivation.derived_word_id !== "number" // ensure it's valid
            ) {
              console.warn("❗ Invalid derivation object skipped:", derivation);
              return { ...derivation, rootWord: "❌ error" };
            }

            try {
              const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/getRootWord`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    id: derivation.derived_word_id,
                    isFirstElement: derivation.is_first_element,
                    isSecondElement: derivation.is_second_element,
                    isThirdElement: derivation.is_third_element,
                  }),
                },
              );

              if (!response.ok) {
                throw new Error(`Fetch failed: ${response.status}`);
              }

              const data = await response.json();
              return {
                ...derivation,
                rootWord: data.word,
                rootWordMeaning: formatMeaning(data),
              };
            } catch (err) {
              console.error(
                "❌ Error on derivation",
                derivation.derived_word_id,
                err,
              );
              return { ...derivation, rootWord: "❌ error" };
            }
          },
          4,
        );

        return { ...affix, resolvedDerivations: derivationsWithRoots };
      },
      2,
    );

    return resolved;
  };

  const sortByPOS = (matchingWords, POS, type) => {
    const returnMatchedWord = (word, index, meaning) => {
      if (POS === "verb" && Array.isArray(meaning)) {
        meaning = meaning.map((verb) =>
          !verb.startsWith("(") ? `to ${verb}` : verb,
        );
      }

      meaning = Array.isArray(meaning) ? meaning.join(", ") : meaning;

      return (
        <span
          key={word.word_id}
          style={{ display: "inline", marginLeft: "5px" }}
        >
          <div
            className="word-link"
            style={{ display: "inline" }}
            onClick={() => handleOpenWord(word.word_id)}
          >
            <span>
              <i>{word.word}</i>
            </span>
            <span style={{ marginLeft: "5px" }}>"{meaning}"</span>
          </div>
          {index < matchingWords.length - 1 ? "," : "."}
        </span>
      );
    };

    let filteredWords = [];

    switch (POS) {
      case "adj":
        filteredWords = matchingWords.filter(
          (word) => word.adj_meaning && word.thesaurus?.[type]?.bool === true,
        );

        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>Adj.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.adj_meaning),
            )}
            <br />
          </>
        );
      case "verb":
        filteredWords = matchingWords.filter(
          (word) => word.verb_meaning && word.thesaurus?.[type]?.bool === true,
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>V.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.verb_meaning),
            )}
            <br />
          </>
        );
      case "noun":
        filteredWords = matchingWords.filter(
          (word) => word.noun_meaning && word.thesaurus?.[type]?.bool === true,
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>N.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.noun_meaning),
            )}
            <br />
          </>
        );
      case "adv":
        filteredWords = matchingWords.filter(
          (word) => word.adv_meaning && word.thesaurus?.[type]?.bool === true,
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>Adv.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.adv_meaning),
            )}
            <br />
          </>
        );
      case "num":
        filteredWords = matchingWords.filter(
          (word) => word.num_meaning && word.thesaurus?.[type]?.bool === true,
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>Num.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.num_meaning),
            )}
            <br />
          </>
        );
      case "adp":
        filteredWords = matchingWords.filter(
          (word) => word.adp_meaning && word.thesaurus?.[type]?.bool === true,
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>Adp.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.adp_meaning),
            )}
            <br />
          </>
        );
      case "conj":
        filteredWords = matchingWords.filter(
          (word) => word.conj_meaning && word.thesaurus?.[type]?.bool === true,
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>COnj.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.conj_meaning),
            )}
            <br />
          </>
        );
      case "interj":
        filteredWords = matchingWords.filter((word) => word.interj_meaning);
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>Interj.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.interj_meaning),
            )}
            <br />
          </>
        );
      case "part":
        filteredWords = matchingWords.filter(
          (word) => word.part_meaning && word.thesaurus?.[type]?.bool === true,
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>Part.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.part_meaning),
            )}
            <br />
          </>
        );
      case "pron":
        filteredWords = matchingWords.filter(
          (word) => word.pron_meaning && word.thesaurus?.[type]?.bool === true,
        );
        if (filteredWords.length === 0) return null;
        return (
          <>
            <span style={{ marginLeft: "10px" }}>
              <b>Pron.</b>
            </span>
            {filteredWords.map((word, index) =>
              returnMatchedWord(word, index, word.pron_meaning),
            )}
            <br />
          </>
        );
      default:
        return null;
    }
  };

  async function generatePdf() {
  setLoading(true);

  const data = await getEtymologyGraph();


  const blob = await pdf(
    <EtymologyDictionaryPdf
      visibleWords={visibleWords}
      languageName={languageName}
      creatorUsername={creatorUsername}
      isProto={isProto}
      etymologyTree={data.trees}
      languageData={data.languages}
    />
  ).toBlob();

  const url = URL.createObjectURL(blob);

  setPdfUrl(url);
  setLoading(false);
}

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      {canView ? (
        <>
          {loading ? (
            <div className="spinner-container">
              <div className="spinner" />
              <p>
                {translate(
                  "Your dictionary is being prepared for printing. This may take a few moments...",
                )}
              </p>
              <div style={{ fontStyle: "italic", opacity: 0.8 }}>
                {rotatingMessages[currentMessageIndex]}
              </div>
            </div>
          ) : (
            <>
              {canEdit ? (
                <button
                  className="hide-for-printing"
                  onClick={() => {
                    setShowAddWordModal(true);
                  }}
                >
                  {translate("Add Word")}
                </button>
              ) : (
                <></>
              )}

             

              {!pdfUrl ? (
  <button onClick={generatePdf} disabled={loading}>
    {loading
      ? "Preparing Etymological Dictionary PDF..."
      : "Generate Etymological Dictionary PDF"}
  </button>
) : (
  <a href={pdfUrl} download={`${languageName}.pdf`}>
    Download Etymological Dictionary PDF
  </a>
)}

              <AddWordModal
                show={showAddWordModal}
                setShow={setShowAddWordModal}
                languageId={id}
                onSuccess={handleWordAdded}
              />

            

              <StatModal
                show={showStatModal}
                setShow={setShowStatModal}
                tagGroups={tagGroups}
                visibleWords={visibleWords}
              />

              <SourcesModal
                show={showSourcesModal}
                setShow={setShowSourcesModal}
                languageId={id}
              />

              {grammar ? (
                showPrintedDictionary ? (
                  <h1 className="dictionary-title">
                    {translate("{languageName} Grammar and Dictionary", {
                      languageName,
                    })}
                  </h1>
                ) : (

                    <DictionaryTitle languageName={languageName} dictionaryType={dictionaryType} />
                 
                  
                )
              ) : (

                <DictionaryTitle languageName={languageName} dictionaryType={dictionaryType} />



             




              )}

              <p>
                {translate("Created by")}{" "}
                <span
                  className="word-link"
                  onClick={() => handleOpenUser(creatorId)}
                >
                  {creatorUsername}
                </span>
              </p>

              {collaborators.length > 0 ? (
                <p>
                  {translate("Collaborators")}:{" "}
                  {collaborators.map((collaborator) => (
                    <span
                      className="word-link"
                      onClick={() => handleOpenUser(collaborator.userId)}
                    >
                      {collaborator.username}
                    </span>
                  ))}
                </p>
              ) : (
                <></>
              )}

              {dictionaryType !== "place_name" && (
               <p
                className="word-link hide-for-printing"
                onClick={() => openPlacenames(id)}
              >
                {translate("View {languageName} Placenames", { languageName })}
              </p>)}

              {dictionaryType !== "personal_name" && (
               <p
                className="word-link hide-for-printing"
                onClick={() => openPersonalnames(id)}
              >
                {translate("View {languageName} Personal names", { languageName })}
              </p>)}

               {dictionaryType !== "dictionary" && (
               <p
                className="word-link hide-for-printing"
                onClick={() => openDictionary(id)}
              >
                {translate("View {languageName} Dictionary", { languageName })}
              </p>)}

              <p
                className="word-link hide-for-printing"
                onClick={() => openGrammar(id)}
              >
                {translate("View {languageName} Grammar", { languageName })}
              </p>

              <p
                className="word-link hide-for-printing"
                onClick={() => openCorpus(id)}
              >
                {translate("View {languageName} Corpus", { languageName })}
              </p>

              <p
                className="word-link hide-for-printing"
                onClick={() => openThesaurus(id)}
              >
                {translate("View {languageName} Thesaurus", { languageName })}
              </p>

              <p
                className="word-link hide-for-printing"
                onClick={() => openFrequencyList(id)}
              >
                {translate("View {languageName} Frequency List", {
                  languageName,
                })}
              </p>

              <p className="word-count">
                {translate("{wordCount} words.", {
                  wordCount: visibleWords.length.toLocaleString(),
                })}
              </p>

              <div className="page-break">
                {showPrintedDictionary && grammar && (
                  <div
                    className="rendered-content"
                    style={{
                      marginLeft: "10px",
                      marginRight: "10px",
                      fontSize: "16px",
                      textAlign: "left",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: grammar,
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                  /*width: "400px",*/
                }}
              >
                <div
                  className="search-container"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div className="search-div hide-for-printing">
                    <input
                      placeholder={translate("Search {languageName} Words", {
                        languageName,
                      })}
                      style={{ marginRight: "10px" }}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      value={searchTerm}
                    ></input>

                    <select
                      onChange={(e) => setSelectSearch(e.target.value)}
                      style={{ marginRight: "10px" }}
                    >
                      <option value="match">{translate("match")}</option>
                      <option value="startswith">
                        {translate("starts with")}
                      </option>
                      <option value="endswith">{translate("ends with")}</option>
                    </select>

                    <button
                      onClick={() => searchLanguage(searchTerm, selectSearch)}
                    >
                      {translate("Search")}
                    </button>
                  </div>

                  <div className="search-div hide-for-printing">
                    <input
                      placeholder={translate("Search English Words")}
                      onChange={(e) => setSearchEnglishTerm(e.target.value)}
                      value={searchEnglishTerm}
                    ></input>

                    <button onClick={() => searchEnglish(searchEnglishTerm)}>
                      {translate("Search")}
                    </button>
                  </div>
                </div>

                <div
                  className="hide-for-printing"
                  style={{ marginLeft: "600px", width: "300px" }}
                >
                  <span style={{ marginRight: "10px" }}>
                    {translate("Filter by part of speech")}
                  </span>
                  <select onChange={(e) => filterByPOS(e.target.value)}>
                    <option value="none">--</option>
                    <option value="adj">{translate("Adjective")}</option>
                    <option value="adp">{translate("Adposition")}</option>
                    <option value="noadvun">{translate("Adverb")}</option>
                    <option value="conj">{translate("Conjunction")}</option>
                    <option value="interj">{translate("Interjection")}</option>
                    <option value="noun">{translate("Noun")}</option>
                    <option value="num">{translate("Number")}</option>
                    <option value="verb">{translate("Verb")}</option>
                    <option value="part">{translate("Particle")}</option>
                    <option value="pron">{translate("Pronoun")}</option>
                    <option value="affix">{translate("Affix")}</option>
                    <option value="clitic">{translate("Clitic")}</option>
                  </select>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "300px",
                    marginTop: "20px",
                  }}
                >
                  <button
                    style={{ marginLeft: "700px", width: "100px" }}
                    onClick={() => refreshResults()}
                    className="hide-for-printing"
                  >
                    {translate("Refresh")}
                  </button>

                  <button
                    style={{ marginLeft: "20px", width: "100px" }}
                    onClick={() => setShowStatModal(true)}
                    className="hide-for-printing"
                  >
                    {translate("Statistics")}
                  </button>

                  <button
                    style={{ marginLeft: "20px", width: "fit-content" }}
                    onClick={() => setShowSourcesModal(true)}
                    className="hide-for-printing"
                  >
                    {translate("Sources")}
                  </button>
                </div>

                <div
                  className="hide-for-printing"
                  style={{ marginLeft: "600px", width: "300px" }}
                >
                  <span style={{ marginRight: "10px" }}>
                    {translate("Show words per page")}
                  </span>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}
                  >
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="600">600</option>
                    <option value="700">700</option>
                    <option value="800">800</option>
                    <option value="900">900</option>
                    <option value="1000">1000</option>
                    <option value="all">{translate("All")}</option>
                  </select>
                </div>
              </div>

              <div className="page-break-wrapper">
                <div className="page-break">
                  <div className="show-for-printing">
                    {tagGroups.length > 0 ? (
                      tagGroups.map((group) => (
                        <div
                          style={{ marginBottom: "10px" }}
                          className="thin-white-border"
                        >
                          <h4>{group.name}</h4>

                          <table
                            style={{
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          >
                            <tbody>
                              {group.tags.map((groupTag) => (
                                <tr key={groupTag}>
                                  <td style={{ textAlign: "left" }}>
                                    {groupTag}:<span> </span>{" "}
                                  </td>
                                  <td style={{ textAlign: "right" }}>
                                    {
                                      visibleWords.filter((word) =>
                                        word.tags.some(
                                          (t) => t.tag === groupTag,
                                        ),
                                      ).length
                                    }{" "}
                                    /{" "}
                                    {(
                                      (visibleWords.filter((word) =>
                                        word.tags.some(
                                          (t) => t.tag === groupTag,
                                        ),
                                      ).length *
                                        100) /
                                      visibleWords.length
                                    ).toFixed(2)}
                                    %
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`dictionary-table page-break two-cols
                    
                }`}
              >
                <PaginatedDictionary
                  visibleWords={visibleWords}
                  pageSize={pageSize}
                  isProto={isProto}
                  showPrintedDictionary={showPrintedDictionary}
                  openWord={openWord}
                  allWords={allWords}
                />
              </div>

              {showPrintedDictionary ? (
                <>
                  {resolvedAffixes?.length > 0 && (
                    <DerivationalAffixBlock resolvedAffixes={resolvedAffixes} />
                  )}

                  <div className="show-for-printing page-break">
                    <h2 className="dictionary-title">
                      {translate("English - {languageName}", { languageName })}
                    </h2>

                    <div className="dictionary-table">
                      {allEnglishWords.map((word, index) => (
                        <div key={index} className="dictionary-entry">
                          <span className="headword">
                            <b style={{ fontWeight: "bolder" }}>
                              {word.english_word}
                            </b>
                          </span>

                          <span style={{ marginLeft: "3px" }}>
                            <i>{word.part_of_speech}</i>
                          </span>
                          {[
                            "n",
                            "adj",
                            "v",
                            "adv",
                            "conj",
                            "part",
                            "pron",
                            "interj",
                            "affix",
                            "adp",
                          ].map((pos) => {
                            const entriesForPos = word.language_entries?.filter(
                              (entry) => entry.part_of_speech === pos,
                            );

                            return entriesForPos?.length > 0 ? (
                              <span key={pos} style={{ marginLeft: "3px" }}>
                                <i>{pos}</i>{" "}
                                <span className="meaning">
                                  {entriesForPos
                                    .map((e) => fixPhrases(e.word))
                                    .join(", ")}{" "}
                                </span>
                              </span>
                            ) : null;
                          })}

                          {word.phrases.length > 0 ? (
                            word.phrases.map((phrase, index) => (
                              <>
                                <span>
                                  ; <b>{phrase.english}</b>
                                </span>
                                <span style={{ marginLeft: "3px" }}>
                                  <i>{phrase.part_of_speech}</i>
                                </span>
                                <span style={{ marginLeft: "3px" }}>
                                  {fixPhrases(phrase.language_word)}
                                </span>
                              </>
                            ))
                          ) : (
                            <></>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              {showPrintedDictionary && (
                <div className="page-break-wrapper">
                  <h1 className="page-break">
                    {translate("{languageName} Thesaurus", { languageName })}
                  </h1>
                  {Object.entries(thesaurusJson).map(
                    ([classification, categories], index) => (
                      <div>
                        <h4>
                          {translate("Class {number}", { number: index + 1 })}:{" "}
                          <br />
                          {translate("Words Expressing {classification}", {
                            classification: classification.toUpperCase(),
                          })}
                        </h4>
                        {Object.entries(categories).map(
                          ([category, domains], index) => (
                            <div>
                              <h5 style={{ marginTop: "10px" }}>
                                {translate("Section {number}. {category}", {
                                  number: index + 1,
                                  category: category.toUpperCase(),
                                })}
                              </h5>

                              {Object.entries(domains).map(
                                ([domain, types], index) => (
                                  <div style={{ marginTop: "30px" }}>
                                    <p>
                                      {index + 1}°.{" "}
                                      {translate(domain.toUpperCase())}
                                    </p>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        textAlign: "left",
                                        gap: "20px",
                                        marginLeft: "10%",
                                      }}
                                    >
                                      {types.map((type, index) => {
                                        const matchingWords =
                                          allWordsForThesaurus?.filter(
                                            (word) =>
                                              word.thesaurus &&
                                              word.thesaurus[type.name],
                                          );

                                        if (
                                          !matchingWords ||
                                          matchingWords.length === 0
                                        ) {
                                          return null; // Don't render this type if no matches
                                        }

                                        return (
                                          <div
                                            key={type.name}
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              maxWidth: "50%",
                                            }}
                                          >
                                            <span>
                                              <span
                                                style={{
                                                  fontWeight: "bold",
                                                  fontSize: "12px",
                                                }}
                                              >
                                                {type.number}.{" "}
                                                {translate(type.name)}:
                                              </span>
                                              <span>
                                                {sortByPOS(
                                                  matchingWords,
                                                  "noun",
                                                  type.name,
                                                )}
                                                {sortByPOS(
                                                  matchingWords,
                                                  "num",
                                                  type.name,
                                                )}
                                                {sortByPOS(
                                                  matchingWords,
                                                  "verb",
                                                  type.name,
                                                )}
                                                {sortByPOS(
                                                  matchingWords,
                                                  "adj",
                                                  type.name,
                                                )}
                                                {sortByPOS(
                                                  matchingWords,
                                                  "adv",
                                                  type.name,
                                                )}
                                                {sortByPOS(
                                                  matchingWords,
                                                  "adp",
                                                  type.name,
                                                )}
                                                {sortByPOS(
                                                  matchingWords,
                                                  "conj",
                                                  type.name,
                                                )}
                                                {sortByPOS(
                                                  matchingWords,
                                                  "part",
                                                  type.name,
                                                )}
                                                {sortByPOS(
                                                  matchingWords,
                                                  "injert",
                                                  type.name,
                                                )}
                                                {sortByPOS(
                                                  matchingWords,
                                                  "pron",
                                                  type.name,
                                                )}
                                              </span>
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          ),
                        )}
                      </div>
                    ),
                  )}

                  <h1 className="page-break">{translate("Thesaurus Index")}</h1>
                  <div style={{ columnCount: "4" }}>
                    <ul style={{ listStyle: "none" }}>
                      {allWords.map(
                        (word, index) =>
                          word.thesaurus && (
                            <li style={{ textAlign: "left" }} key={index}>
                              <b>{word.word}</b>{" "}
                              {Object.entries(word.thesaurus).map(
                                ([typeKey, typeVal], index, array) => (
                                  <span key={typeKey}>
                                    <i>{typeVal.name} </i>
                                    {typeVal.number}
                                    {index < array.length - 1 && ", "}
                                  </span>
                                ),
                              )}
                            </li>
                          ),
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {showPermissionMessage ? (
            <h2>
              {translate("You do not have permission to view this dictionary")}
            </h2>
          ) : (
            <h1>{translate("Loading...")}</h1>
          )}
        </>
      )}
    </div>
  );
};

export default DictionaryBuilder;
