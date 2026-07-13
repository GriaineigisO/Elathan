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
        languageName,
        motherLanguageId,
        daughterLanguageIds,
        removedDaughterLanguageIds,
        isProto,
        wordForms,
        addedGroups,
        groupsToBeRemoved,
        newGroups,
        privacy,
        permission,
        collaborators,
        addedTagGroups,
        spelling,
        selectedSoundChanges,
        allCategoryValues
      } = req.body;

      const { data, error } = await supabase
        .from("languages")
        .update({
          language_name: languageName,
          mother_language_id: motherLanguageId,
          is_proto: isProto,
          spelling: spelling,
          sound_changes: selectedSoundChanges,
          word_forms:
            Array.isArray(wordForms) && wordForms.length > 0 ? wordForms : null,
            privacy: privacy,
            collaborators: collaborators,
            permission: permission,
            tags: addedTagGroups,
        })
        .eq("language_id", id)
        .single();

      if (error) {
        console.error("Error editing language:", error);
        res.status(500).json({ message: "Error editing language" });
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
              "Error editing language's daughters:",
              editDaughtersError
            );
            res
              .status(500)
              .json({ message: "Error editing language's daughters" });
          }
        }
      }

      if (removedDaughterLanguageIds) {
        for (const daughter of removedDaughterLanguageIds) {
          const { data: editDaughters, editDaughtersError } = await supabase
            .from("languages")
            .update({
              mother_language_id: null,
            })
            .eq("language_id", daughter);

          if (editDaughtersError) {
            console.error(
              "Error editing language's daughters:",
              editDaughtersError
            );
            res
              .status(500)
              .json({ message: "Error editing language's daughters" });
          }
        }
      }

      if (newGroups) {
        for (const group of newGroups) {
          // Remove groups key from each language
          const cleanedLanguages = (group.languages || []).map(
            ({ groups, ...rest }) => rest
          );

          // Remove groups key from the group itself
          const { groups, ...cleanedGroup } = group;
          cleanedGroup.languages = cleanedLanguages;

          const { data: addLanguageToGroup, error: addLanguageToGroupError } =
            await supabase
              .from("groups")
              .update({
                languages:
                  cleanedLanguages.length > 0 ? cleanedLanguages : null,
              })
              .eq("group_id", cleanedGroup.group_id)
              .single();

          if (addLanguageToGroupError) {
            console.error(
              "Failed to update group:",
              cleanedGroup.group_id,
              addLanguageToGroupError
            );
          }
        }
      }

      if (groupsToBeRemoved) {
        for (const group of groupsToBeRemoved) {
          const languages = group.languages;

          const filter = languages.filter(
            (language) => language.language_id !== id
          );

          const {
            data: deleteLanguageFromGroup,
            error: deleteLanguageFromGroupError,
          } = await supabase
            .from("groups")
            .update({
              languages: filter,
            })
            .eq("group_id", group.group_id)
            .single();
        }
      }

      res.status(200).json({ message: "Language edited successfully" });
    } catch (error) {
      console.error("Error adding editing language:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
