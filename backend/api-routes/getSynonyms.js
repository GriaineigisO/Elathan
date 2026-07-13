import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { id } = req.body;

      //identify which language the word is from
      const { data, error } = await supabase
        .from("dictionary")
        .select("*")
        .eq("word_id", id);

      if (error) {
        console.error("Error fetching word:", etymError);
        return res.status(500).json({ message: "Failed to fetch word" });
      }

      //Get all words from the language
      const { data: words, error: wordError } = await supabase
        .from("dictionary")
        .select("*")
        .eq("language_id", data[0].language_id);

      if (wordError) {
        console.error("Error fetching word:", etymError);
        return res.status(500).json({ message: "Failed to fetch word" });
      }

      //match meanings to meanings of other words

      let synonyms = [];

      const matchWords = (arr1, arr2, word, synonym) => {
        if (arr1 && arr2) {
          const isMatch = arr1.some((item) => arr2.includes(item));

          if (
            isMatch &&
            synonym !== word.word &&
            !synonyms.includes(word.word)
          ) {
            //exclude the word from matching with itself
            synonyms.push(word);
          }
        }
      };

      words.forEach((word) => {
        if (word.noun_meaning && data[0].noun_meaning) {
          matchWords(
            word.noun_meaning,
            data[0].noun_meaning,
            word,
            data[0].word
          );
        }

        if (word.num_meaning && data[0].num_meaning) {
          matchWords(
            word.num_meaning,
            data[0].num_meaning,
            word,
            data[0].word
          );
        }

        if (word.verb_meaning && data[0].verb_meaning) {
          matchWords(
            word.verb_meaning,
            data[0].verb_meaning,
            word,
            data[0].word
          );
        }

        if (word.adj_meaning && data[0].adj_meaning) {
          matchWords(word.adj_meaning, data[0].adj_meaning, word, data[0].word);
        }

        if (word.adv_meaning && data[0].adv_meaning) {
          matchWords(word.adv_meaning, data[0].adv_meaning, word, data[0].word);
        }

        if (word.adp_meaning && data[0].adp_meaning) {
          matchWords(word.adp_meaning, data[0].adp_meaning, word, data[0].word);
        }

        if (word.conj_meaning && data[0].conj_meaning) {
          matchWords(
            word.conj_meaning,
            data[0].conj_meaning,
            word,
            data[0].word
          );
        }

        if (word.interj_meaning && data[0].interj_meaning) {
          matchWords(
            word.interj_meaning,
            data[0].interj_meaning,
            word,
            data[0].word
          );
        }

        if (word.pron_meaning && data[0].pron_meaning) {
          matchWords(
            word.part_meaning,
            data[0].part_meaning,
            word,
            data[0].word
          );
        }

        if (word.part_meaning && data[0].part_meaning) {
          matchWords(
            word.part_meaning,
            data[0].part_meaning,
            word,
            data[0].word
          );
        }

        if (word.affix_meaning && data[0].affix_meaning) {
          matchWords(
            word.affix_meaning,
            data[0].affix_meaning,
            word,
            data[0].word
          );
        }
      });

      synonyms.forEach((synonym) => {
        let synonymMeaning = [];

        const mergeMeanings = (meaning) => {
          if (meaning) {
            meaning.forEach((i) => synonymMeaning.push(i));
          }
        };

        if (synonym.noun_meaning) mergeMeanings(synonym.noun_meaning);
        if (synonym.num_meaning) mergeMeanings(synonym.num_meaning);
        if (synonym.verb_meaning) mergeMeanings(synonym.verb_meaning);
        if (synonym.adj_meaning) mergeMeanings(synonym.adj_meaning);
        if (synonym.adp_meaning) mergeMeanings(synonym.adp_meaning);
        if (synonym.part_meaning) mergeMeanings(synonym.part_meaning);
        if (synonym.pron_meaning) mergeMeanings(synonym.pron_meaning);
        if (synonym.conj_meaning) mergeMeanings(synonym.conj_meaning);
        if (synonym.interj_meaning) mergeMeanings(synonym.interj_meaning);
        if (synonym.affix_meaning) mergeMeanings(synonym.affix_meaning);
        if (synonym.adv_meaning) mergeMeanings(synonym.adv_meaning);

        synonym["meaning"] = synonymMeaning;
      });

      res.status(200).json(synonyms);
    } catch (error) {
      console.error("Error getting etymology:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
