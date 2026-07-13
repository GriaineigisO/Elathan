import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { id, title, text, translation } = req.body;

      // Step 1: Get current corpus array
      const { data: language, error: fetchError } = await supabase
        .from("languages")
        .select("corpus")
        .eq("language_id", id)
        .single();

      const newCorpusItem = {
        id: Date.now(),
        title: title,
        text: text,
        translation: translation,
      };

  

      const currentCorpus = language.corpus ? language.corpus : [];
      const updatedCorpus = [...currentCorpus, newCorpusItem];      

      const { data, error } = await supabase
        .from("languages")
        .update(
          {
            corpus: updatedCorpus,
          })
        .eq("language_id", id)
        .single();

      if (error) {
        console.error("Error adding text:", error);
        res.status(500).json({ message: "Error adding text" });
      }

      res.status(200).json({ message: "text succesfully added" });
    } catch (error) {
      console.error("Error adding new text:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
