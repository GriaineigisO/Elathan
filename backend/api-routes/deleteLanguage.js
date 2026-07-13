import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { id } = req.body;

      //delete language from languages
      const { data, error } = await supabase
        .from("languages")
        .delete()
        .eq("language_id", id)
        .single();

      if (error) {
        console.error("Error deleting language:", error);
        res.status(500).json({ message: "Error deleting language" });
      }

      // 1) Get all word_ids from the dictionary for that language
      const { data: getWords, error: getWordsError } = await supabase
        .from("dictionary")
        .select("word_id")
        .eq("language_id", id);

      if (getWordsError) throw getWordsError;

      // 2) Extract plain array of IDs
      const wordIds = getWords.map((row) => row.word_id);





      if (wordIds.length > 0) {
        // 3) Delete all matching etymology rows
        const { data: deleteEtymologies, error: deleteEtymologiesError } =
          await supabase.from("etymology").delete().in("word_id", wordIds);

        if (deleteEtymologiesError) throw deleteEtymologiesError;
        

      }

      

      //delete all words from language
      const { data: deleteWords, error: deleteWordsError } = await supabase
        .from("dictionary")
        .delete()
        .eq("language_id", id);

      res.status(200).json({ message: "language succesfully deleted" });
    } catch (error) {
      console.error("Error deleting language:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
