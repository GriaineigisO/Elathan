import fs from "fs";

// Load .jsonl file
const raw = fs.readFileSync("./latinDictionary.jsonl", "utf8");

// Parse line-by-line JSON
const latinJSON = raw
  .split("\n")
  .filter((line) => line.trim().length > 0)
  .map((line) => JSON.parse(line));

console.log("Loaded entries:", latinJSON.length);

// Your extractor
function extractLatinData(entry) {
  if (entry.pos !== "noun") return null;

  const lemma = entry.word;

  const english = entry.senses
    .flatMap((s) => s.glosses || [])
    .flatMap((g) => g.split(","))
    .map((g) => g.trim().toLowerCase());

  let gender = null;
  for (const s of entry.senses) {
    if (s.tags?.includes("masculine")) gender = "masculine";
    if (s.tags?.includes("feminine")) gender = "feminine";
    if (s.tags?.includes("neuter")) gender = "neuter";
  }

  return { lemma, english, gender };
}

// Clean usable noun entries
const latinNouns = latinJSON.map(extractLatinData).filter(Boolean);

//now, loop through latinNouns and place each english word in the corresponding gender array
let masculine = [];
let feminine = [];
let neuter = [];

latinNouns.forEach((noun) => {
  noun.english.forEach((rawMeaning) => {
    let meaning = rawMeaning.toLowerCase().trim(); // WORKING editable copy

    // remove indefinite articles
    if (meaning.startsWith("a ")) meaning = meaning.slice(2);
    if (meaning.startsWith("an ")) meaning = meaning.slice(3);
    if (meaning.startsWith("any ")) meaning = meaning.slice(4);

    // skip inflected/grammar meanings
    const nonLemmas = [
      "vocative",
      "accusative",
      "genitive",
      "ablative",
      "dative",
      "alternative",
      "inflection",
      "abbreviation"
    ];
    if (nonLemmas.some((term) => meaning.includes(term))) return;

    // remove anything in parentheses
    meaning = meaning.replace(/\s*\([^)]*\)\s*$/, "").trim();

    //if there is ":", keep only what is after ":"
    if (meaning.includes(":")) {
      let parts = meaning.split(/:/);
      meaning = parts[1];
    }

    // split multiple meanings
    let meanings = meaning
      .split(/;| or /)
      .map((m) => m.trim())
      .filter((m) => m.length > 0);

    //console.log("RAW:", rawMeaning, "| CLEAN:", meaning);

    meanings.forEach((meaning) => {
      // now push to correct gender bucket
      if (noun.gender === "masculine") masculine.push(meaning);
      if (noun.gender === "feminine") feminine.push(meaning);
      if (noun.gender === "neuter") neuter.push(meaning);
    });
  });
});

fs.writeFileSync(
    "masculine.json",
    JSON.stringify(masculine, null, 2),
    "utf8"
  );

  fs.writeFileSync(
    "feminine.json",
    JSON.stringify(feminine, null, 2),
    "utf8"
  );


  fs.writeFileSync(
    "neuter.json",
    JSON.stringify(neuter, null, 2),
    "utf8"
  );

console.log("Extracted noun entries:", latinNouns.length);
