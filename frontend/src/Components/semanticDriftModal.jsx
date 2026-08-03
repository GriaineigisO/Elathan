import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useTranslate } from "../Functions/TranslateUI";
import supabase from "../Components/supabaseClient.jsx";
import semanticDrifts from "../assets/semanticDrifts.jsx";
import meaningKeys from "../assets/meaningKeys.jsx";
import React from "react";
import capitaliseFirstLetter from "../Functions/capitaliseFirstLetter.jsx";
import { matchPath } from "react-router-dom";

const SemanticDriftModal = ({
  show,
  setShow,
  meaningStrings,
  setMeaningStrings,
  setShownParts,
}) => {
  const { translate } = useTranslate();
  const [showWordWarning, setShowWordWarning] = useState(false);
  const [newNounMeanings, setNewNounMeanings] = useState([]);
  const [newVerbMeanings, setNewVerbMeanings] = useState([]);
  const [newAdjMeanings, setNewAdjMeanings] = useState([]);
  const [newAdvMeanings, setNewAdvMeanings] = useState([]);
  const [newAdpMeanings, setNewAdpMeanings] = useState([]);
  const [newConjMeanings, setNewConjMeanings] = useState([]);
  const [newPartMeanings, setNewPartMeanings] = useState([]);
  const [newPronMeanings, setNewPronMeanings] = useState([]);
  const [newInterjMeanings, setNewInterjMeanings] = useState([]);
  const [newCliticMeanings, setNewCliticMeanings] = useState([]);
  const [newAffixMeanings, setNewAffixMeanings] = useState([]);
  const [newNumMeanings, setNewNumMeanings] = useState([]);
  const [noMatch, setNoMatch] = useState(false);
  const [validPartsOfSpeech, setValidPartsOfSpeech] = useState([]);

  const [chosenMeanings, setChosenMeanings] = useState({
    n: [],
    v: [],
    adj: [],
    adv: [],
    adp: [],
    conj: [],
    interj: [],
    pron: [],
    part: [],
    affix: [],
    clitic: [],
    num: [],
  });

  function assignMeanings(abbr, set) {
    switch (abbr) {
      case "n":
        return set ? setNewNounMeanings : newNounMeanings;
      case "v":
        return set ? setNewVerbMeanings : newVerbMeanings;
      case "adj":
        return set ? setNewAdjMeanings : newAdjMeanings;
      case "adv":
        return set ? setNewAdvMeanings : newAdvMeanings;
      case "adp":
        return set ? setNewAdpMeanings : newAdpMeanings;
      case "conj":
        return set ? setNewConjMeanings : newConjMeanings;
      case "interj":
        return set ? setNewInterjMeanings : newInterjMeanings;
      case "pron":
        return set ? setNewPronMeanings : newPronMeanings;
      case "part":
        return set ? setNewPartMeanings : newPartMeanings;
      case "affix":
        return set ? setNewAffixMeanings : newAffixMeanings;
      case "clitic":
        return set ? setNewCliticMeanings : newCliticMeanings;
      case "num":
        return set ? setNewNumMeanings : newNumMeanings;
    }
  }

  const meaningKeysExpanded = meaningKeys.map((key) => ({
    ...key,
    newMeanings: assignMeanings(key.abbr),
    setNewMeanings: assignMeanings(key.abbr, "set"),
  }));

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

  function logValidPartsOfSpeech(POS) {
    
    if (!validPartsOfSpeech.includes(POS)) {
    setValidPartsOfSpeech((prev) => [...prev, POS])
    }
  }

  useEffect(() => {
    if (!show) return;

    let drifts = [];
    meaningKeysExpanded.forEach((key) => {
      if (meaningStrings[key.type]) {
        const wordArr = meaningStrings[key.type]
          .split(",")
          .map((s) => s.trim());

        const match = semanticDrifts.find((drift) => {
          const value = drift[key.meaning];

          return wordArr.includes(value);
        });

        if (match && match.shifted_meanings) {
          key.setNewMeanings(match.shifted_meanings);

          match.shifted_meanings.forEach((m) => {


            meaningKeys.forEach((meaningK) => {
              if (
                m[meaningK.meaning] &&
                !drifts.some((d) => d[meaningK.meaning] === m[meaningK.meaning])
              ) {
                drifts.push(m);
               logValidPartsOfSpeech(meaningK.meaning)
                
              }
            });
          });
        } else {
          setNoMatch(true);
        }
      }
    });

    meaningKeysExpanded.forEach((key) => {
      const keyMeaning = key.meaning;

      drifts.forEach((drift) => {
        if (!key.newMeanings.some((m) => m[keyMeaning] === drift[keyMeaning])) {
          key.setNewMeanings((prev) => [...prev, drift]);
        }
      });
    });
  }, [show]);



  const save = () => {
    const updatedMeaningStrings = { ...meaningStrings };

    meaningKeys.forEach((key) => {
      if (chosenMeanings[key.abbr].length > 0) {
        updatedMeaningStrings[key.type] = updatedMeaningStrings[key.type]
          ? `${updatedMeaningStrings[key.type]}, ${chosenMeanings[key.abbr].join(", ")}`
          : chosenMeanings[key.abbr].join(", ");
      }
    });

    setMeaningStrings(updatedMeaningStrings);

    setShownParts((prev) => {
      const updated = { ...prev };

      meaningKeys.forEach((key) => {
        if (updatedMeaningStrings[key.type]) {
          updated[key.abbr] = true;
        }
      });

      return updated;
    });

    close();
  };
  const close = () => {
    setShow(false);
  };

  function addNewMeaning(meaning, abbr) {
    setChosenMeanings((prev) => ({
      ...prev,
      [abbr]: [...prev[abbr], meaning],
    }));
  }

  function removeMeaning(meaning, abbr) {
    setChosenMeanings((prev) => ({
      ...prev,
      [abbr]: prev[abbr].filter((m) => m !== meaning),
    }));
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
        <Modal.Title>{translate("Semantic Drift")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {noMatch && (
          <h2>
            {translate("There are no semantic shifts listed for this word")}
          </h2>
        )}

        <div className="thin-white-border">
          {meaningKeysExpanded.map((key, index) => (
            <>
              <React.Fragment key={index}>
                {key.newMeanings.length > 0 && validPartsOfSpeech.includes(key.meaning) && (
                  <>
                    <p>
                      {translate(
                        `Choose New ${capitaliseFirstLetter(key.type)} Meanings`,
                      )}
                    </p>

                    <div
                      className="semantic-drift-section"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <div className="thin-white-border">
                        <div className="semantic-drift-box">
                          {key.newMeanings.map((meaning, index) => (
                            <React.Fragment key={index}>
                              {meaning[key.meaning] && (
                                <>
                                  <span
                                    className="semantic-drift-span"
                                    onClick={() =>
                                      addNewMeaning(
                                        meaning[key.meaning],
                                        key.abbr,
                                      )
                                    }
                                  >
                                    {meaning[key.meaning]}
                                  </span>
                                  <hr
                                    style={{
                                      marginTop: "0px",
                                      marginBottom: "2px",
                                    }}
                                  />
                                </>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                      <div className="thin-white-border">
                        <p>
                          {translate(
                            `Chosen New ${capitaliseFirstLetter(key.type)} Meanings`,
                          )}
                        </p>
                        <div>
                          {" "}
                          <div
                            className="chosen-semantic-list"
                            style={{ display: "flex", alignContent: "center" }}
                          >
                            {chosenMeanings[key.abbr].map((meaning, index) => (
                              <div>
                                <div key={index}>{meaning} </div>
                                <button
                                  className="btn-close btn-close-white small-x-button"
                                  aria-label="Close"
                                  onClick={() =>
                                    removeMeaning(meaning, key.abbr)
                                  }
                                ></button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>{" "}
                    </div>
                  </>
                )}
              </React.Fragment>
            </>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-footer-buttons">
          <div className="non-delete-buttons">
            <Button variant="secondary" onClick={close}>
              {translate("Cancel")}
            </Button>
            <Button variant="primary" onClick={save}>
              {translate("Apply Drifts")}
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SemanticDriftModal;
