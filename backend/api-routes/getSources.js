import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { languageId } = req.body;

      const { data, error } = await supabase
        .from("languages")
        .select("sources")
        .eq("language_id", Number(languageId));

      if (error) {
        console.error("Error getting sources:", error);
        res.status(500).json({ message: "Error getting sources" });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error("Error getting sources:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
