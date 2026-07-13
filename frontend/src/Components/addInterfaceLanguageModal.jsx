import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback, useRef } from "react";
import translationList from "../assets/translationObj.jsx";
import { useTranslate } from "../Functions/TranslateUI";

const AddInterfaceLanguageModal = ({
  show,
  setShow,
  triggerRefresh,
  onSuccess,
}) => {
  const [languageName, setLanguageName] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const [translations, setTranslations] = useState({});
    const { translate } = useTranslate();
  

  const idRef = useRef(Date.now());

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
    if (!languageName) {
      setShowWarning(true);
      return;
    }

    try {
      const merged = translationList.map((p, i) => ({
        ...p,
        translation: translations[i] || "",
      }));

      const userId = localStorage.getItem("userId");
      const username = localStorage.getItem("username");
      const id = idRef.current;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/addInterfaceLanguage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            id,
            languageName,
            translations: merged,
            username: username
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(`Error ${response.status}: ${data.message}`);
      }

      if (response.ok) {
        showToast(translate("New Interface Language Added"));
        if (onSuccess) onSuccess(); // trigger parent's refresh
        close();
      }

      //reset values
      setLanguageName();
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  const close = () => {
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={close}
      backdrop={true}
      dialogclassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>{translate("Add New Interface Language")}</Modal.Title>
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

            <div className="translation-list">
            {translationList.map((phrase, index) => (
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
                  value={translations[index]}
                  style={{ padding: "5px" }}
                  onChange={(e) =>
                    setTranslations({
                      ...translations,
                      [index]: e.target.value,
                    })
                  }
                ></input>
              </div>
            ))}</div>
          </div>
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

export default AddInterfaceLanguageModal;
