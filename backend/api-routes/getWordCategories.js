import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const allowedOrigins = [
  "http://localhost:5173",
  "https://elathadictionary.com",
];

// CORS Options
const corsOptions = {
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default async function handler(req, res) {
  // Enable CORS for all requests (including OPTIONS)
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", corsOptions.methods.join(", "));
  res.setHeader(
    "Access-Control-Allow-Headers",
    corsOptions.allowedHeaders.join(", ")
  );

  // Handle OPTIONS method (for CORS preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { languageId } = req.body;

      const { data, error } = await supabase
        .from("languages")
        .select("word_categories")
        .eq("language_id", Number(languageId));

      if (error) {
        console.error("Error getting word:", error);
        res.status(500).json({ message: "Error getting word" });
      }

      const { data: getGroupWordCategory, error: getGroupWordCategoryError } =
        await supabase
          .from("groups")
          .select("word_categories")
          .filter(
            "languages",
            "cs",
            JSON.stringify([{ language_id: Number(languageId) }])
          );

      const filteredArr = getGroupWordCategory.filter(
        (cat) => cat.word_categories.length > 0
      );

      //if wordForms come form both the language and group
      if (data[0].word_categories && filteredArr.length > 0) {
        const allWordCategories = data.concat(filteredArr);
        if (allWordCategories.length > 0) {
          res.status(200).json(allWordCategories);
        } else {
          res.status(200).json([]);
        }
      } else if (!data[0].word_categories && filteredArr[0]) {
        res.status(200).json(filteredArr);
      } else if (data[0].word_categories && filteredArr.length === 0) {
        res.status(200).json(data);
      } else {
        res.status(200).json([]);
      }
    } catch (error) {
      console.error("Error getting word:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
