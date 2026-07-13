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
        userId
      } = req.body;


      const { data, error } = await supabase
        .from("users")
        .select("interface_language")
        .eq("user_id", userId)
        .single();


      if (error) {
        console.error("Error getting user interface language:", error);
        res.status(500).json({ message: "Error getting user interface language" });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error getting user interface language:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
