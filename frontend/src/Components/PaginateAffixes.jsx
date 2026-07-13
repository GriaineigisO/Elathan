import { useState } from "react";
import { useTranslate } from "../Functions/TranslateUI";

function PaginateAffixes({allAffixArray, updateAffix, changeAdjectiveToStativeVerb, chosenAffixes, adjectiveNature, openManageDerivationModal}) {
  const { translate } = useTranslate();
  const [page, setPage] = useState(1);

  const pageSize = 10;
  const totalPages = Math.ceil(allAffixArray.length / pageSize);
  const start = (page - 1) * pageSize;
  const pageItems = allAffixArray.slice(start, start + pageSize);


  return (
    <>
      {pageItems.map((affix, index) => {
            return (
              <div className="affixPaginateRow" key={index} style={{display:"flex", flexDirection:"row"}}>
                <input
                  type="checkbox"
                  style={{ marginRight: "5px" }}
                  checked={!!chosenAffixes[index]}
                  onChange={() => updateAffix(index, affix)}
                />

              <div className="affixPaginateSpan">
                <span >
                  {changeAdjectiveToStativeVerb(
                    affix.affixDescription,
                    adjectiveNature
                  )}
                </span>
                </div>

                <input
                  type="text"
                  style={{ marginRight: "5px" }}
                  disabled={!chosenAffixes[index]}
                  value={chosenAffixes[index]?.affix ?? ""}
                  placeholder={translate("enter affix")}
                  onChange={(e) =>
                    updateAffix(index, affix, { affix: e.target.value })
                  }
                />

                <select
                  disabled={!chosenAffixes[index]}
                  value={chosenAffixes[index]?.type ?? "suffix"}
                  onChange={(e) =>
                    updateAffix(index, affix, { type: e.target.value })
                  }
                >
                  <option value="suffix">{translate("suffix")}</option>
                  <option value="prefix">{translate("prefix")}</option>
                </select>

                {chosenAffixes[index] && (
                  <button
                    onClick={() => openManageDerivationModal(index)}
                    className="small-button"
                  >
                    {translate("Manage Derivations")}
                  </button>
                )}
              </div>
            );
          })}

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

export default PaginateAffixes;