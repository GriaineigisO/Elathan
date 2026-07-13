import { useState, useEffect, useRef } from "react";
import { useTranslate } from "../Functions/TranslateUI";

const LanguageSelector = ({
  name,
  id,
  onLanguageSelect,
  loanerLanguage,
  defaultTerm,
  loanOrInherit,
  selectPublicLanguages,
}) => {
  const { translate } = useTranslate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [allLanguages, setAllLanguages] = useState([]);
  const [daughterLanguages, setDaughterLanguages] = useState([]);

  const containerRef = useRef(null);


  //gets all of a user's languages
  const getLanguages = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getLanguages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      },
    );
    const data = await response.json();
    setAllLanguages(data);
  };

  //gets all public languages regardless of owner
  const getAllLanguages = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getAllLanguages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    setAllLanguages(data);
  };

  //gets only the daughter languages a given language
  const getDaughterLanguages = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getDaughterLanguages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      },
    );
    const data = await response.json();
    setAllLanguages(data);
  };

  useEffect(() => {
    if (defaultTerm) {
      selectedLanguage(defaultTerm);
      setSearchTerm(defaultTerm);
    }

    if (!selectPublicLanguages) {
      if (loanOrInherit === "fromMother") {

        getDaughterLanguages();
      } else {
        getLanguages();
      }
    }

    if (selectPublicLanguages) {
      getAllLanguages();
    }
  }, [loanOrInherit]);

  const filteredLanguages = id
    ? allLanguages.filter(
        (language) =>
          language.language_id !== id &&
          language.language_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      )
    : allLanguages;

  const handleSelectLanguage = (language) => {
    if (loanerLanguage) {
      loanerLanguage(language);
    }

    setSelectedLanguage(language);
    setSearchTerm("");
    setShowDropdown(false);
    if (typeof onLanguageSelect === "function") {
      onLanguageSelect(language);
    }
  };

  // 👇 New effect: handle click outside
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

  return (
    <div ref={containerRef} style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        placeholder={translate("Search languages...")}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        style={{ width: "100%", padding: "8px" }}
      />

      {showDropdown && filteredLanguages.length > 0 && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#242424",
            border: "1px solid #ccc",
            width: "100%",
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {filteredLanguages.map((language, index) => (
            <div
              key={index}
              onClick={() => handleSelectLanguage(language)}
              className="dropdown-list"
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              {language.language_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
