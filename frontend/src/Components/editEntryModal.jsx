import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import MyEditor from "../vendor/ckEditor-build/App.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import { _toPrecision } from "ckeditor5";
import handleImageUpload from "./imageUpload.jsx";
import supabase from "../Components/supabaseClient.jsx";

const EditEntryModal = ({ show, setShow, onSuccess, id, topics }) => {
  const { translate } = useTranslate();
  const [showWordWarning, setShowWordWarning] = useState(false);
  const [entryText, setEntryText] = useState("");
  const [entryTopic, setEntryTopic] = useState("");
  const [headword, setHeadWord] = useState("");
  const [images, setImages] = useState([]);
  const [imagesWithURLS, setImagesWithURLS] = useState([]);

  const resetState = () => {
    setShowWordWarning(false);
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
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getEntry`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
        }),
      },
    );
    const data = await response.json();
    setHeadWord(data.headword);
    setEntryTopic(data.topic);
    setEntryText(data.entry_text);

    const { data: fetchedImages, error } = await supabase
      .from("encyclopedia_entry_images")
      .select("*")
      .eq("entry_id", data.entry_id)
      .order("display_order");
    setImages(fetchedImages);

    const urls = await Promise.all(
      fetchedImages.map(async (image) => {
        const { data: imageData, error: urlError } = await supabase.storage
          .from("encyclopedia_images")
          .createSignedUrl(image.storage_path, 3600);

        if (urlError) {
          return null;
        }

        return {
          ...image,
          url: imageData.signedUrl,
        };
      }),
    );

    setImagesWithURLS(urls.filter(Boolean));
  };

  useEffect(() => {
    getEntry();
  }, []);

  const save = async () => {
    if (!headword.length > 0) {
      setShowWordWarning(true);
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/editEntry`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headword,
          entryText,
          entryTopic,
          id,
        }),
      },
    );

    if (response.status !== 200) {
      console.error(`Error ${response.status}`);
    }

    if (response.ok) {
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, id)}
          />
          {imagesWithURLS.map((image) => (
            <img
              key={image.image_id}
              src={image.url}
              alt={image.caption}
              style={{ width: 150 }}
            />
          ))}
        </div>

        <div className="thin-white-border">
          <p>{translate("Add Entry Text")}</p>
          <MyEditor
            value={entryText || ""}
            onChange={(content) => setEntryText(content)}
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
              {translate("Save Entry")}
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEntryModal;
