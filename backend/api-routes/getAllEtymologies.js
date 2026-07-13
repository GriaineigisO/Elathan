import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client

    try {
      const { id, visibleWords } = req.body;

      const supabase = createClient(supabaseUrl, supabaseKey);

      // Step 1: Get all words in the language
      const { data: getWords, error: getWordsError } = await supabase
        .from("dictionary")
        .select("*")
        .eq("language_id", id);

      if (getWordsError) {
        console.error("Error fetching words:", getWordsError);
        return res.status(500).json({ message: "Failed to fetch words" });
      }

      //step 2. get all word ids in an array
      const allWordIds = [];
      getWords.forEach((word) => {
        allWordIds.push(word.word_id);
      });

      //step 3: get all etymologies
      const { data: etymologyRows, error: getEtymError } = await supabase
        .from("etymology")
        .select("*")
        .in("word_id", allWordIds);

      if (getEtymError) {
        console.error("Error fetching etymologies:", getEtymError);
        return res.status(500).json({ message: "Failed to fetch etymologies" });
      }

      //step 4:
      const results = [];
      const etymologyWordIds = [];

      for (const etym of etymologyRows) {
        etymologyWordIds.push(etym.word_id);

        const mother = getWords.filter(
          (word) => word.word_id === etym.mother_word_id,
        );

        const first = getWords.filter(
          (word) => word.word_id === etym.first_element_id,
        );
        const second = getWords.filter(
          (word) => word.word_id === etym.second_element_id,
        );
        const third = getWords.filter(
          (word) => word.word_id === etym.third_element_id,
        );
        const loan = getWords.filter(
          (word) => word.word_id === etym.loanword_id,
        );

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

      for (let i = 0; i < visibleWords.length; i++) {
        //check if word has an etymology
        if (etymologyWordIds.includes(visibleWords[i].word_id)) {
          visibleWords[i].etymology_type = results.etymology_type;
          visibleWords[i].note = results.note;

          visibleWords[i].first_element_word_id = results.first_element_word_id;
          visibleWords[i].first_element_word = results.first_element_word;
          visibleWords[i].first_element_word_meaning =
            results.first_element_word_meaning;
          visibleWords[i].first_element_word_type =
            results.first_element_word_type;

          visibleWords[i].second_element_word_id =
            results.second_element_word_id;
          visibleWords[i].second_element_word = results.second_element_word;
          visibleWords[i].second_element_word_meaning =
            results.second_element_word_meaning;
          visibleWords[i].second_element_word_type =
            results.second_element_word_type;

          visibleWords[i].third_element_word_id = results.third_element_word_id;
          visibleWords[i].third_element_word = results.third_element_word;
          visibleWords[i].third_element_word_meaning =
            results.third_element_word_meaning;
          visibleWords[i].third_element_word_type =
            results.third_element_word_type;
        } else {
          visibleWords[i].etymology_type = "not_derived";
        }
      }

      res.status(200).json(visibleWords);
    } catch (error) {
      console.error("Error getting etymology:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
