import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslate } from "../Functions/TranslateUI";

const SavePhonologyModal = ({
  show,
  setShow,
  vowels,
  consonants,
  rootSyllableStructure,
  affixSyllableStructure,
  minRootSyllables,
  maxRootSyllables,
  minAffixSyllables,
  maxAffixSyllables,
  allCategoryValues,
  allCategoryAffixValues,
  spellings
}) => {
  const { translate } = useTranslate();

  const [title, setTitle] = useState();
  const [showTitleWarning, setShowTitleWarning] = useState(false);
  const [showTitleAlreadyExistsWarning, setShowTitleAlreadyExistsWarning] =
    useState(false);
  const [noVowels, setNoVowels] = useState(false);
  const [noConsonants, setNoConsonants] = useState(false);
  const [noRootSyllableStructure, setRootSyllableStructure] = useState(false);
  const [noAffixSyllableStructure, setAffixSyllableStructure] = useState(false);
  const [noMinRootSyllables, setMinRootSyllables] = useState(false);
  const [noMaxRootSyllables, setMaxRootSyllables] = useState(false);

  const [noMinAffixSyllables, setMinAffixSyllables] = useState(false);

  const [noMaxAffixSyllables, setMaxAffixSyllables] = useState(false);


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

  useEffect(() => {
    if (vowels.length === 0) {
      setNoVowels(true);
    } else {
        setNoVowels(false);
    }
    if (consonants.length === 0) {
      setNoConsonants(true);
    } else {
        setNoConsonants(false);
    }
    if (rootSyllableStructure.length === 0) {
      setRootSyllableStructure(true);
    } else {
              setRootSyllableStructure(false);

    }
    if (affixSyllableStructure.length === 0) {
      setAffixSyllableStructure(true);
    } else {
              setAffixSyllableStructure(false);

    }

    if (minRootSyllables.length === 0) {
      setMinRootSyllables(true);
    } else {
              setMinRootSyllables(false);

    }
    if (maxRootSyllables.length === 0) {
      setMaxRootSyllables(true);
    } else {
              setMaxRootSyllables(false);

    }
    if (minAffixSyllables.length === 0) {
      setMinAffixSyllables(true);
    } else {
              setMinAffixSyllables(false);

    }
    if (maxAffixSyllables.length === 0) {
      setMaxAffixSyllables(true);
    } else {
              setMaxAffixSyllables(false);

    }
  }, [vowels, consonants, rootSyllableStructure, affixSyllableStructure, minRootSyllables, maxRootSyllables, minAffixSyllables, maxAffixSyllables]);

  const save = async () => {
    if (!title) {
      setShowTitleWarning(true);
    }

    const template = {
      vowels: vowels,
      consonants: consonants,
      rootSyllableStructure: rootSyllableStructure,
      affixSyllableStructure: affixSyllableStructure,
      minRootSyllables: minRootSyllables,
      maxRootSyllables: maxRootSyllables,
      minAffixSyllables: minAffixSyllables,
      maxAffixSyllables: maxAffixSyllables,
      allCategoryValues: allCategoryValues,
      allCategoryAffixValues: allCategoryAffixValues,
      spellings: spellings
    };
    console.log(template)

    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/savePhonology`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            title,
            template,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(`Error ${response.status}: ${data.message}`);
      }

      if (response.ok) {
        if (data.nameAlreadyExists) {
          setShowTitleAlreadyExistsWarning(true);
        } else {
          showToast(translate("Phonology saved"));
          close();
        }
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
      size="lg"
      onHide={close}
      backdrop={true}
      dialogclassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>{translate("Save Phonology")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-modal">
          <div>
            <div className="thin-white-border">
              <input
                placeholder={translate("Add Template Name")}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {showTitleWarning && !title > 0 && (
              <p className="warning">{translate("Please enter a name")}</p>
            )}
            {showTitleAlreadyExistsWarning && (
              <p className="warning">
                {translate(
                  "A template with this name already exists. Please choose another name"
                )}
              </p>
            )}

            {(noVowels ||
              noConsonants ||
              noMaxAffixSyllables ||
              noAffixSyllableStructure ||
              noMaxRootSyllables ||
              noMinAffixSyllables ||
              noRootSyllableStructure ||
              noMinRootSyllables) && 
                <div className="thin-white-border">
                    <h5>{translate("Error")}</h5>
                  {noVowels && (<p className="warning">
                    {translate("No you entered no vowels")}
                  </p>)}
                  {noConsonants && (<p className="warning">
                    {translate("No you entered no consonants")}
                  </p>)}
                  {noRootSyllableStructure && (<p className="warning">
                    {translate("No you entered no root syllable structures")}
                  </p>)}
                   {noAffixSyllableStructure && (<p className="warning">
                    {translate("No you entered no affix syllable structures")}
                  </p>)}
                  {noMinRootSyllables && (<p className="warning">
                    {translate("No you entered no minimum root syllables")}
                  </p>)}
                  {noMaxRootSyllables && (<p className="warning">
                    {translate("No you entered no maximum root syllables")}
                  </p>)}
                  {noMinAffixSyllables && (<p className="warning">
                    {translate("No you entered no minimum affix syllables")}
                  </p>)}
                  {noMaxAffixSyllables && (<p className="warning">
                    {translate("No you entered no maximum affix syllables")}
                  </p>)}
                </div>
              }
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-footer-buttons">
          <div className="non-delete-buttons">
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button variant="primary" onClick={save}>
              Save Phonology Template
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SavePhonologyModal;
