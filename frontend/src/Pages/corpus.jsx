import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import ParagraphWithTooltips from "../Components/wordWithTooltip";
import EditTextModal from "../Components/editTextModal"
import removeTags from "../Functions/removeTags";
import { useTranslate } from "../Functions/TranslateUI";
import {getText}  from "../services/languageService.js";


const Corpus = () => {
  const { languageId, textId } = useParams();
    const { translate } = useTranslate();

  const [text, setText] = useState([]);
  const [showEditTextModal, setShowEditTextModal] = useState(false);

  
    const getText = async () => {
      

      let data = await window.electron.getText(textId, languageId)
      setText(data);
    };
    
    useEffect(() => {
    getText();
  }, [textId, languageId]);

  const handleEditText = () => {
    setShowEditTextModal(true)
  };


  return (
    <div style={{ textAlign: "center" }}>

        <EditTextModal
                show={showEditTextModal}
                setShow={setShowEditTextModal}
                textId={textId}
                languageId={languageId}
                onSuccess={getText}
              />

      {text.id && (
        <div>
          <h1>{text.title}</h1>

          <button onClick={handleEditText}>{translate("Edit Text")}</button>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              flexDirection: "row",
              textAlign: "left",
            }}
          >
            <div
              style={{
                borderRight: "1px solid rgb(228, 217, 217)",
                padding: "10px",
                width:"50%"
              }}
            >
              {<ParagraphWithTooltips languageId={languageId} paragraph={removeTags(text.text)} />}
              
            </div>

            <div style={{ padding: "10px", width:"50%" }} >
              {removeTags(text.translation)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Corpus;
