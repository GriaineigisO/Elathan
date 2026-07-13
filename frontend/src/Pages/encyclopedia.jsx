import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import React from "react";
import AddEntryModal from "../Components/addEntryModal.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import pLimit from "p-limit";
import PaginatedEncyclopedia from "../Components/paginateEncyclopedia.jsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DictionaryPdf from "../Components/EncyclopediaPDF.jsx";

const Encyclopedia = () => {
  const { id } = useParams();
  const { translate } = useTranslate();
  const [pageSize, setPageSize] = useState(200);
  const [showAddEntryModal, setShowAddEntryModal] = useState(false);
  const [allEntries, setAllEntries] = useState([]);
  const [encyclopediaName, setEncyclopediaName] = useState();
  const [entry, setEntry] = useState();
  const [showPrintedDictionary, setShowPrintedDictionary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectSearch, setSelectSearch] = useState("match");
  const [topicCounts, setTopicCounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [searchEnglishTerm, setSearchEnglishTerm] = useState();
  const [visibleEntries, setVisibleEntries] = useState([]);
  const [allEnglishEntries, setAllEnglishEntries] = useState([]);
  const [creatorUsername, setCreatorUsername] = useState();
  const [creatorId, setCreatorId] = useState();
  const [collaborators, setCollaborators] = useState([]);
  const [canEdit, setCanEdit] = useState(true);
  const [canView, setCanView] = useState(true);
  const [privacy, setPrivacy] = useState(false);
  const [showPermissionMessage, setShowPermissionMessage] = useState(false);
  const [tagGroups, setTagGroups] = useState([]);
  const [topics, setTopics] = useState([]);

  const rotatingMessages = [
    <div className="quote">
      <span>
        Grace upon <b className="ogma">Ogma son of Elatha</b> for his erudite
        gifts. May he imbue this encyclopedia with wisdom and learning.
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

  function usePrintMode() {
    const [isPrinting, setIsPrinting] = useState(false);

    useEffect(() => {
      const before = () => setIsPrinting(true);
      const after = () => setIsPrinting(false);

      window.addEventListener("beforeprint", before);
      window.addEventListener("afterprint", after);

      // Fallback + also catches Ctrl+P toggles in some browsers
      const mql = window.matchMedia("print");
      const onChange = (e) => setIsPrinting(e.matches);
      if (mql.addEventListener) mql.addEventListener("change", onChange);
      else mql.addListener(onChange);

      return () => {
        window.removeEventListener("beforeprint", before);
        window.removeEventListener("afterprint", after);
        if (mql.removeEventListener)
          mql.removeEventListener("change", onChange);
        else mql.removeListener(onChange);
      };
    }, []);

    return isPrinting;
  }

  const isPrinting = usePrintMode();

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

  const handleEntryAdded = () => {
    getAllEntries(); // refresh updated entries
  };

  // Process large arrays without blocking the main thread
  const processEntriesInChunks = async (words, chunkSize = 100) => {
    const result = [];

    for (let i = 0; i < words.length; i += chunkSize) {
      const chunk = words.slice(i, i + chunkSize);
      const processedChunk = chunk; // await if async
      result.push(...processedChunk);

      // Yield control to allow React to render
      await new Promise((r) => setTimeout(r, 0));
    }

    return result;
  };

  const getEncyclopedia = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getEncyclopedia`,
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
    setEncyclopediaName(data[0].encyclopedia_name);
    setTopics(data[0].topics);
    setCreatorId(data[0].user_id);
    getUserInfo(data[0].user_id, setCreatorUsername);
  };

  const getAllEntries = async () => {
    try {
      // 1️⃣ Fetch all words
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getAllEntries`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        },
      );

      let data = await response.json();

      setAllEntries(data);
      setVisibleEntries(data);
    } catch (err) {
      console.error("Error fetching or processing entries:", err);
    }
  };

  const countTopics = () => {
    //count amounts of entries for each topic
    if (topics.length > 0) {
  const newCount = topics.map((topic) => {
    const topicCount = allEntries.filter(
      (entry) => entry.topic === topic.name
    ).length;

    console.log(topicCount)

    return {
      topicName: topicCount > 1 ? topic.name_plural : topic.name,
      topicCount,
    };
  });


  setTopicCounts(newCount);
}
  };

  useEffect(() => {
    getEncyclopedia();
    getAllEntries();
  }, [id]);

  useEffect(() => {
    countTopics();
  }, [topics]);

  // const checkPermission = async () => {
  //   const userId = localStorage.getItem("userId");
  //   const response = await fetch(
  //     `${import.meta.env.VITE_BACKEND_URL}/api/checkPermission`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id, userId }),
  //     }
  //   );
  //   const data = await response.json();
  //   setCanEdit(data);
  // };

  // useEffect(() => {
  //   checkPermission();
  // }, [id]);

  // const checkPrivacy = async () => {
  //   const userId = localStorage.getItem("userId");

  //   //if user is not logged in
  //   if (!userId && privacy === "private") {
  //     setCanView(false);
  //     return;
  //   }

  //   const response = await fetch(
  //     `${import.meta.env.VITE_BACKEND_URL}/api/checkPrivacy`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id, userId }),
  //     }
  //   );
  //   const data = await response.json();
  //   setCanView(data);
  // };

  // useEffect(() => {
  //   checkPrivacy();
  // }, [id]);

  // const getAllEntriesForPrint = async () => {
  //   setLoading(true);

  //   //prepare arrays to display the english > language part of the dictionary
  //   let addedEnglishEntries = []; //all English words happened upon are stored in this array, so we can check if an english word has already been entered e.g in the case of synonyms

  //   let fromEnglishDictionary = [];

  //   const skipEntries = [
  //     "a",
  //     "-",
  //     "/",
  //     "an",
  //     "the",
  //     "has",
  //     "you",
  //     "I",
  //     "us",
  //     "him",
  //     "her",
  //     "them",
  //   ];
  //   const skipIfMultipleEntries = [
  //     "who",
  //     "that",
  //     "which",
  //     "or",
  //     "of",
  //     "is",
  //     "to",
  //     "at",
  //     "for",
  //     "be",
  //     "you",
  //     "one",
  //     "was",
  //     "we",
  //     "you",
  //     "I",
  //     "us",
  //     "he",
  //     "she",
  //     "it",
  //     "him",
  //     "her",
  //     "they",
  //     "them",
  //     "where",
  //     "and",
  //   ];

  //   const manageFromEnglishDictionary = (posMeaning, pos, word) => {
  //     posMeaning.forEach((rawEnglishEntry) => {
  //       let englishEntry = rawEnglishEntry.trim();

  //       // Special case: remove "to " if it's a verb meaning
  //       if (pos === "v" && englishEntry.toLowerCase().startsWith("to ")) {
  //         englishEntry = englishEntry.slice(3).trim(); // remove "to "
  //       }

  //       if (englishEntry.startsWith("(")) return; //skip if the word is something like "(of rivers)"

  //       if (!addedEnglishEntries.includes(englishEntry.toLowerCase())) {
  //         const words = englishEntry.trim().split(/\s+/); //split string by whitespace incase the translation is made of several english words e.g "inhospitable place"

  //         const hasMultipleEntries = words.length > 1;

  //         if (hasMultipleEntries) {
  //           words.forEach((splitEntry) => {
  //             const lowerSplit = splitEntry.toLowerCase();

  //             if (
  //               skipEntries.includes(splitEntry) ||
  //               skipIfMultipleEntries.includes(splitEntry)
  //             )
  //               return;

  //             if (!addedEnglishEntries.includes(lowerSplit)) {
  //               addedEnglishEntries.push(lowerSplit);

  //               let obj = {
  //                 english_word: lowerSplit,
  //                 language_entries: [],
  //                 phrases: [],
  //               };

  //               let phrase = {
  //                 english: rawEnglishEntry
  //                   .replace(splitEntry, "~")
  //                   .replace(/^to\s+/i, ""),
  //                 language_word: word.word,
  //                 part_of_speech: [pos],
  //               };

  //               obj.phrases.push(phrase);
  //               fromEnglishDictionary.push(obj);
  //             } else {
  //               // If already exists, update existing entry
  //               fromEnglishDictionary.forEach((obj) => {
  //                 if (obj.english_word === lowerSplit) {
  //                   let phrase = {
  //                     english: rawEnglishEntry
  //                       .replace(splitEntry, "~")
  //                       .replace(/^to\s+/i, ""),
  //                     language_word: word.word,
  //                     part_of_speech: [pos],
  //                   };
  //                   obj.phrases.push(phrase);
  //                 }
  //               });
  //             }
  //           });
  //         } else {
  //           if (skipEntries.includes(englishEntry.toLowerCase())) return;

  //           addedEnglishEntries.push(englishEntry.toLowerCase());

  //           let obj = {
  //             english_word: englishEntry.toLowerCase(),
  //             language_entries: [{ part_of_speech: pos, word: word.word }],
  //             phrases: [],
  //           };

  //           fromEnglishDictionary.push(obj);
  //         }
  //       } else {
  //         const words = englishEntry.trim().split(/\s+/); //split string by whitespace incase the translation is made of several english words e.g "inhospitable place"
  //         const hasMultipleEntries = words.length > 1;

  //         if (hasMultipleEntries) {
  //           //find the object which already has the english word, add the language word to the phrases

  //           words.forEach((splitEntry) => {
  //             if (
  //               skipEntries.includes(splitEntry) ||
  //               skipIfMultipleEntries.includes(splitEntry)
  //             )
  //               return;

  //             fromEnglishDictionary.forEach((obj) => {
  //               if (obj.english_word === splitEntry.toLowerCase()) {
  //                 let phrase = {
  //                   english: rawEnglishEntry
  //                     .replace(splitEntry, "~")
  //                     .replace(/^to\s+/i, ""),
  //                   language_word: word.word,
  //                   part_of_speech: [pos],
  //                 };

  //                 obj.phrases.push(phrase);
  //                 obj.part_of_speech.push(pos);
  //               }
  //             });
  //           });
  //         } else {
  //           //find the object which already has the english word, add the language_word to the translation
  //           fromEnglishDictionary.forEach((obj) => {
  //             if (skipEntries.includes(englishEntry.toLowerCase())) return;

  //             if (obj.english_word === englishEntry.toLowerCase()) {
  //               obj.language_entries.push({
  //                 part_of_speech: pos,
  //                 word: word.word,
  //               });

  //               //obj.part_of_speech.push("n");
  //             }
  //           });
  //         }
  //       }
  //     });
  //   };

  //   let affixesArr = [];

  //   allEntries.forEach((word) => {
  //     if (word.word_type === "word") {
  //       if (word.noun_meaning) {
  //         manageFromEnglishDictionary(word.noun_meaning, "n", word);
  //       }
  //       if (word.adj_meaning) {
  //         manageFromEnglishDictionary(word.adj_meaning, "adj", word);
  //       }
  //       if (word.adv_meaning) {
  //         manageFromEnglishDictionary(word.adv_meaning, "adv", word);
  //       }
  //       if (word.adp_meaning) {
  //         manageFromEnglishDictionary(word.adp_meaning, "adp", word);
  //       }
  //       if (word.conj_meaning) {
  //         manageFromEnglishDictionary(word.conj_meaning, "conj", word);
  //       }
  //       if (word.interj_meaning) {
  //         manageFromEnglishDictionary(word.interj_meaning, "interj", word);
  //       }
  //       if (word.pron_meaning) {
  //         manageFromEnglishDictionary(word.pron_meaning, "pron", word);
  //       }
  //       if (word.part_meaning) {
  //         manageFromEnglishDictionary(word.part_meaning, "part", word);
  //       }
  //       if (word.affix_meaning) {
  //         manageFromEnglishDictionary(word.affix_meaning, "affix", word);
  //       }
  //       if (word.verb_meaning) {
  //         manageFromEnglishDictionary(word.verb_meaning, "v", word);
  //       }
  //     } else {
  //       affixesArr.push(word);
  //     }
  //   });

  //   fromEnglishDictionary.sort((a, b) =>
  //     a.english_word.localeCompare(b.english_word)
  //   );

  //   setAllEnglishEntries(fromEnglishDictionary);

  //   const response = await fetch(
  //     `${import.meta.env.VITE_BACKEND_URL}/api/getAllEntriesForPrint`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id }),
  //     }
  //   );

  //   let data = await response.json();
  //   if (data) {
  //     setLoading(false);
  //     if (showPrintedDictionary) {
  //       setShowPrintedDictionary(false);
  //     } else {
  //       setShowPrintedDictionary(true);
  //     }
  //   }

  //   //add "to " before each verb's translation
  //   data = data.map((word) => {
  //     if (word.verb_meaning) {
  //       return {
  //         ...word,
  //         verb_meaning: word.verb_meaning.map((verb) => {
  //           // Only add 'to ' if it doesn't already start with it
  //           return verb.startsWith("to ") || verb.startsWith("(")
  //             ? verb
  //             : `to ${verb}`;
  //         }),
  //       };
  //     }
  //     return word;
  //   });

  //   const affixes = data.filter(
  //     (word) => word.word_type === "suffix" || word.word_type === "prefix"
  //   );

  //   const words = data.filter((word) => word.word_type === "word");

  //   const processed = addPhrasesToEntries(data);
  //   setVisibleEntries(processed);

  //   setShowPrintedDictionary(true);
  //   setLoading(false);
  // };

  useEffect(() => {
    if (showPrintedDictionary) {
      // Let React render first, then open the print dialog
      setTimeout(() => {
        window.print();
      }, 300);
    }
  }, [showPrintedDictionary]);

  const openEntry = (word_id) => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/word/${word_id}`,
      "_blank",
    );
  };

  // useEffect(() => {
  //   const getEncyclopedia = async () => {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/getEncyclopedia`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ id }),
  //       },
  //     );

  //     let data = await response.json();
  //     console.log(data[0].topics)
  //     setPrivacy(data[0].privacy);
  //     setEncyclopediaName(data[0].encyclopedia_name);
  //     setTopics(data[0].topics);
  //     setCreatorId(data[0].user_id);
  //     getUserInfo(data[0].user_id, setCreatorUsername);
  //   };
  //   getEncyclopedia();
  // }, [id]);

  //const hasFetchedCollaborators = useRef(false);

  // useEffect(() => {
  //   if (hasFetchedCollaborators.current) return;
  //   hasFetchedCollaborators.current = true;

  //   const getCollaborators = async () => {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/getLanguage`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ id }),
  //       },
  //     );

  //     const data = await response.json();

  //     if (!data[0]?.collaborators?.length) return;

  //     const newCollaborators = [];

  //     for (const collaborator of data[0].collaborators) {
  //       const username = await getUsername(collaborator);
  //       newCollaborators.push({
  //         username: collaborator.username,
  //         userId: collaborator.user_id,
  //       });
  //     }

  //     setCollaborators((prev) => {
  //       const existingIds = new Set(prev.map((c) => c.userId));
  //       const filtered = newCollaborators.filter(
  //         (c) => !existingIds.has(c.userId),
  //       );
  //       return [...prev, ...filtered];
  //     });
  //   };

  //   getCollaborators();
  // }, [id]);

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

  const searchLanguage = (searchTerm, searchSelect) => {
    let results = [];

    if (searchSelect === "match") {
      results = visibleEntries.filter(
        (word) =>
          word.word === searchTerm ||
          (word.phrases
            ? word.phrases.some((phrase) => phrase.word.includes(searchTerm))
            : false),
      );
    } else if (searchSelect === "startswith") {
      results = visibleEntries.filter(
        (word) =>
          word.word.startsWith(searchTerm) ||
          (word.phrases &&
            word.phrases.some((phrase) =>
              phrase.meaning.startsWith(searchTerm),
            )),
      );
    } else if (searchSelect === "endswith") {
      results = visibleEntries.filter((word) => word.word.endsWith(searchTerm));
    }

    setVisibleEntries(results);
  };

  const searchEnglish = (searchTerm) => {
    const regex = new RegExp(`\\b${searchTerm}\\b`, "i"); // "i" for case-insensitive

    const results = visibleEntries.filter(
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

    setVisibleEntries(results);
  };

  const refreshResults = () => {
    setVisibleEntries(allEntries);
    setSearchTerm("");
  };

  const filterByPOS = (value) => {
    let results = [];

    switch (value) {
      case "noun":
        results = allEntries.filter((word) => word.noun_meaning);
        break;
      case "num":
        results = allEntries.filter((word) => word.num_meaning);
        break;
      case "verb":
        results = allEntries.filter((word) => word.verb_meaning);
        break;
      case "adj":
        results = allEntries.filter((word) => word.adj_meaning);
        break;
      case "adv":
        results = allEntries.filter((word) => word.adv_meaning);
        break;
      case "adp":
        results = allEntries.filter((word) => word.adp_meaning);
        break;
      case "conj":
        results = allEntries.filter((word) => word.conj_meaning);
        break;
      case "interj":
        results = allEntries.filter((word) => word.interj_meaning);
        break;
      case "pron":
        results = allEntries.filter((word) => word.pron_meaning);
        break;
      case "affix":
        results = allEntries.filter(
          (word) => word.word_type === "prefix" || word.word_type === "suffix",
        );
        break;
      case "clitic":
        results = allEntries.filter(
          (word) =>
            word.word_type === "proclitic" || word.word_type === "enclitic",
        );
        break;
      default:
        results = allEntries.filter((word) => word.part_meaning);
        break;
    }
    setVisibleEntries(results);
  };

  const handleOpenUser = (id) => {
    window.open(`${import.meta.env.VITE_FRONTEND_URL}/user/${id}`, "_blank");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPermissionMessage(true);
    }, 1000); // 3 seconds

    return () => clearTimeout(timer); // cleanup
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

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      {canView ? (
        <>
          {loading ? (
            <div className="spinner-container">
              <div className="spinner" />
              <p>
                {translate(
                  "Your encyclopedia is being prepared for printing. This may take a few moments...",
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
                    setShowAddEntryModal(true);
                  }}
                >
                  {translate("Add Entry")}
                </button>
              ) : (
                <></>
              )}
              
              <button
                className="hide-for-printing"
                onClick={() => {
                  setShowPrintOptionsModal(true);
                }}
              >
                {translate("Print")}
              </button>
              <PDFDownloadLink
                document={
                  <DictionaryPdf
                    visibleEntries={visibleEntries}
                    encyclopediaName={encyclopediaName}
                    topicCounts={topicCounts}
                    creatorUsername={creatorUsername}
                  />
                }
                fileName={`${encyclopediaName}.pdf`}
              >
                {({ loading }) =>
                  loading ? "Preparing PDF..." : "Download PDF"
                }
              </PDFDownloadLink>

              <AddEntryModal
                show={showAddEntryModal}
                setShow={setShowAddEntryModal}
                encyclopediaId={id}
                onSuccess={handleEntryAdded}
                topics={topics}
              />

              <h1 className="dictionary-title">
                {translate("{encyclopediaName}", { encyclopediaName })}
              </h1>

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

              <p className="word-count">
                {translate("{wordCount} entries.", {
                  wordCount: visibleEntries.length.toLocaleString(),
                })}
              </p>
              <p
                className="word-count"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {topicCounts.map((topic) =>
                  topic.topicCount > 0 ? (
                    <span key={topic.topicName}>
                      {topic.topicCount} {topic.topicName}
                    </span>
                  ) : null,
                )}
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
                      placeholder={translate("Search {languageName} Entries", {
                        languageName: encyclopediaName,
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
                                      visibleEntries.filter((word) =>
                                        word.tags.some(
                                          (t) => t.tag === groupTag,
                                        ),
                                      ).length
                                    }{" "}
                                    /{" "}
                                    {(
                                      (visibleEntries.filter((word) =>
                                        word.tags.some(
                                          (t) => t.tag === groupTag,
                                        ),
                                      ).length *
                                        100) /
                                      visibleEntries.length
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

              <div className={`dictionary-table page-break ${"two-cols"}`}>
                <PaginatedEncyclopedia
                  visibleEntries={visibleEntries}
                  pageSize={pageSize}
                  showPrintedDictionary={showPrintedDictionary}
                  openEntry={openEntry}
                  allEntries={allEntries}
                  onSuccess={handleEntryAdded}
                  topics={topics}
                />
              </div>
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

export default Encyclopedia;
