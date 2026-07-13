import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const StatModal = ({ show, setShow, tagGroups, visibleWords }) => {
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
        <Modal.Title>Dictionary Statistics</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {tagGroups.length > 0 ? (
          tagGroups.map((group) => (
            <div style={{ marginBottom: "10px" }} className="thin-white-border">
              <h4>{group.name}</h4>

              <table
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <tbody>
                  {group.tags.map((groupTag) => (
                    <tr key={groupTag}>
                      <td style={{ textAlign: "left" }}>
                        {groupTag}:<span> </span>{" "}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {
                          visibleWords.filter((word) =>
                            word.tags.some((t) => t.tag === groupTag)
                          ).length
                        }{" "}
                        /{" "}
                        {(
                          (visibleWords.filter((word) =>
                            word.tags.some((t) => t.tag === groupTag)
                          ).length *
                            100) /
                          visibleWords.length
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <></>
        )}
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

export default StatModal;
