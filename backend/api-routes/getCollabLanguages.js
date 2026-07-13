import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { userId } = req.body;

      const { data, error } = await supabase
        .from("languages")
        .select("*")
        .not("collaborators", "eq", JSON.stringify([]));

      if (error) {
        console.error("Error getting collab languages:", error);
        return res
          .status(500)
          .json({ message: "Error getting collab languages" }); // ✅ stop early
      }

      let collabLangs = [];
      data.forEach((language) => {
        if (language.collaborators[0].user_id == userId) {
          collabLangs.push(language);
        }
      });

      collabLangs.sort((a, b) => a.language_name.localeCompare(b.language_name));
     

      return res.status(200).json(collabLangs); // ✅ always return
    } catch (error) {
      console.error("Error getting languages:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}
