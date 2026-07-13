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
        .select("*")
        .eq("language_id", languageId);

      if (error) {
        console.error("Error getting language name:", error);
        res.status(500).json({ message: "Error getting language name" });
      }

      data.sort((a, b) => a.word.localeCompare(b.word));
      res.status(200).json(data[0]);
    } catch (error) {
      console.error("Error getting language name:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
