import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import MyEditor from "../vendor/ckEditor-build/App.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import { _toPrecision } from "ckeditor5";
import supabase from "../Components/supabaseClient.jsx";
import { editEntry, getEntry, deleteEntry } from "../services/encyclopediaService.js";

const EditEntryModal = ({ show, setShow, onSuccess, id, topics }) => {
  const { translate } = useTranslate();
  const [showWordWarning, setShowWordWarning] = useState(false);
  const [entryText, setEntryText] = useState("");
  const [entryTopic, setEntryTopic] = useState("");
  const [headword, setHeadWord] = useState("");

  const resetState = () => {
    setShowWordWarning(false);
  };

  const showDeleteToast = (message) => {
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

  const getEntry = async () => {
    const data = await window.electron.getEntry(id);
    setHeadWord(data.headword);
    setEntryTopic(data.topic);
    setEntryText(data.entry_text);

  };

  useEffect(() => {
    getEntry();
  }, []);

  const save = async () => {
    if (!headword.length > 0) {
      setShowWordWarning(true);
      return;
    }

   const data = await window.electron.editEntry(headword, entryText, entryTopic, id);

    if (!data.succees) {
      console.error(`Error editing entry`);
    }

    if (data.success) {
      showToast(translate("Changes saved"));
      if (onSuccess) onSuccess(); // trigger parent's refresh
      close();
      //now reset all input values
      resetState();
    }
  };

  const close = () => {
    setShow(false);
  };

  const delEntry = async () => {
    const data = await window.electron.deleteEntry(id);

    if (data.success) {
      showDeleteToast("Entry deleted ✅");
      if (onSuccess) onSuccess();
      close();
    }
  };

  return (
    <Modal
      show={show}
      onHide={close}
      size="lg"
      backdrop={true}
      dialogClassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>{translate("Edit Entry")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="thin-white-border">
          <input
            type="text"
            className="modal-input"
            placeholder={translate("headword")}
            value={headword}
            onChange={(e) => setHeadWord(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                save();
              }
            }}
          />
        </div>

        {showWordWarning && !word && (
          <p className="warning">{translate("Please enter a headword")}</p>
        )}

        <div className="thin-white-border">
          <select
            value={entryTopic}
            onChange={(e) => setEntryTopic(e.target.value)}
          >
            {topics.map((topic, index) => (
              <option key={index} value={topic.name}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>

        <div className="thin-white-border">
          <p>{translate("Add Entry Text")}</p>
          <MyEditor
            value={entryText || ""}
            onChange={(content) => setEntryText(content)}
          />
        </div>
         <button onClick={delEntry} className="delete-button">
                  {translate("Delete {headword}", { headword })}
                </button>
      </Modal.Body>
     
      <Modal.Footer>
        <div className="modal-footer-buttons">
          <div className="non-delete-buttons">
            <Button variant="secondary" onClick={close}>
              {translate("Cancel")}
            </Button>
            <Button variant="primary" onClick={save}>
              {translate("Save Entry")}
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEntryModal;
