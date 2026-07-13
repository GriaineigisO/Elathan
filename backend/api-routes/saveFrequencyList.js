import { createClient } from "@supabase/supabase-js";


export default async function handler(req, res) {


  if (req.method === "POST") {
    const { email, password } = req.body;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const {
        id, words
      } = req.body;


      const { data, error } = await supabase
        .from("languages")
        .update({
            frequency_list: words
        })
        .eq("language_id", id)
        .single();

      if (error) {
        console.error("Error editing frequency list:", error);
        res.status(500).json({ message: "Error editing frequency list" });
      }

      res.status(200).json({ message: "frequency list succesfully edited" });
    } catch (error) {
      console.error("Error editing word:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
