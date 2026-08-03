import { useState } from "react";
import { useTranslate } from "../Functions/TranslateUI";
import { IPAkeyboard } from "./IPAkeyboard";

export default function SpellingCreator({ spellings, setSpellings }) {
  
  const { translate } = useTranslate();

  // spellings is an object like { "ʃ": "sh", "aː": "â" }

  const addSpelling = () => {
    // Add a new blank entry
    const newKey = "";
    setSpellings({ ...spellings, [newKey]: "" });
  };

  const updateSpelling = (oldKey, newKey, newValue) => {
    const updated = { ...spellings };

    // Remove old key if it changed
    if (oldKey !== newKey) delete updated[oldKey];

    // Assign new key and value
    updated[newKey] = newValue;


    setSpellings(updated);
  };

  const removeSpelling = (key) => {
    const updated = { ...spellings };
    delete updated[key];
    setSpellings(updated);
  };

  const entries = Object.entries(spellings);

  return (
    <div >
      <button onClick={addSpelling}>{translate("Add Spelling")}</button>

      <div style={{ marginTop: "1rem", maxHeight: "300px", overflow:"scroll" }}>
        {entries.map(([ipa, spelling], index) => (
          <div
            key={index}
            style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}
          >
            <input
              placeholder="IPA"
              value={ipa}
              onChange={(e) =>
                updateSpelling(ipa, e.target.value, spelling)
              }
            />
            <input
              placeholder="Spelling"
              value={spelling}
              onChange={(e) =>
                updateSpelling(ipa, ipa, e.target.value)
              }
            />
            <button onClick={() => removeSpelling(ipa)}>×</button>
             
          </div>
         
        ))}
      </div>
    </div>
  );
}
