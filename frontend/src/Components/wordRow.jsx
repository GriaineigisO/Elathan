import React, { useState, useEffect } from "react";
import WordSelector from "./wordSelector";
import formatMeaning from "../Functions/formatMeaning";
import editIcon from "../assets/pencil-square.svg";
import deleteIcon from "../assets/trash-bin.svg";
import upArrow from "../assets/upArrow.svg";
import downArrow from "../assets/downArrow.svg";

const WordRow = ({
  word,
  index,
  language,
  id,
  handleChosenWord,
  editWord,
  saveFrequencyList,
  deleteWord,
  canEdit,
  moveWordUp,
  moveWordDown
}) => {
  const editRef = React.useRef();


  useEffect(() => {
    saveFrequencyList();
    const handleClickOutside = (event) => {
      if (
        editRef.current &&
        !editRef.current.contains(event.target) &&
        word.isEditing
      ) {
        handleChosenWord(index, word.selectedWord); // closes edit mode, keeps existing value
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [word.isEditing]);

  const moveUp = () => {

  }

  return (
    <div
      key={index}
      style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
      ref={editRef}
    >
      <p>{index+1}</p>

      {!word.isEditing && (
        <p>
          <span>
            {word.selectedWord ? (
              <i>
                <b>
                  <a
                    className="word-link"
                    href={`${import.meta.env.VITE_FRONTEND_URL}/word/${
                      word.selectedWord.word_id
                    }`}
                    target={"_blank"}
                  >
                    {word.selectedWord.word}
                  </a>
                </b>
              </i>
            ) : (
              "Choose a word"
            )}
          </span>
          <span style={{ marginLeft: "5px" }}>
            {word.selectedWord ? `"${formatMeaning(word.selectedWord)}"` : ""}
          </span>
        </p>
      )}

      {word.isEditing && (
        <WordSelector
          id={id}
          onWordSelect={(selectedWord) => handleChosenWord(index, selectedWord)}
          motherLanguageName={language.language_name}
          motherLanguageId={id}
        />
      )}


      {canEdit && (
        <div>
      <img
        style={{ marginLeft: "10px" }}
        src={editIcon}
        className="edit-button"
        onClick={() => editWord(index)}
      ></img>

      <img
        style={{ marginLeft: "10px" }}
        src={deleteIcon}
        className="delete-button-with-icon"
        onClick={() => deleteWord(index)}
      ></img>

      <img
        style={{ marginLeft: "10px" }}
        src={upArrow}
        className="delete-button-with-icon"
        onClick={() => moveWordUp(index)}
      ></img>

      <img
        style={{ marginLeft: "10px" }}
        src={downArrow}
        className="delete-button-with-icon"
        onClick={() => moveWordDown(index)}
      ></img>




      </div>
      )}
    </div>
  );
};

export default WordRow;
