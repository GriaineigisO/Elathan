import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback, useRef } from "react";

import MyEditor from "../vendor/ckEditor-build/App.jsx";

const EditTextModal = ({ languageId, textId, show, setShow, onSuccess }) => {
  const [showTextWarning, setShowTextWarning] = useState(false);
  const [showTranslationWarning, setShowTranslationWarning] = useState(false);
  const [text, setText] = useState();
  const [translation, setTranslation] = useState();
  const [title, setTitle] = useState();

   const getText = async () => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getText`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            textId,
            languageId,
            title,
            text,
            translation
          }),
        }
      );

      const data = await response.json();
      setText(data.text);
      setTranslation(data.translation)
      setTitle(data.title);
  }

  useEffect(() => {
    getText();
  }, [textId])

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
    if (!text) {
      setShowTextWarning(true);
      return;
    }

    if (!translation) {
      setShowTranslationWarning(true);
      return;
    }

    try {

     const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/editText`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            textId,
            languageId,
            title,
            text,
            translation
          }),
        }
      );

      const data = await response.json();


      if (!response.ok) {
        console.error(`Error ${response.status}: ${data.message}`);
      }

      if (response.ok) {
        showToast("New text Added ✅");
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

 

  return (
    <Modal
      show={show}
      size="lg"
      onHide={close}
      backdrop={true}
      dialogclassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Text</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-modal">
          <div>

        <div className="thin-white-border">
          <input
          value={title}
          placeholder="Add Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

            <div className="thin-white-border">
              <p>Add the text in the language here. If any words in the text do not appear as their dictionary form, e.g they are inflected, then suffix the word with "=" followed by the dicitonary form; e.g iabhís=abhís. This will allow the inflected word to correctly matched with the word as it appears in the dicitonary. If you wish to add a translation of the inflected word as it appears in the text, further suffix the word with "~" after which you can provide the English translation. Be sure to include a "-" between each English word instead of a space.</p>
              <MyEditor
                value={text || ""}
                onChange={(content) => setText(content)}
              />
            </div>

            <div className="thin-white-border">
              <p>Add the translation here.</p>
              <MyEditor
                value={translation || ""}
                onChange={(content) => setTranslation(content)}
              />
            </div>
          </div>

          {showTextWarning && (
            <p className="warning">Please add text before saving</p>
          )}

          {showTranslationWarning && (
            <p className="warning">Please add a translation before saving</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-footer-buttons">
          <div className="non-delete-buttons">
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button variant="primary" onClick={save}>
              Save Text
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTextModal;
