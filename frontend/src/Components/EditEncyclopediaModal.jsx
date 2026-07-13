import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import MyEditor from "../vendor/ckEditor-build/App.jsx";
import { useTranslate } from "../Functions/TranslateUI";


const EditEncyclopediaModal = ({
  show,
  setShow,
  name,
  id,
  triggerRefresh,
  onSuccess,
}) => {
  console.log(id)
    const { translate } = useTranslate();
  
  const [encyclopediaName, setEncyclopediaName] = useState(name);
  const [showWarning, setShowWarning] = useState(false);
  
  const [topics, setTopics] = useState([]);
  const [encyclopedia, setEncyclopedia] = useState();
  const [preexistingGroups, setPreexistingGroups] = useState([]);
  const [groupsToBeRemoved, setGroupsToBeRemoved] = useState([]);
  const [privacy, setPrivacy] = useState();
  const [permission, setPermission] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [owner, setOwner] = useState();
  const [userSearch, setUserSearch] = useState();
  const [userSearchError, setUserSearchError] = useState(false);
  const [noMatchingUsername, setNoMatchingUsername] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [addedTagGroups, setAddedTagGroups] = useState([]);

  useEffect(() => {
    setCurrentUser(localStorage.getItem("userId"));
  }, []);



  useEffect(() => {
    const getEncyclopedia = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getEncyclopedia`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      const data = await response.json();
      console.log(data)
      setEncyclopedia(data[0]);
      setOwner(data[0].user_id);
      setPrivacy(data[0].privacy);
      setPermission(data[0].permission);
      setCollaborators(data[0].collaborators);
      setEncyclopediaName(data[0].encyclopedia_name);
    };
    getEncyclopedia();
  }, [id]);



  const getTopics = async () => {
    const encyclopediaId = id;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getTopics`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ encyclopediaId }),
      }
    );
    const data = await response.json();
    setTopics(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    getTopics();
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
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/editEncyclopedia`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            encyclopediaName,
            privacy,
            permission,
            collaborators,
            addedTagGroups,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(`Error ${response.status}: ${data.message}`);
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

  

  const handleShowForms = (showForm, setShowForm) => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const handleTopicName = (e, setTopicName) => {
    setTopicName(e.target.value);
  };

  const addTopic = (topicName, setTopicName, type) => {
    if (topicName) {
      const topic = {
        name: topicName,
        type: type,
      };

      setTopics((prev) => [...prev, topic]);
      setTopicName("");
    }
  };

  const removeTopic = (indexToRemove) => {
    setTopics((prevForms) =>
      prevForms.filter((_, i) => i !== indexToRemove)
    );
  };

  const removeCollaborator = (indexToRemove) => {
    setCollaborators((prevForms) =>
      prevForms.filter((_, i) => i !== indexToRemove)
    );
  };

 
  const handlePrivacychange = (value) => {
    setPrivacy(value);
  };

  const handlePermissionChange = (value) => {
    setPermission(value);
  };

  const handleUserSearch = async (username) => {
    if (!username) {
      setUserSearchError(true);
      return;
    }

    if (userSearchError) {
      setUserSearchError(false);
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }
    );
    const data = await response.json();

    if (!data.username) {
      setNoMatchingUsername(true);
    }

    if (noMatchingUsername) {
      setNoMatchingUsername(false);
      return;
    }

    if (data.username) {
      setCollaborators((prev) => [...prev, data]);
    }
  };

  const deleteEncyclopedia = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/deleteEncyclopedia`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
        }),
      }
    );

    if (response.status !== 200) {
      console.error(`Error ${response.status}`);
    }

    if (response.ok) {
      if (typeof triggerRefresh === "function") {
        triggerRefresh();
      }
      close();
      showDeleteToast("Encyclopedia deleted ✅");
    }
  };

  const addTagGroup = () => {
    if (tagGroupName) {
      const tag = {
        name: tagGroupName,
        tags: tags,
      };
      setAddedTagGroups((prev) => [...prev, tag]);
      setTagGroupName("");
      setTagGroup([]);
      setTags([]);
    }
  };

  const addTag = (setTags) => {
    setTags((prev) => [...prev, ""]);
  };

  const handleTagChange = (index, value, tags, setTags) => {
    const updated = [...tags];
    updated[index] = value;
    setTags(updated);
  };

  const removeTag = (setTag, indexToRemove) => {
    setTag((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const removeTagGroup = (indexToRemove) => {
    setAddedTagGroups((prevForms) =>
      prevForms.filter((_, i) => i !== indexToRemove)
    );
  };

  return (
    <Modal show={show} onHide={close} backdrop={true}>
      <Modal.Header closeButton>
        <Modal.Title>{translate("Edit {encyclopediaName}", {encyclopediaName})}</Modal.Title>
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

export default EditEncyclopediaModal;
