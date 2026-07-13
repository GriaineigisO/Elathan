// backend/handleEnglishWords.js

import englishWords from "../englishWords.js"; // <-- large file loaded once
import coreEnglishWords from "../coreEnglishWords.js";
import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const allowedOrigins = [
  "http://localhost:5173",
  "https://elathadictionary.com",
];

export default async function handler(req, res) {
  const { themes, maxWords } = req.body;


  //get the user-specified amount of random words from the larger non-core wordset
  const extraWords = [];
  if (maxWords > 0) {
    for (let i = 0; i < maxWords; i++) {
      let randomNum = Math.floor(Math.random() * englishWords.length);
      extraWords.push(englishWords[randomNum]);

      //remove chosen word from englishWords to prevent duplicates
      englishWords.splice(randomNum, 1);
    }
  }
  //now merge both words sets into one
  const combinedWordsets = coreEnglishWords.concat(extraWords);

  const filtered = combinedWordsets.filter((entry) => {


    // CASE 1 → word has no themes → include it
    if (!entry.themes) return true;

    // CASE 2 → word has themes → ensure *all* of them are allowed
    // meaning: there must not be ANY theme outside user selection
    const hasForbidden = entry.themes.some((t) => !themes.includes(t));

    return !hasForbidden; // include only if no forbidden themes
  });



  res.json(filtered);
}
