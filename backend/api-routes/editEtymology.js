import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const {
        etymologyId,
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
        const { data, error } = await supabase.from("etymology")
        .update(
          {
            word_id: word_id,
            note: note,
            etymology_type: etymologyType,
            mother_word_id: motherWord.word_id,
          })
          .eq("etymology_id", etymologyId)

        if (error) {
          console.error("Error:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(200).json({ message: "Etymology edited successfully" });
      }

      if (etymologyType === "derived") {
      
        const { data, error } = await supabase.from("etymology").update(
          {
            word_id: word_id,
            note: note,
            etymology_type: etymologyType,
            first_element_id: firstElementId,
            second_element_id: secondElementId,
            third_element_id: thirdElementId,
          }
        ).eq("etymology_id", etymologyId)

        if (error) {
          console.error("Error:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(200).json({ message: "Etymology edited successfully" });
      }

      if (etymologyType === "loaned") {
        const { data, error } = await supabase.from("etymology").update(
          {
            word_id: word_id,
            note: note,
            etymology_type: etymologyType,
            loanword_id: loanWordId,
          }
        ).eq("etymology_id", etymologyId)

        if (error) {
          console.error("Error:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(200).json({ message: "Etymology edited successfully" });
      }

      if (etymologyType === "other") {
        const { data, error } = await supabase.from("etymology").update(
          {
            word_id: word_id,
            note: note,
            etymology_type: etymologyType,
            mother_word_id: null,
          }
        ).eq("etymology_id", etymologyId)

        if (error) {
          console.error("Error:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }

    
        res.status(200).json({ message: "Etymology edited successfully" });
      }
    } catch (error) {
      console.error("Error editing etymology:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
