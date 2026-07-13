import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useTranslate } from "../Functions/TranslateUI";
import LanguageSelector from "./languageSelector";

const ParentLanguageModal = ({
  show,
  setShow,
  selectedParentLanguage,
  setSelectedParentLanguage,
}) => {
  const { translate } = useTranslate();


  const close = () => {
    setShow(false);
  };

  const save = () => {

    setShow(false);
  };

  const handleParentLanguageSelect = (language) => {
    setSelectedParentLanguage(language);
    localStorage.setItem("parentCache", JSON.stringify(language));
  
  };

  const removeSelectedParentLanguage = () => {
    setSelectedParentLanguage(null);
  };
  return (
    <Modal show={show} onHide={close} backdrop={true}>
      <Modal.Header closeButton>
        <Modal.Title>{translate("Select Parent Language")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-modal">
          {!selectedParentLanguage ? (
            <>
            <div
              style={{
                marginTop: "10px",
              }}
              className="thin-white-border"
            >
              <span style={{ marginRight: "5px", fontWeight: "600" }}>
                {translate("Select one of your own languages")}
              </span>
              <LanguageSelector onLanguageSelect={handleParentLanguageSelect} />
            </div>
            <div
              style={{
                marginTop: "10px",
              }}
              className="thin-white-border"
            >
              <span style={{ marginRight: "5px", fontWeight: "600" }}>
                {translate("Select a public language")}
              </span>
              <LanguageSelector selectPublicLanguages={true} onLanguageSelect={handleParentLanguageSelect} />
            </div></>
          ) : (
            <div>
              <span>
                {translate("Selcted Parent Language")}:{" "}
                {selectedParentLanguage.language_name}
              </span>
              <button
                className="btn-close btn-close-white small-x-button"
                aria-label="Close"
                onClick={removeSelectedParentLanguage}
              ></button>
            </div>
          )}
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

export default ParentLanguageModal;
