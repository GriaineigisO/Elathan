import { useState } from "react";
import { useTranslate } from "../Functions/TranslateUI";
import handleSelection from "../Functions/handleSelection";

function PaginatedDerivations({ derivations, chosenDerivations, setChosenDerivations }) {
  const { translate } = useTranslate();
  const [page, setPage] = useState(1);

  const pageSize = 12;
  const totalPages = Math.ceil(derivations.length / pageSize);
  const start = (page - 1) * pageSize;
  const pageItems = derivations.slice(start, start + pageSize);


  return (
    <>
      {pageItems.map((derivation, index) => (
        <div key={index}  style={{
            backgroundColor: "#7B7F32",
            marginBottom: "5px",
            padding: "5px",
          }}>
          <input
            type="checkbox"
             style={{ marginRight: "5px" }}
            checked={chosenDerivations && chosenDerivations.includes(derivation)}
            onChange={() => handleSelection(derivation, setChosenDerivations)}
          />
          <span style={{ marginRight: "5px" }}>
            {typeof derivation.originalMeanings === "string"
              ? derivation.originalMeanings
              : derivation.originalMeanings.join(", ")}
          </span>
          <span style={{ marginRight: "5px" }}>→</span>
          <span>
            {typeof derivation.derivedMeanings === "string"
              ? derivation.derivedMeanings
              : derivation.derivedMeanings.join(", ")}
          </span>
        </div>
      ))}

      <div
        style={{
          marginTop: "0.75rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 1rem" }}>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
        </div>
    
    </>
  );
}

export default PaginatedDerivations;