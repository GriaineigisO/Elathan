const DerivationalAffixBlock = ({ resolvedAffixes }) => {

  return (
    <div className="show-for-printing page-break">
      <h2 className="dictionary-title">Derivational Affixes</h2>
      <div className="dictionary-table">
        {resolvedAffixes.map((affix, index) => (
          <div key={index} className="dictionary-entry">
            <span className="headword">
              <b style={{ fontWeight: "bolder" }}>
                {affix.word_type === "suffix" && <span>-</span>}
                {affix.word}
                {affix.word_type === "prefix" && <span>-</span>}
              </b>
            </span>

          {affix.affix_meaning && (
            <span style={{ marginLeft: "3px" }}>
              {affix.affix_meaning.join(", ")}
            </span>
          )}

            <ul>
              {affix.resolvedDerivations.map((derivation) => (
                <li key={derivation.word_id}>
                  <span>
                    <b>
                        <i>
                            {derivation.rootWord}
                        </i>
                    </b>
                  </span>

                  <span style={{ marginLeft: "3px" }}>
                    "{derivation.rootWordMeaning}"
                  </span>

                  <span> &#62; </span>
                  <span>
                    <b>
                      <i>{derivation.word}</i>
                    </b>
                  </span>
                  <span style={{ marginLeft: "3px" }}>
                    "{derivation.meaning}"
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DerivationalAffixBlock;
