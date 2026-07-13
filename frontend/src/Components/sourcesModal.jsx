import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import editIcon from "../assets/pencil-square.svg";
import deleteIcon from "../assets/trash-bin.svg";

const SourcesModal = ({ show, setShow, languageId }) => {
  const close = () => {
    setShow(false);
  };
  const [sources, setSources] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const [showAddSourcesModal, setShowAddSourcesModal] = useState(false);
  const [sourceName, setSourceName] = useState();
  const [sourceLink, setSourceLink] = useState();
  const [sourceId, setSourceId] = useState();
  const [isEditing, setIsEditing] = useState(false)

  const checkPermission = async () => {
    if (languageId) {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkPermission`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: languageId, userId }),
        }
      );
      const data = await response.json();
      setCanEdit(data);
    }
  };

  useEffect(() => {
    checkPermission();
  }, [languageId]);

  const getSources = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getSources`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ languageId }),
      }
    );
    const data = await response.json();
    setSources(data[0].sources);
  };

  const handleDeleteSource = async (link) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/deleteSource`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ languageId, link }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      showToast("Source Deleted ✅");
      getSources(); // refresh sources
    }
  }

  const handleEditSource = async (source) => {
    setIsEditing(true);
    setSourceName(source.name);
    setSourceLink(source.link);
    setSourceId(source.id)
  }

  const saveEditSource = async () => {
    setIsEditing(false);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/editSource`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ languageId, sourceName, sourceLink, sourceId }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      showToast("Source Edited ✅");
      getSources(); // refresh sources
      setSourceId("");
      setSourceLink("");
      setSourceName("");
      setIsEditing(false);
    }
  }

  useEffect(() => {
    if (languageId) {
      getSources();
    }
  }, [languageId]);

  const handleSourceName = (source) => {
    setSourceName(source);
  };

  const handleSourceLink = (source) => {
    setSourceLink(source);
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

  const handleAddNewSource = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/addNewSource`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ languageId, sourceName, sourceLink }),
        }
      );
      
      if (response.ok) {
      showToast("New Source Added ✅");
      getSources(); // refresh sources
      setSourceLink("");
      setSourceName("");
    }
  }

  return (
    <Modal
      show={show}
      onHide={close}
      size="lg"
      backdrop={true}
      dialogClassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>Dictionary Sources</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        {canEdit && (
            <>
            <div>
          <div style={{display:"flex", flexDirection:"row"}}>
            <input
              placeholder="add source name"
              onChange={(e) => handleSourceName(e.target.value)}
              style={{marginRight:"20px", width: "400px"}}
              value={sourceName}
            />

            <input
              placeholder="add source link"
              onChange={(e) => handleSourceLink(e.target.value)}
              value={sourceLink}
            />

            {isEditing ? (<button style={{marginLeft:"10px"}} onClick={saveEditSource}>Save</button>) : (<button style={{marginLeft:"10px"}} onClick={handleAddNewSource}>Add New Source</button>)}
            
          </div>
        </div>

        <hr />
        </>
        )}
        

        {sources && (
        sources.length > 0 &&
          sources.map((source, index) => (
            <div style={{ display: "flex", flexDirection: "row" }} key={index}>
              <a
                className="word-link"
                href={source.link}
                target="_blank"
                style={{ width: "fit-content" }}
              >
                {source.name}
              </a>
              <div>
                {canEdit ? (
                  <>
                    <img
                      style={{ marginLeft: "10px" }}
                      src={editIcon}
                      className="edit-button"
                      onClick={() => handleEditSource(source)}
                    ></img>
                    <img
                      style={{ marginLeft: "10px" }}
                      src={deleteIcon}
                      className="delete-button-with-icon"
                      onClick={() => handleDeleteSource(source.link)}
                    ></img>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )))}

      </Modal.Body>
      <Modal.Footer>
        <div className="modal-footer-buttons">
          <div className="non-delete-buttons">
            <Button variant="secondary" onClick={close}>
              Close
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SourcesModal;
