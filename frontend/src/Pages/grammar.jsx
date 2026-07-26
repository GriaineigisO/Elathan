import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import MyEditor from "../vendor/ckEditor-build/App.jsx";
import { getLanguage, saveGrammar } from "../services/languageService.js";

import { useTranslate } from "../Functions/TranslateUI";


const Grammar = () => {
  const { id } = useParams();
    const { translate } = useTranslate();
  
  const [languageName, setLanguageName] = useState();
  const [loading, setLoading] = useState(false);
  const [showPermissionMessage, setShowPermissionMessage] = useState(false);
  const [grammar, setGrammar] = useState();
  const [showEditGrammar, setShowEditGrammar] = useState(false);

  const getGrammar = async () => {

    let data = await window.electron.getLanguage(id);
    setGrammar(data[0].grammar);
    setLanguageName(data[0].language_name);
  };

  useEffect(() => {
    getGrammar();
  }, [id]);


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


  const saveGram = async () => {
    const data = await window.electron.saveGrammar(id, grammar);
    if (!data.success) {
      console.error("error saving grammar")
    } else {
      showToast("Changes saved ✅");
          
    }
  };

  const handleEditGrammar = () => {
    if (showEditGrammar) {
      setShowEditGrammar(false);
      saveGram();
    } else {
      setShowEditGrammar(true);
    }
  };

  const handleCancelEditing = () => {
    setShowEditGrammar(false);
  }

    const openDictionary = (id) => {
     window.location.href = `/dictionary/${id}`;
  };

  const printGrammar = () => {

  }

  return (
    <div style={{ width: "100%" }}>
     
        <>
          {loading ? (
            <div className="spinner-container">
              <div className="spinner" />
              <p>{translate("Loading...")}</p>
            </div>
          ) : (
            <div >
                <div style={{ textAlign: "center" }}>
              {!showEditGrammar ? (
                <button
                  className="hide-for-printing"
                  onClick={handleEditGrammar}
                >
                  {translate("Edit Grammar")}
                </button>
              ) : (
                <></>
              )}

              {showEditGrammar ? (
                <div>
                <button
                  className="hide-for-printing"
                  onClick={handleEditGrammar}
                >
                  {translate("Save Grammar")}
                </button>

                <button
                  className="hide-for-printing"
                  onClick={handleCancelEditing}
                >
                  {translate("Cancel")}
                </button>
                </div>
              ) : (
                <></>
              )}

              {!showEditGrammar && (
                <button
                  className="hide-for-printing"
                  onClick={() => {
                    printGrammar();
                  }}
                >
                  {translate("Print")}
                </button>
              )}

              {!showEditGrammar && (

              <div>
              <h1 className="dictionary-title">{translate("{languageName} Grammar", {languageName: languageName})}</h1>

             

              <p onClick={() => openDictionary(id)} className="word-link">{translate("View {languageName} Dictionary", {languageName: languageName})}</p>

              </div>)}

              </div>

              <div>
                {showEditGrammar ? (
                  <div>
                    <MyEditor
                      value={grammar || ""}
                      onChange={(content) => setGrammar(content)}
                      editorContainerWidth="80%"
                      marginLeft="300px"
                    />
                  </div>
                ) : grammar ? (
                  <div>
                    <div
                    className="rendered-content"
                      style={{
                        marginLeft: "100px",
                        marginRight: "100px",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: grammar,
                      }}
                    />
                  </div>
                ) : (
                  <p>{translate("Begin adding {languageName}'s grammar!", {languageName: languageName})}</p>
                )}
              </div>
            </div>
          )}
        </>
      
    </div>
  );
};

export default Grammar;
