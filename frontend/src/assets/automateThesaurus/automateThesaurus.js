import fs from "fs";
import englishWords from "./coreEnglishWords.js" 

// const words = [
//   {
//     word_type: "word",
//     noun_meaning: ["marriage"],
//   },
//   {
//     word_type: "word",
//     noun_meaning: ["sinker"],
//   },
//   {
//     word_type: "word",
//     noun_meaning: ["sunrise"],
//   },
//   {
//     word_type: "word",
//     noun_meaning: ["duty"],
//   },
//   {
//     word_type: "word",
//     noun_meaning: ["responsibility"],
//   },
//   {
//     word_type: "word",
//     noun_meaning: ["strange"],
//   },
//   {
//     word_type: "word",
//     noun_meaning: ["smell"],
//   },
// ]

// ======================================================
//   CACHE + STATE
// ======================================================
const posCache = new Map();
let lastRequestTime = 0;

// Stores the final synonym results
const synonymsToAdd = [];

// ======================================================
//   HELPERS
// ======================================================
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Ensure we never exceed ~1 request per second
async function rateLimit(minInterval = 700) {
  const now = Date.now();
  const wait = lastRequestTime + minInterval - now;
  if (wait > 0) await sleep(wait);
  lastRequestTime = Date.now();
}

// ======================================================
//   API CALL FOR ONE WORD
// ======================================================
async function getSynonyms(word, num) {
  if (!word) return;
  // Check cache
  if (posCache.has(word)) return posCache.get(word);

  // Clean + normalize
  const clean = word
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/gi, "");
  if (!clean) return null;

  await rateLimit(); // obey API-Ninjas limits

  const url = `https://api.datamuse.com/words?rel_syn=${word}`;

  let res;

  try {
    res = await fetch(url, {
      method: "GET"
    });
  } catch (err) {
    // Network failure → retry with backoff
    if (attempt < 5) {
      console.warn(`Network error for "${clean}" (attempt ${attempt})...`);
      await sleep(attempt * 2000);
      return getSynonyms(clean, attempt + 1);
    }
    console.warn(`Failed after retries: ${clean}`);
    return null;
  }

  // Content-type check (Cloudflare blocks etc.)
  const type = res.headers.get("content-type") || "";
  if (!type.includes("application/json")) {
    const retryAfter = res.headers.get("retry-after");

    if (retryAfter) {
      const wait = Number(retryAfter) * 1000;
      console.warn(`Rate-limited for "${clean}", waiting ${wait}ms...`);
      await sleep(wait);
      return getSynonyms(clean, attempt);
    }

    if (attempt < 5) {
      console.warn(`Non-JSON response for "${clean}", retry ${attempt}...`);
      await sleep(attempt * 3000);
      return getSynonyms(clean, attempt + 1);
    }

    console.warn(`Permanent Non-JSON failure for "${clean}"`);
    return null;
  }

  // Parse JSON
  let data;
  try {
    data = await res.json();

  } catch (err) {
    if (attempt < 5) {
      console.warn(`JSON error for "${clean}", retrying...`);
      await sleep(attempt * 2000);
      return getSynonyms(clean, attempt + 1);
    }
    console.warn(`Failed JSON for ${clean}`);
    return null;
  }


  // Extract synonyms
  let synonyms = [];
  if (data) {
    data.forEach((obj) => {
      synonyms.push(obj.word)
    })
  }


  
  synonyms.push(clean); // include the original word

  // Cache it
  posCache.set(clean, synonyms);

  // Add to output list
  synonymsToAdd.push(synonyms);

  console.log(`${num} / ${englishWords.length}`)

  return synonyms;
}

// ======================================================
//   MAIN LOOP
// ======================================================
const meaningKeys = [
  "noun_meaning",
  "verb_meaning",
  "adj_meaning",
  "adv_meaning",
  "adp_meaning",
  "pron_meaning",
  "part_meaning",
  "interj_meaning"
];

async function run() {
  for (const word of englishWords) {
    let num = englishWords.indexOf(word);
    for (const key of meaningKeys) {
      const englishWord = word[key];
      if (englishWord) await getSynonyms(englishWord[0], num);
    }
  }

  fs.writeFileSync(
    "synonymsToAdd.txt",
    JSON.stringify(synonymsToAdd, null, 2),
    "utf8"
  );

  console.log("Done. Saved:", synonymsToAdd.length, "entries.");
}

run();
