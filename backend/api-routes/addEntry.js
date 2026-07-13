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
       userId,
          encyclopediaId,
          headword,
          entryText,
          entryTopic
      } = req.body;

      const removeNulls = (arr) => {
        let filteredArr = arr.filter((obj) => obj !== null);
        return filteredArr;
      };

      const date = new Date();
      const wordId = Date.now();

      const { data, error } = await supabase
        .from("encyclopedia_entries")
        .insert([
          {
           encyclopedia_id: encyclopediaId,
           entry_id: wordId,
          headword: headword,
          entry_text: entryText,
          topic: entryTopic
          },
        ])
        .single();

      if (error) {
        console.error("Error adding entry:", error);
        res.status(500).json({ message: "Error adding entry" });
      }

      

      res.status(200).json({ message: "entry succesfully added" });
    } catch (error) {
      console.error("Error adding new entry:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
