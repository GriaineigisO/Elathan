import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { textId, languageId } = req.body;

      // Step 1: Get current corpus array
      const { data: language, error: fetchError } = await supabase
        .from("languages")
        .select("corpus")
        .eq("language_id", languageId)
        .single();

      if (fetchError) {
        console.error("Error getting text:", error);
        res.status(500).json({ message: "Error getting text" });
      }

   
      let correctText = "";

      language.corpus.forEach((text) => {
        if (text.id == textId) {
            correctText = text;
        }
    })

    if (correctText) {
        res.status(200).json(correctText);
    } else {
        res.status(500).json({ message: "no matching text" });
    }


    } catch (error) {
      console.error("Error adding new text:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
