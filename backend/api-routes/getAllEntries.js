import { createClient } from "@supabase/supabase-js";


export default async function handler(req, res) {

  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { id } = req.body;


     const BATCH_SIZE = 1000;
let from = 0;
let to = BATCH_SIZE - 1;
let allData = [];
let hasMore = true;

while (hasMore) {
  const { data, error, count } = await supabase
    .from("encyclopedia_entries")
    .select("*", { count: "exact" })
    .eq("encyclopedia_id", id)
    .range(from, to);

  if (error) {
    console.error("Error getting batch:", error);
    res.status(500).json({ message: "Error getting words" });
    return;
  }





  //get number of entries for each topic
 const { data: topics, error: topicError } = await supabase
    .from("encyclopedias")
    .select("topics")
    .eq("encyclopedia_id", id)

  if (topicError) {
    console.error("Error getting topics:", error);
    res.status(500).json({ message: "Error getting topics" });
    return;
  }

  allData = allData.concat(data);
  hasMore = data.length === BATCH_SIZE;
  from += BATCH_SIZE;
  to += BATCH_SIZE;
}



allData.sort((a, b) => a.headword.localeCompare(b.headword));
res.status(200).json(allData);

    } catch (error) {
      console.error("Error getting all entries:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
