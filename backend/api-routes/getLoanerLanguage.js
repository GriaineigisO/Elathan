import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { id } = req.body;

      const { data, error } = await supabase
        .from("dictionary")
        .select("language_id, word")
        .eq("word_id", Number(id));

      if (error) {
        console.error("Error getting language:", error);
        res.status(500).json({ message: "Error getting language" });
      }


      if (data.length > 0) {
        const loanerId = data[0].language_id;

        if (loanerId) {
          const { data: getMother, error: getMotherError } = await supabase
            .from("languages")
            .select("*")
            .eq("language_id", loanerId);

          res.status(200).json({language: getMother, loanword: data[0].word});
        } else {
          res.status(200).json({
            language_id: null,
            language_name: null,
            loaner_language_id: null,
            loaned_word: data[0].word
          });
        }
      } else {
        res.status(200).json({
          language_id: null,
          language_name: null,
          loaner_language_id: null,
          loaned_word: null
        });
      }
    } catch (error) {
      console.error("Error getting loaner language:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
