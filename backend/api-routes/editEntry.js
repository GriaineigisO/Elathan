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
       headword,
          entryText,
          entryTopic,
          id
      } = req.body;



      const { data, error } = await supabase
        .from("encyclopedia_entries")
        .update({
          headword: headword,
          entry_text: entryText,
          topic: entryTopic

        })
        .eq("entry_id", id)
        .single();

      if (error) {
        console.error("Error editing entry:", error);
        res.status(500).json({ message: "Error editing entry" });
      }

   
      res.status(200).json({ message: "entry succesfully edited" });
    } catch (error) {
      console.error("Error editing entry:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
