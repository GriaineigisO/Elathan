import fs from "fs";
import readline from "readline";

async function dedupe() {
  const rl = readline.createInterface({
    input: fs.createReadStream("english_headwords.jsonl"),
    crlfDelay: Infinity
  });

  const out = fs.createWriteStream("english_headwords_deduped.jsonl");

  // Track exact duplicates
  const seen = new Set();

  // Track lemma versions to remove plural copies
  const baseWords = new Set();      // e.g., "handcarry"
  const pluralCandidates = [];      // store lines ending in "s" for later

  for await (const line of rl) {
    if (!line.trim()) continue;

    const obj = JSON.parse(line);

    // extract lemma
    const word =
      obj.noun_meaning?.[0] ||
      obj.verb_meaning?.[0] ||
      obj.adj_meaning?.[0] ||
      obj.adv_meaning?.[0] ||
      obj.adp_meaning?.[0] ||
      obj.pron_meaning?.[0] ||
      obj.part_meaning?.[0] ||
      obj.interj_meaning?.[0] ||
      obj.affix_meaning?.[0] ||
      obj.clitic_meaning?.[0];

    // extract POS ("noun_meaning", "verb_meaning", …)
    const posKey = Object.keys(obj).find(k => k.endsWith("_meaning") && k !== "word_type");

    if (!word || !posKey) continue;

    // Unique per pos + word
    const dedupeKey = `${posKey}:${word}`;

    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    // ---- NEW FINAL-S FILTER ----

    if (!word.endsWith("s")) {
      // keep base lemma
      baseWords.add(`${posKey}:${word}`);
      out.write(JSON.stringify(obj) + "\n");
      continue;
    }

    // word ends with "s" → check if the base exists
    const singular = word.slice(0, -1);
    const singularKey = `${posKey}:${singular}`;

    if (seen.has(singularKey) || baseWords.has(singularKey)) {
      // skip plural version
      continue;
    }

    // store for possible later keep
    pluralCandidates.push({ obj, posKey, word });
  }

  // After reading everything, keep plural forms when no singular exists
  for (const { obj, posKey, word } of pluralCandidates) {
    const singularKey = `${posKey}:${word.slice(0, -1)}`;
    if (!baseWords.has(singularKey)) {
      out.write(JSON.stringify(obj) + "\n");
    }
  }

  out.end();
  console.log("✔ Deduped + filtered file written to english_headwords_deduped.jsonl");
}

dedupe();
