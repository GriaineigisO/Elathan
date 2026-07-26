import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import AddTextModal from "../Components/addTextModal.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import { getLanguage } from "../services/languageService.js";


const CorpusList = () => {
  const { id } = useParams();
      const { translate } = useTranslate();
  
  const [language, setLanguage] = useState();
  const [showAddTextModal, setShowAddTextModal] = useState(false);
  const [corpus, setCorpus] = useState([]);
  const [totalWords, setTotalWords] = useState([]);
  const [uniqueWords, setUniqueWords] = useState([]);

  
    const getCorpus = async () => {
     

      let data = await window.electron.getLanguage(id);
      setCorpus(data[0].corpus);
      setLanguage(data[0])
    };
    useEffect(() => {
    getCorpus();
  }, [id]);

  const handleAddText = () => {
    setShowAddTextModal(true);
  };

  const openText = (textId, languageId) => {
  window.location.href = `/corpus/${languageId}/${textId}`;
};

//count total amount of words from all texts
useEffect(() => {
  if (corpus) {
    corpus.forEach((text) => {

      //find unique instances of a word
      //first, turn each text string into an array
      const words = text.text.trim().split(/\s+/)

      //clean up user notation, preserve headwords and disgard inflected forms
      words.forEach((word) => {
        let fixedWord = word;
        
        if (fixedWord.includes("=")) {
          fixedWord = fixedWord.split("=")[1]
        }
        if (fixedWord.includes("~")) {
          fixedWord = fixedWord.split("~")[0]
        }

        if (!uniqueWords.includes(fixedWord))  setUniqueWords((prev) => [...prev, fixedWord]);
        setTotalWords((prev) => [...prev, fixedWord])


      })
      
    })
  }

}, [corpus])


const handleOpenCorpusFrequencyList = (id) => {
  window.open(`${import.meta.env.VITE_FRONTEND_URL}/corpusFrequency/${id}`, "_blank");
}


  return (
   
    <div style={{ textAlign: "center" }}>
      <AddTextModal
        id={id}
        show={showAddTextModal}
        setShow={setShowAddTextModal}
        onSuccess={getCorpus}
      />

      

      {language && <h1>{translate("{languageName} Corpus", {languageName: language.language_name})}</h1>}

      <button onClick={handleAddText}>{translate("Add Text")}</button>

      {language && <p style={{marginTop:"10px"}}>{translate("The {languageName} corpus is comprised of {corpusLength} texts, totalling {totalWords} words ({uniqueWords} unique words.)", {languageName: language.language_name, corpusLength: corpus.length, totalWords: totalWords.length.toLocaleString(), uniqueWords: uniqueWords.length.toLocaleString()})}</p>}

      <p className="word-link" onClick={() => handleOpenCorpusFrequencyList(language.language_id)}>{translate("Corpus-based Frequency List")}</p>

      <ol style={{marginTop:"30px", textAlign:"left", marginLeft: "30%"}}>
        {corpus.map((text, index) => (
          <li key={index}>
            <h5 className="word-link" onClick={() => openText(text.id, id)}>{text.title}</h5>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CorpusList;
