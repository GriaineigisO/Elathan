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

    try {
      const { id } = req.body;

      const supabase = createClient(supabaseUrl, supabaseKey);

      // Step 1: find the ancestor of the word if it is not derived
      const { data: etymologyRows, error: etymError } = await supabase
        .from("etymology")
        .select("*")
        .eq("word_id", id);

      if (etymError) {
        console.error("Error fetching etymology rows:", etymError);
        return res
          .status(500)
          .json({ message: "Failed to fetch etymology rows" });
      }

      if (
        etymologyRows[0] &&
        etymologyRows[0].etymology_type === "fromMother"
      ) {
        const { data: motherRows, error: motherRowsError } = await supabase
          .from("etymology")
          .select("")
          .eq("mother_word_id", etymologyRows[0].mother_word_id);

        //now that the ancestor word has been found, find all words which also list this as mother word or loan word

        const { data: cognateRows, error: cognateRowsError } = await supabase
          .from("etymology")
          .select("*")
          .or(
            `mother_word_id.eq.${motherRows[0].mother_word_id},loanword_id.eq.${motherRows[0].mother_word_id}`
          )
          .neq("word_id", id);

        let resultArr = [];
        for (let i = 0; i < cognateRows.length; i++) {
          const { data, error } = await supabase
            .from("dictionary")
            .select("*")
            .eq("word_id", cognateRows[i].word_id);

          resultArr.push(data[0]);
        }

        let languageNameArr = [];
        for (let i = 0; i < resultArr.length; i++) {
          const { data, error } = await supabase
            .from("languages")
            .select("language_name") // Only select what you need
            .eq("language_id", resultArr[i].language_id)
            .single(); // This ensures you get one object instead of an array

          if (error) {
            console.error("Error fetching language:", error);
            resultArr[i]["language_name"] = null; // Fallback if error occurs
          } else {
            resultArr[i]["language_name"] = data.language_name;

            //concatenate all meanings
            const allMeanings = [
              resultArr[i].noun_meaning,
              resultArr[i].num_meaning,
              resultArr[i].verb_meaning,
              resultArr[i].adj_meaning,
              resultArr[i].pron_meaning,
              resultArr[i].adv_meaning,
              resultArr[i].adp_meaning,
              resultArr[i].interj_meaning,
              resultArr[i].conj_meaning,
              resultArr[i].part_meaning,
            ];

            // Filter out nulls and non-arrays, then flatten them
            const meanings = allMeanings
              .filter((m) => Array.isArray(m)) // Only keep actual arrays
              .flat(); // Combine all into one array

            resultArr[i]["meaning"] = meanings;
          }
        }

        res.json(resultArr);
      }
    } catch (error) {
      console.error("Error getting etymology:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
