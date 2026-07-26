import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import WordSelector from "./wordSelector";
import LanguageSelector from "./languageSelector";
import MyEditor from "../vendor/ckEditor-build/App.jsx";
import { getLanguage, getMotherLanguage } from "../services/languageService.js";


const EditEtymologyModal = ({
  show,
  setShow,
  id,
  word,
  etymology,
  onSuccess,
}) => {
  const [languageName, setLanguageName] = useState();
  const [selectedParentLanguage, setSelectedParentLanguage] = useState(null);
  const [selectedOption, setSelectedOption] = useState();
  const [selectedMotherLanguageWord, setSelectedMotherLanguageWord] =
    useState();
  const [note, setNote] = useState();
  const [firstElementId, setFirstElementId] = useState();
  const [secondElementId, setSecondElementId] = useState();
  const [thirdElementId, setThirdElementId] = useState();
  const [loanerLanguage, setLoanerLanguage] = useState();
  const [loanWord, setLoanWord] = useState();
  const [showLoanWordWarning, setShowLoanWordWarning] = useState(false);

  useEffect(() => {
    if (etymology) {
      setSelectedMotherLanguageWord(etymology.mother_word_id);
      setFirstElementId(etymology.first_element_id);
      setSecondElementId(etymology.second_element_id);
      setThirdElementId(etymology.third_element_id);
      setNote(etymology.note)
    }
  }, [etymology]);

  useEffect(() => {
    const getLanguages = async () => {

      const data = await window.electron.getLanguage(id);
      setLanguageName(data.language_name);
    };
    getLanguages();
  }, []);

  useEffect(() => {
    const getLanguages = async () => {
      if (!id) return; // no id = no request

      const data = await window.electron.getMotherLanguage(id);
      setSelectedParentLanguage(data[0]);
    };
if (id) {
      // Only fetch when modal is open AND id exists
      getLanguages();
    }
  }, [show, id]); // Depend on BOTH show and id

   useEffect(() => {
    const getLanguages = async () => {
      if (!etymology.loanword_id) return; // no id = no request
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getLoanerLanguage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: etymology.loanword_id }),
        }
      );
      const data = await response.json();
      setLoanerLanguage(data.language[0]);
      setLoanWord(data.loanword);
    };
if (etymology) {
      // Only fetch when modal is open AND id exists
      getLanguages();
    }
  }, [show, etymology]); // Depend on BOTH show and id

  useEffect(() => {
    setLanguageName(name);
  }, [name]);

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

  const save = async () => {

    if (selectedOption === "loaned" && !loanWord) {
      setShowLoanWordWarning(true); // trigger render
      return;
    }

    setShowLoanWordWarning(false); // clear warning if proceeding

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/editEtymology`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            etymologyId: etymology.etymology_id,
            word_id: word.word_id,
            etymologyType: etymology.etymology_type,
            motherWord: selectedMotherLanguageWord,
            firstElementId: firstElementId,
            secondElementId: secondElementId,
            thirdElementId: thirdElementId,
            loanWordId: loanWord ? loanWord.word_id : null,
            note: note,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showToast("Changes saved ✅");
        if (onSuccess) onSuccess(); // trigger parent's refresh
        close();
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  const close = () => {
    setShow(false);
  };

  const handleMotherLanguageWordSelect = (word) => {
    setSelectedMotherLanguageWord(word);
  };

  const handleLoanerLanguage = (word) => {
    setLoanerLanguage(word);
  };

  const handleFirstElement = (word) => {
    setFirstElementId(word.word_id);
  };

  const handleSecondElement = (word) => {
    setSecondElementId(word.word_id);
  };

  const handleThirdElement = (word) => {
    setThirdElementId(word.word_id);
  };

  const handleLoanWord = (word) => {
    setLoanWord(word);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const removeLoanerLanguage = () => {
    setLoanerLanguage(null);
  };

  return (
    <Modal
      show={show}
      onHide={close}
      backdrop={true}
      dialogclassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Etymology For{" "}
          <i>
            {word.word}:
            {etymology && etymology.etymology_type === "fromMother" && (
              <span> From {selectedParentLanguage.language_name}</span>
            )}
            {etymology && etymology.etymology_type === "derived" && <span> Derived</span>}
            {etymology && etymology.etymology_type === "loaned" && <span> Loaned</span>}
            {etymology && etymology.etymology_type === "other" && <span> Other</span>}
          </i>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {etymology && (
          <>
            {etymology.etymology_type !== "other" && (<div className="input-modal">
              
              <div className="thin-white-border">
                {etymology.etymology_type === "fromMother" ? (
                  <>
                    <span style={{ marginRight: "5px", fontWeight: "600" }}>
                      Select {selectedParentLanguage.language_name} Word
                    </span>
                    <WordSelector
                      id={id}
                      onWordSelect={handleMotherLanguageWordSelect}
                      motherLanguageName={selectedParentLanguage.language_name}
                      motherLanguageId={selectedParentLanguage.language_id}
                      motherLanguageIsProto={selectedParentLanguage.is_proto}
                      defaultTermId={etymology.mother_word_id}
                      defaultTerm={etymology.mother_word}
                    />
                  </>
                ) : (
                  <></>
                )}

                {etymology.etymology_type === "derived" ? (
                  <>
                    <span style={{ marginRight: "5px", fontWeight: "600" }}>
                      Select First Element
                    </span>
                    <WordSelector
                      id={id}
                      onWordSelect={handleFirstElement}
                      motherLanguageName={name}
                      motherLanguageId={id}
                      defaultTermId={etymology.first_element_id}
                      defaultTerm={etymology.first_element_word}
                    />
                    <span style={{ marginRight: "5px", fontWeight: "600" }}>
                      Select Second Element
                    </span>
                    <WordSelector
                      id={id}
                      onWordSelect={handleSecondElement}
                      motherLanguageName={name}
                      motherLanguageId={id}
                      defaultTermId={etymology.second_element_id}
                      defaultTerm={etymology.second_element_word}
                    />
                    <span style={{ marginRight: "5px", fontWeight: "600" }}>
                      Select Third Element
                    </span>
                    <WordSelector
                      id={id}
                      onWordSelect={handleThirdElement}
                      motherLanguageName={name}
                      motherLanguageId={id}
                      defaultTermId={etymology.third_element_id}
                      defaultTerm={etymology.third_element_word}
                    />
                  </>
                ) : (
                  <></>
                )}

                {etymology.etymology_type === "loaned" && !loanerLanguage ? (
                  <>
                    <span style={{ marginRight: "5px", fontWeight: "600" }}>
                      Select Loan Origin
                    </span>
                    <LanguageSelector
                      id={id}
                      onWordSelect={handleLoanerLanguage}
                      loanerLanguage={setLoanerLanguage}
                      defaultTerm={loanerLanguage}
                    />
                  </>
                ) : (
                  <></>
                )}

                {etymology.etymology_type === "loaned" && loanerLanguage ? (
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      alignContent: "center",
                    }}
                    className="thin-white-border"
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <span>
                          <span style={{ fontWeight: "600" }}>
                            Loaner Language
                          </span>
                          : {loanerLanguage.language_name}
                        </span>{" "}
                        <button
                          className="btn-close btn-close-white small-x-button"
                          aria-label="Close"
                          onClick={removeLoanerLanguage}
                        ></button>
                      </div>

                      <WordSelector
                        id={id}
                        onWordSelect={handleLoanWord}
                        motherLanguageName={loanerLanguage.language_name}
                        motherLanguageId={loanerLanguage.language_id}
                        defaultTerm={loanWord}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {showLoanWordWarning && (
                  <p className="warning">
                    Please select a loanword before saving
                  </p>
                )}
              </div>
            </div>
)}
            <div className="thin-white-border">
              <p>Etymology Note</p>
             <MyEditor value={note || ''} onChange={(content) => setNote(content)} />
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-footer-buttons">
          <div className="non-delete-buttons">
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button variant="primary" onClick={save}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEtymologyModal;
