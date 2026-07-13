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
      const {
        id,
        etymologyType,
        word_id,
        motherWord,
        firstElementId,
        secondElementId,
        thirdElementId,
        loanWordId,
        note,
      } = req.body;

      if (etymologyType === "fromMother") {
        const { data, error } = await supabase.from("etymology").insert([
          {
            etymology_id: Date.now(),
            word_id: word_id,
            note: note,
            etymology_type: etymologyType,
            mother_word_id: motherWord.word_id,
          },
        ]);

        if (error) {
          console.error("Error:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(200).json({ message: "Etymology added successfully" });
      }

      if (etymologyType === "derived") {
        const { data, error } = await supabase.from("etymology").insert([
          {
            etymology_id: Date.now(),
            word_id: word_id,
            note: note,
            etymology_type: etymologyType,
            first_element_id: firstElementId,
            second_element_id: secondElementId,
            third_element_id: thirdElementId,
          },
        ]);

        if (error) {
          console.error("Error:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(200).json({ message: "Etymology added successfully" });
      }

      if (etymologyType === "loaned") {
        const { data, error } = await supabase.from("etymology").insert([
          {
            etymology_id: Date.now(),
            word_id: word_id,
            note: note,
            etymology_type: etymologyType,
            loanword_id: loanWordId,
          },
        ]);

        if (error) {
          console.error("Error:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(200).json({ message: "Etymology added successfully" });
      }

      if (etymologyType === "other") {
        const { data, error } = await supabase.from("etymology").insert([
          {
            etymology_id: Date.now(),
            word_id: word_id,
            note: note,
            etymology_type: etymologyType,
            mother_word_id: null,
          },
        ]);

        if (error) {
          console.error("Error:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(200).json({ message: "Etymology added successfully" });
      }
    } catch (error) {
      console.error("Error adding editing language:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
