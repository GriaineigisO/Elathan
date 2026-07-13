import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";


export default async function handler(req, res) {

  if (req.method === "POST") {
    const { email, password } = req.body;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { id } = req.body;

      const { data, error } = await supabase
        .from("dictionary")
        .delete()
        .eq("word_id", id)
        .single();

      if (error) {
        console.error("Error deleting word:", error);
        res.status(500).json({ message: "Error deleting word" });
      }

      //now deletr any etymologies for the word
        const { data: deleteEtym, error: deleteEtymError } = await supabase
        .from("etymology")
        .delete()
        .eq("word_id", id)

      if (deleteEtymError) {
        console.error("Error deleting word:", deleteEtymError);
        res.status(500).json({ message: "Error deleting word" });
      }


      res.status(200).json({ message: "word succesfully deleted" });
    } catch (error) {
      console.error("Error deleting word:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
