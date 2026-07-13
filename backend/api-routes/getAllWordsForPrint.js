import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";

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

export default async function handler(req, res) {
  // Enable CORS for all requests (including OPTIONS)
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

  // Handle OPTIONS method (for CORS preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { id } = req.body;

      let wordIdArr = [];

      const BATCH_SIZE = 1000;
let from = 0;
let to = BATCH_SIZE - 1;
let allData = [];
let hasMore = true;

while (hasMore) {
  const { data, error, count } = await supabase
    .from("dictionary")
    .select("*", { count: "exact" })
    .eq("language_id", id)
    .range(from, to);

  if (error) {
    console.error("Error getting batch:", error);
    res.status(500).json({ message: "Error getting words" });
    return;
  }

  allData = allData.concat(data);
  hasMore = data.length === BATCH_SIZE;
  from += BATCH_SIZE;
  to += BATCH_SIZE;
}

      
// Optional deduplication by word_id, just in case
const seen = new Set();
allData = allData.filter((entry) => {
  if (seen.has(entry.word_id)) return false;
  seen.add(entry.word_id);
  return true;
});

allData.forEach((word) => wordIdArr.push(word.word_id));

      

      //now, find the etymology of each word. Instead of making a request for each word, get all data from the etymology table for the given language and sift through the array after
      function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

let etymologyRows = [];
const chunks = chunkArray(wordIdArr, 200); // 200 is a safe size

for (const chunk of chunks) {
  const { data: chunkData, error: chunkError } = await supabase
    .from("etymology")
    .select("*")
    .in("word_id", chunk);

  if (chunkError) {
    console.error("Error fetching etymology chunk:", chunkError, "Chunk:", chunk);
    return res.status(500).json({
      message: "Failed to fetch a chunk of etymology rows",
      error: chunkError,
    });
  }

  etymologyRows.push(...chunkData);
}


      const getWord = async (id, type) => {
        const { data, error } = await supabase
          .from("dictionary")
          .select("*")
          .eq("word_id", id);

        if (error) {
          console.error("Error getting word:", error);
          res.status(500).json({ message: "Error getting word" });
        }

        if (type === "word" && data[0]) {
          return data[0].word;
        }

        if (type === "meaning" && data[0]) {
          let concatMeaning = [].concat(
            data[0].noun_meaning ?? [],
            data[0].num_meaning ?? [],
            data[0].verb_meaning ?? [],
            data[0].adj_meaning ?? [],
            data[0].adv_meaning ?? [],
            data[0].pron_meaning ?? [],
            data[0].part_meaning ?? [],
            data[0].interj_meaning ?? [],
            data[0].conj_meaning ?? [],
            data[0].affix_meaning ?? []
          );
          return concatMeaning.join(", ");
        }

        if (type === "language" && data[0]) {
          return getLanguage(data[0].language_id, "name");
        }

        if (type === "proto" && data[0]) {
          return getLanguage(data[0].language_id, "proto");
        }

        if (type === "type" && data[0]) {
          return data[0].word_type;
        }
      };

      const getLanguage = async (languageId, type) => {
        const { data, error } = await supabase
          .from("languages")
          .select("*")
          .eq("language_id", Number(languageId));

        if (error) {
          console.error("Error getting language:", error);
          res.status(500).json({ message: "Error getting language" });
        }

        if (type === "name") {
          return data[0].language_name;
        }

        if (type === "proto") {
          return data[0].is_proto;
        }
      };

      const recursiveEtymology = async (wordId, seen = new Set()) => {
        if (!wordId || seen.has(wordId)) {
          console.warn("Skipping already seen or invalid wordId:", wordId);
          return [];
        }

        seen.add(wordId);

        const { data: etymRows, error: etymError } = await supabase
          .from("etymology")
          .select("*")
          .eq("word_id", wordId);

        if (etymError || !etymRows || etymRows.length === 0) {
          console.warn("No etymology rows found for word_id:", wordId);
          return [];
        }

        const etym =
          etymRows.find((e) => e.etymology_type === "fromMother") ||
          etymRows.find((e) => e.etymology_type === "derived") ||
          etymRows.find((e) => e.etymology_type === "loaned");

        if (!etym) {
          console.warn("No etymology found for word_id:", wordId);
          return [];
        }

        const formatVerbMeanings = (meanings) => {
          const result = [];
          for (let i = 0; i < meanings.length; i++) {
            const current = meanings[i];
            const next = meanings[i + 1];
            if (current.startsWith("(") && next) {
              result.push(`${current} to ${next}`);
              i++;
            } else if (!current.startsWith("(")) {
              result.push(`to ${current}`);
            }
          }
          return result.join(", ");
        };

        const fetchDictionaryAndLanguage = async (id) => {
          const { data: dict, error: dictError } = await supabase
            .from("dictionary")
            .select("*")
            .eq("word_id", id)
            .maybeSingle();

          if (dictError || !dict) return null;

          const { data: lang, error: langError } = await supabase
            .from("languages")
            .select("language_name, is_proto")
            .eq("language_id", dict.language_id)
            .single();

          const verbMeanings = dict.verb_meaning
            ? formatVerbMeanings(dict.verb_meaning)
            : "";
          const nounMeanings = dict.noun_meaning?.join(", ") || "";
          const numMeanings = dict.num_meaning?.join(", ") || "";
          const adjMeanings = dict.adj_meaning?.join(", ") || "";
          const advMeanings = dict.adv_meaning?.join(", ") || "";
          const adpMeanings = dict.adp_meaning?.join(", ") || "";
          const conjMeanings = dict.conj_meaning?.join(", ") || "";
          const affixMeanings = dict.affix_meaning?.join(", ") || "";
          const interjMeanings = dict.interj_meaning?.join(", ") || "";
          const pronMeanings = dict.pron_meaning?.join(", ") || "";
          const partMeanings = dict.part_meaning?.join(", ") || "";

          const meaning =
            nounMeanings +
            numMeanings +
            verbMeanings +
            adjMeanings +
            advMeanings +
            adpMeanings +
            pronMeanings +
            partMeanings +
            affixMeanings +
            conjMeanings +
            interjMeanings;

          return {
            word: dict.word,
            word_type: dict.word_type,
            is_proto: lang?.is_proto,
            meaning,
            language_name: lang?.language_name || "[Unknown language]",
            etymology_type: etym.etymology_type,
          };
        };

        // === Handle derived: stop after returning 1 or 2 elements ===
        if (etym.etymology_type === "derived") {
          const elements = [];
          for (const elementId of [
            etym.first_element_id,
            etym.second_element_id,
            etym.third_element_id,
          ]) {
            if (!elementId) continue;
            const info = await fetchDictionaryAndLanguage(elementId);
            if (info) elements.push(info);
          }
          return elements;
        }

        // === Handle fromMother and loaned: continue recursion ===
        const ancestorId =
          etym.etymology_type === "loaned"
            ? etym.loanword_id
            : etym.mother_word_id;

        if (!ancestorId) {
          console.warn("Missing ancestor ID for recursive etymology.");
          return [];
        }

        const current = await fetchDictionaryAndLanguage(ancestorId);
        if (!current) return [];

        const rest = await recursiveEtymology(ancestorId, seen);
        return [current, ...rest];
      };

      // Create a lookup map from word_id → etymology row
      const etymMap = new Map();

      etymologyRows.forEach((etym) => {
        if (!etymMap.has(etym.word_id)) {
          etymMap.set(etym.word_id, []);
        }
        etymMap.get(etym.word_id).push(etym);
      });

      for (const word of allData) {
        const etymologies = etymMap.get(word.word_id);

        if (etymologies && etymologies.length > 0) {
          word.has_etymology = true;

          word.etymology = await Promise.all(
            etymologies.map(async (etym) => {
              const etymObj = {
                etymology_type: etym.etymology_type,
                loanword_id: etym.loanword_id,
                etymology_note: etym.note,
                uncertain: etym.uncertain,
              };

              if (etym.mother_word_id) {
                etymObj.mother_word = await getWord(
                  etym.mother_word_id,
                  "word"
                );
                etymObj.mother_word_meaning = await getWord(
                  etym.mother_word_id,
                  "meaning"
                );
                etymObj.mother_word_language = await getWord(
                  etym.mother_word_id,
                  "language"
                );
                etymObj.mother_language_is_proto = await getWord(
                  etym.mother_word_id,
                  "proto"
                );
                etymObj.mother_language_word_type = await getWord(
                  etym.mother_word_id,
                  "type"
                );
                etymObj.mother_word_id = etym.mother_word_id;
              }

              if (etym.first_element_id) {
                etymObj.first_element = await getWord(
                  etym.first_element_id,
                  "word"
                );
                etymObj.first_element_meaning = await getWord(
                  etym.first_element_id,
                  "meaning"
                );
                etymObj.first_element_word_type = await getWord(
                  etym.first_element_id,
                  "type"
                );
              }

              if (etym.second_element_id) {
                etymObj.second_element = await getWord(
                  etym.second_element_id,
                  "word"
                );
                etymObj.second_element_meaning = await getWord(
                  etym.second_element_id,
                  "meaning"
                );
                etymObj.second_element_word_type = await getWord(
                  etym.second_element_id,
                  "type"
                );
              }

              if (etym.third_element_id) {
                etymObj.third_element = await getWord(
                  etym.third_element_id,
                  "word"
                );
                etymObj.third_element_meaning = await getWord(
                  etym.third_element_id,
                  "meaning"
                );
                etymObj.third_element_word_type = await getWord(
                  etym.third_element_id,
                  "type"
                );
              }

              if (etym.loanword_id) {
                etymObj.loan = await getWord(etym.loanword_id, "word");
                etymObj.loan_meaning = await getWord(
                  etym.loanword_id,
                  "meaning"
                );
                etymObj.loan_word_type = await getWord(
                  etym.loanword_id,
                  "type"
                );
                etymObj.loan_language = await getWord(
                  etym.loanword_id,
                  "language"
                );
                etymObj.loan_language_is_proto = await getWord(
                  etym.loanword_id,
                  "proto"
                );
              }

              return etymObj;
            })
          );

        

          if (
            word.etymology?.[0]?.mother_word_id ||
            word.etymology?.[0]?.loanword_id
          ) {
            word.etymology_chain = await recursiveEtymology(word.word_id);
          }

          // Get the ancestor etymology row (first 'fromMother' one)
          const ancestor = etymologies.find(
            (e) => e.etymology_type === "fromMother"
          );

          if (ancestor?.mother_word_id) {
            // Step 1: Get all etymology rows that reference this mother_word_id
            const { data: cognateEtyms, error: cognateEtymsError } =
              await supabase
                .from("etymology")
                .select("*")
                .or(
                  `mother_word_id.eq.${ancestor.mother_word_id},loanword_id.eq.${ancestor.mother_word_id}`
                )
                .neq("word_id", word.word_id);

            if (cognateEtymsError) {
              console.error("Error fetching cognates:", cognateEtymsError);
              word.cognates = [];
            } else {
              // Step 2: Fetch the full dictionary data for each cognate word_id
              const cognateWords = await Promise.all(
                cognateEtyms.map(async (etym) => {
                  const { data: wordRow, error: wordErr } = await supabase
                    .from("dictionary")
                    .select("*")
                    .eq("word_id", etym.word_id)
                    .single();

                  if (wordErr || !wordRow) return null;

                  // Get language name
                  const { data: langRow, error: langErr } = await supabase
                    .from("languages")
                    .select("language_name")
                    .eq("language_id", wordRow.language_id)
                    .single();

                  const languageName = langErr ? null : langRow.language_name;

                  // Gather all meanings
                  const allMeanings = [
                    wordRow.noun_meaning,
                    wordRow.num_meaning,
                    wordRow.verb_meaning,
                    wordRow.adj_meaning,
                    wordRow.pron_meaning,
                    wordRow.adv_meaning,
                    wordRow.adp_meaning,
                    wordRow.interj_meaning,
                    wordRow.conj_meaning,
                    wordRow.part_meaning,
                  ]
                    .filter((arr) => Array.isArray(arr))
                    .flat();

                  return {
                    word_id: wordRow.word_id,
                    word: wordRow.word,
                    word_type: wordRow.word_type,
                    is_proto: wordRow.is_proto,
                    language_name: languageName,
                    meaning: allMeanings,
                  };
                })
              );

              word.cognates = cognateWords.filter(Boolean); // remove any nulls from failed lookups
            }
          } else {
            word.cognates = [];
          }
        } else {
          word.has_etymology = false;
          word.etymology = [];
        }

        const { data: descendantEtyms, error: descendantEtymsError } =
          await supabase
            .from("etymology")
            .select("*")
            .or(
              `mother_word_id.eq.${word.word_id},loanword_id.eq.${word.word_id}`
            );

        if (descendantEtymsError) {
          console.error(
            `Error fetching descendants for word_id ${word.word_id}:`,
            descendantEtymsError
          );
          word.descendants = [];
          continue;
        }

        const descendants = await Promise.all(
          descendantEtyms.map(async (etym) => {
            const { data: entryData, error: entryError } = await supabase
              .from("dictionary")
              .select(
                `
        word_id,
        word,
        word_type,
        language_id,
        noun_meaning,
        num_meaning,
        verb_meaning,
        adj_meaning,
        adv_meaning,
        adp_meaning,
        pron_meaning,
        interj_meaning,
        conj_meaning,
        part_meaning,
        affix_meaning
      `
              )
              .eq("word_id", etym.word_id)
              .single();

            if (entryError || !entryData) return null;

            const meanings = [
              ...(entryData.noun_meaning || []),
              ...(entryData.num_meaning || []),
              ...(entryData.verb_meaning || []),
              ...(entryData.adj_meaning || []),
              ...(entryData.adv_meaning || []),
              ...(entryData.adp_meaning || []),
              ...(entryData.pron_meaning || []),
              ...(entryData.interj_meaning || []),
              ...(entryData.conj_meaning || []),
              ...(entryData.part_meaning || []),
              ...(entryData.affix_meaning || []),
            ];

            const { data: langData, error: langError } = await supabase
              .from("languages")
              .select("language_name, is_proto")
              .eq("language_id", entryData.language_id)
              .single();

            return {
              descendant_word_id: etym.word_id,
              etymology_type: etym.etymology_type,
              word: entryData.word,
              word_type: entryData.word_type,
              meaning: meanings.join(", "),
              language_name: langData?.language_name || null,
              is_proto: langData?.is_proto ?? null,
            };
          })
        );

        word.descendants = descendants.filter(Boolean); // remove nulls

        const { data: derivationEtyms, error: derivationEtymsError } =
          await supabase
            .from("etymology")
            .select("*")
            .or(
              `first_element_id.eq.${word.word_id},second_element_id.eq.${word.word_id},third_element_id.eq.${word.word_id}`
            )
            .eq("etymology_type", "derived");

        if (derivationEtymsError) {
          console.error(
            `Error fetching derivations for word_id ${word.word_id}:`,
            derivationEtymsError
          );
          word.derivations = [];
        } else {
          const derivations = await Promise.all(
            derivationEtyms.map(async (etym) => {
              const { data: entryData, error: entryError } = await supabase
                .from("dictionary")
                .select(
                  `word_id, word, word_type, language_id,
           noun_meaning, num_meaning, verb_meaning, adj_meaning,
           adv_meaning, adp_meaning, pron_meaning,
           interj_meaning, conj_meaning, part_meaning,
           affix_meaning`
                )
                .eq("word_id", etym.word_id)
                .single();

              if (entryError || !entryData) return null;

              const allMeanings = [
                ...(entryData.noun_meaning || []),
                ...(entryData.num_meaning || []),
                ...(entryData.verb_meaning || []),
                ...(entryData.adj_meaning || []),
                ...(entryData.adv_meaning || []),
                ...(entryData.adp_meaning || []),
                ...(entryData.pron_meaning || []),
                ...(entryData.interj_meaning || []),
                ...(entryData.conj_meaning || []),
                ...(entryData.part_meaning || []),
                ...(entryData.affix_meaning || []),
              ];

              const { data: langData, error: langError } = await supabase
                .from("languages")
                .select("language_name, is_proto")
                .eq("language_id", entryData.language_id)
                .single();

              return {
                word_id: entryData.word_id,
                word: entryData.word,
                word_type: entryData.word_type,
                meaning: allMeanings.join(", "),
                language_name: langData?.language_name || null,
                is_proto: langData?.is_proto ?? null,
                etymology_type: etym.etymology_type,
                is_first_element: etym.first_element_id === word.word_id,
                is_second_element: etym.second_element_id === word.word_id,
                is_third_element: etym.third_element_id === word.word_id,
              };
            })
          );

          word.derivations = derivations.filter(Boolean);
        }
      }

      allData.sort((a, b) => a.word.localeCompare(b.word));
      res.status(200).json(allData);
    } catch (error) {
      console.error("Error getting all words:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
