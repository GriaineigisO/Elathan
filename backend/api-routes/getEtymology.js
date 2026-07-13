import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";



export default async function handler(req, res) {

  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client

    try {
      const { id } = req.body;

      const supabase = createClient(supabaseUrl, supabaseKey);

      // Step 1: Get all etymology rows for this word
      const { data: etymologyRows, error: etymError } = await supabase
        .from("etymology")
        .select("*")
        .eq("word_id", id);

      if (etymError) {
        console.error("Error fetching etymology rows:", etymError);
        return res
          .status(500)
          .json({ message: "Failed to fetch etymology rows" });
      }

      // Step 2: For each mother_word_id, get the dictionary entry
      const results = [];

      for (const etym of etymologyRows) {
        // -- Helper to fetch and format dictionary data --
        const fetchWordData = async (wordId) => {
          if (!wordId) return { word: null, meaning: null, word_id: null };

          const { data, error } = await supabase
            .from("dictionary")
            .select(
              `
      word,
      word_type,
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
            .eq("word_id", wordId);

          if (error || !data || data.length === 0) {
            console.warn(`No dictionary data found for word_id ${wordId}`);
            return { word: null, meaning: null, word_id: wordId };
          }

          const entry = data[0];

          const meanings = [
            ...(entry.noun_meaning || []),
            ...(entry.num_meaning || []),
            ...(entry.verb_meaning || []),
            ...(entry.adj_meaning || []),
            ...(entry.adv_meaning || []),
            ...(entry.adp_meaning || []),
            ...(entry.pron_meaning || []),
            ...(entry.interj_meaning || []),
            ...(entry.conj_meaning || []),
            ...(entry.part_meaning || []),
            ...(entry.affix_meaning || []),
          ];

          return {
            word: entry.word,
            meaning: meanings.join(", "),
            word_id: wordId,
            word_type: entry.word_type,
          };
        };

        // -- Fetch dictionary data for all linked words --
        const mother = await fetchWordData(etym.mother_word_id);
        const first = await fetchWordData(etym.first_element_id);
        const second = await fetchWordData(etym.second_element_id);
        const third = await fetchWordData(etym.third_element_id);
        const loan = await fetchWordData(etym.loanword_id);

        // -- Construct enriched result --
        results.push({
          etymology_id: etym.etymology_id,
          word_id: etym.word_id,

          mother_word_id: mother.word_id,
          mother_word: mother.word,
          mother_word_meaning: mother.meaning,
          mother_word_type: mother.word_type,

          first_element_word_id: first.word_id,
          first_element_word: first.word,
          first_element_word_meaning: first.meaning,
          first_element_word_type: first.word_type,

          second_element_word_id: second.word_id,
          second_element_word: second.word,
          second_element_word_meaning: second.meaning,
          second_element_word_type: second.word_type,

          third_element_word_id: third.word_id,
          third_element_word: third.word,
          third_element_word_meaning: third.meaning,
          third_element_word_type: third.word_type,

          loanword_id: loan.word_id,
          loanword: loan.word,
          loanword_meaning: loan.meaning,
          loanword_type: loan.word_type,

          note: etym.note,
          uncertain: etym.uncertain,
          etymology_type: etym.etymology_type,
        });
      }
      res.status(200).json(results);
    } catch (error) {
      console.error("Error getting etymology:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
