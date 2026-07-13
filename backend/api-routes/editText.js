import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { textId, languageId, title, text, translation } = req.body;

      // Step 1: Get current corpus array
      const { data: language, error: fetchError } = await supabase
        .from("languages")
        .select("corpus")
        .eq("language_id", languageId)
        .single();

      const currentCorpus = language.corpus;

      currentCorpus.forEach((corpus) => {
        if (corpus.id == textId) {
          corpus.text = text,
          corpus.translation = translation,
          corpus.title = title
        }
      })

      const { data, error } = await supabase
        .from("languages")
        .update(
          {
            corpus: currentCorpus,
          })
        .eq("language_id", languageId)
        .single();

      if (error) {
        console.error("Error editing text:", error);
        res.status(500).json({ message: "Error editing text" });
      }

      res.status(200).json({ message: "text succesfully edited" });
    } catch (error) {
      console.error("Error editing text:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
