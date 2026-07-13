import { useState, useEffect, useRef } from "react";

const WordSelector = ({
  name,
  id,
  motherLanguageName,
  motherLanguageId,
  onWordSelect,
  motherLanguageIsProto,
  defaultTerm,
  defaultTermId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [allWords, setAllWords] = useState([]);
  const [wordMeanings, setWordMeanings] = useState([]);

  const containerRef = useRef(null);

  useEffect(() => {
    if (defaultTerm) {
      setSelectedWord(defaultTerm);
      setSearchTerm(defaultTerm);
    }

    const getLanguages = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getAllWords`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: motherLanguageId }),
        }
      );
      const data = await response.json();
      setAllWords(data);
    };
    getLanguages();
  }, []);

  const handleSelectWord = (word) => {
    setSelectedWord(word);
    setSearchTerm(word.word);
    setShowDropdown(false);
    if (typeof onWordSelect === "function") {
      onWordSelect(word);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const placeholderText = `Search ${motherLanguageName} Words`;

  useEffect(() => {
    if (allWords) {
      const allMeanings = [];

      allWords.forEach((word) => {
        let meanings = [];

        if (word.noun_meaning) meanings.push(...word.noun_meaning);
        if (word.num_meaning) meanings.push(...word.num_meaning);
        if (word.verb_meaning) meanings.push(...word.verb_meaning);
        if (word.adj_meaning) meanings.push(...word.adj_meaning);
        if (word.adv_meaning) meanings.push(...word.adv_meaning);
        if (word.adp_meaning) meanings.push(...word.adp_meaning);
        if (word.part_meaning) meanings.push(...word.part_meaning);
        if (word.interj_meaning) meanings.push(...word.interj_meaning);
        if (word.conj_meaning) meanings.push(...word.conj_meaning);
        if (word.pron_meaning) meanings.push(...word.pron_meaning);
        if (word.affix_meaning) meanings.push(...word.affix_meaning);
        if (meanings.length > 0) {
          const combinedMeaning = meanings.join(", ");
          allMeanings.push(combinedMeaning);
        }
      });

      setWordMeanings(allMeanings);
    }
  }, [allWords]);

  const filteredWords = allWords.filter((word) =>
    word.word.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const getMeaning = (word) => {
    let meanings = [];
    if (word.noun_meaning) meanings.push(...word.noun_meaning);
    if (word.num_meaning) meanings.push(...word.num_meaning);
    if (word.verb_meaning) meanings.push(...word.verb_meaning);
    if (word.adj_meaning) meanings.push(...word.adj_meaning);
    if (word.adv_meaning) meanings.push(...word.adv_meaning);
    if (word.adp_meaning) meanings.push(...word.adp_meaning);
    if (word.part_meaning) meanings.push(...word.part_meaning);
    if (word.interj_meaning) meanings.push(...word.interj_meaning);
    if (word.conj_meaning) meanings.push(...word.conj_meaning);
    if (word.pron_meaning) meanings.push(...word.pron_meaning);
    if (word.affix_meaning) meanings.push(...word.affix_meaning);
    return meanings.join(", ");
  };

  return (
    <div ref={containerRef} style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        placeholder={placeholderText}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        style={{ width: "100%", padding: "8px" }}
      />

      {showDropdown && allWords.length > 0 && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#242424",
            border: "1px solid #ccc",
            width: "100%",
            maxHeight: "400px",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {filteredWords.map((word, index) => (
            <div
              key={index}
              onClick={() => handleSelectWord(word)}
              className="dropdown-list"
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee"
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              <b>
                <i>
                  {motherLanguageIsProto ? <span>*</span> : <></>}
                  {word.word_type === "suffix" ? <span>-</span> : <></>}
                  {word.word}
                  {word.word_type === "prefix" ? <span>-</span> : <></>}
                </i>
              </b>{" "}
              "{getMeaning(word)}"
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WordSelector;
