import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import WordSelector from "../Components/wordSelector.jsx";
import formatMeaning from "../Functions/formatMeaning.jsx";
import WordRow from "../Components/wordRow.jsx";
import { useTranslate } from "../Functions/TranslateUI";


const FrequencyList = () => {
    const { translate } = useTranslate();

  const { id } = useParams();
  const [language, setLanguage] = useState();
  const [words, setWords] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const [canView, setCanView] = useState(false);

  const checkPermission = async () => {
    if (id) {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkPermission`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, userId }),
        }
      );
      const data = await response.json();
      setCanEdit(data);
    }
  };

  useEffect(() => {
    checkPermission();
  }, [id]);

  const getLanguage = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getLanguage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const data = await response.json();
    if (data) {
      setLanguage(data[0]);
    } else {
      console.error("could not get language data");
    }
  };

  const getFrequencyList = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getFrequencyList`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const data = await response.json();
    if (data) {
      setWords(data.frequency_list);
    } else {
      console.error("could not get frequency list");
    }
  };

  const checkPrivacy = async () => {
    if (id) {
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
        }
      );
      const data = await response.json();

      setCanView(data);
    }
  };

  useEffect(() => {
    getLanguage();
    getFrequencyList();
    checkPrivacy();
  }, [id]);

  const saveFrequencyList = async (frequencyList) => {
    if (!frequencyList) {
      frequencyList = words;
    }
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/saveFrequencyList`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, words: frequencyList }),
      }
    );
  };

  const editWord = (index) => {
    setWords((prev) =>
      prev.map((word, i) => (i === index ? { ...word, isEditing: true } : word))
    );
  };

  const deleteWord = (index) => {
    const filtered = words.filter((_, i) => i !== index);
    setWords(filtered);
    saveFrequencyList(filtered);
  };

  const handleAddWord = () => {
    const newWord = {
      rank: words ? words.length + 1 : 1,
      isEditing: false,
    };
    setWords((prev) => [...(prev ?? []), newWord]);
  };

  const handleChosenWord = (index, selectedWord) => {
    setWords((prevWords) =>
      prevWords.map((word, i) =>
        i === index
          ? { ...word, selectedWord, isEditing: false } // Optionally exit edit mode
          : word
      )
    );
  };

  const moveWordUp = (index) => {
  if (index === 0) return; // already at the top
  const newWords = [...words];
  [newWords[index - 1], newWords[index]] = [newWords[index], newWords[index - 1]];
  setWords(newWords);
  saveFrequencyList(newWords);
};

const moveWordDown = (index) => {
  if (index === words.length - 1) return; // already at the bottom
  const newWords = [...words];
  [newWords[index + 1], newWords[index]] = [newWords[index], newWords[index + 1]];
  setWords(newWords);
  saveFrequencyList(newWords);
};

  if (language) {
    if (!canView) return <h1>{translate("You do not have permission to view this page")}</h1>;

    return (
      <div style={{textAlign:"center"}}>
        <h1>{translate("{languageName} Frequency List", {languageName:language.language_name})}</h1>

        <div className="thin=white-border">
          <div>
            {canEdit && <button onClick={handleAddWord}>{translate("Add Word")}</button>}
          </div>

          <div style={{marginLeft:"200px"}}>
            {words && (
            words.length > 0 &&
              words.map((word, index) => (
                <WordRow
                  key={index}
                  word={word}
                  index={index}
                  language={language}
                  id={id}
                  handleChosenWord={handleChosenWord}
                  editWord={editWord}
                  saveFrequencyList={saveFrequencyList}
                  deleteWord={deleteWord}
                  canEdit={canEdit}
                  moveWordUp={moveWordUp}
                  moveWordDown={moveWordDown}
                />
              ))
              )}
          </div>
        </div>
      </div>
    );
  }
};

export default FrequencyList;
