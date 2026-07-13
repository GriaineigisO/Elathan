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
        .from("languages")
        .select("grammar")
        .eq("language_id", Number(id));

      if (error) {
        console.error("Error getting grammar:", error);
        res.status(500).json({ message: "Error getting grammar" });
      }
      
      res.status(200).json(data[0]);
    } catch (error) {
      console.error("Error getting language:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
