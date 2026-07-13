import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { id } = req.body;

      const { data, error } = await supabase
        .from("languages")
        .select("*")
        .eq("language_id", Number(id));

      if (error) {
        console.error("Error getting language:", error);
        res.status(500).json({ message: "Error getting language" });
      }



      // Clean the language object safely
      const languageToSearch = JSON.parse(
        JSON.stringify({
          user_id: data[0].user_id,
          is_proto: data[0].is_proto,
          word_forms: data[0].word_forms ?? null,
          language_id: data[0].language_id,
          language_name: data[0].language_name,
          mother_language_id: data[0].mother_language_id,
        })
      );

      const { data: getGroups, error: getGroupsError } = await supabase
        .from("groups")
        .select("*")
        .filter(
          "languages",
          "cs",
          JSON.stringify([{ language_id: languageToSearch.language_id }])
        );


      if (getGroupsError) {
        console.error("Error fetching groups:", getGroupsError);
        return res
          .status(500)
          .json({ message: "Group fetch failed", error: getGroupsError });
      }

      if (getGroups?.length) {
        data[0].groups = getGroups;
      } else {
        data[0].groups = [];
      }


      
      res.status(200).json(data);
    } catch (error) {
      console.error("Error getting language:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
