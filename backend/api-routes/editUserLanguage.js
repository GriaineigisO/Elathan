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
        language
      } = req.body;


      const { data, error } = await supabase
        .from("users")
        .update(
          {
            interface_language: language,
          },
        )
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error editing user interface language:", error);
        res.status(500).json({ message: "Error editing user interface language" });
      }

      res.status(200).json({ message: "user interface language edited" });
    } catch (error) {
      console.error("Error editing user interface language:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
