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
      const {
        id,
        userId,
        languageName,
        motherLanguageId,
        daughterLanguageIds,
        removedDaughterLanguageIds,
        isProto,
        wordForms,
        addedGroups,
      } = req.body;

      const { data, error } = await supabase
        .from("languages")
        .insert([
          {
            user_id: userId,
            language_id: id,
            language_name: languageName,
            mother_language_id: motherLanguageId,
            is_proto: isProto ? isProto : false,
            word_forms:
              Array.isArray(wordForms) && wordForms.length > 0
                ? wordForms
                : null,
          },
        ])
        .single();

      if (error) {
        console.error("Error adding language:", error);
        res.status(500).json({ message: "Error adding language" });
      }

      if (daughterLanguageIds) {
        for (const daughter of daughterLanguageIds) {
          const { data: editDaughters, editDaughtersError } = await supabase
            .from("languages")
            .update({
              mother_language_id: id,
            })
            .eq("language_id", daughter);

          if (editDaughtersError) {
            console.error(
              "Error adding language's daughters:",
              editDaughtersError
            );
            res
              .status(500)
              .json({ message: "Error added language's daughters" });
          }
        }
      }


      if (addedGroups) {
        for (const group of addedGroups) {
          const { data: addLanguageToGroup, error: addLanguageToGroupError } =
            await supabase
              .from("groups")
              .update({
                languages: group.languages?.length > 0 ? group.languages : null,
              })
              .eq("group_id", group.group_id)
              .single();

          if (addLanguageToGroupError) {
            console.error(
              "Failed to update group:",
              group.group_id,
              addLanguageToGroupError
            );
          }
        }
      }

      res.status(200).json({ message: "Language added successfully" });
    } catch (error) {
      console.error("Error adding editing language:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
