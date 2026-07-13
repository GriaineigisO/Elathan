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
        id,
        languageName,
        translations,
      } = req.body;


      const { data, error } = await supabase
        .from("interfaceLanguages")
        .update(
          {
            language_name: languageName,
            translations: translations
          },
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error editing interface language:", error);
        res.status(500).json({ message: "Error editing interface language" });
      }

      res.status(200).json({ message: "interface language edited" });
    } catch (error) {
      console.error("Error editing interface language:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
