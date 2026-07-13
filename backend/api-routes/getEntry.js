import { createClient } from "@supabase/supabase-js";


export default async function handler(req, res) {

  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { id } = req.body;

  const { data, error, count } = await supabase
    .from("encyclopedia_entries")
    .select("*", { count: "exact" })
    .eq("entry_id", id)

  if (error) {
    console.error("Error getting entry:", error);
    res.status(500).json({ message: "Error getting entry" });
    return;
  }


  //get encyclopedia data for entry
 const { data: topics, error: topicError } = await supabase
    .from("encyclopedias")
    .select("topics")
    .eq("encyclopedia_id", data[0].encyclopedia_id)

  if (topicError) {
    console.error("Error getting topics:", error);
    res.status(500).json({ message: "Error getting topics" });
    return;
  }



res.status(200).json(data[0]);

    } catch (error) {
      console.error("Error getting all entries:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
