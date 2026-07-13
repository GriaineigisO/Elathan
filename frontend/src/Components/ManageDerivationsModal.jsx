import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslate } from "../Functions/TranslateUI";

//const derivationsDesponse = await fetch("/affixDerivations.json");
//const derivations = await derivationsDesponse.json();

import PaginatedDerivations from "./PaginatedDerivations.jsx";

const ManageDerivationsModal = ({ show, setShow, chosenAffixes, setChosenAffixes, index, chosenDerivations, setChosenDerivations, useOnlySelectedDerivations, setUseOnlySelectedDerivations }) => {
  if (!chosenAffixes[index]) return;
  const { translate } = useTranslate();
  const [derivations, setDerivations] = useState([]);

   useEffect(() => {
      async function loadDerivations() {
        const response = await fetch("/affixDerivations.json");
        const json = await response.json();
        setDerivations(json);
      }
  
      loadDerivations();
    }, []);

   const toggleUseOnlySelectedDerivations = () => {
  setChosenAffixes((prev) => ({
    ...prev,
    [index]: {
      ...prev[index],
      useOnlySelectedDerivations: !prev[index].useOnlySelectedDerivations,
    },
  }));
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

  const allPossibleDerivations = [];

  if (chosenAffixes[index]) {
    derivations.forEach((derivation) => {
      if (chosenAffixes[index].affixName === derivation.affix) {
        allPossibleDerivations.push(derivation);
      }
    });
  }

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
        <Modal.Title>{translate("Manage Derivations")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-modal">
          <h5 style={{ fontStyle: "italic" }}>
            {chosenAffixes[index].affixDescription}
          </h5>
          <input
            type="checkbox"
            style={{ marginRight: "5px" }}
            checked={chosenAffixes[index].useOnlySelectedDerivations}
            onChange={toggleUseOnlySelectedDerivations}
          />
          <span style={{ marginRight: "5px" }}>
            {translate(
              "Use only selected derivations, uncheck to allow non-selected options to be randomly selected"
            )}
          </span>
          <PaginatedDerivations derivations={allPossibleDerivations} chosenDerivations={chosenDerivations} setChosenDerivations={setChosenDerivations} />
        </div>
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

export default ManageDerivationsModal;
