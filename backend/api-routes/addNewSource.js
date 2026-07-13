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
      const { languageId, sourceName, sourceLink } = req.body;

      const { data, error } = await supabase
        .from("languages")
        .select("sources")
        .eq("language_id", Number(languageId));

      if (error) {
        console.error("Error getting sources:", error);
        res.status(500).json({ message: "Error getting sources" });
      }

      const sources = data[0].sources;
      const newSource = {
        name: sourceName,
        link: sourceLink,
        id: Date.now()
      }

      sources.push(newSource)

      const { addSource, addSourceError } = await supabase
        .from("languages")
        .update({ sources: sources })
        .eq("language_id", Number(languageId));

      if (addSourceError) {
        console.error("Error adding source:", error);
        res.status(500).json({ message: "Error adding source" });
      }

      res.status(200).json(data);
    } catch (error) {
      console.error("Error getting sources:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
