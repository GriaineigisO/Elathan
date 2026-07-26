import { Modal, Button } from "react-bootstrap";
import { deleteEtymology } from "../services/etymologyService";

const DeleteEtymologyModal = ({
  show,
  setShow,
  etymology,
  onSuccess,
}) => {

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

    try {

      const data = await window.electron.deleteEtymology(etymology.etymology_id)

      if (data.success) {
        showToast("Etymology Deleted ✅");
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
      onHide={close}
      backdrop={true}
      dialogclassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Delete Etymology
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {etymology && (
          <p>
            Are you sure that you want to delete this etymology? This action can not be undone
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-footer-buttons">
          <div className="non-delete-buttons">
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button variant="primary" onClick={save}>
              Delete Etymology
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteEtymologyModal;
