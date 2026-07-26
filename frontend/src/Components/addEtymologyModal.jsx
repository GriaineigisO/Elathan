import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import WordSelector from "./wordSelector";
import LanguageSelector from "./languageSelector";
import MyEditor from "../vendor/ckEditor-build/App.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import React from "react";
import { addEtymology} from "../services/etymologyService.js";
import { getLanguage, getMotherLanguage } from "../services/languageService.js";

const AddEtymologyModal = ({ show, setShow, name, id, word, onSuccess }) => {
  const { translate } = useTranslate();

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
    if (!id) return;

    const load = async () => {

      const languageData = await window.electron.getLanguage(id);
      const motherData = await window.electron.getMotherLanguage(id);

      setLanguageName(languageData[0].language_name);
      setSelectedParentLanguage(motherData[0] ?? null);
    };

    load();
  }, [id]);
  

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

    
      const data = await window.electron.addEtymology(word.word_id, selectedOption, selectedMotherLanguageWord, firstElementId, secondElementId, thirdElementId, loanWord ? loanWord.word_id : null, note);

      if (data.success) {
        showToast("Changes saved ✅");
        if (onSuccess) onSuccess(); // trigger parent's refresh
        close();
      }
    } catch (error) {
      console.error("error adding etymology:", error);
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
          {translate("Etymology For word", { word: word.word })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-modal">
          <div className="thin-white-border">
            <div className="etymology-checklist">
              {[
                {
                  id: "fromMother",
                  label: translate("From {selectedParentLanguage}", {
                    selectedParentLanguage:
                      selectedParentLanguage?.language_name,
                  }),
                },
                {
                  id: "derived",
                  label: translate("Derived Within {languageName}", {
                    languageName,
                  }),
                },
                { id: "loaned", label: translate("Loaned") },
                {
                  id: "other",
                  label: translate("Other (elaborate in the etymology note)"),
                },
              ].map((option) =>
                option.id === "fromMother" ? (
                  option.label !== "From Parent Language" ? (
                    <div key={option.id}>
                      <input
                        type="radio"
                        id={option.id}
                        name="etymology"
                        value={option.id}
                        onChange={handleOptionChange}
                        checked={selectedOption === option.id}
                      />
                      <label htmlFor={option.id}>{option.label}</label>
                    </div>
                  ) : (
                    <></>
                  )
                ) : (
                  <div key={option.id}>
                    <input
                      type="radio"
                      id={option.id}
                      name="etymology"
                      value={option.id}
                      onChange={handleOptionChange}
                      checked={selectedOption === option.id}
                    />
                    <label htmlFor={option.id}>{option.label}</label>
                  </div>
                ),
              )}
            </div>

            {selectedOption === "fromMother" ? (
              <>
                <span style={{ marginRight: "5px", fontWeight: 600 }}>
                  {selectedParentLanguage
                    ? translate("From {parentLanguage}", {
                        parentLanguage: "__LANG__",
                      })
                        .split("__LANG__")
                        .map((part, i) => (
                          <React.Fragment key={i}>
                            {part}
                            {i === 0 && (
                              <span className="languageName">
                                {selectedParentLanguage.language_name}
                              </span>
                            )}
                          </React.Fragment>
                        ))
                    : translate("Parent Language")}
                </span>

                <WordSelector
                  id={id}
                  onWordSelect={handleMotherLanguageWordSelect}
                  motherLanguageName={selectedParentLanguage.language_name}
                  motherLanguageId={selectedParentLanguage.language_id}
                  motherLanguageIsProto={selectedParentLanguage.is_proto}
                />
              </>
            ) : (
              <></>
            )}

            {selectedOption === "derived" ? (
              <>
                <span style={{ marginRight: "5px", fontWeight: "600" }}>
                  {translate("Select First Element")}
                </span>
                <WordSelector
                  id={id}
                  onWordSelect={handleFirstElement}
                  motherLanguageName={name}
                  motherLanguageId={id}
                />
                <span style={{ marginRight: "5px", fontWeight: "600" }}>
                  {translate("Select Second Element")}
                </span>
                <WordSelector
                  id={id}
                  onWordSelect={handleSecondElement}
                  motherLanguageName={name}
                  motherLanguageId={id}
                />
                <span style={{ marginRight: "5px", fontWeight: "600" }}>
                  {translate("Select Third Element")}
                </span>
                <WordSelector
                  id={id}
                  onWordSelect={handleThirdElement}
                  motherLanguageName={name}
                  motherLanguageId={id}
                />
              </>
            ) : (
              <></>
            )}

            {selectedOption === "loaned" && !loanerLanguage ? (
              <>
                <span style={{ marginRight: "5px", fontWeight: "600" }}>
                  {translate("Select Loan Origin")}
                </span>
                <LanguageSelector
                  id={id}
                  onWordSelect={handleLoanerLanguage}
                  loanerLanguage={setLoanerLanguage}
                />
              </>
            ) : (
              <></>
            )}

            {selectedOption === "loaned" && loanerLanguage ? (
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
                        {translate("Loaner Language")}
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
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            {showLoanWordWarning && (
              <p className="warning">
                {translate("Please select a loanword before saving")}
              </p>
            )}
          </div>
        </div>

        <div className="thin-white-border">
          <p>{translate("Etymology Note")}</p>
          {/* <textarea
            style={{ width: "440px" }}
            onChange={(e) => setNote(e.target.value)}
          ></textarea> */}
          <MyEditor
            value={note || ""}
            onChange={(content) => setNote(content)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-footer-buttons">
          <div className="non-delete-buttons">
            <Button variant="secondary" onClick={close}>
              {translate("Cancel")}
            </Button>
            <Button variant="primary" onClick={save}>
              {translate("Save Changes")}
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEtymologyModal;
