import applyProsody from "./prosody/applyProsody";
import removeProsody from "./prosody/removeProsody";
import ipaChars from "../assets/ipaChars";

import repairSyllables from "./prosody/repairSyllables";

function applySoundChange(word, soundChanges, categoryValues, edited) {

  if (!word) return;

  if (edited) return word

  function stripProsody(str) {
    return str.replace(/[ˈˌ.]/g, "");
  }

  // --- Fix syllable boundary after metathesis ---
  function fixBoundaryAfterMetathesis(arr, startIndex) {
    // 1. Find the existing dot (if any)
    const oldDot = arr.indexOf(".");

    if (oldDot === -1) return arr;

    // 2. Remove the old syllable boundary
    arr.splice(oldDot, 1);

    // 3. Insert new boundary before the *first vowel* after the metathesis region
    let newDotPos = -1;

    for (let i = startIndex; i < arr.length; i++) {
      if (categoryValues["V"].includes(arr[i])) {
        if (ipaChars.includes(arr[i + 1])) {
          if (
            categoryValues["C"].includes(arr[i + 2]) &&
            categoryValues["V"].includes(arr[i + 3])
          ) {
            newDotPos = i + 2;
          } else {
            newDotPos = i + 3;
          }
        } else {
          newDotPos = i + 1;
        }

        break;
      }
    }

    // 4. If we found a vowel: insert dot BEFORE it
    if (newDotPos !== -1) {
      arr.splice(newDotPos, 0, ".");
    } else {
      // fallback: stick dot at end
      arr.push(".");
    }

    return arr;
  }

  function sliceIgnoringDots(arr, start, length) {
    const out = [];
    let idx = start;

    while (idx < arr.length && out.length < length) {
      if (prosodyMarks.has(arr[idx])) {
        idx++;
        continue;
      }

      let char = arr[idx];

      // Combine b + ʰ
      // if (arr[idx + 1] === "ʰ") {
      //   char += "ʰ";
      //   idx += 2;
      // }
      // // Combine syllabic consonants m̩
      // else if (arr[idx + 1] === "\u0329") {
      //   char += "\u0329";
      //   idx += 2;
      // }

      if (ipaChars.includes(arr[idx + 1])) {

        char += arr[idx + 1];
        if (ipaChars.includes(arr[idx + 2])) {
           idx += 3;
        } else {
          idx += 2;
        }
        
      }



      // Combine affricates t͡s, d͡ʒ, t͡ʃ
      else if (arr[idx + 1] === "͡" && arr[idx + 2]) {
        const cluster = char + arr[idx + 1] + arr[idx + 2];
        if (/^[td][͡][sʃʒ]/.test(cluster)) {
          char = cluster;
          idx += 3;
        } else {
          idx++;
        }
      } else {
        idx++;
      }

      out.push(char);
    }

    return out;
  }

  function tokenizePattern(pattern) {
    const tokens = [];
    let i = 0;

    while (i < pattern.length) {
      // backreference category like V1, L2, C3
      const backref = pattern.slice(i).match(/^([A-Za-z])([0-9]+)/);
      if (backref) {
        tokens.push(backref[1] + backref[2]); // "V1"
        i += backref[0].length;
        continue;
      }

      // affricate clusters (t͡s, d͡ʒ, t͡ʃ)
      if (/^[td][͡][sʃʒ]/.test(pattern.slice(i, i + 3))) {
        tokens.push(pattern.slice(i, i + 3));
        i += 3;
        continue;
      }

      // default: single char
      tokens.push(pattern[i]);
      i++;
    }

    return tokens;
  }

  const prosodyMarks = new Set(["ˈ", "ˌ", ".", "\u0301", "\u0301"]); //finish adding all accent combining diacritics
  // Remove stress + dot markers from any array slice
  //const removeMarker = (arr) => arr.filter((x) => !prosodyMarks.has(x));

  const wordArr = Array.from(word); // full, with prosody
  
  let wordArrClean = removeProsody(wordArr);
  // Build clean-index → original-index map
  let indexMap = [];

  function rebuildIndexMap() {
    const map = [];
    let cleanIndex = 0;

    for (let i = 0; i < wordArr.length; i++) {
      if (!prosodyMarks.has(wordArr[i])) {
        map[cleanIndex] = i; // clean index → original array index
        cleanIndex++;
      }
    }

    return map;
  }

  // initialize it
  indexMap = rebuildIndexMap();

  // Map "clean index" → original index
  function originalIndex(cleanIndex) {
    let c = -1;
    for (let i = 0; i < wordArr.length; i++) {
      if (!prosodyMarks.has(wordArr[i])) {
        c++;
        if (c === cleanIndex) return i;
      }
    }
    return -1;
  }

  // Add all consonants and vowels to C and V categories
  categoryValues["C"] = [
    "β",
    "ɓ",
    "ʙ",
    "ç",
    "ɕ",
    "ð",
    "d͡ʒ",
    "ɖ",
    "ɗ",
    "ɠ",
    "ɢ",
    "ʛ",
    "ɡ",
    "ħ",
    "ɦ",
    "ɥ",
    "ɧ",
    "ʜ",
    "ʝ",
    "ɟ",
    "ʄ",
    "ɫ",
    "ɭ",
    "ɬ",
    "ʟ",
    "ɮ",
    "ɱ",
    "ŋ",
    "ɲ",
    "ɳ",
    "ɴ",
    "ɸ",
    "ɾ",
    "ɹ",
    "ʁ",
    "ʀ",
    "ɻ",
    "ɽ",
    "ɺ",
    "ʃ",
    "ʂ",
    "θ",
    "t͡ʃ",
    "t͡s",
    "ʈ",
    "ʋ",
    "ⱱ",
    "ɯ",
    "ʍ",
    "ɰ",
    "χ",
    "ɣ",
    "ʎ",
    "ʒ",
    "ʐ",
    "ʑ",
    "ʔ",
    "ʕ",
    "ʡ",
    "ʢ",
    "q",
    "w",
    "r",
    "t",
    "p",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
  ];
  categoryValues["V"] = [
    "a",
    "e",
    "u",
    "i",
    "o",
    "ɑ",
    "æ",
    "ɐ",
    "ɑ̃",
    "ə",
    "ɚ",
    "ɵ",
    "ɘ",
    "ɛ",
    "ɜ",
    "ɝ",
    "ɛ̃",
    "ɞ",
    "ɪ",
    "ɨ",
    "ɪ̈",
    "ɔ",
    "œ",
    "ɒ",
    "ɔ̃",
    "ɶ",
    "ø",
    "ʊ",
    "ʉ",
    "ʌ",
    "ʋ",
    "ʏ",
    "ɤ",
    "y",
  ];

  if (!word) {
    return word;
  }

  // Helper: check if a slice matches a pattern (supports categories)
  // Pattern match that ALSO returns captures
  const matchesPattern = (slice, patternTokens) => {
    
    const captures = {}; // <-- local capture store

    if (!patternTokens) return { ok: true, captures };

    
    //const patternTokens = tokenizePattern(pattern);
    if (slice.length < patternTokens.length) return { ok: false, captures };

    for (let i = 0; i < patternTokens.length; i++) {
      const patChar = patternTokens[i];
      const char = slice[i];

      if (!char) return { ok: false, captures };

      // --- CASE 1: indexed category like V1, C2 ---
      const indexed = patChar.match(/^([A-Za-z])([0-9]+)$/);
      if (indexed) {
        const base = indexed[1]; // e.g. "V"
        const index = indexed[2]; // e.g. "1"
        const key = base + index; // "V1"

        if (!categoryValues[base] || !categoryValues[base].includes(char)) {
          return { ok: false, captures };
        }

        // ⭐ NEW: if this label (V1, C1…) was seen before,
        // enforce that it’s the *same* phone as last time.
        if (captures[key] && captures[key] !== char) {
          return { ok: false, captures };
        }

        // store capture — this is what the replacement code uses
        captures[key] = char; // e.g. captures["V1"] = "a"
        continue;
      }

      // --- CASE 2: simple category ---
      if (categoryValues[patChar]) {
        if (!categoryValues[patChar].includes(char)) {
          return { ok: false, captures };
        }
        continue;
      }

      // --- CASE 3: literal match ---
      if (char !== patChar) return { ok: false, captures };
    }

    return { ok: true, captures };
  };

  const checkStress = (index, wordArr, wordString, stressMarker) => {
    const stringOffsets = [];
    let pos = 0;

    for (let seg of wordArr) {
      stringOffsets.push(pos);
      pos += seg.length;
    }

    const segStart = stringOffsets[index];

    // 1. Look backward in the string for ˈ before this segment
    let stressed = false;

    for (let i = segStart - 1; i >= 0; i--) {
      if (wordString[i] === stressMarker) {
        stressed = true;
        break;
      }
      if (wordString[i] === ".") break; // stress marker must be inside same syllable
    }

    if (!stressed) return false;

    // 2. Look forward for the syllable boundary
    for (let i = segStart + wordArr[index].length; i < wordString.length; i++) {
      if (wordString[i] === ".") return true;
      if (wordString[i] === stressMarker) break; // next stress marker = invalid
    }

    return false;
  };

  // Helper: pick a random character from a category
  const pickCategoryChar = (cat) => {
    const options = categoryValues[cat] || [cat];
    return options[Math.floor(Math.random() * options.length)];
  };

  

  for (const rule of soundChanges) {
    const captures = {}; // e.g. { 1: "a", 2: "l" }
    //PROSODY STEP
    if (rule.prosodyType) {
      word = applyProsody(
        word,
        rule.prosodyType,
        rule.primaryStressPlacement,
        "derived",
        null,
        rule.whenNoHeavySyllable
      );

      // Rebuild the core arrays from scratch
      wordArr.splice(0, wordArr.length, ...tokenizePattern(word));
     

      //  IMPORTANT: rebuild the clean layers too
      
      wordArrClean = wordArr.filter((seg) => !prosodyMarks.has(seg));
      indexMap = rebuildIndexMap();

      continue; // continue to the next rule
    }

    //  SOUND CHANGE STEP
    const { originalSound, resultingSound, environment } = rule;
    if (!environment) return;

    //is a sound change
    const cleanOriginalSound = stripProsody(originalSound);

    const originalTokens = tokenizePattern(cleanOriginalSound);

    const cleanResultSound = resultingSound ? stripProsody(resultingSound) : "";

    const resultTokens = tokenizePattern(cleanResultSound);
    const origLength = originalTokens.length;

    const envType = environment.type;
    const firstEnv = environment.firstEnvironmentSound || "";
    const secondEnv = environment.secondEnvironmentSound || "";



    for (let cleanI = 0; cleanI < wordArrClean.length; cleanI++) {
     
      const i = indexMap[cleanI];
      const originalTokens = tokenizePattern(originalSound);

      // --- Pattern match ---
      if (
        origLength > 0 &&
        !matchesPattern(
          sliceIgnoringDots(wordArr, indexMap[cleanI], origLength),
          originalTokens
        )
      )
        continue;

      // --- Capture matched phones for backreferences ---
      // --- Correct capture for backreferences ---

      // Use the same cleaned slice that matchesPattern used
      const cleanSlice = removeProsody(
        wordArrClean.slice(cleanI, cleanI + origLength)
      );

      const match = matchesPattern(cleanSlice, originalTokens);
      if (!match.ok) continue;

      const captures = match.captures; // <-- use these!

      // --- Check environment ---
      let envOk = true;

      switch (envType) {
        case "unconditional":
          envOk = true;
          break;

        case "between":
          const leftMatch = matchesPattern(
            removeProsody(wordArrClean.slice(cleanI - firstEnv.length, cleanI)),
            tokenizePattern(firstEnv)
          );

          const rightMatch = matchesPattern(
            removeProsody(
              wordArrClean.slice(
                cleanI + origLength,
                cleanI + origLength + secondEnv.length
              )
            ),
            tokenizePattern(secondEnv)
          );

          envOk = leftMatch.ok && rightMatch.ok;

          break;

        case "before":
          envOk = matchesPattern(
            removeProsody(
              wordArrClean.slice(
                cleanI + origLength,
                cleanI + origLength + firstEnv.length
              )
            ),
            tokenizePattern(firstEnv)
          ).ok;

          break;

        case "after":
          envOk = matchesPattern(removeProsody(
            wordArrClean.slice(cleanI - firstEnv.length, cleanI),
            tokenizePattern(secondEnv)).ok
          );

          break;

        case "word-initially":
          envOk = cleanI === 0;
          break;

        case "word-intially-before":
          envOk =
            cleanI === 0 &&
            matchesPattern(
              removeProsody(
                wordArrClean.slice(cleanI - firstEnv.length, cleanI)
              ),
              tokenizePattern(firstEnv)
            ).ok;
          break;

        case "word-finally":
          envOk = cleanI + origLength === wordArrClean.length;
          break;

        case "word-finally-after":
          envOk =
            cleanI + origLength === wordArrClean.length &&
            matchesPattern(
              removeProsody(
                wordArrClean.slice(cleanI - firstEnv.length, cleanI)
              ),
              tokenizePattern(secondEnv)
            ).ok;

          break;

        case "stressed":
          envOk = checkStress(i, wordArr, word, "ˈ");
          break;

        case "unstressed":
          envOk = !checkStress(i, wordArr, word, "ˈ");
          break;

        case "secondary-unstressed":
          envOk = checkStress(i, wordArr, word, "ˌ");
          break;
      }

      if (!envOk) continue;

      // --- Build replacement string ---
      let replacementStr = "";

      if (origLength > 0) {
        for (let j = 0; j < resultTokens.length; j++) {
          const resChar = resultTokens[j];
          // Convert clean index+offset → original index in wordArr
          const origIndex = indexMap[cleanI + j];
          const origChar = origIndex !== undefined ? wordArr[origIndex] : "";

          // 🔥 Prevent accidental overwriting of prosody marks:
          if (prosodyMarks.has(origChar)) {
            replacementStr += origChar;
            continue;
          }

          // Backreference? (V1, C1, L2…)
          if (/^[A-Za-z][0-9]+$/.test(resChar)) {
            if (captures[resChar]) {
              replacementStr += captures[resChar];
              continue;
            }
          }

          const baseCat = resChar.match(/^([A-Za-z])/);
          if (baseCat && categoryValues[baseCat[1]]) {
            const cat = baseCat[1]; // e.g. "S"

            const sourceCat = categoryValues[originalTokens[j]] || null;
            const targetCat = categoryValues[resChar];

            if (sourceCat && sourceCat.includes(origChar)) {
              const sourceIndex = sourceCat.indexOf(origChar);
              replacementStr +=
                targetCat[sourceIndex % targetCat.length] || targetCat[0];
            } else if (
              (resChar === "C" && categoryValues["C"].includes(origChar)) ||
              (resChar === "V" && categoryValues["V"].includes(origChar))
            ) {
              replacementStr += origChar;
            } else {
              replacementStr += targetCat[0];
            }

            continue;
          }

          // literal fallback
          replacementStr += resChar;
        }
      } else {
        // epenthesis
        for (let j = 0; j < resultTokens.length; j++) {
          const resChar = resultTokens[j];
          if (categoryValues[resChar]) {
            replacementStr += pickCategoryChar(resChar);
          } else {
            replacementStr += resChar;
          }
        }
      }

      // --- Apply replacement ---
      if (origLength === 0) {
        // epenthesis
        wordArr.splice(i, 0, ...replacementStr);
      } else {
        // normal replacement

        // get original index of cleanI
        // Convert clean slice boundaries → original slice, SKIPPING prosody marks
        let start = indexMap[cleanI];

        // Determine end by scanning forward, skipping . ˈ ˌ
        let end = start;
        let phonesNeeded = origLength;

        while (phonesNeeded > 0 && end < wordArr.length) {
          if (!prosodyMarks.has(wordArr[end])) {
            phonesNeeded--;
          }
          end++;
        }

        // Collect prosody marks and their relative positions inside the replaced slice
        const removedSlice = wordArr.slice(start, end);
        const preservedMarks = [];
        removedSlice.forEach((ch, idx) => {
          if (prosodyMarks.has(ch)) {
            preservedMarks.push({ pos: idx, ch });
          }
        });

        // Perform the replacement (this erases prosody marks!)
        wordArr.splice(start, end - start, ...replacementStr);

        // Re-insert preserved prosody marks in relative order
        for (const { pos, ch } of preservedMarks) {
          const insertAt = start + pos;
          // shift if out of bounds
          if (insertAt <= wordArr.length) {
            wordArr.splice(insertAt, 0, ch);
          }
        }

        // Fix boundary if the match crossed a dot
        fixBoundaryAfterMetathesis(wordArr, start);

        // Rebuild clean form + index map after modification
        wordArrClean = wordArr.filter((seg) => !prosodyMarks.has(seg));
        indexMap = rebuildIndexMap();
      }

      // 🔥 IMPORTANT: Rebuild clean layer AFTER modification
      wordArrClean = wordArr.filter((seg) => !prosodyMarks.has(seg));

      // 🔥 Advance cleanI so we don't reprocess inserted segments
      const netChange = replacementStr.length - origLength;
      cleanI += netChange;
      
    }
  }

  // --- REPAIR SYLLABLE STRUCTURE AFTER SOUND CHANGES ---

  function minimallyFixSyllables(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      // Only look at actual dots
      if (arr[i] !== ".") continue;

      // --- CASE 1: dot precedes a final consonant cluster ---
      // Example: gi.p.k. → want: gipk.
      let start = i + 1;
      let end = start;

      while (end < arr.length && categoryValues["C"].includes(arr[end])) {
        end++;
      }

      // If everything after the dot is consonants up to the end
      if (end === arr.length) {
        // Move dot to very end
        arr.splice(i, 1);
        arr.push(".");
        return arr.join("");
      }

      // --- Otherwise, do nothing ---
      // The V.CV or VC.V cases should NOT be touched unless a vowel was deleted
      // and we have NO safe way to detect that here.
    }

    return arr.join("");
  }

  let fixedSyllables = minimallyFixSyllables(wordArr);

  return fixedSyllables;
}

export default applySoundChange;
