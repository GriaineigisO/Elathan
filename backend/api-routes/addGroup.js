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
      const { groupName, addedLanguages, wordForms, userId } = req.body;

      //only the language_ids of each language are needed
      const language = [];
      addedLanguages.forEach((lang) => {
        language.push(lang.language_id);
      });

      const { data, error } = await supabase
        .from("groups")
        .insert([
          {
            group_id: Date.now(),
            user_id: userId,
            group_name: groupName,
            word_forms: wordForms,
            languages:
              Array.isArray(language) && language.length > 0 ? language : null,
          },
        ])
        .single();

      if (error) {
        console.error("Error adding group:", error);
        res.status(500).json({ message: "Error adding group" });
      }

      res.status(200).json({ message: "Language added successfully" });
    } catch (error) {
      console.error("Error adding editing language:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
