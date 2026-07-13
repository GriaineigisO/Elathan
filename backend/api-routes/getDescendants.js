import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";


export default async function handler(req, res) {
  

  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { id } = req.body;

      const supabase = createClient(supabaseUrl, supabaseKey);

      // Step 1: Get all etymology rows for this word
      const { data: etymologyRows, error: etymError } = await supabase
        .from("etymology")
        .select("*")
        .or(`mother_word_id.eq.${id},loanword_id.eq.${id}`);

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
            .eq("word_id", wordId);

          if (error || !data || data.length === 0) {
            console.warn(`No dictionary data found for word_id ${wordId}`);
            return {
              word: null,
              meaning: null,
              word_id: wordId,
              language_id: null,
            };
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

          const { data: languageName, error: languageNameError } =
            await supabase
              .from("languages")
              .select("language_name, is_proto")
              .eq("language_id", data[0].language_id);

          return {
            word: entry.word,
            meaning: meanings.join(", "),
            noun_meaning: entry.noun_meaning || null,
            num_meaning: entry.num_meaning || null,
            verb_meaning: entry.verb_meaning || null,
            adj_meaning: entry.adj_meaning || null,
            adv_meaning: entry.adv_meaning || null,
            adp_meaning: entry.adp_meaning || null,
            pron_meaning: entry.pron_meaning || null,
            part_meaning: entry.part_meaning || null,
            interj_meaning: entry.interj_meaning || null,
            conj_meaning: entry.conj_meaning || null,
            affix_meaning: entry.affix_meaning || null,
            word_type: entry.word_type,
            word_id: wordId,
            language_name: languageName[0].language_name,
            is_proto: languageName[0].is_proto,
          };
        };

        // -- Fetch dictionary data for all linked words --
        const descendant = await fetchWordData(etym.word_id);

        // -- Construct enriched result --
        results.push({
          descendant_word_id: etym.word_id,
          etymology_type: etym.etymology_type,
          word_id: descendant.word_id,
          word: descendant.word,
          meaning: descendant.meaning,
          noun_meaning: descendant.noun_meaning,
          num_meaning: descendant.num_meaning,
            verb_meaning: descendant.verb_meaning,
            adj_meaning: descendant.adj_meaning,
            adv_meaning: descendant.adv_meaning,
            adp_meaning: descendant.adp_meaning,
            pron_meaning: descendant.pron_meaning,
            part_meaning: descendant.part_meaning,
            interj_meaning: descendant.interj_meaning,
            conj_meaning: descendant.conj_meaning,
            affix_meaning: descendant.affix_meaning,
          word_type: descendant.word_type,
          language_name: descendant.language_name,
          is_proto: descendant.is_proto,
        });
      }

      res.status(200).json(results);
    } catch (error) {
      console.error("Error getting etymology:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
