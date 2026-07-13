import assignWeight from "../Functions/phonologyWeight";
import removeNotation from "../Functions/prosody/removeNotation";
import applyProsody from "../Functions/prosody/applyProsody";

//As far too many homophones were made with some regularity, this function replaces most homophones with new words
function removeHomophones(
  consonants,
  vowels,
  syllableStructure,
  minSyllables,
  maxSyllables,
  allCategoryValues,
  prosodyType,
  primaryStressPlacement,
  whenNoHeavySyllable,
  accentPlacement
) {
  let word;

  // 1% chance to allow duplicate
  const allowDuplicate = Math.floor(Math.random() * 100) === 1;

  for (;;) {
    word = applyProsody(
      generateWord(
        consonants,
        vowels,
        syllableStructure,
        minSyllables,
        maxSyllables,
        allCategoryValues
      ),
      prosodyType,
      primaryStressPlacement,
      "noDerivation",
      null,
      whenNoHeavySyllable,
      accentPlacement
    );

    if (allowDuplicate) {
      allGeneratedWords.push(word);
      return word;
    }

    if (!allGeneratedWords.includes(word)) {
      allGeneratedWords.push(word);
      return word;
    }

    // otherwise loop and generate again
  }
}

const allGeneratedWords = [];

const generateWord = (
  consonants,
  vowels,
  syllableStructure,
  minSyllables,
  maxSyllables,
  allCategoryValues
) => {
  if (typeof syllableStructure !== "object") {
    syllableStructure = Array.from(syllableStructure);
  }

  const vowelsFixed = removeNotation(vowels);
  const consonantsFixed = removeNotation(consonants);

  let numberOfSyllables = 0;
  let initialSyllables = [];
  let medialSyllables = [];
  let finalSyllables = [];
  let selectedSyllablesClone = [];
  let newSyllableArray = [];
  let newWord = "";

  /*Determine Syllable Count*/
  if (minSyllables === maxSyllables) {
    numberOfSyllables = minSyllables;
  } else {
    numberOfSyllables =
      Math.floor(
        Math.random() * (Number(maxSyllables) - Number(minSyllables) + 1)
      ) + Number(minSyllables);
  }

  //assigns "frequency" to a syllable. If the user included a number in the syllable structure e.g "CV2", then the syllable is duplicated that amount of times, thus giving the syllable a greater chance of being randomly selected when a word is being generated
  assignWeight(syllableStructure);

  //syllables that may only occur medially or finally are stored in the storeXSyllables arrays above, and then not pushed into selectedSyllablesClone to prevent them being selected as the first syllable (aka when count === 0)

  for (let j = 0; j < syllableStructure.length; j++) {
    if (syllableStructure[j][0] === "&") {
      medialSyllables.push(syllableStructure[j]);
    } else if (syllableStructure[j][0] === "*") {
      finalSyllables.push(syllableStructure[j]);
    } else if (syllableStructure[j] !== " ") {
      selectedSyllablesClone.push(syllableStructure[j]);
    }
  }

  let count = 1;

  for (let i = 0; i < numberOfSyllables; i++) {
    //syllables that can only occur root initially may only have a chance of being selected with count === 0
    if (count > 1) {
      //adds previously removed medial syllables
      for (let j = 0; j < medialSyllables.length; j++) {
        selectedSyllablesClone.push(medialSyllables[j]);
      }

      for (let j = 0; j < selectedSyllablesClone.length; j++) {
        if (selectedSyllablesClone[j][0] === "#") {
          initialSyllables.push(selectedSyllablesClone[j]);
          selectedSyllablesClone.splice(j, 1);
        }
      }
    }

    //syllables that can only occur root finally may only have a chance of being selected with count === 0
    if (count === numberOfSyllables && numberOfSyllables !== 1) {
      //adds previously removed final syllables
      for (let j = 0; j < finalSyllables.length; j++) {
        selectedSyllablesClone.push(finalSyllables[j]);
      }
    }
    count++;

    let syllable =
      selectedSyllablesClone[
        Math.floor(Math.random() * selectedSyllablesClone.length)
      ]; //chooses a random syllable from array of selected syllables

    let syllableArray = Array.from(syllable); //turns that syllable into it's own array, with each letter now being it's own item e.g ["CV"] > ["C", "V"]

    for (let j = 0; j < syllableArray.length; j++) {
      if (syllableArray[j] === "C") {
        newSyllableArray.push(
          consonantsFixed[Math.floor(Math.random() * consonantsFixed.length)]
        );
      } else if (syllableArray[j] === "V") {
        newSyllableArray.push(
          vowelsFixed[Math.floor(Math.random() * vowelsFixed.length)]
        );
      } else if (syllableArray[j] === "A" && allCategoryValues.A) {
        newSyllableArray.push(
          allCategoryValues.A[
            Math.floor(Math.random() * allCategoryValues.A.length)
          ]
        );
      } else if (syllableArray[j] === "B" && allCategoryValues.B) {
        newSyllableArray.push(
          allCategoryValues.B[
            Math.floor(Math.random() * allCategoryValues.B.length)
          ]
        );
      } else if (syllableArray[j] === "D" && allCategoryValues.D) {
        newSyllableArray.push(
          allCategoryValues.D[
            Math.floor(Math.random() * allCategoryValues.D.length)
          ]
        );
      } else if (syllableArray[j] === "E" && allCategoryValues.E) {
        newSyllableArray.push(
          allCategoryValues.E[
            Math.floor(Math.random() * allCategoryValues.E.length)
          ]
        );
      } else if (syllableArray[j] === "F" && allCategoryValues.F) {
        newSyllableArray.push(
          allCategoryValues.F[
            Math.floor(Math.random() * allCategoryValues.F.length)
          ]
        );
      } else if (syllableArray[j] === "G" && allCategoryValues.G) {
        newSyllableArray.push(
          allCategoryValues.G[
            Math.floor(Math.random() * allCategoryValues.G.length)
          ]
        );
      } else if (syllableArray[j] === "H" && allCategoryValues.H) {
        newSyllableArray.push(
          allCategoryValues.H[
            Math.floor(Math.random() * allCategoryValues.H.length)
          ]
        );
      } else if (syllableArray[j] === "I" && allCategoryValues.I) {
        newSyllableArray.push(
          allCategoryValues.I[
            Math.floor(Math.random() * allCategoryValues.I.length)
          ]
        );
      } else if (syllableArray[j] === "J" && allCategoryValues.J) {
        newSyllableArray.push(
          allCategoryValues.J[
            Math.floor(Math.random() * allCategoryValues.J.length)
          ]
        );
      } else if (syllableArray[j] === "K" && allCategoryValues.K) {
        newSyllableArray.push(
          allCategoryValues.K[
            Math.floor(Math.random() * allCategoryValues.K.length)
          ]
        );
      } else if (syllableArray[j] === "L" && allCategoryValues.L) {
        newSyllableArray.push(
          allCategoryValues.L[
            Math.floor(Math.random() * allCategoryValues.L.length)
          ]
        );
      } else if (syllableArray[j] === "M" && allCategoryValues.M) {
        newSyllableArray.push(
          allCategoryValues.M[
            Math.floor(Math.random() * allCategoryValues.M.length)
          ]
        );
      } else if (syllableArray[j] === "N" && allCategoryValues.N) {
        newSyllableArray.push(
          allCategoryValues.N[
            Math.floor(Math.random() * allCategoryValues.N.length)
          ]
        );
      } else if (syllableArray[j] === "O" && allCategoryValues.O) {
        newSyllableArray.push(
          allCategoryValues.O[
            Math.floor(Math.random() * allCategoryValues.O.length)
          ]
        );
      } else if (syllableArray[j] === "P" && allCategoryValues.P) {
        newSyllableArray.push(
          allCategoryValues.P[
            Math.floor(Math.random() * allCategoryValues.P.length)
          ]
        );
      } else if (syllableArray[j] === "Q" && allCategoryValues.Q) {
        newSyllableArray.push(
          allCategoryValues.Q[
            Math.floor(Math.random() * allCategoryValues.Q.length)
          ]
        );
      } else if (syllableArray[j] === "R" && allCategoryValues.R) {
        newSyllableArray.push(
          allCategoryValues.R[
            Math.floor(Math.random() * allCategoryValues.R.length)
          ]
        );
      } else if (syllableArray[j] === "S" && allCategoryValues.S) {
        newSyllableArray.push(
          allCategoryValues.S[
            Math.floor(Math.random() * allCategoryValues.S.length)
          ]
        );
      } else if (syllableArray[j] === "T" && allCategoryValues.T) {
        newSyllableArray.push(
          allCategoryValues.T[
            Math.floor(Math.random() * allCategoryValues.T.length)
          ]
        );
      } else if (syllableArray[j] === "U" && allCategoryValues.U) {
        newSyllableArray.push(
          allCategoryValues.U[
            Math.floor(Math.random() * allCategoryValues.U.length)
          ]
        );
      } else if (syllableArray[j] === "W" && allCategoryValues.W) {
        newSyllableArray.push(
          allCategoryValues.W[
            Math.floor(Math.random() * allCategoryValues.W.length)
          ]
        );
      } else if (syllableArray[j] === "X" && allCategoryValues.X) {
        newSyllableArray.push(
          allCategoryValues.X[
            Math.floor(Math.random() * allCategoryValues.X.length)
          ]
        );
      } else if (syllableArray[j] === "Y" && allCategoryValues.Y) {
        newSyllableArray.push(
          allCategoryValues.Y[
            Math.floor(Math.random() * allCategoryValues.Y.length)
          ]
        );
      } else if (syllableArray[j] === "Z" && allCategoryValues.Z) {
        newSyllableArray.push(
          allCategoryValues.Z[
            Math.floor(Math.random() * allCategoryValues.Z.length)
          ]
        );
      } else if (
        syllableArray[j] === "#" ||
        syllableArray[j] === "&" ||
        syllableArray[j] === "*"
      ) {
        continue;
      } else {
        //if the character in the syllable structure wasn't a capital letter, but an IPA character, said character is chosen as the sound
        newSyllableArray.push(syllableArray[j]);
      }
    }
  }

  newWord = newSyllableArray.join("");


  return newWord;
};

export default removeHomophones;
