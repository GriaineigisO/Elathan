import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

  if (req.method === "POST") {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
     const { userId } = req.body;
    // Step 1: Get all languages
    const { data: languages, error: langError } = await supabase
      .from("interfaceLanguages")
      .select("*")
      .eq("creator_id", userId)


    if (langError) {
      console.error("Error getting all interface languages:", langError);
      return res.status(500).json({ message: "Error getting all interface languages" });
    }

    languages.sort((a, b) =>
      a.language_name.localeCompare(b.language_name)
    );

    return res.status(200).json(languages);
  } catch (err) {
    console.error("Error in handler:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

}
