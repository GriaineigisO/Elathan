import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const {
        userId,
        languageName,
        translations,
        username
      } = req.body;


      const { data, error } = await supabase
        .from("interfaceLanguages")
        .insert([
          {
            id: Date.now(),
            language_name: languageName,
            translations: translations,
            creator_id: userId,
            creator_username: username
          },
        ])
        .single();

      if (error) {
        console.error("Error adding interface language:", error);
        res.status(500).json({ message: "Error adding interface language" });
      }

      res.status(200).json({ message: "interface language added" });
    } catch (error) {
      console.error("Error adding interface language:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
