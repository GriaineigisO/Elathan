import fs from "fs";
import readline from "readline";

const posMap = {
  noun: "noun_meaning",
  verb: "verb_meaning",
  adjective: "adj_meaning",
  adverb: "adv_meaning",
  adposition: "adp_meaning",
  pronoun: "pron_meaning",
  particle: "part_meaning",
  interjection: "interj_meaning",
  affix: "affix_meaning",
  clitic: "clitic_meaning",
};

async function convert() {
  const rl = readline.createInterface({
    input: fs.createReadStream("english.jsonl"),
    crlfDelay: Infinity,
  });

  const out = fs.createWriteStream("english_headwords.json");
  out.write("[\n");

  let first = true;

  for await (const line of rl) {
    if (!line.trim()) continue;

    const entry = JSON.parse(line);

    // ❌ skip inflected forms
    if (entry.inflection_of) continue;

    const word = entry.word;
    const pos = entry.pos;

    if (!word || !pos) continue;

    const mapped = posMap[pos];
    if (!mapped) continue;

    const obj = {
      word_type: "word",
      [mapped]: [word],
    };

    if (!first) out.write(",\n");
    first = false;

    out.write(JSON.stringify(obj));
  }

  out.write("\n]");
  out.end();
  console.log("✔ Finished writing english_headwords.json");
}

convert();
