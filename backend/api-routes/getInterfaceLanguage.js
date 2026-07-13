import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { id } = req.body;



      const { data: languages, error: langError } = await supabase
        .from("interfaceLanguages")
        .select("*")
        .eq("id", Number(id));

      if (langError) {
        console.error("Error getting interface language:", langError);
        return res
          .status(500)
          .json({ message: "Error getting interface language" });
      }

      return res.status(200).json(languages[0]);
    } catch (err) {
      console.error("Error in handler:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }
}
