import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import MyEditor from "../vendor/ckEditor-build/App.jsx";
import {PopulateThesaurusList} from "../Functions/thesaurusList.jsx"
import { useTranslate } from "../Functions/TranslateUI";
import { _toPrecision } from "ckeditor5";
import { addEntry } from "../services/encyclopediaService.js";


const AddEntryModal = ({ show, setShow, encyclopediaId, onSuccess, topics }) => {
    const { translate } = useTranslate();
  const [word, setWord] = useState("");
  const [showWordWarning, setShowWordWarning] = useState(false);

  const [shownParts, setShownParts] = useState({});
  const [meaningStrings, setMeaningStrings] = useState({});

const [entryText, setEntryText] = useState("");
  const [wordCategories, setWordCategories] = useState([]);

   const [selectedTerms, setSelectedTerms] = useState({});
   const [entryTopic, setEntryTopic] = useState("");
   const [headword, setHeadWord] = useState("");


  const resetState = () => {
  setWord("");
  setShowWordWarning(false);
  setShownParts({});
  setMeaningStrings({});


};

  const togglePart = (id) => {
    //show or hide input
    setShownParts((prev) => ({ ...prev, [id]: !prev[id] }));

    //delete any inputted text if input is hidden
    setMeaningStrings((prev) => ({ ...prev, [id]: "" }));
  };

  const handleMeaningChange = (id, value) => {
    setMeaningStrings((prev) => ({ ...prev, [id]: value }));
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

  const save = async () => {
    if (!headword.length > 0) {
      setShowWordWarning(true);
      return;
    }

   const data = await window.electron.addEntry(encyclopediaId, headword, entryText, entryTopic)

    if (!data.success) {
      console.error(`Error adding entry`);
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

 
   

  return (
    <Modal
      show={show}
      onHide={close}
      size="lg"
      backdrop={true}
      dialogClassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>{translate("Add New Entry")}</Modal.Title>
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
          <select onChange={(e) => setEntryTopic(e.target.value)}>
             {topics.sort().map((topic, index) => (
                      <option key={index} value={topic.name}>
                        {topic.name}
                      </option>
                    ))}
          </select>
        </div>


<div className="thin-white-border">
  <p>{translate("Add Entry Text")}</p>
  <MyEditor value={entryText || ''} onChange={(content) => setEntryText(content)} />

  </div>
        

      
       

      
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-footer-buttons">
          <div className="non-delete-buttons">
            <Button variant="secondary" onClick={close}>
              {translate("Cancel")}
            </Button>
            <Button variant="primary" onClick={save}>
              {translate("Add Entry")}
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEntryModal;
