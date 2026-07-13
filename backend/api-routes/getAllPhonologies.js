import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      //first, check if a template of the same name already exists
      const { data, error } = await supabase
        .from("phonologyTemplates")
        .select("*");

      if (error) {
        console.log("Error getting all phonologies:", error);
      }

      res.status(200).json({ data });
    } catch (error) {
      console.error("Error getting all phonologies:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
