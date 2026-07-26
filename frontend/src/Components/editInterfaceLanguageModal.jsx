import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback, useRef } from "react";
import translationList from "../assets/translationObj.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import { getInterfaceLanguage, editInterfaceLanguage, deleteInterfaceLanguage} from "../services/languageService.js";


const EditInterfaceLanguageModal = ({
  show,
  setShow,
  id,
  onSuccess,
  triggerRefresh,
}) => {
  const [languageName, setLanguageName] = useState();
    const { translate } = useTranslate();

  const [showWarning, setShowWarning] = useState(false);
  const [translations, setTranslations] = useState([]);

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

  const getInterfaceLanguage = async () => {
    try {

      const data = await window.electron.getInterfaceLanguage(id);

      setLanguageName(data[0].language_name);
      

      // Normalize the backend translations for fast lookup
      const translationMap = {};
      data[0].translations.forEach((t) => {
        translationMap[t.phrase.toLowerCase()] = t.translation;
      });

      // Merge into translationList
      const mergedList = translationList.map((item) => ({
        ...item,
        translation: translationMap[item.phrase.toLowerCase()] || "", // fallback empty string if no translation
      }));

      setTranslations(mergedList);

    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    if (id) {
      setLanguageName("");
      setTranslations([]);
      getInterfaceLanguage();
    }
  }, [id]);

  const save = async () => {
    try {

      console.log(languageName)
      const data = await window.electron.editInterfaceLanguage(id, languageName, translations);

      if (data.success) {
        showToast(translate("Interface Language Edited"));
        if (typeof triggerRefresh === "function") {
          close();
          triggerRefresh();
        }
        if (onSuccess) onSuccess(); // trigger parent's refresh
        
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  const close = () => {
    setShow(false);
  };

  const delLang = async() => {
    const data = await window.electron.deleteInterfaceLanguage(id);

    if (data.success) {
      showToast(translate(`Interface Language ${languageName} Deleted`));
        if (typeof triggerRefresh === "function") {
          close();
          triggerRefresh();
        }
        if (onSuccess) onSuccess(); // trigger parent's refresh
    }
  }

  return (
    <Modal
      show={show}
      onHide={close}
      backdrop={true}
      dialogclassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>{translate("Edit {languageName}", {languageName})}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-modal">
          <div>
            <input
              type="text"
              className="thin-white-border"
              placeholder={translate("Language Name")}
              value={languageName}
              style={{ padding: "5px" }}
              onChange={(e) => setLanguageName(e.target.value)}
            ></input>
            {showWarning && !languageName ? (
              <p className="warning">{translate("Please enter the language's name!")}</p>
            ) : (
              <></>
            )}

            <div className=" translation-list" style={{marginTop:"10px"}}>
            {translations &&
              translations.map((phrase, index) => (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "column" }}
                  className="thin-white-border"
                >
                  <span style={{ marginRight: "10px" }}>"{translate(phrase.phrase)}"</span>
                  <input
                    type="text"
                    className="thin-white-border"
                    placeholder={translate("Enter translation here")}
                    value={phrase.translation}
                    style={{ padding: "5px" }}
                    onChange={(e) => {
                      const newTranslations = [...translations];
                      newTranslations[index] = {
                        ...newTranslations[index],
                        translation: e.target.value,
                      };
                      setTranslations(newTranslations);
                    }}
                  ></input>
                </div>
              ))}</div>
          </div>
        </div>
        <button className="delete-button" onClick={delLang}>
          Delete <i>{languageName}</i>
        </button>
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

export default EditInterfaceLanguageModal;
