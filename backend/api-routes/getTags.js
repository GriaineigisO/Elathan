import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { languageId } = req.body;

      const { data, error } = await supabase
        .from("languages")
        .select("tags")
        .eq("language_id", Number(languageId));

      if (error) {
        console.error("Error getting tags:", error);
        res.status(500).json({ message: "Error getting tags" });
      }


      const { data: getGroupWordTag, error: getGroupWordTagError } =
        await supabase
          .from("groups")
          .select("tags")
          .filter(
            "languages",
            "cs",
            JSON.stringify([{ language_id: Number(languageId) }])
          );

        let filteredArr = getGroupWordTag ? filteredArr = getGroupWordTag.filter((tag) => tag.tags.length > 0) : [];
      

      //if tags come form both the language and group
      if (data.length > 0 && filteredArr.length > 0) {
        const allWordForms = data.concat(filteredArr);

        return res.status(200).json(allWordForms);
      } else if (data.length === 0 && filteredArr.length > 0) {
        return res.status(200).json(filteredArr);
      } else if (data.length > 0 && filteredArr.length === 0) {
        return res.status(200).json(data);
      } else {
        return res.status(200).json([]);
      }
    } catch (error) {
      console.error("Error getting tags:", error);
      res.status(500).json({ message: "Server tags" });
    }
  }
}
