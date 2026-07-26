import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import MyEditor from "../vendor/ckEditor-build/App.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import {
  deleteEncyclopedia,
  getEncyclopedia,
  editEncyclopedia
} from "../services/encyclopediaService.js";

const EditEncyclopediaModal = ({
  show,
  setShow,
  name,
  id,
  triggerRefresh,
  onSuccess,
}) => {
  const { translate } = useTranslate();
  const [encyclopediaName, setEncyclopediaName] = useState(name);
  const [showWarning, setShowWarning] = useState(false);
  const [encyclopedia, setEncyclopedia] = useState();
  const [preexistingGroups, setPreexistingGroups] = useState([]);
  const [groupsToBeRemoved, setGroupsToBeRemoved] = useState([]);
  const [showTopics, setShowTopics] = useState(false);
  const [topicNamePlural, setTopicNamePlural] = useState("");

  const [topics, setTopics] = useState([]);

  const [topicName, setTopicName] = useState("");

  useEffect(() => {
    const getEncyclopedia = async () => {
      const data = await window.electron.getEncyclopedia(id);
      console.log(data)
      setEncyclopedia(data);
      setEncyclopediaName(data.encyclopedia_name);
      setTopics(data.topics)
    };
    getEncyclopedia();
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
      <div className="d-flex">
        <div className="toast-body">
          ${message}
        </div>
        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
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

  const save = async () => {
    if (!encyclopediaName) {
      setShowWarning(true);
      return;
    }

    try {
      const data = await window.electron.editEncyclopedia(id, encyclopediaName, topics)

      if (!data.success) {
        console.error(`Error editing encyclopedia`);
      } else {
        if (typeof onSuccess === "function") {
          await onSuccess();
        }

        if (typeof triggerRefresh === "function") {
          triggerRefresh();
        }
        close();

        showToast("Changes saved ✅");
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  const close = () => {
    setShow(false);
  };

  const handleTopicName = (e, setTopicName) => {
    setTopicName(e.target.value);
  };

    const addTopic = (setTopics, topicName, topicNamePlural) => {
    if (topicName) {
      const topic = {
        name: topicName,
        name_plural: topicNamePlural,
      };

      setTopics((prev) => [...prev, topic]);
    }
  };

  const removeTopic = (setTopics, indexToRemove) => {
    setTopics((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const delEncyclopedia = async () => {
    const data = await window.electron.deleteEncyclopedia(id);

    if (data.success) {
      showDeleteToast("Encyclopedia deleted ✅");
      if (onSuccess) onSuccess();
      close();
    }
  };

  return (
    <Modal show={show} onHide={close} backdrop={true}>
      <Modal.Header closeButton>
        <Modal.Title>
          {translate("Edit {encyclopediaName}", { encyclopediaName })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-modal">
          <div>
            <input
              type="text"
              className="thin-white-border"
              placeholder={translate("Encyclopedia Name")}
              value={encyclopediaName}
              style={{ padding: "5px" }}
              onChange={(e) => setEncyclopediaName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  save();
                }
              }}
            ></input>
            {showWarning && !encyclopediaName ? (
              <p className="warning">
                {translate("Please enter the encyclopedia's name!")}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="thin-white-border">
          <p>
            <b>{translate("Entry Topics")}</b>
          </p>
          <p>
            <i>
              {translate(
                "A entry can be assigned a 'topic' i.e 'person', 'place', 'language'. Topics can be used to keep track of how many of each type of entry you have.",
              )}
            </i>
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="text"
                placeholder={translate("Topic name e.g 'person'")}
                value={topicName}
                onChange={(e) => handleTopicName(e, setTopicName)}
              />

              <input
                type="text"
                placeholder={translate("Plural topic name e.g 'people'")}
                value={topicNamePlural}
                onChange={(e) => handleTopicName(e, setTopicNamePlural)}
              />
            </div>
            <div className="button-container">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <button
                    onClick={() =>
                      addTopic(setTopics, topicName, topicNamePlural)
                    }
                  >
                    {translate("Add Topic")}
                  </button>
                </div>
              </div>
            </div>

            {topics.length > 0 ? (
              <div className="thin-white-border">
                <p>{translate("Added Entry Topics")}</p>

                <div className="word-form-container">
                  {topics.map((topic, index) => (
                    <div className="word-form-list" key={index}>
                      <b>{topic.name}</b>/<b>{topic.name_plural}</b>{" "}
                      <button
                        onClick={() => removeTopic(setTopics, index)}
                        className="btn-close btn-close-white extra-small-x-button"
                      ></button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <button className="delete-button" onClick={delEncyclopedia}>
          Delete <i>{encyclopediaName}</i>
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

export default EditEncyclopediaModal;
