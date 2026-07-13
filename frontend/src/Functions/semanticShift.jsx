import semanticDriftRules from "../assets/semanticDrifts.jsx";

let wasTrue = 0;
let wasFalse = 0;

function driftCrossPOS(oldMeanings, themes, newThemes) {


  if (themes) {

  //Now add theme-depending semantic drifts
  const pushToSemanticDriftRules = (
    themes,
    newThemes,
    chosenThemes,
    oldMeanings,
    newMeaningPOS,
    newMeanings
  ) => {
    oldMeanings.forEach((oldMeaning) => {
      chosenThemes.forEach((theme) => {
        newMeanings.forEach((newMeaning) => {
          // Check conditions explicitly so we can log properly
          const allowed =
            themes.length > 0 &&
            themes.includes(theme) &&
            !semanticDriftRules[oldMeaning].some(
              (rule) =>
                rule.pos === newMeaningPOS && rule.meaning === newMeaning
            );

          if (allowed) {
            const pushedObj = {
              pos: newMeaningPOS,
              meaning: newMeaning,
              guaranteed: newThemes.some((t) => chosenThemes.includes(t)),
            };

            
              semanticDriftRules[oldMeaning].push(pushedObj);
            
          }
        });
      });
    });
  };

  pushToSemanticDriftRules(
    themes,
    newThemes,
    ["agricultural"],
    ["thorn"],
    "noun_meaning",
    ["grain"]
  );
  pushToSemanticDriftRules(
    themes,
    newThemes,
    ["agricultural", "pastoralist"],
    ["hand"],
    "noun_meaning",
    ["domestic animal"]
  );
  pushToSemanticDriftRules(
    themes,
    newThemes,
    ["sea"],
    ["hedgehog"],
    "noun_meaning",
    ["sea-urchin"]
  );
  pushToSemanticDriftRules(
    themes,
    newThemes,
    ["literate"],
    ["letter"],
    "noun_meaning",
    ["book", "text", "literacy"]
  );
  pushToSemanticDriftRules(
    themes,
    newThemes,
    ["literate"],
    ["scratch", "carve", "etch"],
    "nounverb_meaning",
    ["write"]
  );
  pushToSemanticDriftRules(
    themes,
    newThemes,
    ["literate"],
    ["leaf"],
    "noun_meaning",
    ["page", "folio", "manuscript"]
  );

  pushToSemanticDriftRules(
    themes,
    newThemes,
    ["space-faring", "digital-age", "copper-age", "bronze-age", "iron-age"],
    ["tooth"],
    "noun_meaning",
    ["sword"]
  );
  pushToSemanticDriftRules(
    themes,
    newThemes,
    ["mountain"],
    ["top", "thorn"],
    "noun_meaning",
    ["mountain", "hill", "summit", "peak"]
  );
}

  const newMeanings = {};

  oldMeanings.forEach(({ pos, meaning }) => {
    //replace all whitespaces in the meaning with underscores
    let removeTo = meaning.replace("to ", "");

    let meaningArr = Array.from(removeTo);
    for (let i = 0; i < meaningArr.length; i++) {
      if (
        meaningArr[i] === "(" ||
        meaningArr[i] === ")" ||
        meaningArr[i] === ","
      ) {
        meaningArr[i] = "_";
      }
      if (meaningArr[i] === " " || meaningArr[i] === "-") {
        meaningArr[i] = "_";
      }
    }

    let underscoreMeaning = meaningArr.join("");

    const possibleDrifts = semanticDriftRules[underscoreMeaning] || [
      { pos, meaning },
    ];

    //if word belongs to a new theme, semantic shift is guaranteed, else the chance is random
    // Determine if drift is guaranteed
    let driftHappens;

    const anyGuaranteed = possibleDrifts.some((rule) => rule.guaranteed);

    let driftCandidates;

    if (anyGuaranteed) {
      driftHappens = true;
       driftCandidates = possibleDrifts.filter(rule => rule.guaranteed);
    } else {
      driftHappens = Math.floor(Math.random() * 4) === 0;
      driftCandidates = possibleDrifts;
    }
    

    // Pick a random drift candidate
    const chosenDrift =
      driftCandidates[Math.floor(Math.random() * driftCandidates.length)];


    // Determine final meaning
    let finalMeanings = [];

    //only try if the original meaning occurs as a key in the semanticDriftRules object
    if (semanticDriftRules[underscoreMeaning]) {
      if (driftHappens) {
        // 1 in 4 chance to coexist
        const coexist = Math.floor(Math.random() * 4) === 0;
        if (coexist) {
          // Add both old and new meaning
          finalMeanings = [meaning, chosenDrift.meaning].filter(
            (v, i, a) => a.indexOf(v) === i
          ); // unique
        } else {
          // Replace old meaning
          finalMeanings = [chosenDrift.meaning];
        }
      } else {
        // No drift → just keep old meaning
        finalMeanings = [meaning];
      }
    } else {
      finalMeanings = [meaning];
    }
    // Create container if needed
    if (!newMeanings[pos]) newMeanings[pos] = [];
    if (!newMeanings[chosenDrift.pos]) newMeanings[chosenDrift.pos] = [];

    // CASE 1: no drift
    if (!semanticDriftRules[underscoreMeaning] || !driftHappens) {
      if (!newMeanings[pos].includes(meaning)) {
        newMeanings[pos].push(meaning);
      }
      return;
    }

    // CASE 2: drift happens
    const coexist = Math.floor(Math.random() * 4) === 0;

    // Add NEW meaning to NEW POS
    if (!newMeanings[chosenDrift.pos].includes(chosenDrift.meaning)) {
      newMeanings[chosenDrift.pos].push(chosenDrift.meaning);
    }

    // Add OLD meaning to OLD POS if coexist
    if (coexist) {
      if (!newMeanings[pos].includes(meaning)) {
        newMeanings[pos].push(meaning);
      }
    }
  });

  return newMeanings;
}

function semanticDrift(word, themes, parentThemes) {
  //collect all themes that the daughter language has that weren't present in the parent language
  const newThemes = themes ? themes.filter((theme) => !parentThemes.includes(theme)) : null;

  const posKeys = [
    "noun_meaning",
    "verb_meaning",
    "adj_meaning",
    "adv_meaning",
    "adp_meaning",
    "pron_meaning",
    "part_meaning",
    "conj_meaning",
    "interj_meaning",
    "affix_meaning",
  ];

  const allOldMeanings = [];

  posKeys.forEach((pos) => {
    const vals = word[pos];
    if (!vals) return;

    const arrayVals = Array.isArray(vals) ? vals : [vals];

    arrayVals.forEach((meaning) => {
      allOldMeanings.push({ pos, meaning });
    });
  });

  const drifted = driftCrossPOS(allOldMeanings, themes, newThemes) || {};

  const newWord = {};

  posKeys.forEach((pos) => {
    const newVals = drifted[pos];
    const oldVals = word[pos];

    // If drift didn't produce anything, retain old meaning
    if (!newVals || newVals.length === 0) {
      newWord[pos] = oldVals
        ? [...(Array.isArray(oldVals) ? oldVals : [oldVals])]
        : null;
      return;
    }

    // If drifted values equal the old values, keep original POS
    if (
      oldVals &&
      JSON.stringify(newVals) ===
        JSON.stringify(Array.isArray(oldVals) ? oldVals : [oldVals])
    ) {
      newWord[pos] = [...(Array.isArray(oldVals) ? oldVals : [oldVals])];
      return;
    }

    // Otherwise, use the drifted values
    newWord[pos] = newVals;
  });

  return newWord;
}

export default semanticDrift;
