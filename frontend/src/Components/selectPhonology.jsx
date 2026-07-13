import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslate } from "../Functions/TranslateUI";
import PaginatedTable from "../Components/pagination";

const SelectPhonologyModal = ({ show, setShow, setSelected }) => {
  const { translate } = useTranslate();
  const [allPhonologies, setAllPhonologies] = useState([]);

  const [title, setTitle] = useState();

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

  const getAllPhonologies = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getAllPhonologies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      setAllPhonologies(data.data);

      if (!response.ok) {
        console.error(`Error ${response.status}: ${data.message}`);
      }

      if (response.ok) {
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    getAllPhonologies();
  }, []);

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
        <Modal.Title>{translate("Select Phonology")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-modal">
          <div>
            <PaginatedTable
              data={allPhonologies}
              setSelected={setSelected}
              close={close}
              pageSize={10}
            />
          </div>
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

export default SelectPhonologyModal;
