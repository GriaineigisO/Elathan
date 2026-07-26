import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback, useRef } from "react";
import MyEditor from "../vendor/ckEditor-build/App.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import { addEncyclopedia} from "../services/encyclopediaService.js";


const AddEncyclopediaModal = ({
  show,
  setShow,
  name,
  triggerRefresh,
  onSuccess,
}) => {
  const [encyclopediaName, setEncyclopediaName] = useState();
  const { translate } = useTranslate();
  const [showWarning, setShowWarning] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [topicNamePlural, setTopicNamePlural] = useState("");
  
  const [topics, setTopics] = useState([]);

  const [encyclopedia, setEncyclopedia] = useState();
  const [topicName, setTopicName] = useState("");

  const idRef = useRef(Date.now());

  useEffect(() => {
    setEncyclopediaName(name);
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
    if (!encyclopediaName) {
      setShowWarning(true);
      return;
    }

   

    try {
      const data = await window.electron.addEncyclopedia(Date.now(), encyclopediaName, topics)

      if (!data.success) {
        console.error(`Error adding encyclopedia`);
      }

      if (data.success) {
        showToast("Changes saved ✅");
        if (onSuccess) onSuccess(); 
        close();
      }

      //reset values
      setEncyclopediaName();
      
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  const close = () => {
    setShow(false);
  };

  
  
  const addTopic = (
   setTopics, topicName, topicNamePlural
  ) => {
    if (topicName) {
      const topic = {
        name: topicName,
        name_plural: topicNamePlural
        };
     

      setTopics((prev) => [...prev, topic]);
      
     };
    }

  
   const removeTopic = (setTopics, indexToRemove) => {
    setTopics((prev) => prev.filter((_, index) => index !== indexToRemove));


  };

  const handleTopicChange = (index, value, topics, setTopics) => {
    const updated = [...topics];
    updated[index] = value;
    setTopics(updated);
  };

   const handleTopicName = (e, setName) => {
    setName(e.target.value);
  };



  return (
    <Modal
      show={show}
      onHide={close}
      backdrop={true}
      dialogclassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>{translate("Add New Encyclopedia")}</Modal.Title>
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
              <p className="warning">{translate("Please enter the encyclopedia's name!")}</p>
            ) : (
              <></>
            )}

              <div className="thin-white-border">
              <p>
                <b>{translate("Entry Topics")}</b>
              </p>
              <p>
                <i>
                  {translate("A entry can be assigned a 'topic' i.e 'person', 'place', 'language'. Topics can be used to keep track of how many of each type of entry you have.")}
                </i>
              </p>

              <div style={{ display: "flex", flexDirection: "column" }}>
               
               
                  <div style={{display:"flex", flexDirection:"row"}}>
                    <input
                      type="text"
                      placeholder={translate("Topic name e.g 'person'")}
                      value={topicName}
                      onChange={(e) =>
                        handleTopicName(e, setTopicName)
                      }/>
                     

                       <input
                      type="text"
                      placeholder={translate("Plural topic name e.g 'people'")}
                      value={topicNamePlural}
                      onChange={(e) =>
                        handleTopicName(e, setTopicNamePlural)
                      }
                    />

</div>
                    <div className="button-container">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <button
                            onClick={() => addTopic(setTopics, topicName, topicNamePlural)}
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

export default AddEncyclopediaModal;
