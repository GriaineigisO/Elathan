import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const allowedOrigins = [
  "http://localhost:5173",
  "https://elathadictionary.com",
];

export default async function handler(req, res) {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ✅ Exit early for preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { languageId } = req.body;

      const { data, error } = await supabase
        .from("languages")
        .select("word_forms")
        .eq("language_id", Number(languageId));

      if (error) {
        console.error("Error getting word:", error);
        return res.status(500).json({ message: "Error getting word" });
      }

      const { data: getGroupWordForms } = await supabase
        .from("groups")
        .select("word_forms")
        .filter(
          "languages",
          "cs",
          JSON.stringify([{ language_id: Number(languageId) }])
        );

      const dataForms = data.flatMap((d) =>
        d && d.word_forms ? d.word_forms : []
      );

      const groupWordForms = getGroupWordForms.flatMap((d) =>
        d && d.word_forms ? d.word_forms : []
      );

      if (dataForms.length > 0 && groupWordForms.length > 0) {
        const allWordForms = dataForms.concat(groupWordForms);

        return res.status(200).json(allWordForms);
      } else if (dataForms.length === 0 && groupWordForms.length > 0) {
        return res.status(200).json(groupWordForms);
      } else if (dataForms.length > 0 && groupWordForms.length === 0) {
        return res.status(200).json(dataForms);
      } else {
        return res.status(200).json([]);
      }
    } catch (error) {
      console.error("Error in catch:", error);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
