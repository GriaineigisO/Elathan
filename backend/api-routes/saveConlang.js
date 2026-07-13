import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";
import pkg from "number-to-words";
const { toWords } = pkg;

let lastGeneratedId = 0;
function generateSafeId() {
  const base = Date.now() * 100;
  const randomPart = Math.floor(Math.random() * 100);
  let id = base + randomPart;
  if (id <= lastGeneratedId) id = lastGeneratedId + 1;
  lastGeneratedId = id;
  return id;
}

const wordToNumber = {
  zero: 0,

  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,

  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,

  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,

  hundred: 100,
  thousand: 1000,
};

const toNumber = (word) => {
  return wordToNumber[word.toLowerCase()];
};

const meaningKeys = [
  {
    meaning: "noun_meaning",
    abbr: "n",
    categories: "noun_word_categories",
    forms: "noun_word_forms",
    type: "noun",
  },
  {
    meaning: "verb_meaning",
    abbr: "v",
    categories: "verb_word_categories",
    forms: "verb_word_forms",
    type: "verb",
  },
  {
    meaning: "adj_meaning",
    abbr: "adj",
    categories: "adj_word_categories",
    forms: "adj_word_forms",
    type: "adjective",
  },
  {
    meaning: "adv_meaning",
    abbr: "adv",
    categories: "adv_word_categories",
    forms: "adv_word_forms",
    type: "adverb",
  },
  {
    meaning: "adp_meaning",
    abbr: "adp",
    categories: "adp_word_categories",
    forms: "adp_word_forms",
    type: "adposition",
  },
  {
    meaning: "conj_meaning",
    abbr: "conj",
    categories: "conj_word_categories",
    forms: "conj_word_forms",
    type: "conjunction",
  },
  {
    meaning: "pron_meaning",
    abbr: "pron",
    categories: "pron_word_categories",
    forms: "pron_word_forms",
    type: "pronoun",
  },
  {
    meaning: "part_meaning",
    abbr: "part",
    categories: "part_word_categories",
    forms: "part_word_forms",
    type: "particle",
  },
  {
    meaning: "interj_meaning",
    abbr: "interj",
    categories: "interj_word_categories",
    forms: "interj_word_forms",
    type: "interjection",
  },
  {
    meaning: "affix_meaning",
    abbr: "affix",
    categories: "affix_word_categories",
    forms: "affix_word_forms",
    type: "affix",
  },
  {
    meaning: "clitic_meaning",
    abbr: "clitic",
    categories: "clitic_word_categories",
    forms: "clitic_word_forms",
    type: "clitic",
  },
  {
    meaning: "num_meaning",
    abbr: "num",
    categories: "num_word_categories",
    forms: "num_word_forms",
    type: "number",
  },
];

dotenv.config({ path: "../.env" });

const allowedOrigins = [
  "http://localhost:5173",
  "https://elathadictionary.com",
];

// CORS Options
const corsOptions = {
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

// helper for batching
function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export default async function handler(req, res) {
  // Enable CORS
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", corsOptions.methods.join(", "));
  res.setHeader(
    "Access-Control-Allow-Headers",
    corsOptions.allowedHeaders.join(", ")
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const {
      userId,
      motherLanguageId,
      nameToUse,
      words,
      spellings,
      themes,
      wordCategories,
      wordForms,
      numbers,
      numberBase,
      numRoot,
      numConjunction,
      isNumConjunction,
      numOrder,
      numberBaseWord,
      hundred,
    } = req.body;
    const languageId = Date.now();

    //merge numbers with words
    numbers.forEach((number) => {
      if (!number.noun_meaning) words.push(number);
    });

    //construct grammar descriptions here
    //description of derivational morphology
    //find the generated affixes
    const affixes = [];
    const derivedWords = [];
    words.forEach((word) => {
      if (word.affix_meaning) {
        affixes.push(word);
      }

      if (word.etymology) {
        derivedWords.push(word);
      }
    });

    function findOriginalWord(example, type) {
      let original = [];

      function matchWord(id) {
        const filtered = words.filter((word) => word.id === id);

        return filtered[0];
      }

      if (type === "prefix") {
        original = matchWord(example.etymology.second_element_id);
      } else {
        original = matchWord(example.etymology.first_element_id);
      }

      return original;
    }

    function getMeaning(word) {
      const meanings = [];
      meaningKeys.forEach((key) => {
        if (word[key.meaning]) {
          word[key.meaning].forEach((meaning) => {
            meanings.push(meaning);
          });
        }
      });
      return meanings.join(", ");
    }

    let conjunction = {};

    function ifNumRootNotNumberbase() {
      const numRootWord = numbers.find(
        (number) => number.num_meaning[0] === toWords(numRoot)
      );

      let count = numRoot;
      let index = 0;
      const numsFromRootToBase = [];

      while (count < numberBase - 1) {
        let numListing = "";

        if (isNumConjunction === "noConjunction" && numOrder === "higher") {
          numListing = `<li>
        <span style="font-weight:bold">${numRootWord.translation}</span>
        <span style="font-weight:bold">${numbers[index].translation}</span>
        <span>"${toWords(numRoot + (index + 1))}"</span>
        </li>`;

          numbers[numRoot + index] = {
            translation:
              numRootWord.translation + " " + numbers[index].translation,
            ipa: numRootWord.ipa + " " + numbers[index].ipa,
            num_meaning: [toWords(numRoot + (index + 1))],
            id: generateSafeId(),
            word_type: "word",
          };
        }

        if (isNumConjunction === "noConjunction" && numOrder === "lower") {
          numListing = `<li>
           <span style="font-weight:bold">${numbers[index].translation}</span>
        <span style="font-weight:bold">${numRootWord.translation}</span>
        <span>"${toWords(numRoot + (index + 1))}"</span>
        </li>`;

          numbers[numRoot + index] = {
            translation:
              numbers[index].translation + " " + numRootWord.translation,
            ipa: numbers[index].ipa + " " + numRootWord.ipa,
            num_meaning: [toWords(numRoot + (index + 1))],
            id: generateSafeId(),
            word_type: "word",
          };
        }

        //if numbers are joined with a conjunction, find the selected conjunction

        if (isNumConjunction === "conjunction") {
          conjunction = words.find(
            (word) =>
              (word.conj_meaning &&
                word.conj_meaning.includes(numConjunction)) ||
              (word.adp_meaning && word.adp_meaning.includes(numConjunction))
          );

          if (numOrder === "higher") {
            numListing = `<li>
        <span style="font-weight:bold">${numRootWord.translation}</span>
        <span style="font-weight:bold">${conjunction.translation}</span>
        <span style="font-weight:bold">${numbers[index].translation}</span>
        <span>"${toWords(numRoot + (index + 1))}"</span>
        <span>(${toWords(numRoot)} ${
              conjunction.conj_meaning
                ? conjunction.conj_meaning
                : conjunction.adp_meaning
            } ${toWords(index + 1)}</span>)
        </li>`;

            numbers[numRoot + index] = {
              translation:
                numRootWord.translation +
                " " +
                conjunction.translation +
                " " +
                numbers[index].translation,
              ipa:
                numRootWord.ipa +
                " " +
                conjunction.translation +
                " " +
                numbers[index].ipa,
              num_meaning: [toWords(numRoot + (index + 1))],
              id: generateSafeId(),
              word_type: "word",
            };
          }

          if (numOrder === "lower") {
            numListing = `<li>
           <span style="font-weight:bold">${numbers[index].translation}</span>
           <span style="font-weight:bold">${conjunction.translation}</span>
        <span style="font-weight:bold">${numRootWord.translation}</span>
        <span>"${toWords(numRoot + (index + 1))}"</span>
        <span>(${toWords(index + 1)} ${
              conjunction.conj_meaning
                ? conjunction.conj_meaning
                : conjunction.adp_meaning
            } ${toWords(numRoot)}</span>)
        </li>`;
            numbers[numRoot + index] = {
              translation:
                numbers[index].translation +
                " " +
                conjunction.translation +
                " " +
                numRootWord.translation,
              ipa:
                numbers[index].ipa +
                " " +
                conjunction.translation +
                " " +
                numRootWord.ipa,
              num_meaning: [toWords(numRoot + (index + 1))],
              id: generateSafeId(),
              word_type: "word",
            };
          }
        }

        numsFromRootToBase.push(numListing);
        count++;
        index++;
      }

      const firstSentence = `Numbers between ${numRoot} and ${
        numberBase - 1
      } are constructed by compounding ${numRoot} with the appropriate number to reach the desired sum. `;

      const secondSentence = isNumConjunction
        ? `Two numbers are compounded using <span style="font-weight:bold">${
            conjunction.translation
          }</span> "${
            conjunction.conj_meaning
              ? conjunction.conj_meaning
              : conjunction.adp_meaning
          }". `
        : ``;

      const thirdSentence = `The ${numOrder} number is placed first.`;

      const paragraph = firstSentence + secondSentence + thirdSentence;

      return `
        <p style="margin-top:10px">${paragraph}</p>
        <ul>
         ${numsFromRootToBase
           .map((num) => {
             return num;
           })
           .join("")}
        </ul>
        `;
    }

    function steps() {
      const steps = [];
      let count = 1;
      while (count < 9) {
        const step = `<li>
          <span style="font-weight:bold">${numbers[count].translation}${
          numberBaseWord.translation
        }</span>
          <span>"${toWords(
            toNumber(numbers[count].num_meaning[0]) * numberBase
          )}"</span>
          <span>(${toWords(count + 1)} ${toWords(numberBase)}s)</span>
        </li>`;
        steps.push(step);
        count++;
      }

      let baseWordExpanation = ``;

      if (numberBaseWord.noun_meaning) {
        baseWordExpanation = `
      The word <span style="font-weight:bold">${
        numberBaseWord.translation
      }</span> "${toWords(
          numberBase
        )}" is also a noun meaning "${numberBaseWord.noun_meaning.join(
          ", "
        )}". `;

        if (numberBaseWord.etymology && numberBase === 10) {
          baseWordExpanation = `
      The word ${numberBaseWord.translation} "${toWords(
            numberBase
          )}" literally means "two hand". `;
        }
      }

      let hundredExplanation = `The word for "${
        numberBase * 10
      }" is <span style="font-weight:bold">${hundred.translation}</span>`;

      if (hundred.noun_meaning && hundred.noun_meaning.includes("crowd")) {
        hundredExplanation =
          hundredExplanation + ` which is also a noun meaning "crowd".`;
      }

      if (hundred.etymology) {
        hundredExplanation =
          hundredExplanation +
          ` which literally means "big ${toWords(numberBase)}".`;
      }

      return `

      <p>
      ${baseWordExpanation}
      Each "step" up until ${
        numberBase * 10
      } is formed by compounding. ${hundredExplanation}</p>
                    <ul>  
                    ${steps
                      .map((step) => {
                        return step;
                      })
                      .join("")}
                    </ul>`;
    }

    const derivationalDescription = `
    <h2>Numbers</h2>

     <p>${nameToUse} has a base-${numberBase} system.</p>

                    <!--first, list the root numbers only-->
                    <p>The following are the root numbers in ${nameToUse}, numbers which are not derived or constructed from any other.</p>
                     ${numbers
                       .map((word, index) => {
                         if (index < numRoot)
                           return `
                  <div key={index}>
                    <div>
                      <span>
                        <b style="font-weight:bolder">
                          <span class="headword">${word.translation}</span>
                        </b>
                      </span>
                          <span
                            style="margin-left:5px"
                            class="meaning"
                          >
                            "${word.num_meaning[0]}"
                          </span>
                    </div>
                  </div>`;
                       })
                       .join("")}

                    <!--now, how to make words up until the base, assuming numberBase and numRoot are different-->
                    ${ifNumRootNotNumberbase()}

                    <!--now, each step-->
                    ${steps()}
                    

    <h2>Derivational Morphology</h2>
    <ul>
      ${affixes
        .map((affix) => {
          if (affix.word_type === "prefix") {
            affix.translation = `${affix.translation}-`;
          } else {
            affix.translation = `-${affix.translation}`;
          }

          //find up to ten examples of derived terms for each affix
          const examples = [];

          derivedWords.forEach((derivation) => {
            if (
              derivation.etymology.first_element_id === affix.id ||
              derivation.etymology.second_element_id === affix.id
            ) {
              if (examples.length < 10) examples.push(derivation); //max of 10 examples
            }
          });

          return `<li>
          <span style="font-weight:bold">${affix.translation}</span>: <span>"${
            affix.affix_meaning
          }"</span>
          <ul>
          ${examples
            .map((example) => {
              const originalWord = findOriginalWord(example, affix.word_type);

              if (!originalWord) {
                return;
              }

              return `<li>
              <span style="font-weight:bold">${originalWord.translation}</span>
              <span>"${getMeaning(originalWord)}"</span>
              <span>→</span>
              <span style="font-weight:bold">${example.translation}</span>
              <span>"${getMeaning(example)}"</span>
              </li>`;
            })
            .join("")}
          </ul>
          </li>`;
        })
        .join("")}
    </ul>
    `;

    const removeNulls = (arr) => {
      let filteredArr = arr.filter((obj) => obj !== null);
      return filteredArr;
    };

    // 1️⃣ Add the language first
    const { error: languageError } = await supabase
      .from("languages")
      .insert([
        {
          user_id: userId,
          language_id: languageId,
          language_name: nameToUse,
          is_proto: false,
          mother_language_id: motherLanguageId ? motherLanguageId : null,
          spellings: spellings,
          themes: themes,
          word_categories: [wordCategories],
          word_forms: wordForms,
          grammar: derivationalDescription,
        },
      ])
      .single();

    if (languageError) {
      console.error("Error adding language:", languageError);
      res.status(500).json({ message: "Error adding language" });
      return;
    }

    // 2️⃣ Prepare and insert words in batches
    const BATCH_SIZE = 100;
    const wordChunks = chunkArray(words, BATCH_SIZE);
    const allIds = new Set();

    for (const word of words) {
      if (allIds.has(word.id))
        console.warn("Duplicate before chunking:", word.id);
      allIds.add(word.id);
    }

    for (const chunk of wordChunks) {
      const wordsToInsert = chunk.map((word) => ({
        word_id: word.id,
        language_id: languageId,
        word: word.translation ? word.translation : word.word,
        word_type: word.daughter_word_type
          ? word.daughter_word_type
          : word.word_type,
        word_note: word.note,
        ipa: word.ipa || null,
        noun_meaning: Array.isArray(word.noun_meaning)
          ? word.noun_meaning
          : null,
        num_meaning: Array.isArray(word.num_meaning) ? word.num_meaning : null,
        adp_meaning: Array.isArray(word.adp_meaning) ? word.adp_meaning : null,
        verb_meaning: Array.isArray(word.verb_meaning)
          ? word.verb_meaning
          : null,
        adj_meaning: Array.isArray(word.adj_meaning) ? word.adj_meaning : null,
        conj_meaning: Array.isArray(word.conj_meaning)
          ? word.conj_meaning
          : null,
        adv_meaning: Array.isArray(word.adv_meaning) ? word.adv_meaning : null,
        pron_meaning: Array.isArray(word.pron_meaning)
          ? word.pron_meaning
          : null,
        affix_meaning: Array.isArray(word.affix_meaning)
          ? word.affix_meaning
          : null,
        clitic_meaning: Array.isArray(word.clitic_meaning)
          ? word.clitic_meaning
          : null,
        interj_meaning: Array.isArray(word.interj_meaning)
          ? word.interj_meaning
          : null,
        part_meaning: Array.isArray(word.part_meaning)
          ? word.part_meaning
          : null,

        noun_word_categories: word.noun_word_categories
          ? removeNulls(word.noun_word_categories)
          : [],
        num_word_categories: word.num_word_categories
          ? removeNulls(word.num_word_categories)
          : [],
        verb_word_categories: word.verb_word_categories
          ? removeNulls(word.verb_word_categories)
          : [],
        adj_word_categories: word.adj_word_categories
          ? removeNulls(word.adj_word_categories)
          : [],
        adv_word_categories: word.adv_word_categories
          ? removeNulls(word.adv_word_categories)
          : [],
        pron_word_categories: word.pron_word_categories
          ? removeNulls(word.pron_word_categories)
          : [],
        interj_word_categories: word.interj_word_categories
          ? removeNulls(word.interj_word_categories)
          : [],
        conj_word_categories: word.conj_word_categories
          ? removeNulls(word.conj_word_categories)
          : [],
        affix_word_categories: word.affix_word_categories
          ? removeNulls(word.affix_word_categories)
          : [],
        part_word_categories: word.part_word_categories
          ? removeNulls(word.part_word_categories)
          : [],
        adp_word_categories: word.adp_word_categories
          ? removeNulls(word.adp_word_categories)
          : [],
        clitic_word_categories: word.clitic_word_categories
          ? removeNulls(word.clitic_word_categories)
          : [],

        noun_word_forms: word.noun_word_forms
          ? removeNulls(word.noun_word_forms)
          : [],
        num_word_forms: word.num_word_forms
          ? removeNulls(word.num_word_forms)
          : [],
        verb_word_forms: word.verb_word_forms
          ? removeNulls(word.verb_word_forms)
          : [],
        adj_word_forms: word.adj_word_forms
          ? removeNulls(word.adj_word_forms)
          : [],
        adv_word_forms: word.adv_word_forms
          ? removeNulls(word.adv_word_forms)
          : [],
        pron_word_forms: word.pron_word_forms
          ? removeNulls(word.pron_word_forms)
          : [],
        interj_word_forms: word.interj_word_forms
          ? removeNulls(word.interj_word_forms)
          : [],
        conj_word_forms: word.conj_word_forms
          ? removeNulls(word.conj_word_forms)
          : [],
        affix_word_forms: word.affix_word_forms
          ? removeNulls(word.affix_word_forms)
          : [],
        part_word_forms: word.part_word_forms
          ? removeNulls(word.part_word_forms)
          : [],
        adp_word_forms: word.adp_word_forms
          ? removeNulls(word.adp_word_forms)
          : [],
        clitic_word_forms: word.clitic_word_forms
          ? removeNulls(word.clitic_word_forms)
          : [],

        made_by: userId,
        date_added: new Date(),
      }));

      const { error: insertError } = await supabase
        .from("dictionary")
        .insert(wordsToInsert);

      const etymologiesToInsert = chunk
        .filter((word) => word.etymology) // only keep words that have an 'etymology' key
        .map((word) => ({
          etymology_type: word.etymology.etymology_type,
          first_element_id:
            word.etymology.etymology_type === "derived"
              ? word.etymology.first_element_id
              : null,
          second_element_id:
            word.etymology.etymology_type === "derived"
              ? word.etymology.second_element_id
              : null,
          word_id: word.id,
          etymology_id: word.etymology.etymology_id,
          mother_word_id:
            word.etymology.etymology_type === "fromMother"
              ? word.etymology.mother_word_id
              : null,
        }));

      const { error: etymologyError } = await supabase
        .from("etymology")
        .insert(etymologiesToInsert);

      if (insertError) {
        console.error("Error inserting batch:", insertError);
        res.status(500).json({
          message: "Error inserting batch of words",
          error: insertError.message,
        });
        return;
      }
    }

    res
      .status(200)
      .json({ languageId, message: "Language saved successfully" });
  } catch (error) {
    console.error("Error adding conlang:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
