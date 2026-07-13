import handleSelection from "../Functions/handleSelection";
import { useTranslate } from "../Functions/TranslateUI";
import meaningKeys from "../assets/meaningKeys";
import { useState } from "react";

function makeCompoundTypes(compoundTypes) {
  meaningKeys.forEach((key) => {
    const firstPartOfSpeech = key.type;
    if (firstPartOfSpeech === "affix" || firstPartOfSpeech === "clitic") return;
    meaningKeys.forEach((key2) => {
      const secondPartOfSpeech = key2.type;
      if (secondPartOfSpeech === "affix" || secondPartOfSpeech === "clitic")
        return;
      const merged = `${firstPartOfSpeech}-${secondPartOfSpeech}`;
      if (!compoundTypes.includes(merged)) compoundTypes.push(merged);
    });
  });
}

const ManageCompounds = ({
  chosenCompoundTypes,
  setChosenCompoundTypes,
  compoundChance,
  setCompoundChance,
}) => {
  const { translate } = useTranslate();
  const [warning, setWarning] = useState(false);
  const [maxWarning, setMaxWarning] = useState(false);
  const compoundTypes = [];

  makeCompoundTypes(compoundTypes);

  function handleCompoundChance(value) {
    let number = Number(value);
    setWarning(false);
    setMaxWarning(false);
    if (isNaN(number)) {
      setWarning(true);
      return;
    }

    if (number > 100) {
      setMaxWarning(true);
      number = 100
    }

    if (number < 0) {
      number = 0
    }

    setCompoundChance(number);
  }

  return (
    <>
      <div className="thin-white-border">
        <p>{translate("Decide how strongly compounding your language is.")}</p>
        <span>{translate("The chance that a given compound will occur:")}</span>
        <input
          style={{ marginLeft: "5px" }}
          type="text"
          value={compoundChance}
          onChange={(e) => handleCompoundChance(e.target.value)}
        />
        <span style={{ marginLeft: "5px" }}>%</span>
        {warning && (
          <p className="warning">
            {translate("What you entered was not a number.")}
          </p>
        )}
        {maxWarning && (
          <p className="warning">
            {translate("100 is the highest number allowed.")}
          </p>
        )}
      </div>

      <div className="thin-white-border">
        <p>
          {translate("Decide which compounds are allowed in your language.")}
        </p>
        <div>
          <button onClick={() => setChosenCompoundTypes([])}>
            {translate("Clear All")}
          </button>
          <button
            style={{ marginLeft: "5px" }}
            onClick={() =>
              setChosenCompoundTypes((prev) => {
                const set = new Set(prev);
                compoundTypes.forEach((type) => set.add(type));
                return Array.from(set);
              })
            }
          >
            {translate("Select All")}
          </button>
        </div>
        <div className="affix-list">
          {compoundTypes.map((type, index) => (
            <div className="theme-box">
              <div key={index}>
                <input
                  type="checkbox"
                  id={type}
                  checked={chosenCompoundTypes.includes(type)}
                  onChange={() => handleSelection(type, setChosenCompoundTypes)}
                />
                <label style={{ marginLeft: "10px" }} htmlFor={type}>
                  {translate(type)}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageCompounds;
